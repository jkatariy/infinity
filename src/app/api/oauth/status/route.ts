import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking OAuth status...');
    
    // Get current tokens
    const { data: tokens, error } = await supabase
      .from('zoho_tokens')
      .select('*')
      .eq('id', '00000000-0000-0000-0000-000000000000')
      .single();
    
    if (error || !tokens) {
      console.log('❌ No tokens found');
      return NextResponse.json({
        success: true,
        authenticated: false,
        message: 'Not authenticated with Zoho',
        next_step: 'Visit /api/oauth/authorize to authenticate'
      });
    }
    
    // Check if token is expired
    const now = new Date();
    const expiresAt = new Date(tokens.access_token_expires_at);
    const isExpired = now > expiresAt;
    
    console.log('✅ Tokens found, checking expiration...');
    
    return NextResponse.json({
      success: true,
      authenticated: true,
      token_status: {
        has_access_token: !!tokens.access_token,
        has_refresh_token: !!tokens.refresh_token,
        expires_at: tokens.access_token_expires_at,
        is_expired: isExpired,
        created_at: tokens.created_at,
        updated_at: tokens.updated_at
      },
      message: isExpired ? 'Tokens expired, refresh needed' : 'Authenticated and ready',
      next_step: isExpired ? 'Tokens will be refreshed automatically' : 'Ready to use'
    });
    
  } catch (error) {
    console.error('❌ Error checking OAuth status:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to check OAuth status',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
