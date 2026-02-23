import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* Vertical Branding - Platform Style */}
      <div className="fixed left-8 top-1/2 transform -translate-y-1/2 z-50 hidden lg:block">
        <div className="vertical-text">
          <span className="text-[#ff6347] text-6xl font-bold tracking-wider">SK</span>
          <span className="text-white text-6xl font-light tracking-wider">Radius</span>
        </div>
      </div>

      <Navbar />
      <main className="pt-20 pl-0 lg:pl-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;