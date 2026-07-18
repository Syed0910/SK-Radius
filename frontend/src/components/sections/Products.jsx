import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Zap, Shield, TrendingUp, Activity, Search, Bell, Network, Wifi, RefreshCw } from 'lucide-react';
import { PrimaryCTA, GhostButton } from '../ui/premium';

const TimelineFeature = ({ icon: Icon, title, description, index, progress, isLast }) => {
  const start = index * 0.25;
  const active = start + 0.125;
  const end = (index + 1) * 0.25;

  const segmentProgress = useTransform(
    progress,
    [active, end + 0.125],
    [0, 1]
  );

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
    <div className="flex items-stretch group">
      {/* Left column: dot on top, growing line below */}
      <div className="flex flex-col items-center flex-shrink-0 mr-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#161719] flex-shrink-0">
          <motion.div
            style={{ backgroundColor: dotColor, scale: dotScale, boxShadow: dotGlow }}
            className="w-2.5 h-2.5 rounded-full"
          />
        </div>
        {!isLast && (
          <div className="relative flex-1 w-0.5 bg-[#2a2a2a] mt-1">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#fa6e43] origin-top"
              style={{ height: '100%', scaleY: segmentProgress }}
            />
          </div>
        )}
      </div>
      {/* Right column: content */}
      <motion.div style={{ opacity, y }} className={`flex-1 ${isLast ? 'pb-0' : 'pb-8'}`}>
        <div className="flex items-center space-x-3 mb-1 pt-1">
          <Icon className="w-5 h-5 text-[#fa6e43]" />
          <h4 className="text-xl font-bold text-gray-200 tracking-wide group-hover:text-[#fa6e43] transition-colors duration-300">{title}</h4>
        </div>
        <p className="text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">{description}</p>
      </motion.div>
    </div>
  );
};

const ProductImageReveal = ({ src, alt, initialX = 50 }) => {
  return (
    <div className="w-full relative z-10" style={{ perspective: '2000px' }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          hidden: { opacity: 0, x: initialX },
          visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
        }}
        className="relative w-full"
      >
        <div className="rounded-[2rem] overflow-hidden border border-white/10 bg-[#161719] shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative">
          <div className="relative overflow-hidden">
            <motion.img
              variants={{
                hidden: { filter: "blur(20px)", scale: 1.05 },
                visible: { filter: "blur(0px)", scale: 1, transition: { duration: 2, ease: "easeOut" } }
              }}
              whileHover={{ scale: 1.05, transition: { duration: 0.5, ease: "easeOut" } }}
              src={src}
              alt={alt}
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
        </div>
      </motion.div>
    </div>
  );
};

export default function Products() {
  const ispFeaturesRef = useRef(null);
  const logFeaturesRef = useRef(null);

  const { scrollYProgress: ispRawProgress } = useScroll({
    target: ispFeaturesRef,
    offset: ["start 80%", "end 50%"]
  });

  const ispTimelineProgress = useSpring(ispRawProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const { scrollYProgress: logRawProgress } = useScroll({
    target: logFeaturesRef,
    offset: ["start 80%", "end 50%"]
  });

  const logTimelineProgress = useSpring(logRawProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  const trFeaturesRef = useRef(null);
  const { scrollYProgress: trRawProgress } = useScroll({
    target: trFeaturesRef,
    offset: ["start 80%", "end 50%"]
  });
  const trTimelineProgress = useSpring(trRawProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161719]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[#c0c0c0] mb-4">
            Our Ready-Made Software Solutions
          </h2>
          <p className="text-xl text-gray-400">
            Trusted by 500+ companies worldwide, built to automate and streamline ISP operations end to end.
          </p>
        </motion.div>

        {/* ISP Radius */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1 space-y-7"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-[#c0c0c0] mb-2">ISP Radius</h3>
              <p className="text-gray-400 mb-2 max-w-lg">
                A comprehensive solution with built-in Radius (AAA) supporting 50+ Router/NAS vendors.
              </p>

              <div ref={ispFeaturesRef} className="relative mt-8 ml-2 mb-6">
                <div className="flex flex-col relative z-10">
                  <TimelineFeature
                    index={0}
                    icon={Zap}
                    title="Multi Vendor ISP Management"
                    description="From small-scale to nationwide operations, ISP Radius is the singular solution to manage all your ISP needs."
                    progress={ispTimelineProgress}
                  />
                  <TimelineFeature
                    index={1}
                    icon={Shield}
                    title="Radius Server (AAA)"
                    description="Seamless integration with a RADIUS server, supporting 50+ NAS vendors including Mikrotik, pfSense, Cisco, Juniper."
                    progress={ispTimelineProgress}
                  />
                  <TimelineFeature
                    index={2}
                    icon={TrendingUp}
                    title="Subscriber Management"
                    description="Captive portal for login, online billing, and live bandwidth graphs for real-time monitoring."
                    progress={ispTimelineProgress}
                    isLast={true}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/products/isp-radius">
                  <PrimaryCTA>More Details</PrimaryCTA>
                </Link>
                
              </div>
            </motion.div>

            <div className="order-1 lg:order-2">
              <ProductImageReveal
                src="/images/dashboard.png"
                alt="ISP Radius Dashboard"
                initialX={50}
              />
            </div>
          </div>
        </div>

        {/* Log Server */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-2 space-y-7"
            >
              <h3 className="text-3xl sm:text-4xl font-bold text-[#c0c0c0] mb-2">ISP Radius Log Server</h3>
              <p className="text-gray-400 mb-2 max-w-lg">
                Manage all types of logs in one place with our powerful and lightweight solution.
              </p>

              <div ref={logFeaturesRef} className="relative mt-8 ml-2 mb-6">
                <div className="flex flex-col relative z-10">
                  <TimelineFeature
                    index={0}
                    icon={Activity}
                    title="Superfast & Lightweight"
                    description="Optimized for speed with lightweight architecture for efficient log processing."
                    progress={logTimelineProgress}
                  />
                  <TimelineFeature
                    index={1}
                    icon={Search}
                    title="Searching & Sorting"
                    description="Powerful search with instant filtering capabilities to find what you need quickly."
                    progress={logTimelineProgress}
                  />
                  <TimelineFeature
                    index={2}
                    icon={Bell}
                    title="Advanced Modules"
                    description="Real-time notifications via email or SMS with 24/7 monitoring capabilities."
                    progress={logTimelineProgress}
                    isLast={true}
                  />
                </div>
              </div>

              <div className="pt-2">
                <Link to="/products/log-server">
                  <PrimaryCTA>More Details</PrimaryCTA>
                </Link>
              </div>
            </motion.div>

            <div className="order-1 lg:order-1">
              <ProductImageReveal
                src="/images/abc-logserver.png"
                alt="Log Server Dashboard"
                initialX={-50}
              />
            </div>
          </div>
        </div>

        {/* TR-069 ACS */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Text: left column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-2 lg:order-1 space-y-7"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#fa6e43]/10 border border-[#fa6e43]/20 rounded-full">
                <Network className="w-3.5 h-3.5 text-[#fa6e43]" />
                <span className="text-[#fa6e43] text-xs font-medium tracking-wide">TR-069 ACS</span>
              </div>

              <h3 className="text-3xl sm:text-4xl font-bold text-[#c0c0c0] mb-2">SK Radius TR-069</h3>
              <p className="text-gray-400 mb-2 max-w-lg">
                A built-in Auto Configuration Server (ACS) to remotely provision, monitor, and manage every CPE router and ONT on your network — zero truck rolls needed.
              </p>

              <div ref={trFeaturesRef} className="relative mt-8 ml-2 mb-6">
                <div className="flex flex-col relative z-10">
                  <TimelineFeature
                    index={0}
                    icon={Zap}
                    title="Zero-Touch Provisioning"
                    description="Automatically discover, register, and configure customer routers the moment they connect — no manual setup required."
                    progress={trTimelineProgress}
                  />
                  <TimelineFeature
                    index={1}
                    icon={Wifi}
                    title="Remote WiFi & WAN Control"
                    description="Change SSIDs, passwords, WAN settings, and DNS across thousands of devices from a single dashboard."
                    progress={trTimelineProgress}
                  />
                  <TimelineFeature
                    index={2}
                    icon={RefreshCw}
                    title="Bulk Firmware & Diagnostics"
                    description="Schedule mass firmware upgrades and run real-time ping, trace route, and speed tests remotely on any CPE."
                    progress={trTimelineProgress}
                    isLast={true}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/tr069">
                  <PrimaryCTA>More Details</PrimaryCTA>
                </Link>
              </div>
            </motion.div>

            {/* Image: right column */}
            <div className="order-1 lg:order-2">
              <ProductImageReveal
                src="/images/tr-069.png"
                alt="TR-069 ACS Dashboard"
                initialX={50}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
