'use client';

import { useState } from 'react';

export default function DebugIndianZohoPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const runComprehensiveDebug = async () => {
    setLoading(true);
    setMessage('');
    setDebugData(null);
    
    try {
      addResult('🔍 Starting comprehensive Indian Zoho debug...');
      
      // Step 1: Check environment variables
      addResult('🔧 Step 1: Checking environment variables...');
      const envResponse = await fetch('/api/test-env');
      const envResult = await envResponse.json();
      
      const envStatus = {
        ZOHO_CLIENT_ID: envResult.ZOHO_CLIENT_ID,
        ZOHO_CLIENT_SECRET: envResult.ZOHO_CLIENT_SECRET,
        ZOHO_ACCOUNTS_URL: envResult.ZOHO_ACCOUNTS_URL,
        ZOHO_API_DOMAIN: envResult.ZOHO_API_DOMAIN,
        ZOHO_REDIRECT_URI: envResult.ZOHO_REDIRECT_URI,
      };

      addResult(`   ZOHO_CLIENT_ID: ${envStatus.ZOHO_CLIENT_ID ? '✅ Set' : '❌ Missing'}`);
      addResult(`   ZOHO_CLIENT_SECRET: ${envStatus.ZOHO_CLIENT_SECRET ? '✅ Set' : '❌ Missing'}`);
      addResult(`   ZOHO_ACCOUNTS_URL: ${envStatus.ZOHO_ACCOUNTS_URL ? '✅ Set' : '❌ Missing'}`);
      addResult(`   ZOHO_API_DOMAIN: ${envStatus.ZOHO_API_DOMAIN ? '✅ Set' : '❌ Missing'}`);
      addResult(`   ZOHO_REDIRECT_URI: ${envStatus.ZOHO_REDIRECT_URI ? '✅ Set' : '❌ Missing'}`);

      // Step 2: Check authentication status
      addResult('🔐 Step 2: Checking authentication status...');
      const authResponse = await fetch('/api/zoho-tokens');
      const authResult = await authResponse.json();
      
      if (authResult.success) {
        addResult(`   Access Token: ${authResult.tokenStatus.hasAccessToken ? '✅ Present' : '❌ Missing'}`);
        addResult(`   Refresh Token: ${authResult.tokenStatus.hasRefreshToken ? '✅ Present' : '❌ Missing'}`);
        addResult(`   Token Valid: ${authResult.tokenStatus.accessTokenValid ? '✅ Valid' : '❌ Invalid'}`);
        
        if (authResult.tokenStatus.accessTokenExpiresAt) {
          const expiresAt = new Date(authResult.tokenStatus.accessTokenExpiresAt * 1000);
          addResult(`   Expires At: ${expiresAt.toLocaleString()}`);
        }
      } else {
        addResult('❌ Authentication check failed');
      }

      // Step 3: Test token with Indian server
      addResult('🌐 Step 3: Testing token with Indian server...');
      const testResponse = await fetch('/api/debug-zoho-crm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Debug Test Lead',
          email: 'debug@infinitysols.com',
          phone: '+919876543210',
          message: 'Debug test for Indian Zoho server',
          productName: 'Debug Product',
          leadSource: 'Debug Test'
        }),
      });

      const testResult = await testResponse.json();
      
      if (testResult.success) {
        addResult('✅ Indian server test successful!');
        addResult(`   Zoho Lead ID: ${testResult.zohoId || 'N/A'}`);
      } else {
        addResult(`❌ Indian server test failed: ${testResult.error}`);
        addResult(`   Failed at step: ${testResult.step}`);
        
        if (testResult.debug) {
          addResult('   Debug Info:');
          if (testResult.debug.apiUrl) {
            addResult(`     API URL: ${testResult.debug.apiUrl}`);
          }
          if (testResult.debug.responseStatus) {
            addResult(`     Response Status: ${testResult.debug.responseStatus}`);
          }
          if (testResult.debug.responseBody) {
            addResult(`     Response Body: ${testResult.debug.responseBody.substring(0, 200)}...`);
          }
        }
      }

      // Step 4: Check OAuth configuration
      addResult('🔗 Step 4: Checking OAuth configuration...');
      const oauthUrl = `${envStatus.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in'}/oauth/v2/auth?response_type=code&client_id=${envStatus.ZOHO_CLIENT_ID || 'MISSING'}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(envStatus.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback')}&access_type=offline`;
      
      addResult(`   OAuth URL: ${oauthUrl.substring(0, 100)}...`);
      addResult(`   Redirect URI: ${envStatus.ZOHO_REDIRECT_URI || 'Not set'}`);

      // Compile debug data
      const debugInfo = {
        environment: envStatus,
        authentication: authResult,
        testResult: testResult,
        oauthUrl: oauthUrl,
        timestamp: new Date().toISOString()
      };

      setDebugData(debugInfo);
      addResult('🎉 Comprehensive debug completed!');

    } catch (error) {
      addResult(`❌ Debug failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const addResult = (message: string) => {
    setMessage(prev => prev + message + '\n');
  };

  const clearResults = () => {
    setMessage('');
    setDebugData(null);
  };

  const regenerateOAuthUrl = () => {
    if (!debugData) return;
    
    const env = debugData.environment;
    const oauthUrl = `${env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in'}/oauth/v2/auth?response_type=code&client_id=${env.ZOHO_CLIENT_ID || 'MISSING'}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(env.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback')}&access_type=offline`;
    
    window.open(oauthUrl, '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Comprehensive Indian Zoho Debug</h1>
      
      <div className="mb-8">
        <button
          onClick={runComprehensiveDebug}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          {loading ? 'Running Debug...' : '🔍 Run Comprehensive Debug'}
        </button>
        
        <button
          onClick={clearResults}
          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700"
        >
          Clear Results
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h2 className="text-xl font-semibold mb-4">Debug Results:</h2>
          <pre className="text-sm font-mono whitespace-pre-wrap bg-white p-4 rounded border overflow-auto max-h-96">
            {message}
          </pre>
        </div>
      )}

      {debugData && (
        <div className="space-y-6">
          {/* Environment Variables */}
          <div className="bg-blue-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔧 Environment Variables:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(debugData.environment).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-white p-2 rounded border">
                  <span className="font-mono text-sm">{key}:</span>
                  <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {value ? '✅ Set' : '❌ Missing'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Authentication Status */}
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔐 Authentication Status:</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span>Access Token:</span>
                <span className={debugData.authentication?.tokenStatus?.hasAccessToken ? 'text-green-600' : 'text-red-600'}>
                  {debugData.authentication?.tokenStatus?.hasAccessToken ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span>Refresh Token:</span>
                <span className={debugData.authentication?.tokenStatus?.hasRefreshToken ? 'text-green-600' : 'text-red-600'}>
                  {debugData.authentication?.tokenStatus?.hasRefreshToken ? '✅ Present' : '❌ Missing'}
                </span>
              </div>
              <div className="flex justify-between items-center bg-white p-2 rounded border">
                <span>Token Valid:</span>
                <span className={debugData.authentication?.tokenStatus?.accessTokenValid ? 'text-green-600' : 'text-red-600'}>
                  {debugData.authentication?.tokenStatus?.accessTokenValid ? '✅ Valid' : '❌ Invalid'}
                </span>
              </div>
            </div>
          </div>

          {/* Test Results */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🧪 Test Results:</h3>
            <div className="bg-white p-2 rounded border">
              <span className={debugData.testResult?.success ? 'text-green-600' : 'text-red-600'}>
                {debugData.testResult?.success ? '✅ Test Successful' : `❌ Test Failed: ${debugData.testResult?.error}`}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="bg-purple-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🔧 Actions:</h3>
            <div className="space-y-2">
              <button
                onClick={regenerateOAuthUrl}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                🔗 Generate OAuth URL
              </button>
              <div className="text-sm text-gray-600">
                <p><strong>Domain:</strong> infinitysols.com</p>
                <p><strong>Expected Redirect URI:</strong> https://infinitysols.com/api/oauth/callback</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-8 bg-red-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">🚨 Common Issues & Solutions:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li><strong>Wrong OAuth URL:</strong> Make sure you're using https://accounts.zoho.in for Indian server</li>
          <li><strong>Wrong Redirect URI:</strong> Should be https://infinitysols.com/api/oauth/callback</li>
          <li><strong>Wrong API Domain:</strong> Should be https://www.zohoapis.in</li>
          <li><strong>Token Mismatch:</strong> Clear tokens and re-authenticate with Indian server</li>
          <li><strong>App Configuration:</strong> Make sure your Zoho app is configured for Indian server</li>
        </ul>
      </div>
    </div>
  );
}
