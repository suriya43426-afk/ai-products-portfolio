import type { BusinessUnit } from '@/types/project';
import { BU_CONFIG } from '@/lib/constants';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductRow } from './ProductRow';
import { getProjectsByBu } from '@/lib/projects';
import { cn } from '@/lib/utils';

export function BuSection({ bu, anchor }: { bu: BusinessUnit; anchor?: string }) {
  const cfg = BU_CONFIG[bu];
  const projects = getProjectsByBu(bu);

  const tone = cfg.tone;
  const bg =
    tone === 'navy'
      ? 'bg-navy-900 text-white'
      : tone === 'blue'
        ? 'bg-blue-50'
        : 'bg-white';

  const chipTone = tone === 'navy' ? 'navy' : tone === 'blue' ? 'blue' : 'light';
  const dark = tone === 'navy';

  return (
    <section id={anchor} className={cn(bg)}>
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <SectionHeader
          chip={cfg.label}
          chipTone={chipTone}
          dark={dark}
          title={cfg.label}
          subtitle={
            bu === 'farm'
              ? 'Geospatial intelligence and predictive modeling for millions of rai.'
              : bu === 'factory'
                ? 'Advanced process control and computer vision across biopower and sugar operations.'
                : 'Data foundation, agentic automation, and AI governance for the enterprise.'
          }
        />
        <div className={cn('mt-3 text-xs uppercase tracking-widest', dark ? 'text-slate-400' : 'text-slate-500')}>
          {projects.length} Products
        </div>
        <div className="mt-10 space-y-4">
          {projects.map((p) => (
            <ProductRow key={p.id} project={p} tone={tone} />
          ))}
        </div>
      </div>
    </section>
  );
}
