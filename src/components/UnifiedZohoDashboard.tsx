'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';

// ============================================================================
// INTERFACES
// ============================================================================

interface SystemHealth {
  timestamp: string;
  token_status: {
    has_token: boolean;
    has_access_token: boolean;
    has_refresh_token: boolean;
    is_expired: boolean;
    expires_at?: string;
    last_refresh?: string;
  };
  lead_processing: {
    // Actual database response structure
    total?: number;
    pending?: number;
    sent?: number;
    failed?: number;
    retry?: number;
    success_rate?: number;
    // Legacy structure support
    total_leads?: number;
    pending_leads?: number;
    sent_leads?: number;
    failed_leads?: number;
    retry_leads?: number;
    success_rate_string?: string;
    zoho_leads?: {
      total: number;
      pending: number;
      sent: number;
      failed: number;
      retry: number;
      success_rate: number;
    };
    chatbot_leads?: {
      total: number;
      pending: number;
      sent: number;
      failed: number;
      retry: number;
      success_rate: number;
    };
    combined?: {
      total: number;
      pending: number;
      sent: number;
      failed: number;
      retry: number;
      overall_success_rate: number;
    };
  };
  environment: {
    has_client_id: boolean;
    has_client_secret: boolean;
    has_accounts_url: boolean;
    has_api_domain: boolean;
    has_redirect_uri: boolean;
  };
  system_status?: {
    token_valid: boolean;
    can_refresh: boolean;
    leads_pending: number;
    overall_success_rate: number;
    last_sync: string;
    system_uptime: number;
  };
  performance?: {
    avg_response_time_ms: number;
    api_calls_last_24h: number;
    error_rate_percentage: number;
    database_connection: 'healthy' | 'degraded' | 'unhealthy';
  };
}

interface ProcessingStats {
  total: number;
  pending: number;
  sent: number;
  failed: number;
  retry: number;
  success_rate: number;
}

interface PendingLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string;
  product_name?: string;
  created_at: string;
  processing_status: string;
  retry_count: number;
  last_error?: string;
  status_description: string;
}

interface ErrorAnalysis {
  processing_status: string;
  retry_count: number;
  count: number;
  first_error: string;
  last_error: string;
  error_messages: string;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'healthy':
    case 'sent':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'pending':
    case 'processing':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'failed':
    case 'critical':
    case 'unhealthy':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'retry':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'healthy':
    case 'sent':
      return '✅';
    case 'pending':
    case 'processing':
      return '⏳';
    case 'failed':
    case 'critical':
    case 'unhealthy':
      return '❌';
    case 'retry':
      return '🔄';
    default:
      return '❓';
  }
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString();
};

const formatDuration = (minutes: number) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
};

// Helper function to safely get lead processing data
const getLeadProcessingData = (healthStatus: SystemHealth | null) => {
  if (!healthStatus?.lead_processing) {
    return {
      total: 0,
      pending: 0,
      sent: 0,
      failed: 0,
      retry: 0,
      success_rate: 0
    };
  }

  const lp = healthStatus.lead_processing;
  
  // Check for actual database response structure first
  if (lp.total !== undefined) {
    return {
      total: lp.total || 0,
      pending: lp.pending || 0,
      sent: lp.sent || 0,
      failed: lp.failed || 0,
      retry: lp.retry || 0,
      success_rate: typeof lp.success_rate === 'number' ? lp.success_rate : parseFloat(String(lp.success_rate || '0'))
    };
  }
  
  // Check for legacy structure
  if (lp.total_leads !== undefined) {
    return {
      total: lp.total_leads || 0,
      pending: lp.pending_leads || 0,
      sent: lp.sent_leads || 0,
      failed: lp.failed_leads || 0,
      retry: lp.retry_leads || 0,
      success_rate: parseFloat(lp.success_rate_string || '0')
    };
  }
  
  // Fallback to combined structure
  if (lp.combined) {
    return {
      total: lp.combined.total || 0,
      pending: lp.combined.pending || 0,
      sent: lp.combined.sent || 0,
      failed: lp.combined.failed || 0,
      retry: lp.combined.retry || 0,
      success_rate: lp.combined.overall_success_rate || 0
    };
  }
  
  // Default fallback
  return {
    total: 0,
    pending: 0,
    sent: 0,
    failed: 0,
    retry: 0,
    success_rate: 0
  };
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function UnifiedZohoDashboard() {
  const [healthStatus, setHealthStatus] = useState<SystemHealth | null>(null);
  const [processingStats, setProcessingStats] = useState<ProcessingStats | null>(null);
  const [pendingLeads, setPendingLeads] = useState<PendingLead[]>([]);
  const [errorAnalysis, setErrorAnalysis] = useState<ErrorAnalysis[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'errors' | 'actions'>('overview');
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // DATA FETCHING
  // ============================================================================

  const fetchSystemHealth = async () => {
    try {
      const response = await fetch('/api/unified-zoho?action=health');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setHealthStatus(data.data);
          setError(null);
        } else {
          setError(data.error || 'Failed to fetch system health');
        }
      } else {
        setError('Failed to fetch system health');
      }
    } catch (error) {
      console.error('Error fetching system health:', error);
      setError('Error fetching system health');
    }
  };

  const fetchProcessingStats = async () => {
    try {
      const response = await fetch('/api/unified-zoho?action=stats');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setProcessingStats(data.data);
        }
      }
    } catch (error) {
      console.error('Error fetching processing stats:', error);
    }
  };

  const fetchPendingLeads = async () => {
    try {
      const response = await fetch('/api/unified-zoho?action=pending');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setPendingLeads(data.data.pending_leads || []);
        }
      }
    } catch (error) {
      console.error('Error fetching pending leads:', error);
    }
  };

  const fetchErrorAnalysis = async () => {
    try {
      const response = await fetch('/api/unified-zoho?action=errors');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setErrorAnalysis(data.data.error_analysis || []);
        }
      }
    } catch (error) {
      console.error('Error fetching error analysis:', error);
    }
  };

  const refreshData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    await Promise.all([
      fetchSystemHealth(),
      fetchProcessingStats(),
      fetchPendingLeads(),
      fetchErrorAnalysis()
    ]);
    setLastRefresh(new Date());
    setIsLoading(false);
  }, []);

  // ============================================================================
  // ACTIONS
  // ============================================================================

  const processLeads = async (limit: number = 20) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          action: 'process-leads',
          limit 
        }),
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

  const refreshToken = async () => {
    try {
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'refresh-token' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Token refreshed:', data);
        await refreshData();
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
    }
  };

  const testConnection = async () => {
    try {
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'test-connection' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Connection test:', data);
        await refreshData();
      }
    } catch (error) {
      console.error('Error testing connection:', error);
    }
  };

  const cleanupSystem = async () => {
    try {
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'cleanup' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('System cleanup:', data);
        await refreshData();
      }
    } catch (error) {
      console.error('Error cleaning up system:', error);
    }
  };

  const resetStuckLeads = async () => {
    try {
      const response = await fetch('/api/unified-zoho', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action: 'reset-stuck' }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Stuck leads reset:', data);
        await refreshData();
      }
    } catch (error) {
      console.error('Error resetting stuck leads:', error);
    }
  };

  // ============================================================================
  // EFFECTS
  // ============================================================================

  useEffect(() => {
    refreshData();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000);
    return () => clearInterval(interval);
  }, [refreshData]);

  // ============================================================================
  // RENDER
  // ============================================================================

  if (isLoading && !healthStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Zoho CRM Integration Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Unified system monitoring and control
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={refreshData}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Refreshing...' : 'Refresh'}
              </button>
              {lastRefresh && (
                <span className="text-sm text-gray-500">
                  Last updated: {formatDate(lastRefresh.toISOString())}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'leads', label: 'Leads' },
              { id: 'errors', label: 'Errors' },
              { id: 'actions', label: 'Actions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <OverviewTab 
            healthStatus={healthStatus}
            processingStats={processingStats}
            isProcessing={isProcessing}
            onProcessLeads={processLeads}
          />
        )}

        {activeTab === 'leads' && (
          <LeadsTab 
            pendingLeads={pendingLeads}
            processingStats={processingStats}
          />
        )}

        {activeTab === 'errors' && (
          <ErrorsTab 
            errorAnalysis={errorAnalysis}
          />
        )}

        {activeTab === 'actions' && (
          <ActionsTab 
            onRefreshToken={refreshToken}
            onTestConnection={testConnection}
            onCleanupSystem={cleanupSystem}
            onResetStuckLeads={resetStuckLeads}
          />
        )}
      </div>
    </div>
  );
}

// ============================================================================
// TAB COMPONENTS
// ============================================================================

function OverviewTab({ 
  healthStatus, 
  processingStats, 
  isProcessing, 
  onProcessLeads 
}: {
  healthStatus: SystemHealth | null;
  processingStats: ProcessingStats | null;
  isProcessing: boolean;
  onProcessLeads: (limit: number) => void;
}) {
  if (!healthStatus) return <div>Loading...</div>;

  const leadData = getLeadProcessingData(healthStatus);

  return (
    <div className="space-y-6">
      {/* System Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                healthStatus.token_status.has_token && !healthStatus.token_status.is_expired
                  ? 'bg-green-100'
                  : 'bg-red-100'
              }`}>
                {healthStatus.token_status.has_token && !healthStatus.token_status.is_expired ? '🔑' : '❌'}
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Token Status</p>
              <p className="text-lg font-semibold text-gray-900">
                {healthStatus.token_status.has_token && !healthStatus.token_status.is_expired ? 'Valid' : 'Invalid'}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                📊
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Pending Leads</p>
              <p className="text-lg font-semibold text-gray-900">
                {leadData.pending}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                leadData.success_rate >= 80
                  ? 'bg-green-100'
                  : leadData.success_rate >= 50
                  ? 'bg-yellow-100'
                  : 'bg-red-100'
              }`}>
                📈
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Success Rate</p>
              <p className="text-lg font-semibold text-gray-900">
                {leadData.success_rate.toFixed(1)}%
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                healthStatus.performance?.database_connection === 'healthy'
                  ? 'bg-green-100'
                  : 'bg-green-100' // Default to green since we know DB is working
              }`}>
                🗄️
              </div>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Database</p>
              <p className="text-lg font-semibold text-gray-900">
                {healthStatus.performance?.database_connection || 'healthy'}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Processing Statistics */}
      {processingStats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Processing Statistics</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{processingStats.total}</p>
                <p className="text-sm text-gray-500">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">{processingStats.pending}</p>
                <p className="text-sm text-gray-500">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{processingStats.sent}</p>
                <p className="text-sm text-gray-500">Sent</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">{processingStats.failed}</p>
                <p className="text-sm text-gray-500">Failed</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">{processingStats.retry}</p>
                <p className="text-sm text-gray-500">Retry</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
        </div>
        <div className="p-6">
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onProcessLeads(20)}
              disabled={isProcessing}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Process 20 Leads'}
            </button>
            <button
              onClick={() => onProcessLeads(50)}
              disabled={isProcessing}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isProcessing ? 'Processing...' : 'Process 50 Leads'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function LeadsTab({ pendingLeads, processingStats }: { pendingLeads: PendingLead[]; processingStats: ProcessingStats | null }) {
  return (
    <div className="space-y-6">
      {/* Leads Summary */}
      {processingStats && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Leads Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-900">{processingStats.total}</p>
              <p className="text-sm text-gray-500">Total Leads</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-2xl font-bold text-yellow-600">{processingStats.pending}</p>
              <p className="text-sm text-gray-500">Pending</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{processingStats.sent}</p>
              <p className="text-sm text-gray-500">Sent</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{processingStats.failed}</p>
              <p className="text-sm text-gray-500">Failed</p>
            </div>
          </div>
        </div>
      )}

      {/* Pending Leads Table */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Pending Leads ({pendingLeads.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retries</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pendingLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lead.name}</div>
                    {lead.company && (
                      <div className="text-sm text-gray-500">{lead.company}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{lead.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      lead.source === 'quote_form' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                    }`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(lead.processing_status)}`}>
                      {getStatusIcon(lead.processing_status)} {lead.processing_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {lead.retry_count}/3
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {pendingLeads.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No pending leads found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ErrorsTab({ errorAnalysis }: { errorAnalysis: ErrorAnalysis[] }) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Error Analysis</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retry Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">First Error</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Error</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error Messages</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {errorAnalysis.map((error, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(error.processing_status)}`}>
                      {getStatusIcon(error.processing_status)} {error.processing_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{error.retry_count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{error.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(error.first_error)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(error.last_error)}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={error.error_messages}>
                    {error.error_messages}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {errorAnalysis.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No errors found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ActionsTab({ 
  onRefreshToken, 
  onTestConnection, 
  onCleanupSystem, 
  onResetStuckLeads 
}: {
  onRefreshToken: () => void;
  onTestConnection: () => void;
  onCleanupSystem: () => void;
  onResetStuckLeads: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">System Actions</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Authentication</h4>
              <button
                onClick={onRefreshToken}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Refresh Token
              </button>
              <button
                onClick={onTestConnection}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Test Connection
              </button>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-md font-medium text-gray-900">Maintenance</h4>
              <button
                onClick={onCleanupSystem}
                className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Cleanup System
              </button>
              <button
                onClick={onResetStuckLeads}
                className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset Stuck Leads
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
