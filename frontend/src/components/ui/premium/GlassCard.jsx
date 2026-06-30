import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '' }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.03]
                  backdrop-blur-xl p-8 group overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                transition-opacity duration-500 pointer-events-none
                bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
<div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100
                transition-opacity duration-500 pointer-events-none
                bg-gradient-to-br from-primary/30 to-transparent -z-10 blur-md" />
      {children}
    </motion.div>
  );
}