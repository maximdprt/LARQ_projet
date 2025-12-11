'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCart();
  const { user, login, signup, isAuthenticated } = useAuth();
  
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
  });
  const [authError, setAuthError] = useState('');
  
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    
    if (authMode === 'login') {
      const success = await login(authData.email, authData.password);
      if (!success) {
        setAuthError('Email ou mot de passe incorrect');
      }
    } else {
      if (authData.password !== authData.confirmPassword) {
        setAuthError('Les mots de passe ne correspondent pas');
        return;
      }
      if (authData.password.length < 6) {
        setAuthError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      if (!authData.name) {
        setAuthError('Le nom est requis');
        return;
      }
      const success = await signup(authData.email, authData.password, authData.name);
      if (!success) {
        setAuthError('Cet email est déjà utilisé');
      }
    }
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.cardNumber) newErrors.cardNumber = 'Numéro de carte requis';
    if (paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Numéro de carte invalide';
    }
    if (!paymentData.cardName) newErrors.cardName = 'Nom sur la carte requis';
    if (!paymentData.expiryDate) newErrors.expiryDate = 'Date d\'expiration requise';
    if (!paymentData.cvv) newErrors.cvv = 'CVV requis';
    if (paymentData.cvv.length < 3) newErrors.cvv = 'CVV invalide';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setAuthError('Veuillez vous connecter ou créer un compte');
      return;
    }
    
    if (!validatePayment()) {
      return;
    }

    if (items.length === 0) {
      alert('Votre panier est vide');
      router.push('/bouteilles');
      return;
    }

    setIsProcessing(true);
    
    // Traitement du paiement
    setTimeout(() => {
      console.log('Commande passée:', { 
        user: user?.email,
        payment: paymentData,
        items, 
        total: getTotal() 
      });
      // Envoi d'email de confirmation (simulation)
      console.log(`Email de confirmation envoyé à ${user?.email}`);
      clearCart();
      setIsProcessing(false);
      router.push('/checkout/success');
    }, 2000);
  };

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white">
        <Header />
        <Navigation />
        <section className="py-16 px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Votre panier est vide</h1>
          <a href="/bouteilles" className="text-larq-blue hover:underline">
            Retour aux produits
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Finaliser votre commande</h1>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Formulaire */}
            <div className="lg:col-span-2 space-y-6">
              {/* Authentification - Si non connecté */}
              {!isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('login');
                        setAuthError('');
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        authMode === 'login'
                          ? 'bg-larq-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Se connecter
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setAuthMode('signup');
                        setAuthError('');
                      }}
                      className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                        authMode === 'signup'
                          ? 'bg-larq-blue text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Créer un compte
                    </button>
                  </div>

                  <form onSubmit={handleAuth} className="space-y-4">
                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom complet *
                        </label>
                        <input
                          type="text"
                          required={authMode === 'signup'}
                          value={authData.name}
                          onChange={(e) => setAuthData({ ...authData, name: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                          placeholder="Jean Dupont"
                        />
                      </div>
                    )}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={authData.email}
                        onChange={(e) => setAuthData({ ...authData, email: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mot de passe *
                      </label>
                      <input
                        type="password"
                        required
                        value={authData.password}
                        onChange={(e) => setAuthData({ ...authData, password: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                        placeholder={authMode === 'signup' ? 'Minimum 6 caractères' : 'Votre mot de passe'}
                      />
                    </div>
                    {authMode === 'signup' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirmer le mot de passe *
                        </label>
                        <input
                          type="password"
                          required={authMode === 'signup'}
                          value={authData.confirmPassword}
                          onChange={(e) => setAuthData({ ...authData, confirmPassword: e.target.value })}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                          placeholder="Confirmez votre mot de passe"
                        />
                      </div>
                    )}
                    {authError && (
                      <p className="text-red-500 text-sm">{authError}</p>
                    )}
                    <button
                      type="submit"
                      className="w-full px-6 py-3 bg-larq-blue text-white font-semibold rounded-lg hover:bg-larq-blue-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue focus:ring-offset-2"
                    >
                      {authMode === 'login' ? 'Se connecter' : 'Créer mon compte'}
                    </button>
                  </form>
                </motion.div>
              )}

              {/* Email affiché si connecté */}
              {isAuthenticated && user && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-larq-blue/10 border border-larq-blue/20 rounded-xl p-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Connecté en tant que</p>
                      <p className="text-lg font-semibold text-larq-blue">{user.email}</p>
                    </div>
                    <div className="w-12 h-12 bg-larq-blue rounded-full flex items-center justify-center text-white font-bold text-xl">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Informations de paiement */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isAuthenticated ? 0 : 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Informations de paiement</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de carte *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
                        const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                        setPaymentData({ ...paymentData, cardNumber: formatted });
                      }}
                      maxLength={19}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom sur la carte *
                    </label>
                    <input
                      type="text"
                      required
                      value={paymentData.cardName}
                      onChange={(e) => setPaymentData({ ...paymentData, cardName: e.target.value })}
                      placeholder="JEAN DUPONT"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.cardName && <p className="text-red-500 text-xs mt-1">{errors.cardName}</p>}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date d'expiration *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.expiryDate}
                        onChange={(e) => {
                          let value = e.target.value.replace(/\D/g, '');
                          if (value.length >= 2) {
                            value = value.slice(0, 2) + '/' + value.slice(2, 4);
                          }
                          setPaymentData({ ...paymentData, expiryDate: value });
                        }}
                        maxLength={5}
                        placeholder="MM/AA"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-xs mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        required
                        value={paymentData.cvv}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '').slice(0, 3);
                          setPaymentData({ ...paymentData, cvv: value });
                        }}
                        maxLength={3}
                        placeholder="123"
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isProcessing || !isAuthenticated}
                    whileHover={{ scale: isProcessing || !isAuthenticated ? 1 : 1.02 }}
                    whileTap={{ scale: isProcessing || !isAuthenticated ? 1 : 0.98 }}
                    className="w-full px-6 py-4 bg-larq-blue text-white font-semibold rounded-lg hover:bg-larq-blue-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? 'Traitement en cours...' : `Payer €${getTotal().toFixed(2)}`}
                  </motion.button>
                  {!isAuthenticated && (
                    <p className="text-sm text-red-500 text-center">
                      Veuillez vous connecter ou créer un compte pour continuer
                    </p>
                  )}
                </form>
              </motion.div>
            </div>

            {/* Récapitulatif */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-4"
              >
                <h2 className="text-xl font-bold text-gray-900 mb-4">Récapitulatif</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3 pb-4 border-b border-gray-200">
                      {item.imagePath && (
                        <div className="relative w-16 h-16 flex-shrink-0 bg-gray-100 rounded">
                          <Image
                            src={item.imagePath}
                            alt={item.productName}
                            fill
                            className="object-contain p-1"
                            sizes="64px"
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
                        <p className="text-xs text-gray-500">
                          Quantité: {item.quantity}
                        </p>
                        <div className="mt-1">
                          {item.originalPrice ? (
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs text-gray-400 line-through">
                                €{(item.originalPrice * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-sm font-semibold text-larq-navy">
                                €{(item.price * item.quantity).toFixed(2)}
                              </span>
                              <span className="text-xs font-semibold text-larq-navy bg-larq-navy/10 px-1.5 py-0.5 rounded">
                                -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm font-semibold text-larq-navy">
                              €{(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-larq-navy">€{getTotal().toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
