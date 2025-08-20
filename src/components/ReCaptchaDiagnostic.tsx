'use client';

import { useEffect, useState, useRef } from 'react';
import { RECAPTCHA_CONFIG, getCurrentDomain, isDomainAllowed } from '../lib/recaptcha-config';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  onLoad?: () => void;
  className?: string;
}

const ReCaptchaDiagnostic: React.FC<ReCaptchaProps> = ({ onVerify, onLoad, className = '' }) => {
  const [mounted, setMounted] = useState(false);
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [loadError, setLoadError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const addDiagnostic = (message: string) => {
    console.log('ReCaptchaDiagnostic:', message);
    setDiagnostics(prev => [...prev, `${new Date().toISOString()}: ${message}`]);
  };

  useEffect(() => {
    setMounted(true);
    addDiagnostic('Component mounted');
    
    const runDiagnostics = async () => {
      try {
        addDiagnostic('Starting diagnostics...');
        
        // Check domain
        const currentDomain = getCurrentDomain();
        const domainAllowed = isDomainAllowed();
        addDiagnostic(`Current domain: ${currentDomain}`);
        addDiagnostic(`Domain allowed: ${domainAllowed}`);
        
        // Check site key
        addDiagnostic(`Site key: ${RECAPTCHA_CONFIG.SITE_KEY}`);
        addDiagnostic(`Site key length: ${RECAPTCHA_CONFIG.SITE_KEY.length}`);
        
        // Check window and grecaptcha
        if (typeof window === 'undefined') {
          addDiagnostic('ERROR: Window not available (SSR)');
          setLoadError(true);
          setIsLoading(false);
          return;
        }
        
        addDiagnostic('Window available');
        
        if (!window.grecaptcha) {
          addDiagnostic('ERROR: grecaptcha not available');
          setLoadError(true);
          setIsLoading(false);
          return;
        }
        
        addDiagnostic('grecaptcha available');
        
        // Check grecaptcha methods
        if (typeof window.grecaptcha.render !== 'function') {
          addDiagnostic('ERROR: grecaptcha.render is not a function');
          setLoadError(true);
          setIsLoading(false);
          return;
        }
        
        addDiagnostic('grecaptcha.render is a function');
        
        // Check container
        if (!containerRef.current) {
          addDiagnostic('ERROR: Container ref is null');
          setLoadError(true);
          setIsLoading(false);
          return;
        }
        
        addDiagnostic('Container ref available');
        
        // Clear container
        containerRef.current.innerHTML = '';
        addDiagnostic('Container cleared');
        
        // Try to render with detailed error handling
        try {
          addDiagnostic('Attempting grecaptcha.render...');
          
          const renderOptions = {
            sitekey: RECAPTCHA_CONFIG.SITE_KEY,
            theme: 'light' as const,
            size: 'normal' as const,
            callback: (token: string) => {
              addDiagnostic('SUCCESS: Token received');
              onVerify(token);
            },
            'expired-callback': () => {
              addDiagnostic('Token expired');
              onVerify(null);
            },
            'error-callback': () => {
              addDiagnostic('ERROR: reCAPTCHA error callback triggered');
              setLoadError(true);
              onVerify(null);
            }
          };
          
          addDiagnostic(`Render options: ${JSON.stringify(renderOptions, null, 2)}`);
          
          const widgetId = window.grecaptcha.render(containerRef.current, renderOptions);
          
          addDiagnostic(`SUCCESS: Widget rendered with ID: ${widgetId}`);
          
          // Verify widget was created
          if (widgetId !== null && widgetId !== undefined) {
            addDiagnostic('Widget ID is valid');
            setIsLoading(false);
            if (onLoad) {
              onLoad();
            }
          } else {
            addDiagnostic('ERROR: Widget ID is null/undefined');
            setLoadError(true);
            setIsLoading(false);
          }
          
        } catch (renderError) {
          addDiagnostic(`ERROR during render: ${renderError}`);
          addDiagnostic(`Error type: ${typeof renderError}`);
          addDiagnostic(`Error message: ${renderError instanceof Error ? renderError.message : 'Unknown error'}`);
          addDiagnostic(`Error stack: ${renderError instanceof Error ? renderError.stack : 'No stack'}`);
          setLoadError(true);
          setIsLoading(false);
        }
        
      } catch (error) {
        addDiagnostic(`ERROR in diagnostics: ${error}`);
        setLoadError(true);
        setIsLoading(false);
      }
    };
    
    // Run diagnostics after a short delay
    setTimeout(runDiagnostics, 100);
  }, [onVerify, onLoad]);

  const handleRefresh = () => {
    window.location.reload();
  };

  if (!mounted) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="flex justify-center items-center h-16 bg-gray-100 rounded border-2 border-dashed border-gray-300">
          <div className="text-gray-500 text-sm">Initializing diagnostics...</div>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className={`flex justify-center ${className}`}>
        <div className="text-red-600 text-sm p-4 border border-red-200 rounded bg-red-50 max-w-2xl">
          <p className="font-medium mb-2">reCAPTCHA Diagnostic Results</p>
          <div className="max-h-64 overflow-y-auto bg-gray-100 p-2 rounded text-xs font-mono">
            {diagnostics.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))}
          </div>
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
          <div className="text-gray-500 text-sm">Running diagnostics...</div>
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

export default ReCaptchaDiagnostic;
