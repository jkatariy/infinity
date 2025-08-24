import { NextRequest, NextResponse } from 'next/server';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Testing complete lead workflow...');
    
    // Test 1: Check system health
    console.log('📊 Checking system health...');
    const health = await unifiedZohoIntegration.getSystemHealth();
    
    // Test 2: Check token status
    console.log('🔑 Checking token status...');
    const tokenStatus = health.token_status;
    
    // Test 3: Get pending leads count
    console.log('📋 Checking pending leads...');
    const pendingLeads = await unifiedZohoIntegration.getPendingLeads(5);
    
    // Test 4: Try to process leads if we have valid tokens
    let processingResult = null;
    if (tokenStatus.has_token && !tokenStatus.is_expired) {
      console.log('🔄 Testing lead processing...');
      processingResult = await unifiedZohoIntegration.processAllPendingLeads(2);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Lead workflow test completed',
      results: {
        system_health: health,
        token_status: {
          has_token: tokenStatus.has_token,
          is_expired: tokenStatus.is_expired,
          expires_at: tokenStatus.expires_at
        },
        pending_leads_count: pendingLeads.length,
        processing_result: processingResult,
        workflow_status: {
          quote_form_endpoint: '/api/leads/quote-form',
          chatbot_endpoint: '/api/leads/chatbot',
          daily_sync_endpoint: '/api/cron/daily-zoho-sync',
          oauth_endpoint: '/api/oauth/authorize'
        }
      }
    });

  } catch (error) {
    console.error('❌ Error testing lead workflow:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
