import { literatureStore } from './literatureStore';
import type { LiteratureEntry } from '@/types/literature';

export async function getLiteratureByProject(slug: string): Promise<LiteratureEntry[]> {
  const items = await literatureStore.list(slug);
  return items.sort((a, b) => {
    if (a.group !== b.group) return a.group.localeCompare(b.group);
    return a.no - b.no;
  });
}

export async function getLiteratureById(id: string): Promise<LiteratureEntry | undefined> {
  return literatureStore.byId(id);
}
