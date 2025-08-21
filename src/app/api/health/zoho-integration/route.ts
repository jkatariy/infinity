import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    const healthChecks = {
      timestamp: new Date().toISOString(),
      status: 'checking',
      checks: {} as any,
      summary: {
        total_checks: 0,
        passed: 0,
        failed: 0,
        warnings: 0
      }
    };

    // Check 1: Database Connection
    try {
      const { data, error } = await supabase
        .from('zoho_tokens')
        .select('count')
        .limit(1);
      
      if (error) throw error;
      
      healthChecks.checks.database_connection = {
        status: 'passed',
        message: 'Database connection successful'
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
      const { data, error } = await supabase
        .rpc('get_zoho_token_status');
      
      if (error) throw error;
      
      const tokenStatus = data;
      const isTokenValid = tokenStatus.has_token && 
                          tokenStatus.has_access_token && 
                          !tokenStatus.is_expired;
      
      healthChecks.checks.token_status = {
        status: isTokenValid ? 'passed' : 'warning',
        message: isTokenValid ? 'Token is valid' : 'Token needs attention',
        details: tokenStatus
      };
      
      if (isTokenValid) {
        healthChecks.summary.passed++;
      } else {
        healthChecks.summary.warnings++;
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
      const { data, error } = await supabase
        .rpc('get_lead_processing_stats');
      
      if (error) throw error;
      
      const leadStats = data;
      const hasFailedLeads = leadStats.failed_leads > 0;
      const hasPendingLeads = leadStats.pending_leads > 0;
      
      healthChecks.checks.lead_processing = {
        status: hasFailedLeads ? 'warning' : 'passed',
        message: hasFailedLeads ? 'Some leads failed to process' : 'Lead processing is healthy',
        details: leadStats
      };
      
      if (hasFailedLeads) {
        healthChecks.summary.warnings++;
      } else {
        healthChecks.summary.passed++;
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
    healthChecks.recommendations = [];
    
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
