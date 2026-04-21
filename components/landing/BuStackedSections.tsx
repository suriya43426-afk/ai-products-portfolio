import Image from 'next/image';
import type { BusinessUnit, ProjectData } from '@/types/project';
import { BU_META, BU_ORDER, type BuMeta } from '@/lib/bu';
import { ProductRow } from './ProductRow';

function BuBlock({
  info,
  projects,
  index,
}: {
  info: BuMeta;
  projects: ProjectData[];
  index: number;
}) {
  return (
    <section id={`bu-${info.key}`} className="scroll-mt-24 bg-white">
      <details className="group">
        <summary className="list-none cursor-pointer [&::-webkit-details-marker]:hidden">
          <div className="mx-auto max-w-7xl px-6 pt-14 md:px-12 md:pt-20">
            <div className="grid gap-6 md:grid-cols-[140px_1fr] md:items-center">
              <div className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200 md:block">
                <Image src={info.bg} alt={info.label} fill className="object-cover" sizes="140px" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <span className="h-px w-10" style={{ background: info.accent }} />
                  <span
                    className="text-[11px] font-semibold uppercase tracking-[0.22em]"
                    style={{ color: info.accent }}
                  >
                    {`Portfolio · Part ${index + 1}`}
                  </span>
                </div>
                <div className="mt-3 flex items-start justify-between gap-4">
                  <h2 className="font-serif text-3xl text-navy-900 md:text-4xl">{info.label}</h2>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden
                    className="mt-2 h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">{info.subtitle}</p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: info.accent }} />
                  {projects.length} {projects.length === 1 ? 'product' : 'products'}
                </div>
              </div>
            </div>
          </div>
        </summary>

        <div className="bg-white">
          <div className="mx-auto max-w-7xl space-y-4 px-6 py-10 md:px-12 md:py-12">
            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                No projects in this business unit.
              </div>
            ) : (
              projects.map((p) => (
                <ProductRow key={p.id} project={p} tone="white" accent={info.accent} />
              ))
            )}
          </div>
        </div>
      </details>
    </section>
  );
}

export function BuStackedSections({
  projectsByBu,
}: {
  projectsByBu: Record<BusinessUnit, ProjectData[]>;
}) {
  return (
    <section id="portfolio" className="bg-white pb-24 md:pb-32">
      {BU_ORDER.map((key, i) => (
        <BuBlock key={key} info={BU_META[key]} projects={projectsByBu[key] ?? []} index={i} />
      ))}
    </section>
  );
}
