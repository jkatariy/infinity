'use client';

import { useState } from 'react';

export default function SetupNewZoho() {
  const [step, setStep] = useState(1);
  const [credentials, setCredentials] = useState({
    clientId: '1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD',
    clientSecret: '9939a4e704fcbe859813bc379d9b61d00af978d5a9'
  });

  const steps = [
    {
      title: "Create Zoho App",
      content: (
        <div className="space-y-4">
          <p>1. Go to <a href="https://api-console.zoho.com/" target="_blank" className="text-blue-600 underline">Zoho API Console</a></p>
          <p>2. Click "Add Client" → "Server-based Applications"</p>
          <p>3. Fill in:</p>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm">
            <div>Client Name: Infinity Automated Solutions CRM</div>
            <div>Homepage URL: https://infinitysols.vercel.app</div>
            <div>Redirect URIs:</div>
            <div className="ml-4">https://infinitysols.vercel.app/api/oauth/callback</div>
            <div className="ml-4">http://localhost:3000/api/oauth/callback</div>
          </div>
          <p>4. Click "Create" and copy the credentials</p>
        </div>
      )
    },
    {
      title: "Enter New Credentials",
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">New Client ID:</label>
            <input
              type="text"
              value={credentials.clientId}
              onChange={(e) => setCredentials({...credentials, clientId: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="1000.XXXXXXXXXXXXXXXXX"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Client Secret:</label>
            <input
              type="text"
              value={credentials.clientSecret}
              onChange={(e) => setCredentials({...credentials, clientSecret: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
            />
          </div>
        </div>
      )
    },
    {
      title: "Update Environment Variables",
      content: (
        <div className="space-y-4">
          <p>Copy these to your <strong>Vercel Environment Variables</strong>:</p>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm space-y-1">
            <div>ZOHO_CLIENT_ID={credentials.clientId || 'YOUR_NEW_CLIENT_ID'}</div>
            <div>ZOHO_CLIENT_SECRET={credentials.clientSecret || 'YOUR_NEW_CLIENT_SECRET'}</div>
            <div>ZOHO_REDIRECT_URI=https://infinitysols.vercel.app/api/oauth/callback</div>
            <div>ZOHO_ACCOUNTS_URL=https://accounts.zoho.com</div>
            <div>ZOHO_API_DOMAIN=https://www.zohoapis.com</div>
            <div>ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ</div>
            <div>ZOHO_OAUTH_STATE=infinity_automated_solutions_2024</div>
          </div>
          
          <p>Also update your <strong>.env.local</strong> file:</p>
          <div className="bg-gray-100 p-4 rounded font-mono text-sm space-y-1">
            <div>ZOHO_CLIENT_ID={credentials.clientId || 'YOUR_NEW_CLIENT_ID'}</div>
            <div>ZOHO_CLIENT_SECRET={credentials.clientSecret || 'YOUR_NEW_CLIENT_SECRET'}</div>
            <div>ZOHO_REDIRECT_URI=http://localhost:3000/api/oauth/callback</div>
            <div>ZOHO_ACCOUNTS_URL=https://accounts.zoho.com</div>
            <div>ZOHO_API_DOMAIN=https://www.zohoapis.com</div>
            <div>ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ</div>
            <div>ZOHO_OAUTH_STATE=infinity_automated_solutions_2024</div>
            <div>NODE_ENV=development</div>
            <div>DEBUG_ZOHO=true</div>
          </div>
        </div>
      )
    },
    {
      title: "Test Setup",
      content: (
        <div className="space-y-4">
          <p>After updating environment variables:</p>
          <div className="space-y-2">
            <a 
              href="/debug-env" 
              target="_blank"
              className="block bg-blue-600 text-white px-4 py-2 rounded text-center hover:bg-blue-700"
            >
              1. Check Environment Variables
            </a>
            <a 
              href="/test-oauth-minimal" 
              target="_blank"
              className="block bg-green-600 text-white px-4 py-2 rounded text-center hover:bg-green-700"
            >
              2. Test OAuth URLs
            </a>
            <a 
              href="/test-zoho" 
              target="_blank"
              className="block bg-purple-600 text-white px-4 py-2 rounded text-center hover:bg-purple-700"
            >
              3. Test Full Integration
            </a>
            <a 
              href="/products/cartoning/acm-100/" 
              target="_blank"
              className="block bg-orange-600 text-white px-4 py-2 rounded text-center hover:bg-orange-700"
            >
              4. Test Quote Form
            </a>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Setup New Zoho App</h1>
      
      <div className="mb-8">
        <div className="flex space-x-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setStep(index + 1)}
              className={`px-4 py-2 rounded ${
                step === index + 1 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Step {index + 1}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Step {step}: {steps[step - 1].title}
        </h2>
        
        {steps[step - 1].content}
        
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="px-6 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => setStep(Math.min(steps.length, step + 1))}
            disabled={step === steps.length}
            className="px-6 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      <div className="mt-8 bg-red-50 border border-red-200 p-6 rounded-lg">
        <h3 className="font-semibold text-red-900 mb-3">Why This Happened:</h3>
        <p className="text-red-800 text-sm">
          The Client ID <code>1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK</code> doesn't exist in your Zoho account. 
          This could be because you're signed into a different Zoho account, or the app was deleted, 
          or the credentials were from a different source.
        </p>
      </div>
    </div>
  );
}
