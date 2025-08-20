'use client';

import { useEffect, useState } from 'react';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onLoad?: () => void;
  className?: string;
}

const ReCaptchaFixed: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [loadError, setLoadError] = useState(false);
  const [ReCAPTCHAComponent, setReCAPTCHAComponent] = useState<any>(null);

  useEffect(() => {
    setMounted(true);
    
    // Load the component dynamically
    const loadReCAPTCHA = async () => {
      try {
        const ReCAPTCHA = (await import('react-google-recaptcha')).default;
        setReCAPTCHAComponent(() => ReCAPTCHA);
        if (onLoad) onLoad();
      } catch (error) {
        console.error('Failed to load reCAPTCHA:', error);
        setLoadError(true);
      }
    };

    // Wait for the script to be available
    const checkAndLoad = () => {
      if (typeof window !== 'undefined' && window.grecaptcha) {
        loadReCAPTCHA();
      } else {
        setTimeout(checkAndLoad, 100);
      }
    };

    checkAndLoad();
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
          <p className="text-xs">Please refresh the page and try again.</p>
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

  if (!ReCAPTCHAComponent) {
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
      <ReCAPTCHAComponent
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

export default ReCaptchaFixed;
