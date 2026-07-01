import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { GlassCard, PrimaryCTA } from '../ui/premium';

export default function ContactCTA() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161719] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard className="p-10 md:p-14 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-[#c0c0c0] mb-4">
              Let's Build Your Network
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-xl mx-auto">
              Request a demo or free trial — we'll help you choose the right platform for your needs.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <Link to="/contact">
                <PrimaryCTA>
                  Contact Us
                </PrimaryCTA>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-white/[0.06]">
              <a
                href="mailto:info@skradius.com"
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300"
              >
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@skradius.com</span>
              </a>
              <a
                href="tel:+91XXXXXXXXXX"
                className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors duration-300"
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">+91-XXXXXXXXXX (WhatsApp)</span>
              </a>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}