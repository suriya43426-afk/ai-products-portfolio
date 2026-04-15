import Image from 'next/image';
import Link from 'next/link';

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
  { value: '9', label: 'AI Projects' },
  { value: '3', label: 'Business Units' },
  { value: '฿500M+', label: 'Pipeline Value' },
  { value: '1.2M', label: 'Growers Served' },
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

      {/* Headline block */}
      <div className="mx-auto max-w-7xl px-6 pt-[160px] pb-16 md:px-12 md:pt-[200px] md:pb-20">
        <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-200">
          <span className="h-px w-8 bg-blue-300/60" />
          MitrPhol AI · Center of Excellence
        </span>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.1] md:text-6xl lg:text-7xl">
          Applied AI at the scale of a 79-year industrial group.
        </h1>
        <p className="mt-6 max-w-xl text-base text-slate-300 md:text-lg">
          A deep-tech portfolio of nine AI products spanning farm, factory, and corporate data — built to compound
          returns across MitrPhol&apos;s operations.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="#portfolio"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100"
          >
            View Portfolio
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>

        {/* KPI strip — single line, refined */}
        <div className="mt-16 flex flex-wrap items-end gap-x-12 gap-y-6 border-t border-white/10 pt-8">
          {kpis.map((k) => (
            <div key={k.label}>
              <div className="font-serif text-3xl leading-none text-white md:text-4xl">{k.value}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-slate-400">{k.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar strip — overlapping into next section, light bg below */}
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
