import { SectionBlock } from './SectionBlock';
import type { ProjectData } from '@/types/project';

export function DataPipeline({ project }: { project: ProjectData }) {
  const { dataCollection, analysisMethod } = project.research;
  return (
    <SectionBlock id="data" number="04" title="Data Pipeline">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Data Sources</div>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-4 py-2.5">Source</th>
                <th className="px-4 py-2.5">Type</th>
                <th className="px-4 py-2.5">Description</th>
                <th className="px-4 py-2.5">Format</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {dataCollection.sources.map((s) => (
                <tr key={s.name} className="bg-white">
                  <td className="px-4 py-3 font-semibold text-navy-900">{s.name}</td>
                  <td className="px-4 py-3 text-slate-600">{s.type}</td>
                  <td className="px-4 py-3 text-slate-700">{s.description}</td>
                  <td className="px-4 py-3 text-slate-600">{s.format}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Stat label="Volume" value={dataCollection.volume} />
        <Stat label="Frequency" value={dataCollection.frequency} />
        <Stat label="Primary Method" value={analysisMethod.primary} />
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Preprocessing</div>
        <div className="mt-2 flex flex-wrap gap-2">
          {dataCollection.preprocessing.map((p) => (
            <span key={p} className="rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-700">
              {p}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Tools & Metrics</div>
        <div className="mt-2 grid gap-3 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">Tools</div>
            <div className="mt-1.5 text-sm text-slate-800">{analysisMethod.tools.join(' · ')}</div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="text-xs text-slate-500">Metrics</div>
            <div className="mt-1.5 text-sm text-slate-800">{analysisMethod.metrics.join(' · ')}</div>
          </div>
        </div>
      </div>
    </SectionBlock>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="mt-1 font-semibold text-navy-900">{value}</div>
    </div>
  );
}
