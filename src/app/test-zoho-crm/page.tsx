'use client';

import { useState } from 'react';

export default function TestZohoCRMPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testType, setTestType] = useState<string>('');

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Test 1: Check Zoho Authentication Status
  const testAuthStatus = async () => {
    setIsTesting(true);
    setTestType('Authentication Status');
    clearResults();
    
    try {
      addResult('Testing Zoho CRM authentication status...');
      
      const response = await fetch('/api/sendToZoho', {
        method: 'GET',
      });

      const result = await response.json();
      
      if (result.authenticated) {
        addResult('✅ Zoho CRM is authenticated');
        addResult(`Access Token: ${result.hasAccessToken ? 'Available' : 'Missing'}`);
        addResult(`Refresh Token: ${result.hasRefreshToken ? 'Available' : 'Missing'}`);
        addResult(`Token Valid: ${result.accessTokenValid ? 'Yes' : 'No'}`);
        if (result.accessTokenExpiresAt) {
          addResult(`Token Expires: ${new Date(result.accessTokenExpiresAt).toLocaleString()}`);
        }
      } else {
        addResult('❌ Zoho CRM is not authenticated');
        addResult('Please authenticate via the dashboard first');
      }
    } catch (error) {
      addResult(`❌ Auth status test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 2: Test Lead Creation
  const testLeadCreation = async () => {
    setIsTesting(true);
    setTestType('Lead Creation');
    clearResults();
    
    try {
      addResult('Testing Zoho CRM lead creation...');
      
      const testLeadData = {
        name: 'Test Lead ' + new Date().toISOString().slice(0, 19),
        email: 'test-lead@example.com',
        phone: '+1234567890',
        message: 'This is a test lead created from the test page',
        productName: 'IBP-120 Test Product',
        leadSource: 'Test Page'
      };

      const response = await fetch('/api/sendToZoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testLeadData),
      });

      const result = await response.json();
      
      if (result.success) {
        addResult('✅ Lead created successfully in Zoho CRM');
        addResult(`Lead ID: ${result.data?.data?.[0]?.details?.id || 'N/A'}`);
        addResult(`Lead Name: ${testLeadData.name}`);
        addResult(`Lead Email: ${testLeadData.email}`);
      } else {
        addResult(`❌ Lead creation failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Lead creation test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 3: Test Lead Storage
  const testLeadStorage = async () => {
    setIsTesting(true);
    setTestType('Lead Storage');
    clearResults();
    
    try {
      addResult('Testing lead storage in database...');
      
      const testLeadData = {
        name: 'Test Storage Lead ' + new Date().toISOString().slice(0, 19),
        email: 'test-storage@example.com',
        phone: '+1234567890',
        message: 'This is a test lead for storage testing',
        source: 'quote_form',
        product_name: 'ACM-100 Test Product',
        product_url: '/products/cartoning/acm-100'
      };

      const response = await fetch('/api/store-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testLeadData),
      });

      const result = await response.json();
      
      if (result.success) {
        addResult('✅ Lead stored successfully in database');
        addResult(`Lead ID: ${result.leadId}`);
        addResult(`Lead Name: ${testLeadData.name}`);
        addResult(`Lead Email: ${testLeadData.email}`);
        addResult(`Source: ${testLeadData.source}`);
      } else {
        addResult(`❌ Lead storage failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Lead storage test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 4: Test Token Management
  const testTokenManagement = async () => {
    setIsTesting(true);
    setTestType('Token Management');
    clearResults();
    
    try {
      addResult('Testing Zoho token management...');
      
      const response = await fetch('/api/zoho-tokens', {
        method: 'GET',
      });

      const result = await response.json();
      
      if (result.success) {
        addResult('✅ Token management working');
        addResult(`Has Access Token: ${result.hasAccessToken ? 'Yes' : 'No'}`);
        addResult(`Has Refresh Token: ${result.hasRefreshToken ? 'Yes' : 'No'}`);
        addResult(`Access Token Valid: ${result.accessTokenValid ? 'Yes' : 'No'}`);
        if (result.accessTokenExpiresAt) {
          addResult(`Token Expires: ${new Date(result.accessTokenExpiresAt).toLocaleString()}`);
        }
        if (result.lastUpdated) {
          addResult(`Last Updated: ${new Date(result.lastUpdated).toLocaleString()}`);
        }
      } else {
        addResult(`❌ Token management failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Token management test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 5: Test Daily Sync
  const testDailySync = async () => {
    setIsTesting(true);
    setTestType('Daily Sync');
    clearResults();
    
    try {
      addResult('Testing daily Zoho sync...');
      
      const response = await fetch('/api/cron/daily-zoho-sync', {
        method: 'GET',
      });

      const result = await response.json();
      
      if (result.success) {
        addResult('✅ Daily sync completed successfully');
        addResult(`Leads Processed: ${result.processedCount || 0}`);
        addResult(`Errors: ${result.errorCount || 0}`);
        addResult(`Message: ${result.message}`);
      } else {
        addResult(`❌ Daily sync failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Daily sync test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 6: Test Stored Leads Processing
  const testStoredLeadsProcessing = async () => {
    setIsTesting(true);
    setTestType('Stored Leads Processing');
    clearResults();
    
    try {
      addResult('Testing stored leads processing...');
      
      const response = await fetch('/api/process-stored-leads', {
        method: 'POST',
      });

      const result = await response.json();
      
      if (result.success) {
        addResult('✅ Stored leads processing completed');
        addResult(`Leads Processed: ${result.processedCount || 0}`);
        addResult(`Errors: ${result.errorCount || 0}`);
        addResult(`Message: ${result.message}`);
      } else {
        addResult(`❌ Stored leads processing failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Stored leads processing test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 7: Test Token Refresh
  const testTokenRefresh = async () => {
    setIsTesting(true);
    setTestType('Token Refresh');
    clearResults();
    
    try {
      addResult('Testing token refresh...');
      
      const response = await fetch('/api/cron/refresh-zoho-tokens', {
        method: 'GET',
      });

      const result = await response.json();
      
      if (result.success) {
        addResult('✅ Token refresh completed successfully');
        addResult(`Message: ${result.message}`);
        if (result.newAccessToken) {
          addResult('New access token generated');
        }
      } else {
        addResult(`❌ Token refresh failed: ${result.error}`);
      }
    } catch (error) {
      addResult(`❌ Token refresh test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Zoho CRM Integration Test</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button
          onClick={testAuthStatus}
          disabled={isTesting}
          className="bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          Test Authentication Status
        </button>
        
        <button
          onClick={testTokenManagement}
          disabled={isTesting}
          className="bg-green-600 text-white p-4 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          Test Token Management
        </button>
        
        <button
          onClick={testTokenRefresh}
          disabled={isTesting}
          className="bg-yellow-600 text-white p-4 rounded-md hover:bg-yellow-700 disabled:bg-yellow-400"
        >
          Test Token Refresh
        </button>
        
        <button
          onClick={testLeadStorage}
          disabled={isTesting}
          className="bg-purple-600 text-white p-4 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
        >
          Test Lead Storage
        </button>
        
        <button
          onClick={testLeadCreation}
          disabled={isTesting}
          className="bg-indigo-600 text-white p-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-400"
        >
          Test Lead Creation
        </button>
        
        <button
          onClick={testDailySync}
          disabled={isTesting}
          className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          Test Daily Sync
        </button>
        
        <button
          onClick={testStoredLeadsProcessing}
          disabled={isTesting}
          className="bg-orange-600 text-white p-4 rounded-md hover:bg-orange-700 disabled:bg-orange-400"
        >
          Test Stored Leads Processing
        </button>
      </div>

      {isTesting && (
        <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-blue-800 font-medium">
            Testing: {testType}...
          </p>
        </div>
      )}

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
            <p className="text-gray-500">No test results yet. Click any test button above to start testing.</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono bg-white p-2 rounded border">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Test Descriptions:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><strong>Authentication Status:</strong> Checks if Zoho CRM is properly authenticated</li>
            <li><strong>Token Management:</strong> Tests token storage and validation</li>
            <li><strong>Token Refresh:</strong> Tests automatic token refresh functionality</li>
            <li><strong>Lead Storage:</strong> Tests storing leads in the database</li>
            <li><strong>Lead Creation:</strong> Tests creating leads directly in Zoho CRM</li>
            <li><strong>Daily Sync:</strong> Tests the automated daily sync process</li>
            <li><strong>Stored Leads Processing:</strong> Tests processing stored leads to Zoho</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Quick Links:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li><a href="/dashboard/zoho-auth" className="text-blue-600 hover:underline">Zoho Authentication Dashboard</a></li>
            <li><a href="/dashboard/zoho-auto-refresh" className="text-blue-600 hover:underline">Zoho Auto Refresh Dashboard</a></li>
            <li><a href="/dashboard/queries" className="text-blue-600 hover:underline">Database Queries Dashboard</a></li>
            <li><a href="/test-chatbot" className="text-blue-600 hover:underline">Chatbot Test Page</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
