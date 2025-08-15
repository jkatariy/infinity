'use client';

import { useState } from 'react';

export default function DebugEnvPage() {
  const [envInfo, setEnvInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkEnvironment = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/debug-env');
      const result = await response.json();
      setEnvInfo(result);
    } catch (error) {
      console.error('Error:', error);
      setEnvInfo({ error: 'Failed to fetch environment info' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Environment Debug Page</h1>
      
      <div className="mb-8">
        <button
          onClick={checkEnvironment}
          disabled={isLoading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isLoading ? 'Checking...' : 'Check Environment Variables'}
        </button>
      </div>

      {envInfo && (
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Environment Configuration</h2>
            <div className="space-y-2 font-mono text-sm">
              {Object.entries(envInfo).map(([key, value]) => (
                <div key={key} className="flex">
                  <span className="text-gray-600 w-40">{key}:</span>
                  <span className={value ? 'text-green-600' : 'text-red-600'}>
                    {typeof value === 'string' && value.length > 50 
                      ? `${value.substring(0, 47)}...` 
                      : String(value)
                    }
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Expected URLs for Production:</h3>
            <div className="space-y-2 text-sm">
              <div><strong>OAuth Start:</strong> https://infinitysols.vercel.app/api/oauth/authorize</div>
              <div><strong>OAuth Callback:</strong> https://infinitysols.vercel.app/api/oauth/callback</div>
              <div><strong>Send to Zoho:</strong> https://infinitysols.vercel.app/api/sendToZoho</div>
              <div><strong>Test Page:</strong> https://infinitysols.vercel.app/test-zoho</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-3">Required in Zoho API Console:</h3>
            <div className="space-y-2 text-sm font-mono">
              <div>✅ https://infinitysols.vercel.app/api/oauth/callback</div>
              <div>✅ http://localhost:3000/api/oauth/callback (for development)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
