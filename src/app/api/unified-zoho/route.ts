import { NextRequest, NextResponse } from 'next/server';
import { unifiedZohoIntegration } from '@/utils/unifiedZohoIntegration';

// ============================================================================
// UNIFIED ZOHO INTEGRATION API
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    console.log('🔍 Unified Zoho API GET request:', { action });

    switch (action) {
      case 'health':
        return await getSystemHealth();
      
      case 'stats':
        return await getProcessingStats();
      
      case 'status':
        return await getSystemStatus();
      
      case 'pending':
        return await getPendingLeads();
      
      case 'errors':
        return await getErrorAnalysis();
      
      case 'metrics':
        return await getSystemMetrics();
      
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Supported actions: health, stats, status, pending, errors, metrics'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Error in unified Zoho API GET:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...data } = body;

    console.log('🔄 Unified Zoho API POST request:', { action });

    switch (action) {
      case 'store-lead':
        return await storeLead(data);
      
      case 'process-leads':
        return await processLeads(data);
      
      case 'refresh-token':
        return await refreshToken();
      
      case 'test-connection':
        return await testConnection();
      
      case 'cleanup':
        return await cleanupSystem(data);
      
      case 'reset-stuck':
        return await resetStuckLeads();
      
      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid action. Supported actions: store-lead, process-leads, refresh-token, test-connection, cleanup, reset-stuck'
        }, { status: 400 });
    }
  } catch (error) {
    console.error('❌ Error in unified Zoho API POST:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// ============================================================================
// GET HANDLERS
// ============================================================================

async function getSystemHealth() {
  try {
    console.log('🏥 Getting system health...');
    const health = await unifiedZohoIntegration.getSystemHealth();
    
    return NextResponse.json({
      success: true,
      data: health,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting system health:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get system health',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function getProcessingStats() {
  try {
    console.log('📊 Getting processing statistics...');
    const stats = await unifiedZohoIntegration.getProcessingStats();
    
    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting processing stats:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get processing statistics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function getSystemStatus() {
  try {
    console.log('📈 Getting system status...');
    const health = await unifiedZohoIntegration.getSystemHealth();
    
    const status = {
      overall: 'healthy',
      issues: [] as string[],
      warnings: [] as string[],
      details: health
    };

    // Check for critical issues
    if (!health.token_status.has_token) {
      status.overall = 'critical';
      status.issues.push('No Zoho tokens configured');
    }

    if (health.token_status.has_token && health.token_status.is_expired && !health.token_status.has_refresh_token) {
      status.overall = 'critical';
      status.issues.push('Token expired and no refresh token available');
    }

    if (!health.environment.has_client_id || !health.environment.has_client_secret) {
      status.overall = 'critical';
      status.issues.push('Missing Zoho environment variables');
    }

    // Check for warnings
    if (health.token_status.has_token && health.token_status.is_expired && health.token_status.has_refresh_token) {
      status.warnings.push('Token expired but refresh token available - will auto-refresh on next use');
    }

    if (health.lead_processing.combined.pending > 50) {
      status.warnings.push(`High number of pending leads: ${health.lead_processing.combined.pending}`);
    }

    if (health.lead_processing.combined.overall_success_rate < 80) {
      status.warnings.push(`Low success rate: ${health.lead_processing.combined.overall_success_rate}%`);
    }

    return NextResponse.json({
      success: true,
      data: status,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting system status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get system status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function getPendingLeads() {
  try {
    console.log('📋 Getting pending leads...');
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('zoho_pending_leads_view')
      .select('*')
      .limit(50);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        pending_leads: data || [],
        count: data?.length || 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting pending leads:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get pending leads',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function getErrorAnalysis() {
  try {
    console.log('🔍 Getting error analysis...');
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase
      .from('zoho_error_analysis_view')
      .select('*');

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data: {
        error_analysis: data || [],
        total_errors: data?.reduce((sum, item) => sum + (item.count || 0), 0) || 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting error analysis:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get error analysis',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function getSystemMetrics() {
  try {
    console.log('📈 Getting system metrics...');
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase.rpc('get_system_metrics');

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      data,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error getting system metrics:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to get system metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// ============================================================================
// POST HANDLERS
// ============================================================================

async function storeLead(data: any) {
  try {
    console.log('📝 Storing lead data...');
    
    // Validate required fields
    const { name, email, message, source } = data;
    
    if (!name || !email || !message || !source) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, message, and source are required'
      }, { status: 400 });
    }

    // Validate source
    if (!['quote_form', 'chatbot'].includes(source)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid source. Must be either "quote_form" or "chatbot"'
      }, { status: 400 });
    }

    // Store lead using unified service
    const leadId = await unifiedZohoIntegration.storeLeadData({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: data.phone?.trim() || undefined,
      company: data.company?.trim() || undefined,
      message: message.trim(),
      source,
      product_name: data.product_name?.trim() || undefined,
      product_url: data.product_url?.trim() || undefined
    });

    console.log('✅ Lead stored successfully:', { leadId, name, email: '[REDACTED]', source });

    return NextResponse.json({
      success: true,
      message: 'Lead stored successfully and will be processed automatically',
      data: { leadId },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error storing lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to store lead',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function processLeads(data: any) {
  try {
    console.log('🔄 Processing leads...');
    
    const limit = data.limit || 20;
    const force = data.force || false;

    // Get system health first
    const health = await unifiedZohoIntegration.getSystemHealth();
    
    // Check if system is healthy
    if (!health.token_status.has_token) {
      return NextResponse.json({
        success: false,
        error: 'No Zoho tokens found',
        action: 'authenticate_required',
        health_status: health
      }, { status: 400 });
    }

    if (!health.token_status.has_access_token || health.token_status.is_expired) {
      return NextResponse.json({
        success: false,
        error: 'Zoho token is invalid or expired',
        action: 'token_refresh_required',
        health_status: health
      }, { status: 400 });
    }

    // Process leads
    const result = await unifiedZohoIntegration.processAllPendingLeads(limit);

    // Get updated health status
    const updatedHealth = await unifiedZohoIntegration.getSystemHealth();

    return NextResponse.json({
      success: true,
      message: 'Lead processing completed',
      data: {
        processing_result: result,
        health_status: updatedHealth
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing leads:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to process leads',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function refreshToken() {
  try {
    console.log('🔄 Refreshing token...');
    
    const result = await unifiedZohoIntegration.testTokenRefresh();
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Token refreshed successfully',
        data: result,
        timestamp: new Date().toISOString()
      });
    } else {
      return NextResponse.json({
        success: false,
        error: 'Token refresh failed',
        details: result,
        timestamp: new Date().toISOString()
      }, { status: 400 });
    }

  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to refresh token',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function testConnection() {
  try {
    console.log('🧪 Testing connection...');
    
    const health = await unifiedZohoIntegration.getSystemHealth();
    const tokenTest = await unifiedZohoIntegration.testTokenRefresh();
    
    const connectionStatus = {
      database: 'connected',
      zoho_api: tokenTest.success ? 'connected' : 'disconnected',
      environment: health.environment.has_client_id && health.environment.has_client_secret ? 'configured' : 'misconfigured',
      overall: tokenTest.success ? 'healthy' : 'degraded'
    };

    return NextResponse.json({
      success: true,
      message: 'Connection test completed',
      data: {
        connection_status: connectionStatus,
        health_status: health,
        token_test: tokenTest
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error testing connection:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to test connection',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function cleanupSystem(data: any) {
  try {
    console.log('🧹 Cleaning up system...');
    
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const days = data.days || 30;
    const { data: deletedCount, error } = await supabase.rpc('cleanup_old_failed_leads', { p_days: days });

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Cleanup completed. Deleted ${deletedCount} old failed leads.`,
      data: { deleted_count: deletedCount },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error cleaning up system:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to cleanup system',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function resetStuckLeads() {
  try {
    console.log('🔄 Resetting stuck leads...');
    
    const { createClient } = await import('@supabase/supabase-js');
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: updatedCount, error } = await supabase.rpc('reset_stuck_leads');

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
      message: `Reset completed. Updated ${updatedCount} stuck leads.`,
      data: { updated_count: updatedCount },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error resetting stuck leads:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to reset stuck leads',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
