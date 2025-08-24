import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Force dynamic rendering for OAuth callback
export const dynamic = 'force-dynamic';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  try {
    console.log('🔄 Processing OAuth callback...');
    
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');
    const errorDescription = searchParams.get('error_description');
    
    console.log('📋 Callback parameters:', {
      has_code: !!code,
      state,
      error,
      error_description: errorDescription
    });
    
    // Check for errors
    if (error) {
      console.error('❌ OAuth error:', error, errorDescription);
      return NextResponse.json({
        success: false,
        error: 'OAuth authorization failed',
        details: {
          error,
          description: errorDescription
        }
      }, { status: 400 });
    }
    
    if (!code) {
      console.error('❌ No authorization code received');
      return NextResponse.json({
        success: false,
        error: 'No authorization code received',
        details: 'The OAuth callback did not include an authorization code'
      }, { status: 400 });
    }
    
    // Validate state parameter for security
    const expectedState = process.env.ZOHO_OAUTH_STATE || 'infinity_automated_solutions_2024';
    if (state !== expectedState) {
      console.error('❌ Invalid state parameter:', { received: state, expected: expectedState });
      return NextResponse.json({
        success: false,
        error: 'Invalid state parameter',
        details: 'OAuth state validation failed'
      }, { status: 400 });
    }
    
    console.log('✅ Authorization code received, exchanging for tokens...');
    
    // Exchange authorization code for tokens
    const tokenResponse = await exchangeCodeForTokens(code);
    
    if (!tokenResponse.success) {
      console.error('❌ Token exchange failed:', tokenResponse.error);
      return NextResponse.json({
        success: false,
        error: 'Token exchange failed',
        details: tokenResponse.error
      }, { status: 500 });
    }
    
    console.log('✅ Tokens received successfully');
    
    // Store tokens in database
    const storeResult = await storeTokens(tokenResponse.data);
    
    if (!storeResult.success) {
      console.error('❌ Failed to store tokens:', storeResult.error);
      return NextResponse.json({
        success: false,
        error: 'Failed to store tokens',
        details: storeResult.error
      }, { status: 500 });
    }
    
    console.log('✅ Tokens stored successfully');
    
    // Redirect to success page
    return NextResponse.redirect(new URL('/auth-success', request.url));
    
  } catch (error) {
    console.error('❌ Error in OAuth callback:', error);
    return NextResponse.json({
      success: false,
      error: 'OAuth callback failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

async function exchangeCodeForTokens(code: string) {
  try {
    const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      code: code,
      redirect_uri: process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/api/oauth/callback'
        : process.env.ZOHO_REDIRECT_URI!
    });

    console.log('🔄 Exchanging code for tokens at:', tokenUrl);

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Token exchange failed:', response.status, errorText);
      return {
        success: false,
        error: `Token exchange failed: ${response.status} - ${errorText}`
      };
    }

    const data = await response.json();
    console.log('✅ Token exchange successful');
    
    return {
      success: true,
      data: {
        access_token: data.access_token,
        refresh_token: data.refresh_token,
        expires_in: data.expires_in,
        token_type: data.token_type
      }
    };
    
  } catch (error) {
    console.error('❌ Error exchanging code for tokens:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function storeTokens(tokenData: any) {
  try {
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + tokenData.expires_in);
    
    console.log('💾 Storing tokens in database...');
    
    // Delete any existing tokens first
    const { error: deleteError } = await supabase
      .from('zoho_tokens')
      .delete()
      .eq('id', '00000000-0000-0000-0000-000000000000');
    
    if (deleteError) {
      console.warn('⚠️ Warning: Could not delete existing tokens:', deleteError);
    }
    
    // Insert new tokens
    const { error } = await supabase
      .from('zoho_tokens')
      .insert({
        id: '00000000-0000-0000-0000-000000000000',
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        access_token_expires_at: expiresAt.toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('❌ Database error storing tokens:', error);
      return {
        success: false,
        error: error.message
      };
    }
    
    console.log('✅ Tokens stored successfully');
    return {
      success: true
    };
    
  } catch (error) {
    console.error('❌ Error storing tokens:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}
