import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Use fixed state parameter from environment for consistency
    const state = process.env.ZOHO_OAUTH_STATE || 'infinity_automated_solutions_2024';
    
    // Zoho OAuth authorization URL
    const authUrl = new URL(`${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/auth`);
    
    authUrl.searchParams.append('scope', process.env.ZOHO_SCOPE || 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL');
    authUrl.searchParams.append('client_id', process.env.ZOHO_CLIENT_ID!);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('redirect_uri', process.env.ZOHO_REDIRECT_URI!);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('prompt', 'consent');

    console.log('🔐 OAuth authorization initiated with state:', state);
    console.log('🔗 Authorization URL:', authUrl.toString());

    // Redirect to Zoho authorization page
    return NextResponse.redirect(authUrl.toString());

  } catch (error) {
    console.error('OAuth authorization error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate OAuth authorization' },
      { status: 500 }
    );
  }
}

// Handle POST request to get authorization URL without redirect
export async function POST(request: NextRequest) {
  try {
    // Use fixed state parameter from environment for consistency
    const state = process.env.ZOHO_OAUTH_STATE || 'infinity_automated_solutions_2024';
    
    const authUrl = new URL(`${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/auth`);
    
    authUrl.searchParams.append('scope', process.env.ZOHO_SCOPE || 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL');
    authUrl.searchParams.append('client_id', process.env.ZOHO_CLIENT_ID!);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('redirect_uri', process.env.ZOHO_REDIRECT_URI!);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('prompt', 'consent');

    console.log('🔐 OAuth URL generated with state:', state);

    return NextResponse.json({
      authUrl: authUrl.toString(),
      state: state
    });

  } catch (error) {
    console.error('OAuth authorization error:', error);
    return NextResponse.json(
      { error: 'Failed to generate OAuth authorization URL' },
      { status: 500 }
    );
  }
}
