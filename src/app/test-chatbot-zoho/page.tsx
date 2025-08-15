'use client';

import { useState } from 'react';

interface TestResult {
  success: boolean;
  message: string;
  leadId?: string;
  zohoId?: string;
  platforms?: {
    supabase: boolean;
    zoho: boolean;
    googleSheets: boolean;
  };
}

export default function TestChatbotZoho() {
  const [formData, setFormData] = useState({
    name: 'Test User',
    email: 'test@example.com',
    phone: '+91-9876543210',
    industry: 'Food & Beverage',
    category: 'cartoning',
    model_name: 'ACM-100',
    model_label: 'ACM-100 Automatic Cartoning Machine',
    notes: 'This is a test chatbot lead submission to verify multi-platform integration.'
  });

  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/chatbot-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setResult({
        success: false,
        message: 'Network error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Test Chatbot → Multi-Platform Integration</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Test Chatbot Lead Submission</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Industry
              </label>
              <select
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Industry</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Personal Care">Personal Care</option>
                <option value="Chemical">Chemical</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Automotive">Automotive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Model
              </label>
              <input
                type="text"
                name="model_name"
                value={formData.model_name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Label
              </label>
              <input
                type="text"
                name="model_label"
                value={formData.model_label}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Testing...' : 'Test Multi-Platform Submission'}
            </button>
          </form>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Multi-Platform Integration
            </h3>
            <div className="space-y-2 text-sm text-blue-800">
              <div>✅ <strong>Supabase Database</strong> - Primary storage</div>
              <div>✅ <strong>Zoho CRM</strong> - Lead management</div>
              <div>✅ <strong>Google Sheets</strong> - Via Google Apps Script (syncs from Supabase)</div>
            </div>
          </div>

          {result && (
            <div className={`border rounded-lg p-6 ${
              result.success 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <h3 className={`text-lg font-semibold mb-3 ${
                result.success ? 'text-green-900' : 'text-red-900'
              }`}>
                {result.success ? '✅ Test Results' : '❌ Test Failed'}
              </h3>
              
              <div className="space-y-2 text-sm">
                <div className={result.success ? 'text-green-800' : 'text-red-800'}>
                  <strong>Message:</strong> {result.message}
                </div>
                
                {result.leadId && (
                  <div className="text-green-800">
                    <strong>Supabase Lead ID:</strong> {result.leadId}
                  </div>
                )}
                
                {result.zohoId && (
                  <div className="text-green-800">
                    <strong>Zoho CRM ID:</strong> {result.zohoId}
                  </div>
                )}
                
                {result.platforms && (
                  <div className="mt-4">
                    <strong>Platform Status:</strong>
                    <div className="mt-2 space-y-1">
                      <div className={`flex items-center ${result.platforms.supabase ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="mr-2">{result.platforms.supabase ? '✅' : '❌'}</span>
                        Supabase Database
                      </div>
                      <div className={`flex items-center ${result.platforms.zoho ? 'text-green-600' : 'text-red-600'}`}>
                        <span className="mr-2">{result.platforms.zoho ? '✅' : '❌'}</span>
                        Zoho CRM
                      </div>
                      <div className={`flex items-center ${result.platforms.googleSheets ? 'text-green-600' : 'text-gray-500'}`}>
                        <span className="mr-2">{result.platforms.googleSheets ? '✅' : '⏳'}</span>
                        Google Sheets {!result.platforms.googleSheets && '(syncs later)'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-yellow-900 mb-3">
              Verification Steps
            </h3>
            <div className="space-y-2 text-sm text-yellow-800">
              <div>1. <strong>Check Supabase:</strong> Visit your Supabase dashboard → chatbot_leads table</div>
              <div>2. <strong>Check Zoho CRM:</strong> Visit <a href="https://crm.zoho.in/crm/org/leads/Home/leads" target="_blank" className="underline">Zoho Leads</a></div>
              <div>3. <strong>Check Google Sheets:</strong> Google Apps Script syncs every 15 minutes</div>
            </div>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Data Flow
            </h3>
            <div className="text-sm text-gray-700 space-y-1">
              <div>Chatbot Lead → API Endpoint</div>
              <div>↓</div>
              <div>Parallel Processing:</div>
              <div className="ml-4">• Supabase Database ✅</div>
              <div className="ml-4">• Zoho CRM Lead ✅</div>
              <div>↓</div>
              <div>Google Apps Script (every 15 min)</div>
              <div>↓</div>
              <div>Google Sheets Update ✅</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
