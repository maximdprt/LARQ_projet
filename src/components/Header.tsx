'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [showModal, setShowModal] = useState(false);

  const handleLearnMore = () => {
    setShowModal(true);
    // Vous pouvez remplacer par une redirection ou un modal personnalisé
    setTimeout(() => setShowModal(false), 3000);
  };

  return (
    <>
      <div className="bg-larq-blue-dark text-white py-3 px-2 sm:px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0">
          <p className="text-xs sm:text-sm md:text-base text-center sm:text-left flex-1 px-2">
            Plus vous achetez, plus vous économisez ! Profitez jusqu&apos;à €40 de réduction sur tout le site.
          </p>
          <motion.button
            onClick={handleLearnMore}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="sm:ml-2 md:ml-4 px-3 md:px-4 py-1.5 bg-white text-larq-blue font-semibold rounded hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-larq-blue text-xs md:text-sm whitespace-nowrap"
          >
            EN SAVOIR PLUS
          </motion.button>
        </div>
      </div>
      
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-white p-4 sm:p-6 rounded-lg shadow-2xl z-50 max-w-md w-[90%] sm:w-auto mx-4"
          >
            <h3 className="text-xl font-bold mb-2 text-larq-blue">Offre spéciale</h3>
            <p className="text-gray-700 mb-4">
              Économisez jusqu&apos;à €40 sur votre commande ! Plus vous achetez, plus vous économisez.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 bg-larq-blue text-white rounded hover:bg-larq-blue-light transition-colors"
            >
              Fermer
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

