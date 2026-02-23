import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Search, Clock, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { logServerPricing } from '../data/mockData';

const LogServer = () => {
  const keyFeatures = [
    {
      icon: Search,
      title: 'Superfast Data Filtering',
      description: 'Filter massive log datasets instantly with optimized algorithms. Even large logs can be searched in seconds.'
    },
    {
      icon: Clock,
      title: 'Multiple Log Views',
      description: 'View your logs in raw, optimized, or customized formats depending on your needs for easier troubleshooting.'
    },
    {
      icon: Shield,
      title: 'Efficient Data Storage',
      description: 'Logs are stored in a structured, accessible way for quick retrieval and organized backup processes.'
    }
  ];

  return (
    <div className="bg-[#0f1419] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-orange-900/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ISP Radius Log Server
            </h1>
            <p className="text-2xl text-[#ff6347] mb-6">
              Advanced Centralized Log Management System
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A powerful, scalable, and high-performance syslog and tracking log server for ISPs and enterprise networks, 
              designed to collect, organize, search, and analyze logs from all network devices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-[#1a2332]/50 border-[#2d3748] hover:border-[#ff6347]/50 transition-all h-full">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-[#ff6347]/20 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-[#ff6347]" />
                    </div>
                    <CardTitle className="text-xl text-white">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expanded Features */}
      <section className="py-20 bg-[#1a2332]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Complete Log Management</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: 'Log Management', items: ['Host IP & Date/Time storage', 'Add and manage NAS/Routers', 'TCP/UDP log sources', 'Custom incoming ports'] },
              { title: 'Security & Permissions', items: ['Role-wise permissions', 'Secure session technology', 'Zero risk of data loss', 'Daily backup options'] },
              { title: 'Backup & Storage', items: ['Local and cloud backup', 'Multiple HDD attachments', 'File-system based storage', 'Unlimited data retention'] },
              { title: 'Advanced Search', items: ['Server-side data tables', 'Filter by MAC, IP, time', 'Export to CSV, Excel, PDF', 'Mobile-responsive interface'] }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="bg-[#1a2332]/50 border border-[#2d3748] rounded-lg p-6 h-full">
                  <h3 className="text-lg font-semibold text-white mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-[#ff6347] mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-400">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Affordable Pricing</h2>
            <p className="text-lg text-gray-300">
              Simple, transparent pricing for log management across small to large ISP networks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {logServerPricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${
                  plan.badge 
                    ? 'bg-gradient-to-br from-orange-900/30 to-[#1a2332] border-[#ff6347] relative' 
                    : 'bg-[#1a2332]/50 border-[#2d3748]'
                } hover:border-[#ff6347] transition-all`}>
                  {plan.badge && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#ff6347] text-white">{plan.badge}</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.support}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold text-[#ff6347]">${plan.initialPrice}</span>
                        <span className="text-gray-400 ml-2">Initial License</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Yearly Fee: <span className="text-[#ff6347] font-semibold">${plan.yearlyFee}</span>
                      </div>
                    </div>
                    
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#ff6347] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">Unlimited Users & Data</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#ff6347] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{plan.nas} NAS/Routers</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#ff6347] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{plan.storage}</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-4 w-4 text-[#ff6347] mt-0.5 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{plan.freeService} Free Service</span>
                      </li>
                      {plan.features && plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="h-4 w-4 text-[#ff6347] mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button className="w-full bg-[#ff6347] hover:bg-[#ff4520] text-white">
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Server Requirements */}
      <section className="py-20 bg-[#1a2332]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">Server Requirements</h2>
            <p className="text-gray-300">Minimum requirements to run the log server reliably</p>
          </motion.div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-4 px-4 text-white font-semibold">Plan</th>
                  <th className="py-4 px-4 text-white font-semibold">OS</th>
                  <th className="py-4 px-4 text-white font-semibold">CPU</th>
                  <th className="py-4 px-4 text-white font-semibold">RAM</th>
                  <th className="py-4 px-4 text-white font-semibold">SSD</th>
                  <th className="py-4 px-4 text-white font-semibold">HDD</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: 'Starter', os: 'Ubuntu 22.04 64-bit', cpu: '2 Cores', ram: '4 GB', ssd: '50 GB', hdd: '1 TB' },
                  { plan: 'Standard', os: 'Ubuntu 22.04 64-bit', cpu: '4 Cores', ram: '8 GB', ssd: '100 GB', hdd: '2 TB' },
                  { plan: 'Professional', os: 'Ubuntu 22.04 64-bit', cpu: '6 Cores', ram: '16 GB', ssd: '100 GB', hdd: '4 TB' }
                ].map((req, index) => (
                  <tr key={index} className="border-b border-[#2d3748] hover:bg-[#1a2332]/30 transition-colors">
                    <td className="py-4 px-4 text-gray-300">{req.plan}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{req.os}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{req.cpu}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{req.ram}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{req.ssd}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{req.hdd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Start Monitoring Your Logs</h2>
          <p className="text-lg text-gray-300 mb-8">
            Request a demo or free trial with installation and onboarding support
          </p>
          <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-12 py-6 text-lg group">
            Request Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LogServer;