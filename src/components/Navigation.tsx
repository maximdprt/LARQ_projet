'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import TeamModal from './TeamModal';
import QRCodeModal from './QRCodeModal';

export default function Navigation() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showCartMenu, setShowCartMenu] = useState(false);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [showQRCodeModal, setShowQRCodeModal] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);
  const { items, getItemCount, getTotal, removeItem, updateQuantity } = useCart();
  const { user, logout, isAuthenticated } = useAuth();

  // Animation du panier quand un produit est ajouté
  useEffect(() => {
    if (items.length > 0) {
      setCartAnimation(true);
      const timer = setTimeout(() => setCartAnimation(false), 600);
      return () => clearTimeout(timer);
    }
  }, [items.length]);

  const menuItems = [
    { label: 'Bouteilles', href: '/bouteilles' },
    { label: 'Sets', href: '/sets' },
    { label: 'Livrable', href: '/livrable' },
  ];

  const rightMenuItems: Array<{ label: string; href: string; onClick?: () => void }> = [
    { label: 'FAQ', href: '/faq' },
    { 
      label: 'QRcode', 
      href: '#', 
      onClick: () => {
        setShowQRCodeModal(true);
        setShowAccountMenu(false);
        setShowCartMenu(false);
        setShowTeamModal(false);
      } 
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Menu gauche */}
          <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-6">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  setActiveMenu(item.label);
                }}
                className={`text-xs sm:text-sm font-medium transition-colors duration-200 text-gray-700 hover:text-larq-blue ${
                  activeMenu === item.label ? 'text-larq-blue font-semibold' : ''
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Logo centré */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-larq-blue hover:text-larq-blue-light transition-colors"
            >
              LARQ
            </motion.a>
          </div>

          {/* Menu droit */}
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-6">
            {rightMenuItems.map((item) => {
              if (item.onClick) {
                return (
                  <button
                    key={item.label}
                    onClick={(e) => {
                      e.preventDefault();
                      item.onClick?.();
                    }}
                    className="hidden sm:block text-xs md:text-sm font-medium text-gray-700 hover:text-larq-blue transition-colors duration-200"
                  >
                    {item.label}
                  </button>
                );
              }
              return (
                <a
                  key={item.label}
                  href={item.href}
                  className="hidden sm:block text-xs md:text-sm font-medium text-gray-700 hover:text-larq-blue transition-colors duration-200"
                >
                  {item.label}
                </a>
              );
            })}
            
            {/* Icône Support */}
            <button
              onClick={() => {
                setShowTeamModal(true);
                setShowAccountMenu(false);
                setShowCartMenu(false);
                setShowQRCodeModal(false);
              }}
              className="relative p-1.5 sm:p-2 text-gray-700 hover:text-larq-blue transition-colors group"
              aria-label="Support"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                  Support
                </div>
              </div>
            </button>
            <TeamModal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} />

            <QRCodeModal isOpen={showQRCodeModal} onClose={() => setShowQRCodeModal(false)} />

            {/* Icône Compte */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAccountMenu(!showAccountMenu);
                  setShowCartMenu(false);
                }}
                className="p-1.5 sm:p-2 text-gray-700 hover:text-larq-blue transition-colors"
                aria-label="Compte"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </button>
              <AnimatePresence>
                {showAccountMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-w-[calc(100vw-2rem)]"
                  >
                    {isAuthenticated && user ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-200">
                          <p className="text-xs text-gray-500 mb-1">Connecté en tant que</p>
                          <p className="text-sm font-semibold text-gray-900">{user.email}</p>
                        </div>
                        <button
                          onClick={() => {
                            logout();
                            setShowAccountMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                        >
                          Se déconnecter
                        </button>
                      </>
                    ) : (
                      <a
                        href="/auth"
                        onClick={() => setShowAccountMenu(false)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        Se connecter / Créer un compte
                      </a>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Icône Panier */}
            <div className="relative">
              <motion.button
                onClick={() => {
                  setShowCartMenu(!showCartMenu);
                  setShowAccountMenu(false);
                }}
                animate={cartAnimation ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="relative p-1.5 sm:p-2 text-gray-700 hover:text-larq-blue transition-colors"
                aria-label="Panier"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <motion.span
                  key={getItemCount()}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-0 right-0 bg-larq-red text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center font-semibold"
                >
                  {getItemCount()}
                </motion.span>
              </motion.button>
              <AnimatePresence>
                {showCartMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-96 bg-white rounded-md shadow-lg z-50 max-h-96 overflow-y-auto"
                  >
                    {items.length === 0 ? (
                      <>
                        <div className="px-4 py-2 text-center text-gray-500">
                          Votre panier est vide
                        </div>
                        <div className="px-4 pt-2 pb-4">
                          <a
                            href="#cart"
                            className="block w-full text-center px-4 py-2 bg-larq-blue text-white rounded hover:bg-larq-blue-light transition-colors"
                          >
                            Voir le panier
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-4 py-3 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Panier</h3>
                        </div>
                        <div className="max-h-64 overflow-y-auto">
                          {items.map((item) => (
                            <div
                              key={item.id}
                              className="px-4 py-3 border-b border-gray-100 flex gap-3"
                            >
                              {item.imagePath && (
                                <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                                  <Image
                                    src={item.imagePath}
                                    alt={item.productName}
                                    fill
                                    className="object-contain p-1"
                                  />
                                </div>
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                  {item.productName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {item.color} - {item.size}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                  >
                                    -
                                  </button>
                                  <span className="text-sm font-medium w-8 text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100"
                                  >
                                    +
                                  </button>
                                  <button
                                    onClick={() => removeItem(item.id)}
                                    className="ml-auto text-red-500 hover:text-red-700 text-xs"
                                  >
                                    Supprimer
                                  </button>
                                </div>
                                <p className="text-sm font-semibold text-larq-navy mt-1">
                                  €{(item.price * item.quantity).toFixed(2)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-4 py-3 border-t border-gray-200 bg-gray-50">
                          <div className="flex justify-between items-center mb-3">
                            <span className="font-semibold text-gray-900">Total:</span>
                            <span className="text-lg font-bold text-larq-navy">
                              €{getTotal().toFixed(2)}
                            </span>
                          </div>
                          <button
                            onClick={() => {
                              setShowCartMenu(false);
                              router.push('/checkout');
                            }}
                            className="w-full px-4 py-2 bg-larq-blue text-white rounded hover:bg-larq-blue-light transition-colors font-medium"
                          >
                            Commander
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

