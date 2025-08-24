import { NextRequest, NextResponse } from 'next/server';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

// ============================================================================
// UNIFIED DAILY ZOHO SYNC CRON JOB
// ============================================================================

export async function GET(request: NextRequest) {
  return await handleCronRequest(request);
}

export async function POST(request: NextRequest) {
  return await handleCronRequest(request);
}

async function handleCronRequest(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request (optional security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || process.env.CRON_SECRET_KEY;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.log('⚠️ Unauthorized cron request');
      return NextResponse.json({ 
        success: false,
        error: 'Unauthorized',
        timestamp: new Date().toISOString()
      }, { status: 401 });
    }

    console.log('🕐 Starting unified daily Zoho sync...');
    
    const startTime = Date.now();
    const syncResult = await performDailySync();
    const endTime = Date.now();
    const processingTime = endTime - startTime;

    console.log(`🎉 Daily sync completed in ${processingTime}ms`);

    return NextResponse.json({
      success: true,
      message: 'Daily Zoho sync completed successfully',
      data: syncResult,
      processing_time_ms: processingTime,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in daily sync:', error);
    return NextResponse.json({
      success: false,
      error: 'Daily sync failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

async function performDailySync() {
  const syncResult = {
    start_time: new Date().toISOString(),
    end_time: '',
    token_refresh: null as any,
    lead_processing: null as any,
    system_health: null as any,
    cleanup: null as any,
    errors: [] as string[]
  };

  try {
    // Step 1: Get initial system health
    console.log('📊 Step 1: Checking system health...');
    syncResult.system_health = await unifiedZohoIntegration.getSystemHealth();
    
    // Step 2: Test token refresh capability
    console.log('🔑 Step 2: Testing token refresh...');
    syncResult.token_refresh = await unifiedZohoIntegration.testTokenRefresh();
    
    if (!syncResult.token_refresh.success) {
      syncResult.errors.push(`Token refresh failed: ${syncResult.token_refresh.message}`);
      console.error('❌ Token refresh failed, but continuing with sync...');
    }

    // Step 3: Process pending leads
    console.log('📋 Step 3: Processing pending leads...');
    syncResult.lead_processing = await unifiedZohoIntegration.processAllPendingLeads(50); // Process up to 50 leads per run
    
    if (syncResult.lead_processing.failed > 0) {
      syncResult.errors.push(`${syncResult.lead_processing.failed} leads failed to process`);
    }

    // Step 4: Perform system cleanup
    console.log('🧹 Step 4: Performing system cleanup...');
    syncResult.cleanup = await performSystemCleanup();

    // Step 5: Get final system health
    console.log('📊 Step 5: Getting final system health...');
    const finalHealth = await unifiedZohoIntegration.getSystemHealth();
    syncResult.system_health.final = finalHealth;

    syncResult.end_time = new Date().toISOString();

    // Log summary
    console.log('📈 Daily sync summary:', {
      leads_processed: syncResult.lead_processing.processed,
      leads_successful: syncResult.lead_processing.successful,
      leads_failed: syncResult.lead_processing.failed,
      processing_time: syncResult.lead_processing.processing_time_ms,
      errors: syncResult.errors.length
    });

    return syncResult;

  } catch (error) {
    console.error('❌ Error during daily sync:', error);
    syncResult.errors.push(error instanceof Error ? error.message : 'Unknown error');
    syncResult.end_time = new Date().toISOString();
    return syncResult;
  }
}

async function performSystemCleanup() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Cleanup old failed leads (older than 30 days)
    const { data: deletedCount, error: cleanupError } = await supabase.rpc('cleanup_old_failed_leads', { p_days: 30 });
    
    if (cleanupError) {
      console.error('❌ Error during cleanup:', cleanupError);
      return {
        success: false,
        error: cleanupError.message,
        deleted_count: 0
      };
    }

    // Reset stuck leads
    const { data: resetCount, error: resetError } = await supabase.rpc('reset_stuck_leads');
    
    if (resetError) {
      console.error('❌ Error resetting stuck leads:', resetError);
      return {
        success: false,
        error: resetError.message,
        deleted_count: deletedCount || 0,
        reset_count: 0
      };
    }

    return {
      success: true,
      deleted_count: deletedCount || 0,
      reset_count: resetCount || 0,
      message: `Cleanup completed: ${deletedCount || 0} old leads deleted, ${resetCount || 0} stuck leads reset`
    };

  } catch (error) {
    console.error('❌ Error during system cleanup:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      deleted_count: 0,
      reset_count: 0
    };
  }
}
