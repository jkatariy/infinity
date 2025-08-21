import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Validate environment variables before creating client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing required Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseKey);
}

const supabase = createClient(
  supabaseUrl || 'https://zxvhgpejwgrlxksnqtxk.supabase.co',
  supabaseKey || 'fallback-key'
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Running Zoho integration health check...');
    
    const healthChecks: {
      timestamp: string;
      status: string;
      checks: any;
      summary: {
        total_checks: number;
        passed: number;
        failed: number;
        warnings: number;
      };
      recommendations: string[];
    } = {
      timestamp: new Date().toISOString(),
      status: 'unknown',
      checks: {},
      summary: {
        total_checks: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      },
      recommendations: []
    };

    // Check 1: Database Connection
    try {
      const { data, error } = await supabase.rpc('get_zoho_token_status');
      
      if (error) throw error;
      
      healthChecks.checks.database_connection = {
        status: 'passed',
        message: 'Database connection successful',
        response_time: 'fast'
      };
      healthChecks.summary.passed++;
    } catch (error) {
      healthChecks.checks.database_connection = {
        status: 'failed',
        message: 'Database connection failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      healthChecks.summary.failed++;
    }
    healthChecks.summary.total_checks++;

    // Check 2: Token Status
    try {
      const { data: tokenStatus, error } = await supabase.rpc('get_zoho_token_status');
      
      if (error) throw error;
      
      let tokenStatusResult = 'unknown';
      let tokenMessage = 'Token status check completed';
      
      if (!tokenStatus.has_token) {
        tokenStatusResult = 'failed';
        tokenMessage = 'No Zoho tokens configured';
      } else if (tokenStatus.is_expired && !tokenStatus.has_refresh_token) {
        tokenStatusResult = 'failed';
        tokenMessage = 'Token expired and no refresh token available';
      } else if (tokenStatus.is_expired) {
        tokenStatusResult = 'warning';
        tokenMessage = 'Token expired but refresh token available';
      } else {
        tokenStatusResult = 'passed';
        tokenMessage = 'Token is valid';
      }
      
      healthChecks.checks.token_status = {
        status: tokenStatusResult,
        message: tokenMessage,
        details: tokenStatus
      };
      
      if (tokenStatusResult === 'passed') {
        healthChecks.summary.passed++;
      } else if (tokenStatusResult === 'warning') {
        healthChecks.summary.warnings++;
      } else {
        healthChecks.summary.failed++;
      }
    } catch (error) {
      healthChecks.checks.token_status = {
        status: 'failed',
        message: 'Failed to check token status',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      healthChecks.summary.failed++;
    }
    healthChecks.summary.total_checks++;

    // Check 3: Lead Processing Status
    try {
      const { data: leadStats, error } = await supabase.rpc('get_comprehensive_lead_stats');
      
      if (error) throw error;
      
      const totalLeads = leadStats.combined.total_leads;
      const pendingLeads = leadStats.combined.total_pending;
      const successRate = leadStats.combined.overall_success_rate;
      
      let processingStatus = 'passed';
      let processingMessage = 'Lead processing is healthy';
      
      if (pendingLeads > 50) {
        processingStatus = 'warning';
        processingMessage = `High number of pending leads: ${pendingLeads}`;
      } else if (successRate < 80) {
        processingStatus = 'warning';
        processingMessage = `Low success rate: ${successRate}%`;
      }
      
      healthChecks.checks.lead_processing = {
        status: processingStatus,
        message: processingMessage,
        details: {
          total_leads: totalLeads,
          pending_leads: pendingLeads,
          success_rate: successRate,
          stats: leadStats
        }
      };
      
      if (processingStatus === 'passed') {
        healthChecks.summary.passed++;
      } else if (processingStatus === 'warning') {
        healthChecks.summary.warnings++;
      } else {
        healthChecks.summary.failed++;
      }
    } catch (error) {
      healthChecks.checks.lead_processing = {
        status: 'failed',
        message: 'Failed to check lead processing status',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      healthChecks.summary.failed++;
    }
    healthChecks.summary.total_checks++;

    // Check 4: Environment Variables
    const requiredEnvVars = [
      'ZOHO_CLIENT_ID',
      'ZOHO_CLIENT_SECRET',
      'ZOHO_ACCOUNTS_URL',
      'ZOHO_API_DOMAIN'
    ];
    
    const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
    
    healthChecks.checks.environment_variables = {
      status: missingEnvVars.length === 0 ? 'passed' : 'failed',
      message: missingEnvVars.length === 0 ? 'All required environment variables are set' : 'Missing environment variables',
      details: {
        required: requiredEnvVars,
        missing: missingEnvVars
      }
    };
    
    if (missingEnvVars.length === 0) {
      healthChecks.summary.passed++;
    } else {
      healthChecks.summary.failed++;
    }
    healthChecks.summary.total_checks++;

    // Check 5: Recent Activity
    try {
      const { data: recentLeads, error } = await supabase
        .from('zoho_leads')
        .select('created_at, processing_status')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (error) throw error;
      
      const recentActivity = {
        leads_last_24h: recentLeads?.length || 0,
        latest_lead: recentLeads?.[0]?.created_at || null,
        processing_statuses: recentLeads?.reduce((acc, lead) => {
          acc[lead.processing_status] = (acc[lead.processing_status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>) || {}
      };
      
      healthChecks.checks.recent_activity = {
        status: 'passed',
        message: 'Recent activity check completed',
        details: recentActivity
      };
      healthChecks.summary.passed++;
    } catch (error) {
      healthChecks.checks.recent_activity = {
        status: 'failed',
        message: 'Failed to check recent activity',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
      healthChecks.summary.failed++;
    }
    healthChecks.summary.total_checks++;

    // Determine overall status
    if (healthChecks.summary.failed > 0) {
      healthChecks.status = 'unhealthy';
    } else if (healthChecks.summary.warnings > 0) {
      healthChecks.status = 'degraded';
    } else {
      healthChecks.status = 'healthy';
    }

    // Add recommendations
    if (healthChecks.checks.token_status?.status === 'warning') {
      healthChecks.recommendations.push('Refresh Zoho access token');
    }
    
    if (healthChecks.checks.lead_processing?.status === 'warning') {
      healthChecks.recommendations.push('Review failed leads and retry processing');
    }
    
    if (healthChecks.checks.environment_variables?.status === 'failed') {
      healthChecks.recommendations.push('Set missing environment variables');
    }

    const statusCode = healthChecks.status === 'healthy' ? 200 : 
                      healthChecks.status === 'degraded' ? 200 : 503;

    return NextResponse.json(healthChecks, { status: statusCode });

  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
