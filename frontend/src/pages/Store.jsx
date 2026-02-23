import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { products } from '../data/mockData';

const Store = () => {
  return (
    <div className="bg-[#0a0a0a] min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-white mb-6">Our Store</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our complete range of ISP management solutions designed to scale with your business
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-[#0f0f0f]/50 border-[#1a1a1a] hover:border-[#ff6347] transition-all group h-full flex flex-col">
                <CardHeader>
                  <div className="w-full h-56 mb-4 rounded-lg overflow-hidden bg-[#1a1a1a]">
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
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-gray-300 mb-6">{product.description}</p>
                  
                  <div className="space-y-2">
                    {product.highlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ff6347] mt-2 flex-shrink-0"></div>
                        <p className="text-sm text-gray-400">{highlight}</p>
                      </div>
                    ))}
                  </div>

                  <Link to={`/products/${product.id}`} className="mt-6 block">
                    <Button className="w-full bg-[#ff6347] hover:bg-[#ff4520] text-white group">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-[#0f0f0f]/50 border border-[#1a1a1a] rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Need Help Choosing?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Not sure which solution is right for your business? Our team is here to help you find 
              the perfect fit for your ISP operations.
            </p>
            <Button size="lg" className="bg-[#ff6347] hover:bg-[#ff4520] text-white px-8 py-6 text-lg group">
              Contact Our Sales Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Store;