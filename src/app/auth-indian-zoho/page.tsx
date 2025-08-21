'use client';

import { useState, useEffect } from 'react';

export default function AuthIndianZohoPage() {
  const [authData, setAuthData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadAuthData();
  }, []);

  const loadAuthData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-indian-auth');
      const data = await response.json();
      setAuthData(data);
    } catch (error) {
      setMessage('Failed to load authentication data');
    } finally {
      setLoading(false);
    }
  };

  const startAuthentication = () => {
    if (authData?.oauthUrl) {
      window.open(authData.oauthUrl, '_blank');
      setMessage('🔐 Authentication window opened! Please complete the authentication in the new window.');
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

  const clearTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/zoho-tokens', { method: 'DELETE' });
      const data = await response.json();
      
      if (data.success) {
        setMessage('🗑️ All tokens cleared successfully.');
      } else {
        setMessage('❌ Failed to clear tokens.');
      }
    } catch (error) {
      setMessage('❌ Failed to clear tokens.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🇮🇳 Indian Zoho Authentication</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🔧 Current Configuration</h2>
        {authData ? (
          <div className="space-y-2">
            <div><strong>Accounts URL:</strong> {authData.environment.ZOHO_ACCOUNTS_URL || 'Not set'}</div>
            <div><strong>API Domain:</strong> {authData.environment.ZOHO_API_DOMAIN || 'Not set'}</div>
            <div><strong>Client ID:</strong> {authData.environment.ZOHO_CLIENT_ID ? '✅ Set' : '❌ Missing'}</div>
            <div><strong>Client Secret:</strong> {authData.environment.ZOHO_CLIENT_SECRET}</div>
            <div><strong>Redirect URI:</strong> {authData.environment.ZOHO_REDIRECT_URI || 'Not set'}</div>
          </div>
        ) : (
          <div>Loading configuration...</div>
        )}
      </div>

      <div className="space-y-4 mb-8">
        <button
          onClick={startAuthentication}
          disabled={loading || !authData?.oauthUrl}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🔐 Start Indian Zoho Authentication
        </button>
        
        <button
          onClick={checkAuthStatus}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔍 Check Authentication Status
        </button>
        
        <button
          onClick={clearTokens}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          🗑️ Clear All Tokens
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Instructions:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "Start Indian Zoho Authentication" to open the OAuth window</li>
          <li>Complete the authentication in the new window</li>
          <li>You'll be redirected back to your site</li>
          <li>Click "Check Authentication Status" to verify it worked</li>
          <li>If you need to start over, click "Clear All Tokens" first</li>
        </ol>
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/debug-indian-zoho" className="text-blue-600 hover:underline block">
            🔍 Comprehensive Debug Tool
          </a>
          <a href="/test-indian-zoho" className="text-blue-600 hover:underline block">
            🧪 Test Indian Zoho Integration
          </a>
          <a href="/test-crm-sync" className="text-blue-600 hover:underline block">
            🔄 Test Full CRM Sync
          </a>
        </div>
      </div>
    </div>
  );
}
