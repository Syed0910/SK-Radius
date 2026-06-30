import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import NetworkCanvas from '../three/scene/NetworkCanvas';
import { GradientMesh, GridOverlay } from '../ui/AmbientLayers';
import { PrimaryCTA, GhostButton, LiveBadge, AnimatedHeadline } from '../ui/premium';

const clientLogos = ['NetCore', 'FiberLink', 'AeroISP', 'StreamNet', 'Wavex', 'GridTel'];

export default function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const handleImageMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -8, y: px * 8 });
  };

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0a0a0a]"
    >
      <GradientMesh />
      <GridOverlay />
      <NetworkCanvas />

      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <LiveBadge>Trusted by 500+ ISPs worldwide</LiveBadge>

            <AnimatedHeadline
              text="Innovative ISP Management & Software Solutions For Businesses"
              highlight={['ISP', 'Management']}
              className="text-5xl md:text-6xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl"
            >
              We build comprehensive ISP management platforms that automate
              and streamline your network operations — engineered for
              efficiency, designed to cut operational cost.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link to="/contact">
                <PrimaryCTA>Contact Us</PrimaryCTA>
              </Link>
              <Link to="/products">
                <GhostButton>Explore Products</GhostButton>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="mt-8 text-sm text-gray-500 flex items-center gap-2"
            >
              <Check className="h-4 w-4 text-[#ff6347]" />
              50+ NAS vendors supported out of the box
            </motion.p>

            {/* <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="mt-12 relative overflow-hidden max-w-xl
                         [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
            >
              <div className="flex gap-12 animate-marquee whitespace-nowrap">
                {[...clientLogos, ...clientLogos].map((logo, i) => (
                  <span
                    key={i}
                    className="text-gray-600 font-semibold text-lg tracking-wide hover:text-[#ff6347]
                               transition-colors duration-300 cursor-default"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div> */}
          </div>

          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
            onMouseMove={handleImageMove}
            onMouseLeave={() => setTilt({ x: 0, y: 0 })}
          >
            <div className="absolute -inset-8 bg-gradient-to-br from-[#ff6347]/20 to-transparent blur-3xl rounded-full" />

            <motion.div
              animate={{ rotateX: tilt.x, rotateY: tilt.y }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
              className="relative rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
            >
              <img
                src="https://customer-assets.emergentagent.com/job_radius-management/artifacts/5eppgptp_ChatGPT%20Image%20Feb%2014%2C%202026%2C%2005_13_53%20PM.png"
                alt="ISP Management Dashboard"
                className="w-full rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 via-transparent to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.4, duration: 0.7 }}
              whileHover={{ y: -4 }}
              className="absolute -bottom-6 -left-6 rounded-xl border border-white/10
                         bg-[#0f0f0f]/90 backdrop-blur-xl px-6 py-4 shadow-2xl"
            >
              <p className="text-2xl font-bold text-white">99.9%</p>
              <p className="text-xs text-gray-400">Uptime guaranteed</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 1.5, duration: 0.7 }}
              whileHover={{ y: -4 }}
              className="absolute -top-6 -right-6 rounded-xl border border-white/10
                         bg-[#0f0f0f]/90 backdrop-blur-xl px-5 py-3 shadow-2xl flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              <p className="text-sm text-white font-medium">Live monitoring active</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        {/* <span className="text-xs text-gray-500 tracking-widest uppercase">Scroll</span> */}
        {/* <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#ff6347] to-transparent"
        /> */}
      </motion.div>
    </section>
  );
}