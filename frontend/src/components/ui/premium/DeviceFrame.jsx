import React from 'react';
import { motion } from 'framer-motion';

export default function DeviceFrame({ src, alt }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative group"
    >
      <div className="absolute -inset-6 bg-gradient-to-br from-[#ff6347]/15 to-transparent blur-3xl rounded-full opacity-60 group-hover:opacity-90 transition-opacity duration-500" />
      <div className="relative rounded-xl border border-white/10 bg-[#0f0f0f] shadow-2xl overflow-hidden">
        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-[#141414]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <motion.img
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.5 }}
          src={src}
          alt={alt}
          className="w-full"
        />
      </div>
    </motion.div>
  );
}