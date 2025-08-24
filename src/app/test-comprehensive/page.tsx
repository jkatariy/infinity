'use client';

import { useState } from 'react';

export default function ComprehensiveTest() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testResults, setTestResults] = useState<any[]>([]);

  const runComprehensiveTest = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    setTestResults([]);

    const tests = [
      { name: 'System Health', action: 'health' },
      { name: 'Processing Stats', action: 'stats' },
      { name: 'System Status', action: 'status' },
      { name: 'Pending Leads', action: 'pending' },
      { name: 'Error Analysis', action: 'errors' },
      { name: 'System Metrics', action: 'metrics' }
    ];

    const results = [];

    for (const test of tests) {
      try {
        const response = await fetch(`/api/unified-zoho?action=${test.action}`);
        const data = await response.json();
        
        results.push({
          test: test.name,
          success: response.ok && data.success,
          status: response.status,
          data: data,
          error: !response.ok ? data.error : null
        });
      } catch (err) {
        results.push({
          test: test.name,
          success: false,
          status: 500,
          data: null,
          error: err instanceof Error ? err.message : 'Unknown error'
        });
      }
    }

    setTestResults(results);
    setLoading(false);
  };

  const testLeadInsertion = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'store-lead',
          name: 'Test User',
          email: 'test@example.com',
          message: 'This is a test lead from comprehensive audit',
          source: 'quote_form',
          phone: '+1234567890',
          company: 'Test Company'
        }),
      });

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Comprehensive Zoho Integration Test</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <button
            onClick={runComprehensiveTest}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-lg font-semibold"
          >
            {loading ? 'Running Tests...' : 'Run Comprehensive Test'}
          </button>
          
          <button
            onClick={testLeadInsertion}
            disabled={loading}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-lg font-semibold"
          >
            {loading ? 'Testing...' : 'Test Lead Insertion'}
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Running comprehensive tests...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {testResults.length > 0 && (
          <div className="bg-white rounded-lg shadow mb-8">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Test Results</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className={`p-4 rounded-lg border ${
                    result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">{result.test}</h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        result.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {result.success ? 'PASS' : 'FAIL'}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Status: {result.status}</p>
                      {result.error && <p className="text-red-600">Error: {result.error}</p>}
                    </div>
                    {result.data && (
                      <details className="mt-2">
                        <summary className="cursor-pointer text-sm text-blue-600 hover:text-blue-800">
                          View Response Data
                        </summary>
                        <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto max-h-40">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {results && (
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Lead Insertion Test Result</h2>
            </div>
            <div className="p-6">
              <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
