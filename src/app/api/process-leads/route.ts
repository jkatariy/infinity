import { NextRequest, NextResponse } from 'next/server';
import { zohoIntegration } from '@/utils/zohoIntegration';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { limit = 10, force = false } = body;

    // Optional authentication check
    const authHeader = request.headers.get('authorization');
    const apiKey = process.env.API_SECRET_KEY;
    
    if (apiKey && authHeader !== `Bearer ${apiKey}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log(`🔄 Manual lead processing requested: limit=${limit}, force=${force}`);

    // Get system health status
    const healthStatus = await zohoIntegration.getHealthStatus();
    console.log('📊 Current health status:', healthStatus);

    // Check if system is healthy
    if (!healthStatus.token_status.has_token) {
      return NextResponse.json({
        success: false,
        error: 'No Zoho tokens found',
        action: 'authenticate_required',
        health_status: healthStatus
      }, { status: 400 });
    }

    if (!healthStatus.token_status.has_access_token || healthStatus.token_status.is_expired) {
      return NextResponse.json({
        success: false,
        error: 'Zoho token is invalid or expired',
        action: 'token_refresh_required',
        health_status: healthStatus
      }, { status: 400 });
    }

    // Process leads
    const result = await zohoIntegration.processPendingLeads(limit);

    // Get updated health status
    const updatedHealthStatus = await zohoIntegration.getHealthStatus();

    return NextResponse.json({
      success: true,
      message: 'Lead processing completed',
      result,
      health_status: updatedHealthStatus,
      processed_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in manual lead processing:', error);
    
    // Try to get health status even if processing failed
    let healthStatus = null;
    try {
      healthStatus = await zohoIntegration.getHealthStatus();
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

export async function GET(request: NextRequest) {
  try {
    // Get system status
    const healthStatus = await zohoIntegration.getHealthStatus();
    
    return NextResponse.json({
      success: true,
      message: 'System status retrieved',
      health_status: healthStatus,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error getting system status:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
