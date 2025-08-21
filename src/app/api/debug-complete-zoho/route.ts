import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, getTokenStatus, clearStoredTokens, setAccessToken } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting complete Zoho CRM debug...');
    
    // Step 1: Check all environment variables
    const envStatus = {
      ZOHO_OAUTH_STATE: process.env.ZOHO_OAUTH_STATE,
      ZOHO_SCOPE: process.env.ZOHO_SCOPE,
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
      ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? '***SET***' : 'MISSING',
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***SET***' : 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '***SET***' : 'MISSING',
    };

    // Step 2: Check token status
    const tokenStatus = await getTokenStatus();
    const storedTokens = await getStoredTokens();

    // Step 3: Test token storage
    let storageTest = 'Not tested';
    try {
      const testToken = 'test_complete_token_' + Date.now();
      await setAccessToken(testToken, 3600);
      const retrievedTokens = await getStoredTokens();
      const wasStored = retrievedTokens?.accessToken === testToken;
      storageTest = wasStored ? '✅ Passed' : '❌ Failed';
      
      // Clean up test token
      await clearStoredTokens();
    } catch (error) {
      storageTest = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

    // Step 4: Generate OAuth URL
    const clientId = process.env.ZOHO_CLIENT_ID;
    const redirectUri = process.env.ZOHO_REDIRECT_URI;
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
    
    let oauthUrl = 'Not available';
    if (clientId && redirectUri && accountsUrl) {
      oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;
    }

    // Step 5: Check configuration validity
    const configIssues = [];
    const configSuccess = [];

    if (!clientId) configIssues.push('ZOHO_CLIENT_ID is missing');
    else configSuccess.push('ZOHO_CLIENT_ID is set');

    if (!process.env.ZOHO_CLIENT_SECRET) configIssues.push('ZOHO_CLIENT_SECRET is missing');
    else configSuccess.push('ZOHO_CLIENT_SECRET is set');

    if (!accountsUrl) configIssues.push('ZOHO_ACCOUNTS_URL is missing');
    else configSuccess.push('ZOHO_ACCOUNTS_URL is set');

    if (!process.env.ZOHO_API_DOMAIN) configIssues.push('ZOHO_API_DOMAIN is missing');
    else configSuccess.push('ZOHO_API_DOMAIN is set');

    if (!redirectUri) configIssues.push('ZOHO_REDIRECT_URI is missing');
    else configSuccess.push('ZOHO_REDIRECT_URI is set');

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) configIssues.push('SUPABASE_SERVICE_ROLE_KEY is missing');
    else configSuccess.push('SUPABASE_SERVICE_ROLE_KEY is set');

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
        storageTest,
        oauthUrl,
        configIssues,
        configSuccess,
        recommendations: getCompleteRecommendations(configIssues, tokenStatus, storageTest)
      }
    });

  } catch (error) {
    console.error('Complete Zoho debug error:', error);
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
    
    if (action === 'test_oauth_url') {
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
        message: 'OAuth URL generated successfully',
        oauthUrl
      });
    }
    
    if (action === 'test_token_exchange') {
      // This would test the actual token exchange, but we need an authorization code
      return NextResponse.json({ 
        success: true, 
        message: 'Token exchange test requires authorization code from OAuth flow'
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('Complete Zoho debug POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getCompleteRecommendations(configIssues: string[], tokenStatus: any, storageTest: string): string[] {
  const recommendations = [];
  
  if (configIssues.length > 0) {
    recommendations.push(`❌ Found ${configIssues.length} configuration issues:`);
    configIssues.forEach(issue => recommendations.push(`   - ${issue}`));
  }
  
  if (!tokenStatus.hasAccessToken) {
    recommendations.push('❌ No access token found - need to authenticate');
  }
  
  if (storageTest.includes('❌')) {
    recommendations.push('❌ Token storage test failed - database connectivity issue');
  }
  
  if (configIssues.length === 0 && tokenStatus.hasAccessToken && !storageTest.includes('❌')) {
    recommendations.push('✅ All checks passed - Zoho CRM should work correctly');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ Configuration looks good - try OAuth authentication');
  }
  
  return recommendations;
}
