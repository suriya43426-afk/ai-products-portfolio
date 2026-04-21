import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function TechArchitecture({ project }: { project: ProjectData }) {
  return (
    <SectionBlock id="architecture" number="04" title="Technical Architecture">
      <div className="grid gap-4 md:grid-cols-3">
        {project.techStack.map((group) => (
          <div key={group.category} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              {group.category}
            </div>
            <ul className="mt-3 space-y-1.5 text-sm font-medium text-navy-900">
              {group.technologies.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-600">
        Architecture leverages the shared Gold Zone data foundation from project #2, with project-specific services
        deployed on top. Services are observability-ready and designed for rollback.
      </div>
    </SectionBlock>
  );
}
