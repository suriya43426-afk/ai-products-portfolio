import { NextResponse } from 'next/server';
import { projectsStore } from '@/lib/projectsStore';
import type { ProjectData } from '@/types/project';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const all = await projectsStore.list();
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as ProjectData;
    if (!body.slug || !body.title) {
      return NextResponse.json({ error: 'slug and title are required' }, { status: 400 });
    }
    const created = await projectsStore.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
