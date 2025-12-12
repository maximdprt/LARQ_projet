'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface TeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const teamMembers = [
  {
    name: 'Walid',
    role: 'CEO',
    description: 'Fondateur et dirigeant de LARQ',
  },
  {
    name: 'Maxim',
    role: 'CTO',
    description: 'Directeur technique et innovation',
  },
  {
    name: 'Corentin',
    role: 'CMO / Designer',
    description: 'Marketing et design produit',
  },
];

export default function TeamModal({ isOpen, onClose }: TeamModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-2 sm:p-4"
          >
            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between rounded-t-2xl">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Notre Équipe</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Fermer"
                >
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Team Members */}
              <div className="p-4 sm:p-6 md:p-8">
                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-center p-4 sm:p-6 bg-gradient-to-br from-white to-blue-50/30 rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300"
                    >
                      {/* Avatar */}
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-larq-blue to-larq-blue-light rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 text-white text-2xl sm:text-3xl font-bold">
                        {member.name.charAt(0)}
                      </div>
                      
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1.5 sm:mb-2">
                        {member.name}
                      </h3>
                      <p className="text-sm sm:text-base text-larq-blue font-semibold mb-1.5 sm:mb-2">
                        {member.role}
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        {member.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

