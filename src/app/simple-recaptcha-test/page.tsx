'use client';

import { useState } from 'react';

export default function SimpleRecaptchaTest() {
  const [status, setStatus] = useState('Loading...');

  const handleVerify = (token: string) => {
    setStatus(`✅ reCAPTCHA verified! Token: ${token.substring(0, 20)}...`);
  };

  const handleError = () => {
    setStatus('❌ reCAPTCHA error');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Simple reCAPTCHA Test
          </h1>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Status: {status}</p>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">reCAPTCHA should appear below:</p>
          </div>

          {/* Simple reCAPTCHA div */}
          <div 
            className="g-recaptcha" 
            data-sitekey="6Lf8qKwrAAAAAAGybd9R6bg3zeLdXOCdrGDYiYNVO"
            data-callback={handleVerify}
            data-error-callback={handleError}
          ></div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-700">
              This is the simplest possible reCAPTCHA implementation using the data attributes approach.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
