import { projectsStore } from './projectsStore';
import type { ProjectData } from '@/types/project';

export async function getAllProjects(): Promise<ProjectData[]> {
  return projectsStore.list();
}

export async function getProjectBySlug(slug: string): Promise<ProjectData | undefined> {
  return projectsStore.bySlug(slug);
}

export async function getProjectById(id: number): Promise<ProjectData | undefined> {
  return projectsStore.byId(id);
}

export async function getProjectsByBu(bu: 'farm' | 'factory' | 'corporate'): Promise<ProjectData[]> {
  const all = await projectsStore.list();
  return all.filter((p) => p.businessUnit === bu).sort((a, b) => a.id - b.id);
}

export async function getRelatedProjects(project: ProjectData): Promise<ProjectData[]> {
  const all = await projectsStore.list();
  return project.relatedProjects
    .map((id) => all.find((p) => p.id === id))
    .filter((p): p is ProjectData => !!p);
}
