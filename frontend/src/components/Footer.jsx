import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Linkedin, Github, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-[#fa6e43]/50 to-transparent"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[150px] bg-[#fa6e43] blur-[120px] rounded-full opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 mb-16">

          {/* Brand & Newsletter Section (Span 4) */}
          <div className="sm:col-span-2 lg:col-span-4">
            <Link to="/" className="inline-block mb-6">
              <img
                src="/images/SK-Radius-logo.png"
                alt="SKRadius"
                className="h-10 w-auto drop-shadow-[0_0_15px_rgba(255,99,71,0.1)]"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Empowering ISPs and enterprises with smart, scalable, and secure digital management solutions.
            </p>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white">Subscribe to our newsletter</h4>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-[#fa6e43]/50 focus:ring-1 focus:ring-[#fa6e43]/50 w-full transition-all"
                />
                <button className="bg-[#fa6e43] hover:bg-[#ff8a66] text-white px-4 py-2.5 rounded-lg flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(255,99,71,0.2)] flex-shrink-0">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links (Span 2) */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Product</h3>
            <ul className="space-y-4">
              {[
                { name: 'ISP Radius', path: '/products/isp-radius' },
                { name: 'Log Server', path: '/products/log-server' },
                { name: 'TR-069', path: '/tr069' },

              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-gray-400 hover:text-[#fa6e43] text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company (Span 2) */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Company</h3>
            <ul className="space-y-4">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Our Partners', path: '/partners' },
                { name: 'Our Clients', path: '/clients' },
                { name: 'Contact', path: '/contact' }
              ].map((item, idx) => (
                <li key={idx}>
                  <Link to={item.path} className="text-gray-400 hover:text-[#fa6e43] text-sm transition-all duration-300 hover:translate-x-1 inline-block">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info (Span 3) */}
          <div className="sm:col-span-2 lg:col-span-3">
            <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-6">Connect</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                  <Mail className="h-4 w-4 text-[#fa6e43]" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-gray-400 text-sm">Email us at</span>
                  <a href="mailto:info@skradius.com" className="text-white text-sm hover:text-[#fa6e43] transition-colors mt-0.5">info@skradius.com</a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/5">
                  <Phone className="h-4 w-4 text-[#fa6e43]" />
                </div>
                <div className="flex flex-col pt-1">
                  <span className="text-gray-400 text-sm">Call us</span>
                  <a href="tel:+918472360140" className="text-white text-sm hover:text-[#fa6e43] transition-colors mt-0.5">+91 8472360140</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SKRadius. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
            <a href="https://docs.aanirids.com/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white text-sm transition-colors">Documentation</a>
          </div>

          <div className="flex space-x-3">
            {[
              { icon: Facebook, href: '#' },
              { icon: Twitter, href: '#' },
              { icon: Linkedin, href: '#' },
              { icon: Github, href: '#' }
            ].map((Social, idx) => (
              <a
                key={idx}
                href={Social.href}
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-[#fa6e43] hover:text-white hover:border-[#fa6e43] transition-all duration-300 group"
              >
                <Social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;