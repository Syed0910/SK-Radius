import React from 'react';
import { ArrowRight } from 'lucide-react';
import MagneticButton from './MagneticButton';

export default function PrimaryCTA({ children, ...props }) {
  return (
    <MagneticButton
      className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full
                 bg-gradient-to-r from-primary to-[hsl(var(--primary-light))] text-primary-foreground font-semibold
                 shadow-[0_0_0_0_hsl(var(--primary)/0.5)] hover:shadow-[0_0_40px_8px_hsl(var(--primary)/0.35)]
                 transition-shadow duration-500 overflow-hidden"
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      <span className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--primary-light))] to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </MagneticButton>
  );
}