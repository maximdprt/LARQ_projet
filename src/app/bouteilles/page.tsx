import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { products } from '@/lib/products';
import BottleCard from '@/components/BottleCard';

export default function BouteillesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Bouteilles LARQ
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <BottleCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

