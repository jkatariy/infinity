'use client';

import { useState, useEffect } from 'react';

export default function DebugCallbackPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [authCode, setAuthCode] = useState('');

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-oauth-callback');
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      setMessage('Failed to load debug data');
    } finally {
      setLoading(false);
    }
  };

  const simulateCallback = async () => {
    if (!authCode.trim()) {
      setMessage('❌ Please enter the authorization code from the OAuth URL');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/debug-oauth-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'simulate_callback',
          code: authCode.trim()
        })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message}`);
        if (data.wasStored) {
          setMessage(prev => prev + ' - Tokens were stored successfully!');
        } else {
          setMessage(prev => prev + ' - But tokens were not stored properly.');
        }
        setTimeout(loadDebugData, 1000);
      } else {
        setMessage(`❌ ${data.error}${data.details ? ` - ${data.details}` : ''}`);
      }
    } catch (error) {
      setMessage('❌ Failed to simulate callback');
    } finally {
      setLoading(false);
    }
  };

  const startAuthentication = () => {
    if (debugData?.debug?.callbackUrl) {
      // Generate OAuth URL
      const accountsUrl = debugData.debug.environment.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';
      const clientId = 'YOUR_CLIENT_ID'; // This will be replaced by the actual OAuth flow
      const redirectUri = debugData.debug.callbackUrl;
      
      const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
      
      window.open(oauthUrl, '_blank');
      setMessage('🔐 Authentication window opened! After completing authentication, copy the authorization code from the URL and paste it below.');
    } else {
      setMessage('❌ OAuth URL not available. Please check your environment variables.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 OAuth Callback Debug</h1>
      
      <div className="mb-8">
        <button
          onClick={loadDebugData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Refresh Debug Data
        </button>
        
        <button
          onClick={startAuthentication}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          🔐 Start Authentication
        </button>
      </div>

      {/* Authorization Code Input */}
      <div className="bg-yellow-50 p-4 rounded-md mb-6">
        <h3 className="font-semibold mb-2">🔑 Authorization Code:</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={authCode}
            onChange={(e) => setAuthCode(e.target.value)}
            placeholder="Paste the authorization code from the OAuth URL here..."
            className="flex-1 p-2 border rounded-md"
          />
          <button
            onClick={simulateCallback}
            disabled={loading || !authCode.trim()}
            className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
          >
            🧪 Simulate Callback
          </button>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          After completing OAuth, copy the "code" parameter from the callback URL and paste it above.
        </p>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      {debugData && (
        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔧 Environment Variables:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(debugData.debug.environment).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-white p-2 rounded border">
                  <span className="font-mono text-sm">{key}:</span>
                  <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {typeof value === 'boolean' ? (value ? '✅ Set' : '❌ Missing') : String(value || 'Not set')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Token Status */}
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔐 Token Status:</h3>
            <div className="space-y-2">
              <div><strong>Access Token:</strong> {debugData.debug.tokenStatus.hasAccessToken ? '✅ Present' : '❌ Missing'}</div>
              <div><strong>Refresh Token:</strong> {debugData.debug.tokenStatus.hasRefreshToken ? '✅ Present' : '❌ Missing'}</div>
              <div><strong>Token Valid:</strong> {debugData.debug.tokenStatus.accessTokenValid ? '✅ Valid' : '❌ Invalid'}</div>
              {debugData.debug.tokenStatus.accessTokenExpiresAt && (
                <div><strong>Expires At:</strong> {new Date(debugData.debug.tokenStatus.accessTokenExpiresAt * 1000).toLocaleString()}</div>
              )}
            </div>
          </div>

          {/* Stored Tokens */}
          {debugData.debug.storedTokens && (
            <div className="bg-yellow-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">💾 Stored Tokens:</h3>
              <div className="space-y-2">
                <div><strong>Has Access Token:</strong> {debugData.debug.storedTokens.hasAccessToken ? '✅ Yes' : '❌ No'}</div>
                <div><strong>Has Refresh Token:</strong> {debugData.debug.storedTokens.hasRefreshToken ? '✅ Yes' : '❌ No'}</div>
                {debugData.debug.storedTokens.accessTokenPreview && (
                  <div><strong>Access Token Preview:</strong> {debugData.debug.storedTokens.accessTokenPreview}</div>
                )}
                {debugData.debug.storedTokens.accessTokenExpiresAt && (
                  <div><strong>Expires At:</strong> {new Date(debugData.debug.storedTokens.accessTokenExpiresAt * 1000).toLocaleString()}</div>
                )}
              </div>
            </div>
          )}

          {/* Storage Test */}
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🧪 Storage Test:</h3>
            <div className="space-y-2">
              <div><strong>Token Storage:</strong> {debugData.debug.storageTest}</div>
            </div>
          </div>

          {/* URLs */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔗 URLs:</h3>
            <div className="space-y-2">
              <div><strong>Callback URL:</strong> <span className="font-mono text-sm">{debugData.debug.callbackUrl}</span></div>
              <div><strong>Token Exchange URL:</strong> <span className="font-mono text-sm">{debugData.debug.tokenExchangeUrl}</span></div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">💡 Recommendations:</h3>
            <ul className="list-disc list-inside space-y-1">
              {debugData.debug.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 How to Debug OAuth Callback:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "Refresh Debug Data" to see current status</li>
          <li>Check if all environment variables are set correctly</li>
          <li>Click "Start Authentication" to begin OAuth flow</li>
          <li>Complete authentication in the new window</li>
          <li>Copy the authorization code from the callback URL</li>
          <li>Paste the code in the input field above</li>
          <li>Click "Simulate Callback" to test token exchange and storage</li>
          <li>Check the results to see where the process failed</li>
        </ol>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔍 Finding the Authorization Code:</h3>
        <p className="text-sm mb-2">After completing OAuth, you'll be redirected to a URL like:</p>
        <div className="bg-white p-2 rounded border font-mono text-xs break-all">
          https://infinitysols.com/api/oauth/callback?code=YOUR_AUTHORIZATION_CODE&state=...
        </div>
        <p className="text-sm mt-2">Copy the value after <code>code=</code> and paste it in the input field above.</p>
      </div>
    </div>
  );
}
