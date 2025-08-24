import { NextRequest, NextResponse } from 'next/server';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

export async function GET(request: NextRequest) {
  try {
    console.log('🕘 Starting daily Zoho sync at 9 AM IST...');
    console.log('📅 Current time:', new Date().toISOString());
    
    // Step 1: Check system health
    console.log('🔍 Step 1: Checking system health...');
    const health = await unifiedZohoIntegration.getSystemHealth();
    console.log('📊 System health:', {
      token_status: health.token_status,
      pending_leads: health.lead_processing.pending,
      success_rate: health.lead_processing.success_rate
    });

    // Step 2: Refresh authentication (get valid access token)
    console.log('🔑 Step 2: Refreshing authentication...');
    const tokenResult = await unifiedZohoIntegration.getValidAccessToken();
    
    if (!tokenResult.success) {
      console.error('❌ Authentication refresh failed:', tokenResult.error);
      return NextResponse.json({
        success: false,
        error: 'Authentication refresh failed',
        details: tokenResult.error,
        timestamp: new Date().toISOString(),
        step: 'authentication_refresh'
      }, { status: 500 });
    }

    console.log('✅ Authentication refreshed successfully');
    console.log('🕐 Token expires at:', tokenResult.expires_at);

    // Step 3: Process all pending leads
    console.log('📤 Step 3: Processing pending leads...');
    const processingResult = await unifiedZohoIntegration.processAllPendingLeads(50); // Process up to 50 leads per run
    
    console.log('📈 Processing results:', {
      total_processed: processingResult.total_processed,
      successful: processingResult.successful,
      failed: processingResult.failed,
      skipped: processingResult.skipped
    });

    // Step 4: Get final status
    console.log('📊 Step 4: Getting final system status...');
    const finalHealth = await unifiedZohoIntegration.getSystemHealth();

    // Step 5: Log completion
    console.log('✅ Daily sync completed successfully!');
    console.log('📅 Sync completed at:', new Date().toISOString());

    return NextResponse.json({
      success: true,
      message: 'Daily Zoho sync completed successfully',
      timestamp: new Date().toISOString(),
      timezone: 'IST (UTC+5:30)',
      sync_details: {
        authentication: {
          status: 'success',
          token_expires_at: tokenResult.expires_at
        },
        lead_processing: {
          total_processed: processingResult.total_processed,
          successful: processingResult.successful,
          failed: processingResult.failed,
          skipped: processingResult.skipped
        },
        final_status: {
          pending_leads: finalHealth.lead_processing.pending,
          success_rate: finalHealth.lead_processing.success_rate,
          total_leads: finalHealth.lead_processing.total
        }
      }
    });

  } catch (error) {
    console.error('❌ Daily sync failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Daily sync failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      timezone: 'IST (UTC+5:30)'
    }, { status: 500 });
  }
}

// Handle POST requests for manual trigger
export async function POST(request: NextRequest) {
  return GET(request);
}
