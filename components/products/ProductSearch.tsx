'use client';

import { useMemo, useState } from 'react';
import type { BusinessUnit, ProjectData, ProjectStatus, ProjectType } from '@/types/project';
import { ProductCard } from './ProductCard';
import { useLang } from '@/lib/i18n';
import { TYPE_LABEL } from '@/lib/constants';
import { cn } from '@/lib/utils';

type BuFilter = BusinessUnit | 'all';
type StatusFilter = ProjectStatus | 'all';
type TypeFilter = ProjectType | 'all';

export function ProductSearch({ projects }: { projects: ProjectData[] }) {
  const { t } = useLang();
  const [query, setQuery] = useState('');
  const [bu, setBu] = useState<BuFilter>('all');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [type, setType] = useState<TypeFilter>('all');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (bu !== 'all' && p.businessUnit !== bu) return false;
      if (status !== 'all' && p.status !== status) return false;
      if (type !== 'all' && p.type !== type) return false;
      if (!q) return true;
      const haystack = [
        p.title,
        p.subtitle,
        p.description,
        p.techTags.join(' '),
        p.research.problemStatement,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [projects, query, bu, status, type]);

  const anyFilter = query || bu !== 'all' || status !== 'all' || type !== 'all';

  const clear = () => {
    setQuery('');
    setBu('all');
    setStatus('all');
    setType('all');
  };

  return (
    <>
      {/* Search hero */}
      <section className="bg-gradient-to-b from-navy-900 to-navy-800 pt-[68px] text-white">
        <div className="mx-auto max-w-5xl px-6 py-14 md:px-12 md:py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest text-blue-200 backdrop-blur">
              MAI · Catalog
            </div>
            <h1 className="mt-5 font-serif text-4xl leading-tight md:text-6xl">{t.products.title}</h1>
            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 md:text-lg">{t.products.subtitle}</p>
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
                placeholder={t.products.searchPlaceholder}
                className="w-full bg-transparent text-base outline-none placeholder:text-slate-400"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                  aria-label="Clear query"
                >
                  <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                    <path fillRule="evenodd" d="M4.22 4.22a.75.75 0 011.06 0L10 8.94l4.72-4.72a.75.75 0 111.06 1.06L11.06 10l4.72 4.72a.75.75 0 11-1.06 1.06L10 11.06l-4.72 4.72a.75.75 0 01-1.06-1.06L8.94 10 4.22 5.28a.75.75 0 010-1.06z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
          <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
            {/* Filter sidebar */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <FilterGroup
                  label="Business Unit"
                  value={bu}
                  onChange={setBu}
                  options={[
                    { value: 'all', label: t.products.allBus },
                    { value: 'farm', label: t.bu.farm },
                    { value: 'factory', label: t.bu.factory },
                    { value: 'corporate', label: t.bu.corporate },
                  ]}
                />
                <FilterGroup
                  label="Status"
                  value={status}
                  onChange={setStatus}
                  options={[
                    { value: 'all', label: t.products.allStatus },
                    { value: 'active', label: t.status.active },
                    { value: 'pending', label: t.status.pending },
                    { value: 'planning', label: t.status.planning },
                  ]}
                />
                <FilterGroup
                  label="Type"
                  value={type}
                  onChange={setType}
                  options={[
                    { value: 'all', label: t.products.allTypes },
                    ...(Object.keys(TYPE_LABEL) as ProjectType[]).map((k) => ({
                      value: k,
                      label: TYPE_LABEL[k],
                    })),
                  ]}
                />
                {anyFilter && (
                  <button
                    type="button"
                    onClick={clear}
                    className="mt-2 w-full rounded-full border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    {t.products.clearFilters}
                  </button>
                )}
              </div>
            </aside>

            {/* Results list */}
            <div>
              <div className="mb-4 flex items-center justify-between">
                <div className="text-sm text-slate-600">{t.products.resultCount(results.length)}</div>
              </div>
              {results.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                  {t.products.noResults}
                </div>
              ) : (
                <div className="space-y-4">
                  {results.map((p) => (
                    <ProductCard key={p.id} project={p} />
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
    <div className="mb-5">
      <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">{label}</div>
      <div className="mt-2 flex flex-col gap-1">
        {options.map((o) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              'w-full rounded-md px-2.5 py-1.5 text-left text-sm transition',
              value === o.value
                ? 'bg-blue-50 font-semibold text-blue-700'
                : 'text-slate-700 hover:bg-slate-50',
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}
