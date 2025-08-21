import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, getTokenStatus, clearStoredTokens } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking working Zoho configuration...');
    
    // Check current token status
    const tokenStatus = await getTokenStatus();
    const storedTokens = await getStoredTokens();
    
    // Check environment variables
    const envStatus = {
      ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
    };

    // Determine which server to use based on environment
    const isIndianServer = Boolean(envStatus.ZOHO_API_DOMAIN?.includes('.in') || 
                          envStatus.ZOHO_ACCOUNTS_URL?.includes('.in'));
    
    const recommendedConfig = {
      accountsUrl: isIndianServer ? 'https://accounts.zoho.in' : 'https://accounts.zoho.com',
      apiDomain: isIndianServer ? 'https://www.zohoapis.in' : 'https://www.zohoapis.com',
      redirectUri: envStatus.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback'
    };

    return NextResponse.json({
      success: true,
      debug: {
        timestamp: new Date().toISOString(),
        currentEnvironment: envStatus,
        tokenStatus,
        storedTokens: storedTokens ? {
          hasAccessToken: !!storedTokens.accessToken,
          hasRefreshToken: !!storedTokens.refreshToken,
          accessTokenExpiresAt: storedTokens.accessTokenExpiresAt,
          accessTokenPreview: storedTokens.accessToken ? `${storedTokens.accessToken.substring(0, 10)}...` : null,
        } : null,
        serverType: isIndianServer ? 'Indian (.in)' : 'Global (.com)',
        recommendedConfig,
        recommendations: getRestoreRecommendations(tokenStatus, envStatus, isIndianServer)
      }
    });

  } catch (error) {
    console.error('Restore working Zoho error:', error);
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
      await clearStoredTokens();
      return NextResponse.json({ success: true, message: 'Tokens cleared successfully' });
    }
    
    if (action === 'test_global_server') {
      // Test with global server configuration
      const testConfig = {
        accountsUrl: 'https://accounts.zoho.com',
        apiDomain: 'https://www.zohoapis.com',
        redirectUri: process.env.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback'
      };
      
      return NextResponse.json({ 
        success: true, 
        message: 'Global server configuration ready for testing',
        testConfig
      });
    }
    
    if (action === 'test_indian_server') {
      // Test with Indian server configuration
      const testConfig = {
        accountsUrl: 'https://accounts.zoho.in',
        apiDomain: 'https://www.zohoapis.in',
        redirectUri: process.env.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback'
      };
      
      return NextResponse.json({ 
        success: true, 
        message: 'Indian server configuration ready for testing',
        testConfig
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('Restore working Zoho POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getRestoreRecommendations(tokenStatus: any, envStatus: any, isIndianServer: boolean): string[] {
  const recommendations = [];
  
  if (!tokenStatus.hasAccessToken) {
    recommendations.push('❌ No access token found - need to authenticate');
  }
  
  if (isIndianServer) {
    recommendations.push('🇮🇳 Currently configured for Indian Zoho server (.in)');
    recommendations.push('💡 If you have existing tokens from global server, they may not work');
  } else {
    recommendations.push('🌍 Currently configured for global Zoho server (.com)');
  }
  
  if (!envStatus.ZOHO_CLIENT_ID) {
    recommendations.push('❌ ZOHO_CLIENT_ID is missing');
  }
  
  if (!envStatus.ZOHO_CLIENT_SECRET) {
    recommendations.push('❌ ZOHO_CLIENT_SECRET is missing');
  }
  
  if (!envStatus.ZOHO_ACCOUNTS_URL) {
    recommendations.push('❌ ZOHO_ACCOUNTS_URL is missing');
  }
  
  if (!envStatus.ZOHO_API_DOMAIN) {
    recommendations.push('❌ ZOHO_API_DOMAIN is missing');
  }
  
  if (tokenStatus.hasAccessToken && !tokenStatus.accessTokenValid) {
    recommendations.push('⚠️ Access token is expired - need to refresh or re-authenticate');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ All checks passed - authentication should work');
  }
  
  return recommendations;
}
