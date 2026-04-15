import { projects } from '@/data/projects';
import type { ProjectData } from '@/types/project';

export function getAllProjects(): ProjectData[] {
  return projects;
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getProjectById(id: number): ProjectData | undefined {
  return projects.find((p) => p.id === id);
}

export function getProjectsByBu(bu: 'farm' | 'factory' | 'corporate'): ProjectData[] {
  return projects.filter((p) => p.businessUnit === bu).sort((a, b) => a.id - b.id);
}

export function getRelatedProjects(project: ProjectData): ProjectData[] {
  return project.relatedProjects
    .map((id) => getProjectById(id))
    .filter((p): p is ProjectData => !!p);
}
