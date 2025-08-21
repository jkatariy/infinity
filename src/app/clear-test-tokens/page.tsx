'use client';

import { useState, useEffect } from 'react';

export default function ClearTestTokensPage() {
  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTokenData();
  }, []);

  const loadTokenData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clear-test-tokens');
      const data = await response.json();
      setTokenData(data);
    } catch (error) {
      setMessage('Failed to load token data');
    } finally {
      setLoading(false);
    }
  };

  const clearTestTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clear-test-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear_test_tokens' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('🗑️ ' + data.message);
        setTimeout(loadTokenData, 1000);
      } else {
        setMessage(`❌ Failed to clear tokens: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to clear tokens');
    } finally {
      setLoading(false);
    }
  };

  const generateOAuthUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/clear-test-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_oauth_url' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔗 ${data.message}`);
        if (data.oauthUrl) {
          window.open(data.oauthUrl, '_blank');
          setMessage(prev => prev + ' - OAuth window opened for real authentication!');
        }
      } else {
        setMessage(`❌ Failed to generate OAuth URL: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to generate OAuth URL');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔧 Clear Test Tokens</h1>
      
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Issue Found: Test Tokens</h2>
        <p className="mb-4">
          The detailed diagnostics revealed that you have <strong>test tokens</strong> stored instead of real Zoho authentication tokens.
        </p>
        <div className="space-y-2">
          <div>❌ <strong>Token Length: 31 characters</strong> - Too short for real Zoho tokens</div>
          <div>❌ <strong>Token Preview: test_access_token_17...</strong> - Clearly a test token</div>
          <div>❌ <strong>API Calls Fail</strong> - Test tokens don't work with Zoho API</div>
          <div>✅ <strong>Solution</strong> - Clear test tokens and authenticate with real Zoho</div>
        </div>
      </div>
      
      <div className="mb-8">
        <button
          onClick={loadTokenData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Refresh Status
        </button>
        
        <button
          onClick={clearTestTokens}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400 mr-4"
        >
          🗑️ Clear Test Tokens
        </button>
        
        <button
          onClick={generateOAuthUrl}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          🔐 Generate OAuth URL
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      {tokenData && tokenData.success && (
        <div className="space-y-6">
          {/* Current Token Status */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔐 Current Token Status (TEST TOKENS):</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Access Token</div>
                <div className="text-sm text-red-600">
                  ❌ Test Token
                </div>
                <div className="text-xs text-gray-500">
                  Length: {tokenData.currentTokens?.accessTokenLength || 0}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Refresh Token</div>
                <div className="text-sm text-red-600">
                  ❌ Test Token
                </div>
                <div className="text-xs text-gray-500">
                  Length: {tokenData.currentTokens?.refreshTokenLength || 0}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Token Type</div>
                <div className="text-sm text-red-600">
                  ❌ Test Tokens
                </div>
                <div className="text-xs text-gray-500">
                  Need: Real Zoho Tokens
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">API Status</div>
                <div className="text-sm text-red-600">
                  ❌ Won't Work
                </div>
                <div className="text-xs text-gray-500">
                  Test tokens invalid
                </div>
              </div>
            </div>
          </div>

          {/* Token Details */}
          {tokenData.currentTokens && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">🔍 Token Details (Will be cleared):</h3>
              <div className="space-y-2">
                {tokenData.currentTokens.accessTokenPreview && (
                  <div className="bg-white p-2 rounded border">
                    <span className="font-mono text-sm">Access Token: {tokenData.currentTokens.accessTokenPreview}</span>
                  </div>
                )}
                {tokenData.currentTokens.refreshTokenPreview && (
                  <div className="bg-white p-2 rounded border">
                    <span className="font-mono text-sm">Refresh Token: {tokenData.currentTokens.refreshTokenPreview}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Solution Steps */}
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">💡 Solution Steps:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Click "🗑️ Clear Test Tokens" to remove the test tokens</li>
              <li>Click "🔐 Generate OAuth URL" to create authentication URL</li>
              <li>Complete OAuth authentication with your Indian Zoho account</li>
              <li>Real tokens will be stored and API calls will work</li>
              <li>Test the automation pipeline again</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🎯 Expected Results After Fix:</h3>
        <div className="space-y-2">
          <div>✅ <strong>Real Tokens:</strong> 100+ character length tokens from Zoho</div>
          <div>✅ <strong>API Calls:</strong> All endpoints should work with real tokens</div>
          <div>✅ <strong>Automation Pipeline:</strong> All 6 steps should pass</div>
          <div>🎉 <strong>Full Automation:</strong> Daily sync will work at 9 AM IST</div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/test-automation-pipeline" className="text-blue-600 hover:underline block">
            🤖 Test Automation Pipeline
          </a>
          <a href="/debug-token-details" className="text-blue-600 hover:underline block">
            🔍 Debug Token Details
          </a>
          <a href="/debug-zoho-api-400" className="text-blue-600 hover:underline block">
            🔍 Debug Zoho API 400 Error
          </a>
        </div>
      </div>
    </div>
  );
}
