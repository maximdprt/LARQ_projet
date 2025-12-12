'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <Navigation />
      <section className="py-12 sm:py-16 md:py-20 px-3 sm:px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8 md:p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-16 h-16 sm:w-20 sm:h-20 bg-larq-blue rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6"
            >
              <svg
                className="w-10 h-10 sm:w-12 sm:h-12 text-white"
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
            </motion.div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Commande confirmée !
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8">
              Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link
                href="/bouteilles"
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-larq-blue text-white font-semibold rounded-lg hover:bg-larq-blue-light transition-colors"
              >
                Continuer mes achats
              </Link>
              <Link
                href="/"
                className="px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

