import 'server-only';
import { promises as fs } from 'fs';
import path from 'path';
import type { ProjectData } from '@/types/project';

const DATA_FILE = path.join(process.cwd(), 'data', 'projects.json');

async function readAll(): Promise<ProjectData[]> {
  const raw = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(raw) as ProjectData[];
}

async function writeAll(projects: ProjectData[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(projects, null, 2), 'utf8');
}

export const projectsStore = {
  async list(): Promise<ProjectData[]> {
    return readAll();
  },
  async bySlug(slug: string): Promise<ProjectData | undefined> {
    return (await readAll()).find((p) => p.slug === slug);
  },
  async byId(id: number): Promise<ProjectData | undefined> {
    return (await readAll()).find((p) => p.id === id);
  },
  async create(project: ProjectData): Promise<ProjectData> {
    const all = await readAll();
    if (all.some((p) => p.slug === project.slug)) {
      throw new Error(`Project with slug "${project.slug}" already exists`);
    }
    if (!project.id || all.some((p) => p.id === project.id)) {
      project.id = all.reduce((max, p) => Math.max(max, p.id), 0) + 1;
    }
    all.push(project);
    await writeAll(all);
    return project;
  },
  async update(slug: string, patch: Partial<ProjectData>): Promise<ProjectData> {
    const all = await readAll();
    const idx = all.findIndex((p) => p.slug === slug);
    if (idx < 0) throw new Error(`Project "${slug}" not found`);
    // Disallow changing slug here; use explicit rename path if needed
    const merged = { ...all[idx], ...patch, slug: all[idx].slug, id: all[idx].id };
    all[idx] = merged;
    await writeAll(all);
    return merged;
  },
  async remove(slug: string): Promise<void> {
    const all = await readAll();
    const next = all.filter((p) => p.slug !== slug);
    if (next.length === all.length) throw new Error(`Project "${slug}" not found`);
    await writeAll(next);
  },
};
