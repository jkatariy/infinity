'use client';

import { useState, useEffect } from 'react';

export default function TestAutomationPipelinePage() {
  const [testData, setTestData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    runPipelineTest();
  }, []);

  const runPipelineTest = async () => {
    setLoading(true);
    setMessage('🔍 Running automation pipeline test...');
    try {
      const response = await fetch('/api/test-automation-pipeline');
      const data = await response.json();
      setTestData(data);
      
      if (data.success) {
        const { automationReady, passedSteps, totalSteps } = data.testResults.summary;
        if (automationReady) {
          setMessage(`✅ Automation pipeline is READY! ${passedSteps}/${totalSteps} steps passed`);
        } else {
          setMessage(`⚠️ Automation pipeline needs attention. ${passedSteps}/${totalSteps} steps passed`);
        }
      } else {
        setMessage(`❌ Test failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to run pipeline test');
    } finally {
      setLoading(false);
    }
  };

  const simulateDailySync = async () => {
    setLoading(true);
    setMessage('🔄 Simulating daily sync...');
    try {
      const response = await fetch('/api/test-automation-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'simulate_daily_sync' })
      });
      const data = await response.json();
      
      if (data.success) {
        const { pendingLeads, readyForSync } = data.summary;
        setMessage(`✅ Daily sync simulation completed! ${pendingLeads} pending leads, ready for sync: ${readyForSync ? 'Yes' : 'No'}`);
      } else {
        setMessage(`❌ Sync simulation failed: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to simulate daily sync');
    } finally {
      setLoading(false);
    }
  };

  const clearTestData = async () => {
    setLoading(true);
    setMessage('🧹 Clearing test data...');
    try {
      const response = await fetch('/api/test-automation-pipeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear_test_data' })
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Test data cleared successfully');
        setTimeout(runPipelineTest, 1000);
      } else {
        setMessage(`❌ Failed to clear test data: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Failed to clear test data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'text-green-600';
      case 'failed': return 'text-red-600';
      case 'skipped': return 'text-yellow-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return '✅';
      case 'failed': return '❌';
      case 'skipped': return '⏭️';
      case 'running': return '🔄';
      default: return '❓';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🤖 Automation Pipeline Test</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">🔄 Daily Automation Flow</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🕐</span>
            <div>
              <strong>9:00 AM IST Daily</strong>
              <p className="text-sm text-gray-600">Cron job triggers at `/api/cron/daily-zoho-sync`</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">🔐</span>
            <div>
              <strong>Token Refresh</strong>
              <p className="text-sm text-gray-600">Automatically refreshes Zoho access token using refresh token</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📋</span>
            <div>
              <strong>Fetch Pending Leads</strong>
              <p className="text-sm text-gray-600">Gets all leads from Supabase where `sent_to_zoho = false`</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">📤</span>
            <div>
              <strong>Send to Zoho CRM</strong>
              <p className="text-sm text-gray-600">Creates leads in Zoho CRM using Indian server (`zohoapis.in`)</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl">✅</span>
            <div>
              <strong>Mark as Sent</strong>
              <p className="text-sm text-gray-600">Updates Supabase with `sent_to_zoho = true` and Zoho lead ID</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <button
          onClick={runPipelineTest}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mr-4"
        >
          🔄 Run Pipeline Test
        </button>
        
        <button
          onClick={simulateDailySync}
          disabled={loading || !testData?.testResults?.summary?.automationReady}
          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 disabled:bg-green-400 mr-4"
        >
          🕐 Simulate Daily Sync
        </button>
        
        <button
          onClick={clearTestData}
          disabled={loading}
          className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 disabled:bg-red-400"
        >
          🧹 Clear Test Data
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      {testData && testData.success && (
        <div className="space-y-6">
          {/* Summary */}
          <div className={`p-4 rounded-md ${testData.testResults.summary.automationReady ? 'bg-green-50' : 'bg-yellow-50'}`}>
            <h3 className="text-lg font-semibold mb-2">
              {testData.testResults.summary.automationReady ? '✅ Automation Ready' : '⚠️ Automation Needs Attention'}
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{testData.testResults.summary.totalSteps}</div>
                <div className="text-sm text-gray-600">Total Steps</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{testData.testResults.summary.passedSteps}</div>
                <div className="text-sm text-gray-600">Passed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">{testData.testResults.summary.failedSteps}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{testData.testResults.summary.totalSteps - testData.testResults.summary.passedSteps - testData.testResults.summary.failedSteps}</div>
                <div className="text-sm text-gray-600">Skipped</div>
              </div>
            </div>
          </div>

          {/* Environment Variables */}
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🌐 Environment Variables:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {Object.entries(testData.testResults.environment).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center bg-white p-2 rounded border">
                  <span className="font-mono text-sm">{key}:</span>
                  <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                    {String(value || 'Not set')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Test Steps */}
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">🧪 Test Steps:</h3>
            <div className="space-y-3">
              {testData.testResults.steps.map((step: any) => (
                <div key={step.step} className="flex items-start space-x-3 bg-white p-3 rounded border">
                  <span className="text-lg">{getStatusIcon(step.status)}</span>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getStatusColor(step.status)}`}>
                        Step {step.step}: {step.name}
                      </span>
                      <span className={`text-sm px-2 py-1 rounded ${getStatusColor(step.status)} bg-opacity-10`}>
                        {step.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Status */}
          <div className={`p-4 rounded-md ${testData.testResults.summary.automationReady ? 'bg-green-50' : 'bg-red-50'}`}>
            <h3 className="text-lg font-semibold mb-2">
              {testData.testResults.summary.automationReady ? '🎉 Automation Status: READY' : '⚠️ Automation Status: NOT READY'}
            </h3>
            <p className="text-sm">
              {testData.testResults.summary.automationReady 
                ? 'Your automation pipeline is fully configured and ready to run daily at 9 AM IST. The system will automatically refresh tokens, fetch pending leads from Supabase, and send them to Zoho CRM.'
                : 'Some critical steps failed. Please fix the issues above before the automation can run successfully.'
              }
            </p>
          </div>
        </div>
      )}

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 Automation Checklist:</h3>
        <ul className="list-disc list-inside space-y-2">
          <li>✅ Environment variables configured</li>
          <li>✅ Zoho OAuth authentication completed</li>
          <li>✅ Token refresh mechanism working</li>
          <li>✅ Zoho API connectivity verified</li>
          <li>✅ Supabase lead storage functional</li>
          <li>✅ Cron job endpoint accessible</li>
          <li>✅ Vercel cron job configured (9 AM IST daily)</li>
        </ul>
      </div>

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/debug-complete-zoho" className="text-blue-600 hover:underline block">
            🔍 Complete Zoho Debug
          </a>
          <a href="/test-crm-sync" className="text-blue-600 hover:underline block">
            🔄 Test CRM Sync
          </a>
          <a href="/test-indian-zoho" className="text-blue-600 hover:underline block">
            🇮🇳 Test Indian Zoho
          </a>
        </div>
      </div>
    </div>
  );
}
