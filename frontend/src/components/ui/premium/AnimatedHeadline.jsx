import React from 'react';
import { motion } from 'framer-motion';

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const word = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function AnimatedHeadline({ text, highlight = [], className = '' }) {
  const words = text.split(' ');
  return (
    <motion.h1 variants={container} initial="hidden" animate="visible" className={className}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] pb-1 align-bottom">
          <motion.span
            variants={word}
           className={`inline-block ${
  highlight.includes(w.replace(/[^\w]/g, ''))
    ? 'bg-gradient-to-r from-primary to-[hsl(var(--primary-light))] bg-clip-text text-transparent'
    : ''
}`}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </motion.h1>
  );
}