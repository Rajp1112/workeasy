import React from 'react';
import { Hammer } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-12">
        
        {/* WorkerFinder Section */}
        <div className="flex-1 flex flex-col items-start">
          <div className="flex items-center mb-4 gap-2">
            <div className="bg-white text-gray-900 p-2 rounded-lg">
              <Hammer className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">WorkerFinder</span>
          </div>
          <p className="text-gray-400 text-sm mb-4 max-w-md">
            Connect with trusted local workers for all your home service needs. Fast, reliable, and affordable.
          </p>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="text-gray-400 hover:text-white">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <FaLinkedinIn size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">How It Works</a></li>
            <li><a href="#" className="hover:text-white">Find Workers</a></li>
            <li><a href="#" className="hover:text-white">Become a Worker</a></li>
            <li><a href="#" className="hover:text-white">Safety</a></li>
            <li><a href="#" className="hover:text-white">Help Center</a></li>
          </ul>
        </div>

        {/* Services Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="#" className="hover:text-white">Electricians</a></li>
            <li><a href="#" className="hover:text-white">Plumbers</a></li>
            <li><a href="#" className="hover:text-white">Carpenters</a></li>
            <li><a href="#" className="hover:text-white">Painters</a></li>
            <li><a href="#" className="hover:text-white">Cleaners</a></li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="flex-1 flex flex-col">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2">
              <MdEmail size={20} />
              <a href="mailto:support@workerfinder.com" className="hover:text-white">support@workerfinder.com</a>
            </li>
            <li className="flex items-center gap-2">
              <MdPhone size={20} />
              <a href="tel:+15551234567" className="hover:text-white">+1 (555) 123-4567</a>
            </li>
            <li className="flex items-center gap-2">
              <MdLocationOn size={20} />
              <span className="hover:text-white">New York, NY</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 flex flex-col md:flex-row justify-between items-start md:items-center border-t border-gray-700 pt-6 gap-6">
        <p className="text-gray-400 text-sm">
          © 2024 WorkerFinder. All rights reserved. | <a href="#" className="hover:text-white">Privacy Policy</a> | <a href="#" className="hover:text-white">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
