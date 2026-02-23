import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-white mb-8">About Us</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-[#0f0f0f]/50 border border-[#1a1a1a] rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-white mb-4">AaniRids Technologies Private Limited</h2>
              <p className="text-gray-300 mb-4">
                AaniRids Technologies Private Limited is the company behind SKRadius and broadband services.
              </p>
              <p className="text-gray-400 text-sm">
                <strong className="text-[#ff6347]">Registered Office:</strong> Zars Mansion 5-992/5/B, Near Water Tank, 
                Yadulla Colony, Gulbarga, Karnataka, India
              </p>
            </div>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">What We Do</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-400">
                  <li>Provides WavesNett Broadband (FTTH and business internet services)</li>
                  <li>Offers tailored internet plans for homes, businesses, and enterprise clients</li>
                  <li>Serves with reliability and customer support in connectivity solutions</li>
                  <li>Committed to high-speed broadband delivery and network reliability</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
                <p className="text-gray-400">
                  We are a trusted service provider in broadband technology, focused on connecting homes and enterprises. 
                  We aim to deliver excellence in connectivity and support, providing high throughput and low-latency 
                  internet services that businesses can rely on.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Core Values</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-400">
                  <li>Innovation and cutting-edge technology</li>
                  <li>Customer-centric service delivery</li>
                  <li>Reliability and performance excellence</li>
                  <li>Long-term partnerships built on trust</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;