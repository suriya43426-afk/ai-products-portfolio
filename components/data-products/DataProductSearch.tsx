'use client';

import { useMemo, useState } from 'react';
import type { DataProduct, DataProductBu } from '@/types/dataProduct';
import { DataProductCard } from './DataProductCard';
import { DP_BU_COLORS, DP_BU_NAMES, SUPPORT_FUNCTIONS } from '@/lib/dataProductsMeta';
import { cn } from '@/lib/utils';

type BuFilter = DataProductBu | 'all';
type SfFilter = string;

export function DataProductSearch({ items }: { items: DataProduct[] }) {
  const [query, setQuery] = useState('');
  const [bu, setBu] = useState<BuFilter>('all');
  const [sf, setSf] = useState<SfFilter>('all');
  const [sort, setSort] = useState<'relevance' | 'usability' | 'downloads' | 'recent'>('relevance');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = items.filter((d) => {
      if (bu !== 'all' && d.bu !== bu) return false;
      if (sf !== 'all' && d.supportFunction !== sf) return false;
      if (!q) return true;
      return [d.title, d.description, d.tags.join(' '), d.owner.name, d.owner.email, d.ownerTeam]
        .join(' ')
        .toLowerCase()
        .includes(q);
    });
    if (sort === 'usability') out = [...out].sort((a, b) => b.usabilityScore - a.usabilityScore);
    if (sort === 'downloads') out = [...out].sort((a, b) => b.downloads - a.downloads);
    if (sort === 'recent') out = [...out].sort((a, b) => b.lastUpdated.localeCompare(a.lastUpdated));
    return out;
  }, [items, query, bu, sf, sort]);

  const clear = () => {
    setQuery('');
    setBu('all');
    setSf('all');
  };
  const anyFilter = query || bu !== 'all' || sf !== 'all';

  return (
    <>
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 pt-[116px] text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-blue-200 backdrop-blur">
              MAI · Data Catalog
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">Data Products</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">
              Browse MitrPhol&apos;s enterprise data products across 7 business units — each with a named data owner.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-3xl">
            <div className="flex items-center gap-3 rounded-full border border-white/20 bg-white px-5 py-3 text-navy-900 shadow-xl">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-slate-400">
                <path fillRule="evenodd" d="M9 3a6 6 0 104.47 10.03l3.25 3.25a.75.75 0 101.06-1.06l-3.25-3.25A6 6 0 009 3zM4.5 9a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" clipRule="evenodd" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search datasets, tags, owners…"
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                autoFocus
              />
            </div>
          </div>

          {/* BU quick chips */}
          <div className="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-2">
            {(['all', ...DP_BU_NAMES] as const).map((b) => {
              const active = bu === b;
              const color = b !== 'all' ? DP_BU_COLORS[b] : null;
              return (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBu(b as BuFilter)}
                  className={cn(
                    'rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest transition',
                    active
                      ? 'bg-white text-navy-900'
                      : 'border border-white/20 bg-white/10 text-white hover:bg-white/20',
                  )}
                  style={active && color ? { background: `linear-gradient(135deg, ${color.from}, ${color.to})`, color: '#fff' } : undefined}
                >
                  {b === 'all' ? 'All BUs' : b}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <FilterGroup
                  label="Support Function"
                  value={sf}
                  onChange={setSf}
                  options={[{ value: 'all', label: 'All Functions' }, ...SUPPORT_FUNCTIONS.map((s) => ({ value: s, label: s }))]}
                />
                {anyFilter && (
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-2 w-full rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </aside>

            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-600">{results.length} results</div>
                <label className="flex items-center gap-2 text-sm text-slate-600">
                  Sort by
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value as typeof sort)}
                    className="rounded-md border border-slate-300 bg-white px-2 py-1.5 text-sm"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="usability">Usability score</option>
                    <option value="downloads">Most downloaded</option>
                    <option value="recent">Recently updated</option>
                  </select>
                </label>
              </div>
              {results.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                  No data products match your filters.
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {results.map((d) => (
                    <DataProductCard key={d.id} item={d} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function FilterGroup<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: { value: T; label: string }[];
}) {
  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</div>
      <div className="mt-2 flex flex-col gap-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'w-full rounded-md px-2.5 py-1.5 text-left text-sm transition',
              value === o.value ? 'bg-blue-50 font-semibold text-blue-700' : 'text-slate-700 hover:bg-slate-50',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
