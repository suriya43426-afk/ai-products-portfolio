'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import type { LiteratureEntry, LiteratureStatus } from '@/types/literature';

interface ProjectRef {
  slug: string;
  title: string;
  bu: string;
}

const STATUS_STYLE: Record<LiteratureStatus, string> = {
  draft: 'bg-slate-100 text-slate-600',
  fetched: 'bg-blue-50 text-blue-700',
  summarized: 'bg-[color:var(--color-green)]/10 text-green',
};

const STATUS_ORDER: (LiteratureStatus | 'all')[] = ['all', 'summarized', 'fetched', 'draft'];

export function PapersExplorer({
  entries,
  projects,
}: {
  entries: LiteratureEntry[];
  projects: ProjectRef[];
}) {
  const [query, setQuery] = useState('');
  const [projectSlug, setProjectSlug] = useState<string>('all');
  const [status, setStatus] = useState<LiteratureStatus | 'all'>('all');
  const [group, setGroup] = useState<string>('all');

  const projectIndex = useMemo(() => new Map(projects.map((p) => [p.slug, p])), [projects]);
  const groups = useMemo(() => {
    const set = new Set(entries.map((e) => e.group).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [entries]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => {
      if (projectSlug !== 'all' && e.projectSlug !== projectSlug) return false;
      if (status !== 'all' && e.status !== status) return false;
      if (group !== 'all' && e.group !== group) return false;
      if (!q) return true;
      const hay = [
        e.title,
        e.venue,
        e.relevance,
        e.aiSummary,
        e.abstract,
        e.authors.join(', '),
        `${e.year}`,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [entries, projectSlug, status, group, query]);

  const byStatus = useMemo(() => {
    const tally: Record<LiteratureStatus, number> = { draft: 0, fetched: 0, summarized: 0 };
    entries.forEach((e) => tally[e.status]++);
    return tally;
  }, [entries]);

  return (
    <div>
      <div className="grid gap-4 rounded-2xl border border-slate-200 bg-slate-50/40 p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search title, authors, venue, relevance, AI summary…"
          className="field"
        />
        <select value={projectSlug} onChange={(e) => setProjectSlug(e.target.value)} className="field min-w-[220px]">
          <option value="all">All projects ({projects.length})</option>
          {projects.map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        <select value={group} onChange={(e) => setGroup(e.target.value)} className="field min-w-[180px]">
          {groups.map((g) => (
            <option key={g} value={g}>
              {g === 'all' ? 'All groups' : g}
            </option>
          ))}
        </select>
        <div className="flex flex-wrap gap-1.5">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setStatus(s)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold transition',
                status === s
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400',
              )}
            >
              {s === 'all'
                ? `All (${entries.length})`
                : `${s} (${byStatus[s as LiteratureStatus]})`}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[10px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-3 py-2">Paper</th>
              <th className="hidden px-3 py-2 md:table-cell">Project</th>
              <th className="hidden px-3 py-2 md:table-cell">Group</th>
              <th className="hidden px-3 py-2 md:table-cell">Year</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 text-right">Open</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-3 py-10 text-center text-slate-400">
                  No papers match the current filters.
                </td>
              </tr>
            ) : (
              filtered.map((e) => {
                const project = projectIndex.get(e.projectSlug);
                return (
                  <tr key={e.id} className="align-top">
                    <td className="px-3 py-3">
                      <div className="font-semibold text-navy-900">{e.title}</div>
                      <div className="mt-0.5 text-xs text-slate-500">
                        {e.authors.slice(0, 3).join(', ')}
                        {e.authors.length > 3 && ' et al.'}
                      </div>
                      <div className="mt-0.5 text-xs italic text-slate-500">{e.venue}</div>
                      {e.aiSummary && (
                        <div className="mt-2 rounded-md border-l-2 border-green/50 bg-green/5 px-3 py-1.5 text-xs leading-relaxed text-slate-700">
                          {e.aiSummary}
                        </div>
                      )}
                    </td>
                    <td className="hidden px-3 py-3 text-xs md:table-cell">
                      {project ? (
                        <Link
                          href={`/projects/${e.projectSlug}#literature`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {project.title}
                        </Link>
                      ) : (
                        e.projectSlug
                      )}
                    </td>
                    <td className="hidden px-3 py-3 text-xs text-slate-600 md:table-cell">{e.group}</td>
                    <td className="hidden px-3 py-3 text-xs text-slate-600 md:table-cell">{e.year}</td>
                    <td className="px-3 py-3">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                          STATUS_STYLE[e.status],
                        )}
                      >
                        {e.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right text-xs">
                      <div className="inline-flex gap-1.5">
                        {e.doiUrl && (
                          <a
                            href={e.doiUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-700 hover:bg-slate-50"
                          >
                            DOI
                          </a>
                        )}
                        <Link
                          href={`/projects/${e.projectSlug}#literature`}
                          className="rounded-md bg-primary px-2 py-1 font-semibold text-white hover:bg-primary-light"
                        >
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        Showing <span className="font-semibold text-navy-900">{filtered.length}</span> of{' '}
        <span className="font-semibold text-navy-900">{entries.length}</span> papers
      </div>
    </div>
  );
}
