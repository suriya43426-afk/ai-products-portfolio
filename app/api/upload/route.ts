import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_IMAGE = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ALLOWED_PDF = new Set(['application/pdf']);
const MAX_BYTES = 20 * 1024 * 1024; // 20 MB

function sanitize(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();
    const file = form.get('file');
    const kind = (form.get('kind') as string | null) ?? 'image';

    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }
    if (file.size === 0) {
      return NextResponse.json({ error: 'Empty file' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: `File exceeds ${MAX_BYTES} bytes` }, { status: 413 });
    }

    const allowed = kind === 'pdf' ? ALLOWED_PDF : ALLOWED_IMAGE;
    if (!allowed.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported type: ${file.type}` },
        { status: 415 },
      );
    }

    const subdir = kind === 'pdf' ? 'papers' : 'uploads';
    const dir = path.join(process.cwd(), 'public', subdir);
    await fs.mkdir(dir, { recursive: true });

    const base = sanitize(file.name || (kind === 'pdf' ? 'paper.pdf' : 'image'));
    const stamp = Date.now();
    const filename = `${stamp}-${base}`;
    const target = path.join(dir, filename);
    const bytes = Buffer.from(await file.arrayBuffer());
    await fs.writeFile(target, bytes);

    const publicPath = `/${subdir}/${filename}`;
    return NextResponse.json({ path: publicPath, name: filename, size: file.size, type: file.type });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
