import Image from 'next/image';
import Link from 'next/link';
import { Chip } from '@/components/ui/Chip';

const pillars = [
  {
    image: '/images/farm-hero.jpg',
    label: 'Smart Agriculture',
    blurb: 'Satellite + ground IoT guiding planting, yield, and sourcing decisions.',
  },
  {
    image: '/images/factory.jpg',
    label: 'Smart Manufacturing',
    blurb: 'Vision, control, and advanced process optimization at plant scale.',
  },
  {
    image: '/images/navy-data.jpg',
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
    <section className="relative isolate overflow-hidden pt-[68px] text-white">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/farm-hero.jpg"
          alt="MitrPhol farm operations"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/75 to-navy-900/95" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
        <Chip tone="outline" className="border-white/30 bg-white/10 text-white">
          MitrPhol AI · Center of Excellence
        </Chip>
        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-tight md:text-7xl">
          Applied AI at the scale of a 79-year industrial group.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-200 md:text-xl">
          A deep-tech portfolio of nine AI products spanning farm, factory, and corporate data — built to compound
          returns across MitrPhol&apos;s operations.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="#portfolio"
            className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:bg-slate-100"
          >
            View Portfolio
          </Link>
          <Link
            href="#contact"
            className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {pillars.map((p) => (
            <div
              key={p.label}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="relative aspect-[16/10]">
                <Image src={p.image} alt={p.label} fill className="object-cover opacity-80 transition group-hover:opacity-100" sizes="(max-width:768px) 100vw, 33vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/50 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-blue-200">{p.label}</div>
                <div className="mt-2 text-sm text-slate-200">{p.blurb}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 gap-4 border-t border-white/10 pt-10 md:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label}>
              <div className="font-serif text-4xl text-white md:text-5xl">{k.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-slate-400">{k.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
