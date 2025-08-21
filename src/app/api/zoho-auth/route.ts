import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

interface ZohoAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({
        success: false,
        error: 'Authorization code is required'
      }, { status: 400 });
    }

    console.log('🔄 Exchanging authorization code for tokens...');

    // Exchange authorization code for tokens
    const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      code: code,
      redirect_uri: process.env.ZOHO_REDIRECT_URI || 'https://your-domain.com/api/zoho-callback',
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Failed to exchange code for tokens:', errorText);
      return NextResponse.json({
        success: false,
        error: 'Failed to exchange authorization code for tokens',
        details: errorText
      }, { status: 400 });
    }

    const data: ZohoAuthResponse = await response.json();
    console.log('✅ Successfully obtained tokens');

    // Store tokens in database
    const { error } = await supabase.rpc('update_zoho_token', {
      p_access_token: data.access_token,
      p_refresh_token: data.refresh_token,
      p_expires_in_seconds: data.expires_in
    });

    if (error) {
      console.error('❌ Error storing tokens:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to store tokens in database'
      }, { status: 500 });
    }

    console.log('✅ Tokens stored successfully');

    return NextResponse.json({
      success: true,
      message: 'Zoho authentication successful',
      expires_in: data.expires_in,
      token_type: data.token_type
    });

  } catch (error) {
    console.error('❌ Error in Zoho authentication:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get current token status
    const { data: tokenStatus, error } = await supabase.rpc('get_zoho_token_status');
    
    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Failed to get token status'
      }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      authenticated: tokenStatus.has_token && tokenStatus.has_refresh_token,
      token_status: tokenStatus
    });

  } catch (error) {
    console.error('❌ Error checking authentication status:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
