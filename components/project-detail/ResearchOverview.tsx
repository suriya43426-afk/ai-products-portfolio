import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function ResearchOverview({ project }: { project: ProjectData }) {
  const { research } = project;
  return (
    <SectionBlock id="overview" number="01" title="Introduction">
      <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Problem Statement</div>
          <p className="mt-2 text-slate-700">{research.problemStatement}</p>
        </div>
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Scope</div>
          <p className="mt-2 text-slate-700">{research.scope}</p>
        </div>
      </div>
      <div className="mt-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Objectives</div>
        <ul className="mt-3 space-y-2">
          {research.objectives.map((o, i) => (
            <li key={i} className="flex gap-3 text-slate-700">
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
              {o}
            </li>
          ))}
        </ul>
      </div>
    </SectionBlock>
  );
}
