import { SectionBlock } from './SectionBlock';
import type { ProjectData, RiskLevel } from '@/types/project';
import { cn } from '@/lib/utils';

const levelClass: Record<RiskLevel, string> = {
  low: 'bg-green/10 text-green',
  medium: 'bg-amber/10 text-amber',
  high: 'bg-red-100 text-red-600',
};

export function RiskMatrix({ project }: { project: ProjectData }) {
  return (
    <SectionBlock id="risks" number="08" title="Risk Assessment">
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-2.5">Risk</th>
              <th className="px-4 py-2.5">Impact</th>
              <th className="px-4 py-2.5">Probability</th>
              <th className="px-4 py-2.5">Mitigation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {project.risks.map((r, i) => (
              <tr key={i} className="bg-white">
                <td className="px-4 py-3 font-semibold text-navy-900">{r.risk}</td>
                <td className="px-4 py-3">
                  <Badge level={r.impact} />
                </td>
                <td className="px-4 py-3">
                  <Badge level={r.probability} />
                </td>
                <td className="px-4 py-3 text-slate-700">{r.mitigation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionBlock>
  );
}

function Badge({ level }: { level: RiskLevel }) {
  return (
    <span className={cn('inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase', levelClass[level])}>
      {level}
    </span>
  );
}
