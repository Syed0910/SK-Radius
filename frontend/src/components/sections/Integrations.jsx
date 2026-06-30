import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from '../ui/premium';

const integrations = [
  { name: 'Mikrotik', detail: 'Full RADIUS + Hotspot support' },
  { name: 'Cisco', detail: 'Enterprise-grade AAA integration' },
  { name: 'pfSense', detail: 'Native captive portal sync' },
  { name: 'Juniper', detail: 'High-throughput NAS compatibility' },
  { name: 'Ubiquiti', detail: 'EdgeRouter & UniFi support' },
  { name: 'Huawei', detail: 'Carrier-grade NAS integration' },
  { name: 'FreeRADIUS', detail: 'Drop-in migration support' },
  { name: 'Cambium', detail: 'PMP & ePMP device support' },
];

export default function Integrations() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Works With Your Stack</h2>
          <p className="text-xl text-gray-400">
            Native integration with 50+ NAS and router vendors — no custom middleware required.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {integrations.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <GlassCard className="p-6 flex flex-col items-center text-center h-full">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary/20 to-transparent border border-white/10 flex items-center justify-center mb-4">
                  <span className="text-primary font-bold text-sm">
                    {item.name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <h4 className="text-white font-semibold mb-1">{item.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{item.detail}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}