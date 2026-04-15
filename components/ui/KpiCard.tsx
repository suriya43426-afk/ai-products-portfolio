import { cn } from '@/lib/utils';
import type { KpiMetric } from '@/types/project';

export function KpiCard({ kpi, dark = false, className }: { kpi: KpiMetric; dark?: boolean; className?: string }) {
  const valueClass =
    kpi.highlight === 'green'
      ? 'text-green'
      : kpi.highlight === 'blue'
        ? 'text-blue-500'
        : dark
          ? 'text-white'
          : 'text-navy-900';

  return (
    <div
      className={cn(
        'rounded-2xl border p-5',
        dark ? 'border-white/10 bg-white/5' : 'border-slate-200 bg-white',
        className,
      )}
    >
      <div className={cn('text-2xl font-bold leading-tight', valueClass)}>{kpi.value}</div>
      <div className={cn('mt-1 text-xs uppercase tracking-wide', dark ? 'text-slate-300' : 'text-slate-500')}>
        {kpi.label}
      </div>
    </div>
  );
}
