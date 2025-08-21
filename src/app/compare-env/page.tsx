'use client';

import { useState, useEffect } from 'react';

export default function CompareEnvPage() {
  const [debugData, setDebugData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDebugData();
  }, []);

  const loadDebugData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/compare-env');
      const data = await response.json();
      setDebugData(data);
    } catch (error) {
      setMessage('Failed to load debug data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Environment Variables Comparison</h1>
      
      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">📋 Issue Analysis</h2>
        <p className="mb-4">
          You mentioned that your <strong>local .env.local</strong> and <strong>Vercel environment variables</strong> vary, 
          which can cause authentication issues.
        </p>
        <p className="mb-4">
          <strong>Your Vercel Environment Variables:</strong>
        </p>
        <div className="bg-white p-4 rounded border font-mono text-xs">
          ZOHO_OAUTH_STATE=infinity_automated_solutions_2024<br/>
          ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ<br/>
          ZOHO_ACCOUNTS_URL=https://accounts.zoho.in<br/>
          ZOHO_API_DOMAIN=https://www.zohoapis.in<br/>
          ZOHO_CLIENT_ID=1000.9OEZV2LKCCD0XHG7JYWP1SBT9OATCA<br/>
          ZOHO_CLIENT_SECRET=8f31d1c9dbcaf51ac866e3ed11182a727113dc6522<br/>
          ZOHO_REDIRECT_URI=https://infinitysols.com/api/oauth/callback
        </div>
      </div>
      
      <div className="mb-8">
        <button
          onClick={loadDebugData}
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:bg-blue-400"
        >
          🔄 Refresh Comparison
        </button>
      </div>

      {message && (
        <div className="bg-gray-100 p-4 rounded-md mb-6">
          <h3 className="font-semibold mb-2">Status:</h3>
          <p>{message}</p>
        </div>
      )}

      {debugData && (
        <div className="space-y-6">
          {/* Summary */}
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">📊 Summary:</h3>
            <div className="space-y-2">
              <div><strong>Total Variables:</strong> {debugData.debug.summary.total}</div>
              <div><strong>Matches:</strong> {debugData.debug.summary.matches} ✅</div>
              <div><strong>Differences:</strong> {debugData.debug.summary.differences} ❌</div>
            </div>
          </div>

          {/* Matches */}
          {debugData.debug.matches.length > 0 && (
            <div className="bg-green-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">✅ Matching Variables:</h3>
              <div className="space-y-2">
                {debugData.debug.matches.map((match: any, index: number) => (
                  <div key={index} className="flex justify-between items-center bg-white p-2 rounded border">
                    <span className="font-mono text-sm">{match.key}:</span>
                    <span className="text-sm text-green-600">{match.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Differences */}
          {debugData.debug.differences.length > 0 && (
            <div className="bg-red-50 p-4 rounded-md">
              <h3 className="text-lg font-semibold mb-2">❌ Different Variables:</h3>
              <div className="space-y-4">
                {debugData.debug.differences.map((diff: any, index: number) => (
                  <div key={index} className="bg-white p-3 rounded border">
                    <div className="font-semibold text-red-600 mb-2">{diff.key}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <strong>Expected:</strong>
                        <div className="bg-green-100 p-2 rounded font-mono text-xs break-all">
                          {diff.expected}
                        </div>
                      </div>
                      <div>
                        <strong>Actual:</strong>
                        <div className="bg-red-100 p-2 rounded font-mono text-xs break-all">
                          {diff.actual || 'MISSING'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-orange-50 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">💡 Recommendations:</h3>
            <ul className="list-disc list-inside space-y-1">
              {debugData.debug.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-sm">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">📋 How to Fix Environment Variable Differences:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Check your local .env.local file</strong> - Make sure it matches the Vercel values above</li>
          <li><strong>Update Vercel environment variables</strong> - Go to Vercel Dashboard → Project Settings → Environment Variables</li>
          <li><strong>Add missing variables</strong> - Make sure all required variables are set in Vercel</li>
          <li><strong>Redeploy your application</strong> - After updating variables, redeploy to apply changes</li>
          <li><strong>Test authentication</strong> - Try the OAuth flow again after fixing variables</li>
        </ol>
      </div>

      <div className="mt-8 bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">🔗 Quick Links:</h3>
        <div className="space-y-2">
          <a href="/fix-indian-zoho-simple" className="text-blue-600 hover:underline block">
            🇮🇳 Fix Indian Zoho Authentication
          </a>
          <a href="/debug-oauth" className="text-blue-600 hover:underline block">
            🔍 OAuth Flow Debug
          </a>
          <a href="/test-indian-zoho" className="text-blue-600 hover:underline block">
            🧪 Test Indian Zoho Integration
          </a>
        </div>
      </div>
    </div>
  );
}
