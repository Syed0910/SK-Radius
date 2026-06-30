import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Hero from '../components/sections/Hero';
import { NumberedFeature } from '../components/sections/FeatureRow';
import { DeviceFrame } from '../components/ui/premium';
import Stats from '../components/sections/Stats';
import Products from '../components/sections/Products';
import Integrations from '../components/sections/Integrations';
import Reviews from '../components/sections/Reviews';
import ContactCTA from '../components/sections/ContactCTA';

const Home = () => {
  return (
    <div className="bg-[#0a0a0a]">
      {/* Hero Section - Onezeroart Style */}
     <Hero />
   <Stats />
     

      {/* Products Section */}
      <Products />
      {/* Integrations Section */}
      <Integrations />
      {/* Reviews Section */}
      <Reviews />
      {/* Contact Section */}
      <ContactCTA />
    </div>
  );
};

export default Home;
