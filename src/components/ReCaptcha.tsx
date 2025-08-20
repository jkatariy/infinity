'use client';

import { useRef, useEffect, useState } from 'react';
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
  className?: string;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onVerify, className = '' }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    // Check if reCAPTCHA script is loaded
    const checkRecaptchaLoaded = () => {
      if (typeof window !== 'undefined' && (window as any).grecaptcha) {
        setIsLoaded(true);
      } else {
        // If not loaded, try to load it
        loadRecaptchaScript();
      }
    };

    const loadRecaptchaScript = () => {
      if (typeof window === 'undefined') return;

      // Check if script is already loaded
      if (document.querySelector('script[src*="recaptcha"]')) {
        checkRecaptchaLoaded();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit';
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        setIsLoaded(true);
      };
      
      script.onerror = () => {
        setLoadError(true);
        console.error('Failed to load reCAPTCHA script');
      };

      document.head.appendChild(script);
    };

    checkRecaptchaLoaded();

    // No cleanup needed since we're not using ref
  }, []);

  const handleChange = (token: string | null) => {
    onVerify(token);
  };

  const handleExpired = () => {
    onVerify(null);
  };

  const handleError = () => {
    console.error('reCAPTCHA error occurred');
    onVerify(null);
  };

  if (loadError) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="text-red-600 text-sm p-4 border border-red-200 rounded bg-red-50">
          Failed to load reCAPTCHA. Please refresh the page and try again.
        </div>
      </div>
    );
  }

  if (!isLoaded) {
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
        theme="light"
        size="normal"
      />
    </div>
  );
};

export default ReCaptcha;
