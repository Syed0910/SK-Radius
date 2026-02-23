import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CheckCircle, Zap, Shield, Users, TrendingUp, Server, Network } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { products } from '../data/mockData';

const Home = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div className="bg-slate-950">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-slate-950 to-orange-900/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Empowering Businesses Through
              <span className="block mt-2 bg-gradient-to-r from-blue-400 to-orange-500 bg-clip-text text-transparent">
                Smart Digital Solutions
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto"
          >
            Innovative technology. Creative strategy. Scalable results.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base md:text-lg text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed"
          >
            At SKRadius, we design and develop intelligent digital solutions that help businesses grow, adapt, and lead in the modern digital era. 
            From web platforms to custom systems, we build technology that performs. We combine creativity, engineering, and strategy to craft 
            scalable digital experiences that solve real-world problems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/store">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-6 text-lg group">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-blue-500 text-blue-400 hover:bg-blue-500/10 px-8 py-6 text-lg">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
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
              className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2"
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
                <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500/50 transition-all duration-300 group h-full">
                  <CardHeader>
                    <div className="w-full h-48 mb-4 rounded-lg overflow-hidden">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardTitle className="text-2xl text-white group-hover:text-orange-500 transition-colors">
                      {product.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {product.tagline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6">{product.description}</p>
                    <Link to={`/products/${product.id}`}>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white group">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-slate-950 to-blue-900/20"></div>
        
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

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-orange-500">Email:</span>
                  <a href="mailto:info@skradius.com" className="hover:text-orange-500 transition-colors">
                    info@skradius.com
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-orange-500">Phone:</span>
                  <span>+91-XXXXXXXXXX</span>
                </div>
              </div>
            </div>

            <Link to="/contact">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-6 text-lg group">
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