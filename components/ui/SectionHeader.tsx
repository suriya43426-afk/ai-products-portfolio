import type { ReactNode } from 'react';
import { Chip } from './Chip';
import { cn } from '@/lib/utils';

export function SectionHeader({
  chip,
  chipTone = 'light',
  title,
  subtitle,
  dark = false,
  className,
  align = 'left',
}: {
  chip?: string;
  chipTone?: 'blue' | 'navy' | 'light' | 'outline';
  title: ReactNode;
  subtitle?: ReactNode;
  dark?: boolean;
  className?: string;
  align?: 'left' | 'center';
}) {
  return (
    <div className={cn(align === 'center' && 'text-center', className)}>
      {chip && (
        <Chip tone={chipTone} className="mb-4">
          {chip}
        </Chip>
      )}
      <h2
        className={cn(
          'font-serif text-4xl font-bold leading-tight md:text-5xl',
          dark ? 'text-white' : 'text-navy-900',
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={cn('mt-4 max-w-3xl text-base md:text-lg', dark ? 'text-slate-300' : 'text-slate-600')}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
