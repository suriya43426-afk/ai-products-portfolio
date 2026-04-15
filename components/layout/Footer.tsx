import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-navy-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-serif text-xl text-white">MitrPhol AI</div>
            <p className="mt-2 text-sm text-slate-400">
              Center of Excellence — applied AI across agriculture, manufacturing, and enterprise data.
            </p>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Portfolio</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/#portfolio" className="hover:text-white">
                  Smart Agriculture
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-white">
                  Smart Manufacturing
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-white">
                  AI & Data Governance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Organization</div>
            <ul className="mt-3 space-y-2 text-sm">
              <li>A Division of MitrPhol Group</li>
              <li>Since 1946</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} MitrPhol AI. Figures marked Est. are illustrative for investor presentation.
        </div>
      </div>
    </footer>
  );
}
