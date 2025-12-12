'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products, categories, Product } from '@/lib/products';
import ProductCard from './ProductCard';

export default function ProductSection() {
  const [activeFilter, setActiveFilter] = useState('featured');
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const filteredProducts = products.filter((product) => {
    if (activeFilter === 'featured') {
      return product.category === 'featured' || product.isNew;
    }
    return product.category === activeFilter;
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 400;
      const newPosition =
        direction === 'left'
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;
      
      const maxScroll = container.scrollWidth - container.clientWidth;
      const clampedPosition = Math.max(0, Math.min(newPosition, maxScroll));
      
      container.scrollTo({
        left: clampedPosition,
        behavior: 'smooth',
      });
      setScrollPosition(clampedPosition);
    }
  };

  return (
    <section className="py-8 sm:py-12 px-3 sm:px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* En-tête avec titre et filtres */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-0">
            Produits LARQ
          </h2>

          <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
            {/* Filtres */}
            <div className="flex gap-1.5 sm:gap-2 flex-wrap">
              {categories.map((category) => (
                <motion.button
                  key={category.id}
                  onClick={() => setActiveFilter(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 ${
                    activeFilter === category.id
                      ? 'bg-larq-blue text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Lien Tous les produits */}
            <motion.a
              href="#all-products"
              whileHover={{ x: 5 }}
              className="text-xs sm:text-sm text-larq-blue hover:text-larq-blue-light font-medium transition-colors inline-flex items-center"
            >
              Tous les produits →
            </motion.a>
          </div>
        </div>

        {/* Grille de produits avec navigation */}
        <div className="relative">
          {/* Flèche gauche */}
          {scrollPosition > 0 && (
            <motion.button
              onClick={() => scroll('left')}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue hidden sm:block"
              aria-label="Produits précédents"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </motion.button>
          )}

          {/* Conteneur scrollable */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={(e) => {
              setScrollPosition((e.target as HTMLDivElement).scrollLeft);
            }}
          >
            <div className="flex gap-4 sm:gap-6 pb-4" style={{ minWidth: 'max-content' }}>
              <AnimatePresence mode="wait">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-[280px] sm:w-72 md:w-80"
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Flèche droite */}
          {scrollContainerRef.current &&
            scrollPosition <
              scrollContainerRef.current.scrollWidth -
                scrollContainerRef.current.clientWidth && (
              <motion.button
                onClick={() => scroll('right')}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue hidden sm:block"
                aria-label="Produits suivants"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </motion.button>
            )}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}

