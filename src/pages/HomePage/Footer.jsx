import React from 'react';
import { Link } from 'react-router-dom';
import { Hammer } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

const quickLinks = [
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Find Workers', to: '/find-workers' },
  { label: 'Become a Worker', to: '/register' },
  { label: 'Safety', to: '/safety' },
  { label: 'Help Center', to: '/help' },
];

const services = [
  { label: 'Electricians', to: '/services/electricians' },
  { label: 'Plumbers', to: '/services/plumbers' },
  { label: 'Carpenters', to: '/services/carpenters' },
  { label: 'Painters', to: '/services/painters' },
  { label: 'Cleaners', to: '/services/cleaners' },
];

const policies = [
  { label: 'Privacy Policy', to: '/privacy' },
  { label: 'Terms of Service', to: '/terms' },
];

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white py-12'>
      {/* Top Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between gap-12'>
        {/* WorkerFinder Section */}
        <div className='flex-1 flex flex-col items-start'>
          <div className='flex items-center mb-4 gap-2'>
            <div className='bg-white text-gray-900 p-2 rounded-lg'>
              <Hammer className='h-6 w-6' />
            </div>
            <span className='text-2xl font-bold'>WorkerFinder</span>
          </div>
          <p className='text-gray-400 text-sm mb-4 max-w-md'>
            Connect with trusted local workers for all your home service needs.
            Fast, reliable, and affordable.
          </p>
          <div className='flex space-x-4 mt-2'>
            <Link
              to='#'
              className='text-gray-400 hover:text-white transition-colors duration-300'
            >
              <FaFacebookF size={20} />
            </Link>
            <Link
              to='#'
              className='text-gray-400 hover:text-white transition-colors duration-300'
            >
              <FaInstagram size={20} />
            </Link>
            <Link
              to='#'
              className='text-gray-400 hover:text-white transition-colors duration-300'
            >
              <FaLinkedinIn size={20} />
            </Link>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className='flex-1 flex flex-col'>
          <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
          <ul className='space-y-2 text-gray-400'>
            {quickLinks.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className='hover:text-white relative group'>
                  {label}
                  <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Section */}
        <div className='flex-1 flex flex-col'>
          <h3 className='text-lg font-semibold mb-4'>Services</h3>
          <ul className='space-y-2 text-gray-400'>
            {services.map(({ label, to }) => (
              <li key={label}>
                <Link to={to} className='hover:text-white relative group'>
                  {label}
                  <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full'></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className='flex-1 flex flex-col'>
          <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
          <ul className='space-y-2 text-gray-400'>
            <li className='flex items-center gap-2'>
              <MdEmail size={20} />
              <a
                href='mailto:support@workerfinder.com'
                className='hover:text-white'
              >
                support@workerfinder.com
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <MdPhone size={20} />
              <a href='tel:+15551234567' className='hover:text-white'>
                +1 (555) 123-4567
              </a>
            </li>
            <li className='flex items-center gap-2'>
              <MdLocationOn size={20} />
              <span className='hover:text-white'>Ahmadabad, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 border-t border-gray-700 pt-6'>
        <div className='flex flex-col md:flex-row justify-center md:justify-between items-center gap-4 text-center md:text-left'>
          <p className='text-gray-400 text-sm'>
            © 2024 WorkerFinder. All rights reserved.
          </p>
          <div className='text-gray-400 text-sm space-x-4'>
            {policies.map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className='hover:text-white relative group'
              >
                {label}
                <span className='absolute left-0 -bottom-0.5 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full'></span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
