import { NextResponse } from 'next/server';
import { literatureStore } from '@/lib/literatureStore';
import { fetchArticleContent } from '@/lib/fetchArticle';

export const dynamic = 'force-dynamic';

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await literatureStore.byId(id);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!item.doiUrl) return NextResponse.json({ error: 'No DOI/URL to fetch' }, { status: 400 });

  try {
    const article = await fetchArticleContent(item.doiUrl);
    const updated = await literatureStore.update(id, {
      abstract: article.abstract ?? item.abstract,
      introduction: article.introduction ?? item.introduction,
      fetchedAt: new Date().toISOString(),
      fetchError: undefined,
      status: article.abstract ? 'fetched' : item.status,
    });
    return NextResponse.json(updated);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Fetch failed';
    await literatureStore.update(id, { fetchError: msg, fetchedAt: new Date().toISOString() });
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}
