import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Home = () => {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section - Onezeroart Style */}
      <section className="relative min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Innovative ISP Management & Software Solutions For Businesses
              </h1>
              
              <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                We develop comprehensive ISP management platforms that automate and streamline your network operations. 
                Our responsive, powerful solutions help increase efficiency while reducing operational costs.
              </p>

              <Link to="/contact">
                <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-8 py-6 text-lg">
                  Contact Us
                </Button>
              </Link>

              <p className="mt-8 text-sm text-gray-500">
                <Check className="inline h-4 w-4 text-[#ff6347] mr-2" />
                Trusted By 500+ Companies Worldwide
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <img 
                src="https://customer-assets.emergentagent.com/job_radius-management/artifacts/5eppgptp_ChatGPT%20Image%20Feb%2014%2C%202026%2C%2005_13_53%20PM.png" 
                alt="Professional ISP Management" 
                className="w-full rounded-lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
          <p className="text-gray-400 mb-8">
            Subscribe to receive updates about our latest projects, tech insights, and special offers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-1 px-4 py-3 rounded bg-[#1a1a1a] border border-[#2a2a2a] text-white placeholder-gray-500"
            />
            <Button className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-8">
              SUBSCRIBE
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Our Ready-Made Software Solutions
            </h2>
            <p className="text-xl text-gray-400">
              Trusted by 500+ companies worldwide, our powerful software products are designed to automate and streamline ISP operations.
            </p>
          </motion.div>

          {/* ISP Radius */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <h3 className="text-4xl font-bold text-white mb-6">ISP Radius</h3>
                <p className="text-gray-400 mb-8">
                  A comprehensive solution with built-in Radius (AAA) supporting 50+ Router/NAS vendors.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <div className="flex items-start mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                        <span className="text-[#ff6347] font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Multi Vendor ISP Management</h4>
                        <p className="text-gray-400">
                          From small-scale to nationwide operations, ISP Radius is the singular solution to manage all your ISP needs.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                        <span className="text-[#ff6347] font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Radius Server (AAA)</h4>
                        <p className="text-gray-400">
                          Fully seamless integration with a RADIUS server, supporting over 50+ NAS vendors including Mikrotik, pfSense, Cisco, Juniper, and more.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-start mb-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                        <span className="text-[#ff6347] font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-white mb-2">Subscriber Management</h4>
                        <p className="text-gray-400">
                          Offers a captive portal for easy login, online payments for billing, and live bandwidth graph for real-time monitoring.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link to="/products/isp-radius">
                    <Button className="bg-[#ff6347] hover:bg-[#ff4520] text-white">More Details</Button>
                  </Link>
                  <Link to="/products/isp-radius">
                    <Button variant="outline" className="border-[#2a2a2a] text-white hover:border-[#ff6347] bg-transparent">All Features</Button>
                  </Link>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <img 
                  src="https://customer-assets.emergentagent.com/job_radius-management/artifacts/1b4dbszw_Analytics%20dashboard%20overview%20for%20AniRiks%20Technologies.png" 
                  alt="ISP Radius Dashboard" 
                  className="w-full rounded-lg border border-[#1a1a1a]"
                />
              </motion.div>
            </div>
          </div>

          {/* ISP Radius Premium */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img 
                  src="https://customer-assets.emergentagent.com/job_radius-management/artifacts/p4rknbp2_ChatGPT%20Image%20Feb%2014%2C%202026%2C%2005_07_19%20PM.png" 
                  alt="ISP Radius Premium" 
                  className="w-full rounded-lg border border-[#1a1a1a]"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold text-white mb-6">ISP Radius Premium</h3>
                <p className="text-gray-400 mb-8">
                  Enterprise-grade platform with advanced automation for large-scale deployments.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#ff6347] font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Advanced Analytics</h4>
                      <p className="text-gray-400">
                        Enterprise-level reporting and business intelligence dashboards for deep network insights.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#ff6347] font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Accounting & Billing</h4>
                      <p className="text-gray-400">
                        Fully automated billing system with invoice generation, payment processing, and financial tracking.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#ff6347] font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Reseller Management</h4>
                      <p className="text-gray-400">
                        Multi-level reseller hierarchy with individual permissions and profit tracking.
                      </p>
                    </div>
                  </div>
                </div>

                <Link to="/products/isp-radius-premium">
                  <Button className="bg-[#ff6347] hover:bg-[#ff4520] text-white">More Details</Button>
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Log Server */}
          <div className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <h3 className="text-4xl font-bold text-white mb-6">ISP Radius Log Server</h3>
                <p className="text-gray-400 mb-8">
                  Manage all types of logs in one place with our powerful and lightweight solution.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#ff6347] font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Superfast & Lightweight</h4>
                      <p className="text-gray-400">
                        Optimized for speed with lightweight architecture for efficient log processing.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#ff6347] font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Searching & Sorting</h4>
                      <p className="text-gray-400">
                        Powerful search with instant filtering capabilities to find what you need quickly.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#ff6347]/20 flex items-center justify-center mr-4 mt-1">
                      <span className="text-[#ff6347] font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-2">Advanced Modules</h4>
                      <p className="text-gray-400">
                        Real-time notifications via email or SMS with 24/7 monitoring capabilities.
                      </p>
                    </div>
                  </div>
                </div>

                <Link to="/products/log-server">
                  <Button className="bg-[#ff6347] hover:bg-[#ff4520] text-white">More Details</Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-1 lg:order-2"
              >
                <img 
                  src="https://customer-assets.emergentagent.com/job_radius-management/artifacts/0wmnx1mb_image.png" 
                  alt="Log Server Dashboard" 
                  className="w-full rounded-lg border border-[#1a1a1a]"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Get In Touch With Us</h2>
              <p className="text-xl text-gray-400 mb-8">
                Request a demo or free trial of our software solutions
              </p>
              <img 
                src="https://customer-assets.emergentagent.com/job_radius-management/artifacts/t83twcwa_ChatGPT%20Image%20Feb%2014%2C%202026%2C%2005_08_59%20PM.png" 
                alt="Contact Us" 
                className="w-full rounded-lg"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="bg-[#0a0a0a] border-[#1a1a1a] p-8">
                <h3 className="text-3xl font-bold text-white mb-6">Let's Build Your Network</h3>
                <p className="text-gray-400 mb-8">
                  Have questions about our ISP management solutions? We can help you choose the right platform for your needs.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div>
                    <p className="text-gray-500 text-sm mb-1">WhatsApp</p>
                    <a href="tel:+91XXXXXXXXXX" className="text-[#ff6347] hover:underline">+91-XXXXXXXXXX</a>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm mb-1">Email</p>
                    <a href="mailto:info@skradius.com" className="text-[#ff6347] hover:underline">info@skradius.com</a>
                  </div>
                </div>

                <Link to="/contact">
                  <Button className="bg-[#ff6347] hover:bg-[#ff4520] text-white w-full py-6 text-lg">
                    Contact Us
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">Our Valued Partners</h2>
            <p className="text-xl text-gray-400">500+ Trusted Clients Worldwide</p>
          </motion.div>

          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-lg p-6 flex items-center justify-center aspect-square hover:border-[#ff6347]/50 transition-all"
              >
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6347] to-[#ff8c42] mx-auto mb-2"></div>
                  <span className="text-xs text-gray-500">Client {i}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/clients">
              <Button variant="outline" className="border-[#2a2a2a] text-white hover:border-[#ff6347] bg-transparent">
                More Clients
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Store CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-white mb-6">Shop Now at Our Store</h2>
              <p className="text-xl text-gray-400 mb-8">
                Boost your business with our services. Pay easily with your preferred method—quick and hassle-free.
              </p>
              <Link to="/store">
                <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-12 py-6 text-lg">
                  Visit Store
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-gradient-to-br from-[#ff6347]/10 to-transparent rounded-lg p-12 border border-[#1a1a1a]">
                <div className="text-center">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ff6347] to-[#ff8c42] mx-auto mb-6 flex items-center justify-center">
                    <Zap className="h-16 w-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Start Today</h3>
                  <p className="text-gray-400">Join hundreds of ISPs worldwide</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
