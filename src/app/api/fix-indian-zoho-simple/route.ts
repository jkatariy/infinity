import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, getTokenStatus, clearStoredTokens } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Checking Indian Zoho configuration...');
    
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
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    // Check if we're using Indian server
    const isIndianServer = Boolean(envStatus.ZOHO_API_DOMAIN?.includes('.in') || 
                          envStatus.ZOHO_ACCOUNTS_URL?.includes('.in'));

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
        isIndianServer,
        recommendations: getSimpleRecommendations(tokenStatus, envStatus, isIndianServer)
      }
    });

  } catch (error) {
    console.error('Fix Indian Zoho Simple error:', error);
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
    
    if (action === 'test_simple_auth') {
      // Test with simple Indian server configuration
      const testConfig = {
        accountsUrl: 'https://accounts.zoho.in',
        apiDomain: 'https://www.zohoapis.in',
        redirectUri: process.env.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback'
      };
      
      return NextResponse.json({ 
        success: true, 
        message: 'Simple Indian server configuration ready for testing',
        testConfig
      });
    }
    
    if (action === 'check_token_storage') {
      // Test if token storage is working
      try {
        const storedTokens = await getStoredTokens();
        const tokenStatus = await getTokenStatus();
        
        return NextResponse.json({ 
          success: true, 
          message: 'Token storage check completed',
          hasTokens: !!storedTokens?.accessToken,
          tokenStatus
        });
      } catch (error) {
        return NextResponse.json({ 
          success: false, 
          error: 'Token storage check failed',
          details: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('Fix Indian Zoho Simple POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getSimpleRecommendations(tokenStatus: any, envStatus: any, isIndianServer: boolean): string[] {
  const recommendations = [];
  
  if (!tokenStatus.hasAccessToken) {
    recommendations.push('❌ No access token found - need to authenticate');
  }
  
  if (!isIndianServer) {
    recommendations.push('⚠️ Not configured for Indian server - should use .in domains');
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
  
  if (!envStatus.SUPABASE_SERVICE_ROLE_KEY) {
    recommendations.push('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing - token storage might fail');
  }
  
  if (tokenStatus.hasAccessToken && !tokenStatus.accessTokenValid) {
    recommendations.push('⚠️ Access token is expired - need to refresh or re-authenticate');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ All checks passed - authentication should work');
  }
  
  return recommendations;
}
