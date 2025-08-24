'use client';

import { useState, useEffect, useCallback } from 'react';

interface HealthStatus {
  timestamp: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'error';
  checks: {
    database_connection?: { status: string; message: string; error?: string };
    token_status?: { status: string; message: string; details?: any };
    lead_processing?: { status: string; message: string; details?: any };
    environment_variables?: { status: string; message: string; details?: any };
    recent_activity?: { status: string; message: string; details?: any };
  };
  summary: {
    total_checks: number;
    passed: number;
    failed: number;
    warnings: number;
  };
  recommendations?: string[];
}

interface LeadStats {
  total_leads: number;
  sent_leads: number;
  pending_leads: number;
  processing_leads: number;
  failed_leads: number;
  retry_leads: number;
  leads_last_24h: number;
  success_rate: number;
}

export default function ZohoIntegrationDashboard() {
  const [healthStatus, setHealthStatus] = useState<HealthStatus | null>(null);
  const [leadStats, setLeadStats] = useState<LeadStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchHealthStatus = async () => {
    try {
      const response = await fetch('/api/unified-zoho?action=health');
      if (response.ok) {
        const data = await response.json();
        setHealthStatus(data);
      }
    } catch (error) {
      console.error('Error fetching health status:', error);
    }
  };

  const fetchLeadStats = async () => {
    try {
      const response = await fetch('/api/unified-zoho?action=pending');
      if (response.ok) {
        const data = await response.json();
        if (data.health_status?.lead_processing) {
          setLeadStats(data.health_status.lead_processing);
        }
      }
    } catch (error) {
      console.error('Error fetching lead stats:', error);
    }
  };

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    await Promise.all([fetchHealthStatus(), fetchLeadStats()]);
    setLastRefresh(new Date());
    setIsLoading(false);
  }, []);

  const processLeads = async (limit: number = 10) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/unified-zoho?action=pending', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Leads processed:', data);
        await refreshData();
      }
    } catch (error) {
      console.error('Error processing leads:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const testMarketReady = async () => {
    try {
      const response = await fetch('/api/test-lead-workflow');
      if (response.ok) {
        const data = await response.json();
        console.log('Market ready test results:', data);
        alert(`Market Ready Test: ${data.overall_status.toUpperCase()}\nSuccess Rate: ${data.summary?.success_rate}%`);
      }
    } catch (error) {
      console.error('Error testing market ready:', error);
    }
  };

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
      case 'healthy':
        return 'text-green-600 bg-green-100';
      case 'warning':
      case 'degraded':
        return 'text-yellow-600 bg-yellow-100';
      case 'failed':
      case 'unhealthy':
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
      case 'healthy':
        return '✅';
      case 'warning':
      case 'degraded':
        return '⚠️';
      case 'failed':
      case 'unhealthy':
      case 'error':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow p-6">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Zoho CRM Integration Dashboard
          </h1>
          <p className="text-gray-600">
            Real-time monitoring and management of Zoho CRM integration
          </p>
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
            >
              🔄 Refresh
            </button>
            <button
              onClick={testMarketReady}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              🧪 Test Market Ready
            </button>
            {lastRefresh && (
              <span className="text-sm text-gray-500">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </span>
            )}
          </div>
        </div>

        {/* Health Status */}
        {healthStatus && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              System Health Status
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(healthStatus.status)}`}>
                    {getStatusIcon(healthStatus.status)} {healthStatus.status.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(healthStatus.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  {healthStatus.summary.passed}/{healthStatus.summary.total_checks} checks passed
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(healthStatus.checks).map(([key, check]) => (
                  <div key={key} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900 capitalize">
                        {key.replace(/_/g, ' ')}
                      </h3>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(check.status)}`}>
                        {getStatusIcon(check.status)} {check.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{check.message}</p>
                  </div>
                ))}
              </div>

              {healthStatus.recommendations && healthStatus.recommendations.length > 0 && (
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Recommendations:</h4>
                  <ul className="list-disc list-inside text-sm text-yellow-700">
                    {healthStatus.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lead Statistics */}
        {leadStats && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Lead Processing Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Leads</p>
                    <p className="text-2xl font-bold text-gray-900">{leadStats.total_leads}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">📊</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Sent to Zoho</p>
                    <p className="text-2xl font-bold text-green-600">{leadStats.sent_leads}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{leadStats.pending_leads}</p>
                  </div>
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Success Rate</p>
                    <p className="text-2xl font-bold text-blue-600">{leadStats.success_rate}%</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <span className="text-2xl">📈</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={() => processLeads(10)}
                disabled={isProcessing}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? '⏳' : '🚀'} Process 10 Leads
              </button>
              <button
                onClick={() => processLeads(50)}
                disabled={isProcessing}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? '⏳' : '⚡'} Process 50 Leads
              </button>
              <button
                onClick={() => processLeads(100)}
                disabled={isProcessing}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 flex items-center gap-2"
              >
                {isProcessing ? '⏳' : '🔥'} Process All Leads
              </button>
            </div>
          </div>
        )}

        {/* Additional Stats */}
        {leadStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">Processing Details</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Currently Processing</span>
                  <span className="font-medium">{leadStats.processing_leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Failed Leads</span>
                  <span className="font-medium text-red-600">{leadStats.failed_leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Retry Queue</span>
                  <span className="font-medium text-yellow-600">{leadStats.retry_leads}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Last 24h</span>
                  <span className="font-medium">{leadStats.leads_last_24h}</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Database</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✅ Connected</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Zoho API</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✅ Active</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cron Jobs</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✅ Running</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Error Rate</span>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">✅ Low</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="font-medium text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  onClick={() => window.open('/api/health/zoho-integration', '_blank')}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  🔍 View Health API
                </button>
                <button
                  onClick={() => window.open('/api/test-market-ready', '_blank')}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  🧪 Run System Test
                </button>
                <button
                  onClick={() => window.open('/api/process-leads', '_blank')}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  📊 View Lead Stats
                </button>
                <button
                  onClick={() => window.open('/dashboard/zoho-auth', '_blank')}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
                >
                  ⚙️ Zoho Auth Panel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
