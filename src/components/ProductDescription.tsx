'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductDescription() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <>
      {/* Section présentation produit */}
      <section className="pt-12 sm:pt-16 md:pt-20 lg:pt-32 pb-12 sm:pb-16 md:pb-20 lg:pb-32 px-3 sm:px-4 md:px-8 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
        {/* Effets de fond animés */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-larq-blue/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-larq-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12 sm:space-y-16 md:space-y-20 lg:space-y-24"
          >
            {/* Titre principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring" }}
              className="text-center space-y-4 sm:space-y-6 md:space-y-8 mb-8 sm:mb-12 md:mb-16"
            >
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-gray-900 via-larq-blue to-gray-900 bg-clip-text text-transparent tracking-tight leading-tight px-3 sm:px-4"
              >
                L&apos;EAU. RÉINVENTÉE.
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 italic font-light px-3 sm:px-4"
              >
                (Et si la liberté tenait dans votre main ?)
              </motion.p>
            </motion.div>

            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="max-w-none bg-white/90 backdrop-blur-sm p-4 sm:p-6 md:p-10 lg:p-12 rounded-2xl shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 mb-8 sm:mb-12 md:mb-16"
            >
              <div className="space-y-4 sm:space-y-6 md:space-y-8">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed md:leading-loose"
                >
                  On connaît tous cette sensation. La fatigue de 15h, le manque de concentration, ce corps qui tourne au ralenti. Pourquoi ? Parce qu&apos;on oublie l&apos;essentiel.{' '}
                  <motion.strong
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-gray-900 text-xl md:text-2xl font-bold"
                  >
                    On ne boit pas assez.
                  </motion.strong>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed md:leading-loose"
                >
                  Oubliez les bouteilles en plastique et l&apos;angoisse de l&apos;eau non potable en voyage. Voici{' '}
                  <motion.strong
                    whileHover={{ scale: 1.1 }}
                    className="text-larq-blue text-2xl md:text-3xl font-bold inline-block"
                  >
                    LARQ
                  </motion.strong>.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-lg md:text-xl lg:text-2xl text-gray-900 font-semibold leading-relaxed md:leading-loose pt-4 border-t border-gray-200"
                >
                  Ce n&apos;est pas juste une bouteille. C&apos;est votre station de purification personnelle et votre coach santé, fusionnés dans un design cyber-futuriste.
                </motion.p>
              </div>
            </motion.div>

            {/* Fonctionnalités */}
            <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mt-6 sm:mt-8 md:mt-12">
              {/* Liberté totale */}
              <motion.div
                initial={{ opacity: 0, x: -50, rotateY: -15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                onHoverStart={() => setHoveredCard('liberte')}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-gradient-to-br from-white to-blue-50/50 p-4 sm:p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg border-2 border-transparent hover:border-larq-blue/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden group h-full flex flex-col"
              >
                {/* Effet de glow au hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-larq-blue/0 via-larq-blue/10 to-larq-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-larq-blue bg-clip-text text-transparent mb-3 sm:mb-4 md:mb-6 text-center relative z-10"
                >
                  LA LIBERTÉ TOTALE
                </motion.h3>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed md:leading-loose relative z-10 flex-grow"
                >
                  Une rivière en randonnée ? Un robinet douteux à l&apos;autre bout du monde ? Remplissez. Appuyez sur l&apos;unique bouton tactile. En quelques secondes, notre technologie de filtration active élimine{' '}
                  <motion.strong
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    className="text-larq-blue text-xl md:text-2xl font-bold inline-block"
                  >
                    100%
                  </motion.strong>{' '}
                  des bactéries et impuretés. N&apos;importe quelle eau devient votre source de vie.
                </motion.p>
              </motion.div>

              {/* Corps en data */}
              <motion.div
                initial={{ opacity: 0, x: 50, rotateY: 15 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                onHoverStart={() => setHoveredCard('data')}
                onHoverEnd={() => setHoveredCard(null)}
                className="bg-gradient-to-br from-white to-blue-50/50 p-6 md:p-8 lg:p-10 rounded-2xl shadow-lg border-2 border-transparent hover:border-larq-blue/50 transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] relative overflow-hidden group h-full flex flex-col"
              >
                {/* Effet de glow au hover */}
                <div className={`absolute inset-0 bg-gradient-to-r from-larq-blue/0 via-larq-blue/10 to-larq-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                <motion.h3
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-larq-blue bg-clip-text text-transparent mb-4 md:mb-6 text-center relative z-10"
                >
                  VOTRE CORPS, EN DATA
                </motion.h3>
                <div className="space-y-4 md:space-y-5 relative z-10 flex-grow">
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed md:leading-loose"
                  >
                    LARQ ne se contente pas de contenir de l&apos;eau, elle communique. Les lignes néons ne sont pas seulement esthétiques : elles vous indiquent en temps réel le niveau d&apos;eau et la qualité de filtration.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed md:leading-loose"
                  >
                    Connectée à l&apos;app LARQ, la bouteille apprend vos habitudes. Elle sait quand vous avez besoin de boire avant même que vous n&apos;ayez soif. Une notification douce, un flash lumineux : votre coach vous rappelle de rester au top de votre forme.
                  </motion.p>
                </div>
              </motion.div>
            </div>

            {/* Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 mt-12 sm:mt-16 md:mt-20 lg:mt-24 pt-8 sm:pt-12 md:pt-16 border-t-2 border-gradient-to-r from-transparent via-gray-300 to-transparent relative"
            >
              {/* Ligne décorative animée */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.8 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 md:w-48 h-0.5 bg-gradient-to-r from-transparent via-larq-blue to-transparent"
              ></motion.div>

              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 leading-tight px-3 sm:px-4"
              >
                Le design de demain, pour l&apos;aventure d&apos;aujourd&apos;hui.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-medium px-3 sm:px-4"
              >
                Ne subissez plus votre soif. Maîtrisez-la.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
                className="pt-4 sm:pt-6 md:pt-8 space-y-2 sm:space-y-3 md:space-y-4"
              >
                <motion.p
                  whileHover={{ scale: 1.1, rotate: 2 }}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-larq-blue mb-1 sm:mb-2 md:mb-3 inline-block cursor-default"
                >
                  LARQ.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 font-light tracking-wide px-3 sm:px-4"
                >
                  Buvez pur. Partout.
                </motion.p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

