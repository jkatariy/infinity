'use client';

import { useState } from 'react';

export default function TestEnvPage() {
  const [envStatus, setEnvStatus] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const checkEnvironmentVariables = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-env');
      const data = await response.json();
      setEnvStatus(data);
    } catch (error) {
      setEnvStatus({ error: 'Failed to check environment variables' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Environment Variables Test</h1>
      
      <button
        onClick={checkEnvironmentVariables}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400 mb-6"
      >
        {loading ? 'Checking...' : 'Check Environment Variables'}
      </button>

      {envStatus && (
        <div className="bg-gray-100 p-4 rounded-md">
          <h2 className="text-xl font-semibold mb-4">Environment Variables Status:</h2>
          <div className="space-y-2">
            {Object.entries(envStatus).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center bg-white p-2 rounded border">
                <span className="font-mono text-sm">{key}:</span>
                <span className={`text-sm ${value ? 'text-green-600' : 'text-red-600'}`}>
                  {value ? '✅ Set' : '❌ Missing'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
        <ul className="list-disc list-inside space-y-1 text-sm">
          <li>Click the button above to check if environment variables are set</li>
          <li>If any show as "Missing", add them to your Vercel project settings</li>
          <li>After adding variables, redeploy your application</li>
          <li>Then test the Zoho authentication again</li>
        </ul>
      </div>
    </div>
  );
}
