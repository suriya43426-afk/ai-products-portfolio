'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MITRPHOL_LOGO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useLang } from '@/lib/i18n';
import { LanguageToggle } from './LanguageToggle';

export function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (forceSolid) return;
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceSolid]);

  const isSolid = forceSolid || scrolled;

  const primary = [
    { href: '/#about', label: t.nav.about },
    { href: '/#portfolio', label: t.nav.portfolio },
    { href: '/#expertise', label: t.nav.expertise },
    { href: '/#traction', label: t.nav.traction },
    { href: '/#contact', label: t.nav.contact },
  ];
  const catalogs = [
    { href: '/data-products', label: t.nav.dataProducts },
    { href: '/products', label: t.nav.products },
  ];

  const isActive = (href: string) => href.startsWith('/') && !href.includes('#') && pathname.startsWith(href);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isSolid ? 'bg-white/95 backdrop-blur-xl border-b border-black/5' : 'bg-transparent',
      )}
    >
      <div className="flex h-[68px] items-center justify-between px-6 md:px-12">
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
          {primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors',
                isSolid ? 'text-slate-700 hover:text-navy-900' : 'text-white/80 hover:text-white',
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <LanguageToggle variant={isSolid ? 'solid' : 'ghost'} />
      </div>

      {/* Second row — centered catalog pill buttons */}
      <div
        className={cn(
          'transition-colors',
          isSolid ? 'border-t border-slate-100 bg-white' : 'bg-transparent',
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center px-6 py-3 md:px-12">
          <div
            className={cn(
              'inline-flex items-center gap-1 rounded-full p-1',
              isSolid ? 'bg-slate-100' : 'border border-white/20 bg-white/10 backdrop-blur',
            )}
          >
            {catalogs.map((c) => {
              const active = isActive(c.href);
              return (
                <Link
                  key={c.href}
                  href={c.href}
                  className={cn(
                    'rounded-full px-5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition',
                    active
                      ? 'bg-primary text-white shadow-sm'
                      : isSolid
                        ? 'text-slate-600 hover:text-navy-900'
                        : 'text-white/80 hover:text-white',
                  )}
                >
                  {c.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
