'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/products';
import { useCart } from '@/context/CartContext';
import ImageModal from './ImageModal';

interface BottleCardProps {
  product: Product;
}

export default function BottleCard({ product }: BottleCardProps) {
  const { addItem } = useCart();
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const selectedColor = product.colors[0]; // Première couleur uniquement
  const selectedSize = product.sizes[0]; // 2L uniquement
  const displayName = product.displayName || `LARQ BOTTLE ${selectedColor.name.toUpperCase()}`;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      color: selectedColor.name,
      size: selectedSize.volume,
      price: selectedSize.price,
      originalPrice: selectedSize.originalPrice,
      imagePath: product.imagePath,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image - sans encadré, plus grande, cliquable */}
      <div 
        className="relative h-80 flex items-center justify-center overflow-hidden bg-transparent cursor-pointer"
        onClick={() => product.imagePath && !imageError && setIsModalOpen(true)}
      >
        {product.imagePath && !imageError ? (
          <div className="relative w-full h-full">
            <Image
              src={product.imagePath}
              alt={product.name}
              fill
              className="object-contain transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 288px, 400px"
              onError={() => {
                setImageError(true);
              }}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-gray-400 text-sm">Image non disponible</div>
          </div>
        )}
      </div>

      {/* Modal pour afficher l'image en grand */}
      {product.imagePath && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          imagePath={product.imagePath}
          alt={product.name}
        />
      )}

      {/* Contenu */}
      <div className="p-4">
        {/* Nom fixe selon la couleur */}
        <p className="text-lg font-semibold text-gray-900 mb-3 text-center">
          {displayName}
        </p>

        {/* Capacité */}
        <p className="text-sm text-gray-600 mb-3 text-center">Capacité : {selectedSize.volume}</p>

        {/* Prix */}
        <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
          {selectedSize.originalPrice ? (
            <>
              <span className="text-lg text-gray-400 line-through">
                €{selectedSize.originalPrice.toFixed(2)}
              </span>
              <span className="text-xl font-bold text-larq-navy">
                €{selectedSize.price.toFixed(2)}
              </span>
              <span className="text-sm font-semibold text-larq-navy bg-larq-navy/10 px-2 py-1 rounded">
                -{Math.round(((selectedSize.originalPrice - selectedSize.price) / selectedSize.originalPrice) * 100)}%
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-gray-900">
              €{selectedSize.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Bouton Ajouter au panier */}
        <motion.button
          whileHover={{ scale: addedToCart ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          className={`w-full px-4 py-2 font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue focus:ring-offset-2 ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-larq-blue text-white hover:bg-larq-blue-light'
          }`}
        >
          {addedToCart ? '✓ Ajouté au panier' : 'Ajouter au panier'}
        </motion.button>
      </div>
    </motion.div>
  );
}

