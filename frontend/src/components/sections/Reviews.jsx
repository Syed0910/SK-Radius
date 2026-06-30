import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { GlassCard } from '../ui/premium';

const reviews = [
  {
    quote: 'Switching to ISP Radius cut our subscriber churn by 18% within the first quarter — the captive portal alone paid for itself.',
    name: 'Rohan Mehta',
    role: 'CTO, AeroISP',
    metric: '18% churn reduction',
  },
  {
    quote: 'We migrated 12,000 subscribers from FreeRADIUS over a single weekend with zero downtime. The vendor support list made it painless.',
    name: 'Priya Nair',
    role: 'Network Lead, StreamNet',
    metric: 'Zero-downtime migration',
  },
  {
    quote: "The log server's real-time alerts caught a misconfigured NAS before it took down service for half our customer base.",
    name: 'David Chen',
    role: 'Founder, GridTel',
    metric: '24/7 proactive monitoring',
  },
];

export default function Reviews() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Trusted by ISPs Worldwide</h2>
          <p className="text-xl text-gray-400">
            Real outcomes from teams running their network operations on our platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              <GlassCard className="p-8 h-full flex flex-col">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-gray-300 leading-relaxed mb-6 flex-1">"{r.quote}"</p>
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div>
                    <p className="text-white font-semibold text-sm">{r.name}</p>
                    <p className="text-gray-500 text-xs">{r.role}</p>
                  </div>
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                    {r.metric}
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}