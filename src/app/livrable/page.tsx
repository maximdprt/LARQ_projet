'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Navigation from '@/components/Navigation';

type TabId = 'introduction' | 'probleme-solution' | 'marche' | 'croissance' | 'opportunite' | 'conclusion';

export default function LivrablePage() {
  const [activeTab, setActiveTab] = useState<TabId>('introduction');

  const tabs = [
    { id: 'introduction' as TabId, label: 'Introduction' },
    { id: 'probleme-solution' as TabId, label: 'Problème & Solution' },
    { id: 'marche' as TabId, label: 'Marché' },
    { id: 'croissance' as TabId, label: 'Croissance' },
    { id: 'opportunite' as TabId, label: 'Opportunité' },
    { id: 'conclusion' as TabId, label: 'Conclusion' },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <Navigation />
      <section className="py-8 sm:py-12 px-3 sm:px-4">
        <div className="max-w-7xl mx-auto">
          {/* Système d'onglets */}
          <div className="mb-6 sm:mb-8 border-b border-gray-200 overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
            <div className="flex gap-1 sm:gap-2 md:gap-4 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-semibold text-xs sm:text-sm md:text-base transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-larq-blue border-b-2 border-larq-blue'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Contenu des onglets */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {activeTab === 'introduction' && <IntroductionTab />}
              {activeTab === 'probleme-solution' && <ProblemeSolutionTab />}
              {activeTab === 'marche' && <MarcheTab />}
              {activeTab === 'croissance' && <CroissanceTab />}
              {activeTab === 'opportunite' && <OpportuniteTab />}
              {activeTab === 'conclusion' && <ConclusionTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm">
          <p>&copy; {new Date().getFullYear()} LARQ. Tous droits réservés.</p>
        </div>
      </footer>
    </main>
  );
}

// Composant Introduction
function IntroductionTab() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8 sm:py-12 md:py-16 bg-gradient-to-br from-blue-50 to-white rounded-2xl px-4 sm:px-6">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-4 sm:mb-6"
        >
          L&apos;Avenir de l&apos;Hydratation
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-6 sm:mb-8"
        >
          La première solution d&apos;hydratation portable au monde utilisant la technologie UV-C LED 
          pour purifier l&apos;eau et nettoyer les surfaces internes de la bouteille. 
          Accédez à une eau pure, partout et tout le temps, tout en éliminant la dépendance au plastique à usage unique.
        </motion.p>
        <motion.a
          href="/faq"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-larq-blue text-white font-semibold rounded-lg hover:bg-larq-blue-light transition-colors duration-200 shadow-lg"
        >
          Nous contacter
        </motion.a>
      </div>

      {/* Introduction du mémorandum */}
      <div className="prose prose-lg max-w-none">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">1. Introduction : L&apos;Innovation au service de la santé</h2>
        <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">
          Dans un monde où le bien-être et la durabilité sont devenus des priorités absolues, notre entreprise propose 
          bien plus qu&apos;une simple bouteille d&apos;eau. Nous commercialisons la technologie LARQ, la première solution 
          d&apos;hydratation portable au monde utilisant la technologie UV-C LED pour purifier l&apos;eau et nettoyer les surfaces 
          internes de la bouteille.
        </p>
        <p className="text-gray-700 leading-relaxed">
          Notre mission est simple : permettre l&apos;accès à une eau pure, partout et tout le temps, tout en éliminant 
          la dépendance au plastique à usage unique.
        </p>
      </div>
    </div>
  );
}

// Composant Problème & Solution
function ProblemeSolutionTab() {
  return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">2. Le Problème & La Solution</h2>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
          {/* Colonne Problèmes */}
          <div className="bg-red-50 rounded-xl p-4 sm:p-6 md:p-8 border-2 border-red-100">
            <h3 className="text-xl sm:text-2xl font-bold text-red-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Le Problème Reconnu
          </h3>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">L&apos;hygiène douteuse</h4>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Les bouteilles réutilisables classiques sont des nids à bactéries. Après quelques jours d&apos;utilisation, 
                  elles développent souvent une odeur désagréable due à la prolifération microbienne.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">L&apos;incertitude de la source</h4>
                <p className="text-gray-700 text-sm">
                  En déplacement ou en voyage, trouver une source d&apos;eau potable fiable n&apos;est pas toujours garanti.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Le fléau plastique</h4>
                <p className="text-gray-700 text-sm">
                  1 million de bouteilles en plastique sont achetées chaque minute dans le monde, polluant nos océans.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne Solution */}
        <div className="bg-green-50 rounded-xl p-4 sm:p-6 md:p-8 border-2 border-green-100">
          <h3 className="text-xl sm:text-2xl font-bold text-green-900 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
            <svg className="w-6 h-6 sm:w-8 sm:h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Notre Solution (LARQ)
          </h3>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="flex gap-3 sm:gap-4">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 mb-1 sm:mb-2 text-sm sm:text-base">Éradication</h4>
                <p className="text-gray-700 text-xs sm:text-sm">
                  Élimine <strong>100%</strong> des bactéries et virus grâce à la technologie UV-C LED.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Automatisme</h4>
                <p className="text-gray-700 text-sm">
                  S&apos;active automatiquement toutes les 2 heures pour garder l&apos;eau pure et la bouteille sans odeur.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Design & Thermique</h4>
                <p className="text-gray-700 text-sm">
                  Une double paroi isolée sous vide garde l&apos;eau froide pendant <strong>24h</strong> et chaude pendant <strong>12h</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Marché
function MarcheTab() {
  return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">3. Axes de Communication & Analyse de Marché</h2>
        
        {/* Axes de communication */}
        <div className="mb-8 sm:mb-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Axes de Communication</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-4 sm:p-6 border-2 border-pink-100">
            <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">📱</div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">TikTok</h4>
            <p className="text-sm sm:text-base text-gray-700">Mise en avant de notre produit via des contenus créatifs et engageants pour toucher un public jeune et connecté.</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 sm:p-6 border-2 border-purple-100">
            <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">📸</div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">Instagram</h4>
            <p className="text-sm sm:text-base text-gray-700">Visibilité premium avec des visuels esthétiques et des partenariats avec des influenceurs lifestyle et tech.</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 sm:p-6 border-2 border-blue-100 sm:col-span-2 md:col-span-1">
            <div className="text-3xl sm:text-4xl font-bold mb-2 sm:mb-3">💼</div>
            <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">LinkedIn</h4>
            <p className="text-sm sm:text-base text-gray-700">Positionnement B2B et professionnel pour les cadeaux d&apos;affaires et la communication corporate.</p>
          </div>
        </div>
      </div>

        {/* Statistiques du marché */}
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Taille du Marché & Potentiel</h3>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-larq-blue to-larq-blue-dark rounded-2xl p-6 sm:p-8 text-white">
              <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">8.5</div>
              <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">Milliards €</div>
              <p className="text-base sm:text-lg opacity-90">Marché global de la bouteille réutilisable (2023)</p>
              <p className="text-xs sm:text-sm mt-3 sm:mt-4 opacity-75">
              Devrait atteindre près de <strong>11 milliards €</strong> d&apos;ici 2028 
              (Croissance annuelle ~4.5%)
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-6 sm:p-8 text-white">
            <div className="text-4xl sm:text-5xl md:text-6xl font-bold mb-3 sm:mb-4">+15%</div>
            <div className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">CAGR</div>
            <p className="text-base sm:text-lg opacity-90">Marché de la Smart Bottle</p>
            <p className="text-xs sm:text-sm mt-3 sm:mt-4 opacity-75">
              Segment en <strong>hyper-croissance</strong> estimé à <strong>27.5 millions €</strong> actuellement
            </p>
          </div>
        </div>
        
        <div className="mt-6 sm:mt-8 bg-gray-50 rounded-xl p-4 sm:p-6 border border-gray-200">
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            <strong>Notre avantage :</strong> Nous ne vendons pas seulement un contenant, nous vendons de la technologie 
            sanitaire grand public. Nous nous positionnons sur le segment <strong>&quot;Premium&quot;</strong>, où les marges sont 
            plus élevées et la concurrence moins féroce que sur les gourdes classiques.
          </p>
        </div>
      </div>
    </div>
  );
}

// Composant Croissance
function CroissanceTab() {
  const growthData = [
    { year: 'Année 1', amount: 250000, label: 'Lancement', units: '~2 500 bouteilles', strategy: 'Acquisition via Social Ads (Meta/TikTok) & Influenceurs "Tech/Voyage"' },
    { year: 'Année 2', amount: 750000, label: 'Expansion', units: '~7 500 bouteilles', strategy: 'Partenariats Retail (Concept stores, magasins de sport premium) & B2B (Cadeaux d\'affaires)' },
    { year: 'Année 3', amount: 1800000, label: 'Scale', units: '~18 000 unités', strategy: 'Diversification de la gamme (Pichets, carafes filtrantes) & Expansion européenne' },
  ];

  const maxAmount = 1800000;
  const panierMoyen = 100;

  return (
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">4. Perspectives de Croissance sur 3 Ans</h2>
        
        <div className="bg-gray-50 rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
          <p className="text-sm sm:text-base text-gray-700 text-center">
          Basé sur des modèles de réussite similaires dans le secteur D2C (Direct-to-Consumer) et la croissance 
          actuelle de l&apos;IoT (Internet of Things) grand public, voici notre prévisionnel réaliste :
        </p>
          <p className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600">
            <strong>Note :</strong> Ces chiffres sont basés sur un panier moyen de {panierMoyen}€ et une croissance 
            réaliste de x3 par an, typique des startups hardware à succès en phase de &quot;Seed&quot;.
          </p>
        </div>

        {/* Graphique en barres */}
        <div className="space-y-4 sm:space-y-6">
          {growthData.map((data, index) => {
            const percentage = (data.amount / maxAmount) * 100;
            return (
              <div key={data.year} className="space-y-2 sm:space-y-3">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900">{data.year} - {data.label}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{data.units}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-2xl sm:text-3xl font-bold text-larq-blue">{data.amount.toLocaleString('fr-FR')} €</div>
                  </div>
                </div>
              
              {/* Barre de progression */}
              <div className="relative w-full h-8 sm:h-12 bg-gray-200 rounded-lg overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full bg-gradient-to-r from-larq-blue to-larq-blue-light rounded-lg flex items-center justify-end pr-2 sm:pr-4"
                >
                  <span className="text-white font-semibold text-xs sm:text-sm">{percentage.toFixed(0)}%</span>
                </motion.div>
              </div>
              
              <p className="text-xs sm:text-sm text-gray-600 italic">{data.strategy}</p>
            </div>
          );
        })}
      </div>

        {/* Tableau récapitulatif */}
        <div className="mt-8 sm:mt-12 overflow-x-auto -mx-3 sm:mx-0">
          <table className="w-full border-collapse border border-gray-300 rounded-lg text-xs sm:text-sm">
            <thead>
              <tr className="bg-larq-blue text-white">
                <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left">Année</th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left">Objectif CA</th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left">Volume estimé</th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 text-left">Stratégie Clé</th>
              </tr>
            </thead>
            <tbody>
              {growthData.map((data) => (
                <tr key={data.year} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-semibold">{data.year}</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3 font-bold text-larq-blue">{data.amount.toLocaleString('fr-FR')} €</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">{data.units}</td>
                  <td className="border border-gray-300 px-2 sm:px-4 py-2 sm:py-3">{data.strategy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
}

// Composant Opportunité
function OpportuniteTab() {
  const fundAllocation = [
    { category: 'Stock & Logistique', percentage: 45, amount: 157500, description: 'Sécuriser un inventaire suffisant pour éviter les ruptures de stock lors des pics saisonniers (Noël, Été)' },
    { category: 'Marketing & Acquisition', percentage: 35, amount: 122500, description: 'Campagnes agressives sur les réseaux sociaux et partenariats avec des influenceurs clés pour faire baisser le coût d\'acquisition client (CAC)' },
    { category: 'Opérations & Site Web', percentage: 20, amount: 70000, description: 'Optimisation de l\'expérience utilisateur (UX) sur le site et recrutement d\'un support client dédié' },
  ];

  return (
      <div className="space-y-8 sm:space-y-12">
        <div className="bg-larq-blue-dark text-white rounded-2xl p-6 sm:p-8 md:p-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-center">5. Pourquoi ce projet est une opportunité pour VOUS investisseur</h2>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚫</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Écologique</h3>
            <p className="text-xs sm:text-sm opacity-90">
              Les législations se durcissent et les consommateurs changent. Nous sommes la solution élégante à ce problème.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">⭐</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Modernisation</h3>
            <p className="text-xs sm:text-sm opacity-90">
              Les consommateurs sont prêts à payer plus cher (High Ticket) pour des produits durables, technologiques et beaux. 
              Cela garantit une marge brute confortable.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
            <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">📈</div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">Scalable</h3>
            <p className="text-xs sm:text-sm opacity-90">
              Le produit est compact, facile à stocker et à expédier, ce qui minimise les coûts logistiques et facilite 
              l&apos;expansion internationale rapide via le e-commerce.
            </p>
          </div>
        </div>
      </div>

      {/* The Ask */}
      <div className="bg-gradient-to-br from-larq-blue to-larq-blue-dark rounded-2xl p-6 sm:p-8 md:p-12 text-white">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-center">6. Besoin de Financement (The Ask)</h2>
        
        <div className="text-center mb-8 sm:mb-12">
          <p className="text-base sm:text-xl md:text-2xl mb-3 sm:mb-4 opacity-90">
            Pour passer du stade de lancement à l&apos;accélération (Scale-up), nous ouvrons notre capital ou sollicitons un financement à hauteur de :
          </p>
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2">350 000 €</div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Allocation des fonds</h3>
          
          {fundAllocation.map((item, index) => (
            <div key={item.category} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-3 sm:mb-4">
                <h4 className="text-lg sm:text-xl font-bold">{item.category}</h4>
                <div className="text-left sm:text-right">
                  <div className="text-xl sm:text-2xl font-bold">{item.percentage}%</div>
                  <div className="text-xs sm:text-sm opacity-75">{item.amount.toLocaleString('fr-FR')} €</div>
                </div>
              </div>
              
              {/* Barre de progression */}
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden mb-3">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
              
              <p className="text-xs sm:text-sm opacity-90">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Composant Conclusion
function ConclusionTab() {
  return (
      <div className="space-y-6 sm:space-y-8">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">7. Conclusion</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed mb-3 sm:mb-4">
          Nous ne sommes pas au début d&apos;une simple tendance, mais face à un changement durable des modes de consommation. 
          Avec la technologie LARQ, nous avons le meilleur produit de sa catégorie. Il nous manque aujourd&apos;hui le carburant 
          financier pour dominer le marché français et européen.
        </p>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed font-semibold">
            Rejoignez-nous pour redéfinir la façon dont le monde boit de l&apos;eau.
          </p>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-larq-blue to-larq-blue-dark rounded-2xl p-6 sm:p-8 md:p-12 text-white text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">Prêt à investir dans l&apos;avenir de l&apos;hydratation ?</h3>
          <motion.a
            href="/faq"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-white text-larq-blue font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200 shadow-lg"
          >
            Voici nos coordonnées
          </motion.a>
        </div>
    </div>
  );
}

