import { SectionHeader } from '@/components/ui/SectionHeader';
import { MAIN_PRODUCTS } from '@/data/mainProducts';
import { MainProductCard } from './MainProductCard';

export function MainProductsGrid() {
  return (
    <section id="main-products" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-24">
        <SectionHeader
          chip="6 Main Products"
          chipTone="blue"
          title="The flagship portfolio at a glance."
          subtitle="Six products compounding on one shared data foundation — open any card to read the engineering log."
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {MAIN_PRODUCTS.map((p) => (
            <MainProductCard key={p.slug} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
