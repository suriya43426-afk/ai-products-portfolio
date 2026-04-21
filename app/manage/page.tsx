import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { ProjectList } from '@/components/manage/ProjectList';

export const dynamic = 'force-dynamic';

export default async function ManagePage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-6 py-10 md:px-10">
      <div>
        <h1 className="font-serif text-3xl text-navy-900 md:text-4xl">Management</h1>
        <p className="mt-1 text-sm text-slate-600">Create, edit, and delete AI Products (research).</p>
      </div>

      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-navy-900">AI Products</h2>
            <p className="text-sm text-slate-600">Research projects with methodology, PDFs, and HTML.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">{projects.length} items</span>
            <Link
              href="/manage/new"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-light"
            >
              + New AI Product
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <ProjectList initial={projects} />
        </div>
      </section>
    </div>
  );
}
