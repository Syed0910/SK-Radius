import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen">
      {/* Hero Section - Platform Style */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,99,71,0.05),transparent_50%)]"></div>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6 text-sm text-gray-500 tracking-widest uppercase">
              We are SKRadius. We build Infrastructure.
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
              The smarter way to{' '}
              <span className="text-[#ff6347]">build,</span>
              <br />
              <span className="text-[#ff6347]">run,</span> and scale
              <br />
              your business.
            </h1>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              See SKRadius in action - complete control over infrastructure with powerful automation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/store">
                <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-10 py-6 text-lg rounded-full">
                  Explore Platform
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-left">
                <div className="text-5xl font-bold text-white mb-2">97.8<span className="text-2xl">%</span></div>
                <div className="text-sm text-gray-500">Uptime</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="text-left">
                <div className="text-5xl font-bold text-white mb-2">+312</div>
                <div className="text-sm text-gray-500">Performance</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-left">
                <div className="text-5xl font-bold text-white mb-2">500K+</div>
                <div className="text-sm text-gray-500">Deployments</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-left">
                <div className="text-5xl font-bold text-white mb-2">1B+</div>
                <div className="text-sm text-gray-500">API Calls</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
            <div className="text-sm text-gray-500 mb-4 tracking-widest uppercase">Our Services</div>
            <h2 className="text-5xl font-bold text-white mb-6">Flexible solutions for modern infrastructure</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: 'ISP Radius', desc: 'Complete network management with AAA authentication', link: '/products/isp-radius', img: 'https://customer-assets.emergentagent.com/job_radius-management/artifacts/1b4dbszw_Analytics%20dashboard%20overview%20for%20AniRiks%20Technologies.png' },
              { num: '02', title: 'ISP Radius Premium', desc: 'Enterprise-grade platform with advanced analytics', link: '/products/isp-radius-premium' },
              { num: '03', title: 'Log Server', desc: 'Centralized log management with real-time monitoring', link: '/products/log-server' },
              { num: '04', title: 'Services', desc: 'Expert consultation and ongoing support', link: '/contact' }
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
                <Link to={service.link}>
                  <Card className={`h-full p-8 border-[#1a1a1a] transition-all duration-300 group cursor-pointer ${index === 0 ? 'bg-[#ff6347]' : 'bg-[#0f0f0f] hover:bg-[#1a1a1a]'}`}>
                    <div className={`text-sm mb-8 ${index === 0 ? 'text-white/70' : 'text-gray-600'}`}>{service.num}</div>
                    <h3 className={`text-2xl font-bold mb-4 ${index === 0 ? 'text-white' : 'text-white group-hover:text-[#ff6347]'}`}>{service.title}</h3>
                    <p className={`text-sm leading-relaxed ${index === 0 ? 'text-white/80' : 'text-gray-400'}`}>{service.desc}</p>
                    {index === 0 && service.img && (
                      <div className="mt-8">
                        <img src={service.img} alt="Dashboard" className="w-full rounded border border-white/20" />
                      </div>
                    )}
                    <div className="mt-6 flex items-center space-x-2 text-sm">
                      <span className={index === 0 ? 'text-white' : 'text-gray-500 group-hover:text-[#ff6347]'}>Learn more</span>
                      <ArrowRight className={`h-4 w-4 ${index === 0 ? 'text-white' : 'text-gray-500 group-hover:text-[#ff6347]'}`} />
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-5xl font-bold text-white mb-6">Start building with SKRadius today</h2>
            <p className="text-xl text-gray-400 mb-12">Join hundreds of ISPs worldwide</p>
            <Link to="/contact">
              <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-12 py-6 text-lg rounded-full">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
