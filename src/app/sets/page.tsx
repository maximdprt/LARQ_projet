'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { products } from '@/lib/products';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import ImageModal from '@/components/ImageModal';

export default function SetsPage() {
  const [selectedBottles, setSelectedBottles] = useState<string[]>([]);
  const [modalImage, setModalImage] = useState<{ path: string; alt: string } | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const handleBottleSelect = (productId: string) => {
    setSelectedBottles((prev) => {
      if (prev.includes(productId)) {
        // Désélectionner si déjà sélectionné
        return prev.filter((id) => id !== productId);
      } else if (prev.length < 2) {
        // Ajouter si moins de 2 sélectionnés
        return [...prev, productId];
      }
      // Ne rien faire si déjà 2 sélectionnés
      return prev;
    });
  };

  const handleAddToCart = () => {
    if (selectedBottles.length === 2) {
      const product1 = products.find((p) => p.id === selectedBottles[0]);
      const product2 = products.find((p) => p.id === selectedBottles[1]);

      if (product1 && product2) {
        const color1 = product1.colors[0];
        const color2 = product2.colors[0];

        // Ajouter le set comme un seul article
        addItem({
          productId: `set-${product1.id}-${product2.id}`,
          productName: `Set 2 bouteilles - ${product1.name} + ${product2.name}`,
          color: `${color1.name} / ${color2.name}`,
          size: 'Set',
          price: 200,
          originalPrice: 280,
          imagePath: product1.imagePath,
        });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
      }
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Sets LARQ
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Choisissez 2 bouteilles pour créer votre pack personnalisé ({selectedBottles.length}/2)
          </p>

          <div className="max-w-6xl mx-auto">
            {/* Grille des 4 produits */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {products.map((product) => {
                const isSelected = selectedBottles.includes(product.id);
                const canSelect = selectedBottles.length < 2 || isSelected;
                
                  return (
                  <div key={product.id} className="space-y-2">
                    <div className="relative h-48 sm:h-56 md:h-64 bg-transparent rounded-lg overflow-hidden">
                      {product.imagePath && (
                        <div 
                          className="absolute inset-0 cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalImage({ path: product.imagePath!, alt: product.name });
                          }}
                        >
                          <Image
                            src={product.imagePath}
                            alt={product.name}
                            fill
                            className="object-contain transition-transform duration-300 hover:scale-105"
                          />
                        </div>
                      )}
                      <button
                        onClick={() => canSelect && handleBottleSelect(product.id)}
                        disabled={!canSelect}
                        className={`absolute inset-0 border-2 rounded-lg transition-all z-10 ${
                          isSelected
                            ? 'border-larq-blue bg-larq-blue/10'
                            : canSelect
                            ? 'border-transparent hover:border-gray-300'
                            : 'border-gray-200 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-larq-blue text-white rounded-full w-8 h-8 flex items-center justify-center">
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                        )}
                      </button>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-center">{product.displayName || product.name}</p>
                  </div>
                );
              })}
            </div>

            {/* Prix et bouton */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-6 text-center">
              <div className="mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                <span className="text-lg sm:text-xl text-gray-400 line-through">
                  €280,00
                </span>
                <span className="text-2xl sm:text-3xl font-bold text-larq-navy">
                  €200,00
                </span>
                <span className="text-xs sm:text-sm font-semibold text-larq-navy bg-larq-navy/10 px-2 sm:px-3 py-0.5 sm:py-1 rounded">
                  -{Math.round(((280 - 200) / 280) * 100)}%
                </span>
              </div>
              <motion.button
                whileHover={{ scale: selectedBottles.length === 2 && !addedToCart ? 1.02 : 1 }}
                whileTap={{ scale: selectedBottles.length === 2 ? 0.98 : 1 }}
                onClick={handleAddToCart}
                disabled={selectedBottles.length !== 2}
                className={`w-full sm:w-auto px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue focus:ring-offset-2 ${
                  selectedBottles.length !== 2
                    ? 'opacity-50 cursor-not-allowed bg-larq-blue text-white'
                    : addedToCart
                    ? 'bg-green-500 text-white'
                    : 'bg-larq-blue text-white hover:bg-larq-blue-light'
                }`}
              >
                {addedToCart ? '✓ Ajouté au panier' : 'Ajouter au panier'}
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal pour afficher l'image en grand */}
      {modalImage && (
        <ImageModal
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
          imagePath={modalImage.path}
          alt={modalImage.alt}
        />
      )}
    </main>
  );
}

