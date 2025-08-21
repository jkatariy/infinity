import { NextRequest, NextResponse } from 'next/server';
import { 
  getTokenStatus, 
  clearStoredTokens, 
  getStoredTokens,
  isAccessTokenValid,
  setAccessToken
} from '@/server/zohoTokenStore';

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('Refreshing access token...');
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
      console.error('Failed to refresh token:', errorText);
      return null;
    }

    const data: ZohoTokenResponse = await response.json();
    console.log('Token refresh successful');
    
    // Store the new access token
    await setAccessToken(data.access_token, data.expires_in);
    
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

// GET: Check token status and authentication
export async function GET(request: NextRequest) {
  try {
    const tokenStatus = await getTokenStatus();
    const tokens = await getStoredTokens();
    const isValid = await isAccessTokenValid();

    return NextResponse.json({
      success: true,
      tokenStatus,
      hasTokens: !!tokens,
      accessTokenValid: isValid,
      environment: {
        hasClientId: !!process.env.ZOHO_CLIENT_ID,
        hasClientSecret: !!process.env.ZOHO_CLIENT_SECRET,
        hasAccountsUrl: !!process.env.ZOHO_ACCOUNTS_URL,
        hasApiDomain: !!process.env.ZOHO_API_DOMAIN,
        hasRedirectUri: !!process.env.ZOHO_REDIRECT_URI,
      }
    });
  } catch (error) {
    console.error('Error getting token status:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// DELETE: Clear all stored tokens (for testing or re-authentication)
export async function DELETE(request: NextRequest) {
  try {
    await clearStoredTokens();
    
    return NextResponse.json({
      success: true,
      message: 'All tokens cleared successfully'
    });
  } catch (error) {
    console.error('Error clearing tokens:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// POST: Force token refresh (for testing)
export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'refresh') {
      const tokens = await getStoredTokens();
      if (!tokens?.refreshToken) {
        return NextResponse.json({
          success: false,
          error: 'No refresh token available'
        }, { status: 400 });
      }

      const newAccessToken = await refreshAccessToken(tokens.refreshToken);
      
      if (newAccessToken) {
        const updatedStatus = await getTokenStatus();
        return NextResponse.json({
          success: true,
          message: 'Token refreshed successfully',
          tokenStatus: updatedStatus
        });
      } else {
        return NextResponse.json({
          success: false,
          error: 'Failed to refresh token'
        }, { status: 400 });
      }
    }

    return NextResponse.json({
      success: false,
      error: 'Invalid action'
    }, { status: 400 });
  } catch (error) {
    console.error('Error in token management:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
