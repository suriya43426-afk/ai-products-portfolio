'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MITRPHOL_LOGO } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { LanguageToggle } from './LanguageToggle';

type NavPage = {
  href: string;
  label: string;
  icon: 'home' | 'grid' | 'book' | 'graph' | 'cog';
};

const PAGES: NavPage[] = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/products', label: 'AI Products', icon: 'grid' },
  { href: '/papers', label: 'Relevance Paper', icon: 'book' },
  { href: '/knowledge', label: 'AI Knowledge', icon: 'graph' },
  { href: '/manage', label: 'Manage', icon: 'cog' },
];

function NavIcon({ name }: { name: NavPage['icon'] }) {
  switch (name) {
    case 'home':
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M10 2.2 2.4 8.4a1 1 0 00-.4.8V17a1 1 0 001 1h4v-5h6v5h4a1 1 0 001-1V9.2a1 1 0 00-.4-.8L10 2.2z" />
        </svg>
      );
    case 'grid':
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M3 3h6v6H3V3zm8 0h6v6h-6V3zM3 11h6v6H3v-6zm8 0h6v6h-6v-6z" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path d="M3 3a2 2 0 012-2h6a1 1 0 011 1v14a1 1 0 01-1 1H5a2 2 0 01-2-2V3zm12-1a1 1 0 00-1 1v14a1 1 0 001 1h1a2 2 0 002-2V4a2 2 0 00-2-2h-1z" />
        </svg>
      );
    case 'graph':
      return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-3.5 w-3.5">
          <circle cx="4" cy="5" r="2" />
          <circle cx="16" cy="5" r="2" />
          <circle cx="10" cy="15" r="2" />
          <path d="M5.4 6.4l3.2 7.2M14.6 6.4l-3.2 7.2M6 5h8" />
        </svg>
      );
    case 'cog':
      return (
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 01.9.55l.55 1.1a6.5 6.5 0 011.87.77l1.2-.4a1 1 0 011.2.55l.6 1.2a1 1 0 01-.3 1.23l-.95.76a6.5 6.5 0 010 2.08l.95.76a1 1 0 01.3 1.23l-.6 1.2a1 1 0 01-1.2.55l-1.2-.4a6.5 6.5 0 01-1.87.77l-.55 1.1a1 1 0 01-1.8 0l-.55-1.1a6.5 6.5 0 01-1.87-.77l-1.2.4a1 1 0 01-1.2-.55l-.6-1.2a1 1 0 01.3-1.23l.95-.76a6.5 6.5 0 010-2.08l-.95-.76a1 1 0 01-.3-1.23l.6-1.2a1 1 0 011.2-.55l1.2.4A6.5 6.5 0 018.55 3.65l.55-1.1A1 1 0 0110 2zm0 5.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"
            clipRule="evenodd"
          />
        </svg>
      );
  }
}

export function Navbar({ forceSolid = false }: { forceSolid?: boolean }) {
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

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        isSolid ? 'bg-white/95 backdrop-blur-xl border-b border-black/5' : 'bg-transparent',
      )}
    >
      <div className="flex h-[68px] items-center justify-between gap-6 px-6 md:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-3">
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

        <div className="hidden items-center gap-2 md:flex">
          {PAGES.map((page) => {
            const active = isActive(page.href);
            return (
              <Link
                key={page.href}
                href={page.href}
                className={cn(
                  'group inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-all',
                  active
                    ? 'bg-primary text-white shadow-sm hover:bg-primary-light'
                    : isSolid
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'border border-white/25 bg-white/10 text-white backdrop-blur hover:bg-white/20',
                )}
              >
                <NavIcon name={page.icon} />
                {page.label}
              </Link>
            );
          })}
        </div>

        <LanguageToggle variant={isSolid ? 'solid' : 'ghost'} />
      </div>
    </nav>
  );
}
