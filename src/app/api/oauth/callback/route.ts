import { NextRequest, NextResponse } from 'next/server';
import { setAccessToken, setRefreshToken } from '@/server/zohoTokenStore';

interface ZohoTokenResponse {
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth error
    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(
        new URL(`/dashboard?error=${encodeURIComponent('OAuth authorization failed')}`, request.url)
      );
    }

    // Validate required parameters
    if (!code) {
      console.error('Missing authorization code');
      return NextResponse.redirect(
        new URL(`/dashboard?error=${encodeURIComponent('Missing authorization code')}`, request.url)
      );
    }

    // Validate state parameter (optional but recommended for security)
    const expectedState = process.env.ZOHO_OAUTH_STATE;
    if (expectedState && state !== expectedState) {
      console.error('Invalid state parameter');
      return NextResponse.redirect(
        new URL(`/dashboard?error=${encodeURIComponent('Invalid state parameter')}`, request.url)
      );
    }

    // Exchange authorization code for access token
    const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
    const tokenParams = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      redirect_uri: process.env.ZOHO_REDIRECT_URI!,
      code: code,
    });

    const tokenResponse = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: tokenParams.toString(),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return NextResponse.redirect(
        new URL(`/dashboard?error=${encodeURIComponent('Token exchange failed')}`, request.url)
      );
    }

    const tokenData: ZohoTokenResponse = await tokenResponse.json();

    // Store tokens securely (in production, use encrypted storage or database)
    // For now, we'll store in environment variables or return them
    // Note: In production, store these securely in a database with encryption
    
    // Store tokens in environment or database
    // This is a simplified example - implement proper storage based on your needs
    const response = NextResponse.redirect(
      new URL('/dashboard?success=oauth_complete', request.url)
    );

    // Also persist centrally so normal users don't need to authenticate
    await setAccessToken(tokenData.access_token, tokenData.expires_in);
    if (tokenData.refresh_token) {
      await setRefreshToken(tokenData.refresh_token);
    }

    // Log successful authentication (remove in production)
    console.log('OAuth callback successful for client:', process.env.ZOHO_CLIENT_ID?.substring(0, 8) + '...');

    return response;

  } catch (error) {
    console.error('OAuth callback error:', error);
    return NextResponse.redirect(
      new URL(`/dashboard?error=${encodeURIComponent('Internal server error')}`, request.url)
    );
  }
}

// Optional: Handle POST requests if needed
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
