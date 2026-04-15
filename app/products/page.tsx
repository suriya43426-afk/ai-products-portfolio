import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductSearch } from '@/components/products/ProductSearch';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'AI Products — MAI',
  description: 'Search MitrPhol AI’s portfolio of nine AI products.',
};

export const dynamic = 'force-dynamic';

export default async function ProductsPage() {
  const projects = await getAllProjects();
  return (
    <>
      <Navbar />
      <main>
        <ProductSearch projects={projects} />
      </main>
      <Footer />
    </>
  );
}
