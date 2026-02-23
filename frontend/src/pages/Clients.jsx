import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '../components/ui/card';
import { clients } from '../data/mockData';

const Clients = () => {
  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Our Clients</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Trusted by ISPs and network providers worldwide to manage their operations efficiently
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {clients.map((client, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500 transition-all group">
                <CardContent className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-500 to-blue-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-white">{client.logo}</span>
                    </div>
                    <h3 className="text-white font-medium text-sm group-hover:text-orange-500 transition-colors">
                      {client.name}
                    </h3>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-orange-900/20 to-blue-900/20 border border-slate-800 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Join Our Growing Client Base</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience why hundreds of ISPs trust SKRadius for their network management needs. 
              Start your journey with us today.
            </p>
            <a href="mailto:info@skradius.com" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Request a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Clients;