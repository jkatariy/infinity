'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', href: '/about/profile' },
    { name: 'Solutions', href: '/products' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' },
    { name: 'Events', href: '/events' },
  ];

  const productLinks = [
    { name: 'Bundling & Wrapping', href: '/products/bundling-wrapping' },
    { name: 'Cartoning', href: '/products/cartoning' },
    { name: 'Case Packers', href: '/products/case-packers' },
    { name: 'Checkweighers', href: '/products/checkweighers' },
    { name: 'Inspection Systems', href: '/products/inspection' },
    { name: 'Conveying Solutions', href: '/products/conveying' },
  ];

  return (
    <footer className="relative overflow-hidden bg-gray-900 font-product-sans text-white">
      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:py-10 lg:py-12 sm:px-6 lg:px-8">
        
        {/* Mobile Layout - Single Column */}
        <div className="block lg:hidden space-y-8">
          {/* Company Info */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">
              Infinity Automated Solutions Pvt Ltd.
            </h3>
            <p className="text-gray-300 text-sm sm:text-base mb-4 leading-relaxed">
              Pioneering secondary packaging machines and end-of-line packaging automation solutions since 2016. Serving Food, FMCG, Personal Care, Textiles, and Pharmaceuticals with 800+ installations across India.
            </p>
            <div className="flex justify-center sm:justify-start">
              <SocialLinks variant="minimal" />
            </div>
          </div>

          {/* Contact Information - Priority for Mobile */}
          <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-medium mb-4 text-center sm:text-left">Contact Information</h3>
            <div className="space-y-3 text-sm sm:text-base text-gray-300">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="font-medium text-white mb-1 sm:mb-0 sm:mr-2">Address:</span>
                <div className="text-center sm:text-left">
                  <p>Plot No. 7 & 16, S. No-1556/1559,</p>
                  <p>Shelarwasti, Dehu-Alandi Road,</p>
                  <p>Chikhali, Tal-Haveli, Pune - 412114</p>
                  <p>Maharashtra, India</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="tel:+918484922042"
                  className="flex items-center justify-center sm:justify-start space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors touch-manipulation"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 84849 22042</span>
                </a>
                <a 
                  href="tel:+912067183300"
                  className="flex items-center justify-center sm:justify-start space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors touch-manipulation"
                >
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+91 20 6718 3300</span>
                </a>
              </div>
              <a 
                href="mailto:info@infinitysols.com"
                className="flex items-center justify-center sm:justify-start space-x-2 p-2 rounded-md hover:bg-gray-700 transition-colors touch-manipulation"
              >
                <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>info@infinitysols.com</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                {quickLinks.map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }}>
                    <Link 
                      href={link.href}
                      className="text-sm sm:text-base text-gray-300 transition-colors duration-300 hover:text-blue-400 block py-1 touch-manipulation"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Our Solutions</h3>
              <ul className="space-y-2 sm:space-y-3">
                {productLinks.slice(0, 4).map((link) => (
                  <motion.li key={link.name} whileHover={{ x: 5 }}>
                    <Link 
                      href={link.href}
                      className="text-sm sm:text-base text-gray-300 transition-colors duration-300 hover:text-blue-400 block py-1 touch-manipulation"
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
                <motion.li whileHover={{ x: 5 }}>
                  <Link 
                    href="/products"
                    className="text-sm sm:text-base text-blue-400 font-medium hover:text-blue-300 transition-colors duration-300 block py-1 touch-manipulation"
                  >
                    View All Solutions →
                  </Link>
                </motion.li>
              </ul>
            </div>
          </div>

          {/* Dashboard Login */}
          <div className="text-center">
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 touch-manipulation"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Dashboard Login
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Desktop/Tablet Layout - Grid */}
        <div className="hidden lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex flex-col space-y-4">
              <span className="text-xl font-medium">Infinity Automated Solutions Pvt Ltd.</span>
              <p className="text-gray-300 text-sm leading-relaxed">
                Pioneering secondary packaging machines and end-of-line packaging automation solutions since 2016. Serving Food, FMCG, Personal Care, Textiles, and Pharmaceuticals with 800+ installations across India.
              </p>
              <SocialLinks variant="minimal" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors duration-300 hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Our Solutions</h3>
            <ul className="space-y-2">
              {productLinks.map((link) => (
                <motion.li key={link.name} whileHover={{ x: 5 }}>
                  <Link 
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors duration-300 hover:text-blue-400"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact & Login */}
          <div>
            <h3 className="mb-4 text-lg font-medium">Contact & Access</h3>
            <div className="mb-6 space-y-2 text-sm text-gray-300">
              <p>Plot No. 7 & 16, S. No-1556/1559,</p>
              <p>Shelarwasti, Dehu-Alandi Road,</p>
              <p>Chikhali, Tal-Haveli,</p>
              <p>Pune - 412114</p>
              <p>Maharashtra, India</p>
              <p className="pt-2">
                <a 
                  href="tel:+918484922042"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  +91 84849 22042
                </a>
              </p>
              <p>
                <a 
                  href="tel:+912067183300"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  +91 20 6718 3300
                </a>
              </p>
              <p>
                <a 
                  href="mailto:info@infinitysols.com"
                  className="transition-colors duration-300 hover:text-blue-400"
                >
                  info@infinitysols.com
                </a>
              </p>
            </div>
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center rounded-md bg-blue-600 px-6 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700"
              >
                <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Dashboard Login
              </motion.button>
            </Link>
          </div>
        </div>

        {/* Copyright and Credits */}
        <div className="mt-8 sm:mt-10 lg:mt-12 border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col items-center justify-between space-y-3 sm:space-y-4 lg:space-y-0 text-xs sm:text-sm text-gray-400 lg:flex-row">
            <p className="text-center lg:text-left">
              © {currentYear} Infinity Automated Solutions Pvt Ltd. All rights reserved.
            </p>
            <div className="flex items-center justify-center lg:justify-start space-x-1 text-center whitespace-nowrap">
              <span className="text-sm">Designed with ❤️ by</span>
              <a
                href="https://www.linkedin.com/in/jkatariya/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-400 transition-colors duration-300 hover:text-blue-300 touch-manipulation text-sm"
              >
                Jay Katariya
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 