'use client';

import { useState } from 'react';

export default function TestChatbotPage() {
  const [testResults, setTestResults] = useState<string[]>([]);
  const [isTesting, setIsTesting] = useState(false);

  const addResult = (message: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testChatbotFlow = async () => {
    setIsTesting(true);
    setTestResults([]);
    
    try {
      addResult('Starting chatbot flow test...');
      
      // Step 1: Test initial contact
      addResult('Testing initial contact API...');
      const initialResponse = await fetch('/api/chatbot-initial-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Test Company',
          email: 'test@example.com',
          phone: '+1234567890',
        }),
      });

      const initialResult = await initialResponse.json();
      
      if (!initialResult.success) {
        addResult(`❌ Initial contact failed: ${initialResult.error}`);
        return;
      }

      addResult(`✅ Initial contact successful. Lead ID: ${initialResult.leadId}`);

      // Step 2: Test lead update
      addResult('Testing lead update API...');
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
          message: 'Test chatbot inquiry for IBP-120 from Test Company.',
        }),
      });

      const updateResult = await updateResponse.json();
      
      if (!updateResult.success) {
        addResult(`❌ Lead update failed: ${updateResult.error}`);
        return;
      }

      addResult(`✅ Lead update successful. Lead ID: ${updateResult.leadId}`);
      addResult('🎉 Chatbot flow test completed successfully!');

    } catch (error) {
      addResult(`❌ Test failed with error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Chatbot API Test</h1>
      
      <div className="mb-6">
        <button
          onClick={testChatbotFlow}
          disabled={isTesting}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          {isTesting ? 'Testing...' : 'Test Chatbot Flow'}
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-md">
        <h2 className="text-xl font-semibold mb-4">Test Results:</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {testResults.length === 0 ? (
            <p className="text-gray-500">No test results yet. Click the button above to start testing.</p>
          ) : (
            testResults.map((result, index) => (
              <div key={index} className="text-sm font-mono">
                {result}
              </div>
            ))
          )}
        </div>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">What this test does:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Creates an initial contact via <code>/api/chatbot-initial-contact</code></li>
          <li>Updates the lead with product details via <code>/api/chatbot-leads</code></li>
          <li>Verifies that the leadId is properly passed between API calls</li>
          <li>Checks that both endpoints return success responses</li>
        </ul>
      </div>
    </div>
  );
}
