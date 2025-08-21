import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, clearStoredTokens, getTokenStatus } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Starting Indian Zoho token fix...');
    
    // Get current token status
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
        accessTokenExpiresAt: tokenStatus.accessTokenExpiresAt,
        lastUpdated: tokenStatus.lastUpdated
      },
      tokens: tokens ? {
        hasAccessToken: !!tokens.accessToken,
        hasRefreshToken: !!tokens.refreshToken,
        accessTokenPreview: tokens.accessToken ? `${tokens.accessToken.substring(0, 10)}...` : null,
        refreshTokenPreview: tokens.refreshToken ? `${tokens.refreshToken.substring(0, 10)}...` : null,
      } : null,
      oauthUrl,
      recommendations: getTokenFixRecommendations(tokenStatus, tokens)
    });

  } catch (error) {
    console.error('❌ Indian token fix error:', error);
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
    
    if (action === 'clear_tokens') {
      console.log('🗑️ Clearing invalid tokens...');
      await clearStoredTokens();
      
      return NextResponse.json({ 
        success: true, 
        message: 'Invalid tokens cleared successfully. You can now re-authenticate with the Indian Zoho server.',
        nextStep: 'Re-authenticate using the OAuth URL'
      });
    }
    
    if (action === 'generate_oauth_url') {
      const clientId = process.env.ZOHO_CLIENT_ID;
      const redirectUri = process.env.ZOHO_REDIRECT_URI;
      const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
      
      if (!clientId || !redirectUri || !accountsUrl) {
        return NextResponse.json({ 
          success: false, 
          error: 'Missing required environment variables for OAuth URL generation'
        });
      }
      
      const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
      
      return NextResponse.json({ 
        success: true, 
        message: 'OAuth URL generated for Indian Zoho server',
        oauthUrl,
        instructions: [
          '1. Click the OAuth URL to open Zoho authentication',
          '2. Complete authentication with your Indian Zoho account',
          '3. You will be redirected back with authorization code',
          '4. The system will automatically exchange code for tokens',
          '5. New tokens will be stored for Indian server'
        ]
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Indian token fix POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getTokenFixRecommendations(tokenStatus: any, tokens: any): string[] {
  const recommendations = [];
  
  if (tokenStatus.hasAccessToken && !tokenStatus.accessTokenValid) {
    recommendations.push('❌ Access token is invalid/expired');
  }
  
  if (tokenStatus.hasRefreshToken && tokens?.refreshToken) {
    recommendations.push('⚠️ Refresh token exists but may be invalid for Indian server');
  }
  
  if (!tokenStatus.hasRefreshToken) {
    recommendations.push('❌ No refresh token available');
  }
  
  recommendations.push('🔧 Solution: Clear invalid tokens and re-authenticate with Indian Zoho server');
  recommendations.push('🇮🇳 Make sure to authenticate with accounts.zoho.in (Indian server)');
  recommendations.push('🔄 After re-authentication, test the automation pipeline again');
  
  return recommendations;
}
