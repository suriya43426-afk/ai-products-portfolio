import { notFound } from 'next/navigation';
import { getDataProductBySlug } from '@/lib/dataProducts';
import { DataProductForm } from '@/components/manage/DataProductForm';

export const dynamic = 'force-dynamic';

export default async function EditDataProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = await getDataProductBySlug(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Editing {item.id} · {item.bu}
        </div>
        <h1 className="mt-1 font-serif text-3xl text-navy-900 md:text-4xl">{item.title}</h1>
      </div>
      <div className="mt-8">
        <DataProductForm mode="edit" initial={item} />
      </div>
    </div>
  );
}
