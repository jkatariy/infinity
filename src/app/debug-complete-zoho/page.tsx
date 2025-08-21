'use client';

import { useState, useEffect } from 'react';

export default function DebugCompleteZohoPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-complete-zoho');
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
      const response = await fetch('/api/debug-complete-zoho', {
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

  const testOAuthUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-complete-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_oauth_url' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔗 ${data.message}`);
        if (data.oauthUrl) {
          window.open(data.oauthUrl, '_blank');
          setMessage(prev => prev + ' - OAuth window opened!');
        }
      } else {
        setMessage(`❌ Failed to generate OAuth URL: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test OAuth URL');
    } finally {
      setLoading(false);
    }
  };

  const startAuthentication = () => {
    if (debugData?.debug?.oauthUrl && debugData.debug.oauthUrl !== 'Not available') {
      window.open(debugData.debug.oauthUrl, '_blank');
      setMessage('🔐 OAuth window opened! Complete authentication in the new window.');
    } else {
      setMessage('❌ OAuth URL not available. Check your environment variables.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Complete Zoho CRM Debug</h1>
      
      <div className="bg-green-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">✅ Environment Variables Set</h2>
        <p className="mb-4">
          Your <strong>.env.local</strong> file has been created with all the required environment variables:
        </p>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>✅ ZOHO_OAUTH_STATE</li>
          <li>✅ ZOHO_SCOPE</li>
          <li>✅ ZOHO_ACCOUNTS_URL (Indian server)</li>
          <li>✅ ZOHO_API_DOMAIN (Indian server)</li>
          <li>✅ ZOHO_CLIENT_ID</li>
          <li>✅ ZOHO_CLIENT_SECRET</li>
          <li>✅ ZOHO_REDIRECT_URI</li>
          <li>✅ SUPABASE_SERVICE_ROLE_KEY</li>
          <li>✅ NEXT_PUBLIC_SUPABASE_URL</li>
          <li>✅ NEXT_PUBLIC_SUPABASE_ANON_KEY</li>
        </ul>
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
          onClick={testOAuthUrl}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400 mr-4"
        >
          🔗 Test OAuth URL
        </button>
        
        <button
          onClick={startAuthentication}
          disabled={loading || !debugData?.debug?.oauthUrl || debugData.debug.oauthUrl === 'Not available'}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🔐 Start Authentication
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
          {/* Configuration Status */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔧 Configuration Status:</h3>
            <div className="space-y-2">
              {debugData.debug.configSuccess.map((success: string, index: number) => (
                <div key={index} className="text-green-600">✅ {success}</div>
              ))}
              {debugData.debug.configIssues.map((issue: string, index: number) => (
                <div key={index} className="text-red-600">❌ {issue}</div>
              ))}
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🌐 Environment Variables:</h3>
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

          {/* Storage Test */}
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🧪 Storage Test:</h3>
            <div className="space-y-2">
              <div><strong>Token Storage:</strong> {debugData.debug.storageTest}</div>
            </div>
          </div>

          {/* OAuth URL */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔗 OAuth URL:</h3>
            <div className="bg-white p-2 rounded border font-mono text-xs break-all">
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
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "Refresh Debug Data" to see current status</li>
          <li>If all configuration checks pass, click "Start Authentication"</li>
          <li>Complete OAuth authentication in the new window</li>
          <li>Check token status after authentication</li>
          <li>Test Zoho CRM integration</li>
        </ol>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/test-indian-zoho" className="text-blue-600 hover:underline block">
            🧪 Test Indian Zoho Integration
          </a>
          <a href="/test-crm-sync" className="text-blue-600 hover:underline block">
            🔄 Test Full CRM Sync
          </a>
          <a href="/debug-oauth" className="text-blue-600 hover:underline block">
            🔍 OAuth Flow Debug
          </a>
        </div>
      </div>
    </div>
  );
}
