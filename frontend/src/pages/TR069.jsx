import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import {
  Server, Shield, Zap, Globe, Activity, Settings, Network,
  Wifi, Cpu, Lock, Terminal, RefreshCw, BarChart, ArrowRight,
  Database, AlertTriangle, CheckCircle2, ChevronRight
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';

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
    <div className="bg-[#161719] min-h-screen text-gray-200 selection:bg-[#fa6e43]/30 font-sans">

      {/* 1. COMMAND CENTER HERO */}
      <section className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden pt-20 pb-10">
        {/* Background Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#fa6e43]/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
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
                  <h2 className="text-[#e3dbd8] text-5xl md:text-5xl font-bold mt-16 mb-6 leading-tight">
                    Remote Device Management <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-[#fa6e43]">
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
      <section className="py-2 bg-[#161719] border-t border-white/5 relative z-10">
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

      {/* ROUTER CONFIGURATION SECTION */}
      {(() => {
        const RouterConfigSection = () => {
          const [activeConfigTab, setActiveConfigTab] = React.useState('wifi');
          const [applySuccess, setApplySuccess] = React.useState(false);
          const [openAccordion, setOpenAccordion] = React.useState(null);

          const handleApply = () => {
            setApplySuccess(true);
            setTimeout(() => setApplySuccess(false), 2000);
          };

          const configTabs = [
            { id: 'wifi', label: 'WiFi', icon: Wifi },
            { id: 'wan', label: 'WAN', icon: Globe },
            { id: 'devices', label: 'Devices', icon: Network },
            { id: 'speedtest', label: 'Speed Test', icon: Activity },
          ];

          const rightContent = {
            wifi: {
              icon: Wifi,
              title: 'Remote WiFi Configuration',
              summary: 'Instantly reconfigure every router\'s wireless settings from the ACS console — no truck roll required.',
              features: ['Change SSID remotely', 'Reset WiFi passwords', 'Enable Guest Network', 'Configure channels & bands', 'Adjust transmit power', 'Disable WPS', 'Hide SSID', 'WiFi scheduling'],
            },
            wan: {
              icon: Globe,
              title: 'WAN & Internet Configuration',
              summary: 'Push WAN parameters to CPE devices the moment a subscriber is provisioned or a plan is changed.',
              features: ['PPPoE auto-provisioning', 'DHCP / Static IP support', 'VLAN tagging', 'DNS assignment', 'Gateway configuration', 'IPv6 support', 'MTU adjustment', 'WAN failover'],
            },
            devices: {
              icon: Network,
              title: 'Connected Devices & MAC Control',
              summary: 'See every device on the subscriber\'s network in real-time. Block, allow, or filter by MAC address instantly.',
              features: ['Live connected device list', 'MAC address filtering', 'Block/Allow device instantly', 'Whitelist & blacklist rules', 'Device name identification', 'Traffic per device', 'Kick device remotely', 'Guest device isolation'],
            },
            speedtest: {
              icon: Activity,
              title: 'Remote Speed Test',
              summary: 'Trigger real-time download, upload, and latency tests directly on the subscriber\'s CPE device — diagnose connection issues without a site visit.',
              features: ['Remote download speed test', 'Upload speed measurement', 'Latency & jitter analysis', 'Packet loss detection', 'Historical speed logs', 'Per-device test history', 'ISP SLA verification', 'Scheduled auto-tests'],
            },
          };

          const accordionData = [
            {
              id: 'wifi-acc',
              icon: Wifi,
              title: 'WiFi Management',
              features: ['SSID Management', 'Password Updates', 'Guest WiFi', 'Hidden SSID', 'WPS Control', 'Channel Selection', 'Bandwidth', 'Transmit Power', 'Dual Band', 'WiFi Scheduling'],
            },
            {
              id: 'wan-acc',
              icon: Globe,
              title: 'WAN Management',
              features: ['PPPoE', 'DHCP', 'Static IP', 'DNS', 'VLAN', 'Gateway', 'MTU', 'IPv6', 'WAN Failover'],
            },
            {
              id: 'devices-acc',
              icon: Network,
              title: 'Devices & MAC Filtering',
              features: ['Connected Devices', 'MAC Whitelist', 'MAC Blacklist', 'Device Blocking', 'Traffic Monitoring', 'Guest Isolation', 'Device Naming', 'Kick Device'],
            },
            {
              id: 'speedtest-acc',
              icon: Activity,
              title: 'Speed Test',
              features: ['Download Speed', 'Upload Speed', 'Latency (Ping)', 'Jitter', 'Packet Loss', 'Test Scheduling', 'Historical Logs', 'SLA Verification'],
            },
          ];

          const ToggleSwitch = ({ on }) => (
            <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${on ? 'bg-[#fa6e43]' : 'bg-white/10'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${on ? 'left-6' : 'left-1'}`} />
            </div>
          );

          const FieldRow = ({ label, value, type = 'text' }) => (
            <div className="flex items-center justify-between py-2.5 border-b border-white/5">
              <span className="text-gray-400 text-sm">{label}</span>
              {type === 'toggle' ? (
                <ToggleSwitch on={value} />
              ) : type === 'select' ? (
                <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm text-gray-200">
                  {value} <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
                </div>
              ) : type === 'link' ? (
                <span className="text-[#fa6e43] text-sm cursor-pointer hover:underline">{value}</span>
              ) : (
                <span className="text-gray-200 text-sm font-mono">{value}</span>
              )}
            </div>
          );

          const wifiContent = (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <Wifi className="w-4 h-4 text-[#fa6e43]" />
                <span className="text-white font-semibold text-sm">WiFi Settings</span>
              </div>
              <div className="mb-3">
                <label className="text-gray-500 text-xs mb-1 block">SSID</label>
                <input defaultValue="WavesNet_5G" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-[#fa6e43]/50" />
              </div>
              <div className="mb-3">
                <label className="text-gray-500 text-xs mb-1 block">Password</label>
                <input type="password" defaultValue="password123" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-[#fa6e43]/50" />
              </div>
              <div className="mb-2">
                <label className="text-gray-500 text-xs mb-1 block">Band</label>
                <div className="flex gap-3 text-sm">
                  {['Dual Band', '2.4GHz', '5GHz'].map((b, i) => (
                    <label key={b} className="flex items-center gap-1.5 cursor-pointer">
                      <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${i === 0 ? 'border-[#fa6e43]' : 'border-white/20'}`}>
                        {i === 0 && <div className="w-1.5 h-1.5 rounded-full bg-[#fa6e43]" />}
                      </div>
                      <span className={i === 0 ? 'text-gray-200' : 'text-gray-500'}>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
              <FieldRow label="Channel" value="Auto" type="select" />
              <FieldRow label="Bandwidth" value="80 MHz" type="select" />
              <FieldRow label="Guest WiFi" value={true} type="toggle" />
              <FieldRow label="Hide SSID" value={false} type="toggle" />
              <FieldRow label="WPS" value={false} type="toggle" />
              <FieldRow label="Transmit Power" value="High" type="select" />
            </div>
          );

          const wanContent = (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-4">
                <Globe className="w-4 h-4 text-[#fa6e43]" />
                <span className="text-white font-semibold text-sm">WAN Configuration</span>
              </div>
              <div className="mb-3">
                <label className="text-gray-500 text-xs mb-1 block">Connection Type</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-3 py-2">
                  <span className="text-gray-200 text-sm">PPPoE</span>
                  <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
                </div>
              </div>
              <div className="mb-3">
                <label className="text-gray-500 text-xs mb-1 block">Username</label>
                <input defaultValue="user@isp.net" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-[#fa6e43]/50" />
              </div>
              <div className="mb-2">
                <label className="text-gray-500 text-xs mb-1 block">Password</label>
                <input type="password" defaultValue="pppoepass" className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-gray-200 text-sm focus:outline-none focus:border-[#fa6e43]/50" />
              </div>
              <FieldRow label="VLAN ID" value="100" />
              <FieldRow label="Primary DNS" value="8.8.8.8" />
              <FieldRow label="Secondary DNS" value="1.1.1.1" />
              <FieldRow label="Gateway" value="Auto Detect" />
              <FieldRow label="MTU" value="1492" />
              <FieldRow label="IPv6" value={true} type="toggle" />
            </div>
          );

          const devicesContent = (
            <div className="space-y-1">
              <div className="flex items-center gap-2 mb-3">
                <Network className="w-4 h-4 text-[#fa6e43]" />
                <span className="text-white font-semibold text-sm">Connected Devices</span>
                <span className="ml-auto text-xs bg-[#fa6e43]/20 text-[#fa6e43] px-2 py-0.5 rounded-full">4 Online</span>
              </div>
              {[
                { name: 'iPhone 14 Pro', mac: 'A4:C3:F0:12:XX', ip: '192.168.1.101', allowed: true },
                { name: 'Samsung TV', mac: 'B8:27:EB:DE:XX', ip: '192.168.1.102', allowed: true },
                { name: 'Unknown Device', mac: 'DE:AD:BE:EF:XX', ip: '192.168.1.115', allowed: false },
                { name: 'MacBook Pro', mac: '3C:22:FB:47:XX', ip: '192.168.1.103', allowed: true },
              ].map((device, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                  <div>
                    <div className={`text-sm font-medium ${device.allowed ? 'text-gray-200' : 'text-red-400'}`}>{device.name}</div>
                    <div className="text-xs text-gray-500 font-mono">{device.mac}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">{device.ip}</span>
                    <div className={`w-2 h-2 rounded-full ${device.allowed ? 'bg-green-500' : 'bg-red-500'}`} />
                  </div>
                </div>
              ))}
              <div className="mt-3 pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="w-3.5 h-3.5 text-[#fa6e43]" />
                  <span className="text-white text-xs font-semibold">MAC Filtering</span>
                  <ToggleSwitch on={true} />
                </div>
                <FieldRow label="Filter Mode" value="Whitelist" type="select" />
              </div>
            </div>
          );

          const SpeedTestContent = () => {
            const [running, setRunning] = React.useState(false);
            const [done, setDone] = React.useState(false);
            const [progress, setProgress] = React.useState(0);
            const [results, setResults] = React.useState({ down: 0, up: 0, ping: 0 });

            const runTest = () => {
              setRunning(true);
              setDone(false);
              setProgress(0);
              setResults({ down: 0, up: 0, ping: 0 });
              let p = 0;
              const interval = setInterval(() => {
                p += 4;
                setProgress(Math.min(p, 100));
                if (p >= 100) {
                  clearInterval(interval);
                  setResults({ down: 94.3, up: 47.8, ping: 12 });
                  setRunning(false);
                  setDone(true);
                }
              }, 80);
            };

            return (
              <div className="space-y-3">
                <div className="flex items-center gap-2 mb-3">
                  <Activity className="w-4 h-4 text-[#fa6e43]" />
                  <span className="text-white font-semibold text-sm">Speed Test</span>
                  <span className="ml-auto text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-400">CPE-00:1A:2B</span>
                </div>

                {/* Progress bar */}
                <div className="relative h-2 bg-white/5 rounded-full overflow-hidden mb-4">
                  <motion.div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#fa6e43] to-orange-300 rounded-full"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                {/* Results */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[
                    { label: 'Download', value: done ? `${results.down}` : '—', unit: 'Mbps', color: 'text-blue-400' },
                    { label: 'Upload', value: done ? `${results.up}` : '—', unit: 'Mbps', color: 'text-green-400' },
                    { label: 'Ping', value: done ? `${results.ping}` : '—', unit: 'ms', color: 'text-yellow-400' },
                  ].map(stat => (
                    <div key={stat.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                      <div className={`text-xl font-bold ${stat.color}`}>{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.unit}</div>
                      <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <FieldRow label="Test Server" value="Auto (Nearest)" type="select" />
                <FieldRow label="Protocol" value="TCP" type="select" />
                <FieldRow label="Scheduled Tests" value={true} type="toggle" />
                <FieldRow label="Last Test" value={done ? 'Just now' : '2h ago'} />

                <button
                  onClick={runTest}
                  disabled={running}
                  className={`w-full mt-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    running
                      ? 'bg-[#fa6e43]/20 border border-[#fa6e43]/30 text-[#fa6e43] cursor-not-allowed'
                      : 'bg-[#fa6e43]/15 border border-[#fa6e43]/30 text-[#fa6e43] hover:bg-[#fa6e43]/25'
                  }`}
                >
                  <Activity className={`w-4 h-4 ${running ? 'animate-pulse' : ''}`} />
                  {running ? `Testing... ${progress}%` : done ? 'Run Again' : 'Run Speed Test'}
                </button>
              </div>
            );
          };
          const speedtestContent = <SpeedTestContent />;

          const tabContent = { wifi: wifiContent, wan: wanContent, devices: devicesContent, speedtest: speedtestContent };
          const active = rightContent[activeConfigTab];

          return (
            <section className="py-24 bg-[#161719] border-t border-white/5 relative z-10 overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-[#fa6e43]/5 rounded-full blur-[120px] pointer-events-none" />

              <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-20"
                >
                  <div className="inline-flex items-center px-4 py-1.5 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-full mb-5">
                    <Settings className="w-3.5 h-3.5 text-[#fa6e43] mr-2" />
                    <span className="text-[#fa6e43] text-sm font-medium">TR-069 ACS Feature</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#c0c0c0] mb-5">Configure Every Router <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-orange-300">Remotely</span></h2>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Manage WiFi, WAN, connected devices, and security settings remotely from a centralized ACS platform. Push configurations instantly to one device or thousands without on-site visits.
                  </p>
                </motion.div>

                {/* Main Grid: Left Panel + Right Explanation */}
                <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-10 items-start mb-16">

                  {/* LEFT — Interactive Config Panel */}
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className={`rounded-3xl border ${applySuccess ? 'border-green-500/50' : 'border-white/10'} bg-[#151515] shadow-[0_0_60px_rgba(250,110,67,0.06)] transition-all duration-500 overflow-hidden`}>
                      {/* Panel Header */}
                      <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                        <div>
                          <div className="text-white font-semibold text-sm">Configure Router</div>
                          <div className="text-gray-500 text-xs mt-0.5 font-mono">CPE-00:1A:2B:3C:4D</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-gray-400">Connected</span>
                          </div>
                          <div className="text-xs bg-white/5 border border-white/10 px-2 py-0.5 rounded-full text-gray-400">TR-069 v2</div>
                        </div>
                      </div>

                      {/* Tab Bar */}
                      <div className="flex border-b border-white/10">
                        {configTabs.map(tab => (
                          <button
                            key={tab.id}
                            onClick={() => setActiveConfigTab(tab.id)}
                            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-all duration-200 relative ${activeConfigTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
                          >
                            <tab.icon className="w-3.5 h-3.5" />
                            {tab.label}
                            {activeConfigTab === tab.id && (
                              <motion.div layoutId="tabIndicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#fa6e43]" />
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Tab Content — Screenshot */}
                      <div className="relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeConfigTab}
                            initial={{ opacity: 0, scale: 0.98, y: 8 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -8 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <img
                              src={{
                                wifi: '/images/wifi.png',
                                wan: '/images/wlan.png',
                                devices: '/images/devices.png',
                                speedtest: '/images/speed-test.png',
                              }[activeConfigTab]}
                              alt={`${activeConfigTab} configuration screenshot`}
                              className="w-full h-auto object-cover object-top block"
                              style={{ maxHeight: '480px', objectFit: 'cover', objectPosition: 'top' }}
                            />
                          </motion.div>
                        </AnimatePresence>

                      </div>

                      {/* Apply Button */}
                      <div className="px-5 pb-5">
                        <button
                          onClick={handleApply}
                          className={`w-full py-3 rounded-2xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${applySuccess ? 'bg-green-500/20 border border-green-500/40 text-green-400' : 'bg-[#fa6e43] hover:bg-[#fa6e43]/90 text-white shadow-lg shadow-[#fa6e43]/20'}`}
                        >
                          {applySuccess ? (
                            <><CheckCircle2 className="w-4 h-4" /> Configuration Applied!</>
                          ) : (
                            <><Terminal className="w-4 h-4" /> Apply Configuration</>
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* RIGHT — Feature Explanation */}
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="lg:pl-6"
                  >
                    {/* Sync tabs */}
                    <div className="flex gap-2 mb-8 flex-wrap">
                      {configTabs.map(tab => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveConfigTab(tab.id)}
                          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 ${activeConfigTab === tab.id ? 'bg-[#fa6e43]/20 border-[#fa6e43]/40 text-[#fa6e43]' : 'bg-white/5 border-white/10 text-gray-500 hover:text-gray-300'}`}
                        >
                          <tab.icon className="w-3 h-3" />
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeConfigTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                      >
                        {/* Icon */}
                        <div className="w-16 h-16 rounded-2xl bg-[#fa6e43]/10 border border-[#fa6e43]/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(250,110,67,0.15)]">
                          <active.icon className="w-8 h-8 text-[#fa6e43]" />
                        </div>

                        <h3 className="text-3xl font-bold text-[#c0c0c0] mb-3">{active.title}</h3>
                        <p className="text-gray-400 leading-relaxed mb-8 text-base">{active.summary}</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {active.features.map((feat, i) => (
                            <motion.div
                              key={feat}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-center gap-3"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#fa6e43] flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feat}</span>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* ACCORDION GRID */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h3 className="text-xl font-bold text-[#c0c0c0] mb-6 text-center">Expandable Feature Reference</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {accordionData.map((item) => (
                      <div key={item.id} className="rounded-2xl border border-white/10 bg-[#151515] overflow-hidden">
                        <button
                          onClick={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
                          className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-[#fa6e43]/10 border border-[#fa6e43]/20 flex items-center justify-center">
                              <item.icon className="w-4 h-4 text-[#fa6e43]" />
                            </div>
                            <span className="text-white font-medium">{item.title}</span>
                          </div>
                          <motion.div animate={{ rotate: openAccordion === item.id ? 90 : 0 }} transition={{ duration: 0.2 }}>
                            <ChevronRight className="w-4 h-4 text-gray-400" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {openAccordion === item.id && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-6 pb-5 flex flex-wrap gap-2 border-t border-white/5 pt-4">
                                {item.features.map(f => (
                                  <span key={f} className="bg-white/5 border border-white/10 hover:border-[#fa6e43]/30 transition-colors text-gray-300 text-xs px-3 py-1.5 rounded-full">
                                    {f}
                                  </span>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </section>
          );
        };
        return <RouterConfigSection />;
      })()}

      {/* 2. BENTO BOX GRID */}
      {(() => {
        const BentoGrid = () => {
          const [hoveredCard, setHoveredCard] = React.useState(null);
          const [pingPulse, setPingPulse] = React.useState(false);
          const [traceStep, setTraceStep] = React.useState(0);
          const [provisionStep, setProvisionStep] = React.useState(0);
          const [latencyCount, setLatencyCount] = React.useState(8);

          React.useEffect(() => {
            if (hoveredCard === 'ping') {
              setPingPulse(true);
              const iv = setInterval(() => {
                setLatencyCount(Math.floor(Math.random() * 15) + 5);
              }, 800);
              return () => { clearInterval(iv); setPingPulse(false); };
            }
          }, [hoveredCard]);

          React.useEffect(() => {
            if (hoveredCard === 'trace') {
              setTraceStep(0);
              const iv = setInterval(() => {
                setTraceStep(prev => (prev >= 3 ? 0 : prev + 1));
              }, 500);
              return () => { clearInterval(iv); setTraceStep(0); };
            }
          }, [hoveredCard]);

          React.useEffect(() => {
            if (hoveredCard === 'zero') {
              setProvisionStep(0);
              const iv = setInterval(() => {
                setProvisionStep(prev => (prev >= 4 ? 0 : prev + 1));
              }, 500);
              return () => { clearInterval(iv); setProvisionStep(0); };
            }
          }, [hoveredCard]);

          const provisionSteps = ['Router Connected', 'Detected', 'Registered', 'Configured', 'Online ✓'];
          const faultRows = [
            { severity: 'Warning', device: '200C86-Titanium%2D-GNXS430E6A7', code: 'script.TypeError', msg: 'Cannot read properties of undefined', time: '09/04/2026, 20:42', type: 'warn' },
            { severity: 'Warning', device: '1C25E1-EL%2DSPRO-CIOT4F565800', code: 'script', msg: "Virtual parameter 'WifiClients' error", time: '16/06/2026, 15:20', type: 'warn' },
            { severity: 'Warning', device: '000755-F670S-HWTCA61EBBE8', code: 'too_many_commits', msg: 'Too many commit iterations', time: '17/06/2026, 12:36', type: 'warn' },
            { severity: 'Warning', device: '1C25E1-EL%2DSPRO-CIOT4F088760', code: 'session_terminated', msg: 'TR-069 session unsuccessfully terminated', time: '19/06/2026, 12:30', type: 'warn' },
            { severity: 'Critical', device: '1C25E1-EL%2DSPRO-CIOT4F5663C0', code: 'cwmp.9002', msg: 'Internal Error', time: '01/07/2026, 18:10', type: 'critical' },
          ];

          const cardBase = "relative group rounded-3xl border overflow-hidden transition-all duration-500 cursor-default";
          const cardHover = "hover:scale-[1.02] hover:shadow-2xl hover:border-white/20";
          const glassCard = "bg-[#151515]/90 backdrop-blur-xl border-white/10";

          return (
            <section className="py-20 relative z-10 bg-[#161719] border-t border-white/5">
              {/* Ambient glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#fa6e43]/4 rounded-full blur-[150px] pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section Header */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <div className="inline-flex items-center px-4 py-1.5 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-full mb-5">
                    <Zap className="w-3.5 h-3.5 text-[#fa6e43] mr-2" />
                    <span className="text-[#fa6e43] text-sm font-medium">Core Capabilities</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-[#c0c0c0] mb-5">
                    Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#fa6e43] to-orange-300">Network Intelligence</span>
                  </h2>
                  <p className="text-gray-400 text-lg max-w-3xl mx-auto leading-relaxed">
                    Discover the essential tools that power intelligent device provisioning, remote diagnostics, and proactive network management through SK Radius TR-069.
                  </p>
                </motion.div>

                {/* 2×2 Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* ── CARD 1: Zero-Touch Provisioning (Top Left) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    onMouseEnter={() => setHoveredCard('zero')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`${cardBase} ${cardHover} ${glassCard} p-7`}
                    style={{ boxShadow: hoveredCard === 'zero' ? '0 0 60px rgba(250,110,67,0.10)' : 'none' }}
                  >
                    {/* BG glow */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-[#fa6e43]/8 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === 'zero' ? 'opacity-100' : 'opacity-50'}`} />

                    <div className="relative z-10 flex flex-col h-full gap-5">
                      {/* Top row: icon + tag */}
                      <div className="flex items-start justify-between">
                        <motion.div
                          animate={hoveredCard === 'zero' ? { y: [0, -4, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-14 h-14 rounded-2xl bg-[#fa6e43]/15 border border-[#fa6e43]/25 flex items-center justify-center shadow-[0_0_30px_rgba(250,110,67,0.2)]"
                        >
                          <Zap className="w-7 h-7 text-[#fa6e43]" />
                        </motion.div>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-[#fa6e43]/10 border border-[#fa6e43]/20 text-[#fa6e43]">Provisioning</span>
                      </div>

                      {/* Title + Description */}
                      <div>
                        <h3 className="text-2xl font-bold text-[#c0c0c0] mb-2">Zero-Touch Provisioning</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Automatically discover, register, and provision customer routers as soon as they connect to the network. Eliminate manual configuration and activate services in minutes.
                        </p>
                      </div>

                      {/* Feature highlights */}
                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {['Automatic Device Discovery', 'Customer Auto Mapping', 'Instant Configuration Push', 'Zero Manual Setup'].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#fa6e43] flex-shrink-0" />
                            <span className="text-gray-400 text-xs">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mini Workflow */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#fa6e43] animate-pulse" />
                          <span className="text-xs text-gray-500 font-medium">Provisioning Workflow</span>
                        </div>
                        <div className="flex items-center justify-between">
                          {provisionSteps.map((step, i) => (
                            <React.Fragment key={i}>
                              <div className="flex flex-col items-center gap-1">
                                <div className={`w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-300 ${i <= provisionStep ? 'bg-[#fa6e43]/20 border-[#fa6e43]/50 shadow-[0_0_12px_rgba(250,110,67,0.4)]' : 'bg-white/5 border-white/10'}`}>
                                  {i <= provisionStep ? (
                                    <div className="w-2 h-2 rounded-full bg-[#fa6e43]" />
                                  ) : (
                                    <div className="w-2 h-2 rounded-full bg-white/20" />
                                  )}
                                </div>
                                <span className={`text-[9px] text-center leading-tight transition-colors duration-300 max-w-[50px] ${i <= provisionStep ? 'text-[#fa6e43]' : 'text-gray-600'}`}>{step}</span>
                              </div>
                              {i < provisionSteps.length - 1 && (
                                <div className={`flex-1 h-px mx-1 transition-all duration-300 ${i < provisionStep ? 'bg-[#fa6e43]/50' : 'bg-white/10'}`} />
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Stats */}
                      <div className="flex items-center gap-4 pt-1 border-t border-white/8">
                        <div>
                          <div className="text-xl font-bold text-[#c0c0c0]">2 min</div>
                          <div className="text-xs text-gray-500">Avg. Activation</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <div className="text-xl font-bold text-[#fa6e43]">100%</div>
                          <div className="text-xs text-gray-500">Automated Setup</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── CARD 2: Ping Diagnostics (Top Right) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    onMouseEnter={() => setHoveredCard('ping')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`${cardBase} ${cardHover} ${glassCard} p-7`}
                    style={{ boxShadow: hoveredCard === 'ping' ? '0 0 60px rgba(34,197,94,0.08)' : 'none' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-green-500/6 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === 'ping' ? 'opacity-100' : 'opacity-50'}`} />

                    {/* Pulse rings on hover */}
                    {hoveredCard === 'ping' && (
                      <div className="absolute top-8 right-8 pointer-events-none">
                        {[1, 2, 3].map(r => (
                          <motion.div key={r} initial={{ scale: 0.5, opacity: 0.6 }} animate={{ scale: 2.5, opacity: 0 }} transition={{ repeat: Infinity, duration: 2, delay: r * 0.5, ease: 'easeOut' }}
                            className="absolute inset-0 w-12 h-12 rounded-full border border-green-500/30" />
                        ))}
                      </div>
                    )}

                    <div className="relative z-10 flex flex-col h-full gap-5">
                      <div className="flex items-start justify-between">
                        <motion.div
                          animate={hoveredCard === 'ping' ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/25 flex items-center justify-center"
                        >
                          <Wifi className="w-7 h-7 text-green-400" />
                        </motion.div>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">Diagnostics</span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-[#c0c0c0] mb-2">Ping Test</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Verify device connectivity instantly by sending remote ICMP requests directly from the ACS without visiting the customer location.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {['Check Device Reachability', 'Measure Response Time', 'Detect Packet Loss', 'Verify Network Connectivity'].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                            <span className="text-gray-400 text-xs">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Mini Ping UI */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 font-mono">PING</span>
                          <div className={`flex items-center gap-1.5 text-xs font-medium ${hoveredCard === 'ping' ? 'text-green-400' : 'text-gray-400'}`}>
                            <motion.div animate={hoveredCard === 'ping' ? { opacity: [1, 0, 1] } : {}} transition={{ repeat: Infinity, duration: 1 }}
                              className={`w-2 h-2 rounded-full ${hoveredCard === 'ping' ? 'bg-green-400' : 'bg-gray-600'}`} />
                            {hoveredCard === 'ping' ? 'Online' : 'Idle'}
                          </div>
                        </div>
                        {[
                          { label: 'Host', value: '192.168.1.1' },
                          { label: 'Latency', value: hoveredCard === 'ping' ? `${latencyCount} ms` : '— ms', highlight: true },
                          { label: 'Packet Loss', value: '0%' },
                        ].map(row => (
                          <div key={row.label} className="flex items-center justify-between py-1.5 border-t border-white/5">
                            <span className="text-xs text-gray-500">{row.label}</span>
                            <span className={`text-xs font-mono font-medium ${row.highlight && hoveredCard === 'ping' ? 'text-green-400' : 'text-gray-300'}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-1 border-t border-white/8">
                        <div>
                          <div className="text-xl font-bold text-[#c0c0c0]">~8 ms</div>
                          <div className="text-xs text-gray-500">Avg. Response Time</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <div className="text-xl font-bold text-green-400">0%</div>
                          <div className="text-xs text-gray-500">Packet Loss</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── CARD 3: Trace Route (Bottom Left) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onMouseEnter={() => setHoveredCard('trace')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`${cardBase} ${cardHover} ${glassCard} p-7`}
                    style={{ boxShadow: hoveredCard === 'trace' ? '0 0 60px rgba(96,165,250,0.08)' : 'none' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-blue-500/6 via-transparent to-transparent transition-opacity duration-500 ${hoveredCard === 'trace' ? 'opacity-100' : 'opacity-50'}`} />

                    <div className="relative z-10 flex flex-col h-full gap-5">
                      <div className="flex items-start justify-between">
                        <motion.div
                          animate={hoveredCard === 'trace' ? { rotate: [0, 5, -5, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center"
                        >
                          <Network className="w-7 h-7 text-blue-400" />
                        </motion.div>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400">Network Analysis</span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-[#c0c0c0] mb-2">Trace Route</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Identify the complete network path between the ACS and the customer device to isolate routing issues and optimize network performance.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {['View Network Path', 'Detect Failed Hops', 'Measure Hop Latency', 'Troubleshoot Routing'].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                            <span className="text-gray-400 text-xs">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Trace Route Visualization */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl p-4">
                        <div className="flex items-center gap-1.5 mb-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                          <span className="text-xs text-gray-500 font-medium">Network Path</span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          {['ACS', 'Hop 1', 'Hop 2', 'Hop 3', 'Router'].map((node, i) => (
                            <React.Fragment key={i}>
                              <div className="flex flex-col items-center gap-1">
                                <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${i <= traceStep ? 'border-blue-400 bg-blue-400/20 shadow-[0_0_10px_rgba(96,165,250,0.4)]' : 'border-white/15 bg-white/5'}`}>
                                  <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${i <= traceStep ? 'bg-blue-400' : 'bg-white/20'}`} />
                                </div>
                                <span className={`text-[9px] transition-colors duration-300 ${i <= traceStep ? 'text-blue-400' : 'text-gray-600'}`}>{node}</span>
                              </div>
                              {i < 4 && (
                                <div className="flex-1 relative h-0.5 bg-white/10 overflow-hidden">
                                  <motion.div
                                    animate={hoveredCard === 'trace' ? { x: ['-100%', '200%'] } : { x: '-100%' }}
                                    transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3, ease: 'linear' }}
                                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                                  />
                                </div>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 pt-1 border-t border-white/8">
                        <div>
                          <div className="text-xl font-bold text-[#c0c0c0]">12</div>
                          <div className="text-xs text-gray-500">Network Hops</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <div className="text-xl font-bold text-blue-400">18 ms</div>
                          <div className="text-xs text-gray-500">Avg. Hop Delay</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── CARD 4: Fault Detection (Bottom Right) ── */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    onMouseEnter={() => setHoveredCard('faults')}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`${cardBase} ${cardHover} ${glassCard} p-7`}
                    style={{ boxShadow: hoveredCard === 'faults' ? '0 0 60px rgba(250,204,21,0.08)' : 'none' }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br from-yellow-500/6 via-red-500/3 to-transparent transition-opacity duration-500 ${hoveredCard === 'faults' ? 'opacity-100' : 'opacity-50'}`} />

                    <div className="relative z-10 flex flex-col h-full gap-5">
                      <div className="flex items-start justify-between">
                        <motion.div
                          animate={hoveredCard === 'faults' ? { rotate: [0, -8, 8, 0] } : {}}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="w-14 h-14 rounded-2xl bg-yellow-500/10 border border-yellow-500/25 flex items-center justify-center"
                        >
                          <AlertTriangle className="w-7 h-7 text-yellow-400" />
                        </motion.div>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400">Monitoring</span>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-[#c0c0c0] mb-2">Fault Detection</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                          Automatically detect router failures, connectivity issues, authentication problems, and configuration errors before customers report them.
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                        {['Offline Device Alerts', 'Authentication Failures', 'Configuration Errors', 'Event Logging'].map((f, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                            <span className="text-gray-400 text-xs">{f}</span>
                          </div>
                        ))}
                      </div>

                      {/* Fault Table */}
                      <div className="bg-white/4 border border-white/8 rounded-2xl overflow-hidden">
                        {/* Table header */}
                        <div className="grid grid-cols-[80px_1fr_100px_60px] gap-2 px-3 py-2 border-b border-white/8">
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Severity</span>
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Device</span>
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Fault Code</span>
                          <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-wide">Time</span>
                        </div>
                        {/* Rows */}
                        {faultRows.map((row, i) => (
                          <div key={i} className={`grid grid-cols-[80px_1fr_100px_60px] gap-2 px-3 py-2 border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors`}>
                            <div>
                              <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                                row.type === 'critical'
                                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                  : 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25'
                              }`}>
                                <AlertTriangle className="w-2.5 h-2.5" />
                                {row.severity}
                              </span>
                            </div>
                            <span className="text-[10px] text-gray-300 font-mono truncate self-center">{row.device}</span>
                            <span className={`text-[10px] font-mono self-center ${
                              row.type === 'critical' ? 'text-red-400' : 'text-[#fa6e43]'
                            }`}>{row.code}</span>
                            <span className="text-[10px] text-gray-500 font-mono self-center">{row.time}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 pt-1 border-t border-white/8">
                        <div>
                          <div className="text-xl font-bold text-[#c0c0c0]">24×7</div>
                          <div className="text-xs text-gray-500">Continuous Monitoring</div>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                          <div className="text-xl font-bold text-yellow-400">Real-Time</div>
                          <div className="text-xs text-gray-500">Alerts</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                </div>
              </div>
            </section>
          );
        };
        return <BentoGrid />;
      })()}


      {/* FAQ SECTION */}
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
              <span className="text-[#fa6e43] text-sm font-medium">Support &amp; FAQs</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Find answers to common questions about TR-069 and discover how SK Radius ACS can seamlessly manage every CPE device on your network.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Accordion column */}
            <div className="lg:col-span-7">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {[
                  {
                    question: 'What is TR-069?',
                    answer: 'TR-069 is a broadband forum standard (also called CWMP — CPE WAN Management Protocol) that allows ISPs to remotely manage customer-premises equipment (CPE) such as routers, ONTs, and modems through an Auto Configuration Server (ACS). It enables zero-touch provisioning, remote diagnostics, firmware updates, and real-time monitoring.'
                  },
                  {
                    question: 'Which routers and devices are supported?',
                    answer: 'SK Radius TR-069 ACS is compatible with any CPE device that supports the TR-069/CWMP standard — including routers, DSL modems, ONTs, and fiber gateways from all major vendors such as TP-Link, Huawei, ZTE, Nokia, Calix, Technicolor, and more. If the device speaks TR-069, SK Radius can manage it.'
                  },
                  {
                    question: 'Does SK Radius include a built-in ACS?',
                    answer: 'Yes. SK Radius ships with a fully integrated TR-069 Auto Configuration Server (ACS). There is no need to deploy or license a separate ACS platform. Device registration, session management, and configuration push are all handled natively within the SK Radius dashboard.'
                  },
                  {
                    question: 'Can I configure WiFi settings remotely?',
                    answer: 'Absolutely. You can remotely change the SSID name, WiFi password, frequency band (2.4GHz / 5GHz / Dual-Band), channel, bandwidth, transmit power, and toggle features like Guest WiFi, WPS, and SSID visibility — all from the SK Radius ACS dashboard without any on-site visit.'
                  },
                  {
                    question: 'Does SK Radius support remote firmware updates?',
                    answer: 'Yes. SK Radius supports bulk firmware upgrades across your entire device fleet. You can schedule firmware pushes during off-peak maintenance windows, target specific device models or firmware versions, and monitor upgrade progress in real-time with success/failure logs per device.'
                  },
                  {
                    question: 'Can I reboot devices remotely?',
                    answer: 'Yes. You can trigger a remote reboot on any TR-069-connected CPE device instantly from the SK Radius dashboard. This is especially useful for support teams resolving connectivity issues without dispatching a technician. All reboot actions are logged with timestamp and operator ID for audit purposes.'
                  },
                  {
                    question: 'Is bulk configuration supported?',
                    answer: 'Yes. SK Radius supports mass task queues that let you push configuration changes — such as WAN settings, WiFi parameters, or DNS updates — to thousands of devices simultaneously. You can filter devices by model, firmware version, location, or any custom tag before executing a bulk task.'
                  },
                  {
                    question: 'Does SK Radius integrate with CRM or billing systems?',
                    answer: 'Yes. SK Radius exposes a REST API that allows integration with third-party CRM, billing, and OSS/BSS platforms. Subscriber provisioning can be triggered automatically when a new customer is activated in your billing system, eliminating manual steps and reducing activation time to under 2 minutes.'
                  },
                ].map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border-none bg-[#1a1a1c] rounded-xl overflow-hidden data-[state=open]:bg-transparent transition-colors duration-300"
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

            {/* Sidebar card */}
            <div className="lg:col-span-5">
              <div className="bg-[#151515] rounded-3xl overflow-hidden flex flex-col h-full border border-[#222] group">
                <div className="relative h-72 md:h-80 overflow-hidden">
                  <img
                    src="/images/team-collab.png"
                    alt="TR-069 ACS Management"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#151515] via-transparent to-transparent" />
                  <div className="absolute bottom-4 right-4 w-28 h-28 flex items-center justify-center">
                    <div className="absolute w-10 h-10 bg-[#fa6e43] rounded-full shadow-[0_0_20px_rgba(255,99,71,0.5)]" />
                    <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: '15s' }} viewBox="0 0 100 100">
                      <path id="tr069TextPath" d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
                      <text className="text-[10.5px] font-bold fill-gray-300 uppercase tracking-[0.15em]">
                        <textPath href="#tr069TextPath" startOffset="0%">
                          • SK Radius • TR-069 ACS • SK Radius • TR-069 ACS
                        </textPath>
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="p-10 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-4xl font-semibold text-[#c0c0c0] mb-6 tracking-tight">Still have questions?</h3>
                    <p className="text-gray-400 text-lg leading-relaxed mb-10">
                      Every ISP has different infrastructure needs. Let our engineers walk you through how SK Radius TR-069 ACS works with your specific router fleet and provisioning workflow.
                    </p>
                  </div>
                  <Link to="/contact" className="flex items-center justify-between mt-auto group">
                    <span className="text-white text-lg font-medium">Let's have a chat</span>
                    <div className="w-14 h-14 bg-[#fa6e43] rounded-xl flex items-center justify-center group-hover:bg-[#fa6e43]/80 transition-colors">
                      <ArrowRight className="text-white w-6 h-6" />
                    </div>
                  </Link>
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
            Start managing your ISP network with SK Radius TR-069 today
          </p>
          <Button size="lg" className="bg-[#fa6e43] hover:bg-[#fa6e43] text-white px-12 py-6 text-lg group">
            Contact Us
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </section>

    </div>
  );
}

