import { NextRequest, NextResponse } from 'next/server';
import { perfectZohoIntegration } from '@/utils/perfectZohoIntegration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { limit = 20, force_refresh = false } = body;

    console.log(`🔄 Manual perfect lead processing triggered - Limit: ${limit}, Force refresh: ${force_refresh}`);

    // If force refresh is requested, test token refresh first
    if (force_refresh) {
      console.log('🔄 Testing token refresh...');
      const refreshTest = await perfectZohoIntegration.testTokenRefresh();
      
      if (!refreshTest.success) {
        return NextResponse.json({
          success: false,
          error: 'Token refresh test failed',
          refresh_test: refreshTest
        }, { status: 400 });
      }
      
      console.log('✅ Token refresh test passed');
    }

    // Get current health status
    const healthStatus = await perfectZohoIntegration.getPerfectHealthStatus();
    
    // Check if we have valid tokens
    if (!healthStatus.token_status.has_token) {
      return NextResponse.json({
        success: false,
        error: 'No Zoho tokens configured',
        action: 'setup_authentication_required',
        health_status: healthStatus
      }, { status: 400 });
    }

    // Process leads
    const processingResult = await perfectZohoIntegration.processAllPendingLeads(limit);
    
    // Get updated health status
    const updatedHealthStatus = await perfectZohoIntegration.getPerfectHealthStatus();

    console.log(`✅ Manual perfect processing completed: ${processingResult.successful} successful, ${processingResult.failed} failed`);

    return NextResponse.json({
      success: true,
      message: 'Perfect manual processing completed',
      summary: {
        totalProcessed: processingResult.processed,
        successful: processingResult.successful,
        failed: processingResult.failed,
        errors: processingResult.errors.length > 0 ? processingResult.errors : undefined
      },
      health_status: updatedHealthStatus,
      processedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in manual perfect processing:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('📊 Getting perfect system status...');
    
    // Get comprehensive health status
    const healthStatus = await perfectZohoIntegration.getPerfectHealthStatus();
    
    // Test token refresh capability
    const tokenRefreshTest = await perfectZohoIntegration.testTokenRefresh();
    
    // Get pending leads count
    const pendingLeads = healthStatus.lead_processing.combined.total_pending;
    
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      system_status: {
        token_valid: healthStatus.system_status.token_valid,
        can_refresh: healthStatus.system_status.can_refresh,
        leads_pending: pendingLeads,
        success_rate: healthStatus.system_status.overall_success_rate
      },
      health_status: healthStatus,
      token_refresh_test: tokenRefreshTest,
      actions_available: {
        process_leads: pendingLeads > 0,
        test_refresh: healthStatus.system_status.can_refresh,
        setup_auth: !healthStatus.token_status.has_token
      }
    });

  } catch (error) {
    console.error('❌ Error getting perfect system status:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
