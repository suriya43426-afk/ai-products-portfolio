'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TrlBadge } from '@/components/ui/TrlBadge';
import type { ProjectData } from '@/types/project';

type RelLink = { id: number; slug: string; title: string };

const NAV = [
  { href: '#abstract', label: 'Abstract' },
  { href: '#overview', label: '1 · Introduction' },
  { href: '#methodology', label: '2 · Research Methodology' },
  { href: '#ai-methodology', label: '3 · AI Methodology' },
  { href: '#architecture', label: '4 · Architecture' },
  { href: '#data', label: '5 · Data Pipeline' },
  { href: '#outcomes', label: '6 · Experiments & Results' },
  { href: '#timeline', label: '7 · Timeline' },
  { href: '#risks', label: '8 · Risks' },
  { href: '#budget', label: '9 · Budget' },
  { href: '#references', label: '10 · References' },
  { href: '#literature', label: '11 · Literature' },
  { href: '#papers', label: 'Appendix · Papers' },
  { href: '#related', label: 'Related' },
];

export function Sidebar({
  project,
  depends,
  feeds,
}: {
  project: ProjectData;
  depends: RelLink[];
  feeds: RelLink[];
}) {
  const progress = project.progress;

  return (
    <aside className="sticky top-24 hidden self-start lg:block">
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Contents</div>
        <nav className="mt-3 space-y-1 text-sm">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="block rounded-md px-2 py-1.5 text-slate-600 hover:bg-slate-50 hover:text-navy-900"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-5">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Status</div>
        <div className="mt-2 flex flex-wrap gap-2">
          <StatusBadge status={project.status} label={project.statusLabel} />
          {progress?.trl && <TrlBadge level={progress.trl} />}
        </div>

        {progress && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
              <span>Maturity</span>
              <span className="font-semibold text-navy-900">{progress.percent}%</span>
            </div>
            <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress.percent}%` }} />
            </div>
            <div className="mt-1.5 text-xs text-slate-500">
              {progress.stage}
              {progress.milestone ? ` · ${progress.milestone}` : ''}
            </div>
            {progress.updatedAt && (
              <div className="mt-0.5 text-[10px] text-slate-400">Updated {progress.updatedAt}</div>
            )}
          </div>
        )}

        {depends.length > 0 && (
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Depends On</div>
            <ul className="mt-2 space-y-1 text-sm">
              {depends.map((d) => (
                <li key={d.id}>
                  <Link href={`/projects/${d.slug}`} className="text-slate-700 hover:text-primary">
                    #{d.id} {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {feeds.length > 0 && (
          <div className="mt-5">
            <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Feeds Into</div>
            <ul className="mt-2 space-y-1 text-sm">
              {feeds.map((d) => (
                <li key={d.id}>
                  <Link href={`/projects/${d.slug}`} className="text-slate-700 hover:text-primary">
                    #{d.id} {d.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
