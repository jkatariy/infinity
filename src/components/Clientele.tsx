'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const clientLogos = [
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950542/clients1_kquq9t.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950542/clients2_ztnmxr.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950542/clients3_vdtct2.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950542/clients4_uppzyn.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients5_qfyugt.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients6_lk5lx5.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients7_s7g9ri.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients8_xxlir6.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950544/clients9_vk1twu.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950542/clients_10_pmr8k9.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients11_fk21g0.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients12_exqc92.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients13_suluse.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950543/clients14_vgecqj.png",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950544/clients15_fn2wrl.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950544/clients16_tyb2aw.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950544/clients19_ffcyah.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950544/clients20_rdappn.jpg",
  "https://res.cloudinary.com/dbogkgabu/image/upload/f_auto,q_auto/v1752950544/clients21_phekt2.png"
];

const Clientele = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= clientLogos.length - 6 ? 0 : prevIndex + 1
      );
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Create a duplicate array for seamless infinite scroll
  const duplicatedLogos = [...clientLogos, ...clientLogos];

  return (
    <section className="relative overflow-hidden bg-gray-50 py-20 [content-visibility:auto] [contain-intrinsic-size:1px_600px]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ['0px 0px', '100px 100px'],
          }}
          transition={{
            duration: 20,
            ease: "linear",
            repeat: Infinity,
          }}
          style={{
            backgroundImage: 'linear-gradient(45deg, #0f4277 25%, transparent 25%), linear-gradient(-45deg, #0f4277 25%, transparent 25%)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6"
        >
          <div className="inline-block relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
              Trusted by Industry Leaders
            </h2>
            {/* Accent line below title */}
            <motion.div 
              className="absolute -bottom-2 left-1/2 h-1 bg-brand-blue-500 transform -translate-x-1/2"
              initial={{ width: 0 }}
              whileInView={{ width: 100 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
          <p className="text-gray-600 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-4 sm:mt-6 leading-relaxed">
            Leading global brands choose our automation solutions to optimize their packaging processes and enhance operational efficiency.
          </p>
        </motion.div>

        {/* Client Logos Slider */}
        <div className="relative mx-4 sm:mx-0">
          <div className="overflow-hidden bg-white border-2 border-gray-200 rounded-lg p-4 sm:p-6 md:p-8">
            {/* Engineering corner accents */}
            <div className="absolute -top-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-brand-blue-500"></div>
            <div className="absolute -top-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-brand-blue-500"></div>
            <div className="absolute -bottom-1 -left-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-brand-blue-500"></div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-8 sm:h-8 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-brand-blue-500"></div>
            
            {/* Top accent line */}
            <div className="absolute top-0 left-6 right-6 sm:left-8 sm:right-8 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent"></div>
            <div className="absolute bottom-0 left-6 right-6 sm:left-8 sm:right-8 h-0.5 sm:h-1 bg-gradient-to-r from-transparent via-brand-blue-500 to-transparent"></div>

            <div className="flex animate-scroll">
              <motion.div 
                className="flex space-x-8 min-w-max"
                animate={{ 
                  x: `-${currentIndex * 120}px`
                }}
                transition={{ 
                  duration: 0.5,
                  ease: "linear"
                }}
              >
                {duplicatedLogos.map((logo, index) => (
                  <div
                    key={index}
                    className="relative flex-shrink-0 w-32 h-24 bg-white border border-gray-200 rounded-lg p-4 hover:border-brand-blue-500 hover:shadow-lg transition-all duration-300 group"
                  >
                    {/* Corner accents */}
                    <div className="absolute -top-0.5 -left-0.5 w-3 h-3 border-t-2 border-l-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -top-0.5 -right-0.5 w-3 h-3 border-t-2 border-r-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-0.5 -left-0.5 w-3 h-3 border-b-2 border-l-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-b-2 border-r-2 border-brand-green-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <Image
                      src={logo}
                      alt={`Client ${index + 1}`}
                      width={80}
                      height={48}
                      loading="lazy"
                      sizes="(max-width: 640px) 96px, 128px"
                      className="w-full h-full object-contain filter group-hover:grayscale transition-all duration-300"
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-blue-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">400+ Global Clients</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-green-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">800+ Installations Delivered</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-brand-blue-400 rounded-full"></div>
              <span className="text-gray-700 font-medium">10+ Years of Excellence</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clientele; 