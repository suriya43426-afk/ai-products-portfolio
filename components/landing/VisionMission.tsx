import { SectionHeader } from '@/components/ui/SectionHeader';
import { GradientCard } from '@/components/ui/GradientCard';

export function VisionMission() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
        <SectionHeader
          chip="Vision & Mission"
          title="Building the intelligent backbone of MitrPhol."
          subtitle="Our charter is to make AI measurably useful — not decoratively present — across the group."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <GradientCard src="/images/farm-field.jpg" alt="Farm field" minHeight={340}>
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-200">Vision</div>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">The most AI-capable industrial group in ASEAN.</h3>
            <p className="mt-4 max-w-md text-slate-200">
              Every product decision, every operational loop, and every investor conversation grounded in data and
              learning systems.
            </p>
          </GradientCard>
          <GradientCard src="/images/factory.jpg" alt="Factory floor" minHeight={340}>
            <div className="text-xs font-semibold uppercase tracking-widest text-blue-200">Mission</div>
            <h3 className="mt-3 font-serif text-3xl md:text-4xl">Ship AI that compounds.</h3>
            <p className="mt-4 max-w-md text-slate-200">
              Applied research with measurable KPIs. Shared data foundation. Governance-first delivery. Nine live
              products, one portfolio.
            </p>
          </GradientCard>
        </div>
      </div>
    </section>
  );
}
