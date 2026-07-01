import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Activity, Search, Bell } from 'lucide-react';
import { NumberedFeature } from './FeatureRow';
import { DeviceFrame, PrimaryCTA, GhostButton } from '../ui/premium';

export default function Products() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#161719]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20 max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-bold text-[#c0c0c0] mb-4">
            Our Ready-Made Software Solutions
          </h2>
          <p className="text-xl text-gray-400">
            Trusted by 500+ companies worldwide, built to automate and streamline ISP operations end to end.
          </p>
        </motion.div>

        {/* ISP Radius */}
        <div className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-7">
              <h3 className="text-4xl font-bold text-[#c0c0c0] mb-2">ISP Radius</h3>
              <p className="text-gray-400 mb-2 max-w-lg">
                A comprehensive solution with built-in Radius (AAA) supporting 50+ Router/NAS vendors.
              </p>

              <NumberedFeature
                index={0}
                number="1"
                icon={Zap}
                title="Multi Vendor ISP Management"
                description="From small-scale to nationwide operations, ISP Radius is the singular solution to manage all your ISP needs."
              />
              <NumberedFeature
                index={1}
                number="2"
                icon={Shield}
                title="Radius Server (AAA)"
                description="Seamless integration with a RADIUS server, supporting 50+ NAS vendors including Mikrotik, pfSense, Cisco, Juniper."
              />
              <NumberedFeature
                index={2}
                number="3"
                icon={TrendingUp}
                title="Subscriber Management"
                description="Captive portal for login, online billing, and live bandwidth graphs for real-time monitoring."
              />

              <div className="flex flex-wrap gap-4 pt-2">
                <Link to="/products/isp-radius">
                  <PrimaryCTA>More Details</PrimaryCTA>
                </Link>
                <Link to="/products/isp-radius">
                  <GhostButton>All Features</GhostButton>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <DeviceFrame
                src="/images/dashboard.png"
                alt="ISP Radius Dashboard"
              />
            </div>
          </div>
        </div>

        {/* Log Server */}
        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 space-y-7">
              <h3 className="text-4xl font-bold text-[#c0c0c0] mb-2">ISP Radius Log Server</h3>
              <p className="text-gray-400 mb-2 max-w-lg">
                Manage all types of logs in one place with our powerful and lightweight solution.
              </p>

              <NumberedFeature
                index={0}
                number="1"
                icon={Activity}
                title="Superfast & Lightweight"
                description="Optimized for speed with lightweight architecture for efficient log processing."
              />
              <NumberedFeature
                index={1}
                number="2"
                icon={Search}
                title="Searching & Sorting"
                description="Powerful search with instant filtering capabilities to find what you need quickly."
              />
              <NumberedFeature
                index={2}
                number="3"
                icon={Bell}
                title="Advanced Modules"
                description="Real-time notifications via email or SMS with 24/7 monitoring capabilities."
              />

              <div className="pt-2">
                <Link to="/products/log-server">
                  <PrimaryCTA>More Details</PrimaryCTA>
                </Link>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <DeviceFrame
                src="/images/abc-logserver.png"
                alt="Log Server Dashboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}