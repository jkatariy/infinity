import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Running MARKET-READY system health check...');
    
    const startTime = Date.now();
    
    // Basic health checks
    const healthChecks = await Promise.allSettled([
      checkDatabaseConnection(),
      checkEnvironmentVariables(),
      checkSystemPerformance()
    ]);
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Process health check results
    const dbConnection = healthChecks[0].status === 'fulfilled' ? healthChecks[0].value : null;
    const envCheck = healthChecks[1].status === 'fulfilled' ? healthChecks[1].value : null;
    const performanceCheck = healthChecks[2].status === 'fulfilled' ? healthChecks[2].value : null;
    
    // Determine overall system status
    const systemStatus = determineSystemStatus({
      dbConnection,
      envCheck,
      performanceCheck
    });
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      response_time_ms: responseTime,
      system_status: systemStatus,
      health_checks: {
        database: dbConnection,
        environment: envCheck,
        performance: performanceCheck
      },
      recommendations: generateRecommendations(systemStatus),
      alerts: generateAlerts(systemStatus),
      metrics: {
        uptime: process.uptime(),
        memory_usage: process.memoryUsage(),
        node_version: process.version
      }
    };
    
    console.log(`✅ Market-ready health check completed in ${responseTime}ms - Status: ${systemStatus.overall}`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('❌ Error in market-ready health check:', error);
    
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      system_status: {
        overall: 'error',
        issues: ['Health check failed'],
        warnings: [],
        critical_alerts: ['System health check unavailable']
      }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}

// Helper functions for comprehensive health checks

async function checkDatabaseConnection() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        connected: false,
        response_time_ms: null,
        error: 'Missing Supabase environment variables',
        status: 'error'
      };
    }
    
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    const startTime = Date.now();
    const { data, error } = await supabase.from('career_applications').select('count').limit(1);
    const responseTime = Date.now() - startTime;
    
    return {
      connected: !error,
      response_time_ms: responseTime,
      error: error?.message || null,
      status: error ? 'error' : 'healthy'
    };
  } catch (error) {
    return {
      connected: false,
      response_time_ms: null,
      error: error instanceof Error ? error.message : 'Unknown error',
      status: 'error'
    };
  }
}

async function checkEnvironmentVariables() {
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  const optionalVars = ['CRON_SECRET', 'ZOHO_CLIENT_ID', 'ZOHO_CLIENT_SECRET'];
  const missingOptional = optionalVars.filter(varName => !process.env[varName]);
  
  return {
    required_vars: {
      total: requiredVars.length,
      configured: requiredVars.length - missingVars.length,
      missing: missingVars,
      status: missingVars.length === 0 ? 'healthy' : 'critical'
    },
    optional_vars: {
      total: optionalVars.length,
      configured: optionalVars.length - missingOptional.length,
      missing: missingOptional,
      status: 'warning'
    },
    overall_status: missingVars.length === 0 ? 'healthy' : 'critical'
  };
}

async function checkSystemPerformance() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return {
        database_performance: {
          response_time_ms: null,
          status: 'error',
          error: 'Missing Supabase environment variables'
        },
        memory_usage: {
          rss: 0,
          heapTotal: 0,
          heapUsed: 0,
          external: 0,
          status: 'error'
        },
        overall_status: 'error'
      };
    }
    
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Test database performance
    const startTime = Date.now();
    const { data, error } = await supabase.from('career_applications').select('count').limit(1);
    const dbResponseTime = Date.now() - startTime;
    
    // Check memory usage
    const memoryUsage = process.memoryUsage();
    const memoryUsageMB = {
      rss: Math.round(memoryUsage.rss / 1024 / 1024),
      heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
      heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
      external: Math.round(memoryUsage.external / 1024 / 1024)
    };
    
    return {
      database_performance: {
        response_time_ms: dbResponseTime,
        status: dbResponseTime < 1000 ? 'excellent' : dbResponseTime < 3000 ? 'good' : 'poor',
        error: error?.message || null
      },
      memory_usage: {
        ...memoryUsageMB,
        status: memoryUsageMB.heapUsed < 100 ? 'excellent' : memoryUsageMB.heapUsed < 200 ? 'good' : 'warning'
      },
      overall_status: dbResponseTime < 3000 && memoryUsageMB.heapUsed < 200 ? 'healthy' : 'warning'
    };
  } catch (error) {
    return {
      database_performance: {
        response_time_ms: null,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      memory_usage: {
        rss: 0,
        heapTotal: 0,
        heapUsed: 0,
        external: 0,
        status: 'error'
      },
      overall_status: 'error'
    };
  }
}

function determineSystemStatus(checks: any) {
  const issues: string[] = [];
  const warnings: string[] = [];
  const criticalAlerts: string[] = [];
  
  // Check database connection
  if (!checks.dbConnection) {
    criticalAlerts.push('Database connection check failed');
  } else if (!checks.dbConnection.connected) {
    criticalAlerts.push('Database connection failed');
  } else if (checks.dbConnection.response_time_ms > 5000) {
    warnings.push(`Slow database response: ${checks.dbConnection.response_time_ms}ms`);
  }
  
  // Check environment variables
  if (!checks.envCheck) {
    criticalAlerts.push('Environment check failed');
  } else if (checks.envCheck.required_vars.status === 'critical') {
    criticalAlerts.push(`Missing required environment variables: ${checks.envCheck.required_vars.missing.join(', ')}`);
  }
  
  // Check performance
  if (!checks.performanceCheck) {
    warnings.push('Performance check failed');
  } else {
    if (checks.performanceCheck.database_performance.status === 'poor') {
      warnings.push('Poor database performance detected');
    }
    if (checks.performanceCheck.memory_usage.status === 'warning') {
      warnings.push('High memory usage detected');
    }
  }
  
  // Determine overall status
  let overall = 'healthy';
  if (criticalAlerts.length > 0) {
    overall = 'critical';
  } else if (warnings.length > 0) {
    overall = 'warning';
  }
  
  return {
    overall,
    issues,
    warnings,
    critical_alerts: criticalAlerts
  };
}

function generateRecommendations(systemStatus: any): string[] {
  const recommendations: string[] = [];
  
  if (systemStatus.overall === 'critical') {
    recommendations.push('Immediate action required: Address critical alerts');
    recommendations.push('Check database connectivity');
  }
  
  if (systemStatus.warnings.includes('Slow database response')) {
    recommendations.push('Optimize database queries');
    recommendations.push('Consider database scaling');
  }
  
  if (systemStatus.warnings.includes('High memory usage')) {
    recommendations.push('Monitor application memory usage');
    recommendations.push('Consider application scaling');
  }
  
  return recommendations;
}

function generateAlerts(systemStatus: any): any[] {
  const alerts: any[] = [];
  
  systemStatus.critical_alerts.forEach((alert: string) => {
    alerts.push({
      level: 'critical',
      message: alert,
      timestamp: new Date().toISOString(),
      requires_immediate_action: true
    });
  });
  
  systemStatus.warnings.forEach((warning: string) => {
    alerts.push({
      level: 'warning',
      message: warning,
      timestamp: new Date().toISOString(),
      requires_immediate_action: false
    });
  });
  
  return alerts;
}
