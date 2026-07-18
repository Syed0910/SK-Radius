import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useMotionValue, animate } from 'framer-motion';
import { Users, Activity, Server, Eye } from 'lucide-react';
import { PrimaryCTA, GhostButton, AnimatedHeadline } from '../ui/premium';

function AnimatedNumber({ value, suffix = "", decimals = 0 }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => 
    latest.toFixed(decimals) + suffix
  );

  React.useEffect(() => {
    const controls = animate(count, value, { duration: 2, ease: "easeOut", delay: 0.2 });
    return controls.stop;
  }, [value, count]);

  return <motion.span>{rounded}</motion.span>;
}

const stats = [
  {
    title: "10M+",
    value: 10,
    suffix: "M+",
    decimals: 0,
    desc: "Subscribers Managed",
    subDesc: "Scaled for growth",
    icon: Users,
    delay: 0.2
  },
  {
    title: "99.9%",
    value: 99.9,
    suffix: "%",
    decimals: 1,
    desc: "Guaranteed Uptime",
    subDesc: "With 24/7 support",
    icon: Activity,
    delay: 0.4
  },
  {
    title: "50+",
    value: 50,
    suffix: "+",
    decimals: 0,
    desc: "NAS vendor support",
    subDesc: "Mikrotik, Cisco, Ubiquiti & more",
    icon: Server,
    delay: 0.3
  },
  {
    title: "Live Monitor",
    desc: "Real-time network traffic tracking",
    subDesc: "Automated issue resolution",
    icon: Eye,
    delay: 0.5
  }
];

export default function Hero() {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center py-24 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <motion.div style={{ y, opacity }} className="relative z-10 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-8 items-center">
          
          {/* Left Side: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[#fa6e43] text-lg font-medium mb-4"
            >
              ISP Management Platform
            </motion.p>

            <AnimatedHeadline
              text="Innovative ISP Management & Software Solutions For Businesses"
              highlight={['ISP', 'Management']}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#e3dbd8] mb-6 leading-[1.1] tracking-tight text-left"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-10 leading-relaxed max-w-2xl text-left"
            >
              We build comprehensive ISP management platforms that automate
              and streamline your network operations — engineered for
              efficiency, designed to cut operational cost.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.6 }}
              className="flex flex-wrap items-center justify-start gap-4"
            >
              <Link to="/contact">
                <PrimaryCTA>Contact Us</PrimaryCTA>
              </Link>
              <Link to="/products/isp-radius">
                <GhostButton>Explore Products</GhostButton>
              </Link>
            </motion.div>
          </div>

          {/* Right Side: Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4 lg:pl-4">
            {stats.map((stat, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: isEven ? -150 : 150 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className={`relative p-4 rounded-2xl bg-gradient-to-b from-[#161719] to-[#fa6e43]/10 border border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-[#fa6e43]/30 hover:shadow-[0_0_30px_rgba(250,110,67,0.15)] transition-colors transition-shadow duration-300 ${!isEven ? 'sm:mt-6' : ''}`}
                >
                  <div className="w-10 h-10 rounded-full bg-[#161719] border border-[#fa6e43]/20 flex items-center justify-center mb-3 shadow-[0_0_20px_rgba(250,110,67,0.15)]">
                    <stat.icon className="h-5 w-5 text-[#fa6e43]" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">
                    {stat.value !== undefined ? (
                      <AnimatedNumber value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
                    ) : (
                      stat.title
                    )}
                  </h3>
                  <p className="text-[11px] text-gray-400 leading-relaxed mb-0.5">{stat.desc}</p>
                  <p className="text-[11px] text-gray-400 opacity-80">{stat.subDesc}</p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </motion.div>
    </section>
  );
}