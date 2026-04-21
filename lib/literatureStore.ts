import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';
import type { LiteratureEntry } from '@/types/literature';

const DATA_FILE = path.join(process.cwd(), 'data', 'literature.json');

async function readAll(): Promise<LiteratureEntry[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw) as LiteratureEntry[];
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === 'ENOENT') return [];
    throw err;
  }
}

async function writeAll(items: LiteratureEntry[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
}

function nowIso(): string {
  return new Date().toISOString();
}

export const literatureStore = {
  async list(projectSlug?: string): Promise<LiteratureEntry[]> {
    const all = await readAll();
    return projectSlug ? all.filter((x) => x.projectSlug === projectSlug) : all;
  },
  async byId(id: string): Promise<LiteratureEntry | undefined> {
    return (await readAll()).find((x) => x.id === id);
  },
  async create(input: Omit<LiteratureEntry, 'id' | 'createdAt' | 'updatedAt' | 'status'> & Partial<Pick<LiteratureEntry, 'status'>>): Promise<LiteratureEntry> {
    const all = await readAll();
    const entry: LiteratureEntry = {
      ...input,
      id: `lit-${randomUUID().slice(0, 8)}`,
      status: input.status ?? 'draft',
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    all.push(entry);
    await writeAll(all);
    return entry;
  },
  async update(id: string, patch: Partial<LiteratureEntry>): Promise<LiteratureEntry> {
    const all = await readAll();
    const idx = all.findIndex((x) => x.id === id);
    if (idx < 0) throw new Error(`Literature entry "${id}" not found`);
    const merged: LiteratureEntry = {
      ...all[idx],
      ...patch,
      id: all[idx].id,
      createdAt: all[idx].createdAt,
      updatedAt: nowIso(),
    };
    all[idx] = merged;
    await writeAll(all);
    return merged;
  },
  async remove(id: string): Promise<void> {
    const all = await readAll();
    const next = all.filter((x) => x.id !== id);
    if (next.length === all.length) throw new Error(`Literature entry "${id}" not found`);
    await writeAll(next);
  },
};
