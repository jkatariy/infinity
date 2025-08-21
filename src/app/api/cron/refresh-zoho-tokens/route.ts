import { NextRequest, NextResponse } from 'next/server';
import { 
  getStoredTokens, 
  setAccessToken, 
  getTokenStatus,
  clearStoredTokens 
} from '@/server/zohoTokenStore';

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('🔄 Refreshing Zoho access token...');
    const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      refresh_token: refreshToken,
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
      console.error('❌ Failed to refresh token:', errorText);
      return null;
    }

    const data: ZohoTokenResponse = await response.json();
    console.log('✅ Token refresh successful');
    
    // Store the new access token
    await setAccessToken(data.access_token, data.expires_in);
    
    return data.access_token;
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🕐 Starting Zoho token refresh...');
    
    // Get current token status
    const tokenStatus = await getTokenStatus();
    const tokens = await getStoredTokens();
    
    console.log('📊 Current token status:', {
      hasAccessToken: tokenStatus.hasAccessToken,
      hasRefreshToken: tokenStatus.hasRefreshToken,
      accessTokenValid: tokenStatus.accessTokenValid,
      expiresAt: tokenStatus.accessTokenExpiresAt ? new Date(tokenStatus.accessTokenExpiresAt * 1000).toISOString() : 'Unknown'
    });

    // If no refresh token, we can't refresh
    if (!tokens?.refreshToken) {
      console.log('❌ No refresh token available for refresh');
      return NextResponse.json({
        success: false,
        message: 'No refresh token available',
        action: 'manual_authentication_required'
      });
    }

    // ALWAYS refresh the token (no smart decision)
    console.log('🔄 Refreshing token as requested...');
    const newAccessToken = await refreshAccessToken(tokens.refreshToken);
    
    if (newAccessToken) {
      const updatedStatus = await getTokenStatus();
      console.log('✅ Token refresh completed successfully');
      
      return NextResponse.json({
        success: true,
        message: 'Token refreshed successfully',
        action: 'token_refreshed',
        tokenStatus: updatedStatus,
        refreshedAt: new Date().toISOString()
      });
    } else {
      console.log('❌ Token refresh failed, clearing invalid tokens');
      
      // If refresh failed, clear tokens to force re-authentication
      await clearStoredTokens();
      
      return NextResponse.json({
        success: false,
        message: 'Token refresh failed, tokens cleared',
        action: 'manual_authentication_required'
      });
    }

  } catch (error) {
    console.error('❌ Error in token refresh:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle POST requests for manual trigger
export async function POST(request: NextRequest) {
  return GET(request);
}
