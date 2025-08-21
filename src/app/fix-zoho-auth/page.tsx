'use client';

import { useState } from 'react';

export default function FixZohoAuthPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');

  const runDebug = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/debug-zoho');
      const data = await response.json();
      setDebugData(data);
      
      if (data.success) {
        setMessage('✅ Debug completed successfully');
      } else {
        setMessage(`❌ Debug failed: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Debug error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const clearTokens = async () => {
    setActionLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/zoho-tokens', {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ All tokens cleared successfully');
        await runDebug(); // Refresh debug data
      } else {
        setMessage(`❌ Failed to clear tokens: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error clearing tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const testAuthentication = async () => {
    setActionLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/zoho-tokens');
      const data = await response.json();
      
      if (data.success && data.tokenStatus.hasAccessToken && data.tokenStatus.accessTokenValid) {
        setMessage('✅ Authentication is working correctly!');
      } else {
        setMessage('❌ Authentication is not working. Please authenticate via the dashboard.');
      }
    } catch (error) {
      setMessage(`❌ Error testing authentication: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setActionLoading(false);
    }
  };

  const redirectToAuth = () => {
    window.location.href = '/dashboard/zoho-auth';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔧 Zoho Authentication Fix Tool</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <button
          onClick={runDebug}
          disabled={loading}
          className="bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Running Debug...' : '🔍 Run Debug Analysis'}
        </button>
        
        <button
          onClick={testAuthentication}
          disabled={actionLoading}
          className="bg-green-600 text-white p-4 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          {actionLoading ? 'Testing...' : '✅ Test Authentication'}
        </button>
        
        <button
          onClick={clearTokens}
          disabled={actionLoading}
          className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          {actionLoading ? 'Clearing...' : '🗑️ Clear All Tokens'}
        </button>
        
        <button
          onClick={redirectToAuth}
          className="bg-purple-600 text-white p-4 rounded-md hover:bg-purple-700"
        >
          🔐 Go to Authentication Dashboard
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message}
        </div>
      )}

      {debugData && (
        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Environment Variables Status:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(debugData.debug?.environment || {}).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-white p-2 rounded border">
                  <span className="font-mono text-sm">{key}:</span>
                  <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {value ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Token Status */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Token Status:</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span>Access Token:</span>
                <span className={debugData.debug?.tokenStatus?.hasAccessToken ? 'text-green-600' : 'text-red-600'}>
                  {debugData.debug?.tokenStatus?.hasAccessToken ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span>Refresh Token:</span>
                <span className={debugData.debug?.tokenStatus?.hasRefreshToken ? 'text-green-600' : 'text-red-600'}>
                  {debugData.debug?.tokenStatus?.hasRefreshToken ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span>Access Token Valid:</span>
                <span className={debugData.debug?.tokenStatus?.accessTokenValid ? 'text-green-600' : 'text-red-600'}>
                  {debugData.debug?.tokenStatus?.accessTokenValid ? '✅ Valid' : '❌ Invalid/Expired'}
                </span>
              </div>
              {debugData.debug?.tokenStatus?.accessTokenExpiresAt && (
                <div className="flex justify-between items-center bg-white p-2 rounded border">
                  <span>Expires At:</span>
                  <span className="text-gray-600">
                    {new Date(debugData.debug.tokenStatus.accessTokenExpiresAt * 1000).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Storage Test */}
          <div className="bg-gray-100 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">Storage Test:</h2>
            <div className="bg-white p-2 rounded border">
              <span className={debugData.debug?.storageTest?.includes('✅') ? 'text-green-600' : 'text-red-600'}>
                {debugData.debug?.storageTest || 'Not tested'}
              </span>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h2 className="text-xl font-semibold mb-4">🔧 Recommendations:</h2>
            <ul className="list-disc list-inside space-y-2 text-sm">
              {!debugData.debug?.environment?.ZOHO_CLIENT_ID && (
                <li className="text-red-600">❌ Add ZOHO_CLIENT_ID to your Vercel environment variables</li>
              )}
              {!debugData.debug?.environment?.ZOHO_CLIENT_SECRET && (
                <li className="text-red-600">❌ Add ZOHO_CLIENT_SECRET to your Vercel environment variables</li>
              )}
              {!debugData.debug?.environment?.SUPABASE_SERVICE_ROLE_KEY && (
                <li className="text-red-600">❌ Add SUPABASE_SERVICE_ROLE_KEY to your Vercel environment variables</li>
              )}
              {!debugData.debug?.tokenStatus?.hasAccessToken && (
                <li className="text-orange-600">⚠️ No access token found. Click "Go to Authentication Dashboard" to authenticate</li>
              )}
              {debugData.debug?.tokenStatus?.hasAccessToken && !debugData.debug?.tokenStatus?.accessTokenValid && (
                <li className="text-orange-600">⚠️ Access token is expired. Click "Go to Authentication Dashboard" to refresh</li>
              )}
              {debugData.debug?.storageTest?.includes('❌') && (
                <li className="text-red-600">❌ Token storage is not working. Check Supabase configuration</li>
              )}
              {debugData.debug?.tokenStatus?.hasAccessToken && debugData.debug?.tokenStatus?.accessTokenValid && (
                <li className="text-green-600">✅ Authentication is working correctly!</li>
              )}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">📋 Quick Fix Steps:</h3>
        <ol className="list-decimal list-inside space-y-1 text-sm">
          <li>Run the debug analysis to identify issues</li>
          <li>Add missing environment variables to Vercel</li>
          <li>Clear tokens if there are storage issues</li>
          <li>Go to authentication dashboard to authenticate</li>
          <li>Test authentication again</li>
        </ol>
      </div>
    </div>
  );
}
