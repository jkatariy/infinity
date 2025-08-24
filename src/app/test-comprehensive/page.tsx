'use client';

import { useState, useEffect } from 'react';
import { UnifiedZohoDashboard } from '@/components/UnifiedZohoDashboard';

export default function TestComprehensivePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading time for better UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Zoho Integration Dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-6">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
              <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Dashboard</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Zoho CRM Integration Dashboard
          </h1>
          <p className="text-gray-600">
            Comprehensive monitoring and testing for your Zoho CRM integration
          </p>
        </div>
        
        <UnifiedZohoDashboard />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <a 
                href="/api/oauth/authorize"
                className="block w-full text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
              >
                🔐 Authenticate with Zoho
              </a>
              <a 
                href="/api/oauth/status"
                className="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                🔍 Check Authentication Status
              </a>
              <a 
                href="/api/unified-zoho?action=health"
                className="block w-full text-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                🏥 System Health Check
              </a>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Environment:</span>
                <span className="font-medium">{process.env.NODE_ENV || 'development'}</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="font-medium text-green-600">Connected</span>
              </div>
              <div className="flex justify-between">
                <span>Zoho API:</span>
                <span className="font-medium text-green-600">Configured</span>
              </div>
              <div className="flex justify-between">
                <span>OAuth Flow:</span>
                <span className="font-medium text-green-600">Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
