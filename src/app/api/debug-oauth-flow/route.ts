import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, getTokenStatus, clearStoredTokens } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting OAuth flow debug...');
    
    // Step 1: Check current token status
    const tokenStatus = await getTokenStatus();
    const storedTokens = await getStoredTokens();
    
    // Step 2: Check environment variables
    const envStatus = {
      ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    // Step 3: Generate OAuth URL for testing
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';
    const clientId = process.env.ZOHO_CLIENT_ID || 'MISSING';
    const redirectUri = process.env.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback';
    
    const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;

    return NextResponse.json({
      success: true,
      debug: {
        timestamp: new Date().toISOString(),
        environment: envStatus,
        tokenStatus,
        storedTokens: storedTokens ? {
          hasAccessToken: !!storedTokens.accessToken,
          hasRefreshToken: !!storedTokens.refreshToken,
          accessTokenExpiresAt: storedTokens.accessTokenExpiresAt,
          accessTokenPreview: storedTokens.accessToken ? `${storedTokens.accessToken.substring(0, 10)}...` : null,
        } : null,
        oauthUrl,
        recommendations: getRecommendations(tokenStatus, envStatus)
      }
    });

  } catch (error) {
    console.error('OAuth flow debug error:', error);
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
    
    if (action === 'test_token_storage') {
      // Test token storage by setting a test token
      const testToken = 'test_token_' + Date.now();
      const { setAccessToken } = await import('@/server/zohoTokenStore');
      await setAccessToken(testToken, 3600);
      
      // Verify it was stored
      const storedTokens = await getStoredTokens();
      const wasStored = storedTokens?.accessToken === testToken;
      
      // Clean up test token
      await clearStoredTokens();
      
      return NextResponse.json({ 
        success: true, 
        testResult: wasStored,
        message: wasStored ? 'Token storage test passed' : 'Token storage test failed'
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('OAuth flow debug POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getRecommendations(tokenStatus: any, envStatus: any): string[] {
  const recommendations = [];
  
  if (!tokenStatus.hasAccessToken) {
    recommendations.push('❌ No access token found - need to authenticate');
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
