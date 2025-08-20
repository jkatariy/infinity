'use client';

import { useEffect, useState, useRef } from 'react';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onLoad?: () => void;
  className?: string;
}

const ReCaptchaBulletproof: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    setMounted(true);
    
    let retryCount = 0;
    const maxRetries = 50; // 5 seconds max
    
    const loadReCAPTCHA = async () => {
      try {
        // Check if script is loaded
        if (typeof window === 'undefined' || !window.grecaptcha) {
          retryCount++;
          if (retryCount >= maxRetries) {
            console.error('ReCaptcha: Script not available after max retries');
            setLoadError(true);
            setIsLoading(false);
            return;
          }
          setTimeout(loadReCAPTCHA, 100);
          return;
        }

        // Import the component
        const { default: ReCAPTCHA } = await import('react-google-recaptcha');
        
        // Create the component manually
        if (containerRef.current && !containerRef.current.hasChildNodes()) {
          const recaptchaElement = document.createElement('div');
          containerRef.current.appendChild(recaptchaElement);
          
          // Use grecaptcha.render directly
          const widgetId = window.grecaptcha.render(recaptchaElement, {
            sitekey: '6Lf8qKwrAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO',
            theme: 'light',
            size: 'normal',
            callback: (token: string) => {
              console.log('ReCaptcha: Token received');
              onVerify(token);
            },
            'expired-callback': () => {
              console.log('ReCaptcha: Token expired');
              onVerify(null);
            },
            'error-callback': () => {
              console.error('ReCaptcha: Error occurred');
              setLoadError(true);
              onVerify(null);
            }
          });
          
          console.log('ReCaptcha: Component rendered successfully');
          setIsLoading(false);
          if (onLoad && !hasLoadedRef.current) {
            hasLoadedRef.current = true;
            onLoad();
          }
        }
      } catch (error) {
        console.error('Failed to load reCAPTCHA:', error);
        setLoadError(true);
        setIsLoading(false);
      }
    };

    loadReCAPTCHA();
  }, []); // No dependencies to prevent re-renders

  const handleRefresh = () => {
    setLoadError(false);
    setIsLoading(true);
    hasLoadedRef.current = false;
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    window.location.reload();
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
          <p className="text-xs">Please refresh the page and try again.</p>
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

export default ReCaptchaBulletproof;
