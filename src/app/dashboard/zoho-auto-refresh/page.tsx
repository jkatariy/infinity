'use client';

import { useState, useEffect } from 'react';

interface AutoRefreshStatus {
  lastRefresh?: string;
  nextRefresh?: string;
  isActive: boolean;
  cronJobStatus: 'active' | 'inactive' | 'error';
  tokenStatus: {
    hasAccessToken: boolean;
    hasRefreshToken: boolean;
    accessTokenValid: boolean;
    accessTokenExpiresAt?: number;
  };
}

export default function ZohoAutoRefreshPage() {
  const [status, setStatus] = useState<AutoRefreshStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkAutoRefreshStatus();
    // Refresh status every 30 seconds
    const interval = setInterval(checkAutoRefreshStatus, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkAutoRefreshStatus = async () => {
    try {
      setLoading(true);
      
      // Check token status
      const tokenResponse = await fetch('/api/zoho-tokens');
      const tokenData = await tokenResponse.json();
      
      // Check cron job status
      const cronResponse = await fetch('/api/cron/refresh-zoho-tokens');
      const cronData = await cronResponse.json();
      
      // Calculate next refresh time (45 minutes from now)
      const now = new Date();
      const nextRefresh = new Date(now.getTime() + 45 * 60 * 1000);
      
      setStatus({
        lastRefresh: cronData.refreshedAt || 'Never',
        nextRefresh: nextRefresh.toISOString(),
        isActive: tokenData.tokenStatus.hasRefreshToken && tokenData.tokenStatus.accessTokenValid,
        cronJobStatus: cronData.success ? 'active' : 'error',
        tokenStatus: tokenData.tokenStatus
      });
    } catch (error) {
      console.error('Error checking auto-refresh status:', error);
      setMessage('❌ Error checking auto-refresh status');
    } finally {
      setLoading(false);
    }
  };

  const triggerManualRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await fetch('/api/cron/refresh-zoho-tokens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      
      if (data.success) {
        setMessage('✅ Manual refresh triggered successfully!');
        await checkAutoRefreshStatus();
      } else {
        setMessage(`❌ Manual refresh failed: ${data.message}`);
      }
    } catch (error) {
      setMessage('❌ Error triggering manual refresh');
    } finally {
      setRefreshing(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getTimeUntilNextRefresh = () => {
    if (!status?.nextRefresh) return 'Unknown';
    const now = new Date();
    const next = new Date(status.nextRefresh);
    const diff = next.getTime() - now.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking auto-refresh status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">🔄 Zoho Auto-Refresh Monitor</h1>
          
          {message && (
            <div className={`p-4 rounded-md mb-6 ${
              message.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
            }`}>
              {message}
            </div>
          )}

          {/* Auto-Refresh Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Auto-Refresh Status</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">System Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Auto-Refresh Active:</span>
                    <span className={status?.isActive ? 'text-green-600' : 'text-red-600'}>
                      {status?.isActive ? '✅ Active' : '❌ Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Cron Job Status:</span>
                    <span className={
                      status?.cronJobStatus === 'active' ? 'text-green-600' : 
                      status?.cronJobStatus === 'error' ? 'text-red-600' : 'text-yellow-600'
                    }>
                      {status?.cronJobStatus === 'active' ? '✅ Active' : 
                       status?.cronJobStatus === 'error' ? '❌ Error' : '⚠️ Inactive'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Refresh Interval:</span>
                    <span className="text-gray-600">45 minutes</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-md">
                <h3 className="font-medium text-gray-900 mb-2">Timing</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Last Refresh:</span>
                    <span className="text-gray-600">
                      {status?.lastRefresh ? formatDate(status.lastRefresh) : 'Never'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Refresh:</span>
                    <span className="text-gray-600">
                      {status?.nextRefresh ? formatDate(status.nextRefresh) : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time Until Next:</span>
                    <span className="text-blue-600 font-medium">
                      {getTimeUntilNextRefresh()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Token Status */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Token Status</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex justify-between">
                  <span>Access Token:</span>
                  <span className={status?.tokenStatus.hasAccessToken ? 'text-green-600' : 'text-red-600'}>
                    {status?.tokenStatus.hasAccessToken ? '✅ Present' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Refresh Token:</span>
                  <span className={status?.tokenStatus.hasRefreshToken ? 'text-green-600' : 'text-red-600'}>
                    {status?.tokenStatus.hasRefreshToken ? '✅ Present' : '❌ Missing'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Token Valid:</span>
                  <span className={status?.tokenStatus.accessTokenValid ? 'text-green-600' : 'text-red-600'}>
                    {status?.tokenStatus.accessTokenValid ? '✅ Valid' : '❌ Invalid/Expired'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
            <button
              onClick={triggerManualRefresh}
              disabled={refreshing}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {refreshing ? '🔄 Refreshing...' : '🔄 Trigger Manual Refresh'}
            </button>

            <button
              onClick={checkAutoRefreshStatus}
              disabled={loading}
              className="bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-md font-medium transition-colors"
            >
              {loading ? 'Loading...' : '🔄 Refresh Status'}
            </button>
          </div>

          {/* Information */}
          <div className="p-4 bg-blue-50 rounded-md">
            <h3 className="font-medium text-blue-900 mb-2">How Auto-Refresh Works</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>• <strong>Automatic:</strong> System checks tokens every 45 minutes</p>
              <p>• <strong>Smart Refresh:</strong> Only refreshes when token is about to expire (10-minute buffer)</p>
              <p>• <strong>Fallback:</strong> If refresh fails, system clears tokens and requires manual re-authentication</p>
              <p>• <strong>Monitoring:</strong> This dashboard shows real-time status and timing</p>
              <p>• <strong>Manual Override:</strong> You can trigger manual refresh anytime</p>
            </div>
          </div>

          {/* Cron Job Info */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-md">
            <h3 className="font-medium text-yellow-900 mb-2">Cron Job Configuration</h3>
            <div className="text-sm text-yellow-800">
              <p><strong>Schedule:</strong> Every 45 minutes (*/45 * * * *)</p>
              <p><strong>Endpoint:</strong> /api/cron/refresh-zoho-tokens</p>
              <p><strong>Status:</strong> Configured in vercel.json</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
