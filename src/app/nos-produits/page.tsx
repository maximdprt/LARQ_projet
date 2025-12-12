import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import VideoHero from '@/components/VideoHero';
import ProductDescription from '@/components/ProductDescription';

export default function NosProduitsPage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <Header />
      <Navigation />
      <VideoHero />
      <ProductDescription />
    </main>
  );
}

