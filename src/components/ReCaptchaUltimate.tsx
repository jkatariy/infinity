'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { RECAPTCHA_CONFIG, getCurrentDomain, isDomainAllowed } from '../lib/recaptcha-config';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onLoad?: () => void;
  className?: string;
}

const ReCaptchaUltimate: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const maxRetries = 5;

  // Memoize callbacks to prevent re-renders
  const handleCallback = useCallback((token: string) => {
    console.log('ReCaptchaUltimate: Token received');
    onVerify(token);
  }, [onVerify]);

  const handleExpired = useCallback(() => {
    console.log('ReCaptchaUltimate: Token expired');
    onVerify(null);
  }, [onVerify]);

  const handleError = useCallback(() => {
    console.error('ReCaptchaUltimate: Error occurred');
    setLoadError(true);
    onVerify(null);
  }, [onVerify]);

  const handleLoad = useCallback(() => {
    console.log('ReCaptchaUltimate: Component loaded successfully');
    setIsLoading(false);
    if (onLoad) {
      onLoad();
    }
  }, [onLoad]);

  const loadReCAPTCHA = useCallback(() => {
    try {
      console.log('ReCaptchaUltimate: Attempting to load reCAPTCHA...');
      console.log('ReCaptchaUltimate: Current domain:', getCurrentDomain());
      console.log('ReCaptchaUltimate: Domain allowed:', isDomainAllowed());
      console.log('ReCaptchaUltimate: Site key:', RECAPTCHA_CONFIG.SITE_KEY);
      console.log('ReCaptchaUltimate: grecaptcha available:', typeof window !== 'undefined' && !!window.grecaptcha);

      // Check if script is loaded
      if (typeof window === 'undefined') {
        console.log('ReCaptchaUltimate: Window not available (SSR)');
        return;
      }

      if (!window.grecaptcha) {
        console.log('ReCaptchaUltimate: grecaptcha not available, retrying...');
        if (retryCount < maxRetries) {
          setRetryCount(prev => prev + 1);
          timeoutRef.current = setTimeout(loadReCAPTCHA, 500);
        } else {
          console.error('ReCaptchaUltimate: Max retries reached');
          setLoadError(true);
          setIsLoading(false);
        }
        return;
      }

      if (typeof window.grecaptcha.render !== 'function') {
        console.error('ReCaptchaUltimate: grecaptcha.render is not a function');
        setLoadError(true);
        setIsLoading(false);
        return;
      }

      console.log('ReCaptchaUltimate: Script available, rendering...');
      
      // Clear container
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      // Use grecaptcha.render directly
      if (containerRef.current) {
        try {
          widgetIdRef.current = window.grecaptcha.render(containerRef.current, {
            sitekey: RECAPTCHA_CONFIG.SITE_KEY,
            theme: 'light',
            size: 'normal',
            callback: handleCallback,
            'expired-callback': handleExpired,
            'error-callback': handleError
          });
          
          console.log('ReCaptchaUltimate: Component rendered successfully, widget ID:', widgetIdRef.current);
          
          // Verify the widget was actually created
          if (widgetIdRef.current !== null && widgetIdRef.current !== undefined) {
            handleLoad();
          } else {
            console.error('ReCaptchaUltimate: Widget ID is null/undefined');
            setLoadError(true);
            setIsLoading(false);
          }
        } catch (renderError) {
          console.error('ReCaptchaUltimate: Error during render:', renderError);
          setLoadError(true);
          setIsLoading(false);
        }
      } else {
        console.error('ReCaptchaUltimate: Container ref is null');
        setLoadError(true);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('ReCaptchaUltimate: Failed to load reCAPTCHA:', error);
      setLoadError(true);
      setIsLoading(false);
    }
  }, [retryCount, maxRetries, handleCallback, handleExpired, handleError, handleLoad]);

  useEffect(() => {
    setMounted(true);
    
    // Start loading after a short delay to ensure DOM is ready
    timeoutRef.current = setTimeout(loadReCAPTCHA, 100);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [loadReCAPTCHA]);

  const handleRefresh = () => {
    console.log('ReCaptchaUltimate: Refreshing...');
    setLoadError(false);
    setIsLoading(true);
    setRetryCount(0);
    
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    if (widgetIdRef.current && window.grecaptcha && typeof window.grecaptcha.reset === 'function') {
      try {
        window.grecaptcha.reset(widgetIdRef.current);
        console.log('ReCaptchaUltimate: Widget reset successfully');
      } catch (e) {
        console.log('ReCaptchaUltimate: Could not reset widget, reloading page');
        window.location.reload();
      }
    } else {
      // If we can't reset, reload the page
      window.location.reload();
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
        <div className="text-red-600 text-sm p-4 border border-red-200 rounded bg-red-50 max-w-md">
          <p className="font-medium mb-2">reCAPTCHA failed to load</p>
          <p className="text-xs mb-2">Current domain: {getCurrentDomain()}</p>
          <p className="text-xs mb-2">Domain allowed: {isDomainAllowed() ? 'Yes' : 'No'}</p>
          <p className="text-xs mb-2">Retry count: {retryCount}/{maxRetries}</p>
          <p className="text-xs mb-2">grecaptcha available: {typeof window !== 'undefined' && !!window.grecaptcha ? 'Yes' : 'No'}</p>
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
          <div className="text-gray-500 text-sm">
            Loading reCAPTCHA... {retryCount > 0 && `(Retry ${retryCount}/${maxRetries})`}
          </div>
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

export default ReCaptchaUltimate;
