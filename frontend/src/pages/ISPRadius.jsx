import React from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Server, Network, Users, Shield, Zap, Globe } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { radiusPricing, keyFeatures, features, whyChooseUs, faqs } from '../data/mockData';

const ISPRadius = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
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
              ISP Radius
            </h1>
            <p className="text-2xl text-orange-500 mb-6">
              Intelligent ISP Management & AAA Platform
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A scalable, secure, and fully integrated solution for managing ISP operations and subscriber 
              authentication with automated billing and real-time monitoring.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Server, text: '50+ Router/NAS devices' },
              { icon: Shield, text: '24/7 Premium Support' },
              { icon: Globe, text: 'Global ISP compatibility' },
              { icon: Users, text: 'Trusted by hundreds' }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-lg bg-orange-600/20 flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6 text-orange-500" />
                </div>
                <p className="text-sm text-gray-300">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Key Software Features</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Powerful capabilities designed to help ISP businesses scale efficiently with automation and centralized control.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all h-full group">
                  <CardHeader>
                    <CardTitle className="text-xl text-white group-hover:text-orange-500 transition-colors">
                      {feature.title}
                    </CardTitle>
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

      {/* Expanded Features Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Expanded Features</h2>
            <p className="text-lg text-gray-300">
              The suite includes powerful capabilities that modern ISP businesses require
            </p>
          </motion.div>

          <Tabs defaultValue="network" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-slate-900">
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
                      className="flex items-start space-x-3 p-4 rounded-lg bg-slate-900/50 hover:bg-slate-900 transition-colors"
                    >
                      <Check className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
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

      {/* Pricing Section */}
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
              Simple, transparent pricing built for ISPs of all sizes. Choose the plan that fits your network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {radiusPricing.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${
                  plan.name === 'Standard' 
                    ? 'bg-gradient-to-br from-orange-900/30 to-slate-900 border-orange-500' 
                    : 'bg-slate-900/50 border-slate-800'
                } hover:border-orange-500 transition-all`}>
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-orange-500">
                        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                      </span>
                      {typeof plan.price === 'number' && <span className="text-gray-400"> / month</span>}
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-orange-500 mr-2" />
                        Up to {plan.users} subscribers
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-orange-500 mr-2" />
                        {plan.nas} NAS/Routers
                      </li>
                    </ul>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      {plan.name === 'Advanced' ? 'Contact Us' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose ISP Radius?</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              ISP Radius is a complete ISP management platform designed to solve real-world challenges
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all h-full">
                  <CardHeader>
                    <CardTitle className="text-lg text-white">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">Find answers to common questions about ISP Radius</p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-slate-800">
                <AccordionTrigger className="text-white hover:text-orange-500 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Start managing your ISP network with ISP Radius today
          </p>
          <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 text-lg group">
            Contact Sales
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ISPRadius;