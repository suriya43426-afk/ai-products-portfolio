'use client';

import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import type { ProjectData } from '@/types/project';

type RelLink = { id: number; slug: string; title: string };

const NAV = [
  { href: '#overview', label: 'Overview' },
  { href: '#methodology', label: 'Methodology' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#data', label: 'Data Pipeline' },
  { href: '#outcomes', label: 'Outcomes' },
  { href: '#timeline', label: 'Timeline' },
  { href: '#risks', label: 'Risks' },
  { href: '#budget', label: 'Budget' },
  { href: '#paper', label: 'Research Paper' },
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
        <div className="mt-2">
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>

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
