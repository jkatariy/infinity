'use client';

import { useState, useEffect } from 'react';

interface AuthStatus {
  authenticated: boolean;
  message: string;
}

export default function TestZohoPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/sendToZoho', { method: 'GET' });
      const result = await response.json();
      setAuthStatus(result);
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const authenticate = () => {
    window.location.href = '/api/oauth/authorize';
  };

  const testSubmission = async () => {
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      phone: '+91-9876543210',
      company: 'Test Company',
      message: 'This is a test quote request',
      productInterest: 'Test Product',
      budgetRange: '10-25 Lakhs',
      timeline: '3-6 months'
    };

    try {
      setIsLoading(true);
      const response = await fetch('/api/sendToZoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });
      
      const result = await response.json();
      alert(JSON.stringify(result, null, 2));
    } catch (error) {
      alert('Error: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Zoho CRM Test Page</h1>
      
      {/* Authentication Status */}
      <div className="mb-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Authentication Status</h2>
        
        {isLoading ? (
          <p className="text-gray-600">Checking...</p>
        ) : authStatus ? (
          <div className={`p-4 rounded-lg ${
            authStatus.authenticated 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}>
            <p className="font-semibold">
              {authStatus.authenticated ? '✅ Connected' : '❌ Not Connected'}
            </p>
            <p className="text-sm mt-1">{authStatus.message}</p>
          </div>
        ) : (
          <p className="text-gray-600">Unable to check status</p>
        )}
      </div>

      {/* Actions */}
      <div className="space-y-4">
        {!authStatus?.authenticated && (
          <button
            onClick={authenticate}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            🔐 Authenticate with Zoho CRM
          </button>
        )}

        <button
          onClick={checkAuth}
          disabled={isLoading}
          className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 disabled:opacity-50"
        >
          🔄 Refresh Status
        </button>

        {authStatus?.authenticated && (
          <button
            onClick={testSubmission}
            disabled={isLoading}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            🧪 Test Quote Submission
          </button>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-3">Instructions:</h3>
        <ol className="text-blue-800 space-y-2">
          <li>1. Click "Authenticate with Zoho CRM" if not connected</li>
          <li>2. Complete the OAuth flow on Zoho's website</li>
          <li>3. You'll be redirected back here</li>
          <li>4. Test the integration with a sample quote</li>
        </ol>
      </div>

      {/* Direct Links */}
      <div className="mt-6 space-y-2 text-sm">
        <p><strong>Direct OAuth Link:</strong></p>
        <a 
          href="/api/oauth/authorize" 
          className="text-blue-600 hover:underline"
        >
          http://localhost:3000/api/oauth/authorize
        </a>
        
        <p className="mt-4"><strong>Test Quote Form:</strong></p>
        <a 
          href="/products/cartoning/acm-100/" 
          className="text-blue-600 hover:underline"
        >
          http://localhost:3000/products/cartoning/acm-100/
        </a>
      </div>
    </div>
  );
}
