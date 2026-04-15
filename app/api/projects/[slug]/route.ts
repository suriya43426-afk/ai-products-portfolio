import { NextResponse } from 'next/server';
import { projectsStore } from '@/lib/projectsStore';
import type { ProjectData } from '@/types/project';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await projectsStore.bySlug(slug);
  if (!project) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(project);
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const patch = (await req.json()) as Partial<ProjectData>;
    const updated = await projectsStore.update(slug, patch);
    return NextResponse.json(updated);
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    const status = msg.includes('not found') ? 404 : 400;
    return NextResponse.json({ error: msg }, { status });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await projectsStore.remove(slug);
    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: msg }, { status: 404 });
  }
}
