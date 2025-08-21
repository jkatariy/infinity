import { NextRequest, NextResponse } from 'next/server';
import { 
  getStoredTokens, 
  getTokenStatus, 
  isAccessTokenValid,
  setAccessToken,
  setRefreshToken 
} from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting Zoho authentication debug...');
    
    // Check environment variables
    const envStatus = {
      ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL: !!process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: !!process.env.ZOHO_API_DOMAIN,
      ZOHO_REDIRECT_URI: !!process.env.ZOHO_REDIRECT_URI,
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    };

    // Get current token status
    const tokenStatus = await getTokenStatus();
    const storedTokens = await getStoredTokens();
    const accessTokenValid = await isAccessTokenValid();

    console.log('📊 Token Status:', tokenStatus);
    console.log('🔑 Stored Tokens:', storedTokens ? 'Present' : 'Missing');
    console.log('✅ Access Token Valid:', accessTokenValid);

    // Test token storage
    let storageTest = 'Not tested';
    try {
      const testAccessToken = 'test_access_token_' + Date.now();
      const testRefreshToken = 'test_refresh_token_' + Date.now();
      
      await setAccessToken(testAccessToken, 3600);
      await setRefreshToken(testRefreshToken);
      
      const testTokens = await getStoredTokens();
      storageTest = testTokens?.accessToken === testAccessToken ? '✅ Working' : '❌ Failed';
      
      console.log('🧪 Storage Test:', storageTest);
    } catch (error) {
      storageTest = `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      console.error('🧪 Storage Test Error:', error);
    }

    return NextResponse.json({
      success: true,
      debug: {
        environment: envStatus,
        tokenStatus,
        storedTokens: storedTokens ? {
          hasAccessToken: !!storedTokens.accessToken,
          hasRefreshToken: !!storedTokens.refreshToken,
          accessTokenExpiresAt: storedTokens.accessTokenExpiresAt,
        } : null,
        accessTokenValid,
        storageTest,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('❌ Debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
