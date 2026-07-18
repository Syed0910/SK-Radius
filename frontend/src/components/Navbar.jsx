import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Products',
      path: '/products',
      dropdown: [
        { name: 'ISP Radius', path: '/products/isp-radius' },
        // { name: 'ISP Radius Premium', path: '/products/isp-radius-premium' },
        { name: 'ISP Radius Log Server', path: '/products/log-server' }
      ]
    },
    { name: 'TR-069', path: '/tr069' },
    // { name: 'Our Store', path: '/store' },
    { name: 'Client Portal', path: 'https://license.aanirids.com/', external: true },
    // { name: 'Our Partners', path: '/partners' },
    // { name: 'Our Clients', path: '/clients' },
    { name: 'Docs', path: 'https://docs.aanirids.com/', external: true }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'bg-[#050505]/60 backdrop-blur-2xl backdrop-saturate-150 border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] py-4' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 group z-10">
          <img
            src="/images/SK-Radius-logo.png"
            alt="SKRadius"
            className="h-9 w-auto transition-all duration-300 group-hover:scale-105 group-hover:brightness-110 drop-shadow-[0_0_15px_rgba(255,99,71,0.2)]"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-1">
              {navLinks.map((link) => (
                <NavigationMenuItem 
                  key={link.name}
                  onMouseEnter={() => setHoveredPath(link.name)}
                  onMouseLeave={() => setHoveredPath(null)}
                  className="relative flex items-center"
                >
                  {hoveredPath === link.name && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.dropdown ? (
                    <>
                      <NavigationMenuTrigger className="!bg-transparent focus:!bg-transparent data-[state=open]:!bg-white/5 text-sm font-medium text-gray-300 hover:!text-[#fa6e43] data-[state=open]:!text-white transition-colors rounded-lg px-4 h-9">
                        {link.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="w-[240px] p-2 flex flex-col gap-1">
                          {link.dropdown.map((item) => (
                            <NavigationMenuLink asChild key={item.path}>
                              <Link
                                to={item.path}
                                className="group flex items-center justify-between rounded-lg px-4 py-3 no-underline outline-none transition-all hover:bg-white/10"
                              >
                                <div className="text-sm font-medium text-gray-300 group-hover:text-[#fa6e43] transition-colors">{item.name}</div>
                                <ArrowRight className="w-4 h-4 text-[#fa6e43] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                              </Link>
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : link.external ? (
                    <a
                      href={link.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center justify-center rounded-lg px-4 h-9 text-sm font-medium transition-colors relative z-10 text-gray-300 hover:text-[#fa6e43]`}
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className={`inline-flex items-center justify-center rounded-lg px-4 h-9 text-sm font-medium transition-colors relative z-10 ${location.pathname === link.path
                        ? 'text-[#fa6e43]'
                        : 'text-gray-300 hover:text-[#fa6e43]'
                        }`}
                    >

                      {link.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Action Button */}
        <div className="hidden lg:flex items-center space-x-4 z-10">

          <a
            href="https://license.aanirids.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center justify-center rounded-lg bg-[#fa6e43] px-5 py-2 text-sm font-semibold text-white transition-all hover:bg-[#fa6e43] hover:shadow-[0_0_20px_rgba(255,99,71,0.3)] shadow-[0_0_10px_rgba(255,99,71,0.1)]"
          >
            <span>Get Started</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden z-10">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors">
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="p-0 border-0 w-full sm:w-[380px] overflow-hidden"
              style={{
                background: 'rgba(10, 10, 12, 0.85)',
                backdropFilter: 'blur(32px) saturate(180%)',
                WebkitBackdropFilter: 'blur(32px) saturate(180%)',
                borderLeft: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.6)',
              }}
            >
              {/* Ambient glow blobs */}
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #fa6e43 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
              <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-5 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #fa6e43 0%, transparent 70%)', transform: 'translate(-30%, 30%)' }} />

              <div className="relative z-10 flex flex-col h-full px-6 pt-6 pb-8">

                {/* Header: Logo */}
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" onClick={() => setMobileOpen(false)}>
                    <img src="/images/SK-Radius-logo.png" alt="SKRadius" className="h-8 w-auto" />
                  </Link>
                </div>

                {/* Divider */}
                <div className="h-px w-full mb-6" style={{ background: 'linear-gradient(to right, rgba(250,110,67,0.4), transparent)' }} />

                {/* Nav Links */}
                <nav className="flex flex-col gap-1 flex-1">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.07, duration: 0.35, ease: 'easeOut' }}
                    >
                      {link.dropdown ? (
                        <div className="mb-2">
                          <div className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#fa6e43]/60 mb-2 px-1">
                            {link.name}
                          </div>
                          <div className="flex flex-col gap-2">
                            {link.dropdown.map((item) => (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className="group flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200"
                                style={{
                                  background: location.pathname === item.path
                                    ? 'rgba(250,110,67,0.12)'
                                    : 'rgba(255,255,255,0.04)',
                                  border: location.pathname === item.path
                                    ? '1px solid rgba(250,110,67,0.3)'
                                    : '1px solid rgba(255,255,255,0.06)',
                                }}
                              >
                                <span className={`text-sm font-medium transition-colors ${location.pathname === item.path ? 'text-[#fa6e43]' : 'text-gray-300 group-hover:text-white'}`}>
                                  {item.name}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#fa6e43] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      ) : link.external ? (
                        <a
                          href={link.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setMobileOpen(false)}
                          className="group flex items-center gap-3 px-4 py-3.5 rounded-xl text-base font-medium text-gray-300 hover:text-white transition-all duration-200"
                          style={{ border: '1px solid transparent' }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          {link.name}
                          <ArrowRight className="w-3.5 h-3.5 text-[#fa6e43] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 ml-auto" />
                        </a>
                      ) : (
                        <Link
                          to={link.path}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium transition-all duration-200"
                          style={{
                            color: location.pathname === link.path ? '#fa6e43' : 'rgb(209,213,219)',
                            background: location.pathname === link.path ? 'rgba(250,110,67,0.08)' : 'transparent',
                            border: location.pathname === link.path ? '1px solid rgba(250,110,67,0.2)' : '1px solid transparent',
                          }}
                        >
                          {link.name}
                          {location.pathname === link.path && (
                            <span className="w-1.5 h-1.5 rounded-full bg-[#fa6e43] shadow-[0_0_8px_#fa6e43]" />
                          )}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </nav>

                {/* Bottom CTAs */}
                <div className="space-y-3 mt-6">
                  <div className="h-px w-full mb-4" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.08), transparent)' }} />
                  <Link
                    to="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl px-5 py-3.5 text-sm font-medium text-gray-200 transition-all duration-200 hover:text-white"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    Talk to Sales
                  </Link>
                  <a
                    href="https://license.aanirids.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3.5 text-sm font-semibold text-white transition-all duration-200"
                    style={{
                      background: 'linear-gradient(135deg, #fa6e43, #e85d32)',
                      boxShadow: '0 0 24px rgba(250,110,67,0.35), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>

              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;