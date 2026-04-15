import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { DataProduct } from '@/types/dataProduct';

const DATA_FILE = path.join(process.cwd(), 'data', 'dataProducts.json');

async function readAll(): Promise<DataProduct[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw) as DataProduct[];
}

async function writeAll(items: DataProduct[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2), 'utf8');
}

export const dataProductsStore = {
  async list(): Promise<DataProduct[]> {
    return readAll();
  },
  async bySlug(slug: string): Promise<DataProduct | undefined> {
    return (await readAll()).find((d) => d.slug === slug);
  },
  async create(item: DataProduct): Promise<DataProduct> {
    const all = await readAll();
    if (all.some((d) => d.slug === item.slug)) {
      throw new Error(`Data product with slug "${item.slug}" already exists`);
    }
    all.push(item);
    await writeAll(all);
    return item;
  },
  async update(slug: string, patch: Partial<DataProduct>): Promise<DataProduct> {
    const all = await readAll();
    const idx = all.findIndex((d) => d.slug === slug);
    if (idx < 0) throw new Error(`Data product "${slug}" not found`);
    const merged = { ...all[idx], ...patch, slug: all[idx].slug, id: all[idx].id };
    all[idx] = merged;
    await writeAll(all);
    return merged;
  },
  async remove(slug: string): Promise<void> {
    const all = await readAll();
    const next = all.filter((d) => d.slug !== slug);
    if (next.length === all.length) throw new Error(`Data product "${slug}" not found`);
    await writeAll(next);
  },
};
