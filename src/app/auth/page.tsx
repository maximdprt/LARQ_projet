'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const router = useRouter();
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Connexion
      if (!formData.email || !formData.password) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      const success = await login(formData.email, formData.password);
      if (success) {
        router.push('/');
      } else {
        setError('Email ou mot de passe incorrect');
      }
    } else {
      // Inscription
      if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('Veuillez remplir tous les champs');
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Les mots de passe ne correspondent pas');
        return;
      }
      if (formData.password.length < 6) {
        setError('Le mot de passe doit contenir au moins 6 caractères');
        return;
      }
      const success = await signup(formData.email, formData.password, formData.name);
      if (success) {
        router.push('/');
      } else {
        setError('Cet email est déjà utilisé');
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      <Navigation />
      <section className="py-16 px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8"
          >
            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-gray-200">
              <button
                onClick={() => {
                  setIsLogin(true);
                  setError('');
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className={`flex-1 py-3 font-semibold transition-colors ${
                  isLogin
                    ? 'text-larq-blue border-b-2 border-larq-blue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Connexion
              </button>
              <button
                onClick={() => {
                  setIsLogin(false);
                  setError('');
                  setFormData({ name: '', email: '', password: '', confirmPassword: '' });
                }}
                className={`flex-1 py-3 font-semibold transition-colors ${
                  !isLogin
                    ? 'text-larq-blue border-b-2 border-larq-blue'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                Inscription
              </button>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {isLogin ? 'Connectez-vous' : 'Créez votre compte'}
            </h2>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required={!isLogin}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                    placeholder="Votre nom"
                  />
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                  placeholder="votre@email.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Mot de passe *
                </label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirmer le mot de passe *
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    required={!isLogin}
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-larq-blue focus:border-transparent transition-all"
                    placeholder="••••••••"
                  />
                </div>
              )}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-4 bg-larq-blue text-white font-semibold rounded-lg hover:bg-larq-blue-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-larq-blue focus:ring-offset-2 mt-6"
              >
                {isLogin ? 'Se connecter' : "S'inscrire"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

