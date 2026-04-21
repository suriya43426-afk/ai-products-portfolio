import { SectionBlock } from './SectionBlock';
import { KpiCard } from '@/components/ui/KpiCard';
import type { ProjectData } from '@/types/project';

export function ExpectedOutcomes({ project }: { project: ProjectData }) {
  const { validation } = project.research;
  return (
    <SectionBlock id="outcomes" number="06" title="Experiments & Results">
      <div className="grid gap-3 md:grid-cols-3">
        {project.kpis.map((k) => (
          <KpiCard key={k.label} kpi={k} />
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Validation Protocol</div>
          <div className="mt-2 font-semibold text-navy-900">{validation.method}</div>
          <div className="mt-1 text-sm text-slate-600">Baseline: {validation.baseline}</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Success Criteria</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {validation.successCriteria.map((c) => (
              <li key={c} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionBlock>
  );
}
