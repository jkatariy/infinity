'use client';

import { useState, useEffect } from 'react';

export default function DebugTokenDetailsPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    runDebug();
  }, []);

  const runDebug = async () => {
    setLoading(true);
    setMessage('🔍 Running detailed token diagnostics...');
    try {
      const response = await fetch('/api/debug-token-details');
      const data = await response.json();
      setDebugData(data);
      
      if (data.success) {
        setMessage('✅ Detailed diagnostics completed');
      } else {
        setMessage(`❌ Debug failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to run debug');
    } finally {
      setLoading(false);
    }
  };

  const testDifferentEndpoint = async () => {
    setLoading(true);
    setMessage('🧪 Testing different endpoint...');
    try {
      const response = await fetch('/api/debug-token-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_different_endpoint' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🧪 ${data.message} - Status: ${data.status} - Success: ${data.success}`);
      } else {
        setMessage(`❌ Test failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test different endpoint');
    } finally {
      setLoading(false);
    }
  };

  const testDifferentHeaders = async () => {
    setLoading(true);
    setMessage('🔧 Testing different headers...');
    try {
      const response = await fetch('/api/debug-token-details', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_with_different_headers' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔧 ${data.message} - Status: ${data.status} - Success: ${data.success}`);
      } else {
        setMessage(`❌ Test failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test different headers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Detailed Token Diagnostics</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🔍 Deep Analysis</h2>
        <p className="mb-4">
          Since OAuth URL and tokens are from Indian server, let's analyze the exact token details and API call specifics to identify the root cause.
        </p>
        <div className="space-y-2">
          <div>🔍 <strong>Token Analysis</strong> - Check token format, expiration, and validity</div>
          <div>🌐 <strong>API Call Details</strong> - Examine exact request/response details</div>
          <div>🔧 <strong>Alternative Tests</strong> - Try different endpoints and headers</div>
        </div>
      </div>
      
      <div className="mb-8">
        <button
          onClick={runDebug}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Run Detailed Debug
        </button>
        
        <button
          onClick={testDifferentEndpoint}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🧪 Test Different Endpoint
        </button>
        
        <button
          onClick={testDifferentHeaders}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
        >
          🔧 Test Different Headers
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      {debugData && debugData.success && (
        <div className="space-y-6">
          {/* Environment Configuration */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🌐 Environment Configuration:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_ACCOUNTS_URL:</span>
                <span className={`text-sm ${debugData.debug.environment.ZOHO_ACCOUNTS_URL?.includes('.in') ? 'text-green-600' : 'text-red-600'}`}>
                  {debugData.debug.environment.ZOHO_ACCOUNTS_URL || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_API_DOMAIN:</span>
                <span className={`text-sm ${debugData.debug.environment.ZOHO_API_DOMAIN?.includes('.in') ? 'text-green-600' : 'text-red-600'}`}>
                  {debugData.debug.environment.ZOHO_API_DOMAIN || 'Not set'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_CLIENT_ID:</span>
                <span className={`text-sm ${debugData.debug.environment.ZOHO_CLIENT_ID === '***SET***' ? 'text-green-600' : 'text-red-600'}`}>
                  {debugData.debug.environment.ZOHO_CLIENT_ID}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">ZOHO_REDIRECT_URI:</span>
                <span className={`text-sm ${debugData.debug.environment.ZOHO_REDIRECT_URI ? 'text-green-600' : 'text-red-600'}`}>
                  {debugData.debug.environment.ZOHO_REDIRECT_URI || 'Not set'}
                </span>
              </div>
            </div>
            <div className="mt-2 text-sm">
              <strong>Indian Server Configured:</strong> {debugData.debug.environment.isIndianServer ? '✅ Yes' : '❌ No'}
            </div>
          </div>

          {/* Token Details */}
          {debugData.debug.tokenDetails && (
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">🔐 Token Details:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-3 rounded border">
                  <div className="font-semibold">Access Token</div>
                  <div className="text-sm text-gray-600">
                    {debugData.debug.tokenDetails.hasAccessToken ? '✅ Present' : '❌ Missing'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Length: {debugData.debug.tokenDetails.accessTokenLength}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-semibold">Refresh Token</div>
                  <div className="text-sm text-gray-600">
                    {debugData.debug.tokenDetails.hasRefreshToken ? '✅ Present' : '❌ Missing'}
                  </div>
                  <div className="text-xs text-gray-500">
                    Length: {debugData.debug.tokenDetails.refreshTokenLength}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-semibold">Expiration</div>
                  <div className={`text-sm ${debugData.debug.tokenDetails.isExpired ? 'text-red-600' : 'text-green-600'}`}>
                    {debugData.debug.tokenDetails.isExpired ? '❌ Expired' : '✅ Valid'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {debugData.debug.tokenDetails.expiresIn ? `${debugData.debug.tokenDetails.expiresIn}s remaining` : 'No expiry'}
                  </div>
                </div>
                <div className="bg-white p-3 rounded border">
                  <div className="font-semibold">Token Preview</div>
                  <div className="text-xs font-mono text-gray-600 break-all">
                    {debugData.debug.tokenDetails.accessTokenPreview || 'No token'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Test Result */}
          {debugData.debug.apiTestResult && (
            <div className="bg-gray-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">🧪 API Test Result:</h3>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-lg ${debugData.debug.apiTestResult.success ? 'text-green-600' : 'text-red-600'}`}>
                      {debugData.debug.apiTestResult.success ? '✅' : '❌'}
                    </span>
                    <span className="font-semibold">API Call to Organization Endpoint</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <div><strong>URL:</strong> {debugData.debug.apiTestResult.url}</div>
                    <div><strong>Status:</strong> {debugData.debug.apiTestResult.status} {debugData.debug.apiTestResult.statusText}</div>
                    {debugData.debug.apiTestResult.response && (
                      <div>
                        <strong>Response:</strong>
                        <pre className="text-xs bg-gray-100 p-2 rounded mt-1 overflow-auto">
                          {JSON.stringify(debugData.debug.apiTestResult.response, null, 2)}
                        </pre>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analysis */}
          <div className="bg-orange-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔍 Analysis:</h3>
            <div className="space-y-3">
              {debugData.debug.analysis.issues.length > 0 && (
                <div>
                  <h4 className="font-semibold text-red-600">❌ Issues Found:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {debugData.debug.analysis.issues.map((issue: string, index: number) => (
                      <li key={index} className="text-sm">{issue}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {debugData.debug.analysis.possibleCauses.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-600">⚠️ Possible Causes:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {debugData.debug.analysis.possibleCauses.map((cause: string, index: number) => (
                      <li key={index} className="text-sm">{cause}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {debugData.debug.analysis.recommendations.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-600">💡 Recommendations:</h4>
                  <ul className="list-disc list-inside space-y-1">
                    {debugData.debug.analysis.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="text-sm">{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/test-automation-pipeline" className="text-blue-600 hover:underline block">
            🤖 Test Automation Pipeline
          </a>
          <a href="/debug-zoho-api-400" className="text-blue-600 hover:underline block">
            🔍 Debug Zoho API 400 Error
          </a>
          <a href="/fix-final-tokens" className="text-blue-600 hover:underline block">
            🔧 Fix Final Tokens
          </a>
        </div>
      </div>
    </div>
  );
}
