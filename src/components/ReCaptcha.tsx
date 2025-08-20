'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    setMounted(true);
    
    // Check if reCAPTCHA script is loaded
    const checkRecaptchaScript = () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        console.log('ReCaptcha: Script already loaded');
        setIsLoading(false);
        if (onLoad) onLoad();
      } else {
        console.log('ReCaptcha: Script not loaded yet, waiting...');
        setTimeout(checkRecaptchaScript, 100);
      }
    };

    checkRecaptchaScript();
  }, [onLoad]);

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
    if (onLoad) {
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

  if (isLoading) {
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
