import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Tone = 'blue' | 'navy' | 'light' | 'outline';

export function Chip({
  children,
  tone = 'blue',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const tones: Record<Tone, string> = {
    blue: 'bg-blue-600 text-white',
    navy: 'bg-navy-900 text-white',
    light: 'bg-blue-50 text-blue-700',
    outline: 'border border-slate-300 text-slate-700 bg-white',
  };
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase',
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
