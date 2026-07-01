import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, animate } from 'framer-motion';
import { Globe, Cpu, Shield, Users } from 'lucide-react';

const stats = [
  { value: 500,  suffix: '+',  label: 'ISPs Worldwide',        sublabel: 'Across 30+ countries',             icon: Globe,  decimals: 0 },
  { value: 50,   suffix: '+',  label: 'NAS Vendors Supported', sublabel: 'Mikrotik, Cisco, Ubiquiti & more',  icon: Cpu,    decimals: 0 },
  { value: 99.9, suffix: '%',  label: 'Uptime Guaranteed',     sublabel: 'Enterprise-grade SLA',              icon: Shield, decimals: 1 },
  { value: 10,   suffix: 'M+', label: 'Subscribers Managed',   sublabel: 'Scaled for growth',                 icon: Users,  decimals: 0 },
];

/* ─── Counter ── */
function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(motionValue, value, { duration: 2, ease: [0.16, 1, 0.3, 1] });
    return controls.stop;
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return motionValue.on('change', (v) => {
      setDisplay(decimals ? v.toFixed(decimals) : Math.floor(v).toString());
    });
  }, [motionValue, decimals]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ─── Card ── */
function StatCard({ stat, index }) {
  const Icon = stat.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-7
                 hover:border-white/[0.12] hover:bg-white/[0.05] transition-all duration-300 backdrop-blur-sm"
    >


      {/* Icon */}
      <div className="w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.04]
                      flex items-center justify-center mb-6">
        <Icon size={18} className="text-white/45 group-hover:text-white/70 transition-colors duration-300" />
      </div>

      {/* Number */}
      <p className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-none mb-2"
         style={{ fontVariantNumeric: 'tabular-nums' }}>
        <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
      </p>

      {/* Label */}
      <p className="text-sm font-semibold text-white/65 mb-1">{stat.label}</p>

      {/* Sublabel */}
      <p className="text-xs text-white/28 tracking-wide">{stat.sublabel}</p>
    </motion.div>
  );
}

/* ─── Section ── */
export default function Stats() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Separator lines */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="text-xs font-semibold text-primary/80 tracking-[0.2em] uppercase mb-3">
            Trusted Globally
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#c0c0c0] leading-snug">
            Built for scale.{' '}
            <span className="text-white/40 font-normal">Proven in production.</span>
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}