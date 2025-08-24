import { NextRequest, NextResponse } from 'next/server';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request (optional security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.log('⚠️ Unauthorized cron request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🕐 Starting PERFECT daily Zoho sync at 9 AM IST...');
    
    // Get comprehensive system health status
    const healthStatus = await unifiedZohoIntegration.getSystemHealth();
    console.log('📊 Perfect system health status:', healthStatus);

    // Check if we have any tokens at all
    if (!healthStatus.token_status.has_token) {
      console.log('❌ No Zoho tokens found');
      return NextResponse.json({
        success: false,
        message: 'No Zoho tokens found',
        action: 'manual_authentication_required',
        health_status: healthStatus
      });
    }

    // Try to get a valid access token (this will automatically refresh if needed)
    console.log('🔑 Getting valid access token with automatic refresh...');
    const accessToken = await unifiedZohoIntegration.getValidAccessToken();
    
    if (!accessToken) {
      console.log('❌ Failed to get valid access token');
      return NextResponse.json({
        success: false,
        message: 'Failed to get valid access token - refresh token may be invalid',
        action: 'manual_authentication_required',
        health_status: healthStatus
      });
    }

    console.log('✅ Successfully obtained valid access token');

    // Process all pending leads from both tables
    console.log('📋 Processing all pending leads from both tables...');
    const processingResult = await unifiedZohoIntegration.processAllPendingLeads(20); // Process up to 20 leads per run
    
    console.log(`✅ Perfect daily sync completed: ${processingResult.successful} successful, ${processingResult.failed} failed`);

    // Get updated health status
    const updatedHealthStatus = await unifiedZohoIntegration.getSystemHealth();

    return NextResponse.json({
      success: true,
      message: 'Perfect daily Zoho sync completed',
      action: 'perfect_daily_sync_completed',
      summary: {
        totalProcessed: processingResult.processed,
        successful: processingResult.successful,
        failed: processingResult.failed,
        errors: processingResult.errors.length > 0 ? processingResult.errors : undefined
      },
      health_status: updatedHealthStatus,
      syncedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in perfect daily Zoho sync:', error);
    
    // Try to get health status even if processing failed
    let healthStatus = null;
    try {
      healthStatus = await unifiedZohoIntegration.getSystemHealth();
    } catch (healthError) {
      console.error('❌ Error getting health status:', healthError);
    }
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      health_status: healthStatus
    }, { status: 500 });
  }
}

// Handle POST requests for manual trigger
export async function POST(request: NextRequest) {
  return GET(request);
}
