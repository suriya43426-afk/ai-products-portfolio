import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Breadcrumb } from '@/components/layout/Breadcrumb';
import { getAllDataProducts, getDataProductBySlug, DP_BU_COLORS } from '@/lib/dataProducts';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = await getDataProductBySlug(slug);
  if (!d) return { title: 'Data product not found' };
  return { title: `${d.title} — MAI Data`, description: d.description };
}

export default async function DataProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = await getDataProductBySlug(slug);
  if (!d) notFound();

  const all = await getAllDataProducts();
  const siblings = all.filter((x) => x.bu === d.bu && x.slug !== d.slug).slice(0, 3);
  const color = DP_BU_COLORS[d.bu];

  return (
    <>
      <Navbar />
      <main>
        <section className="pt-[116px] text-white" style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}>
          <div className="mx-auto max-w-7xl px-6 py-14 md:px-12 md:py-20">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/80">{d.bu} · {d.supportFunction}</div>
            <h1 className="mt-3 font-serif text-4xl leading-tight md:text-5xl">{d.title}</h1>
            <p className="mt-3 max-w-3xl text-white/90 md:text-lg">{d.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {d.tags.map((t) => (
                <span key={t} className="rounded-md bg-white/15 px-2.5 py-1 text-xs font-medium backdrop-blur">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-6 md:px-12">
            <Breadcrumb
              items={[
                { label: 'Data Products', href: '/data-products' },
                { label: d.title },
              ]}
            />
          </div>
        </div>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-6 py-10 md:px-12 md:py-14">
            <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
              {/* Main */}
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                  <Stat label="Rows" value={d.rowCount.toLocaleString()} />
                  <Stat label="Columns" value={d.columnCount.toString()} />
                  <Stat label="Files" value={d.fileCount.toString()} />
                  <Stat label="Size" value={d.size} />
                  <Stat label="Format" value={d.format} />
                  <Stat label="Updated" value={d.lastUpdated} />
                  <Stat label="Usability" value={d.usabilityScore.toFixed(1)} accent="green" />
                  <Stat label="Downloads" value={d.downloads.toString()} />
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <h2 className="font-serif text-xl text-navy-900">About this dataset</h2>
                  <p className="mt-3 text-slate-700">{d.description}</p>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-widest text-slate-500">Owning Team</div>
                  <div className="mt-1 text-navy-900">{d.ownerTeam}</div>
                </div>
              </div>

              {/* Sidebar — data owner */}
              <aside className="space-y-4">
                <div className="rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">Data Owner</div>
                  <div className="mt-3 flex items-center gap-3">
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-full font-serif text-lg text-white"
                      style={{ background: `linear-gradient(135deg, ${color.from}, ${color.to})` }}
                    >
                      {d.owner.name.split(' ').map((s) => s[0]?.toUpperCase()).slice(0, 2).join('')}
                    </span>
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-navy-900">{d.owner.name}</div>
                      <a
                        href={`mailto:${d.owner.email}?subject=Data%20access%20request%3A%20${encodeURIComponent(d.title)}`}
                        className="truncate text-sm text-primary hover:text-primary-light"
                      >
                        {d.owner.email}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`mailto:${d.owner.email}?subject=Data%20access%20request%3A%20${encodeURIComponent(d.title)}`}
                    className="mt-4 block rounded-full bg-primary px-4 py-2 text-center text-sm font-semibold text-white hover:bg-primary-light"
                  >
                    Request Access
                  </a>
                </div>

                {siblings.length > 0 && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-5">
                    <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      More from {d.bu}
                    </div>
                    <ul className="mt-3 space-y-2 text-sm">
                      {siblings.map((s) => (
                        <li key={s.id}>
                          <Link href={`/data-products/${s.slug}`} className="text-slate-700 hover:text-primary">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: 'green' }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="text-xs uppercase tracking-widest text-slate-500">{label}</div>
      <div className={`mt-1 text-xl font-semibold ${accent === 'green' ? 'text-green' : 'text-navy-900'}`}>
        {value}
      </div>
    </div>
  );
}
