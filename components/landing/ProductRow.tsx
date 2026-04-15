'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechPill } from '@/components/ui/TechPill';
import { KpiCard } from '@/components/ui/KpiCard';
import { BenefitItem } from '@/components/ui/BenefitItem';
import type { ProjectData } from '@/types/project';
import { cn } from '@/lib/utils';

export function ProductRow({ project, tone = 'white' }: { project: ProjectData; tone?: 'white' | 'blue' | 'navy' }) {
  const [open, setOpen] = useState(false);

  const shell =
    tone === 'navy'
      ? 'border-white/10 bg-white/5 text-white'
      : tone === 'blue'
        ? 'border-blue-100 bg-white'
        : 'border-slate-200 bg-white';

  const titleClass = tone === 'navy' ? 'text-white' : 'text-navy-900';
  const descClass = tone === 'navy' ? 'text-slate-300' : 'text-slate-600';

  return (
    <div className={cn('overflow-hidden rounded-2xl border transition', shell)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid w-full grid-cols-[96px_1fr_auto] items-center gap-5 p-4 text-left md:grid-cols-[140px_1fr_auto] md:gap-6 md:p-5"
        aria-expanded={open}
      >
        <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl md:h-24 md:w-full">
          <Image src={project.image} alt={project.title} fill className="object-cover" sizes="140px" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className={cn('text-xs font-semibold', tone === 'navy' ? 'text-blue-300' : 'text-blue-600')}>
              #{project.id}
            </span>
            <StatusBadge status={project.status} label={project.statusLabel} />
          </div>
          <div className={cn('mt-1 font-serif text-xl font-semibold md:text-2xl', titleClass)}>{project.title}</div>
          <div className={cn('mt-1 text-sm', descClass)}>{project.subtitle}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {project.techTags.slice(0, 4).map((t) => (
              <TechPill key={t}>{t}</TechPill>
            ))}
          </div>
        </div>

        <div
          className={cn(
            'flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition',
            tone === 'navy' ? 'bg-white/10 text-white' : 'bg-slate-100 text-navy-900',
            open && 'rotate-180',
          )}
          aria-hidden
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </div>
      </button>

      {open && (
        <div className={cn('border-t px-4 py-6 md:px-5', tone === 'navy' ? 'border-white/10' : 'border-slate-200')}>
          <div className={cn('text-sm', descClass)}>{project.description}</div>

          <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-3">
            {project.kpis.map((k) => (
              <KpiCard key={k.label} kpi={k} dark={tone === 'navy'} />
            ))}
          </div>

          <ul className="mt-6 grid gap-3 md:grid-cols-3">
            {project.benefits.map((b) => (
              <BenefitItem key={b.title} benefit={b} />
            ))}
          </ul>

          <div className="mt-6 flex items-center justify-between">
            <div className={cn('text-xs italic', tone === 'navy' ? 'text-slate-400' : 'text-slate-500')}>
              {project.metricNote}
            </div>
            <Link
              href={`/projects/${project.slug}`}
              className={cn(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition',
                tone === 'navy'
                  ? 'bg-white text-navy-900 hover:bg-slate-100'
                  : 'bg-primary text-white hover:bg-primary-light',
              )}
            >
              View Research Methodology
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.06 10 7.23 6.29a.75.75 0 111.04-1.08l4.39 4.25a.75.75 0 010 1.08l-4.39 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
