'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ZohoAdminPanelProps {
  className?: string;
}

export default function ZohoAdminPanel({ className = '' }: ZohoAdminPanelProps) {
  const [authStatus, setAuthStatus] = useState<{
    authenticated: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkAuthStatus = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/sendToZoho', { method: 'GET' });
      const result = await response.json();
      setAuthStatus(result);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setAuthStatus({
        authenticated: false,
        message: 'Error checking authentication status'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const initiateAuth = () => {
    window.location.href = '/api/oauth/authorize';
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4">
        <h3 className="text-xl font-bold text-white">Zoho CRM Integration</h3>
        <p className="text-blue-100 text-sm">Manage your CRM connection and authentication</p>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Authentication Status */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Connection Status</h4>
          
          {isLoading ? (
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <svg className="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-gray-600">Checking connection status...</span>
            </div>
          ) : authStatus ? (
            <div className={`flex items-center space-x-3 p-4 rounded-lg ${
              authStatus.authenticated 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              {authStatus.authenticated ? (
                <svg className="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
              <div>
                <p className={`font-medium ${authStatus.authenticated ? 'text-green-800' : 'text-red-800'}`}>
                  {authStatus.authenticated ? 'Connected to Zoho CRM' : 'Not Connected'}
                </p>
                <p className={`text-sm ${authStatus.authenticated ? 'text-green-600' : 'text-red-600'}`}>
                  {authStatus.message}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {/* Actions */}
        <div className="space-y-4">
          {!authStatus?.authenticated && (
            <button
              onClick={initiateAuth}
              className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Connect to Zoho CRM</span>
            </button>
          )}

          <button
            onClick={checkAuthStatus}
            disabled={isLoading}
            className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh Status</span>
          </button>
        </div>

        {/* Configuration Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">Configuration</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Client ID:</span>
              <span className="text-gray-900 font-mono">1000.TKUX...L9ZK</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Data Center:</span>
              <span className="text-gray-900">Global (.com)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Scope:</span>
              <span className="text-gray-900">CRM Modules + Settings</span>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h5 className="font-semibold text-blue-900 mb-2">How to Use:</h5>
          <ol className="text-sm text-blue-800 space-y-1">
            <li>1. Click "Connect to Zoho CRM" to authenticate</li>
            <li>2. Complete the authorization on Zoho's website</li>
            <li>3. You'll be redirected back to the dashboard</li>
            <li>4. All quote forms will now send data to Zoho CRM</li>
          </ol>
        </div>

        {/* API Endpoints */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-lg font-semibold text-gray-900 mb-3">API Endpoints</h4>
          <div className="space-y-2 text-sm font-mono bg-gray-50 p-3 rounded-lg">
            <div><span className="text-green-600">GET</span> /api/oauth/authorize</div>
            <div><span className="text-green-600">GET</span> /api/oauth/callback</div>
            <div><span className="text-blue-600">POST</span> /api/sendToZoho</div>
            <div><span className="text-green-600">GET</span> /api/sendToZoho</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
