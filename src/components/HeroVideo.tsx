'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroVideo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [videoError, setIsVideoError] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    // Start video loading immediately
    const video = document.createElement('video');
    video.preload = 'auto'; // Changed from 'metadata' to 'auto' for faster loading
    video.muted = true;
    video.playsInline = true;
    
    const source = document.createElement('source');
    source.src = 'https://res.cloudinary.com/dbogkgabu/video/upload/f_auto,q_auto/v1755704149/faxduvzp9blvwattzpjx.mov';
    source.type = 'video/mp4';
    video.appendChild(source);
    
    const handleCanPlay = () => {
      console.log('Video can play - preloading successful');
      setIsVideoLoaded(true);
      setIsInitialLoad(false);
    };
    
    const handleError = (error: any) => {
      console.error('Video preload error:', error);
      setIsVideoError(true);
      setIsInitialLoad(false);
    };
    
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);
    
    video.load();
    
    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    // Hide initial loading state after a short delay if video hasn't loaded
    const timer = setTimeout(() => {
      setIsInitialLoad(false);
    }, 1000);

    // Add a timeout for video loading
    const videoTimeout = setTimeout(() => {
      if (!isVideoLoaded) {
        console.log('Video loading timeout - falling back to background');
        setIsVideoError(true);
        setIsInitialLoad(false);
      }
    }, 3000); // Reduced timeout to 3 seconds for faster fallback

    return () => {
      clearTimeout(timer);
      clearTimeout(videoTimeout);
    };
  }, [isVideoLoaded]);

  const handleVideoError = (error?: any) => {
    console.error('Video failed to load:', error);
    setIsVideoError(true);
    setIsInitialLoad(false);
  };

  return (
    <div className="relative h-[65vh] sm:h-[75vh] lg:h-[80vh] w-full overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        {/* Lighter gradient overlay for better video visibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/20 to-black/30 z-10" />
        
        {/* Video Background */}
        {!videoError ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              crossOrigin="anonymous"
              poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkyMCIgaGVpZ2h0PSIxMDgwIiB2aWV3Qm94PSIwIDAgMTkyMCAxMDgwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JhZGllbnQpIi8+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIxMDAlIiB5Mj0iMTAwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6IzBmNDI3NztzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjUwJSIgc3R5bGU9InN0b3AtY29sb3I6IzBmNDI3NztzdG9wLW9wYWNpdHk6MC44IiAvPjxzdG9wIG9mZnNldD0iMTAwJSIgc3R5bGU9InN0b3AtY29sb3I6IzVkYzAyNztzdG9wLW9wYWNpdHk6MSIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48L3N2Zz4="
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isVideoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoadedData={() => {
                console.log('Video loaded successfully');
                setIsVideoLoaded(true);
                setIsInitialLoad(false);
              }}
              onCanPlay={() => {
                console.log('Video can play');
                setIsVideoLoaded(true);
                setIsInitialLoad(false);
              }}
              onError={(e) => {
                console.error('Video element error:', e);
                handleVideoError(e);
              }}
              style={{
                willChange: 'transform, opacity',
                transform: 'translateZ(0) scale(1.1)', // Zoom in the video slightly
              }}
            >
              <source
                src="https://res.cloudinary.com/dbogkgabu/video/upload/f_auto,q_auto/v1755704149/faxduvzp9blvwattzpjx.mov"
                type="video/mp4"
              />
              <source
                src="https://res.cloudinary.com/dbogkgabu/video/upload/f_webm,q_auto/v1755704149/faxduvzp9blvwattzpjx.mov"
                type="video/webm"
              />
              <source
                src="https://res.cloudinary.com/dbogkgabu/video/upload/v1755704149/faxduvzp9blvwattzpjx.mov"
                type="video/quicktime"
              />
              Your browser does not support the video tag.
            </video>
            {!isVideoLoaded && !videoError && (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-green-900">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white/80 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-sm text-white/70">Loading video...</p>
                  </div>
                </div>
              </div>
            )}
            {videoError && (
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-green-900">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <p className="text-sm text-white/70">Video unavailable</p>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue-900 via-brand-blue-800 to-brand-green-900">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <p className="text-sm text-white/70">Video unavailable</p>
              </div>
            </div>
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