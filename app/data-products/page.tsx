import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { DataProductSearch } from '@/components/data-products/DataProductSearch';
import { getAllDataProducts } from '@/lib/dataProducts';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Data Products — MAI',
  description: 'MitrPhol enterprise data products catalog.',
};

export default async function DataProductsPage() {
  const items = await getAllDataProducts();
  return (
    <>
      <Navbar />
      <main>
        <DataProductSearch items={items} />
      </main>
      <Footer />
    </>
  );
}
