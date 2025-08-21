'use client';

import { useState, useEffect } from 'react';

export default function DebugOAuthPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-oauth-flow');
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      setMessage('Failed to load debug data');
    } finally {
      setLoading(false);
    }
  };

  const clearTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-oauth-flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear_tokens' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('🗑️ Tokens cleared successfully. Reloading debug data...');
        setTimeout(loadDebugData, 1000);
      } else {
        setMessage(`❌ Failed to clear tokens: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to clear tokens');
    } finally {
      setLoading(false);
    }
  };

  const testTokenStorage = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-oauth-flow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_token_storage' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🧪 Token storage test: ${data.message}`);
        setTimeout(loadDebugData, 1000);
      } else {
        setMessage(`❌ Token storage test failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Token storage test failed');
    } finally {
      setLoading(false);
    }
  };

  const startAuthentication = () => {
    if (debugData?.debug?.oauthUrl) {
      window.open(debugData.debug.oauthUrl, '_blank');
      setMessage('🔐 Authentication window opened! Please complete the authentication in the new window, then check the status here.');
    } else {
      setMessage('❌ OAuth URL not available. Please check your environment variables.');
    }
  };

  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/zoho-tokens');
      const data = await response.json();
      
      if (data.success && data.tokenStatus.hasAccessToken) {
        setMessage('✅ Authentication successful! You have a valid access token.');
      } else {
        setMessage('❌ No valid access token found. Please authenticate first.');
      }
    } catch (error) {
      setMessage('❌ Failed to check authentication status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 OAuth Flow Debug</h1>
      
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
          disabled={loading || !debugData?.debug?.oauthUrl}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🔐 Start Authentication
        </button>
        
        <button
          onClick={checkAuthStatus}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400 mr-4"
        >
          🔍 Check Auth Status
        </button>
        
        <button
          onClick={testTokenStorage}
          disabled={loading}
          className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 disabled:bg-yellow-400 mr-4"
        >
          🧪 Test Token Storage
        </button>
        
        <button
          onClick={clearTokens}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          🗑️ Clear Tokens
        </button>
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
                    {typeof value === 'boolean' ? (value ? '✅ Set' : '❌ Missing') : value || 'Not set'}
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

          {/* OAuth URL */}
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔗 OAuth URL:</h3>
            <div className="bg-white p-2 rounded border font-mono text-sm break-all">
              {debugData.debug.oauthUrl}
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

          {/* Debug Info */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">📊 Debug Info:</h3>
            <div className="text-sm">
              <div><strong>Timestamp:</strong> {debugData.debug.timestamp}</div>
              <div><strong>Success:</strong> {debugData.success ? '✅ Yes' : '❌ No'}</div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Troubleshooting Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "Refresh Debug Data" to see current status</li>
          <li>Check if all environment variables are set correctly</li>
          <li>Click "Test Token Storage" to verify database connectivity</li>
          <li>If tokens are present but invalid, click "Clear Tokens"</li>
          <li>Click "Start Authentication" to begin OAuth flow</li>
          <li>Complete authentication in the new window</li>
          <li>Click "Check Auth Status" to verify success</li>
        </ol>
      </div>
    </div>
  );
}
