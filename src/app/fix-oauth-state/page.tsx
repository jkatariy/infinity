'use client';

import { useState, useEffect } from 'react';

export default function FixOAuthStatePage() {
  const [fixData, setFixData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadFixData();
  }, []);

  const loadFixData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fix-oauth-state');
      const data = await response.json();
      setFixData(data);
    } catch (error) {
      setMessage('Failed to load fix data');
    } finally {
      setLoading(false);
    }
  };

  const generateOAuthUrl = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fix-oauth-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'generate_oauth_url' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔗 ${data.message}`);
        if (data.oauthUrl) {
          window.open(data.oauthUrl, '_blank');
          setMessage(prev => prev + ' - OAuth window opened with correct state parameter!');
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

  const testStateValidation = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/fix-oauth-state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_state_validation' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🧪 ${data.message} - ${data.recommendation}`);
      } else {
        setMessage(`❌ Test failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test state validation');
    } finally {
      setLoading(false);
    }
  };

  const startAuthentication = () => {
    if (fixData?.debug?.oauthUrl && fixData.debug.oauthUrl !== 'Not available') {
      window.open(fixData.debug.oauthUrl, '_blank');
      setMessage('🔐 OAuth window opened! Complete authentication with your Indian Zoho account.');
    } else {
      setMessage('❌ OAuth URL not available. Check your environment variables.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔧 Fix OAuth State Parameter</h1>
      
      <div className="bg-red-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🚨 Issue Identified</h2>
        <p className="mb-4">
          You encountered an <strong>"Invalid state parameter"</strong> error during OAuth authentication.
        </p>
        <div className="space-y-2">
          <div>❌ <strong>State Parameter Mismatch</strong> - OAuth callback validation failed</div>
          <div>🔧 <strong>Solution</strong> - Generate OAuth URL with correct state parameter</div>
          <div>🇮🇳 <strong>Target</strong> - Indian Zoho server (accounts.zoho.in)</div>
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
          onClick={testStateValidation}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400 mr-4"
        >
          🧪 Test State Validation
        </button>
        
        <button
          onClick={generateOAuthUrl}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🔗 Generate OAuth URL
        </button>
        
        <button
          onClick={startAuthentication}
          disabled={loading || !fixData?.debug?.oauthUrl || fixData.debug.oauthUrl === 'Not available'}
          className="bg-orange-600 text-white px-6 py-3 rounded-md hover:bg-orange-700 disabled:bg-orange-400"
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
          {/* State Parameter Status */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔐 State Parameter Status:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Current State</div>
                <div className="text-sm font-mono text-gray-600 break-all">
                  {fixData.debug.currentState || 'Not set'}
                </div>
                <div className="text-xs text-gray-500">
                  Length: {fixData.debug.stateLength} characters
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-semibold">Expected State</div>
                <div className="text-sm font-mono text-gray-600">
                  infinity_automated_solutions_2024
                </div>
                <div className="text-xs text-gray-500">
                  Length: 32 characters
                </div>
              </div>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🌐 Environment Variables:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_OAUTH_STATE:</span>
                <span className={`text-sm ${fixData.debug.currentState ? 'text-green-600' : 'text-red-600'}`}>
                  {fixData.debug.currentState ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_ACCOUNTS_URL:</span>
                <span className={`text-sm ${fixData.debug.accountsUrl ? 'text-green-600' : 'text-red-600'}`}>
                  {fixData.debug.accountsUrl || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_CLIENT_ID:</span>
                <span className={`text-sm ${fixData.debug.clientId === '***SET***' ? 'text-green-600' : 'text-red-600'}`}>
                  {fixData.debug.clientId}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_REDIRECT_URI:</span>
                <span className={`text-sm ${fixData.debug.redirectUri ? 'text-green-600' : 'text-red-600'}`}>
                  {fixData.debug.redirectUri || 'Not set'}
                </span>
              </div>
            </div>
          </div>

          {/* OAuth URL */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔗 OAuth URL with State Parameter:</h3>
            <div className="bg-white p-2 rounded border font-mono text-xs break-all">
              {fixData.debug.oauthUrl}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-orange-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">💡 Recommendations:</h3>
            <ul className="list-disc list-inside space-y-1">
              {fixData.debug.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Fix Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Click "🧪 Test State Validation" to verify state parameter</li>
          <li>Click "🔗 Generate OAuth URL" to create URL with correct state</li>
          <li>Click "🔐 Start Authentication" to open OAuth window</li>
          <li>Complete authentication with your Indian Zoho account</li>
          <li>Verify successful redirect without state parameter error</li>
        </ol>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/fix-indian-tokens" className="text-blue-600 hover:underline block">
            🔧 Fix Indian Zoho Tokens
          </a>
          <a href="/test-automation-pipeline" className="text-blue-600 hover:underline block">
            🤖 Test Automation Pipeline
          </a>
          <a href="/debug-complete-zoho" className="text-blue-600 hover:underline block">
            🔍 Complete Zoho Debug
          </a>
        </div>
      </div>
    </div>
  );
}
