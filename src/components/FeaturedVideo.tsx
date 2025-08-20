'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const FeaturedVideo = () => {
  // Remove isPlaying state since we'll autoplay immediately
  return (
    <section className="py-20 bg-gray-50 font-product-sans relative overflow-hidden [content-visibility:auto] [contain-intrinsic-size:1px_800px]">
      {/* Subtle background dots - much less visible */}
      <div className="absolute inset-0 opacity-10">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            backgroundPosition: ['0px 0px', '120px 120px'],
          }}
          transition={{
            duration: 60,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: `radial-gradient(circle, #3b82f6 1px, transparent 1px)`,
            backgroundSize: '120px 120px'
          }}>
        </motion.div>
      </div>

      {/* Minimal floating element */}
      <motion.div 
        className="absolute top-16 right-32 w-6 h-6 border border-blue-300 rotate-45 opacity-8"
        animate={{ 
          rotate: [45, 135, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Automation in Action
          </motion.h2>
          <motion.div 
            className="w-20 h-1 bg-blue-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
            See our advanced packaging automation systems in operation, delivering precision and efficiency
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Enhanced multi-layered border design */}
          <div className="relative p-2 bg-gradient-to-br from-blue-100 via-white to-blue-50 border-2 border-blue-200 shadow-xl">
            {/* Blue accent line */}
            <motion.div 
              className="absolute top-0 left-0 w-full h-1 bg-blue-500"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              style={{ originX: 0 }}
            />
            
            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 w-6 h-6 border-t-3 border-l-3 border-blue-500"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 border-t-3 border-r-3 border-blue-500"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-3 border-l-3 border-blue-500"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-3 border-r-3 border-blue-500"></div>
            
            <div className="relative bg-gray-900 aspect-video overflow-hidden group">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/Rhbk1_7EDXg?autoplay=1&mute=1&loop=1&playlist=Rhbk1_7EDXg&start=23&controls=0&modestbranding=1&rel=0"
                title="Automation in Action - Infinity Automated Solutions"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>

        {/* Enhanced call to action section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-600 mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">High Speed</h4>
              <p className="text-sm text-gray-600 font-light">Advanced automation delivering exceptional throughput</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-600 mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Precision</h4>
              <p className="text-sm text-gray-600 font-light">Consistent quality with minimal waste generation</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-4 border border-gray-200 hover:border-blue-300 transition-all duration-300 bg-white/50 backdrop-blur-sm"
            >
              <div className="w-12 h-12 bg-blue-100 border border-blue-300 flex items-center justify-center text-blue-600 mx-auto mb-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Reliability</h4>
              <p className="text-sm text-gray-600 font-light">Proven systems with maximum uptime performance</p>
            </motion.div>
          </div>


        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedVideo; 