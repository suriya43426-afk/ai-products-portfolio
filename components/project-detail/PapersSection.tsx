'use client';

import { useState } from 'react';
import { SectionBlock } from './SectionBlock';
import { cn } from '@/lib/utils';
import type { ProjectData, PaperRevision, PaperStatus } from '@/types/project';

const STATUS_STYLE: Record<PaperStatus, string> = {
  published: 'bg-[color:var(--color-green)]/10 text-green',
  internal: 'bg-blue-50 text-blue-700',
  draft: 'bg-slate-100 text-slate-600',
};

function semverKey(v: string): number {
  const m = v.replace(/^v/, '').split('.').map((n) => parseInt(n, 10) || 0);
  return (m[0] ?? 0) * 1e6 + (m[1] ?? 0) * 1e3 + (m[2] ?? 0);
}

function PdfPreview({ url }: { url: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
      <iframe
        src={`${url}#toolbar=1&view=FitH`}
        title="Paper preview"
        className="block h-[640px] w-full"
      />
    </div>
  );
}

export function PapersSection({ project }: { project: ProjectData }) {
  const revisions: PaperRevision[] = (project.papers ?? []).slice().sort(
    (a, b) => semverKey(b.version) - semverKey(a.version),
  );

  const [selected, setSelected] = useState<string | null>(revisions[0]?.version ?? null);
  const active = revisions.find((r) => r.version === selected) ?? revisions[0];

  if (!revisions.length) {
    return (
      <SectionBlock id="papers" number="08" title="Papers & Artifacts">
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-sm text-slate-500">
          No papers uploaded yet. Upload via <span className="font-mono">/manage</span>.
        </div>
      </SectionBlock>
    );
  }

  return (
    <SectionBlock id="papers" number="08" title="Papers & Artifacts">
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="space-y-2">
          <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Version History</div>
          <ol className="relative space-y-3 border-l-2 border-slate-100 pl-4">
            {revisions.map((r) => {
              const isActive = active?.version === r.version;
              return (
                <li key={r.version}>
                  <button
                    type="button"
                    onClick={() => setSelected(r.version)}
                    className={cn(
                      '-ml-[22px] flex w-full items-start gap-3 rounded-xl border bg-white p-3 text-left transition',
                      isActive ? 'border-navy-900 shadow-sm' : 'border-slate-200 hover:border-slate-400',
                    )}
                  >
                    <span
                      className={cn(
                        'mt-1 h-2.5 w-2.5 shrink-0 rounded-full',
                        isActive ? 'bg-navy-900' : 'bg-slate-300',
                      )}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-semibold text-navy-900">{r.version}</span>
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                            STATUS_STYLE[r.status],
                          )}
                        >
                          {r.status}
                        </span>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {r.uploadedAt} · {r.author}
                      </div>
                      <div className="mt-1 truncate text-xs text-slate-600" title={r.changelog}>
                        {r.changelog}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        <div>
          {active && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold text-navy-900">{active.version}</span>
                    <span
                      className={cn(
                        'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                        STATUS_STYLE[active.status],
                      )}
                    >
                      {active.status}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-slate-500">
                    Uploaded {active.uploadedAt} · {active.author}
                  </div>
                  <div className="mt-2 text-sm text-slate-700">{active.changelog}</div>
                  {active.sha256 && (
                    <div className="mt-1 truncate font-mono text-[10px] text-slate-400">
                      sha256:{active.sha256}
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={active.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Open in new tab
                  </a>
                  <a
                    href={active.pdfUrl}
                    download
                    className="rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-light"
                  >
                    Download
                  </a>
                </div>
              </div>
              <div className="mt-5">
                <PdfPreview url={active.pdfUrl} />
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionBlock>
  );
}
