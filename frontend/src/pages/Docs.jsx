import React from 'react';
import { motion } from 'framer-motion';
import { Book, FileText, Download, Video } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const Docs = () => {
  const docCategories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Installation guides and quick start tutorials',
      links: ['Installation Guide', 'Quick Start', 'System Requirements', 'First Steps']
    },
    {
      icon: FileText,
      title: 'User Guides',
      description: 'Comprehensive documentation for all features',
      links: ['User Management', 'Billing Setup', 'Network Configuration', 'Reports & Analytics']
    },
    {
      icon: Video,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      links: ['Dashboard Overview', 'Adding Subscribers', 'Configuring NAS', 'Generating Reports']
    },
    {
      icon: Download,
      title: 'Downloads',
      description: 'Software, tools, and resources',
      links: ['Latest Release', 'Client Tools', 'API Documentation', 'Sample Configs']
    }
  ];

  return (
    <div className="bg-slate-950 min-h-screen py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">Documentation</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Everything you need to get started with SKRadius products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {docCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-slate-900/50 border-slate-800 hover:border-orange-500 transition-all h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-orange-600/20 flex items-center justify-center mb-4">
                    <category.icon className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-2xl text-white">{category.title}</CardTitle>
                  <CardDescription className="text-gray-400">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.links.map((link, idx) => (
                      <li key={idx}>
                        <a href="#" className="text-gray-300 hover:text-orange-500 transition-colors text-sm flex items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mr-2"></span>
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12">
            <h2 className="text-3xl font-bold text-white mb-4">Need More Help?</h2>
            <p className="text-lg text-gray-300 mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <a href="mailto:info@skradius.com" className="inline-block bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
              Contact Support
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Docs;