'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MITRPHOL_LOGO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useLang } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (forceSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceSolid]);

  const isSolid = forceSolid || scrolled;

  const items = [
    { href: '/#about', label: t.nav.about },
    { href: '/#portfolio', label: t.nav.portfolio },
    { href: '/products', label: t.nav.products, highlight: true as const },
    { href: '/#expertise', label: t.nav.expertise },
    { href: '/#traction', label: t.nav.traction },
    { href: '/#contact', label: t.nav.contact },
  ];

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 flex h-[68px] items-center justify-between px-6 md:px-12 transition-all duration-300',
        isSolid ? 'bg-white/95 backdrop-blur-xl border-b border-black/5' : 'bg-transparent',
      )}
    >
      <Link href="/" className="flex items-center gap-3">
        <Image
          src={MITRPHOL_LOGO}
          alt="Mitr Phol Group"
          width={140}
          height={40}
          className={cn('h-9 w-auto object-contain transition', !isSolid && 'brightness-0 invert')}
          unoptimized
        />
        <span className={cn('text-sm font-semibold tracking-wide', isSolid ? 'text-navy-900' : 'text-white/90')}>
          MAI
        </span>
      </Link>

      <div className="hidden items-center gap-7 md:flex">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'text-sm font-medium transition-colors',
              item.highlight
                ? isSolid
                  ? 'rounded-full bg-blue-50 px-3 py-1.5 text-blue-700 hover:bg-blue-100'
                  : 'rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-white backdrop-blur hover:bg-white/20'
                : isSolid
                  ? 'text-slate-700 hover:text-navy-900'
                  : 'text-white/80 hover:text-white',
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <LanguageToggle variant={isSolid ? 'solid' : 'ghost'} />
      </div>
    </nav>
  );
}
