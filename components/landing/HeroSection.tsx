import Image from 'next/image';

const pillars = [
  {
    image: '/images/agri_background.png',
    label: 'Smart Agriculture',
    blurb: 'Satellite + ground IoT guiding planting, yield, and sourcing decisions.',
  },
  {
    image: '/images/fac_background.png',
    label: 'Smart Manufacturing',
    blurb: 'Vision, control, and advanced process optimization at plant scale.',
  },
  {
    image: '/images/gen_background.png',
    label: 'AI & Data Governance',
    blurb: 'Lakehouse, agentic automation, and ISO-aligned AI management.',
  },
];

const kpis = [
  { value: '4', label: 'Tech Domains' },
  { value: '14+', label: 'Models in Eval' },
  { value: '7', label: 'Papers on File' },
  { value: '1 Gold', label: 'Shared Data Zone' },
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/hero_background.png"
          alt="MitrPhol AI hero"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/70 via-navy-900/35 to-navy-900/80" />
      </div>

      <div className="mx-auto max-w-7xl px-6 pt-[160px] pb-16 md:px-12 md:pt-[200px] md:pb-20">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
          <span className="h-px w-8 bg-blue-300/60" />
          Deep Tech Journey
        </span>

        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.1] md:text-6xl lg:text-7xl">
          Methodology, progress, and published papers — read the work.
        </h1>
        <p className="mt-6 max-w-2xl text-base text-white md:text-lg">
          Model architectures, training protocols, evaluation metrics, and version-controlled research
          artifacts across MitrPhol&apos;s AI portfolio.
        </p>

        <div className="mt-16 flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-white/10 pt-8">
          {kpis.map((k) => (
            <div key={k.label}>
              <div className="font-serif text-3xl leading-none text-white md:text-4xl">{k.value}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-white">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 pb-16 md:px-12 md:pb-24">
        <div className="grid gap-4 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition hover:bg-white/10"
            >
              <div className="relative aspect-[16/9]">
                <Image
                  src={p.image}
                  alt={p.label}
                  fill
                  className="object-cover transition group-hover:scale-105"
                  sizes="(max-width:768px) 100vw, 33vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-200">{p.label}</div>
                <div className="mt-2 text-sm leading-relaxed text-slate-200">{p.blurb}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
