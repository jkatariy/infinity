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

  useEffect(() => {
    // Set up global callbacks
    (window as any).recaptchaCallback = onVerify;
    (window as any).recaptchaErrorCallback = onError || (() => {});
    (window as any).recaptchaExpiredCallback = () => {
      if (onReset) onReset();
      if (onError) onError();
    };

    return () => {
      // Clean up global callbacks
      delete (window as any).recaptchaCallback;
      delete (window as any).recaptchaErrorCallback;
      delete (window as any).recaptchaExpiredCallback;
    };
  }, [onVerify, onError, onReset]);

  // Method to reset reCAPTCHA externally
  const reset = () => {
    if (window.grecaptcha) {
      window.grecaptcha.reset();
    }
  };

  // Expose reset method to parent component
  useImperativeHandle(ref, () => ({
    reset
  }));

  return (
    <div className="recaptcha-container flex justify-center my-4">
      <div 
        ref={recaptchaRef}
        className="g-recaptcha" 
        data-sitekey="6Lf8qKwrAAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO"
        data-callback="recaptchaCallback"
        data-error-callback="recaptchaErrorCallback"
        data-expired-callback="recaptchaExpiredCallback"
      ></div>
    </div>
  );
});

Recaptcha.displayName = 'Recaptcha';

export default Recaptcha;
