import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔐 Starting Zoho OAuth authorization...');
    
    // Validate environment variables
    const clientId = process.env.ZOHO_CLIENT_ID;
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
    const scope = process.env.ZOHO_SCOPE || 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ';
    const state = process.env.ZOHO_OAUTH_STATE || 'infinity_automated_solutions_2024';
    
    // Use localhost for development, production URL for production
    const isDevelopment = process.env.NODE_ENV === 'development';
    const redirectUri = isDevelopment 
      ? 'http://localhost:3000/api/oauth/callback'
      : process.env.ZOHO_REDIRECT_URI;
    
    if (!clientId || !redirectUri || !accountsUrl) {
      console.error('❌ Missing required OAuth environment variables');
      return NextResponse.json({
        success: false,
        error: 'Missing OAuth configuration',
        details: {
          has_client_id: !!clientId,
          has_redirect_uri: !!redirectUri,
          has_accounts_url: !!accountsUrl,
          environment: process.env.NODE_ENV
        }
      }, { status: 500 });
    }
    
    console.log('🔧 Using redirect URI:', redirectUri);
    
    // Build the authorization URL
    const authUrl = new URL('/oauth/v2/auth', accountsUrl);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', scope);
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('access_type', 'offline');
    authUrl.searchParams.set('prompt', 'consent');
    
    console.log('🔗 Redirecting to Zoho authorization URL:', authUrl.toString());
    
    // Redirect to Zoho authorization page
    return NextResponse.redirect(authUrl.toString());
    
  } catch (error) {
    console.error('❌ Error in OAuth authorization:', error);
    return NextResponse.json({
      success: false,
      error: 'OAuth authorization failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
