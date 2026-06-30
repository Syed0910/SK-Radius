import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'ISPs Worldwide' },
  { value: 50, suffix: '+', label: 'NAS Vendors Supported' },
  { value: 99.9, suffix: '%', label: 'Uptime Guaranteed', decimals: 1 },
  { value: 10, suffix: 'M+', label: 'Subscribers Managed' },
];

function Counter({ value, suffix = '', decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, value, {
        duration: 2,
        ease: [0.16, 1, 0.3, 1],
      });
      return controls.stop;
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return motionValue.on('change', (v) => {
      setDisplay(decimals ? v.toFixed(decimals) : Math.floor(v).toString());
    });
  }, [motionValue, decimals]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] border-y border-white/[0.06]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center lg:text-left"
            >
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-[hsl(var(--primary-light))] bg-clip-text text-transparent mb-2">
                <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
              </p>
              <p className="text-sm text-gray-400 tracking-wide">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}