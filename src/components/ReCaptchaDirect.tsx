'use client';

import { useEffect, useState, useRef } from 'react';
import { RECAPTCHA_CONFIG, getCurrentDomain, isDomainAllowed } from '../lib/recaptcha-config';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onLoad?: () => void;
  className?: string;
}

const ReCaptchaDirect: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
    
    // Debug information
    console.log('ReCaptchaDirect: Current domain:', getCurrentDomain());
    console.log('ReCaptchaDirect: Domain allowed:', isDomainAllowed());
    console.log('ReCaptchaDirect: Site key:', RECAPTCHA_CONFIG.SITE_KEY);
    
    const loadReCAPTCHA = () => {
      try {
        // Check if script is loaded
        if (typeof window === 'undefined' || !window.grecaptcha) {
          console.log('ReCaptchaDirect: Script not available, retrying...');
          setTimeout(loadReCAPTCHA, 200);
          return;
        }

        console.log('ReCaptchaDirect: Script available, rendering...');
        
        // Clear container
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Use grecaptcha.render directly
        if (containerRef.current) {
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: RECAPTCHA_CONFIG.SITE_KEY,
            theme: 'light',
            size: 'normal',
            callback: (token: string) => {
              console.log('ReCaptchaDirect: Token received');
              onVerify(token);
            },
            'expired-callback': () => {
              console.log('ReCaptchaDirect: Token expired');
              onVerify(null);
            },
            'error-callback': () => {
              console.error('ReCaptchaDirect: Error occurred');
              setLoadError(true);
              onVerify(null);
            }
          });
          
          console.log('ReCaptchaDirect: Component rendered successfully, widget ID:', widgetIdRef.current);
          setIsLoading(false);
          if (onLoad) {
            onLoad();
          }
        }
      } catch (error) {
        console.error('ReCaptchaDirect: Failed to load reCAPTCHA:', error);
        setLoadError(true);
        setIsLoading(false);
      }
    };

    // Start loading after a short delay to ensure DOM is ready
    setTimeout(loadReCAPTCHA, 100);
  }, []); // No dependencies to prevent re-renders

  const handleRefresh = () => {
    setLoadError(false);
    setIsLoading(true);
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    if (widgetIdRef.current && window.grecaptcha) {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
      } catch (e) {
        console.log('Could not reset widget, reloading page');
        window.location.reload();
      }
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
            onClick={handleRefresh}
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
      <div ref={containerRef} className="recaptcha-container"></div>
    </div>
  );
};

export default ReCaptchaDirect;
