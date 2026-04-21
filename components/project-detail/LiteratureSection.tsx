'use client';

import { Fragment, useMemo, useState } from 'react';
import { SectionBlock } from './SectionBlock';
import { cn } from '@/lib/utils';
import type { LiteratureEntry, LiteratureStatus } from '@/types/literature';

const STATUS_STYLE: Record<LiteratureStatus, string> = {
  draft: 'bg-slate-100 text-slate-600',
  fetched: 'bg-blue-50 text-blue-700',
  summarized: 'bg-[color:var(--color-green)]/10 text-green',
};

interface AddForm {
  title: string;
  authors: string;
  year: string;
  venue: string;
  doiUrl: string;
  relevance: string;
  group: string;
}

const emptyForm: AddForm = {
  title: '',
  authors: '',
  year: `${new Date().getFullYear()}`,
  venue: '',
  doiUrl: '',
  relevance: '',
  group: 'General',
};

export function LiteratureSection({
  projectSlug,
  initial,
}: {
  projectSlug: string;
  initial: LiteratureEntry[];
}) {
  const [items, setItems] = useState<LiteratureEntry[]>(initial);
  const [query, setQuery] = useState('');
  const [groupFilter, setGroupFilter] = useState<string>('all');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<AddForm>(emptyForm);
  const [err, setErr] = useState<string | null>(null);

  const groups = useMemo(() => {
    const set = new Set(items.map((i) => i.group).filter(Boolean));
    return ['all', ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (groupFilter !== 'all' && i.group !== groupFilter) return false;
      if (!q) return true;
      const hay = [
        i.title,
        i.venue,
        i.relevance,
        i.aiSummary,
        i.abstract,
        i.authors.join(', '),
        `${i.year}`,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [items, query, groupFilter]);

  const replaceItem = (next: LiteratureEntry) =>
    setItems((prev) => prev.map((x) => (x.id === next.id ? next : x)));

  const onFetch = async (id: string) => {
    setBusyId(id);
    setErr(null);
    try {
      const res = await fetch(`/api/literature/${id}/fetch`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Fetch failed');
      replaceItem(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Fetch failed');
    } finally {
      setBusyId(null);
    }
  };

  const onSummarize = async (id: string) => {
    setBusyId(id);
    setErr(null);
    try {
      const res = await fetch(`/api/literature/${id}/summarize`, { method: 'POST' });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Summarize failed');
      replaceItem(json);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Summarize failed');
    } finally {
      setBusyId(null);
    }
  };

  const onAdd = async () => {
    setErr(null);
    if (!form.title.trim()) {
      setErr('Title is required');
      return;
    }
    try {
      const res = await fetch('/api/literature', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          projectSlug,
          title: form.title.trim(),
          authors: form.authors
            .split(/[;,]/)
            .map((s) => s.trim())
            .filter(Boolean),
          year: Number(form.year) || new Date().getFullYear(),
          venue: form.venue.trim(),
          doiUrl: form.doiUrl.trim(),
          relevance: form.relevance.trim(),
          group: form.group.trim() || 'General',
          no: items.filter((i) => i.group === form.group).length + 1,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? 'Add failed');
      setItems((prev) => [...prev, json]);
      setForm(emptyForm);
      setShowAdd(false);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Add failed');
    }
  };

  const onDelete = async (id: string) => {
    if (!confirm('Delete this paper?')) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/literature/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error((await res.json()).error ?? 'Delete failed');
      setItems((prev) => prev.filter((x) => x.id !== id));
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setBusyId(null);
    }
  };

  return (
    <SectionBlock id="literature" number="11" title="Literature & Related Work">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search title, authors, venue, relevance…"
            className="w-full rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder-slate-400 focus:border-navy-900 focus:outline-none"
          />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {groups.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGroupFilter(g)}
              className={cn(
                'rounded-full border px-3 py-1 text-xs font-semibold transition',
                groupFilter === g
                  ? 'border-navy-900 bg-navy-900 text-white'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400',
              )}
            >
              {g === 'all' ? `All (${items.length})` : g}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setShowAdd((v) => !v)}
          className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-light"
        >
          {showAdd ? 'Cancel' : '+ Add Paper'}
        </button>
      </div>

      {err && (
        <div className="mt-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">{err}</div>
      )}

      {showAdd && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
          <div className="grid gap-3 md:grid-cols-2">
            <Field label="Title (required)">
              <input className="field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Field>
            <Field label="Group">
              <input className="field" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} />
            </Field>
            <Field label="Authors (semicolon-separated)">
              <input className="field" value={form.authors} onChange={(e) => setForm({ ...form, authors: e.target.value })} />
            </Field>
            <Field label="Year">
              <input className="field" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} />
            </Field>
            <Field label="Venue">
              <input className="field" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })} />
            </Field>
            <Field label="DOI / URL">
              <input className="field" value={form.doiUrl} onChange={(e) => setForm({ ...form, doiUrl: e.target.value })} />
            </Field>
            <div className="md:col-span-2">
              <Field label="Relevance note">
                <textarea
                  className="field min-h-[80px]"
                  value={form.relevance}
                  onChange={(e) => setForm({ ...form, relevance: e.target.value })}
                />
              </Field>
            </div>
          </div>
          <div className="mt-3 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAdd(false)}
              className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onAdd}
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-light"
            >
              Save Paper
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-[10px] uppercase tracking-wider text-slate-500">
            <tr>
              <th className="w-12 px-3 py-2">#</th>
              <th className="px-3 py-2">Paper</th>
              <th className="hidden w-28 px-3 py-2 md:table-cell">Group</th>
              <th className="hidden w-16 px-3 py-2 md:table-cell">Year</th>
              <th className="w-28 px-3 py-2">Status</th>
              <th className="w-[220px] px-3 py-2 text-right">Actions</th>
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
              filtered.map((item) => {
                const isOpen = expanded === item.id;
                const busy = busyId === item.id;
                return (
                  <Fragment key={item.id}>
                    <tr className="align-top">
                      <td className="px-3 py-3 font-mono text-xs text-slate-400">{item.no}</td>
                      <td className="px-3 py-3">
                        <button
                          type="button"
                          onClick={() => setExpanded(isOpen ? null : item.id)}
                          className="text-left"
                        >
                          <div className="font-semibold text-navy-900">{item.title}</div>
                          <div className="mt-0.5 text-xs text-slate-500">
                            {item.authors.slice(0, 3).join(', ')}
                            {item.authors.length > 3 && ' et al.'}
                          </div>
                          <div className="mt-0.5 text-xs italic text-slate-500">{item.venue}</div>
                        </button>
                      </td>
                      <td className="hidden px-3 py-3 text-xs text-slate-600 md:table-cell">{item.group}</td>
                      <td className="hidden px-3 py-3 text-xs text-slate-600 md:table-cell">{item.year}</td>
                      <td className="px-3 py-3">
                        <span
                          className={cn(
                            'rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider',
                            STATUS_STYLE[item.status],
                          )}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-right text-xs">
                        <div className="inline-flex flex-wrap justify-end gap-1">
                          {item.doiUrl && (
                            <a
                              href={item.doiUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-700 hover:bg-slate-50"
                            >
                              Open
                            </a>
                          )}
                          <button
                            type="button"
                            disabled={busy || !item.doiUrl}
                            onClick={() => onFetch(item.id)}
                            className="rounded-md border border-slate-200 px-2 py-1 font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                          >
                            {busy ? '…' : 'Fetch'}
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => onSummarize(item.id)}
                            className="rounded-md bg-primary px-2 py-1 font-semibold text-white hover:bg-primary-light disabled:opacity-50"
                          >
                            {busy ? '…' : 'Summarize'}
                          </button>
                          <button
                            type="button"
                            disabled={busy}
                            onClick={() => onDelete(item.id)}
                            className="rounded-md border border-red-200 px-2 py-1 font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                          >
                            Del
                          </button>
                        </div>
                      </td>
                    </tr>
                    {isOpen && (
                      <tr className="bg-slate-50/60">
                        <td />
                        <td colSpan={5} className="px-3 py-4">
                          <div className="space-y-3 text-sm">
                            <DetailRow label="DOI / URL" value={item.doiUrl} href={item.doiUrl} />
                            <DetailRow label="Authors" value={item.authors.join(', ')} />
                            <DetailRow label="Analyst relevance note" value={item.relevance} />
                            <DetailRow
                              label={item.fetchedAt ? `Abstract (fetched ${item.fetchedAt})` : 'Abstract'}
                              value={item.abstract ?? '—'}
                            />
                            {item.introduction && (
                              <DetailRow label="Introduction excerpt" value={item.introduction} />
                            )}
                            {item.fetchError && (
                              <DetailRow label="Fetch error" value={item.fetchError} tone="red" />
                            )}
                            <DetailRow
                              label={
                                item.aiSummarizedAt
                                  ? `AI relevance summary (${item.aiModel ?? 'claude'}, ${item.aiSummarizedAt})`
                                  : 'AI relevance summary'
                              }
                              value={item.aiSummary ?? '— Click Summarize to generate'}
                              tone={item.aiSummary ? 'green' : 'slate'}
                            />
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
        <span className="font-semibold text-slate-700">Next step →</span> knowledge graph export (Obsidian-compatible
        Markdown with citation keys + bidirectional links). Coming next.
      </div>
    </SectionBlock>
  );
}

function DetailRow({
  label,
  value,
  href,
  tone = 'slate',
}: {
  label: string;
  value: string;
  href?: string;
  tone?: 'slate' | 'red' | 'green';
}) {
  const color =
    tone === 'red' ? 'text-red-600' : tone === 'green' ? 'text-navy-900' : 'text-slate-700';
  return (
    <div>
      <div className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">{label}</div>
      <div className={cn('mt-1 whitespace-pre-line text-sm leading-relaxed', color)}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="break-all text-primary hover:underline">
            {value}
          </a>
        ) : (
          value
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-xs">
      <span className="font-semibold text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
