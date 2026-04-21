import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function Abstract({ project }: { project: ProjectData }) {
  const text =
    project.abstract ??
    `${project.subtitle}. ${project.description} ${
      project.research?.objectives?.length
        ? 'Objectives: ' + project.research.objectives.slice(0, 2).join('; ') + '.'
        : ''
    }`;

  return (
    <SectionBlock id="abstract" number="00" title="Abstract">
      <div className="rounded-2xl border-l-4 border-primary bg-white p-6 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Abstract</div>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-700">{text}</p>
        {project.techTags?.length ? (
          <div className="mt-4 border-t border-slate-100 pt-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Index Terms —{' '}
            </span>
            <span className="text-sm italic text-slate-600">{project.techTags.join(', ')}.</span>
          </div>
        ) : null}
      </div>
    </SectionBlock>
  );
}
