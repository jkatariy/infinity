import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, clearStoredTokens, getTokenStatus } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Final token fix for Indian Zoho server...');
    
    const tokenStatus = await getTokenStatus();
    const tokens = await getStoredTokens();
    
    // Generate OAuth URL for Indian server
    const clientId = process.env.ZOHO_CLIENT_ID;
    const redirectUri = process.env.ZOHO_REDIRECT_URI;
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
    
    let oauthUrl = 'Not available';
    if (clientId && redirectUri && accountsUrl) {
      oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
    }

    return NextResponse.json({
      success: true,
      currentStatus: {
        hasAccessToken: tokenStatus.hasAccessToken,
        hasRefreshToken: tokenStatus.hasRefreshToken,
        accessTokenValid: tokenStatus.accessTokenValid,
        lastUpdated: tokenStatus.lastUpdated
      },
      tokens: tokens ? {
        hasAccessToken: !!tokens.accessToken,
        hasRefreshToken: !!tokens.refreshToken,
        accessTokenPreview: tokens.accessToken ? `${tokens.accessToken.substring(0, 10)}...` : null,
        refreshTokenPreview: tokens.refreshToken ? `${tokens.refreshToken.substring(0, 10)}...` : null,
      } : null,
      oauthUrl,
      diagnosis: 'All API endpoints return 401 "invalid oauth token" - tokens are invalid for Indian server',
      solution: 'Clear invalid tokens and re-authenticate with Indian Zoho server',
      steps: [
        '1. Clear the invalid tokens (they are from global server)',
        '2. Generate OAuth URL for Indian server (accounts.zoho.in)',
        '3. Complete authentication with Indian Zoho account',
        '4. Verify new tokens work with Indian API (zohoapis.in)',
        '5. Test automation pipeline'
      ]
    });

  } catch (error) {
    console.error('❌ Final token fix error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    if (action === 'clear_invalid_tokens') {
      console.log('🗑️ Clearing invalid tokens for Indian server...');
      await clearStoredTokens();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Invalid tokens cleared successfully. Ready for Indian server authentication.',
        nextStep: 'Generate OAuth URL for Indian server'
      });
    }
    
    if (action === 'generate_indian_oauth_url') {
      const clientId = process.env.ZOHO_CLIENT_ID;
      const redirectUri = process.env.ZOHO_REDIRECT_URI;
      const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
      
      if (!clientId || !redirectUri || !accountsUrl) {
        return NextResponse.json({ 
          success: false, 
          error: 'Missing required environment variables for Indian OAuth URL generation'
        });
      }
      
      const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
      
      return NextResponse.json({ 
        success: true, 
        message: 'OAuth URL generated for Indian Zoho server',
        oauthUrl,
        server: 'Indian (accounts.zoho.in)',
        instructions: [
          '1. Click the OAuth URL to open Indian Zoho authentication',
          '2. Sign in with your Indian Zoho account',
          '3. Grant permissions for Zoho CRM access',
          '4. You will be redirected back with authorization code',
          '5. System will exchange code for Indian server tokens'
        ]
      });
    }
    
    if (action === 'verify_environment') {
      const envCheck = {
        ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
        ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
        ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
        ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
        ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
        SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY
      };
      
      const isIndianServer = envCheck.ZOHO_ACCOUNTS_URL?.includes('.in') && envCheck.ZOHO_API_DOMAIN?.includes('.in');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Environment verification completed',
        environment: envCheck,
        isIndianServer,
        recommendation: isIndianServer ? 'Environment configured for Indian server' : 'Environment may not be configured for Indian server'
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Final token fix POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
