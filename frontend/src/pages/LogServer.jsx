import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Check, ArrowRight, Server, Network, Users, Shield, Clock, Search, Database } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { logServerPricing } from '../data/mockData';

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

const LogServer = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const logManagementFeatures = [
    { title: 'Advanced Dashboard & System Monitoring', description: 'Comprehensive overview of server health and logging activities. Monitor CPU, memory, disk usage, and network status.' },
    { title: 'Device & Network Management', description: 'Centralized management of multiple network devices. Register routers, firewalls, NAS devices, and other supported equipment.' },
    { title: 'Subscriber Management for ISPs', description: 'Associate collected logs with individual customers. Investigate incidents and maintain accurate activity records.' },
    { title: 'Multi-Protocol Support', description: 'Built-in support for both TCP and UDP Syslog protocols, allowing flexible integration with virtually any network device.' }
  ];

  const securityFeatures = [
    { title: 'User Management & RBAC', description: 'Create multiple user accounts with customized roles and permissions. Assign specific access rights based on job responsibilities.' },
    { title: 'Activity Logging & Audit Trail', description: 'Maintain detailed records of all user activities. Monitor administrator actions and detect unauthorized changes.' },
    { title: 'Security, Compliance & Data Privacy', description: 'Role-based access control, secure authentication, and license validation. Meet ISO, PCI-DSS, and GDPR standards.' },
    { title: 'Secure Session Management', description: 'Advanced session handling technology that automatically manages timeouts and prevents unauthorized access to the dashboard.' }
  ];

  const storageFeatures = [
    { title: 'Data Compression & Optimization', description: 'Advanced compression mechanisms that minimize storage consumption without compromising data integrity.' },
    { title: 'Automated Backup & Protection', description: 'Flexible backup capabilities protecting against data loss. Configure automatic or manual backups to local or cloud storage.' },
    { title: 'Scalable Architecture', description: 'Process continuously growing log datasets without significant performance degradation as organizational requirements increase.' },
    { title: 'Multiple HDD Attachments', description: 'Easily scale your storage capacity by attaching and configuring multiple hard drives to handle massive log retention.' }
  ];

  const systemFeatures = [
    { title: 'Intelligent Notification & Alert System', description: 'Automated notification system alerting administrators of predefined events or abnormal conditions via email or SMS.' },
    { title: 'Comprehensive Reporting & Data Export', description: 'Generate detailed summaries of network activity and export filtered log data into CSV, Excel, and PDF.' },
    { title: 'Customization & Branding', description: 'Personalize the application with corporate identity. Configure company info, upload custom logos, and change system title.' },
    { title: 'Flexible Data Retention', description: 'Set customized data retention policies to keep your logs for as long as you need without arbitrary limitations.' }
  ];

  const logKeyFeatures = [
    {
      title: 'Centralized Log Collection',
      description: 'SK Syslog Server acts as a centralized logging platform that collects Syslog and tracking logs from multiple network devices into a single secure location. Instead of accessing each router, firewall, switch, or server individually, administrators can monitor all incoming logs through one unified dashboard. This significantly simplifies network management and provides complete visibility across the entire infrastructure.',
      imageName: 'placeholder'
    },
    {
      title: 'High-Speed Search and Filtering',
      description: 'One of the most powerful capabilities of SK Syslog Server is its high-performance search engine, designed to process large volumes of log data within seconds. Administrators can quickly search logs using various parameters such as IP address, MAC address, port number, date, time, severity level, or message content, dramatically reducing the time required for troubleshooting.',
      imageName: 'placeholder'
    },
    {
      title: 'Efficient File-Based Storage System',
      description: 'Unlike traditional log management systems that rely on relational databases, SK Syslog Server stores log files directly within the operating system\'s file system. This approach eliminates database bottlenecks, improves search performance, and allows the system to efficiently handle extremely large datasets while ensuring consistent system performance even as log volumes grow.',
      imageName: 'placeholder'
    },
    {
      title: 'Real-Time Log Monitoring',
      description: 'The software continuously listens for incoming log events and displays them in real time without requiring manual refreshes. Network administrators can instantly observe system activities, security events, configuration changes, and errors as they occur. This real-time monitoring capability enables organizations to identify and respond to critical issues immediately, reducing downtime.',
      imageName: 'placeholder'
    }
  ];

  const faqs = [
    {
      question: 'What is SK Syslog Server?',
      answer: 'SK Syslog Server is a high-performance, centralized log management solution that collects and manages Syslog, tracking logs, and network events from routers, switches, firewalls, NAS devices, Linux/Windows servers, and applications. It supports both TCP and UDP protocols, provides lightning-fast log filtering, data compression, and a modern web-based dashboard for centralized monitoring.'
    },
    {
      question: 'What are the server requirements?',
      answer: 'SK Syslog Server requires Ubuntu Server 22.04 (64-bit). The SSD is used for the operating system, while the HDD is dedicated to log storage.'
    },
    {
      question: 'How is the installation done?',
      answer: 'SK Syslog Server does not provide an installer or ISO file. The SK Radius support team performs the installation remotely on your server to ensure proper setup and configuration.'
    },
    {
      question: 'What devices are supported?',
      answer: 'SK Syslog Server supports virtually any device capable of sending Syslog data, including MikroTik Routers, Cisco Switches, Firewalls, NAS Devices, Linux/Windows Servers, Applications, and any device supporting TCP or UDP Syslog. It also supports custom incoming ports for flexible integration.'
    },
    {
      question: 'Does SK Syslog Server store my business data?',
      answer: 'No. SK Syslog Server is an on-premise solution. All logs remain on your own server, and SK Radius does not store, access, or transfer your business data. This gives you complete ownership and control over your logs.'
    },
    {
      question: 'Is an internet connection required?',
      answer: 'Yes. An internet connection is required for license validation, software updates, and remote technical support. Without internet access, these services will not function properly.'
    },
    {
      question: 'Can I upgrade my plan later?',
      answer: 'Yes. You can upgrade your plan at any time by paying only the price difference between your current plan and the higher-tier plan. There is no need to purchase a new license from scratch.'
    },
    {
      question: 'Can I add my company logo and branding?',
      answer: 'Yes. You can customize the software by uploading your company logo, favicon, and custom system title.'
    }
  ];

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
              ISP Log Server
            </h1>
            <p className="text-2xl text-[#fa6e43] mb-6">
              Advanced Centralized Log Management System
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A powerful, scalable, and high-performance syslog and tracking log server for ISPs and enterprise networks, 
              designed to collect, organize, search, and analyze logs from all network devices.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Search, text: 'Superfast Filtering' },
              { icon: Clock, text: 'Multiple Log Views' },
              { icon: Shield, text: 'Secure Storage' },
              { icon: Database, text: 'Unlimited Retention' }
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
                    <div className="relative overflow-hidden">
                      <motion.img
                        variants={{
                          hidden: { filter: "blur(20px)", scale: 1.05 },
                          visible: { filter: "blur(0px)", scale: 1, transition: { duration: 2, ease: "easeOut" } }
                        }}
                        src="/images/abc-logserver.png"
                        alt="Log Server Dashboard"
                        className="w-full h-auto object-cover opacity-90"
                      />

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
                  <h2 className="text-5xl md:text-6xl font-bold text-[#e3dbd8] mt-16 mb-6 leading-tight">
                    Centralized Log <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#fa6e43]">
                      Management System.
                    </span>
                  </h2>
                </div>

                <div ref={featuresTimelineRef} className="relative mt-8 ml-2">
                  <div className="absolute left-[15px] top-[34px] bottom-[34px] w-0.5 bg-[#161719]" />
                  <motion.div
                    className="absolute left-[15px] top-[34px] bottom-[34px] w-0.5 bg-gradient-to-b from-[#fa6e43] to-[#fa6e43] origin-top"
                    style={{ scaleY: timelineProgress }}
                  />

                  <div className="flex flex-col relative z-10">
                    {[
                      'TCP/UDP log sources',
                      'Filter by MAC, IP, time',
                      'File-system based storage',
                      'Export to CSV, Excel, PDF'
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
                { number: 10, suffix: 'M+', label: 'Logs Processed Daily' },
                { number: 500, suffix: '+', label: 'Active Deployments' },
                { number: 99, suffix: '.9%', label: 'System Uptime' }
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
      <section className="py-24 relative overflow-hidden bg-[#161719]">
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
              className="inline-flex items-center px-4 py-1.5 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-full mb-6"
            >
              <span className="text-[#fa6e43] text-sm font-semibold tracking-wide uppercase">Software Interface</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#c0c0c0] mb-6 tracking-tight">
              Software Screenshots
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Take a closer look at the powerful and intuitive dashboard designed for seamless log management.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="relative group rounded-xl overflow-hidden border border-[#161719] bg-[#161719] aspect-video flex items-center justify-center cursor-pointer shadow-lg hover:border-[#fa6e43]/40 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#fa6e43]/10 to-transparent opacity-0 group-hover:opacity-100 blur-md transition duration-500 z-10"></div>
                <span className="text-gray-600 text-sm font-medium tracking-wider uppercase relative z-20 group-hover:text-[#fa6e43]/80 transition-colors">Screenshot {index + 1}</span>
              </motion.div>
            ))}
          </div>
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
              Powerful capabilities designed to help ISP businesses scale efficiently with log management and centralized control
            </p>
          </motion.div>

          <div className="space-y-40">
            {logKeyFeatures.map((feature, index) => {
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
                        <div className="w-[380px] h-[260px] bg-[#161719] rounded-xl flex items-center justify-center border border-[#333] shadow-lg group-hover:border-[#fa6e43]/30 transition-colors">
                          <span className="text-gray-500 text-sm font-medium tracking-widest uppercase">Screenshot Placeholder</span>
                        </div>
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
              Explore the advanced features specifically designed to help ISP operators manage logs with unprecedented ease.
            </p>
          </motion.div>

          <Tabs defaultValue="management" className="w-full">
            <TabsList className="flex flex-wrap justify-center gap-2 p-1.5 mb-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md max-w-fit mx-auto h-auto">
              <TabsTrigger value="management" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">Log Management</TabsTrigger>
              <TabsTrigger value="security" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">Security & Permissions</TabsTrigger>
              <TabsTrigger value="storage" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">Backup & Storage</TabsTrigger>
              <TabsTrigger value="system" className="rounded-xl px-6 py-3 text-sm md:text-base font-medium text-gray-400 data-[state=active]:bg-[#fa6e43] data-[state=active]:text-white data-[state=active]:shadow-[0_0_20px_rgba(255,99,71,0.4)] transition-all duration-300">System & Reporting</TabsTrigger>
            </TabsList>

            {Object.entries({
              management: { data: logManagementFeatures, icon: Network },
              security: { data: securityFeatures, icon: Shield },
              storage: { data: storageFeatures, icon: Server },
              system: { data: systemFeatures, icon: Search }
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
              Simple, transparent pricing for log management across small to large ISP networks
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {logServerPricing.map((plan, index) => {
              const isPopular = plan.badge === 'Best Choice' || plan.name === 'STANDARD';

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative group h-full flex"
                >
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
                      <p className="text-sm text-gray-400 h-10">{plan.support}</p>
                    </div>

                    <div className="mb-8 flex-grow-0">
                      <div className="flex items-end gap-1">
                        <span className="text-3xl font-medium text-gray-400 mb-1">$</span>
                        <span className={`font-bold tracking-tight ${isPopular ? 'text-white' : 'text-gray-100'}`} style={{ fontSize: '3.5rem', lineHeight: 1 }}>
                          {plan.initialPrice}
                        </span>
                        <span className="text-gray-400 mb-2 ml-1">
                          Initial
                        </span>
                      </div>
                      <div className="mt-2 text-sm text-gray-400">
                        Yearly Fee: <span className="text-[#fa6e43] font-semibold">${plan.yearlyFee}</span>
                      </div>
                    </div>

                    <div className="flex-grow space-y-4 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#fa6e43]" />
                        </div>
                        <span className="text-gray-300">Unlimited Users & Data</span>
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
                        <span className="text-gray-300">{plan.storage}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                          <Check className="w-3 h-3 text-[#fa6e43]" />
                        </div>
                        <span className="text-gray-300"><strong className="text-white">{plan.freeService}</strong> Free Service</span>
                      </div>
                      {plan.features && plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#fa6e43]/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-[#fa6e43]" />
                          </div>
                          <span className="text-gray-300">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full py-6 text-lg font-semibold rounded-xl transition-all duration-300 ${
                        isPopular 
                          ? 'bg-[#fa6e43] hover:bg-[#fa6e43] text-white shadow-lg shadow-[#fa6e43]/25 hover:shadow-[#fa6e43]/40 border-none' 
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                      }`}
                    >
                      Get Started
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Server Requirements */}
      <section className="py-20 bg-[#161719]/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#c0c0c0] mb-4">Server Requirements</h2>
            <p className="text-gray-300">Minimum requirements to run the log server reliably</p>
          </motion.div>

          <div className="overflow-x-auto rounded-xl border border-[#161719] bg-[#161719]/50">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#2a2a2a] bg-[#161719]/50">
                  <th className="py-5 px-6 text-white font-semibold">Plan</th>
                  <th className="py-5 px-6 text-white font-semibold">OS</th>
                  <th className="py-5 px-6 text-white font-semibold">CPU</th>
                  <th className="py-5 px-6 text-white font-semibold">RAM</th>
                  <th className="py-5 px-6 text-white font-semibold">SSD</th>
                  <th className="py-5 px-6 text-white font-semibold">HDD</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { plan: 'Starter', os: 'Ubuntu 22.04 64-bit', cpu: '2 Cores', ram: '4 GB', ssd: '50 GB', hdd: '1 TB' },
                  { plan: 'Standard', os: 'Ubuntu 22.04 64-bit', cpu: '4 Cores', ram: '8 GB', ssd: '100 GB', hdd: '2 TB' },
                  { plan: 'Professional', os: 'Ubuntu 22.04 64-bit', cpu: '6 Cores', ram: '16 GB', ssd: '100 GB', hdd: '4 TB' }
                ].map((req, index) => (
                  <tr key={index} className="border-b border-[#161719] hover:bg-[#161719]/30 transition-colors">
                    <td className="py-5 px-6 text-white font-medium">{req.plan}</td>
                    <td className="py-5 px-6 text-gray-400 text-sm">{req.os}</td>
                    <td className="py-5 px-6 text-gray-400 text-sm">{req.cpu}</td>
                    <td className="py-5 px-6 text-gray-400 text-sm">{req.ram}</td>
                    <td className="py-5 px-6 text-gray-400 text-sm">{req.ssd}</td>
                    <td className="py-5 px-6 text-gray-400 text-sm">{req.hdd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
              Find answers to common questions about SK Syslog Server and discover how our platform can seamlessly integrate with your existing infrastructure.
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
                          • SK Radius • 24/7 Support • SK Radius • 24/7 Support
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-4xl font-semibold text-[#c0c0c0] mb-6 tracking-tight">You still have questions?</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                      Every team's needs are different. Let our experts show you how SK Syslog Server can work for your specific requirements — let's have a chat and find the right solution for you.
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
          <h2 className="text-4xl font-bold text-[#c0c0c0] mb-6">Start Monitoring Your Logs</h2>
          <p className="text-lg text-gray-300 mb-8">
            Request a demo or free trial with installation and onboarding support
          </p>
          <Button size="lg" className="bg-[#fa6e43] hover:bg-[#fa6e43] text-white px-12 py-6 text-lg group border-none">
            Request Demo
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LogServer;