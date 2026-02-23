import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <img 
              src="https://customer-assets.emergentagent.com/job_03aae5c1-aaf2-4127-99b1-8c468650ee5d/artifacts/dp0lp6h4_image.png" 
              alt="SKRadius" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm mb-4">
              Empowering businesses through smart digital solutions and innovative ISP management technology.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/store" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Our Store
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Our Partners
                </Link>
              </li>
              <li>
                <Link to="/clients" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Our Clients
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/docs" className="text-gray-400 hover:text-orange-500 text-sm transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <Mail className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@skradius.com" className="hover:text-orange-500 transition-colors">
                  info@skradius.com
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <Phone className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>+91-XXXXXXXXXX</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} SKRadius. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-orange-500 transition-colors">
              <Github className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;