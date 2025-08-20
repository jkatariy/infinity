'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import ReCAPTCHA to avoid SSR issues
const ReCAPTCHA = dynamic(() => import('react-google-recaptcha'), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300">
      <div className="text-gray-500 text-sm">Loading reCAPTCHA...</div>
    </div>
  ),
});

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onLoad?: () => void;
  className?: string;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    let retryCount = 0;
    const maxRetries = 30; // 6 seconds max (30 * 200ms)
    
    // Function to check if reCAPTCHA script is loaded
    const checkRecaptchaScript = () => {
      if (typeof window !== 'undefined') {
        // Check if grecaptcha object exists
        if (window.grecaptcha && window.grecaptcha.ready) {
          console.log('ReCaptcha: Script already loaded and ready');
          setScriptLoaded(true);
          setIsLoading(false);
          if (onLoad && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            onLoad();
          }
          return;
        }
        
        // Check if script tag exists
        const scriptTag = document.querySelector('script[src*="recaptcha/api.js"]');
        if (scriptTag) {
          console.log('ReCaptcha: Script tag found, waiting for load...');
          // Wait a bit more for the script to fully load
          setTimeout(() => {
            if (window.grecaptcha && window.grecaptcha.ready) {
              console.log('ReCaptcha: Script loaded after delay');
              setScriptLoaded(true);
              setIsLoading(false);
              if (onLoad && !hasLoadedRef.current) {
                hasLoadedRef.current = true;
                onLoad();
              }
            } else {
              retryCount++;
              if (retryCount >= maxRetries) {
                console.error('ReCaptcha: Script failed to load after max retries');
                setLoadError(true);
                setIsLoading(false);
              } else {
                console.log('ReCaptcha: Script still not ready, retrying...', retryCount);
                setTimeout(checkRecaptchaScript, 200);
              }
            }
          }, 500);
        } else {
          retryCount++;
          if (retryCount >= maxRetries) {
            console.error('ReCaptcha: Script tag not found after max retries');
            setLoadError(true);
            setIsLoading(false);
          } else {
            console.log('ReCaptcha: Script tag not found, retrying...', retryCount);
            setTimeout(checkRecaptchaScript, 200);
          }
        }
      }
    };

    // Start checking after a short delay to allow script to load
    setTimeout(checkRecaptchaScript, 100);
  }, []); // Remove onLoad from dependencies to prevent re-renders

  const handleChange = (token: string | null) => {
    console.log('ReCaptcha: Token received', token ? 'Yes' : 'No');
    onVerify(token);
  };

  const handleExpired = () => {
    console.log('ReCaptcha: Token expired');
    onVerify(null);
  };

  const handleError = () => {
    console.error('ReCaptcha: Error occurred');
    setLoadError(true);
    onVerify(null);
  };

  const handleLoad = () => {
    console.log('ReCaptcha: Component loaded successfully');
    setLoadError(false);
    setIsLoading(false);
    // Notify parent component that reCAPTCHA is loaded and ready
    if (onLoad && !hasLoadedRef.current) {
      hasLoadedRef.current = true;
      onLoad();
    }
  };

  if (!mounted) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="flex justify-center items-center h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300">
          <div className="text-gray-500 text-sm">Initializing reCAPTCHA...</div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="text-red-600 text-sm p-4 border border-red-200 rounded bg-red-50">
          <p className="font-medium mb-2">reCAPTCHA failed to load</p>
          <p className="text-xs">Please refresh the page and try again. If the problem persists, please contact support.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-2 px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  // Show loading state while script is not ready
  if (!scriptLoaded || isLoading) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="flex justify-center items-center h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300">
          <div className="text-gray-500 text-sm">Loading reCAPTCHA...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-center ${className}`}>
      <ReCAPTCHA
        sitekey="6Lf8qKwrAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO"
        onChange={handleChange}
        onExpired={handleExpired}
        onError={handleError}
        onLoad={handleLoad}
        theme="light"
        size="normal"
        tabindex={0}
      />
    </div>
  );
};

export default ReCaptcha;
