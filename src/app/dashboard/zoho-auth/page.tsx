'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface TokenStatus {
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
  accessTokenValid: boolean;
  accessTokenExpiresAt?: number;
  lastUpdated?: string;
}

interface AuthStatus {
  success: boolean;
  tokenStatus: TokenStatus;
  hasTokens: boolean;
  accessTokenValid: boolean;
  environment: {
    hasClientId: boolean;
    hasClientSecret: boolean;
    hasAccountsUrl: boolean;
    hasApiDomain: boolean;
    hasRedirectUri: boolean;
  };
}

export default function ZohoAuthPage() {
  const [authStatus, setAuthStatus] = useState<AuthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    checkAuthStatus();
    
    // Check for success/error messages from OAuth callback
    const success = searchParams.get('success');
    const error = searchParams.get('error');
    const authenticated = searchParams.get('authenticated');
    
    if (success === 'oauth_complete') {
      setMessage('✅ OAuth authentication completed successfully!');
    } else if (error) {
      setMessage(`❌ Error: ${decodeURIComponent(error)}`);
    } else if (authenticated === 'true') {
      setMessage('✅ Authentication verified successfully!');
    }
  }, [searchParams]);

  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/unified-zoho?action=health');
      const data = await response.json();
      setAuthStatus(data);
    } catch (error) {
      console.error('Error checking auth status:', error);
      setMessage('❌ Error checking authentication status');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthenticate = () => {
    window.location.href = '/api/oauth/authorize';
  };

  const handleRefreshToken = async () => {
    try {
      setActionLoading(true);
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'refresh-token' }),
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Token refreshed successfully!');
        await checkAuthStatus();
      } else {
        setMessage(`❌ Failed to refresh token: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Error refreshing token');
    } finally {
      setActionLoading(false);
    }
  };

  const handleClearTokens = async () => {
    if (!confirm('Are you sure you want to clear all stored tokens? This will require re-authentication.')) {
      return;
    }
    
    try {
      setActionLoading(true);
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'clear-tokens' }),
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ All tokens cleared successfully!');
        await checkAuthStatus();
      } else {
        setMessage(`❌ Failed to clear tokens: ${data.error}`);
      }
    } catch (error) {
      setMessage('❌ Error clearing tokens');
    } finally {
      setActionLoading(false);
    }
  };

  const formatDate = (timestamp?: number) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp * 1000).toLocaleString();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Zoho CRM Authentication</h1>
            <Link 
              href="/dashboard/zoho-auto-refresh"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              🔄 Auto-Refresh Monitor
            </Link>
          </div>
          
          {message && (
            <div className={`p-4 rounded-md mb-6 ${
              message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Auto-Refresh Status Banner */}
          {authStatus?.tokenStatus.hasRefreshToken && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Auto-Refresh System Active
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>Your tokens will be automatically refreshed every 45 minutes. Visit the Auto-Refresh Monitor to track the system status.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Authentication Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Authentication Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Token Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Access Token:</span>
                    <span className={authStatus?.tokenStatus.hasAccessToken ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.tokenStatus.hasAccessToken ? '✅ Present' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refresh Token:</span>
                    <span className={authStatus?.tokenStatus.hasRefreshToken ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.tokenStatus.hasRefreshToken ? '✅ Present' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Access Token Valid:</span>
                    <span className={authStatus?.tokenStatus.accessTokenValid ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.tokenStatus.accessTokenValid ? '✅ Valid' : '❌ Invalid/Expired'}
                    </span>
                  </div>
                  {authStatus?.tokenStatus.accessTokenExpiresAt && (
                    <div className="flex justify-between">
                      <span>Expires At:</span>
                      <span className="text-gray-600">
                        {formatDate(authStatus.tokenStatus.accessTokenExpiresAt)}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Environment</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Client ID:</span>
                    <span className={authStatus?.environment.hasClientId ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.environment.hasClientId ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Client Secret:</span>
                    <span className={authStatus?.environment.hasClientSecret ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.environment.hasClientSecret ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Accounts URL:</span>
                    <span className={authStatus?.environment.hasAccountsUrl ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.environment.hasAccountsUrl ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>API Domain:</span>
                    <span className={authStatus?.environment.hasApiDomain ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.environment.hasApiDomain ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Redirect URI:</span>
                    <span className={authStatus?.environment.hasRedirectUri ? 'text-green-600' : 'text-red-600'}>
                      {authStatus?.environment.hasRedirectUri ? '✅ Set' : '❌ Missing'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4">
            {!authStatus?.tokenStatus.hasAccessToken || !authStatus?.tokenStatus.accessTokenValid ? (
              <button
                onClick={handleAuthenticate}
                disabled={actionLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                {actionLoading ? 'Processing...' : '🔐 Authenticate with Zoho'}
              </button>
            ) : (
              <button
                onClick={handleRefreshToken}
                disabled={actionLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
              >
                {actionLoading ? 'Processing...' : '🔄 Refresh Token'}
              </button>
            )}

            <button
              onClick={handleClearTokens}
              disabled={actionLoading}
              className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {actionLoading ? 'Processing...' : '🗑️ Clear All Tokens'}
            </button>

            <button
              onClick={checkAuthStatus}
              disabled={actionLoading}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {actionLoading ? 'Loading...' : '🔄 Refresh Status'}
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-8 p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">Instructions</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Authenticate:</strong> Start the OAuth flow to get new tokens</p>
              <p>• <strong>Refresh Token:</strong> Use existing refresh token to get a new access token</p>
              <p>• <strong>Clear Tokens:</strong> Remove all stored tokens (requires re-authentication)</p>
              <p>• <strong>Refresh Status:</strong> Check current authentication status</p>
              <p>• <strong>Auto-Refresh Monitor:</strong> Track automatic token refresh system</p>
            </div>
          </div>

          {/* Auto-Refresh Info */}
          <div className="mt-6 p-4 bg-green-50 rounded-md">
            <h3 className="font-medium text-green-900 mb-2">🔄 Automatic Token Refresh</h3>
            <div className="text-sm text-green-800 space-y-1">
              <p>• <strong>Frequency:</strong> Every 45 minutes automatically</p>
              <p>• <strong>Smart Refresh:</strong> Only refreshes when token is about to expire</p>
              <p>• <strong>Zero Downtime:</strong> Your authentication stays active forever</p>
              <p>• <strong>Monitoring:</strong> Real-time status tracking available</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
