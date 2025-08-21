'use client';

import { useState, useEffect } from 'react';

export default function RestoreWorkingZohoPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/restore-working-zoho');
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
      const response = await fetch('/api/restore-working-zoho', {
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

  const testGlobalServer = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/restore-working-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_global_server' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🌍 ${data.message}`);
        // Generate OAuth URL for global server
        const oauthUrl = `${data.testConfig.accountsUrl}/oauth/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID || 'YOUR_CLIENT_ID'}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(data.testConfig.redirectUri)}&access_type=offline`;
        window.open(oauthUrl, '_blank');
        setMessage(prev => prev + ' - OAuth window opened for global server!');
      } else {
        setMessage(`❌ Failed to test global server: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test global server');
    } finally {
      setLoading(false);
    }
  };

  const testIndianServer = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/restore-working-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_indian_server' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🇮🇳 ${data.message}`);
        // Generate OAuth URL for Indian server
        const oauthUrl = `${data.testConfig.accountsUrl}/oauth/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_ZOHO_CLIENT_ID || 'YOUR_CLIENT_ID'}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(data.testConfig.redirectUri)}&access_type=offline`;
        window.open(oauthUrl, '_blank');
        setMessage(prev => prev + ' - OAuth window opened for Indian server!');
      } else {
        setMessage(`❌ Failed to test Indian server: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test Indian server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔧 Restore Working Zoho Configuration</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">📋 Issue Analysis</h2>
        <p className="mb-4">
          Your Zoho CRM was working in commit <code className="bg-gray-200 px-2 py-1 rounded">d368dd9</code> 
          but stopped working after we changed the configuration to use the Indian Zoho server (.in).
        </p>
        <p className="mb-4">
          <strong>Root Cause:</strong> Your existing tokens were generated for the global Zoho server (.com) 
          but we're now trying to use them with the Indian server (.in), which causes "invalid oauth token" errors.
        </p>
        <p>
          <strong>Solution:</strong> We need to either use the global server (which was working) or 
          re-authenticate with the Indian server (which requires new tokens).
        </p>
      </div>
      
      <div className="mb-8">
        <button
          onClick={loadDebugData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Refresh Debug Data
        </button>
        
        <button
          onClick={clearTokens}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400 mr-4"
        >
          🗑️ Clear All Tokens
        </button>
        
        <button
          onClick={testGlobalServer}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🌍 Test Global Server (.com)
        </button>
        
        <button
          onClick={testIndianServer}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
        >
          🇮🇳 Test Indian Server (.in)
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
          {/* Server Type */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🌐 Server Configuration:</h3>
            <div className="space-y-2">
              <div><strong>Current Server Type:</strong> {debugData.debug.serverType}</div>
              <div><strong>Accounts URL:</strong> {debugData.debug.currentEnvironment.ZOHO_ACCOUNTS_URL || 'Not set'}</div>
              <div><strong>API Domain:</strong> {debugData.debug.currentEnvironment.ZOHO_API_DOMAIN || 'Not set'}</div>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔧 Environment Variables:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(debugData.debug.currentEnvironment).map(([key, value]) => (
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
        <h3 className="font-semibold mb-2">📋 Quick Fix Options:</h3>
        <div className="space-y-4">
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-green-600">🌍 Option 1: Use Global Server (Recommended)</h4>
            <p className="text-sm mb-2">This was working before. Update your Vercel environment variables:</p>
            <div className="bg-gray-100 p-2 rounded font-mono text-xs">
              ZOHO_ACCOUNTS_URL=https://accounts.zoho.com<br/>
              ZOHO_API_DOMAIN=https://www.zohoapis.com
            </div>
            <button onClick={testGlobalServer} className="mt-2 bg-green-600 text-white px-4 py-2 rounded text-sm">
              Test Global Server
            </button>
          </div>
          
          <div className="bg-white p-4 rounded border">
            <h4 className="font-semibold text-purple-600">🇮🇳 Option 2: Use Indian Server</h4>
            <p className="text-sm mb-2">Update your Vercel environment variables and re-authenticate:</p>
            <div className="bg-gray-100 p-2 rounded font-mono text-xs">
              ZOHO_ACCOUNTS_URL=https://accounts.zoho.in<br/>
              ZOHO_API_DOMAIN=https://www.zohoapis.in
            </div>
            <button onClick={testIndianServer} className="mt-2 bg-purple-600 text-white px-4 py-2 rounded text-sm">
              Test Indian Server
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
