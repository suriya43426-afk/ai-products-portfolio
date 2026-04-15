'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { BusinessUnit, ProjectData } from '@/types/project';
import { ProductRow } from './ProductRow';
import { cn } from '@/lib/utils';

const TABS: { key: BusinessUnit; label: string; bg: string; accent: string; subtitle: string }[] = [
  {
    key: 'farm',
    label: 'Smart Agriculture',
    bg: '/images/agri_background.png',
    accent: '#16a34a',
    subtitle: 'Geospatial intelligence and predictive modeling for millions of rai.',
  },
  {
    key: 'factory',
    label: 'Smart Manufacturing',
    bg: '/images/fac_background.png',
    accent: '#3050d6',
    subtitle: 'Advanced process control and computer vision across biopower and sugar operations.',
  },
  {
    key: 'corporate',
    label: 'AI & Data Governance',
    bg: '/images/gen_background.png',
    accent: '#7c3aed',
    subtitle: 'Data foundation, agentic automation, and AI governance for the enterprise.',
  },
];

export function BuTabsSection({
  projectsByBu,
}: {
  projectsByBu: Record<BusinessUnit, ProjectData[]>;
}) {
  const [active, setActive] = useState<BusinessUnit>('farm');
  const tab = TABS.find((t) => t.key === active)!;
  const projects = projectsByBu[active] ?? [];

  return (
    <section id="portfolio" className="bg-white">
      {/* Banner */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            key={tab.bg}
            src={tab.bg}
            alt={tab.label}
            fill
            className="object-cover transition-opacity duration-500"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, rgba(12,22,41,0.85) 0%, rgba(12,22,41,0.55) 30%, rgba(12,22,41,0.15) 60%, rgba(12,22,41,0) 85%)',
            }}
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10 transition-colors" style={{ background: tab.accent }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              Portfolio
            </span>
          </div>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-white md:text-5xl">
            {tab.label}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">{tab.subtitle}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-6 md:gap-2 md:px-12">
          {TABS.map((t) => {
            const isActive = t.key === active;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => setActive(t.key)}
                className={cn(
                  'relative shrink-0 px-4 py-4 text-sm font-semibold transition-colors md:px-6',
                  isActive ? 'text-navy-900' : 'text-slate-500 hover:text-navy-900',
                )}
              >
                <span className="flex items-center gap-2.5">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-30',
                    )}
                    style={{ background: t.accent }}
                  />
                  {t.label}
                  <span
                    className={cn(
                      'rounded-full px-2 py-0.5 text-[10px] font-semibold transition',
                      isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500',
                    )}
                  >
                    {projectsByBu[t.key]?.length ?? 0}
                  </span>
                </span>
                {isActive && (
                  <span
                    className="absolute inset-x-3 -bottom-px h-0.5"
                    style={{ background: tab.accent }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Product list (long cards, no scroll) */}
      <div className="bg-slate-50">
        <div className="mx-auto max-w-7xl space-y-4 px-6 py-12 md:px-12 md:py-16">
          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
              No projects in this business unit.
            </div>
          ) : (
            projects.map((p) => <ProductRow key={p.id} project={p} tone="white" />)
          )}
        </div>
      </div>
    </section>
  );
}
