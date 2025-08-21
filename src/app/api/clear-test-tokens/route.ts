import { NextRequest, NextResponse } from 'next/server';
import { clearStoredTokens, getStoredTokens } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    const tokens = await getStoredTokens();
    
    return NextResponse.json({
      success: true,
      currentTokens: tokens ? {
        accessTokenPreview: tokens.accessToken ? `${tokens.accessToken.substring(0, 20)}...` : null,
        refreshTokenPreview: tokens.refreshToken ? `${tokens.refreshToken.substring(0, 20)}...` : null,
        accessTokenLength: tokens.accessToken?.length || 0,
        refreshTokenLength: tokens.refreshToken?.length || 0,
        isTestToken: tokens.accessToken?.startsWith('test_') || false
      } : null,
      message: 'Test tokens detected - need to clear and authenticate with real Zoho tokens'
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'clear_test_tokens') {
      await clearStoredTokens();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Test tokens cleared successfully. Ready for real Zoho authentication.',
        nextSteps: [
          '1. Generate OAuth URL for Indian server',
          '2. Complete authentication with your Indian Zoho account',
          '3. Real tokens will be stored and API calls will work'
        ]
      });
    }
    
    if (action === 'generate_oauth_url') {
      const clientId = process.env.ZOHO_CLIENT_ID;
      const redirectUri = process.env.ZOHO_REDIRECT_URI;
      const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
      
      if (!clientId || !redirectUri || !accountsUrl) {
        return NextResponse.json({ 
          success: false, 
          error: 'Missing required environment variables' 
        });
      }
      
      const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
      
      return NextResponse.json({ 
        success: true, 
        message: 'OAuth URL generated for real Zoho authentication',
        oauthUrl,
        instructions: [
          'Click the OAuth URL to authenticate with your Indian Zoho account',
          'Complete the authentication flow',
          'Real tokens will be stored and API calls will work'
        ]
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
