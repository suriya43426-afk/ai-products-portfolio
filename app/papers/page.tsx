import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { literatureStore } from '@/lib/literatureStore';
import { getAllProjects } from '@/lib/projects';
import { PapersExplorer } from '@/components/papers/PapersExplorer';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Relevance Paper — MAI',
  description: 'Aggregated literature across all AI products.',
};

export default async function PapersPage() {
  const [entries, projects] = await Promise.all([literatureStore.list(), getAllProjects()]);
  const projectMap = new Map(projects.map((p) => [p.slug, { title: p.title, bu: p.businessUnit }]));

  return (
    <>
      <Navbar forceSolid />
      <main className="min-h-screen bg-white pt-[96px]">
        <section className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-blue-600">
                Literature Index
              </div>
              <h1 className="mt-2 font-serif text-3xl text-navy-900 md:text-4xl">Relevance Paper</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                Every paper referenced across MAI&apos;s AI products. Filter by project, group, or status. Click a
                paper to jump to its project-level entry.
              </p>
            </div>
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-navy-900">{entries.length}</span> entries
              {' · '}
              <span className="font-semibold text-navy-900">{projectMap.size}</span> projects
            </div>
          </div>

          <div className="mt-8">
            <PapersExplorer
              entries={entries}
              projects={Array.from(projectMap.entries()).map(([slug, meta]) => ({
                slug,
                title: meta.title,
                bu: meta.bu,
              }))}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
