import Link from 'next/link';
import Image from 'next/image';
import { MITRPHOL_LOGO } from '@/lib/constants';

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3 md:px-10">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <Image src={MITRPHOL_LOGO} alt="MitrPhol" width={110} height={32} className="h-7 w-auto" unoptimized />
              <span className="text-sm font-semibold text-navy-900">MAI</span>
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/manage" className="text-sm font-semibold text-navy-900">
              Manage
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-xs text-slate-600 hover:text-navy-900">
              View site
            </Link>
            <Link
              href="/manage"
              className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              All items
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
