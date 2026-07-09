import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-[#161719] min-h-screen py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-[#e3dbd8] mb-8">About Us</h1>
          
          <div className="prose prose-invert max-w-none">
            <div className="bg-[#161719]/50 border border-[#161719] rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-semibold text-[#c0c0c0] mb-4">SKRadius</h2>
              <p className="text-gray-300 mb-4">
                SKRadius is the premier, all-in-one digital management solution designed to empower ISPs and enterprises with smart, scalable, and highly secure network administration.
              </p>
              <p className="text-gray-400 text-sm">
                <strong className="text-[#fa6e43]">Registered Office:</strong> Zars Mansion Near Water Tank yadulla Colony Gulbarga, Gulbarga, India - 585104
              </p>
            </div>

            <div className="space-y-6 text-gray-300">
              <div>
                <h3 className="text-xl font-semibold text-[#c0c0c0] mb-3">What We Do</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-400">
                  <li>Deliver advanced AAA (Authentication, Authorization, and Accounting) billing solutions</li>
                  <li>Provide comprehensive TR-069 Auto Configuration Servers (ACS) for remote device management</li>
                  <li>Offer robust Log Server systems for deep network visibility and compliance</li>
                  <li>Equip ISPs with intuitive dashboards, detailed analytics, and fully automated provisioning</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#c0c0c0] mb-3">Our Mission</h3>
                <p className="text-gray-400">
                  Our mission is to simplify ISP operations by delivering a centralized, robust, and highly scalable ecosystem. We aim to take the complexity out of network management, allowing businesses to focus on providing top-tier internet experiences to their customers without worrying about backend scaling or security.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-[#c0c0c0] mb-3">Core Values</h3>
                <ul className="space-y-2 list-disc list-inside text-gray-400">
                  <li>Cutting-edge innovation in network technology</li>
                  <li>Uncompromising security and data integrity</li>
                  <li>Scalability to support growth at any stage</li>
                  <li>Empowering ISPs with seamless, automated solutions</li>
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