'use client';

import { useState } from 'react';

export default function TestIndianZohoPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  const testIndianZohoDomain = async () => {
    setIsTesting(true);
    clearResults();
    
    try {
      addResult('🇮🇳 Testing Indian Zoho domain...');
      
      // Test 1: Check environment variables
      addResult('🔧 Step 1: Checking environment variables...');
      const envResponse = await fetch('/api/test-env');
      const envResult = await envResponse.json();
      
      if (envResult.ZOHO_API_DOMAIN) {
        addResult('✅ ZOHO_API_DOMAIN is set');
        addResult(`   Current value: ${process.env.NODE_ENV === 'development' ? 'Hidden in production' : 'Set'}`);
      } else {
        addResult('❌ ZOHO_API_DOMAIN is missing');
      }

      // Test 2: Check authentication
      addResult('🔐 Step 2: Checking authentication...');
      const authResponse = await fetch('/api/zoho-tokens');
      const authResult = await authResponse.json();
      
      if (authResult.success && authResult.tokenStatus.hasAccessToken) {
        addResult('✅ Authentication is working');
      } else {
        addResult('❌ Authentication failed');
        return;
      }

      // Test 3: Test direct API call with Indian domain
      addResult('🌐 Step 3: Testing API call with Indian domain...');
      const testLeadData = {
        name: 'Indian Test Lead ' + new Date().toISOString().slice(0, 19),
        email: 'indian-test@example.com',
        phone: '+919876543210',
        message: 'Testing Indian Zoho domain integration',
        productName: 'Indian Test Product',
        leadSource: 'Indian Domain Test'
      };

      const apiResponse = await fetch('/api/debug-zoho-crm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testLeadData),
      });

      const apiResult = await apiResponse.json();
      
      if (apiResult.success) {
        addResult('✅ API call successful with Indian domain!');
        addResult(`🆔 Zoho Lead ID: ${apiResult.zohoId || 'N/A'}`);
        
        if (apiResult.debug?.apiUrl) {
          addResult(`🔗 API URL used: ${apiResult.debug.apiUrl}`);
        }
      } else {
        addResult(`❌ API call failed: ${apiResult.error}`);
        addResult(`📍 Failed at step: ${apiResult.step}`);
        
        if (apiResult.debug?.apiUrl) {
          addResult(`🔗 API URL attempted: ${apiResult.debug.apiUrl}`);
        }
        
        if (apiResult.debug?.responseStatus) {
          addResult(`📡 Response Status: ${apiResult.debug.responseStatus}`);
        }
        
        if (apiResult.debug?.responseBody) {
          addResult(`📄 Response Body: ${apiResult.debug.responseBody.substring(0, 300)}...`);
        }
      }

      addResult('🎉 Indian Zoho domain test completed!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🇮🇳 Indian Zoho Domain Test</h1>
      
      <div className="mb-8">
        <button
          onClick={testIndianZohoDomain}
          disabled={isTesting}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          {isTesting ? 'Testing...' : '🇮🇳 Test Indian Zoho Domain'}
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Test Results:</h2>
          <button
            onClick={clearResults}
            className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            Clear Results
          </button>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-500">No test results yet. Click the button above to start testing.</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">🇮🇳 Indian Zoho Configuration:</h3>
        <div className="text-sm space-y-1">
          <p><strong>API Domain:</strong> https://www.zohoapis.in</p>
          <p><strong>Accounts URL:</strong> https://accounts.zoho.in</p>
          <p><strong>Redirect URI:</strong> https://your-domain.vercel.app/api/oauth/callback</p>
          <p><strong>Environment Variable:</strong> ZOHO_API_DOMAIN=https://www.zohoapis.in</p>
        </div>
      </div>

      <div className="mt-6 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">⚠️ Important Notes:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Make sure your Zoho app is configured for the Indian server</li>
          <li>Update your Zoho Developer Console settings to use Indian domains</li>
          <li>Set ZOHO_API_DOMAIN=https://www.zohoapis.in in your Vercel environment variables</li>
          <li>Set ZOHO_ACCOUNTS_URL=https://accounts.zoho.in in your Vercel environment variables</li>
        </ul>
      </div>
    </div>
  );
}
