import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, TrendingUp, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { premiumPricing, features, faqs } from '../data/mockData';

const ISPRadiusPremium = () => {
  const premiumKeyFeatures = [
    {
      title: 'Built with RADIUS & API Integration',
      description: 'The core uses RADIUS for AAA alongside API connections for automatic session handling, bandwidth adjustments, and subscriber management.'
    },
    {
      title: 'Affordable Enterprise Prices',
      description: 'Get full enterprise features at affordable prices. Begin with our Basic Package starting at $99 for 500 users and upgrade as needed.'
    },
    {
      title: 'Flexible Connectivity Support',
      description: 'Supports Radius PPPoE, Radius Hotspot, API PPPoE, API Hotspot, and static IP with MAC/IP binding for complete network flexibility.'
    },
    {
      title: 'Real-Time Network Monitoring',
      description: 'Track subscribers and network activity in real time with detailed graphs, bandwidth usage data, and session logs.'
    }
  ];

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-950 to-blue-900/20"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-[#ff6347]/20 border border-[#ff6347] rounded-full text-[#ff6347] text-sm font-medium mb-6">
              ENTERPRISE EDITION
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              ISP Radius Premium
            </h1>
            <p className="text-2xl text-[#ff6347] mb-6">
              Enterprise ISP Automation & Advanced AAA Control Platform
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A high-performance, enterprise-grade ISP management solution built for large-scale networks, 
              advanced automation, deep analytics, and complex reseller ecosystems.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, text: '100+ Router/NAS devices' },
              { icon: TrendingUp, text: 'Advanced analytics dashboards' },
              { icon: Database, text: 'High-performance architecture' },
              { icon: Check, text: 'Priority 24/7 support' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-[#ff6347]/20 flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6 text-[#ff6347]" />
                </div>
                <p className="text-sm text-gray-300">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Premium Key Features</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Enterprise-grade feature ecosystem designed for high-capacity ISP operations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {premiumKeyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-orange-900/20 to-[#1a2332] border-[#ff6347]/50 hover:border-[#ff6347] transition-all h-full">
                  <CardHeader>
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

      {/* Expanded Features - Same tabs as ISP Radius but with "Enterprise" badge */}
      <section className="py-20 bg-[#0f0f0f]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Enterprise Features</h2>
            <p className="text-lg text-gray-300">
              All standard features plus advanced enterprise capabilities
            </p>
          </motion.div>

          <Tabs defaultValue="network" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-[#0f0f0f]">
              <TabsTrigger value="network">Network Management</TabsTrigger>
              <TabsTrigger value="billing">Billing & Finance</TabsTrigger>
              <TabsTrigger value="user">User Management</TabsTrigger>
              <TabsTrigger value="system">System & Support</TabsTrigger>
            </TabsList>

            {Object.entries({
              network: features.networkManagement,
              billing: features.billing,
              user: features.userManagement,
              system: features.system
            }).map(([key, items]) => (
              <TabsContent key={key} value={key}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start space-x-3 p-4 rounded-lg bg-[#0f0f0f]/50 hover:bg-[#0f0f0f] transition-colors"
                    >
                      <Check className="h-5 w-5 text-[#ff6347] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-white font-medium mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-400">{item.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Premium Pricing */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Premium Pricing</h2>
            <p className="text-lg text-gray-300">
              Flexible enterprise pricing tailored for high-capacity ISP networks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {premiumPricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-gradient-to-br from-orange-900/30 to-[#1a2332] border-[#ff6347] hover:shadow-lg hover:shadow-[#ff6347]/20 transition-all">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#ff6347]">
                        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                      </span>
                      {typeof plan.price === 'number' && <span className="text-gray-400"> / month</span>}
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-[#ff6347] mr-2" />
                        Up to {plan.users} subscribers
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-[#ff6347] mr-2" />
                        {plan.nas} NAS/Routers
                      </li>
                    </ul>
                    <Button className="w-full bg-[#ff6347] hover:bg-[#ff4520] text-white">
                      {plan.name.includes('Advanced') ? 'Contact Us' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-[#0f0f0f]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Premium vs Standard</h2>
            <p className="text-lg text-gray-300">
              Understanding the difference between ISP Radius and ISP Radius Premium
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#0f0f0f]/50 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-2xl text-blue-400">ISP Radius</CardTitle>
                <CardDescription>Standard Edition</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Full RADIUS AAA support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Automated billing & invoicing</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Multi-level reseller management</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-blue-500 mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Standard reporting tools</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-gray-400 italic">
                  Best for: Small to mid-size ISPs
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-[#1a2332] border-[#ff6347]">
              <CardHeader>
                <CardTitle className="text-2xl text-orange-400">ISP Radius Premium</CardTitle>
                <CardDescription>Enterprise Edition</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#ff6347] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Everything in Standard +</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#ff6347] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Advanced bandwidth rule engine</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#ff6347] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Executive analytics dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#ff6347] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Priority 24/7 support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#ff6347] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Full API integration</span>
                  </li>
                </ul>
                <p className="mt-6 text-sm text-gray-400 italic">
                  Best for: Large ISPs and multi-branch operations
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Upgrade to Premium Today</h2>
          <p className="text-lg text-gray-300 mb-8">
            Experience enterprise-grade performance and priority support
          </p>
          <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-12 py-6 text-lg group">
            Contact Enterprise Sales
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ISPRadiusPremium;