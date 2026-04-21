import Link from 'next/link';
import { cn } from '@/lib/utils';
import { ProductIcon } from '@/components/ui/ProductIcon';
import type { BuTone } from '@/lib/bu';
import type { MainProduct } from '@/data/mainProducts';

interface ToneStyle {
  ring: string;
  chipBg: string;
  chipText: string;
  bar: string;
  iconBg: string;
  accent: string;
  glow: string;
}

const TONE_STYLES: Record<BuTone, ToneStyle> = {
  green: {
    ring: 'hover:border-green/50',
    chipBg: 'bg-[color:var(--color-green)]/10',
    chipText: 'text-green',
    bar: 'bg-green',
    iconBg: 'bg-[color:var(--color-green)]/10 text-green',
    accent: 'text-green',
    glow: 'from-[color:var(--color-green)]/15',
  },
  blue: {
    ring: 'hover:border-blue-500/50',
    chipBg: 'bg-blue-50',
    chipText: 'text-blue-700',
    bar: 'bg-blue-600',
    iconBg: 'bg-blue-50 text-blue-700',
    accent: 'text-blue-700',
    glow: 'from-blue-500/15',
  },
  violet: {
    ring: 'hover:border-violet/50',
    chipBg: 'bg-[color:var(--color-violet)]/10',
    chipText: 'text-violet',
    bar: 'bg-violet',
    iconBg: 'bg-[color:var(--color-violet)]/10 text-violet',
    accent: 'text-violet',
    glow: 'from-[color:var(--color-violet)]/15',
  },
};

export function MainProductCard({ product }: { product: MainProduct }) {
  const t = TONE_STYLES[product.tone];

  return (
    <Link
      href={`/projects/${product.slug}`}
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all',
        'hover:-translate-y-0.5 hover:shadow-lg',
        t.ring,
      )}
    >
      <div
        aria-hidden
        className={cn(
          'pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br to-transparent opacity-60 blur-2xl transition-opacity group-hover:opacity-100',
          t.glow,
        )}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className={cn('flex h-10 w-10 items-center justify-center rounded-xl', t.iconBg)}>
            <ProductIcon name={product.icon} />
          </div>
          <span
            className={cn(
              'rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider',
              t.chipBg,
              t.chipText,
            )}
          >
            {product.category}
          </span>
        </div>
        <span className="text-[11px] font-medium text-slate-500">{product.stage}</span>
      </div>

      <h3 className="mt-5 font-serif text-xl font-semibold text-navy-900 md:text-2xl">{product.title}</h3>
      <p className="mt-1 text-sm text-slate-600">{product.subtitle}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-500">{product.blurb}</p>

      <div className="mt-5">
        <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
          <span>TRL {product.trl} · Maturity</span>
          <span className={t.accent}>{product.progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className={cn('h-full rounded-full transition-all', t.bar)} style={{ width: `${product.progress}%` }} />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
        {product.stats.map((s) => (
          <div key={s.label}>
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{s.label}</div>
            <div className={cn('mt-0.5 font-serif text-base font-semibold', t.accent)}>{s.value}</div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-slate-500 transition group-hover:text-navy-900">
        Open methodology
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.06 10 7.23 6.29a.75.75 0 111.04-1.08l4.39 4.25a.75.75 0 010 1.08l-4.39 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </div>
    </Link>
  );
}
