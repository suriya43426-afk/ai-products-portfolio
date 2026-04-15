import Link from 'next/link';
import { getAllProjects } from '@/lib/projects';
import { getAllDataProducts } from '@/lib/dataProducts';
import { ProjectList } from '@/components/manage/ProjectList';
import { DataProductList } from '@/components/manage/DataProductList';

export const dynamic = 'force-dynamic';

export default async function ManagePage() {
  const [projects, dataProducts] = await Promise.all([getAllProjects(), getAllDataProducts()]);

  return (
    <div className="mx-auto max-w-7xl space-y-14 px-6 py-10 md:px-10">
      <div>
        <h1 className="font-serif text-3xl text-navy-900 md:text-4xl">Management</h1>
        <p className="mt-1 text-sm text-slate-600">
          Create, edit, and delete AI Products (research) and Data Products (catalog).
        </p>
      </div>

      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-navy-900">AI Products</h2>
            <p className="text-sm text-slate-600">9 research projects with methodology, PDFs, and HTML.</p>
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

      <section>
        <div className="flex items-baseline justify-between gap-4">
          <div>
            <h2 className="font-serif text-2xl text-navy-900">Data Products</h2>
            <p className="text-sm text-slate-600">Enterprise data catalog — each dataset has a named data owner.</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-slate-500">{dataProducts.length} items</span>
            <Link
              href="/manage/data-products/new"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-white hover:bg-primary-light"
            >
              + New Data Product
            </Link>
          </div>
        </div>
        <div className="mt-6">
          <DataProductList initial={dataProducts} />
        </div>
      </section>
    </div>
  );
}
