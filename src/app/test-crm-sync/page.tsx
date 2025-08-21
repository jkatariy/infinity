'use client';

import { useState } from 'react';

export default function TestCRMSyncPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [testType, setTestType] = useState<string>('');

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  // Test 1: Complete Lead Flow - Website to Supabase to Zoho
  const testCompleteLeadFlow = async () => {
    setIsTesting(true);
    setTestType('Complete Lead Flow');
    clearResults();
    
    try {
      addResult('🚀 Starting complete lead flow test...');
      
      // Step 1: Create a test lead in Supabase
      addResult('📝 Step 1: Creating test lead in Supabase...');
      const testLeadData = {
        name: 'Test Lead ' + new Date().toISOString().slice(0, 19),
        email: 'test-sync@example.com',
        phone: '+1234567890',
        message: 'This is a test lead for CRM sync verification',
        source: 'quote_form',
        product_name: 'IBP-120 Test Product',
        product_url: '/products/bundling-wrapping/ibp-120'
      };

      const storageResponse = await fetch('/api/store-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testLeadData),
      });

      const storageResult = await storageResponse.json();
      
      if (!storageResult.success) {
        addResult(`❌ Step 1 failed: ${storageResult.error}`);
        return;
      }

      addResult(`✅ Step 1 successful: Lead stored with ID ${storageResult.leadId}`);

      // Step 2: Process the stored lead to Zoho CRM
      addResult('🔄 Step 2: Processing lead to Zoho CRM...');
      const processResponse = await fetch('/api/process-stored-leads', {
        method: 'POST',
      });

      const processResult = await processResponse.json();
      
      if (!processResult.success) {
        addResult(`❌ Step 2 failed: ${processResult.error}`);
        return;
      }

      addResult(`✅ Step 2 successful: ${processResult.processedCount} leads processed`);
      addResult(`📊 Processed: ${processResult.processedCount}, Errors: ${processResult.errorCount}`);

      // Step 3: Verify lead was sent to Zoho
      addResult('🔍 Step 3: Verifying lead in Zoho CRM...');
      const verifyResponse = await fetch('/api/sendToZoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Verification Lead ' + new Date().toISOString().slice(0, 19),
          email: 'verify-sync@example.com',
          phone: '+1234567890',
          message: 'This is a verification lead to test Zoho CRM integration',
          productName: 'ACM-100 Verification Product',
          leadSource: 'Sync Test'
        }),
      });

      const verifyResult = await verifyResponse.json();
      
      if (verifyResult.success) {
        addResult(`✅ Step 3 successful: Lead created in Zoho CRM`);
        addResult(`🆔 Zoho Lead ID: ${verifyResult.data?.data?.[0]?.details?.id || 'N/A'}`);
      } else {
        addResult(`❌ Step 3 failed: ${verifyResult.error}`);
      }

      addResult('🎉 Complete lead flow test finished!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 2: Chatbot Lead Flow
  const testChatbotLeadFlow = async () => {
    setIsTesting(true);
    setTestType('Chatbot Lead Flow');
    clearResults();
    
    try {
      addResult('🤖 Starting chatbot lead flow test...');
      
      // Step 1: Create initial chatbot contact
      addResult('📞 Step 1: Creating initial chatbot contact...');
      const initialResponse = await fetch('/api/chatbot-initial-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Chatbot Test Company',
          email: 'chatbot-test@example.com',
          phone: '+1234567890',
        }),
      });

      const initialResult = await initialResponse.json();
      
      if (!initialResult.success) {
        addResult(`❌ Step 1 failed: ${initialResult.error}`);
        return;
      }

      addResult(`✅ Step 1 successful: Initial contact created with ID ${initialResult.leadId}`);

      // Step 2: Update with final details
      addResult('📋 Step 2: Updating with final details...');
      const updateResponse = await fetch('/api/chatbot-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          leadId: initialResult.leadId,
          category: 'bundling-wrapping',
          model_name: 'IBP-120',
          model_label: 'IBP-120 – High Speed Bundler',
          message: 'Chatbot test inquiry for IBP-120 from Chatbot Test Company.',
        }),
      });

      const updateResult = await updateResponse.json();
      
      if (!updateResult.success) {
        addResult(`❌ Step 2 failed: ${updateResult.error}`);
        return;
      }

      addResult(`✅ Step 2 successful: Lead updated with final details`);
      addResult(`🆔 Final Lead ID: ${updateResult.leadId}`);

      addResult('🎉 Chatbot lead flow test finished!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 3: Database Verification
  const testDatabaseVerification = async () => {
    setIsTesting(true);
    setTestType('Database Verification');
    clearResults();
    
    try {
      addResult('🗄️ Starting database verification test...');
      
      // Test Supabase connection
      addResult('🔗 Testing Supabase connection...');
      const testResponse = await fetch('/api/test-env');
      const testResult = await testResponse.json();
      
      if (testResult.NEXT_PUBLIC_SUPABASE_URL && testResult.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        addResult('✅ Supabase environment variables are set');
      } else {
        addResult('❌ Supabase environment variables are missing');
        return;
      }

      // Test lead storage
      addResult('💾 Testing lead storage functionality...');
      const storageTestData = {
        name: 'DB Test Lead ' + new Date().toISOString().slice(0, 19),
        email: 'db-test@example.com',
        phone: '+1234567890',
        message: 'Database verification test lead',
        source: 'quote_form',
        product_name: 'Test Product',
        product_url: '/test'
      };

      const storageResponse = await fetch('/api/store-lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storageTestData),
      });

      const storageResult = await storageResponse.json();
      
      if (storageResult.success) {
        addResult(`✅ Lead storage working: ID ${storageResult.leadId}`);
      } else {
        addResult(`❌ Lead storage failed: ${storageResult.error}`);
        return;
      }

      addResult('🎉 Database verification test finished!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 4: Zoho CRM Direct Test
  const testZohoCRMDirect = async () => {
    setIsTesting(true);
    setTestType('Zoho CRM Direct Test');
    clearResults();
    
    try {
      addResult('🎯 Starting direct Zoho CRM test...');
      
      // Test authentication first
      addResult('🔐 Checking Zoho authentication...');
      const authResponse = await fetch('/api/zoho-tokens');
      const authResult = await authResponse.json();
      
      if (!authResult.success || !authResult.tokenStatus.hasAccessToken) {
        addResult('❌ Zoho authentication failed');
        return;
      }

      addResult('✅ Zoho authentication is working');

      // Test direct lead creation with detailed debug
      addResult('📝 Creating test lead directly in Zoho CRM...');
      const leadData = {
        name: 'Direct Test Lead ' + new Date().toISOString().slice(0, 19),
        email: 'direct-test@example.com',
        phone: '+1234567890',
        message: 'Direct Zoho CRM test lead',
        productName: 'Direct Test Product',
        leadSource: 'Direct Test'
      };

      const createResponse = await fetch('/api/debug-zoho-crm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      const createResult = await createResponse.json();
      
      if (createResult.success) {
        addResult(`✅ Direct lead creation successful`);
        addResult(`🆔 Zoho Lead ID: ${createResult.zohoId || 'N/A'}`);
      } else {
        addResult(`❌ Direct lead creation failed: ${createResult.error}`);
        addResult(`📍 Failed at step: ${createResult.step}`);
        
        // Show detailed debug information
        if (createResult.debug) {
          addResult('🔍 Debug Information:');
          if (createResult.debug.apiUrl) {
            addResult(`   API URL: ${createResult.debug.apiUrl}`);
          }
          if (createResult.debug.responseStatus) {
            addResult(`   Response Status: ${createResult.debug.responseStatus}`);
          }
          if (createResult.debug.responseBody) {
            addResult(`   Response Body: ${createResult.debug.responseBody.substring(0, 200)}...`);
          }
          if (createResult.debug.requestData) {
            addResult(`   Request Data: ${JSON.stringify(createResult.debug.requestData).substring(0, 200)}...`);
          }
        }
      }

      addResult('🎉 Direct Zoho CRM test finished!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  // Test 5: Daily Sync Test
  const testDailySync = async () => {
    setIsTesting(true);
    setTestType('Daily Sync Test');
    clearResults();
    
    try {
      addResult('🔄 Starting daily sync test...');
      
      // Test daily sync process
      addResult('📊 Running daily sync process...');
      const syncResponse = await fetch('/api/cron/daily-zoho-sync');
      const syncResult = await syncResponse.json();
      
      if (syncResult.success) {
        addResult(`✅ Daily sync completed successfully`);
        addResult(`📈 Processed: ${syncResult.processedCount || 0} leads`);
        addResult(`❌ Errors: ${syncResult.errorCount || 0}`);
        addResult(`💬 Message: ${syncResult.message || 'No message'}`);
      } else {
        addResult(`❌ Daily sync failed: ${syncResult.error}`);
      }

      addResult('🎉 Daily sync test finished!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔄 CRM Sync Test Suite</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <button
          onClick={testCompleteLeadFlow}
          disabled={isTesting}
          className="bg-blue-600 text-white p-4 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          Test Complete Lead Flow
        </button>
        
        <button
          onClick={testChatbotLeadFlow}
          disabled={isTesting}
          className="bg-green-600 text-white p-4 rounded-md hover:bg-green-700 disabled:bg-green-400"
        >
          Test Chatbot Lead Flow
        </button>
        
        <button
          onClick={testDatabaseVerification}
          disabled={isTesting}
          className="bg-purple-600 text-white p-4 rounded-md hover:bg-purple-700 disabled:bg-purple-400"
        >
          Test Database Verification
        </button>
        
        <button
          onClick={testZohoCRMDirect}
          disabled={isTesting}
          className="bg-orange-600 text-white p-4 rounded-md hover:bg-orange-700 disabled:bg-orange-400"
        >
          Test Zoho CRM Direct
        </button>
        
        <button
          onClick={testDailySync}
          disabled={isTesting}
          className="bg-red-600 text-white p-4 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          Test Daily Sync
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
            <li><strong>Complete Lead Flow:</strong> Tests the full journey from website form to Supabase to Zoho CRM</li>
            <li><strong>Chatbot Lead Flow:</strong> Tests the chatbot's lead creation and update process</li>
            <li><strong>Database Verification:</strong> Tests Supabase connection and lead storage</li>
            <li><strong>Zoho CRM Direct:</strong> Tests direct lead creation in Zoho CRM</li>
            <li><strong>Daily Sync:</strong> Tests the automated daily sync process</li>
          </ul>
        </div>

        <div className="bg-green-50 p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Expected Results:</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>✅ All tests should complete successfully</li>
            <li>✅ Leads should be stored in Supabase</li>
            <li>✅ Leads should be sent to Zoho CRM</li>
            <li>✅ Zoho Lead IDs should be generated</li>
            <li>✅ No errors in the sync process</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
