import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function Timeline({ project }: { project: ProjectData }) {
  return (
    <SectionBlock id="timeline" number="07" title="Timeline">
      <div className="relative space-y-5 border-l-2 border-slate-200 pl-6">
        {project.timeline.map((p, i) => (
          <div key={i} className="relative">
            <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-primary ring-4 ring-white" />
            <div className="flex flex-wrap items-baseline gap-3">
              <div className="font-serif text-xl text-navy-900">{p.phase}</div>
              <div className="text-sm text-slate-500">
                {p.startDate} → {p.endDate}
              </div>
            </div>
            <ul className="mt-2 flex flex-wrap gap-2">
              {p.milestones.map((m) => (
                <li key={m} className="rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
