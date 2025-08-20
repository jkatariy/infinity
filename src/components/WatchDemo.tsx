'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface WatchDemoProps {
  videoId?: string;
  title: string;
  hideTitle?: boolean;
}

export default function WatchDemo({ videoId = 'DEFAULT_VIDEO_ID', title, hideTitle = false }: WatchDemoProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [videoError, setVideoError] = useState(false);

  // Check if videoId is valid (not empty, not default, and is a proper YouTube ID format)
  const isValidVideoId = videoId && 
    videoId !== 'DEFAULT_VIDEO_ID' && 
    videoId.length >= 11 && 
    /^[a-zA-Z0-9_-]+$/.test(videoId);

  if (!isValidVideoId) {
    return (
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Watch Demo</h2>
        
        <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <h3 className="text-gray-900 font-medium">{title}</h3>
          </div>
          
          <div className="relative pt-[56.25%]">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center px-6 py-8">
                <svg 
                  className="w-12 h-12 text-gray-400 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-gray-600 font-medium mb-2">Demo Video Coming Soon</p>
                <p className="text-gray-500 text-sm">We're working on creating a demo video for this solution.</p>
                <div className="mt-4">
                  <a 
                    href="/contact?demo=true" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Request Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {!hideTitle && (
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">Watch Demo</h2>
      )}
      
      <div className="relative bg-white border border-gray-200 rounded-lg overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
        {/* Engineering corner accents */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-gray-300 group-hover:border-blue-400 transition-colors duration-300"></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gray-200 group-hover:bg-blue-500 transition-colors duration-300"></div>
        
        {/* Video title bar */}
        <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
          <h3 className="text-gray-900 font-medium">{title}</h3>
        </div>

        {/* Video container with aspect ratio */}
        <div className="relative pt-[56.25%]">
          {isLoading && !videoError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
            </div>
          )}
          {videoError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
              <div className="text-center px-6 py-8">
                <svg 
                  className="w-12 h-12 text-gray-400 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" 
                  />
                </svg>
                <p className="text-gray-600 font-medium mb-2">Video Temporarily Unavailable</p>
                <p className="text-gray-500 text-sm mb-4">This video may be private, removed, or have embedding restrictions.</p>
                <div className="space-x-3">
                  <a 
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                    Watch on YouTube
                  </a>
                  <a 
                    href="/contact?demo=true" 
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Request Live Demo
                  </a>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&fs=1&cc_load_policy=0&iv_load_policy=3&showinfo=0&autoplay=1&mute=1&loop=1&playlist=${videoId}`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              onLoad={() => setIsLoading(false)}
              onError={() => {
                setIsLoading(false);
                setVideoError(true);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
} 