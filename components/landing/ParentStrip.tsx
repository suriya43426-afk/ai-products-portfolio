import Image from 'next/image';
import { MITRPHOL_LOGO } from '@/lib/constants';

export function ParentStrip() {
  return (
    <div className="border-y border-slate-200 bg-off-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-6 py-6 md:px-12">
        <div className="flex items-center gap-4">
          <Image
            src={MITRPHOL_LOGO}
            alt="Mitr Phol Group"
            width={120}
            height={36}
            className="h-9 w-auto object-contain"
            unoptimized
          />
          <div>
            <div className="text-xs uppercase tracking-widest text-slate-500">A Division of</div>
            <div className="text-sm font-semibold text-navy-900">Mitr Phol Group</div>
          </div>
        </div>
        <div className="text-xs uppercase tracking-widest text-slate-500">
          Since 1946 · Thailand&apos;s Largest Sugar & Bioenergy Producer
        </div>
      </div>
    </div>
  );
}
