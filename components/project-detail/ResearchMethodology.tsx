import { SectionBlock } from './SectionBlock';
import { Chip } from '@/components/ui/Chip';
import type { ProjectData } from '@/types/project';

export function ResearchMethodology({ project }: { project: ProjectData }) {
  const { approach } = project.research;
  return (
    <SectionBlock id="methodology" number="02" title="Research Methodology">
      <div className="flex flex-wrap gap-2">
        <Chip tone="blue">{approach.type}</Chip>
        <Chip tone="light">{approach.framework}</Chip>
      </div>
      <p className="mt-4 text-slate-700">{approach.description}</p>

      <div className="mt-8 space-y-4">
        {approach.phases.map((phase, i) => (
          <div key={phase.name} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-blue-600">Phase {i + 1}</div>
                <div className="font-serif text-xl text-navy-900">{phase.name}</div>
              </div>
              <div className="text-sm text-slate-500">{phase.duration}</div>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Activities</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {phase.activities.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Deliverables</div>
                <ul className="mt-2 space-y-1 text-sm text-slate-700">
                  {phase.deliverables.map((d) => (
                    <li key={d} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-blue-600" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionBlock>
  );
}
