import Image from 'next/image';
import type { BusinessUnit } from '@/types/project';
import { BU_CONFIG } from '@/lib/constants';
import { ProductMarquee } from './ProductMarquee';
import { getProjectsByBu } from '@/lib/projects';

const BU_BG: Record<BusinessUnit, string> = {
  farm: '/images/agri_background.png',
  factory: '/images/fac_background.png',
  corporate: '/images/gen_background.png',
};

const BU_ACCENT: Record<BusinessUnit, string> = {
  farm: '#16a34a',
  factory: '#3050d6',
  corporate: '#7c3aed',
};

const BU_SUBTITLE: Record<BusinessUnit, string> = {
  farm: 'Geospatial intelligence and predictive modeling for millions of rai.',
  factory: 'Advanced process control and computer vision across biopower and sugar operations.',
  corporate: 'Data foundation, agentic automation, and AI governance for the enterprise.',
};

export async function BuSection({ bu, anchor }: { bu: BusinessUnit; anchor?: string }) {
  const cfg = BU_CONFIG[bu];
  const projects = await getProjectsByBu(bu);
  const accent = BU_ACCENT[bu];

  return (
    <section id={anchor} className="bg-white">
      {/* Banner */}
      <div className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image src={BU_BG[bu]} alt={cfg.label} fill className="object-cover" sizes="100vw" />
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
            <span className="h-px w-10" style={{ background: accent }} />
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
              {cfg.label}
            </span>
          </div>
          <h2 className="mt-4 max-w-3xl font-serif text-3xl leading-tight text-white md:text-5xl">
            {cfg.label}
          </h2>
          <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">{BU_SUBTITLE[bu]}</p>
        </div>
      </div>

      {/* Product list — horizontal auto-scroll marquee */}
      <div className="bg-slate-50">
        <div className="py-12 md:py-16">
          <ProductMarquee projects={projects} speedSec={projects.length <= 2 ? 30 : 50} />
        </div>
      </div>
    </section>
  );
}
