import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { literatureStore } from '@/lib/literatureStore';
import { getAllProjects } from '@/lib/projects';
import { KnowledgeGraph } from '@/components/knowledge/KnowledgeGraph';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'AI Knowledge — MAI',
  description: 'Knowledge graph across MAI literature, Obsidian-compatible.',
};

export default async function KnowledgePage() {
  const [entries, projects] = await Promise.all([literatureStore.list(), getAllProjects()]);
  const projectMap = new Map(projects.map((p) => [p.slug, p.title]));

  return (
    <>
      <Navbar forceSolid />
      <main className="min-h-screen bg-white pt-[96px]">
        <section className="mx-auto max-w-7xl px-6 py-8 md:px-12 md:py-12">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet">
                Knowledge Graph
              </div>
              <h1 className="mt-2 font-serif text-3xl text-navy-900 md:text-4xl">AI Knowledge</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 md:text-base">
                Visual map of MAI&apos;s literature. Nodes are papers; edges connect papers in the same project or
                group, with dashed lines for shared authors.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="/api/knowledge/export"
                className="inline-flex items-center gap-2 rounded-full bg-navy-900 px-4 py-2 text-xs font-semibold text-white hover:bg-navy-800"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M10 2a1 1 0 011 1v8.59l3.3-3.3a1 1 0 011.4 1.42l-5 5a1 1 0 01-1.4 0l-5-5a1 1 0 111.4-1.42L9 11.59V3a1 1 0 011-1zM3 16a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" />
                </svg>
                Export for Obsidian
              </a>
            </div>
          </div>

          <div className="mt-8">
            <KnowledgeGraph
              entries={entries}
              projects={Array.from(projectMap.entries()).map(([slug, title]) => ({ slug, title }))}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
