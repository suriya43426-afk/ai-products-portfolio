import { NextResponse } from 'next/server';
import { dataProductsStore } from '@/lib/dataProductsStore';
import type { DataProduct } from '@/types/dataProduct';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(await dataProductsStore.list());
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as DataProduct;
    if (!body.slug || !body.title || !body.bu) {
      return NextResponse.json({ error: 'slug, title, and bu are required' }, { status: 400 });
    }
    const created = await dataProductsStore.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Error' }, { status: 400 });
  }
}
