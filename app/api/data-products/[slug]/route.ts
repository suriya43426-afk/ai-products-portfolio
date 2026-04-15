import { NextResponse } from 'next/server';
import { dataProductsStore } from '@/lib/dataProductsStore';
import type { DataProduct } from '@/types/dataProduct';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await dataProductsStore.bySlug(slug);
  if (!item) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(item);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const patch = (await req.json()) as Partial<DataProduct>;
    const updated = await dataProductsStore.update(slug, patch);
    return NextResponse.json(updated);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Error';
    return NextResponse.json({ error: msg }, { status: msg.includes('not found') ? 404 : 400 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await dataProductsStore.remove(slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 404 });
  }
}
