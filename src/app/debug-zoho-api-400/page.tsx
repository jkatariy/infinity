'use client';

import { useState, useEffect } from 'react';

export default function DebugZohoApi400Page() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    runDebug();
  }, []);

  const runDebug = async () => {
    setLoading(true);
    setMessage('🔍 Running Zoho API 400 error debug...');
    try {
      const response = await fetch('/api/debug-zoho-api-400');
      const data = await response.json();
      setDebugData(data);
      
      if (data.success) {
        const { successfulTests, failedTests } = data.debug.analysis;
        if (successfulTests > 0) {
          setMessage(`✅ Debug completed! ${successfulTests} endpoints work, ${failedTests} failed`);
        } else {
          setMessage(`❌ Debug completed! All ${failedTests} endpoints failed`);
        }
      } else {
        setMessage(`❌ Debug failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to run debug');
    } finally {
      setLoading(false);
    }
  };

  const testAlternativeEndpoint = async () => {
    setLoading(true);
    setMessage('🧪 Testing alternative endpoint...');
    try {
      const response = await fetch('/api/debug-zoho-api-400', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_alternative_endpoint' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`✅ ${data.message} - Status: ${data.status}`);
      } else {
        setMessage(`❌ ${data.message} - Status: ${data.status} - Error: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test alternative endpoint');
    } finally {
      setLoading(false);
    }
  };

  const testOAuthScope = async () => {
    setLoading(true);
    setMessage('🔐 Testing OAuth scope...');
    try {
      const response = await fetch('/api/debug-zoho-api-400', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'test_oauth_scope' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage(`🔐 ${data.message} - Has Access: ${data.hasAccess ? 'Yes' : 'No'} - Status: ${data.status}`);
      } else {
        setMessage(`❌ OAuth scope test failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to test OAuth scope');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (success: boolean) => {
    return success ? 'text-green-600' : 'text-red-600';
  };

  const getStatusIcon = (success: boolean) => {
    return success ? '✅' : '❌';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Debug Zoho API 400 Error</h1>
      
      <div className="bg-yellow-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">⚠️ Issue Identified</h2>
        <p className="mb-4">
          Your automation pipeline is almost working! Only <strong>Step 4: Zoho API Connectivity</strong> is failing with a <strong>400 error</strong>.
        </p>
        <div className="space-y-2">
          <div>✅ <strong>Authentication Working</strong> - Token refresh successful</div>
          <div>❌ <strong>API Call Failing</strong> - 400 error on Leads endpoint</div>
          <div>🔧 <strong>Solution</strong> - Debug API permissions and endpoints</div>
        </div>
      </div>
      
      <div className="mb-8">
        <button
          onClick={runDebug}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Run Debug
        </button>
        
        <button
          onClick={testAlternativeEndpoint}
          disabled={loading}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🧪 Test Alternative Endpoint
        </button>
        
        <button
          onClick={testOAuthScope}
          disabled={loading}
          className="bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
        >
          🔐 Test OAuth Scope
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
          {/* Summary */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">📊 Debug Summary:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{debugData.debug.analysis.totalTests}</div>
                <div className="text-sm text-gray-600">Total Tests</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{debugData.debug.analysis.successfulTests}</div>
                <div className="text-sm text-gray-600">Successful</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{debugData.debug.analysis.failedTests}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{debugData.debug.accessTokenPreview}</div>
                <div className="text-sm text-gray-600">Access Token</div>
              </div>
            </div>
          </div>

          {/* API Domain */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🌐 API Configuration:</h3>
            <div className="bg-white p-2 rounded border font-mono text-sm">
              API Domain: {debugData.debug.apiDomain}
            </div>
          </div>

          {/* API Test Results */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🧪 API Test Results:</h3>
            <div className="space-y-3">
              {debugData.debug.apiTests.map((test: any, index: number) => (
                <div key={index} className="flex items-start space-x-3 bg-white p-3 rounded border">
                  <span className="text-lg">{getStatusIcon(test.success)}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getStatusColor(test.success)}`}>
                        {test.test}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(test.success)} bg-opacity-10`}>
                        {test.status} {test.statusText}
                      </span>
                    </div>
                    {test.error && (
                      <p className="text-sm text-red-600 mt-1 font-mono break-all">
                        Error: {test.error}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Analysis */}
          <div className="bg-orange-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔍 Analysis:</h3>
            <div className="space-y-2">
              <p className="font-semibold">{debugData.debug.analysis.diagnosis}</p>
              <ul className="list-disc list-inside space-y-1">
                {debugData.debug.analysis.recommendations.map((rec: string, index: number) => (
                  <li key={index} className="text-sm">{rec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Next Steps:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Run the debug to see which endpoints work and which fail</li>
          <li>If some endpoints work, the issue is specific to the Leads module</li>
          <li>If all endpoints fail with 400, check OAuth scope permissions</li>
          <li>Test alternative endpoints to verify basic connectivity</li>
          <li>Check Zoho CRM module permissions and settings</li>
        </ol>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/test-automation-pipeline" className="text-blue-600 hover:underline block">
            🤖 Test Automation Pipeline
          </a>
          <a href="/fix-indian-tokens" className="text-blue-600 hover:underline block">
            🔧 Fix Indian Zoho Tokens
          </a>
          <a href="/debug-complete-zoho" className="text-blue-600 hover:underline block">
            🔍 Complete Zoho Debug
          </a>
        </div>
      </div>
    </div>
  );
}
