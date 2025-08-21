import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, getTokenStatus, setAccessToken, setRefreshToken } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting OAuth callback debug...');
    
    // Check current state
    const tokenStatus = await getTokenStatus();
    const storedTokens = await getStoredTokens();
    
    // Check environment variables for callback
    const envStatus = {
      ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    // Test token storage directly
    let storageTest = 'Not tested';
    try {
      const testToken = 'test_callback_token_' + Date.now();
      await setAccessToken(testToken, 3600);
      const retrievedTokens = await getStoredTokens();
      const wasStored = retrievedTokens?.accessToken === testToken;
      storageTest = wasStored ? '✅ Passed' : '❌ Failed';
      
      // Clean up test token
      await setAccessToken('', 0);
    } catch (error) {
      storageTest = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }

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
        callbackUrl: `${process.env.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback'}`,
        tokenExchangeUrl: `${process.env.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in'}/oauth/v2/token`,
        recommendations: getCallbackRecommendations(tokenStatus, envStatus, storageTest)
      }
    });

  } catch (error) {
    console.error('OAuth callback debug error:', error);
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
    const { action, code, state } = await request.json();
    
    if (action === 'simulate_callback') {
      console.log('🧪 Simulating OAuth callback...');
      
      if (!code) {
        return NextResponse.json({ success: false, error: 'Authorization code required' });
      }

      // Simulate the token exchange
      const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
      const tokenParams = new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        redirect_uri: process.env.ZOHO_REDIRECT_URI!,
        code: code,
      });

      console.log('🔄 Exchanging authorization code for tokens...');
      const tokenResponse = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: tokenParams.toString(),
      });

      if (!tokenResponse.ok) {
        const errorText = await tokenResponse.text();
        console.error('❌ Token exchange failed:', errorText);
        return NextResponse.json({ 
          success: false, 
          error: 'Token exchange failed',
          details: errorText,
          status: tokenResponse.status
        });
      }

      const tokenData = await tokenResponse.json();
      console.log('✅ Token exchange successful, storing tokens...');

      // Store tokens
      try {
        await setAccessToken(tokenData.access_token, tokenData.expires_in);
        if (tokenData.refresh_token) {
          await setRefreshToken(tokenData.refresh_token);
        }
        console.log('✅ Tokens stored successfully');
        
        // Verify storage
        const storedTokens = await getStoredTokens();
        const wasStored = storedTokens?.accessToken === tokenData.access_token;
        
        return NextResponse.json({ 
          success: true, 
          message: 'Tokens exchanged and stored successfully',
          wasStored,
          tokenPreview: tokenData.access_token ? `${tokenData.access_token.substring(0, 10)}...` : null
        });
        
      } catch (storageError) {
        console.error('❌ Error storing tokens:', storageError);
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to store tokens',
          details: storageError instanceof Error ? storageError.message : 'Unknown error'
        });
      }
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('OAuth callback debug POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getCallbackRecommendations(tokenStatus: any, envStatus: any, storageTest: string): string[] {
  const recommendations = [];
  
  if (!tokenStatus.hasAccessToken) {
    recommendations.push('❌ No access token found - OAuth callback may have failed');
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
  
  if (!envStatus.ZOHO_REDIRECT_URI) {
    recommendations.push('❌ ZOHO_REDIRECT_URI is missing');
  }
  
  if (!envStatus.SUPABASE_SERVICE_ROLE_KEY) {
    recommendations.push('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing - token storage might fail');
  }
  
  if (storageTest.includes('❌')) {
    recommendations.push('❌ Token storage test failed - database connectivity issue');
  }
  
  if (recommendations.length === 0) {
    recommendations.push('✅ All checks passed - try simulating OAuth callback');
  }
  
  return recommendations;
}
