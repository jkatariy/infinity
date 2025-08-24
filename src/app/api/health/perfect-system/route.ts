import { NextRequest, NextResponse } from 'next/server';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Running perfect system health check...');
    
    const startTime = Date.now();
    
    // Get comprehensive health status
    const healthStatus = await unifiedZohoIntegration.getSystemHealth();
    
    // Test token refresh capability
    const tokenRefreshTest = await unifiedZohoIntegration.testTokenRefresh();
    
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    
    // Determine overall system status
    const systemStatus = {
      overall: 'healthy',
      issues: [] as string[],
      warnings: [] as string[]
    };
    
    // Check critical issues
    if (!healthStatus.token_status.has_token) {
      systemStatus.overall = 'critical';
      systemStatus.issues.push('No Zoho tokens configured');
    }
    
    if (healthStatus.token_status.has_token && healthStatus.token_status.is_expired && !healthStatus.token_status.has_refresh_token) {
      systemStatus.overall = 'critical';
      systemStatus.issues.push('Token expired and no refresh token available');
    }
    
    if (!healthStatus.environment.has_client_id || !healthStatus.environment.has_client_secret) {
      systemStatus.overall = 'critical';
      systemStatus.issues.push('Missing Zoho environment variables');
    }
    
    // Check warnings
    if (healthStatus.token_status.has_token && healthStatus.token_status.is_expired && healthStatus.token_status.has_refresh_token) {
      systemStatus.warnings.push('Token expired but refresh token available - will auto-refresh on next use');
    }
    
    if (healthStatus.lead_processing.pending > 50) {
      systemStatus.warnings.push(`High number of pending leads: ${healthStatus.lead_processing.pending}`);
    }
    
    if (healthStatus.lead_processing.success_rate < 80) {
      systemStatus.warnings.push(`Low success rate: ${healthStatus.lead_processing.success_rate}%`);
    }
    
    // If no critical issues, check if healthy
    if (systemStatus.overall !== 'critical') {
      if (systemStatus.warnings.length === 0) {
        systemStatus.overall = 'healthy';
      } else {
        systemStatus.overall = 'warning';
      }
    }
    
    const response = {
      success: true,
      timestamp: new Date().toISOString(),
      response_time_ms: responseTime,
      system_status: systemStatus,
      health_status: healthStatus,
      token_refresh_test: tokenRefreshTest,
      recommendations: [] as string[]
    };
    
    // Add recommendations based on status
    if (systemStatus.overall === 'critical') {
      response.recommendations.push('Set up Zoho authentication immediately');
      response.recommendations.push('Configure all required environment variables');
    }
    
    if (healthStatus.token_status.has_token && healthStatus.token_status.is_expired && healthStatus.token_status.has_refresh_token) {
      response.recommendations.push('Test token refresh functionality');
    }
    
    if (healthStatus.lead_processing.pending > 0) {
      response.recommendations.push('Run manual lead processing to clear pending leads');
    }
    
    if (healthStatus.lead_processing.success_rate < 80) {
      response.recommendations.push('Investigate failed lead processing');
    }
    
    console.log(`✅ Perfect health check completed in ${responseTime}ms - Status: ${systemStatus.overall}`);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('❌ Error in perfect health check:', error);
    
    return NextResponse.json({
      success: false,
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      system_status: {
        overall: 'error',
        issues: ['Health check failed'],
        warnings: []
      }
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}
