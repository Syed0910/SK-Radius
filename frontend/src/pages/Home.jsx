import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield, Users, TrendingUp, Server, Network } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { products, heroImages } from '../data/mockData';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-[#0f1419]">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f2e] via-[#0f1419] to-[#1a1410]"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff6347]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ff6347]/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                Empowering Businesses Through
                <span className="block mt-2 bg-gradient-to-r from-[#ff6347] to-[#ff8c42] bg-clip-text text-transparent">
                  Smart Digital Solutions
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Innovative technology. Creative strategy. Scalable results.
              </p>

              <p className="text-base md:text-lg text-gray-400 mb-12 leading-relaxed">
                At SKRadius, we design and develop intelligent digital solutions that help businesses grow, adapt, and lead in the modern digital era. 
                From web platforms to custom systems, we build technology that performs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/store">
                  <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-8 py-6 text-lg group">
                    Explore Products
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="border-2 border-[#ff6347] text-[#ff6347] hover:bg-[#ff6347]/10 px-8 py-6 text-lg">
                    Get in Touch
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2d3748]">
                <img 
                  src={heroImages[0]} 
                  alt="Professional using SKRadius" 
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1419]/60 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#ff6347] rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>

      {/* Products Overview Section */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              SKRadius Software Suite
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Powerful ISP-focused solutions engineered to simplify operations, automate workflows, 
              and deliver full control over your network infrastructure.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-[#1a2332] border-[#2d3748] hover:border-[#ff6347] transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden bg-[#0f1419]">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-[#ff6347] transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {product.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">{product.description}</p>
                    <Link to={`/products/${product.id}`}>
                      <Button className="w-full bg-[#ff6347] hover:bg-[#ff4520] text-white group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}\n          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative bg-[#1a2332]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500K+', label: 'Deployments' },
              { value: '1B+', label: 'API Calls' },
              { value: '12B+', label: 'Daily Requests' },
              { value: '97.8%', label: 'Uptime' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-[#ff6347] mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6347]/10 via-transparent to-[#ff6347]/5"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Your Journey With Us
            </h2>
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              Have a project in mind or looking to upgrade your existing ISP infrastructure? Let's discuss how 
              SKRadius can help you build a smarter, more efficient, and scalable network management system 
              tailored to your business needs.
            </p>
            <p className="text-base text-gray-400 mb-8">
              Whether you're launching a new ISP operation or optimizing an established one, our team is ready 
              to guide you with the right technology and strategy. We believe in long-term partnerships built 
              on reliability, performance, and trust.
            </p>

            <div className="bg-[#1a2332] backdrop-blur-sm border border-[#2d3748] rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-[#ff6347]">Email:</span>
                  <a href="mailto:info@skradius.com" className="hover:text-[#ff6347] transition-colors">
                    info@skradius.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-[#ff6347]">Phone:</span>
                  <span>+91-XXXXXXXXXX</span>
                </div>
              </div>
            </div>

            <Link to="/contact">
              <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-12 py-6 text-lg group">
                Contact Us Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
