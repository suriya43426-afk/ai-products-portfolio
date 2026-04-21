import { SectionBlock } from './SectionBlock';
import type { ProjectData, AiMethodology as AiMethodologyType } from '@/types/project';

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</div>
      <div className="mt-1.5 text-sm text-slate-700">{children}</div>
    </div>
  );
}

function fallback(project: ProjectData): AiMethodologyType {
  return {
    problemFraming: project.research?.problemStatement,
    data: {
      sources: project.research?.dataCollection?.sources?.map((s) => s.name) ?? [],
      volume: project.research?.dataCollection?.volume,
      sampling: project.research?.dataCollection?.frequency,
    },
    features: project.research?.dataCollection?.preprocessing ?? [],
    model: {
      family: project.research?.analysisMethod?.primary ?? '—',
      architecture: project.research?.analysisMethod?.secondary,
    },
    training: { protocol: project.research?.approach?.description },
    evaluation: {
      metrics: (project.research?.analysisMethod?.metrics ?? []).map((m) => ({
        name: m,
        value: '—',
      })),
    },
    deployment: { topology: '—' },
    limitations: [],
  };
}

export function AiMethodology({ project }: { project: ProjectData }) {
  const m = project.aiMethodology ?? fallback(project);

  return (
    <SectionBlock id="ai-methodology" number="03" title="AI Methodology">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">3.1 · Problem Framing</div>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">
            {m.problemFraming || 'Problem framing not yet documented.'}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">3.2 · Data</div>
          <div className="mt-2 space-y-3">
            {m.data?.sources?.length ? (
              <Row label="Sources">{m.data.sources.join(' · ')}</Row>
            ) : null}
            {m.data?.volume && <Row label="Volume">{m.data.volume}</Row>}
            {m.data?.sampling && <Row label="Sampling">{m.data.sampling}</Row>}
          </div>
        </div>

        {m.features?.length ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">3.3 · Features / Preprocessing</div>
            <ul className="mt-2 space-y-1 text-sm text-slate-700">
              {m.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-slate-400" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">3.4 · Model</div>
          <div className="mt-2 space-y-3">
            <Row label="Family">{m.model?.family ?? '—'}</Row>
            {m.model?.architecture && <Row label="Architecture">{m.model.architecture}</Row>}
            {m.model?.hyperparams && (
              <Row label="Hyperparameters">
                <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-xs text-slate-600">
                  {Object.entries(m.model.hyperparams).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-slate-400">{k}:</span> {v}
                    </div>
                  ))}
                </div>
              </Row>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">3.5 · Training & Evaluation</div>
          <div className="mt-2 space-y-3">
            {m.training?.protocol && <Row label="Protocol">{m.training.protocol}</Row>}
            {m.training?.split && <Row label="Split">{m.training.split}</Row>}
            {m.training?.hardware && <Row label="Hardware">{m.training.hardware}</Row>}
            {m.evaluation?.metrics?.length ? (
              <div>
                <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Metrics</div>
                <table className="mt-2 w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs uppercase text-slate-500">
                      <th className="pb-1 pr-2 font-semibold">Metric</th>
                      <th className="pb-1 pr-2 font-semibold">Value</th>
                      <th className="pb-1 font-semibold">Baseline</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    {m.evaluation.metrics.map((x) => (
                      <tr key={x.name} className="border-t border-slate-100">
                        <td className="py-1.5 pr-2">{x.name}</td>
                        <td className="py-1.5 pr-2 font-semibold text-navy-900">{x.value}</td>
                        <td className="py-1.5 text-slate-500">{x.baseline ?? '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600">3.6 · Deployment</div>
          <div className="mt-2 space-y-3">
            {m.deployment?.topology && <Row label="Topology">{m.deployment.topology}</Row>}
            {m.deployment?.monitoring?.length ? (
              <Row label="Monitoring">{m.deployment.monitoring.join(' · ')}</Row>
            ) : null}
          </div>
        </div>
      </div>

      {m.limitations?.length ? (
        <div className="mt-5 rounded-2xl border border-amber/30 bg-[color:var(--color-amber)]/5 p-5">
          <div className="text-xs font-semibold uppercase tracking-widest text-amber">Limitations</div>
          <ul className="mt-2 space-y-1 text-sm text-slate-700">
            {m.limitations.map((l) => (
              <li key={l} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                {l}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </SectionBlock>
  );
}
