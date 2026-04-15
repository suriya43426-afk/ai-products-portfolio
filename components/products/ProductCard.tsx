'use client';

import Image from 'next/image';
import Link from 'next/link';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechPill } from '@/components/ui/TechPill';
import { BU_CONFIG, TYPE_LABEL } from '@/lib/constants';
import type { ProjectData } from '@/types/project';
import { useLang } from '@/lib/i18n';

export function ProductCard({ project }: { project: ProjectData }) {
  const { t } = useLang();
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group grid gap-5 overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-md md:grid-cols-[180px_1fr] md:p-5"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl md:aspect-auto md:h-full">
        <Image src={project.image} alt={project.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 180px" />
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="font-semibold text-blue-600">#{project.id}</span>
          <StatusBadge status={project.status} label={t.status[project.status]} />
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-slate-600">{TYPE_LABEL[project.type]}</span>
          <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-blue-700">{t.bu[project.businessUnit]}</span>
        </div>
        <div className="mt-2 font-serif text-xl text-navy-900 group-hover:text-primary md:text-2xl">
          {project.title}
        </div>
        <div className="mt-1 text-sm text-slate-600">{project.subtitle}</div>
        <p className="mt-3 line-clamp-2 text-sm text-slate-600">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techTags.slice(0, 6).map((tag) => (
            <TechPill key={tag}>{tag}</TechPill>
          ))}
        </div>
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          {t.products.openProject}
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 transition group-hover:translate-x-0.5">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.06 10 7.23 6.29a.75.75 0 111.04-1.08l4.39 4.25a.75.75 0 010 1.08l-4.39 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
