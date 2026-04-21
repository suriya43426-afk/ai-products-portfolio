import 'server-only';

const DEFAULT_MODEL = process.env.CLAUDE_MODEL ?? 'claude-sonnet-4-6';
const ENDPOINT = 'https://api.anthropic.com/v1/messages';

export interface ClaudeMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ClaudeCompletion {
  model: string;
  text: string;
}

export class ClaudeNotConfiguredError extends Error {
  constructor() {
    super('ANTHROPIC_API_KEY is not set');
    this.name = 'ClaudeNotConfiguredError';
  }
}

export function claudeConfigured(): boolean {
  return Boolean(process.env.ANTHROPIC_API_KEY);
}

export async function claudeComplete({
  system,
  messages,
  maxTokens = 700,
  model = DEFAULT_MODEL,
}: {
  system?: string;
  messages: ClaudeMessage[];
  maxTokens?: number;
  model?: string;
}): Promise<ClaudeCompletion> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new ClaudeNotConfiguredError();

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Claude API ${res.status}: ${errText.slice(0, 400)}`);
  }
  const json = (await res.json()) as {
    content?: { type: string; text?: string }[];
    model?: string;
  };
  const text = (json.content ?? [])
    .filter((c) => c.type === 'text' && c.text)
    .map((c) => c.text as string)
    .join('\n')
    .trim();
  return { model: json.model ?? model, text };
}
