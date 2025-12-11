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
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-12"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-20 h-20 bg-larq-blue rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <svg
                className="w-12 h-12 text-white"
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

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Commande confirmée !
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Merci pour votre achat. Vous recevrez un email de confirmation sous peu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/bouteilles"
                className="px-6 py-3 bg-larq-blue text-white font-semibold rounded-lg hover:bg-larq-blue-light transition-colors"
              >
                Continuer mes achats
              </Link>
              <Link
                href="/"
                className="px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Retour à l'accueil
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

