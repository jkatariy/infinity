'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  RefreshCw, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock,
  Users,
  Mail,
  Activity,
  Settings,
  Play,
  Pause
} from 'lucide-react';

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
      const response = await fetch('/api/health/zoho-integration');
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
      const response = await fetch('/api/process-leads');
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

  const refreshData = async () => {
    setIsLoading(true);
    await Promise.all([fetchHealthStatus(), fetchLeadStats()]);
    setLastRefresh(new Date());
    setIsLoading(false);
  };

  const processLeads = async (limit: number = 10) => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/process-leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ limit }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Lead processing result:', data);
        await refreshData(); // Refresh data after processing
      } else {
        console.error('Failed to process leads');
      }
    } catch (error) {
      console.error('Error processing leads:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

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
        return <CheckCircle className="w-4 h-4" />;
      case 'warning':
      case 'degraded':
        return <AlertTriangle className="w-4 h-4" />;
      case 'failed':
      case 'unhealthy':
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <RefreshCw className="w-6 h-6 animate-spin" />
        <span className="ml-2">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Zoho Integration Dashboard</h1>
          <p className="text-gray-600">
            Monitor and manage your Zoho CRM integration
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={refreshData}
            disabled={isLoading}
            variant="outline"
            size="sm"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button
            onClick={() => processLeads(5)}
            disabled={isProcessing}
            size="sm"
          >
            <Play className="w-4 h-4 mr-2" />
            Process Leads
          </Button>
        </div>
      </div>

      {lastRefresh && (
        <p className="text-sm text-gray-500">
          Last updated: {lastRefresh.toLocaleString()}
        </p>
      )}

      {/* Overall Status */}
      {healthStatus && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              System Health Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <Badge className={getStatusColor(healthStatus.status)}>
                {getStatusIcon(healthStatus.status)}
                <span className="ml-1 capitalize">{healthStatus.status}</span>
              </Badge>
              <span className="text-sm text-gray-600">
                {healthStatus.summary.passed}/{healthStatus.summary.total_checks} checks passed
              </span>
            </div>

            {/* Health Check Progress */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Health Score</span>
                <span>{Math.round((healthStatus.summary.passed / healthStatus.summary.total_checks) * 100)}%</span>
              </div>
              <Progress 
                value={(healthStatus.summary.passed / healthStatus.summary.total_checks) * 100} 
                className="h-2"
              />
            </div>

            {/* Recommendations */}
            {healthStatus.recommendations && healthStatus.recommendations.length > 0 && (
              <Alert className="mb-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Recommendations:</strong>
                  <ul className="mt-2 list-disc list-inside">
                    {healthStatus.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>
      )}

      {/* Lead Processing Stats */}
      {leadStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadStats.total_leads}</div>
              <p className="text-xs text-muted-foreground">
                All time leads captured
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadStats.success_rate}%</div>
              <p className="text-xs text-muted-foreground">
                Successfully sent to Zoho
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Leads</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadStats.pending_leads}</div>
              <p className="text-xs text-muted-foreground">
                Awaiting processing
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Failed Leads</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{leadStats.failed_leads}</div>
              <p className="text-xs text-muted-foreground">
                Processing failed
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Detailed Health Checks */}
      {healthStatus && (
        <Card>
          <CardHeader>
            <CardTitle>Detailed Health Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(healthStatus.checks).map(([checkName, check]) => (
                <div key={checkName} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(check.status)}
                    <div>
                      <h4 className="font-medium capitalize">
                        {checkName.replace(/_/g, ' ')}
                      </h4>
                      <p className="text-sm text-gray-600">{check.message}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(check.status)}>
                    {check.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Token Status */}
      {healthStatus?.checks?.token_status?.details && (
        <Card>
          <CardHeader>
            <CardTitle>Token Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm font-medium">Has Token</p>
                <p className="text-lg">{healthStatus.checks.token_status.details.has_token ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Access Token</p>
                <p className="text-lg">{healthStatus.checks.token_status.details.has_access_token ? 'Valid' : 'Missing'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Refresh Token</p>
                <p className="text-lg">{healthStatus.checks.token_status.details.has_refresh_token ? 'Available' : 'Missing'}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Expires At</p>
                <p className="text-lg">
                  {healthStatus.checks.token_status.details.expires_at 
                    ? new Date(healthStatus.checks.token_status.details.expires_at).toLocaleString()
                    : 'Unknown'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() => processLeads(5)}
              disabled={isProcessing}
              variant="outline"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Process 5 Leads
            </Button>
            <Button
              onClick={() => processLeads(10)}
              disabled={isProcessing}
              variant="outline"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Process 10 Leads
            </Button>
            <Button
              onClick={() => processLeads(20)}
              disabled={isProcessing}
              variant="outline"
              size="sm"
            >
              <Play className="w-4 h-4 mr-2" />
              Process 20 Leads
            </Button>
            <Button
              onClick={refreshData}
              disabled={isLoading}
              variant="outline"
              size="sm"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh Status
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
