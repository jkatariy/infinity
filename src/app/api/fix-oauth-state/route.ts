import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔧 Debugging OAuth state parameter...');
    
    const currentState = process.env.ZOHO_OAUTH_STATE;
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
    const clientId = process.env.ZOHO_CLIENT_ID;
    const redirectUri = process.env.ZOHO_REDIRECT_URI;
    
    // Generate OAuth URL with proper state parameter
    let oauthUrl = 'Not available';
    if (clientId && redirectUri && accountsUrl && currentState) {
      oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline&state=${encodeURIComponent(currentState)}`;
    }

    return NextResponse.json({
      success: true,
      debug: {
        currentState,
        stateLength: currentState?.length || 0,
        accountsUrl,
        clientId: clientId ? '***SET***' : 'MISSING',
        redirectUri,
        oauthUrl,
        recommendations: getStateFixRecommendations(currentState, accountsUrl, clientId, redirectUri)
      }
    });

  } catch (error) {
    console.error('❌ OAuth state fix error:', error);
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
    
    if (action === 'generate_oauth_url') {
      const currentState = process.env.ZOHO_OAUTH_STATE;
      const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
      const clientId = process.env.ZOHO_CLIENT_ID;
      const redirectUri = process.env.ZOHO_REDIRECT_URI;
      
      if (!currentState || !accountsUrl || !clientId || !redirectUri) {
        return NextResponse.json({ 
          success: false, 
          error: 'Missing required environment variables for OAuth URL generation'
        });
      }
      
      const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline&state=${encodeURIComponent(currentState)}`;
      
      return NextResponse.json({ 
        success: true, 
        message: 'OAuth URL generated with proper state parameter',
        oauthUrl,
        state: currentState,
        instructions: [
          '1. This OAuth URL includes the correct state parameter',
          '2. Click the URL to start authentication',
          '3. Complete authentication with your Indian Zoho account',
          '4. The callback will validate the state parameter correctly'
        ]
      });
    }
    
    if (action === 'test_state_validation') {
      const currentState = process.env.ZOHO_OAUTH_STATE;
      const testState = 'infinity_automated_solutions_2024';
      
      const isValid = currentState === testState;
      
      return NextResponse.json({ 
        success: true, 
        message: 'State parameter validation test completed',
        currentState,
        testState,
        isValid,
        recommendation: isValid ? 'State parameter is correct' : 'State parameter mismatch detected'
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('❌ OAuth state fix POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function getStateFixRecommendations(currentState: string | undefined, accountsUrl: string | undefined, clientId: string | undefined, redirectUri: string | undefined): string[] {
  const recommendations = [];
  
  if (!currentState) {
    recommendations.push('❌ ZOHO_OAUTH_STATE environment variable is missing');
  } else {
    recommendations.push('✅ ZOHO_OAUTH_STATE is set correctly');
  }
  
  if (!accountsUrl) {
    recommendations.push('❌ ZOHO_ACCOUNTS_URL environment variable is missing');
  } else {
    recommendations.push('✅ ZOHO_ACCOUNTS_URL is set correctly');
  }
  
  if (!clientId) {
    recommendations.push('❌ ZOHO_CLIENT_ID environment variable is missing');
  } else {
    recommendations.push('✅ ZOHO_CLIENT_ID is set correctly');
  }
  
  if (!redirectUri) {
    recommendations.push('❌ ZOHO_REDIRECT_URI environment variable is missing');
  } else {
    recommendations.push('✅ ZOHO_REDIRECT_URI is set correctly');
  }
  
  if (currentState && accountsUrl && clientId && redirectUri) {
    recommendations.push('🔧 All environment variables are set - OAuth should work correctly');
    recommendations.push('🇮🇳 Make sure to authenticate with the Indian Zoho server');
  } else {
    recommendations.push('⚠️ Some environment variables are missing - check your configuration');
  }
  
  return recommendations;
}
