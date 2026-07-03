import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Server, Shield, Zap, Globe, Activity, Settings, Network,
  Wifi, Cpu, Lock, Terminal, RefreshCw, BarChart, ArrowRight,
  Database, AlertTriangle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';

// --- DATA ---
const bentoFeatures = [
  {
    title: "Zero-Touch Provisioning",
    description: "Automate CPE deployment with instant PPPoE & WiFi configs upon connection.",
    icon: Zap,
    colSpan: "md:col-span-2",
    bg: "from-[#fa6e43]/10 to-[#fa6e43]/5"
  },
  {
    title: "Live Diagnostics",
    description: "Run Ping, Trace Route, and Speed Tests directly from the dashboard.",
    icon: Activity,
    colSpan: "md:col-span-1",
    bg: "from-white/5 to-white/0"
  },
  {
    title: "Optical Telemetry",
    description: "Monitor Rx/Tx power levels and CPU/Memory usage in real-time.",
    icon: BarChart,
    colSpan: "md:col-span-1",
    bg: "from-white/5 to-white/0"
  },
  {
    title: "Mass Firmware Upgrades",
    description: "Schedule bulk firmware pushes across thousands of devices during maintenance windows.",
    icon: RefreshCw,
    colSpan: "md:col-span-2",
    bg: "from-[#fa6e43]/10 to-[#fa6e43]/5"
  }
];

const stickyFeatures = [
  {
    id: "management",
    title: "Device Management & Configs",
    description: "Full control over every router and ONT on your network. Manage TR-069 configs, push WAN templates, and modify WiFi SSIDs/passwords instantly.",
    items: ["TR-069 Global Configs", "Individual Router Configs", "WAN Connection Setup", "2.4GHz & 5GHz WiFi Control"]
  },
  {
    id: "diagnostics",
    title: "Real-Time Diagnostics",
    description: "Resolve support calls in seconds without field technicians. Execute live network tests directly from the customer's CPE.",
    items: ["Live Ping & Trace Route", "Remote Speed Tests", "Connected Devices List", "Optical Rx/Tx Power Alerts"]
  },
  {
    id: "telemetry",
    title: "Telemetry & Advanced Monitoring",
    description: "Keep a pulse on hardware health. Track essential metrics to proactively identify failing devices before they drop offline.",
    items: ["CPU & Memory Usage Graphs", "Real-Time WAN Statistics", "Device Uptime Tracking", "Temperature & Voltage Monitoring"]
  },
  {
    id: "operations",
    title: "Auditing & Bulk Operations",
    description: "Enterprise-grade accountability and mass management tools designed for NOCs and large support teams.",
    items: ["Mass Task Queues", "Fault Logging & Error Tracking", "Staff Operation Auditing", "Role-Based Access Control"]
  }
];

// --- COMPONENTS ---
const FloatingChip = ({ text, icon: Icon, delay, top, left, right, bottom }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.8 }}
      className={`absolute ${top} ${left} ${right} ${bottom} z-20`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay }}
        className="flex items-center gap-2 bg-[#161719]/90 border border-white/10 backdrop-blur-md px-4 py-2 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-gray-200">{text}</span>
      </motion.div>
    </motion.div>
  );
};

const AnimatedStat = ({ target, suffix = "", prefix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const start = Date.now();
    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(target * easeOut));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

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

export default function TR069Premium() {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);
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

  const dashboardRef = useRef(null);
  const { scrollYProgress: dashboardScroll } = useScroll({
    target: dashboardRef,
    offset: ["start end", "center center"]
  });

  const dashboardRotateX = useTransform(dashboardScroll, [0, 1], [40, 0]);
  const dashboardScale = useTransform(dashboardScroll, [0, 1], [0.85, 1]);
  const dashboardOpacity = useTransform(dashboardScroll, [0, 1], [0.3, 1]);
  const dashboardY = useTransform(dashboardScroll, [0, 1], [150, 0]);

  // Scroll logic for the sticky section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.feature-section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-gray-200 selection:bg-[#fa6e43]/30 font-sans">

      {/* 1. COMMAND CENTER HERO */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden pt-20 pb-10">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fa6e43]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-[#e3dbd8] mb-6">
              TR-069 ACS
            </h1>
            <p className="text-2xl text-[#fa6e43] mb-6">
              Intelligent Device Management & Auto-Provisioning
            </p>
            <p className="text-lg text-gray-300 max-w-4xl mx-auto">
              A scalable, secure, and fully integrated solution for managing ISP router configurations, remote diagnostics, and firmware upgrades.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { icon: Zap, text: 'Zero-Touch Provisioning' },
              { icon: Activity, text: 'Real-Time Diagnostics' },
              { icon: Server, text: 'Mass Firmware Updates' },
              { icon: Shield, text: 'Enterprise Security' }
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
                        src="/images/tr-069.png"
                        alt="TR-069 Dashboard"
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
                className="space-y-8 pl-4 lg:pl-8"
              >
                <div>
                  <h2 className="text-[#e3dbd8] text-5xl md:text-6xl font-bold mt-16 mb-6 leading-tight">
                    <span className="block md:whitespace-nowrap">Remote Device Management</span>
                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#fa6e43]">
                      Built for Modern ISPs.
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
                      'Zero-Touch Provisioning',
                      'Real-Time Diagnostics',
                      'Firmware Updates',
                      'Router Configurations'
                    ].map((feature, idx) => (
                      <TimelineFeature key={idx} feature={feature} index={idx} progress={timelineProgress} />
                    ))}
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* 1.5 TRUST METRICS STATS */}
      <section className="py-20 bg-[#050505] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-[#fa6e43] mb-2">
                <AnimatedStat target={120} suffix="K+" />
              </div>
              <div className="text-gray-400 font-medium">Devices Managed</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-[#fa6e43] mb-2">
                <AnimatedStat target={98} suffix="%" />
              </div>
              <div className="text-gray-400 font-medium">Provision Success</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-[#fa6e43] mb-2">
                <AnimatedStat target={99} suffix=".9%" />
              </div>
              <div className="text-gray-400 font-medium">ACS Availability</div>
            </div>
            <div className="text-center px-4">
              <div className="text-4xl md:text-5xl font-extrabold text-[#fa6e43] mb-2">
                <AnimatedStat target={24} suffix="x7" />
              </div>
              <div className="text-gray-400 font-medium">Monitoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BENTO BOX GRID */}
      <section className="py-32 relative z-10 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Core Capabilities</h2>
            <p className="text-gray-400 text-lg max-w-2xl">Enterprise-grade tools built into the core of SK Radius.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bentoFeatures.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className={`relative group rounded-3xl border border-white/10 p-8 overflow-hidden ${feature.colSpan} bg-gradient-to-br ${feature.bg} hover:border-white/20 transition-colors`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                  <feature.icon className="w-32 h-32 text-white" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-between min-h-[200px]">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    <feature.icon className="w-6 h-6 text-[#fa6e43]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-3">{feature.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL FUNCTIONALITIES */}
      <section className="relative bg-[#0a0a0a] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 py-20 relative">

            {/* Left Side: Scrolling Text Features */}
            <div className="w-full lg:w-1/2 py-[30vh]">
              {stickyFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`feature-section min-h-[60vh] flex flex-col justify-center transition-opacity duration-500 ${activeSection === index ? 'opacity-100' : 'opacity-20'}`}
                >
                  <div className="inline-flex w-12 h-12 rounded-2xl bg-[#fa6e43]/10 border border-[#fa6e43]/20 items-center justify-center mb-6 text-[#fa6e43] font-bold text-xl">
                    0{index + 1}
                  </div>
                  <h3 className="text-4xl font-bold text-white mb-6 leading-tight">{feature.title}</h3>
                  <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                    {feature.description}
                  </p>
                  <ul className="space-y-4">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <CheckCircle2 className="w-5 h-5 text-[#fa6e43]" />
                        <span className="text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Right Side: Sticky Visuals */}
            <div className="hidden lg:block w-1/2 relative">
              <div className="sticky top-[20vh] h-[60vh] w-full rounded-3xl border border-white/10 bg-[#161719] shadow-2xl overflow-hidden flex items-center justify-center p-8">

                {/* Dynamic Content based on scroll */}
                <AnimatePresence mode="wait">
                  {activeSection === 0 && (
                    <motion.div key="0" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full flex flex-col gap-4">
                      <div className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-4">Router Configuration</div>
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-gray-400">WAN Mode</span><span className="text-white font-medium">PPPoE</span></div>
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-gray-400">2.4GHz SSID</span><span className="text-white font-medium">Home_Network_2G</span></div>
                      <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5"><span className="text-gray-400">5GHz SSID</span><span className="text-white font-medium">Home_Network_5G</span></div>
                      <div className="mt-auto pt-4 flex justify-end"><Button className="bg-[#fa6e43] hover:bg-[#fa6e43]/90 text-white">Push Config</Button></div>
                    </motion.div>
                  )}
                  {activeSection === 1 && (
                    <motion.div key="1" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full flex flex-col gap-4">
                      <div className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-4">Live Diagnostics</div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 aspect-square"><Activity className="w-8 h-8 text-[#fa6e43]" /> <span className="font-medium text-white">Ping Test</span></div>
                        <div className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-2 aspect-square"><Network className="w-8 h-8 text-[#fa6e43]" /> <span className="font-medium text-white">Trace Route</span></div>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl mt-4 border border-white/5 font-mono text-sm text-green-400 h-32 overflow-hidden flex items-end">
                        &gt; Pinging 8.8.8.8 with 32 bytes of data:<br />
                        Reply from 8.8.8.8: bytes=32 time=14ms TTL=117<br />
                        Reply from 8.8.8.8: bytes=32 time=13ms TTL=117<br />
                        Success.
                      </div>
                    </motion.div>
                  )}
                  {activeSection === 2 && (
                    <motion.div key="2" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full flex flex-col gap-4">
                      <div className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-4">Hardware Telemetry</div>
                      <div className="flex items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/5">
                        <Cpu className="w-10 h-10 text-gray-400" />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">CPU Usage</span><span className="text-white">24%</span></div>
                          <div className="w-full h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-[#fa6e43] w-[24%]" /></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 bg-white/5 p-6 rounded-xl border border-white/5">
                        <Database className="w-10 h-10 text-gray-400" />
                        <div className="flex-1">
                          <div className="flex justify-between text-sm mb-2"><span className="text-gray-400">Memory Usage</span><span className="text-white">68%</span></div>
                          <div className="w-full h-2 bg-black rounded-full overflow-hidden"><div className="h-full bg-yellow-500 w-[68%]" /></div>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between px-4 py-3 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-xl text-[#fa6e43] text-sm">
                        <span>Optical Rx Power</span>
                        <span className="font-bold">-21.5 dBm (Good)</span>
                      </div>
                    </motion.div>
                  )}
                  {activeSection === 3 && (
                    <motion.div key="3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="w-full h-full flex flex-col gap-4">
                      <div className="text-xl font-bold text-white border-b border-white/10 pb-4 mb-4">Operation Logs</div>
                      <div className="flex flex-col gap-2">
                        {[
                          { action: "Firmware Push", user: "Admin", status: "Success", time: "2m ago" },
                          { action: "Reboot Device", user: "Support_John", status: "Success", time: "15m ago" },
                          { action: "WiFi Password Change", user: "Support_Sarah", status: "Success", time: "1h ago" },
                          { action: "Mass Task Queue", user: "System", status: "Processing", time: "2h ago" },
                        ].map((log, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-lg text-sm">
                            <div>
                              <div className="text-white font-medium">{log.action}</div>
                              <div className="text-gray-500 text-xs">{log.user}</div>
                            </div>
                            <div className="text-right">
                              <div className={log.status === 'Success' ? 'text-green-400' : 'text-yellow-400'}>{log.status}</div>
                              <div className="text-gray-500 text-xs">{log.time}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Subtle Background Glow inside sticky box */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#fa6e43]/10 blur-[80px] pointer-events-none" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 relative overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#fa6e43]/10 via-transparent to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-[#161719]/80 border border-white/10 rounded-[3rem] p-12 md:p-20 backdrop-blur-sm"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
              Ready to Upgrade Your Network?
            </h2>
            <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              Reduce truck rolls, improve customer satisfaction, and gain absolute control over every device.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button className="bg-[#fa6e43] hover:bg-[#fa6e43]/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-[#fa6e43]/20">
                Schedule a Demo <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
