'use client';

import { useState } from 'react';
import ReCaptcha from '../../components/ReCaptcha';

export default function TestReCaptchaPage() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Waiting for reCAPTCHA...');

  const handleVerify = (recaptchaToken: string | null) => {
    setToken(recaptchaToken);
    if (recaptchaToken) {
      setStatus('reCAPTCHA completed! Token: ' + recaptchaToken.substring(0, 20) + '...');
    } else {
      setStatus('reCAPTCHA failed or expired');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">reCAPTCHA Test Page</h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <h2 className="font-semibold text-blue-900 mb-2">Status:</h2>
            <p className="text-blue-800">{status}</p>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h2 className="font-semibold text-gray-900 mb-2">Token:</h2>
            <p className="text-gray-800 text-sm break-all">
              {token || 'No token yet'}
            </p>
          </div>

          <div className="border-t pt-4">
            <h2 className="font-semibold text-gray-900 mb-4">reCAPTCHA Widget:</h2>
            <ReCaptcha onVerify={handleVerify} />
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-md">
            <h3 className="font-semibold text-yellow-900 mb-2">Debug Info:</h3>
            <p className="text-yellow-800 text-sm">
              Check the browser console for detailed logs about the reCAPTCHA loading process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
