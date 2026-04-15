'use client';

import { useLang } from '@/lib/i18n';
import { cn } from '@/lib/utils';

export function LanguageToggle({ variant = 'solid' }: { variant?: 'solid' | 'ghost' }) {
  const { lang, setLang } = useLang();
  const base =
    variant === 'solid'
      ? 'bg-slate-100 text-slate-600'
      : 'bg-white/10 text-white/80 backdrop-blur border border-white/20';
  const active =
    variant === 'solid'
      ? 'bg-primary text-white shadow-sm'
      : 'bg-white text-navy-900';

  return (
    <div
      role="tablist"
      aria-label="Language"
      className={cn('inline-flex items-center rounded-full p-0.5 text-xs font-semibold', base)}
    >
      {(['en', 'th'] as const).map((l) => (
        <button
          key={l}
          role="tab"
          aria-selected={lang === l}
          type="button"
          onClick={() => setLang(l)}
          className={cn(
            'rounded-full px-3 py-1.5 uppercase tracking-wider transition',
            lang === l ? active : 'hover:text-inherit',
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
