import Image from 'next/image';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function GradientCard({
  src,
  alt,
  minHeight = 280,
  className,
  children,
  overlayFrom = 'rgba(12,22,41,0.85)',
  overlayTo = 'rgba(12,22,41,0.25)',
}: {
  src: string;
  alt: string;
  minHeight?: number;
  className?: string;
  children?: ReactNode;
  overlayFrom?: string;
  overlayTo?: string;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-white/10 text-white',
        className,
      )}
      style={{ minHeight }}
    >
      <Image src={src} alt={alt} fill priority={false} className="object-cover" sizes="(max-width:1024px) 100vw, 50vw" />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to top, ${overlayFrom}, ${overlayTo})` }}
      />
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-8">{children}</div>
    </div>
  );
}
