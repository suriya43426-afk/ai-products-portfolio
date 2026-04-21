import type { TrlLevel } from '@/types/project';
import { cn } from '@/lib/utils';

const TRL_LABEL: Record<TrlLevel, string> = {
  1: 'Basic Principles',
  2: 'Technology Concept',
  3: 'Proof of Concept',
  4: 'Lab Validation',
  5: 'Relevant Environment',
  6: 'Prototype Demo',
  7: 'Operational Demo',
  8: 'System Complete',
  9: 'Proven in Operation',
};

export function TrlBadge({ level, className }: { level: TrlLevel; className?: string }) {
  const tone =
    level >= 8
      ? 'bg-[color:var(--color-green)]/10 text-green'
      : level >= 5
        ? 'bg-blue-50 text-blue-700'
        : 'bg-[color:var(--color-amber)]/10 text-amber';

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold',
        tone,
        className,
      )}
      title={`TRL ${level} — ${TRL_LABEL[level]}`}
    >
      <span className="font-mono">TRL {level}</span>
      <span className="text-slate-500">·</span>
      <span className="hidden sm:inline">{TRL_LABEL[level]}</span>
    </span>
  );
}
