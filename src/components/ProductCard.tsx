'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Product } from '@/lib/products';
import Bottle3D from './Bottle3D';
import { useCart } from '@/context/CartContext';
import ImageModal from './ImageModal';

interface ProductCardProps {
  product: Product;
  onColorChange?: (color: string) => void;
  onSizeChange?: (size: string) => void;
}

export default function ProductCard({ product, onColorChange, onSizeChange }: ProductCardProps) {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [show3D, setShow3D] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  const selectedColor = product.colors[selectedColorIndex];
  const selectedSize = product.sizes[selectedSizeIndex];

  const handleColorSelect = (index: number) => {
    setSelectedColorIndex(index);
    if (onColorChange) {
      onColorChange(product.colors[index].hex);
    }
  };

  const handleSizeSelect = (index: number) => {
    setSelectedSizeIndex(index);
    if (onSizeChange) {
      onSizeChange(product.sizes[index].volume);
    }
  };

  return (
    <motion.div
      className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Badge NOUVEAU */}
      {product.isNew && (
        <div className="absolute top-3 left-3 z-10 bg-larq-red text-white text-xs font-bold px-2 py-1 rounded">
          NOUVEAU
        </div>
      )}

      {/* Image ou modèle 3D */}
      <div className="relative h-48 sm:h-56 md:h-64 bg-gray-100 flex items-center justify-center overflow-hidden group">
        {show3D ? (
          <div className="w-full h-full">
            <Bottle3D color={selectedColor.hex} autoRotate={isHovered} />
            <button
              onClick={() => setShow3D(false)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white px-3 py-1 rounded text-sm font-medium transition-colors"
            >
              Voir image
            </button>
          </div>
        ) : (
          <>
            {product.imagePath && !imageError ? (
              <div 
                className="relative w-full h-full cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <Image
                  src={product.imagePath}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 288px, 320px"
                  priority={product.isNew}
                  onError={() => {
                    setImageError(true);
                  }}
                />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50">
                <Bottle3D color={selectedColor.hex} autoRotate={!isHovered} />
              </div>
            )}
            <motion.button
              onClick={() => setShow3D(true)}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white px-3 py-1 rounded text-sm font-medium transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              3D
            </motion.button>
          </>
        )}
      </div>

      {/* Contenu */}
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3">{product.name}</h3>

        {/* Sélecteur de couleurs */}
        <div className="mb-2 sm:mb-3">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {product.colors.map((color, index) => (
              <motion.button
                key={index}
                onClick={() => handleColorSelect(index)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 ${
                  index === selectedColorIndex
                    ? 'border-gray-900 scale-110 shadow-md'
                    : 'border-gray-300 hover:border-gray-500'
                }`}
                style={{ backgroundColor: color.hex }}
                aria-label={`Couleur ${color.name}`}
              >
                {index === selectedColorIndex && (
                  <div className="w-full h-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white drop-shadow-md"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Sélecteur de taille */}
        <div className="mb-2 sm:mb-3">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap">
            {product.sizes.map((size, index) => (
              <motion.button
                key={index}
                onClick={() => handleSizeSelect(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-2.5 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-200 ${
                  index === selectedSizeIndex
                    ? 'text-larq-blue border-b-2 border-larq-blue'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {size.volume}
              </motion.button>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {selectedColor.name} {selectedSize.volume}
          </p>
        </div>

        {/* Feature tag */}
        {product.features.length > 0 && (
          <div className="mb-2 sm:mb-3">
            <span className="inline-block px-2 py-0.5 sm:py-1 bg-gray-100 text-gray-700 text-xs rounded">
              {product.features[0]}
            </span>
          </div>
        )}

        {/* Prix */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {selectedSize.originalPrice ? (
            <>
              <span className="text-base sm:text-lg text-gray-400 line-through">
                €{selectedSize.originalPrice.toFixed(2)}
              </span>
              <span className="text-lg sm:text-xl font-bold text-larq-navy">
                €{selectedSize.price.toFixed(2)}
              </span>
              <span className="text-xs sm:text-sm font-semibold text-larq-navy bg-larq-navy/10 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                -{Math.round(((selectedSize.originalPrice - selectedSize.price) / selectedSize.originalPrice) * 100)}%
              </span>
            </>
          ) : (
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              €{selectedSize.price.toFixed(2)}
            </span>
          )}
        </div>

        {/* Bouton Ajouter au panier */}
        <motion.button
          whileHover={{ scale: addedToCart ? 1 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
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
          }}
          className={`w-full mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-medium rounded transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue focus:ring-offset-2 ${
            addedToCart
              ? 'bg-green-500 text-white'
              : 'bg-larq-blue text-white hover:bg-larq-blue-light'
          }`}
        >
          {addedToCart ? '✓ Ajouté au panier' : 'Ajouter au panier'}
        </motion.button>
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
    </motion.div>
  );
}

