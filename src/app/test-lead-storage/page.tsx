'use client';

import { useState } from 'react';

export default function TestLeadStoragePage() {
  const [testResult, setTestResult] = useState<any>(null);
  const [isTesting, setIsTesting] = useState(false);

  const testLeadStorage = async () => {
    setIsTesting(true);
    setTestResult(null);

    try {
      const response = await fetch('/api/test-lead-storage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        error: 'Network error',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Lead Storage Test</h1>
        
        <div className="space-y-6">
          {/* Test Button */}
          <div className="p-4 bg-blue-50 rounded-md">
            <h2 className="font-semibold text-blue-900 mb-2">Test Lead Storage</h2>
            <p className="text-blue-800 mb-4">
              Click the button below to test if lead storage is working properly.
            </p>
            <button
              onClick={testLeadStorage}
              disabled={isTesting}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isTesting ? 'Testing...' : 'Test Lead Storage'}
            </button>
          </div>

          {/* Test Result */}
          {testResult && (
            <div className={`p-4 rounded-md ${
              testResult.success ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <h3 className={`font-semibold mb-2 ${
                testResult.success ? 'text-green-900' : 'text-red-900'
              }`}>
                Test Result: {testResult.success ? 'SUCCESS' : 'FAILED'}
              </h3>
              <pre className="text-sm overflow-auto">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}

          {/* Database Setup Instructions */}
          <div className="p-4 bg-yellow-50 rounded-md">
            <h2 className="font-semibold text-yellow-900 mb-2">Database Setup Instructions</h2>
            <p className="text-yellow-800 mb-4">
              If the test fails with a "relation does not exist" error, the <code>zoho_leads</code> table needs to be created.
            </p>
            
            <div className="bg-gray-100 p-4 rounded">
              <h3 className="font-medium text-gray-900 mb-2">Manual SQL to Run in Supabase Dashboard:</h3>
              <pre className="text-sm text-gray-800 overflow-auto">
{`-- Create zoho_leads table
CREATE TABLE IF NOT EXISTS public.zoho_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  message TEXT NOT NULL,
  source TEXT NOT NULL CHECK (source IN ('quote_form', 'chatbot')),
  product_name TEXT,
  product_url TEXT,
  sent_to_zoho BOOLEAN DEFAULT FALSE,
  zoho_lead_id TEXT,
  zoho_contact_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_zoho_leads_sent_to_zoho ON public.zoho_leads(sent_to_zoho);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_created_at ON public.zoho_leads(created_at);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_source ON public.zoho_leads(source);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_email ON public.zoho_leads(email);

-- Enable RLS
ALTER TABLE public.zoho_leads ENABLE ROW LEVEL SECURITY;

-- Create policy
CREATE POLICY "Service role can manage zoho leads" ON public.zoho_leads
  FOR ALL USING (auth.role() = 'service_role');`}
              </pre>
            </div>

            <div className="mt-4 text-sm text-yellow-800">
              <p><strong>Steps:</strong></p>
              <ol className="list-decimal list-inside space-y-1 mt-2">
                <li>Go to your Supabase Dashboard</li>
                <li>Navigate to SQL Editor</li>
                <li>Paste the SQL above and run it</li>
                <li>Come back and test again</li>
              </ol>
            </div>
          </div>

          {/* Current Issue Summary */}
          <div className="p-4 bg-red-50 rounded-md">
            <h2 className="font-semibold text-red-900 mb-2">Current Issue</h2>
            <p className="text-red-800">
              The request quote forms are not storing leads because the <code>zoho_leads</code> table doesn't exist in the database. 
              This table is required for the <code>storeLeadData</code> function to work properly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
