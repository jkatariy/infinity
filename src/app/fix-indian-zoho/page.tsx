'use client';

import { useState } from 'react';

export default function FixIndianZohoPage() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const clearTokens = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/zoho-tokens', {
        method: 'DELETE',
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ All tokens cleared successfully! Now re-authenticate with Indian server.');
      } else {
        setMessage(`❌ Failed to clear tokens: ${data.error}`);
      }
    } catch (error) {
      setMessage(`❌ Error clearing tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const goToAuth = () => {
    window.location.href = '/dashboard/zoho-auth';
  };

  const testIndianAuth = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/zoho-tokens');
      const data = await response.json();
      
      if (data.success && data.tokenStatus.hasAccessToken) {
        setMessage('✅ Tokens are present. Testing with Indian server...');
        
        // Test the token with Indian server
        const testResponse = await fetch('/api/debug-zoho-crm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: 'Test Indian Auth',
            email: 'test@example.com',
            phone: '+919876543210',
            message: 'Testing Indian server authentication',
            productName: 'Test Product',
            leadSource: 'Indian Auth Test'
          }),
        });

        const testResult = await testResponse.json();
        
        if (testResult.success) {
          setMessage('🎉 Indian server authentication is working!');
        } else {
          setMessage(`❌ Indian server authentication failed: ${testResult.error}`);
        }
      } else {
        setMessage('❌ No tokens found. Please authenticate first.');
      }
    } catch (error) {
      setMessage(`❌ Error testing authentication: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🇮🇳 Fix Indian Zoho Authentication</h1>
      
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
        <h2 className="text-lg font-semibold text-red-800 mb-2">🚨 Current Issue:</h2>
        <p className="text-red-700">
          Your access token is invalid for the Indian Zoho server. You need to re-authenticate with the Indian server specifically.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <button
          onClick={clearTokens}
          disabled={loading}
          className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          {loading ? 'Clearing...' : '🗑️ Clear All Tokens'}
        </button>
        
        <button
          onClick={goToAuth}
          className="bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700"
        >
          🔐 Go to Authentication
        </button>
        
        <button
          onClick={testIndianAuth}
          disabled={loading}
          className="bg-green-600 text-white p-4 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          {loading ? 'Testing...' : '🧪 Test Indian Auth'}
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('✅') || message.includes('🎉') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">🔧 Required Environment Variables:</h3>
          <div className="text-sm space-y-1">
            <p><strong>ZOHO_CLIENT_ID:</strong> Your Indian Zoho client ID</p>
            <p><strong>ZOHO_CLIENT_SECRET:</strong> Your Indian Zoho client secret</p>
            <p><strong>ZOHO_ACCOUNTS_URL:</strong> https://accounts.zoho.in</p>
            <p><strong>ZOHO_API_DOMAIN:</strong> https://www.zohoapis.in</p>
            <p><strong>ZOHO_REDIRECT_URI:</strong> https://your-domain.vercel.app/api/oauth/callback</p>
          </div>
        </div>

        <div className="bg-yellow-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">📋 Step-by-Step Fix:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Clear all existing tokens</li>
            <li>Update Zoho app to use Indian server</li>
            <li>Update Vercel environment variables</li>
            <li>Re-authenticate with Indian server</li>
            <li>Test the authentication</li>
          </ol>
        </div>
      </div>

      <div className="mt-6 bg-green-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">✅ Zoho Developer Console Settings:</h3>
        <div className="text-sm space-y-1">
          <p><strong>URL:</strong> <a href="https://api-console.zoho.in/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://api-console.zoho.in/</a></p>
          <p><strong>Server:</strong> Indian Server</p>
          <p><strong>Homepage URL:</strong> https://your-domain.vercel.app</p>
          <p><strong>Redirect URI:</strong> https://your-domain.vercel.app/api/oauth/callback</p>
        </div>
      </div>
    </div>
  );
}
