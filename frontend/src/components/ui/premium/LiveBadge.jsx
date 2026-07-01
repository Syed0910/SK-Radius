import React from 'react';
import { motion } from 'framer-motion';

export default function LiveBadge({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                 border border-white/10 bg-white/[0.04] backdrop-blur-sm mb-6"
    >
      <span className="relative flex h-2 w-2">
  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
</span>
      <span className="text-xs font-medium text-gray-300 tracking-wide">{children}</span>
    </motion.div>
  );
}