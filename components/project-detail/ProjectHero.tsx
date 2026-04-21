import Image from 'next/image';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechPill } from '@/components/ui/TechPill';
import { KpiCard } from '@/components/ui/KpiCard';
import { TrlBadge } from '@/components/ui/TrlBadge';
import { TYPE_LABEL } from '@/lib/constants';
import type { ProjectData } from '@/types/project';

export function ProjectHero({ project }: { project: ProjectData }) {
  const progress = project.progress;
  const topPaper = project.papers?.find((p) => p.status === 'published') ?? project.papers?.[0];

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
          {progress?.trl && <TrlBadge level={progress.trl} />}
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

        {(progress || topPaper) && (
          <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 backdrop-blur">
            {progress && (
              <div className="min-w-[220px] flex-1">
                <div className="flex items-center justify-between text-[11px] font-medium text-slate-300">
                  <span className="uppercase tracking-wider">Maturity</span>
                  <span className="text-white">{progress.percent}%</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-300 to-white"
                    style={{ width: `${progress.percent}%` }}
                  />
                </div>
                <div className="mt-1.5 text-xs text-slate-300">
                  {progress.stage}
                  {progress.milestone ? ` · ${progress.milestone}` : ''}
                </div>
              </div>
            )}
            {topPaper && (
              <a
                href="#papers"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 2v6h6" />
                </svg>
                Latest paper {topPaper.version} · {topPaper.status}
              </a>
            )}
          </div>
        )}

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4">
          {project.kpis.map((k) => (
            <KpiCard key={k.label} kpi={k} dark />
          ))}
        </div>
      </div>
    </section>
  );
}
