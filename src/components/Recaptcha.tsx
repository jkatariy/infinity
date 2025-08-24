'use client';

import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

interface RecaptchaProps {
  onVerify: (token: string) => void;
  onError?: () => void;
  onReset?: () => void;
}

export interface RecaptchaRef {
  reset: () => void;
}

const Recaptcha = forwardRef<RecaptchaRef, RecaptchaProps>(({ onVerify, onError, onReset }, ref) => {
  const recaptchaRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);

  useEffect(() => {
    const loadRecaptcha = () => {
      if (window.grecaptcha && recaptchaRef.current && !widgetId.current) {
        widgetId.current = window.grecaptcha.render(recaptchaRef.current, {
          sitekey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
          callback: onVerify,
          'error-callback': onError,
          'expired-callback': () => {
            onReset && onReset();
            onError && onError();
          }
        });
      }
    };

    if (window.grecaptcha) {
      loadRecaptcha();
    } else {
      const script = document.createElement('script');
      script.src = 'https://www.google.com/recaptcha/api.js';
      script.async = true;
      script.defer = true;
      script.onload = loadRecaptcha;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetId.current && window.grecaptcha) {
        window.grecaptcha.reset(widgetId.current);
      }
    };
  }, [onVerify, onError, onReset]);

  // Method to reset reCAPTCHA externally
  const reset = () => {
    if (widgetId.current && window.grecaptcha) {
      window.grecaptcha.reset(widgetId.current);
    }
  };

  // Expose reset method to parent component
  useImperativeHandle(ref, () => ({
    reset
  }));

  return (
    <div className="recaptcha-container flex justify-center my-4">
      <div ref={recaptchaRef}></div>
    </div>
  );
});

Recaptcha.displayName = 'Recaptcha';

export default Recaptcha;
