import Image from 'next/image';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechPill } from '@/components/ui/TechPill';
import { KpiCard } from '@/components/ui/KpiCard';
import { TYPE_LABEL } from '@/lib/constants';
import type { ProjectData } from '@/types/project';

export function ProjectHero({ project }: { project: ProjectData }) {
  return (
    <section className="relative isolate overflow-hidden pt-[116px] text-white">
      <div className="absolute inset-0 -z-10">
        <Image src={project.heroImage} alt={project.title} fill priority className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/75 to-navy-900/95" />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="font-semibold text-blue-200">#{project.id}</span>
          <span className="text-slate-400">·</span>
          <span className="uppercase tracking-wider text-slate-200">{TYPE_LABEL[project.type]}</span>
          <StatusBadge status={project.status} label={project.statusLabel} />
        </div>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-tight md:text-6xl">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-lg text-slate-200">{project.subtitle}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.techTags.map((t) => (
            <TechPill key={t} className="border-white/20 bg-white/10 text-white">
              {t}
            </TechPill>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.kpis.map((k) => (
            <KpiCard key={k.label} kpi={k} dark />
          ))}
        </div>
      </div>
    </section>
  );
}
