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
    { name: 'Docs', path: '/docs' }
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
            src="/images/skradius-logo.png"
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
            <SheetContent side="right" className="bg-[#050505]/95 backdrop-blur-xl border-l border-white/10 w-full sm:w-[400px]">
              <div className="text-left text-white mb-8 border-b border-white/10 pb-4 text-lg font-semibold">Navigation</div>
              <div className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <div key={link.name}>
                    {link.dropdown ? (
                      <div className="space-y-3">
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{link.name}</div>
                        <div className="flex flex-col space-y-2 pl-2 border-l border-white/10">
                          {link.dropdown.map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setMobileOpen(false)}
                              className="block text-lg font-medium text-gray-300 hover:text-[#fa6e43] transition-colors py-1 pl-4"
                            >
                              {item.name}
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
                        className="block text-xl font-medium transition-colors text-gray-300 hover:text-white"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block text-xl font-medium transition-colors ${location.pathname === link.path
                          ? 'text-[#fa6e43]'
                          : 'text-gray-300 hover:text-white'
                          }`}
                      >
                        {link.name}
                      </Link>
                    )}
                  </div>
                ))}
              </div>

              <div className="absolute bottom-10 left-6 right-6 space-y-4">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center rounded-xl bg-white/5 border border-white/10 px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
                >
                  Talk to Sales
                </Link>
                <a
                  href="https://license.aanirids.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-[#fa6e43] px-5 py-3 text-sm font-semibold text-white transition-all shadow-[0_0_20px_rgba(255,99,71,0.2)]"
                >
                  <span>Get Started</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;