'use client';

import { useState, useEffect } from 'react';

export default function ForceClearTokensPage() {
  const [tokenData, setTokenData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadTokenData();
  }, []);

  const loadTokenData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/force-clear-tokens');
      const data = await response.json();
      setTokenData(data);
    } catch (error) {
      setMessage('Failed to load token data');
    } finally {
      setLoading(false);
    }
  };

  const forceClearAllTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/force-clear-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'force_clear_all_tokens' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('🗑️ ' + data.message + ' - ' + data.verification);
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

  const generateCleanOAuthUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/force-clear-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_clean_oauth_url' })
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
      <h1 className="text-3xl font-bold mb-6">💥 Force Clear All Tokens</h1>
      
      <div className="bg-red-100 border-l-4 border-red-500 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 CRITICAL: Test Tokens Detected</h2>
        <p className="mb-4">
          Your system still has <strong>test tokens</strong> that are preventing real Zoho authentication from working.
        </p>
        <div className="space-y-2">
          <div>❌ <strong>Token Length: 70 characters</strong> - Still too short for real Zoho tokens</div>
          <div>❌ <strong>Test Tokens Present</strong> - These are invalid for Zoho API</div>
          <div>❌ <strong>API Calls Fail</strong> - 400/401 errors due to test tokens</div>
          <div>✅ <strong>Solution</strong> - Force clear ALL tokens and authenticate fresh</div>
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
          onClick={forceClearAllTokens}
          disabled={loading}
          className="bg-red-700 text-white px-6 py-3 rounded-md hover:bg-red-800 disabled:bg-red-500 mr-4"
        >
          💥 Force Clear ALL Tokens
        </button>
        
        <button
          onClick={generateCleanOAuthUrl}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          🔐 Generate Clean OAuth URL
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
            <h3 className="text-lg font-semibold mb-2">🔐 Current Token Status (NEEDS FORCE CLEAR):</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Access Token</div>
                <div className="text-sm text-red-600">
                  ❌ Test Token
                </div>
                <div className="text-xs text-gray-500">
                  Length: {tokenData.currentTokens?.accessTokenLength || 0}
                </div>
                <div className="text-xs text-red-500">
                  {tokenData.currentTokens?.needsClearing ? '⚠️ Needs Clearing' : '✅ OK'}
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
                <div className="text-xs text-red-500">
                  {tokenData.currentTokens?.needsClearing ? '⚠️ Needs Clearing' : '✅ OK'}
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
                <div className="text-xs text-red-500">
                  {tokenData.currentTokens?.isTestToken ? '⚠️ Test Token Detected' : '✅ Real Token'}
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
                <div className="text-xs text-red-500">
                  Force clear required
                </div>
              </div>
            </div>
          </div>

          {/* Token Details */}
          {tokenData.currentTokens && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">🔍 Token Details (Will be force cleared):</h3>
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

          {/* Force Clear Steps */}
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">💥 Force Clear Steps:</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li>Click "💥 Force Clear ALL Tokens" to completely remove all test tokens</li>
              <li>Wait for verification that tokens are completely removed</li>
              <li>Click "🔐 Generate Clean OAuth URL" to create fresh authentication URL</li>
              <li>Complete OAuth authentication with your Indian Zoho account</li>
              <li>Real tokens will be stored (100+ characters) and API calls will work</li>
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🎯 Expected Results After Force Clear:</h3>
        <div className="space-y-2">
          <div>✅ <strong>Complete Token Removal:</strong> All test tokens completely cleared</div>
          <div>✅ <strong>Fresh Authentication:</strong> Real Zoho tokens (100+ characters)</div>
          <div>✅ <strong>API Calls Work:</strong> All endpoints should work with real tokens</div>
          <div>✅ <strong>Automation Pipeline:</strong> All 6 steps should pass</div>
          <div>🎉 <strong>Full Automation:</strong> Daily sync will work at 9 AM IST</div>
        </div>
      </div>

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">⚠️ Important Notes:</h3>
        <div className="space-y-2">
          <div>• <strong>Force Clear:</strong> This will completely remove ALL stored tokens</div>
          <div>• <strong>Fresh Start:</strong> You'll need to authenticate again with Zoho</div>
          <div>• <strong>No Data Loss:</strong> This only affects authentication tokens, not your data</div>
          <div>• <strong>One-Time Fix:</strong> After this, real tokens will work properly</div>
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
          <a href="/clear-test-tokens" className="text-blue-600 hover:underline block">
            🔧 Clear Test Tokens (Regular)
          </a>
        </div>
      </div>
    </div>
  );
}
