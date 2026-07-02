import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Zap, Shield, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Hero from '../components/sections/Hero';
import { NumberedFeature } from '../components/sections/FeatureRow';
import { DeviceFrame } from '../components/ui/premium';
import IntegrationsMarquee from '../components/sections/IntegrationsMarquee';
import Products from '../components/sections/Products';
import Integrations from '../components/sections/Integrations';
import Reviews from '../components/sections/Reviews';
import ContactCTA from '../components/sections/ContactCTA';
import NetworkCanvas from '../components/three/scene/NetworkCanvas';
import { GradientMesh, GridOverlay } from '../components/ui/AmbientLayers';

const Home = () => {
  return (
    <div className="bg-[#161719] -mt-20">
      {/* Shared Background for Hero and Stats */}
      <div className="relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <GradientMesh />
          <GridOverlay />
          <NetworkCanvas />
        </div>
        
        <div className="relative z-10 -mt-[100vh]">
          <Hero />
          <IntegrationsMarquee />
        </div>
      </div>

      {/* Products Section */}
      <Products />
      {/* Integrations Section */}
      {/* <Integrations /> */}
      {/* Reviews Section */}
      <Reviews />
      {/* Contact Section */}
      <ContactCTA />
    </div>
  );
};

export default Home;
