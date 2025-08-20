'use client';

import { useState } from 'react';

interface EnvInfo {
  ZOHO_CLIENT_ID: string;
  ZOHO_CLIENT_SECRET: string;
  ZOHO_REDIRECT_URI: string;
  ZOHO_ACCOUNTS_URL: string;
  ZOHO_API_DOMAIN: string;
  ZOHO_SCOPE: string;
  ZOHO_OAUTH_STATE: string;
  NODE_ENV: string;
  hostname: string;
  isProduction: boolean;
  error?: string;
}

interface OAuthInfo {
  oauthUrl: string;
  components: {
    base_url: string;
    client_id: string;
    redirect_uri: string;
    scope: string;
    state: string;
  };
  success?: boolean;
  error?: string;
}

export default function DebugEnvPage() {
  const [envInfo, setEnvInfo] = useState<EnvInfo | null>(null);
  const [oauthInfo, setOauthInfo] = useState<OAuthInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const checkEnvironment = async () => {
    setIsLoading(true);
    setError(null); // Clear previous errors
    try {
      const [envResponse, oauthResponse] = await Promise.all([
        fetch('/api/debug-env'),
        fetch('/api/debug-oauth')
      ]);
      
      const envResult = await envResponse.json();
      const oauthResult = await oauthResponse.json();
      
      setEnvInfo(envResult);
      setOauthInfo(oauthResult);
    } catch (error) {
      console.error('Error fetching environment info:', error);
      setEnvInfo(null);
      setError('Failed to fetch environment info');
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

      {error && (
        <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

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

          {oauthInfo && (
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-red-900">OAuth URL Debug</h2>
              
              {oauthInfo.success ? (
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Generated OAuth URL:</h3>
                    <div className="bg-white p-3 rounded border font-mono text-sm break-all">
                      {oauthInfo.oauthUrl}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold mb-2">URL Components:</h3>
                    <div className="space-y-1 text-sm">
                      {Object.entries(oauthInfo.components).map(([key, value]) => (
                        <div key={key} className="flex">
                          <span className="text-gray-600 w-32">{key}:</span>
                          <span className="font-mono">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => window.open(oauthInfo.oauthUrl, '_blank')}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      🔗 Test This OAuth URL
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-red-800">
                  <p>❌ Error generating OAuth URL:</p>
                  <p className="font-mono text-sm mt-2">{oauthInfo.error}</p>
                </div>
              )}
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-3">Expected URLs for Production:</h3>
            <div className="space-y-2 text-sm">
              <div><strong>OAuth Start:</strong> https://infinitysols.com/api/oauth/authorize</div>
              <div><strong>OAuth Callback:</strong> https://infinitysols.com/api/oauth/callback</div>
              <div><strong>Send to Zoho:</strong> https://infinitysols.com/api/sendToZoho</div>
              <div><strong>Test Page:</strong> https://infinitysols.com/test-zoho</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-lg">
            <h3 className="font-semibold text-yellow-900 mb-3">Required in Zoho API Console:</h3>
            <div className="space-y-2 text-sm font-mono">
              <div>✅ https://infinitysols.com/api/oauth/callback</div>
              <div>✅ http://localhost:3000/api/oauth/callback (for development)</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
