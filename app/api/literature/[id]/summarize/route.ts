import { NextResponse } from 'next/server';
import { literatureStore } from '@/lib/literatureStore';
import { claudeComplete, claudeConfigured, ClaudeNotConfiguredError } from '@/lib/claude';
import { projectsStore } from '@/lib/projectsStore';

export const dynamic = 'force-dynamic';

function buildPrompt(item: {
  title: string;
  authors: string[];
  year: number;
  venue: string;
  doiUrl: string;
  abstract?: string;
  introduction?: string;
  relevance: string;
}, projectContext: string): string {
  const abstractBlock = item.abstract
    ? `Abstract:\n${item.abstract}\n\n`
    : 'Abstract: (not fetched — infer from title/venue)\n\n';
  const introBlock = item.introduction ? `Introduction excerpt:\n${item.introduction}\n\n` : '';
  const existingRelevance = item.relevance
    ? `Analyst's hand-written relevance note:\n${item.relevance}\n\n`
    : '';

  return [
    `Paper: "${item.title}" (${item.year})`,
    `Authors: ${item.authors.join(', ')}`,
    `Venue: ${item.venue}`,
    `URL: ${item.doiUrl}`,
    '',
    abstractBlock + introBlock + existingRelevance,
    `Project context:\n${projectContext}`,
    '',
    'Task: Write a 3-sentence relevance summary (max 90 words) linking the paper to this project. Lead with the single most actionable insight. Use concrete verbs. No preamble, no bullet points.',
  ].join('\n');
}

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!claudeConfigured()) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY is not set on the server' },
      { status: 503 },
    );
  }

  const item = await literatureStore.byId(id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const project = await projectsStore.bySlug(item.projectSlug);
  const projectContext = project
    ? `${project.title} — ${project.subtitle}. ${project.description}`
    : `Project slug: ${item.projectSlug}`;

  try {
    const prompt = buildPrompt(item, projectContext);
    const out = await claudeComplete({
      system:
        'You are a concise research librarian helping engineering teams triage literature. Always obey the word limit. Output plain prose only.',
      messages: [{ role: 'user', content: prompt }],
      maxTokens: 400,
    });
    const updated = await literatureStore.update(id, {
      aiSummary: out.text,
      aiModel: out.model,
      aiSummarizedAt: new Date().toISOString(),
      status: 'summarized',
    });
    return NextResponse.json(updated);
  } catch (err) {
    if (err instanceof ClaudeNotConfiguredError) {
      return NextResponse.json({ error: err.message }, { status: 503 });
    }
    const msg = err instanceof Error ? err.message : 'Summarize failed';
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
