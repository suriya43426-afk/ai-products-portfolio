import { DataProductForm } from '@/components/manage/DataProductForm';

export default function NewDataProductPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:px-10">
      <div>
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-500">New Data Product</div>
        <h1 className="mt-1 font-serif text-3xl text-navy-900 md:text-4xl">Register a new data product</h1>
      </div>
      <div className="mt-8">
        <DataProductForm mode="create" />
      </div>
    </div>
  );
}
