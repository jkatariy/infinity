'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setIsVideoError] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    // Hide initial loading state after a short delay if video hasn't loaded
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mounted]);

  const handleVideoError = () => {
    console.error('Video failed to load');
    setIsVideoError(true);
    setIsInitialLoad(false);
  };

  // Don't render video until mounted on client to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 z-10" />
        <Image
          src="/videos/videoplayback-poster.jpg"
          alt="Packaging automation hero background"
          fill
          className="object-cover"
          priority
          fetchPriority="high"
        />
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-6xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 leading-tight"
            >
              Secondary Packaging Automation Excellence
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-6 sm:mb-8 text-gray-200 leading-relaxed"
            >
                              Pioneering end-of-line packaging solutions for Food, FMCG, Personal Care, Textiles, and Pharmaceuticals since 2015
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            >
              <Link
                href="/products"
                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg text-sm sm:text-base w-full sm:w-auto text-center"
              >
                Explore Solutions
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-blue-900 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto text-center"
              >
                Get Quote
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] sm:h-[80vh] lg:h-[85vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Lighter gradient overlay for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 z-10" />
        
        {/* Background content options */}
        {!videoError ? (
          <>
            <Image
              src="/videos/videoplayback-poster.jpg"
              alt="Packaging automation hero background"
              fill
              className={`object-cover transition-opacity duration-500 ${isVideoLoaded ? 'opacity-0' : 'opacity-100'}`}
              priority
              fetchPriority="high"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 100vw"
            />
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => {
                setIsVideoLoaded(true);
                setIsInitialLoad(false);
              }}
              onError={handleVideoError}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0)',
              }}
              poster="/videos/videoplayback-poster.jpg"
            >
              <source
                src="https://res.cloudinary.com/dbogkgabu/video/upload/v1755699809/o4w0fskzmtly06scu4z5.mov"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
            {!isVideoLoaded && !videoError && (
              <div className="absolute inset-0 bg-gray-900" />
            )}
            {videoError && (
              <div className="absolute inset-0 bg-gray-900 opacity-50" />
            )}
          </>
        ) : (
          <Image
            src="/videos/videoplayback-poster.jpg"
            alt="Packaging automation hero background"
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Loading indicator - only show during initial load */}
        {isInitialLoad && !isVideoLoaded && !videoError && (
          <div className="absolute inset-0 flex items-center justify-center z-5">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white/80 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {/* Mobile-First Responsive Content */}
      <div className="relative z-20 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Mobile Layout - Single Column */}
          <div className="lg:hidden flex items-center justify-center h-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}  // Reduced from 0.8
              className="relative bg-black/20 backdrop-blur-[2px] p-6 sm:p-8 border border-white/20 shadow-lg 
                         rounded-lg max-w-md mx-auto text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.15) 100%)',
                willChange: 'transform'  // Optimize for animations
              }}
            >
              {/* Mobile Engineering corner accents */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white/30"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white/30"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white/30"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white/30"></div>

              <div className="space-y-4">
                <h1 className="text-lg sm:text-xl font-medium text-white leading-relaxed tracking-wide">
                  <div className="mb-2 opacity-95">From concept to production,</div>
                  <div className="mb-2 opacity-95">we transform your</div>
                  <div className="mb-2 opacity-95">packaging challenges into</div>
                  <div className="text-green-400 font-semibold">automated success stories.</div>
                </h1>
                
                {/* Mobile CTA Button */}
                <div className="pt-4">
                  <Link 
                    href="/contact" 
                    className="inline-flex items-center px-6 py-3 bg-green-500/85 hover:bg-green-500 
                             text-white font-medium text-sm sm:text-base tracking-wide
                             transition-all duration-300 hover:shadow-md hover:shadow-green-500/20
                             border border-green-400/20 hover:border-green-400/40 rounded-lg">
                    GET STARTED →
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Desktop Layout - Two Columns */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-12 h-full items-center">
            {/* Left Box - Marketing Message */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative bg-black/15 backdrop-blur-sm p-12 border border-white/20 shadow-lg h-80"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
              }}
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/30"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/30"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/30"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/30"></div>

              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-2xl lg:text-3xl font-medium text-white leading-relaxed tracking-wide">
                    <div className="mb-2.5 opacity-95">From concept to production,</div>
                    <div className="mb-2.5 opacity-95">we transform your</div>
                    <div className="mb-2.5 opacity-95">packaging challenges</div>
                    <div className="mb-2.5 opacity-95">into automated</div>
                    <div className="text-green-400 font-semibold">success stories.</div>
                  </h1>
                </div>
              </div>
            </motion.div>

            {/* Right Box - Product Selector (Desktop Only) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative bg-black/15 backdrop-blur-sm p-12 border border-white/20 shadow-lg h-80"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.1) 100%)',
              }}
            >
              {/* Engineering corner accents */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-white/30"></div>
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-white/30"></div>
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-white/30"></div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-white/30"></div>
                  
              <div className="h-full flex flex-col justify-center items-center text-center">
                <div className="space-y-4 mb-8">
                  <h2 className="text-2xl lg:text-3xl font-semibold text-white tracking-wide">
                    Infinity Solution
                  </h2>
                  <h3 className="text-xl lg:text-2xl font-semibold text-green-400">
                    Selector
                  </h3>
                  <p className="text-base lg:text-lg text-white/80 leading-relaxed max-w-sm mx-auto px-2">
                    We offer bespoke solutions as well as tailoring our existing machines to suit your needs.
                  </p>
                </div>

                <Link 
                  href="/product-selector" 
                  className="inline-flex items-center px-8 py-3 bg-green-500/85 hover:bg-green-500 
                           text-white font-medium text-base tracking-wide
                           transition-all duration-300 hover:shadow-md hover:shadow-green-500/20
                           border border-green-400/20 hover:border-green-400/40">
                  FIND YOUR SOLUTION →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 