import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function BudgetSummary({ project }: { project: ProjectData }) {
  return (
    <SectionBlock id="budget" number="09" title="Budget Summary">
      <div className="grid gap-3 md:grid-cols-2">
        {project.budget.map((b) => (
          <div key={b.category} className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xs uppercase tracking-widest text-slate-500">{b.category}</div>
            <div className="mt-2 font-serif text-2xl text-navy-900">{b.amount}</div>
            {b.note && <div className="mt-1 text-xs text-slate-500">{b.note}</div>}
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs italic text-slate-500">
        Budgets are estimates for planning purposes and marked Est. in presentations.
      </div>
    </SectionBlock>
  );
}
