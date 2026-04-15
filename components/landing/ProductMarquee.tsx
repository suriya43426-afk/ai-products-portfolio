'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ProjectData } from '@/types/project';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechPill } from '@/components/ui/TechPill';

export function ProductMarquee({
  projects,
  speedSec = 60,
}: {
  projects: ProjectData[];
  speedSec?: number;
}) {
  // Duplicate items so the loop appears seamless
  const loop = [...projects, ...projects];

  return (
    <div className="marquee-pause group relative overflow-hidden">
      {/* Edge fade masks */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-slate-50 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-slate-50 to-transparent" />

      <div
        className="marquee-track flex w-max gap-4 py-1"
        style={{ animationDuration: `${speedSec}s` }}
      >
        {loop.map((p, i) => (
          <ProductCard key={`${p.id}-${i}`} project={p} />
        ))}
      </div>
    </div>
  );
}

function ProductCard({ project }: { project: ProjectData }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group/card flex w-[360px] shrink-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:border-blue-300 hover:shadow-md"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition group-hover/card:scale-105"
          sizes="360px"
        />
        <div className="absolute left-3 top-3">
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-blue-600">#{project.id}</span>
        </div>
        <div className="mt-1 font-serif text-lg leading-snug text-navy-900 group-hover/card:text-primary">
          {project.title}
        </div>
        <div className="mt-1 line-clamp-2 text-sm text-slate-600">{project.subtitle}</div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.techTags.slice(0, 3).map((t) => (
            <TechPill key={t}>{t}</TechPill>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between pt-4 text-xs">
          <span className="text-slate-500">{project.kpis[0]?.value}</span>
          <span className="font-semibold text-primary">View Research →</span>
        </div>
      </div>
    </Link>
  );
}
