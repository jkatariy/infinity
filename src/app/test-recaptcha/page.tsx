'use client';

import { useState, useRef } from 'react';
import Recaptcha, { RecaptchaRef } from '@/components/Recaptcha';

export default function TestRecaptchaPage() {
  const [recaptchaToken, setRecaptchaToken] = useState<string>('');
  const [recaptchaError, setRecaptchaError] = useState<string>('');
  const [testResult, setTestResult] = useState<string>('');
  const recaptchaRef = useRef<RecaptchaRef>(null);

  const handleRecaptchaVerify = (token: string) => {
    setRecaptchaToken(token);
    setRecaptchaError('');
    setTestResult('✅ reCAPTCHA verified successfully! Token received.');
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken('');
    setRecaptchaError('Please complete the reCAPTCHA verification');
    setTestResult('❌ reCAPTCHA verification failed');
  };

  const handleRecaptchaReset = () => {
    setRecaptchaToken('');
    setRecaptchaError('');
    setTestResult('');
  };

  const testCareersForm = async () => {
    if (!recaptchaToken) {
      setTestResult('❌ Please complete reCAPTCHA first');
      return;
    }

    try {
      const response = await fetch('/api/career-application', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '+91-9876543210',
          position_interested_in: 'Test Position',
          additional_info: 'This is a test application',
          recaptchaToken
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setTestResult('✅ Careers form test successful!');
      } else {
        setTestResult(`❌ Careers form test failed: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Network error: ${error}`);
    }
  };

  const testQuoteForm = async () => {
    if (!recaptchaToken) {
      setTestResult('❌ Please complete reCAPTCHA first');
      return;
    }

    try {
      const response = await fetch('/api/leads/quote-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test User',
          email: 'test@example.com',
          phone: '+91-9876543210',
          description: 'This is a test quote request',
          company: 'Test Company',
          product_name: 'Test Product',
          recaptchaToken
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setTestResult('✅ Quote form test successful!');
      } else {
        setTestResult(`❌ Quote form test failed: ${result.error}`);
      }
    } catch (error) {
      setTestResult(`❌ Network error: ${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            reCAPTCHA Test Page
          </h1>
          
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Environment Variables Status
              </h2>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Site Key:</span>
                  <span className={`text-sm ${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? 'text-green-600' : 'text-red-600'}`}>
                    {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Secret Key:</span>
                  <span className="text-sm text-gray-600">
                    {process.env.RECAPTCHA_SECRET_KEY ? '✅ Set (hidden)' : '❌ Missing'}
                  </span>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                reCAPTCHA Component Test
              </h2>
              
              <Recaptcha
                ref={recaptchaRef}
                onVerify={handleRecaptchaVerify}
                onError={handleRecaptchaError}
                onReset={handleRecaptchaReset}
              />

              {recaptchaError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-800">
                    {recaptchaError}
                  </p>
                </div>
              )}

              {recaptchaToken && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                  <p className="text-sm text-green-800">
                    ✅ reCAPTCHA token received (first 20 chars): {recaptchaToken.substring(0, 20)}...
                  </p>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                API Tests
              </h2>
              
              <div className="flex gap-4">
                <button
                  onClick={testCareersForm}
                  disabled={!recaptchaToken}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Careers Form
                </button>
                
                <button
                  onClick={testQuoteForm}
                  disabled={!recaptchaToken}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Test Quote Form
                </button>
              </div>
            </div>

            {testResult && (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <h3 className="font-medium text-gray-800 mb-2">Test Result:</h3>
                <p className="text-sm text-gray-700">{testResult}</p>
              </div>
            )}

            <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h3 className="font-medium text-blue-800 mb-2">Instructions:</h3>
              <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
                <li>Complete the reCAPTCHA verification above</li>
                <li>Test the careers form API endpoint</li>
                <li>Test the quote form API endpoint</li>
                <li>Check the results below</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
