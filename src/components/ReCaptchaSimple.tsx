'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { RECAPTCHA_CONFIG, getCurrentDomain, isDomainAllowed } from '../lib/recaptcha-config';

// Dynamic import with no SSR
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

const ReCaptchaSimple: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Debug information
    console.log('ReCaptchaSimple: Current domain:', getCurrentDomain());
    console.log('ReCaptchaSimple: Domain allowed:', isDomainAllowed());
    console.log('ReCaptchaSimple: Site key:', RECAPTCHA_CONFIG.SITE_KEY);
    
    // Check if grecaptcha is available
    const checkGrecaptcha = () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        console.log('ReCaptchaSimple: grecaptcha available');
        setScriptLoaded(true);
        if (onLoad) {
          onLoad();
        }
      } else {
        console.log('ReCaptchaSimple: grecaptcha not available, retrying...');
        setTimeout(checkGrecaptcha, 200);
      }
    };
    
    checkGrecaptcha();
  }, [onLoad]);

  const handleChange = (token: string | null) => {
    console.log('ReCaptchaSimple: Token changed:', token ? 'received' : 'null');
    onVerify(token);
  };

  const handleExpired = () => {
    console.log('ReCaptchaSimple: Token expired');
    onVerify(null);
  };

  const handleError = () => {
    console.error('ReCaptchaSimple: Error occurred');
    setLoadError(true);
    onVerify(null);
  };

  const handleLoad = () => {
    console.log('ReCaptchaSimple: Component loaded');
    setScriptLoaded(true);
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
          <p className="text-xs mb-2">Current domain: {getCurrentDomain()}</p>
          <p className="text-xs mb-2">Domain allowed: {isDomainAllowed() ? 'Yes' : 'No'}</p>
          <p className="text-xs">Please check reCAPTCHA configuration for this domain.</p>
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

  return (
    <div className={`flex justify-center ${className}`}>
      <ReCAPTCHA
        sitekey={RECAPTCHA_CONFIG.SITE_KEY}
        onChange={handleChange}
        onExpired={handleExpired}
        onError={handleError}
        onLoad={handleLoad}
        theme="light"
        size="normal"
      />
    </div>
  );
};

export default ReCaptchaSimple;
