'use client';

import { useState, useEffect } from 'react';

export default function FixIndianTokensPage() {
  const [fixData, setFixData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadFixData();
  }, []);

  const loadFixData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fix-indian-tokens');
      const data = await response.json();
      setFixData(data);
    } catch (error) {
      setMessage('Failed to load fix data');
    } finally {
      setLoading(false);
    }
  };

  const clearTokens = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fix-indian-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear_tokens' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('🗑️ ' + data.message);
        setTimeout(loadFixData, 1000);
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
      const response = await fetch('/api/fix-indian-tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_oauth_url' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔗 ${data.message}`);
        if (data.oauthUrl) {
          window.open(data.oauthUrl, '_blank');
          setMessage(prev => prev + ' - OAuth window opened for Indian server!');
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

  const startAuthentication = () => {
    if (fixData?.oauthUrl && fixData.oauthUrl !== 'Not available') {
      window.open(fixData.oauthUrl, '_blank');
      setMessage('🔐 OAuth window opened! Complete authentication with your Indian Zoho account.');
    } else {
      setMessage('❌ OAuth URL not available. Check your environment variables.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔧 Fix Indian Zoho Tokens</h1>
      
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Issue Identified</h2>
        <p className="mb-4">
          Your automation pipeline test revealed that the stored tokens are <strong>invalid for the Indian Zoho server</strong>.
        </p>
        <div className="space-y-2">
          <div>❌ <strong>Token Refresh Failed</strong> - Tokens may be from global server</div>
          <div>❌ <strong>Zoho API Connectivity Failed</strong> - 401 error indicates invalid tokens</div>
          <div>✅ <strong>Environment Variables</strong> - All properly configured</div>
          <div>✅ <strong>Supabase Storage</strong> - Working correctly</div>
        </div>
      </div>
      
      <div className="mb-8">
        <button
          onClick={loadFixData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Refresh Status
        </button>
        
        <button
          onClick={clearTokens}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400 mr-4"
        >
          🗑️ Clear Invalid Tokens
        </button>
        
        <button
          onClick={generateOAuthUrl}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400 mr-4"
        >
          🔗 Generate OAuth URL
        </button>
        
        <button
          onClick={startAuthentication}
          disabled={loading || !fixData?.oauthUrl || fixData.oauthUrl === 'Not available'}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          🔐 Start Authentication
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      {fixData && (
        <div className="space-y-6">
          {/* Current Token Status */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔐 Current Token Status:</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Access Token</div>
                <div className={`text-sm ${fixData.currentStatus.hasAccessToken ? 'text-green-600' : 'text-red-600'}`}>
                  {fixData.currentStatus.hasAccessToken ? '✅ Present' : '❌ Missing'}
                </div>
                <div className="text-xs text-gray-500">
                  Valid: {fixData.currentStatus.accessTokenValid ? '✅ Yes' : '❌ No'}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Refresh Token</div>
                <div className={`text-sm ${fixData.currentStatus.hasRefreshToken ? 'text-green-600' : 'text-red-600'}`}>
                  {fixData.currentStatus.hasRefreshToken ? '✅ Present' : '❌ Missing'}
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Last Updated</div>
                <div className="text-sm text-gray-600">
                  {fixData.currentStatus.lastUpdated ? new Date(fixData.currentStatus.lastUpdated).toLocaleString() : 'Unknown'}
                </div>
              </div>
            </div>
          </div>

          {/* Token Details */}
          {fixData.tokens && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">🔍 Token Details:</h3>
              <div className="space-y-2">
                {fixData.tokens.accessTokenPreview && (
                  <div className="bg-white p-2 rounded border">
                    <span className="font-mono text-sm">Access Token: {fixData.tokens.accessTokenPreview}</span>
                  </div>
                )}
                {fixData.tokens.refreshTokenPreview && (
                  <div className="bg-white p-2 rounded border">
                    <span className="font-mono text-sm">Refresh Token: {fixData.tokens.refreshTokenPreview}</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OAuth URL */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔗 OAuth URL for Indian Server:</h3>
            <div className="bg-white p-2 rounded border font-mono text-xs break-all">
              {fixData.oauthUrl}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">💡 Recommendations:</h3>
            <ul className="list-disc list-inside space-y-1">
              {fixData.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Fix Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "🗑️ Clear Invalid Tokens" to remove old tokens</li>
          <li>Click "🔐 Start Authentication" to open OAuth window</li>
          <li>Complete authentication with your Indian Zoho account (accounts.zoho.in)</li>
          <li>Wait for redirect and token exchange to complete</li>
          <li>Test the automation pipeline again</li>
        </ol>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/test-automation-pipeline" className="text-blue-600 hover:underline block">
            🤖 Test Automation Pipeline
          </a>
          <a href="/debug-complete-zoho" className="text-blue-600 hover:underline block">
            🔍 Complete Zoho Debug
          </a>
          <a href="/test-indian-zoho" className="text-blue-600 hover:underline block">
            🇮🇳 Test Indian Zoho
          </a>
        </div>
      </div>
    </div>
  );
}
