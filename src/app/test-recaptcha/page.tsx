'use client';

import { useState, useEffect } from 'react';
import ReCaptcha from '../../components/ReCaptcha';
import ReCaptchaSimple from '../../components/ReCaptchaSimple';
import ReCaptchaFixed from '../../components/ReCaptchaFixed';
import ReCaptchaBulletproof from '../../components/ReCaptchaBulletproof';

export default function TestReCaptchaPage() {
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('Initializing...');
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);
  const [scriptStatus, setScriptStatus] = useState<string>('Checking...');
  const [useSimple, setUseSimple] = useState(false);
  const [useFixed, setUseFixed] = useState(false);
  const [useBulletproof, setUseBulletproof] = useState(true);

  useEffect(() => {
    // Check script loading status
    const checkScript = () => {
      if (typeof window !== 'undefined') {
        if (window.grecaptcha && window.grecaptcha.ready) {
          setScriptStatus('✅ Script loaded and ready');
        } else {
          const scriptTag = document.querySelector('script[src*="recaptcha/api.js"]');
          if (scriptTag) {
            setScriptStatus('⏳ Script tag found, waiting for load...');
          } else {
            setScriptStatus('❌ Script tag not found');
          }
        }
      }
    };

    checkScript();
    const interval = setInterval(checkScript, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleVerify = (recaptchaToken: string | null) => {
    setToken(recaptchaToken);
    if (recaptchaToken) {
      setStatus('✅ reCAPTCHA verified successfully!');
    } else {
      setStatus('⚠️ reCAPTCHA token expired or reset');
    }
  };

  const handleLoad = () => {
    setRecaptchaLoaded(true);
    setStatus('✅ reCAPTCHA loaded and ready');
  };

  const testVerification = async () => {
    if (!token) {
      setStatus('❌ No token to verify');
      return;
    }

    setStatus('🔄 Verifying token...');
    try {
      const response = await fetch('/api/verify-recaptcha', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('✅ Token verified successfully!');
      } else {
        setStatus('❌ Token verification failed');
      }
    } catch (error) {
      setStatus('❌ Verification error: ' + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">reCAPTCHA Comprehensive Test</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h2 className="font-semibold text-blue-900 mb-2">Script Status:</h2>
              <p className="text-blue-700 text-sm">{scriptStatus}</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h2 className="font-semibold text-green-900 mb-2">Component Status:</h2>
              <p className="text-green-700 text-sm">{status}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h2 className="font-semibold text-purple-900 mb-2">reCAPTCHA Widget:</h2>
              <div className="mb-4 space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useSimple}
                    onChange={(e) => {
                      setUseSimple(e.target.checked);
                      if (e.target.checked) {
                        setUseFixed(false);
                        setUseBulletproof(false);
                      }
                    }}
                    className="mr-2"
                  />
                  Use Simple Component
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useFixed}
                    onChange={(e) => {
                      setUseFixed(e.target.checked);
                      if (e.target.checked) {
                        setUseSimple(false);
                        setUseBulletproof(false);
                      }
                    }}
                    className="mr-2"
                  />
                  Use Fixed Component
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={useBulletproof}
                    onChange={(e) => {
                      setUseBulletproof(e.target.checked);
                      if (e.target.checked) {
                        setUseSimple(false);
                        setUseFixed(false);
                      }
                    }}
                    className="mr-2"
                  />
                  Use Bulletproof Component (Recommended)
                </label>
              </div>
              {useSimple ? (
                <ReCaptchaSimple onVerify={handleVerify} onLoad={handleLoad} />
              ) : useFixed ? (
                <ReCaptchaFixed onVerify={handleVerify} onLoad={handleLoad} />
              ) : useBulletproof ? (
                <ReCaptchaBulletproof onVerify={handleVerify} onLoad={handleLoad} />
              ) : (
                <ReCaptcha onVerify={handleVerify} onLoad={handleLoad} />
              )}
            </div>
            
            <div className="p-4 bg-yellow-50 rounded-lg">
              <h2 className="font-semibold text-yellow-900 mb-2">Token (first 50 chars):</h2>
              <p className="text-yellow-700 font-mono text-sm break-all">
                {token ? token.substring(0, 50) + '...' : 'No token yet'}
              </p>
            </div>
            
            <div className="p-4 bg-indigo-50 rounded-lg">
              <h2 className="font-semibold text-indigo-900 mb-2">Test Actions:</h2>
              <div className="space-y-2">
                <button
                  onClick={testVerification}
                  disabled={!token}
                  className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Test Token Verification
                </button>
                <button
                  onClick={() => window.location.reload()}
                  className="ml-2 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                >
                  Reload Page
                </button>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 rounded-lg">
              <h2 className="font-semibold text-red-900 mb-2">Debug Instructions:</h2>
              <ul className="text-red-700 text-sm space-y-1">
                <li>• Open browser console (F12) to see detailed logs</li>
                <li>• Check for any error messages</li>
                <li>• Verify script loading status above</li>
                <li>• Test token verification with the button above</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
