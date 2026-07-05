import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, ArrowRight, Server, Network, Users, Shield, Zap, Globe, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { radiusPricing, keyFeatures, features, whyChooseUs, faqs } from '../data/mockData';

const TimelineFeature = ({ feature, index, progress }) => {
  const start = index * 0.25;
  const active = start + 0.125;
  const end = (index + 1) * 0.25;

  const opacity = useTransform(
    progress,
    [start - 0.01, start, active, end + 0.1],
    [0, 0, 1, 0.6]
  );

  const y = useTransform(
    progress,
    [start - 0.01, start, active],
    [30, 30, 0]
  );

  const dotColor = useTransform(
    progress,
    [start, active],
    ["#161719", "#fa6e43"]
  );

  const dotScale = useTransform(
    progress,
    [start, active, end],
    [1, 1.5, 1]
  );

  const dotGlow = useTransform(
    progress,
    [start, active, end],
    ["0px 0px 0px rgba(255,99,71,0)", "0px 0px 20px rgba(255,99,71,0.8)", "0px 0px 5px rgba(255,99,71,0.3)"]
  );

  return (
    <motion.div style={{ opacity, y }} className="flex items-start space-x-6 relative py-5">
      <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#161719] border-2 border-[#161719] flex-shrink-0 mt-[-2px]">
        <motion.div
          style={{ backgroundColor: dotColor, scale: dotScale, boxShadow: dotGlow }}
          className="w-2.5 h-2.5 rounded-full"
        />
      </div>
      <div>
        <span className="text-gray-200 font-medium text-lg tracking-wide">{feature}</span>
      </div>
    </motion.div>
  );
};

const ISPRadius = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isCloud, setIsCloud] = useState(false);
  const statsRef = useRef(null);
  const dashboardRef = useRef(null);
  const featuresTimelineRef = useRef(null);

  const { scrollYProgress: rawTimelineProgress } = useScroll({
    target: featuresTimelineRef,
    offset: ["start 80%", "end 50%"]
  });

  const timelineProgress = useSpring(rawTimelineProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const { scrollYProgress: dashboardScroll } = useScroll({
    target: dashboardRef,
    offset: ["start end", "center center"]
  });

  const dashboardRotateX = useTransform(dashboardScroll, [0, 1], [40, 0]);
  const dashboardScale = useTransform(dashboardScroll, [0, 1], [0.85, 1]);
  const dashboardOpacity = useTransform(dashboardScroll, [0, 1], [0.3, 1]);
  const dashboardY = useTransform(dashboardScroll, [0, 1], [150, 0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const CountingNumber = ({ target, suffix = '', duration = 2000, isVisible }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isVisible) return;

      const startTime = Date.now();

      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(target * easeOutQuart));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, [isVisible, target, duration]);

    return <>{count}{suffix}</>;
  };

  return (
    <div className="bg-[#161719] min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">

        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none"
        >
          <source src="/videos/Untitled design.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-[#161719]/60 z-0"></div>

        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#e3dbd8] mb-6">
              ISP Radius
            </h1>
            <p className="text-2xl text-[#fa6e43] mb-6">
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

          {/* Dashboard Image & Features Section */}
          <div className="mt-8 mb-20">
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 lg:gap-12 items-center">

              {/* Left Side: Image - 3/5 width */}
              <div style={{ perspective: '2000px' }} className="w-full relative z-10 px-6 lg:px-8">
                <motion.div
                  ref={dashboardRef}
                  style={{
                    opacity: dashboardOpacity,
                    y: dashboardY,
                    scale: dashboardScale,
                    rotateX: dashboardRotateX,
                    transformStyle: "preserve-3d"
                  }}
                  className="relative w-full"
                >
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="rounded-[2rem] overflow-hidden border border-white/10 bg-[#161719] shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative"
                  >
                    {/* Image & Pixelated Grid Mask */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        variants={{
                          hidden: { filter: "blur(20px)", scale: 1.05 },
                          visible: { filter: "blur(0px)", scale: 1, transition: { duration: 2, ease: "easeOut" } }
                        }}
                        src="/images/dashboard.png"
                        alt="ISP Radius Dashboard"
                        className="w-full h-auto object-cover opacity-90"
                      />

                      {/* Pixelated Grid Reveal */}
                      <div
                        className="absolute inset-0 grid pointer-events-none"
                        style={{ gridTemplateColumns: 'repeat(16, 1fr)', gridTemplateRows: 'repeat(10, 1fr)' }}
                      >
                        {Array.from({ length: 160 }).map((_, i) => (
                          <motion.div
                            key={i}
                            variants={{
                              hidden: { opacity: 1 },
                              visible: { opacity: 0, transition: { duration: 0.4, delay: Math.random() * 1.5, ease: "easeOut" } }
                            }}
                            className="bg-[#161719]"
                            style={{ transform: 'scale(1.05)' }}
                          />
                        ))}
                      </div>

                      {/* Bottom gradient mask */}

                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right Side: Text & Features - 2/5 width */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-[#e3dbd8] text-5xl md:text-6xl font-bold  mt-16 mb-6 leading-tight">
                    Modern ISP Management <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#fa6e43]">
                      solution for your business.
                    </span>
                  </h2>


                </div>

                <div ref={featuresTimelineRef} className="relative mt-8 ml-2">
                  {/* Vertical Line Background */}
                  <div className="absolute left-[15px] top-[34px] bottom-[34px] w-0.5 bg-[#161719]" />

                  {/* Vertical Line Progress */}
                  <motion.div
                    className="absolute left-[15px] top-[34px] bottom-[34px] w-0.5 bg-gradient-to-b from-[#fa6e43] to-[#fa6e43] origin-top"
                    style={{ scaleY: timelineProgress }}
                  />

                  {/* Features */}
                  <div className="flex flex-col relative z-10">
                    {[
                      'Comprehensive Customer Management',
                      'Automated Billing & Invoicing',
                      'Real-time Network Monitoring',
                      'Advanced Analytics & Reports'
                    ].map((feature, idx) => (
                      <TimelineFeature key={idx} feature={feature} index={idx} progress={timelineProgress} />
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>

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
                { number: 200, suffix: '+', label: 'ISP Businesses Worldwide' },
                { number: 500, suffix: 'K+', label: 'Active Internet Subscribers' },
                { number: 20, suffix: '+', label: 'Countries Served Globally' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
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

      {/* Software Screenshots Section */}
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
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  className="aspect-video bg-[#161719] flex items-center justify-center relative overflow-hidden"
                >
                  <motion.img
                    variants={{
                      hidden: { filter: "blur(10px)", scale: 1.1 },
                      visible: { filter: "blur(0px)", scale: 1, transition: { duration: 1.5, ease: "easeOut", delay: index * 0.1 } }
                    }}
                    src={`/images/${screenshot.id}.png`}
                    alt={screenshot.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231a1a1a'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%23666' font-family='Arial, sans-serif' font-size='14'%3E${screenshot.name}%3C/text%3E%3C/svg%3E`;
                    }}
                  />

                  {/* Pixelated Grid Reveal */}
                  <div
                    className="absolute inset-0 grid pointer-events-none"
                    style={{ gridTemplateColumns: 'repeat(8, 1fr)', gridTemplateRows: 'repeat(6, 1fr)' }}
                  >
                    {Array.from({ length: 48 }).map((_, i) => (
                      <motion.div
                        key={i}
                        variants={{
                          hidden: { opacity: 1 },
                          visible: { opacity: 0, transition: { duration: 0.3, delay: (index * 0.1) + Math.random() * 0.8, ease: "easeOut" } }
                        }}
                        className="bg-[#161719]"
                        style={{ transform: 'scale(1.05)' }}
                      />
                    ))}
                  </div>
                </motion.div>
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

      {/* Key Software Features Section */}
      <section className="py-20 relative overflow-hidden">
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
              <span className="text-[#fa6e43] text-sm font-medium">Core Capabilities</span>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold text-[#c0c0c0] mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Key Software Features
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Powerful capabilities designed to help ISP businesses scale efficiently with automation and centralized control
            </p>
          </motion.div>

          <div className="space-y-40">
            {keyFeatures.map((feature, index) => {
              const getImageName = (title) => {
                if (title.includes('Multi-Level Reseller')) return 'resellers';
                if (title.includes('Billing')) return 'invoices';
                if (title.includes('Subscriber')) return 'subscribers';
                if (title.includes('Service Plans')) return 'plans';
                if (title.includes('Captive Portal')) return 'login';
                if (title.includes('General Settings')) return 'settings';
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
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#fa6e43]/10 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition duration-500"></div>

                  <div className="relative bg-[#161719]/80 backdrop-blur-md border border-[#161719] rounded-2xl p-12 transition-all duration-500 group-hover:border-[#fa6e43]/40">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                      <motion.div
                        initial={{ x: -200, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
                        transition={{ duration: 3, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
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
              onClick={() => {
                document.getElementById('expanded-features')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#fa6e43] to-[#fa6e43] text-white font-semibold rounded-full hover:shadow-[0_0_30px_rgba(255,99,71,0.5)] transition-all duration-300 cursor-pointer"
            >
              <span>Explore All Features</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Expanded Features Section */}
      <section id="expanded-features" className="py-24 relative overflow-hidden bg-gradient-to-b from-[#161719] to-[#050505]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#fa6e43]/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-[#fa6e43]/5 rounded-full blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center px-4 py-1.5 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm"
            >
              <span className="text-gray-300 text-sm font-semibold tracking-wide uppercase">Complete Toolkit</span>
            </motion.div>
            <h2 className="text-5xl font-extrabold text-[#c0c0c0] mb-6 tracking-tight">
              A Deep Dive Into Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#fa6e43]">Capabilities</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore the advanced features specifically designed to help ISP operators manage networks, billing, and subscribers with unprecedented ease.
            </p>
          </motion.div>

          <Tabs defaultValue="network" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 p-1.5 mb-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md max-w-fit mx-auto h-auto">
              <TabsTrigger value="network" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">Network</TabsTrigger>
              <TabsTrigger value="billing" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">Billing</TabsTrigger>
              <TabsTrigger value="user" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">Users</TabsTrigger>
              <TabsTrigger value="system" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">System</TabsTrigger>
            </TabsList>

            {Object.entries({
              network: { data: features.networkManagement, icon: Network },
              billing: { data: features.billing, icon: Server },
              user: { data: features.userManagement, icon: Users },
              system: { data: features.system, icon: Shield }
            }).map(([key, section]) => (
              <TabsContent key={key} value={key} className="focus:outline-none">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {section.data.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05, duration: 0.4 }}
                      whileHover={{ y: -5, scale: 1.01 }}
                      className="group relative p-6 rounded-2xl border border-white/5 bg-gradient-to-br from-white/5 to-transparent hover:border-[#fa6e43]/30 transition-all duration-300 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"></div>
                      
                      <div className="relative z-10 flex items-start gap-5">
                        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#161719]/50 border border-white/10 flex items-center justify-center group-hover:border-[#fa6e43]/50 group-hover:bg-[#fa6e43]/10 transition-colors duration-300 shadow-inner">
                          <section.icon className="h-6 w-6 text-[#fa6e43] group-hover:scale-110 transition-transform duration-300" />
                        </div>
                        <div>
                          <h4 className="text-xl font-bold text-[#c0c0c0] mb-2 group-hover:text-[#fa6e43] transition-colors duration-300">{item.title}</h4>
                          <p className="text-sm text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">{item.description}</p>
                        </div>
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
      <section className="py-24 relative overflow-hidden bg-[#050505]">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#fa6e43]/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-5xl font-extrabold text-[#c0c0c0] mb-6 tracking-tight">
              Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#fa6e43]">Transparent</span> Pricing
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto">
              Choose the perfect plan for your network size. Scale seamlessly as your ISP grows.
            </p>

            {/* Deployment Toggle */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <span className={`text-sm font-medium transition-colors ${!isCloud ? 'text-white' : 'text-gray-400'}`}>On-Premise</span>
              <button 
                onClick={() => setIsCloud(!isCloud)}
                className="relative inline-flex h-8 w-16 items-center rounded-full bg-[#161719] transition-colors focus:outline-none ring-2 ring-[#fa6e43]/50"
              >
                <motion.span
                  layout
                  className={`inline-block h-6 w-6 transform rounded-full bg-[#fa6e43] transition-transform`}
                  style={{ x: isCloud ? 36 : 4 }}
                />
              </button>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-medium transition-colors ${isCloud ? 'text-white' : 'text-gray-400'}`}>Cloud</span>
               
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {radiusPricing.map((plan, index) => {
              const isPopular = plan.name === 'Standard';
              const priceNum = typeof plan.price === 'number' ? plan.price : null;
              const displayPrice = priceNum 
                ? (isCloud ? priceNum + 20 : priceNum) 
                : plan.price;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group h-full flex"
                >
                  {/* Glow effect for popular plan */}
                  {isPopular && (
                    <div className="absolute -inset-[1px] bg-gradient-to-b from-[#fa6e43] to-[#fa6e43]/10 rounded-3xl blur-sm opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
                  )}

                  <div className={`relative flex flex-col w-full h-full p-8 rounded-3xl border transition-all duration-300 ${
                    isPopular 
                      ? 'bg-[#161719] border-[#fa6e43]/50 shadow-[0_0_40px_rgba(255,99,71,0.15)] scale-[1.02] z-10' 
                      : 'bg-[#161719]/80 border-white/10 hover:border-white/20 hover:bg-[#161719]'
                  }`}>
                    
                    {isPopular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <span className="bg-gradient-to-r from-[#fa6e43] to-[#fa6e43] text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-[#c0c0c0] mb-2">{plan.name}</h3>
                      <p className="text-sm text-gray-400 h-10">{plan.description}</p>
                    </div>

                    <div className="mb-8 flex-grow-0">
                      <div className="flex items-end gap-1">
                        {priceNum && <span className="text-3xl font-medium text-gray-400 mb-1">$</span>}
                        <span className={`font-bold tracking-tight ${isPopular ? 'text-white' : 'text-gray-100'}`} style={{ fontSize: priceNum ? '3.5rem' : '2.5rem', lineHeight: 1 }}>
                          {displayPrice}
                        </span>
                        {priceNum && (
                          <span className="text-gray-400 mb-2 ml-1">
                            /mo
                          </span>
                        )}
                      </div>
                     
                    </div>

                    <div className="flex-grow space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#fa6e43]" />
                        </div>
                        <span className="text-gray-300">Up to <strong className="text-white">{plan.users}</strong> subscribers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#fa6e43]" />
                        </div>
                        <span className="text-gray-300"><strong className="text-white">{plan.nas}</strong> NAS/Routers</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#fa6e43]" />
                        </div>
                        <span className="text-gray-300">Premium Support</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#fa6e43]" />
                        </div>
                        <span className="text-gray-300">All core features</span>
                      </div>
                    </div>

                    {plan.name === 'Advanced' ? (
                      <Link
                        to="/contact"
                        className={`inline-flex items-center justify-center w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                          isPopular 
                            ? 'bg-[#fa6e43] hover:bg-[#fa6e43] text-white shadow-lg shadow-[#fa6e43]/25 hover:shadow-[#fa6e43]/40 border-none' 
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        Contact Sales
                      </Link>
                    ) : (
                      <a
                        href="https://license.aanirids.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                          isPopular 
                            ? 'bg-[#fa6e43] hover:bg-[#fa6e43] text-white shadow-lg shadow-[#fa6e43]/25 hover:shadow-[#fa6e43]/40 border-none' 
                            : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                        }`}
                      >
                        Get Started
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Custom plan CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="inline-flex items-center justify-center gap-3 p-1 pl-4 pr-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
              <span className="text-gray-300 text-sm">Need a custom plan for a larger network?</span>
              <button className="bg-white/10 hover:bg-white/20 text-white text-sm font-medium px-4 py-2 rounded-full transition-colors flex items-center gap-2">
                Talk to us <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 relative overflow-hidden">
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
              Why Choose ISP Radius?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
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
                transition={{ delay: index * 0.15, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/10 to-[#fa6e43]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl"></div>

                <div className="relative bg-[#161719]/80 backdrop-blur-sm border border-[#161719] rounded-2xl p-8 group-hover:border-[#fa6e43]/50 transition-all duration-500 h-full">
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

      {/* FAQs Section */}
      <section className="py-24 bg-[#161719]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

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
              <span className="text-[#fa6e43] text-sm font-medium">Support & FAQs</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#c0c0c0] mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about ISP Radius and discover how our platform can seamlessly integrate with your existing infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16"> 

            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-none bg-[#151515] rounded-xl overflow-hidden data-[state=open]:bg-transparent transition-colors duration-300"
                  >
                    <AccordionTrigger className="flex w-full items-center justify-between p-6 hover:no-underline [&>svg]:hidden group">
                      <span className="text-left text-xl font-medium text-gray-400 group-data-[state=open]:text-white transition-colors duration-300 pr-8">
                        {faq.question}
                      </span>
                      <div className="relative w-8 h-8 flex items-center justify-center flex-shrink-0">
                        <span className="absolute w-8 h-[2px] bg-[#fa6e43] transition-all duration-300 -translate-y-1.5 group-data-[state=open]:translate-y-0 group-data-[state=open]:rotate-45 group-data-[state=open]:w-10" />
                        <span className="absolute w-8 h-[2px] bg-[#fa6e43] transition-all duration-300 translate-y-1.5 group-data-[state=open]:translate-y-0 group-data-[state=open]:-rotate-45 group-data-[state=open]:w-10" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-8 pt-0 text-gray-400 text-lg leading-relaxed pr-12">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-[#151515] rounded-3xl overflow-hidden flex flex-col h-full border border-[#222] group">
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src="/images/team-collab.png"
                    alt="Team collaboration"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent"></div>

                  <div className="absolute bottom-4 right-4 w-28 h-28 flex items-center justify-center">
                    <div className="absolute w-10 h-10 bg-[#fa6e43] rounded-full shadow-[0_0_20px_rgba(255,99,71,0.5)]"></div>
                    <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '15s' }} viewBox="0 0 100 100">
                      <path id="textPath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                      <text className="text-[10.5px] font-bold fill-gray-300 uppercase tracking-[0.15em]">
                        <textPath href="#textPath" startOffset="0%">
                          • ISP Radius • 24/7 Support • ISP Radius • 24/7 Support
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-4xl font-semibold text-[#c0c0c0] mb-6 tracking-tight">You still have questions?</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                      Every team's needs are different. Let our experts show you how ISP Radius can work for your specific requirements — let's have a chat and find the right solution for you.
                    </p>
                  </div>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-white text-lg font-medium">Let's have a chat</span>
                    <button className="w-14 h-14 bg-[#fa6e43] rounded-xl flex items-center justify-center hover:bg-[#fa6e43] transition-colors">
                      <ArrowRight className="text-white w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#fa6e43]/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-[#c0c0c0] mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-gray-300 mb-8">
            Start managing your ISP network with ISP Radius today
          </p>
          <Button size="lg" className="bg-[#fa6e43] hover:bg-[#fa6e43] text-white px-12 py-6 text-lg group">
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

      {/* Image Modal */}
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

export default ISPRadius;