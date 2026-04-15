import { SectionHeader } from '@/components/ui/SectionHeader';

export function VisionMission() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24">
        <SectionHeader
          chip="Vision & Mission"
          title="Building the intelligent backbone of MitrPhol."
          subtitle="Our charter is to make AI measurably useful — not decoratively present — across the group."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div
            className="relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-2xl border border-white/10 p-8 text-white shadow-md md:p-10"
            style={{ background: 'linear-gradient(135deg, #0c1629 0%, #12203d 45%, #2742b8 100%)' }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, #4167ec 0%, transparent 70%)' }}
            />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-widest text-blue-200">Vision</div>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">
                The most AI-capable industrial group in ASEAN.
              </h3>
              <p className="mt-4 max-w-md text-slate-200">
                Every product decision, every operational loop, and every executive conversation grounded in data and
                learning systems.
              </p>
            </div>
          </div>

          <div
            className="relative flex min-h-[300px] flex-col justify-center overflow-hidden rounded-2xl border border-white/10 p-8 text-white shadow-md md:p-10"
            style={{ background: 'linear-gradient(135deg, #022c22 0%, #064e3b 45%, #059669 100%)' }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-30 blur-3xl"
              style={{ background: 'radial-gradient(circle, #10b981 0%, transparent 70%)' }}
            />
            <div className="relative">
              <div className="text-xs font-semibold uppercase tracking-widest text-emerald-200">Mission</div>
              <h3 className="mt-3 font-serif text-3xl md:text-4xl">Ship AI that compounds.</h3>
              <p className="mt-4 max-w-md text-emerald-50/90">
                Applied research with measurable KPIs. Shared data foundation. Governance-first delivery. Nine live
                products, one portfolio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
