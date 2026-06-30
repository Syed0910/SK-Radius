import React from 'react';
import { motion } from 'framer-motion';

export function NumberedFeature({ number, icon: Icon, title, description, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start group"
    >
      <div className="flex-shrink-0 relative w-10 h-10 mr-5 mt-1">
        <div className="absolute inset-0 rounded-full bg-[#ff6347]/15 group-hover:bg-[#ff6347]/25 transition-colors duration-300" />
        <div className="absolute inset-0 rounded-full border border-[#ff6347]/30 group-hover:scale-110 transition-transform duration-300" />
        <div className="relative w-full h-full flex items-center justify-center">
          {Icon ? <Icon className="h-4 w-4 text-[#ff6347]" /> : <span className="text-[#ff6347] font-bold text-sm">{number}</span>}
        </div>
      </div>
      <div>
        <h4 className="text-xl font-semibold text-white mb-2 group-hover:text-[#ff8c42] transition-colors duration-300">
          {title}
        </h4>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}