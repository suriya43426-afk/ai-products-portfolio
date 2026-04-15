import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ProductSearch } from '@/components/products/ProductSearch';
import { getAllProjects } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'AI Products — MAI',
  description: 'Search MitrPhol AI’s portfolio of nine AI products.',
};

export default function ProductsPage() {
  const projects = getAllProjects();
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
