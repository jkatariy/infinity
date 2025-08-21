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
        isTestToken: tokens.accessToken?.startsWith('test_') || false,
        needsClearing: tokens.accessToken?.startsWith('test_') || tokens.accessToken?.length < 50
      } : null,
      message: 'Ready to force clear all tokens'
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
    
    if (action === 'force_clear_all_tokens') {
      console.log('🗑️ Force clearing all tokens...');
      
      // Clear tokens multiple times to ensure complete removal
      await clearStoredTokens();
      await clearStoredTokens(); // Double clear for safety
      
      // Verify tokens are cleared
      const tokensAfterClear = await getStoredTokens();
      const isCleared = !tokensAfterClear || !tokensAfterClear.accessToken;
      
      console.log('✅ Tokens cleared. Verification:', isCleared ? 'SUCCESS' : 'FAILED');
      
      return NextResponse.json({ 
        success: true, 
        message: 'All tokens force cleared successfully',
        verification: isCleared ? '✅ Tokens completely removed' : '⚠️ Tokens may still exist',
        nextSteps: [
          '1. Generate OAuth URL for real authentication',
          '2. Complete authentication with your Indian Zoho account',
          '3. Real tokens will be stored (100+ characters)',
          '4. API calls will work properly'
        ]
      });
    }
    
    if (action === 'generate_clean_oauth_url') {
      const clientId = process.env.ZOHO_CLIENT_ID;
      const redirectUri = process.env.ZOHO_REDIRECT_URI;
      const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
      const state = process.env.ZOHO_OAUTH_STATE || 'infinity_automated_solutions_2024';
      
      if (!clientId || !redirectUri || !accountsUrl) {
        return NextResponse.json({ 
          success: false, 
          error: 'Missing required environment variables' 
        });
      }
      
      const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline&state=${state}&prompt=consent`;
      
      return NextResponse.json({ 
        success: true, 
        message: 'Clean OAuth URL generated for real authentication',
        oauthUrl,
        state: state,
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
