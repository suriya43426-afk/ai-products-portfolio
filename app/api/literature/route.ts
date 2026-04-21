import { NextResponse } from 'next/server';
import { literatureStore } from '@/lib/literatureStore';
import type { LiteratureEntry } from '@/types/literature';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const project = searchParams.get('project') ?? undefined;
  const items = await literatureStore.list(project);
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<LiteratureEntry>;
    if (!body.projectSlug || !body.title) {
      return NextResponse.json({ error: 'projectSlug and title are required' }, { status: 400 });
    }
    const created = await literatureStore.create({
      projectSlug: body.projectSlug,
      group: body.group ?? 'General',
      no: body.no ?? 0,
      title: body.title,
      authors: body.authors ?? [],
      year: body.year ?? new Date().getFullYear(),
      venue: body.venue ?? '',
      doiUrl: body.doiUrl ?? '',
      relevance: body.relevance ?? '',
      abstract: body.abstract,
      introduction: body.introduction,
      pdfUrl: body.pdfUrl,
      tags: body.tags,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Failed to create';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
