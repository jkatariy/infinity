'use client';

import { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onVerify: (token: string | null) => void;
  className?: string;
}

const ReCaptcha: React.FC<ReCaptchaProps> = ({ onVerify, className = '' }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    // Reset reCAPTCHA when component mounts
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  }, []);

  const handleChange = (token: string | null) => {
    onVerify(token);
  };

  return (
    <div className={`flex justify-center ${className}`}>
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6Lf8qKwrAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO"
        onChange={handleChange}
        theme="light"
        size="normal"
      />
    </div>
  );
};

export default ReCaptcha;
