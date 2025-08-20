'use client';

import { useEffect, useState } from 'react';
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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

  if (!mounted) {
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
