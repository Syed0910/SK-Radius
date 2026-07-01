import React from 'react';

export default function GhostButton({ children, ...props }) {
  return (
    <button
      className="group inline-flex items-center gap-2 px-8 py-4 rounded-full
           border border-white/15 text-white font-medium backdrop-blur-sm
           hover:border-primary/60 hover:bg-white/[0.03] transition-all duration-300"
      {...props}
    >
      {children}
    </button>
  );
}