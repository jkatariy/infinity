import { NextRequest, NextResponse } from 'next/server';
import {
  getRefreshToken as getStoredRefreshToken,
  setAccessToken as setStoredAccessToken,
  getTokenStatus,
} from '@/server/zohoTokenStore';

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('🔄 Daily token refresh initiated at 8:59 AM IST...');
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
    console.log('✅ Daily token refresh successful');
    
    // Store the new access token
    await setStoredAccessToken(data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('❌ Error during daily token refresh:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check if this is a scheduled job
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get refresh token
    const refreshToken = await getStoredRefreshToken();

    if (!refreshToken) {
      console.error('❌ No refresh token available for daily refresh');
      return NextResponse.json(
        { error: 'No refresh token available. Manual authentication required.' },
        { status: 400 }
      );
    }

    console.log('🕘 Daily token refresh process starting...');
    console.log('Current token status:', await getTokenStatus());

    // Refresh the access token
    const newAccessToken = await refreshAccessToken(refreshToken);
    
    if (!newAccessToken) {
      console.error('❌ Daily token refresh failed');
      return NextResponse.json(
        { error: 'Failed to refresh access token' },
        { status: 500 }
      );
    }

    console.log('✅ Daily token refresh completed successfully');
    console.log('Updated token status:', await getTokenStatus());

    return NextResponse.json({
      success: true,
      message: 'Daily token refresh completed successfully',
      timestamp: new Date().toISOString(),
      istTime: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString()
    });

  } catch (error) {
    console.error('❌ Error in daily token refresh:', error);
    return NextResponse.json(
      { error: 'Failed to perform daily token refresh' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Allow manual trigger for testing (with proper authentication)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const tokenStatus = await getTokenStatus();
    return NextResponse.json({
      success: true,
      message: 'Token status check',
      tokenStatus,
      currentTime: new Date().toISOString(),
      istTime: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString()
    });

  } catch (error) {
    console.error('Error checking token status:', error);
    return NextResponse.json(
      { error: 'Failed to check token status' },
      { status: 500 }
    );
  }
}
