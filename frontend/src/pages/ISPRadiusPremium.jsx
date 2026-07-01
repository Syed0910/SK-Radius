import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Zap, TrendingUp, Database, Server, Shield, Globe, Users, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { premiumPricing, features, faqs, keyFeatures, whyChooseUs } from '../data/mockData';

const ISPRadiusPremium = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = statsRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const CountingNumber = ({ target, suffix, duration, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const startTime = Date.now();
      const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOutQuart(progress);
        setCount(Math.floor(target * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, target, duration]);

    return <>{count}{suffix}</>;
  };

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
    <div className="bg-[#161719] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-[#fa6e43]/20"></div>
        
        {/* Subtle animated background elements */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-20 w-72 h-72 bg-[#fa6e43]/10 rounded-full blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"
            animate={{
              x: [0, -30, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-full mb-6"
            >
              <span className="text-[#fa6e43] text-sm font-medium">🚀 ENTERPRISE EDITION</span>
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold text-[#e3dbd8] mb-6">
              ISP Radius Premium
            </h1>
            <p className="text-2xl text-[#fa6e43] mb-6">
              Enterprise ISP Automation & Advanced AAA Control Platform
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              Advanced enterprise-grade ISP management solution with enhanced automation, real-time monitoring, and comprehensive control features for large-scale deployments.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Server, text: '5000+ Users Support' },
              { icon: Shield, text: 'Advanced Security' },
              { icon: Globe, text: 'Global Deployment' },
              { icon: Users, text: 'Enterprise Support' }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-[#fa6e43]/20 flex items-center justify-center mb-3">
                  <item.icon className="h-6 w-6 text-[#fa6e43]" />
                </div>
                <p className="text-sm text-gray-300">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Dashboard Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 flex justify-center"
          >
            <div className="relative max-w-4xl w-full">
              <img
                src="/images/user-details.png"
                className="w-full h-auto rounded-lg shadow-2xl border border-[#161719]"
              />
            </div>
          </motion.div>

          {/* Statistics Section */}
          <motion.div
            ref={statsRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.6 }}
            className="mt-20"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { number: 5000, suffix: '+', label: 'Enterprise Users Supported' },
                { number: 99.9, suffix: '%', label: 'Uptime Guarantee' },
                { number: 50, suffix: '+', label: 'Countries Deployed' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    y: -5
                  }}
                  className="text-center p-6 rounded-lg bg-[#161719]/50 border border-[#161719] hover:border-[#fa6e43]/50 transition-all duration-300"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, type: "spring", stiffness: 200 }}
                    className="text-4xl md:text-5xl font-bold text-[#fa6e43] mb-2"
                  >
                    <CountingNumber
                      target={stat.number}
                      suffix={stat.suffix}
                      duration={2500}
                      isVisible={isVisible}
                    />
                  </motion.div>
                  <p className="text-sm md:text-base text-gray-300 leading-tight">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Software Screenshots Section (copied from standard) */}
      <section className="py-20 bg-[#161719]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">Software Screenshots</h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Discover our intuitive web application interface built for seamless business management.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { id: 'subscribers', name: 'Subscribers Management' },
              { id: 'invoices', name: 'Invoices' },
              { id: 'users', name: 'Users' },
              { id: 'plans', name: 'Service Plans' },
              { id: 'subscriber-profile', name: 'Subscriber Profile' },
              { id: 'ledgers', name: 'Ledgers' },
              { id: 'my-profile', name: 'My Profile' },
              { id: 'login-logs', name: 'Login Logs' },
              { id: 'env-variables', name: 'Environment Variables' },
              { id: 'payments', name: 'Payments' },
              { id: 'settings', name: 'Settings' },
              { id: 'permissions', name: 'Permissions' }
            ].map((screenshot, index) => (
              <motion.div
                key={screenshot.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 10px 30px rgba(255, 99, 71, 0.3)"
                }}
                onClick={() => setSelectedImage(screenshot)}
                className="relative overflow-hidden rounded-lg border border-[#161719] hover:border-[#fa6e43]/50 transition-all duration-300 cursor-pointer"
              >
                <div className="aspect-video bg-[#161719] flex items-center justify-center">
                  <img
                    src={`/images/${screenshot.id}.png`}
                    alt={screenshot.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='Arial, sans-serif' font-size='14'%3E${screenshot.name}%3C/text%3E%3C/svg%3E`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white text-sm font-medium">{screenshot.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      {/* Key Features */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/5 via-transparent to-[#fa6e43]/5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-[#c0c0c0] mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Premium Key Features
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Enterprise-grade feature ecosystem designed for high-capacity ISP operations
            </p>
          </motion.div>

          <div className="space-y-40">
            {premiumKeyFeatures.map((feature, index) => {
              const getImageName = (title) => {
                if (title.includes('RADIUS')) return 'server';
                if (title.includes('Prices')) return 'invoices';
                if (title.includes('Connectivity')) return 'globe';
                if (title.includes('Real-Time')) return 'zap';
                return null;
              };
              const imageName = getImageName(feature.title);

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 80 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  className="relative group my-12"
                >
                  {/* Glow background */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fa6e43]/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                  <div className="relative bg-[#161719]/80 backdrop-blur-md border border-[#161719] rounded-2xl p-12 transition-all duration-500 group-hover:border-[#fa6e43]/40">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                      <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className="flex justify-center"
                      >
                        {imageName && (
                          <motion.img
                            src={`/images/${imageName}.png`}
                            alt={feature.title}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 120 }}
                            className="w-[380px] max-w-full object-contain"
                          />
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ x: 200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 3,
                          delay: 0.3,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                      >
                        <h3 className="text-3xl font-bold text-[#c0c0c0] mb-8 group-hover:text-[#fa6e43] transition-colors duration-300">
                          {feature.title}
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                          {feature.description}
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className="text-center mt-20"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#fa6e43] to-[#fa6e43] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(255,99,71,0.5)] transition-all duration-300 cursor-pointer"
            >
              <span>Explore All Features</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expanded Features - Same tabs as ISP Radius but with "Enterprise" badge */}
      <section className="py-20 bg-[#161719]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">Enterprise Features</h2>
            <p className="text-lg text-gray-300">
              All standard features plus advanced enterprise capabilities
            </p>
          </motion.div>

          <Tabs defaultValue="network" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-8 bg-[#161719]">
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
                      className="flex items-start space-x-3 p-4 rounded-lg bg-[#161719]/50 hover:bg-[#161719] transition-colors"
                    >
                      <Check className="h-5 w-5 text-[#fa6e43] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="text-[#c0c0c0] font-medium mb-1">{item.title}</h4>
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
            <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">Premium Pricing</h2>
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
                <Card className="h-full bg-gradient-to-br from-[#fa6e43]/30 to-[#161719] border-[#fa6e43] hover:shadow-lg hover:shadow-[#fa6e43]/20 transition-all">
                  <CardHeader>
                    <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-[#fa6e43]">
                        {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                      </span>
                      {typeof plan.price === 'number' && <span className="text-gray-400"> / month</span>}
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-[#fa6e43] mr-2" />
                        Up to {plan.users} subscribers
                      </li>
                      <li className="flex items-center text-gray-300">
                        <Check className="h-5 w-5 text-[#fa6e43] mr-2" />
                        {plan.nas} NAS/Routers
                      </li>
                    </ul>
                    <Button className="w-full bg-[#fa6e43] hover:bg-[#fa6e43] text-white">
                      {plan.name.includes('Advanced') ? 'Contact Us' : 'Get Started'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section (copied from standard) */}
      <section className="py-24 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/5 via-transparent to-[#fa6e43]/5"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-full mb-6"
            >
              <span className="text-[#fa6e43] text-sm font-medium">Why Choose Us</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#c0c0c0] mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Why Choose ISP Radius Premium?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              ISP Radius Premium builds on our standard offering with enterprise grade improvements and dedicated support
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/10 to-[#fa6e43]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>
                
                {/* Main card */}
                <div className="relative bg-[#161719]/80 backdrop-blur-sm border border-[#161719] rounded-2xl p-8 group-hover:border-[#fa6e43]/50 transition-all duration-500 h-full">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-16 h-16 bg-gradient-to-br from-[#fa6e43]/20 to-[#fa6e43]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:from-[#fa6e43]/30 group-hover:to-[#fa6e43]/20 transition-all duration-500"
                  >
                    <item.icon className="h-8 w-8 text-[#fa6e43]" />
                  </motion.div>

                  <h3 className="text-xl font-bold text-[#c0c0c0] mb-4 group-hover:text-[#fa6e43] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Hover indicator */}
                  <motion.div
                    initial={{ width: 0 }}
                    whileHover={{ width: "60px" }}
                    transition={{ duration: 0.3 }}
                    className="h-1 bg-gradient-to-r from-[#fa6e43] to-transparent mt-6 rounded-full"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section (copied) */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-300">Find answers to common questions about ISP Radius Premium</p>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-[#161719]">
                <AccordionTrigger className="text-white hover:text-[#fa6e43] transition-colors">
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

      {/* Comparison Section */}
      <section className="py-20 bg-[#161719]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">Premium vs Standard</h2>
            <p className="text-lg text-gray-300">
              Understanding the difference between ISP Radius and ISP Radius Premium
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-[#161719]/50 border-blue-500/50">
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

            <Card className="bg-gradient-to-br from-[#fa6e43]/30 to-[#161719] border-[#fa6e43]">
              <CardHeader>
                <CardTitle className="text-2xl text-[#fa6e43]">ISP Radius Premium</CardTitle>
                <CardDescription>Enterprise Edition</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#fa6e43] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Everything in Standard +</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#fa6e43] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Advanced bandwidth rule engine</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#fa6e43] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Executive analytics dashboards</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#fa6e43] mr-2 mt-0.5" />
                    <span className="text-gray-300 text-sm">Priority 24/7 support</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-[#fa6e43] mr-2 mt-0.5" />
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
        <div className="absolute inset-0 bg-gradient-to-r from-[#fa6e43]/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#c0c0c0] mb-6">Upgrade to Premium Today</h2>
          <p className="text-lg text-gray-300 mb-8">
            Experience enterprise-grade performance and priority support
          </p>
          <Button size="lg" className="bg-[#fa6e43] hover:bg-[#fa6e43] text-white px-12 py-6 text-lg group">
            Contact Enterprise Sales
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Image Modal (copied from standard) */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#161719]/80 backdrop-blur-sm"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring" }}
            className="relative max-w-6xl max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors p-2"
            >
              <X className="h-6 w-6" />
            </button>
            <div className="bg-[#161719] rounded-lg overflow-hidden border border-[#161719]">
              <div className="p-4 border-b border-[#161719]">
                <h3 className="text-xl font-semibold text-[#c0c0c0]">{selectedImage.name}</h3>
              </div>
              <div className="relative">
                <img
                  src={`/images/${selectedImage.id}.png`}
                  alt={selectedImage.name}
                  className="max-w-full max-h-[70vh] object-contain"
                  onError={(e) => {
                    e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'%3E%3Crect width='800' height='600' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='Arial, sans-serif' font-size='18'%3E${selectedImage.name}%3C/text%3E%3C/svg%3E`;
                  }}
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ISPRadiusPremium;