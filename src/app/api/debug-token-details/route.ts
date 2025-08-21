import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, getTokenStatus } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Detailed token diagnostics for Indian server...');
    
    const tokenStatus = await getTokenStatus();
    const tokens = await getStoredTokens();
    
    // Check environment configuration
    const envConfig = {
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
      ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? '***SET***' : 'MISSING',
      ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? '***SET***' : 'MISSING',
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
      isIndianServer: process.env.ZOHO_ACCOUNTS_URL?.includes('.in') && process.env.ZOHO_API_DOMAIN?.includes('.in')
    };

    // Test API call with detailed logging
    let apiTestResult = null;
    if (tokens?.accessToken) {
      try {
        const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/org`;
        console.log('Testing API call to:', apiUrl);
        console.log('Using access token:', tokens.accessToken.substring(0, 20) + '...');
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
            'Content-Type': 'application/json',
          },
        });
        
        const responseText = await response.text();
        let responseData = null;
        try {
          responseData = JSON.parse(responseText);
        } catch (e) {
          responseData = responseText;
        }
        
        apiTestResult = {
          url: apiUrl,
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          response: responseData,
          success: response.ok
        };
      } catch (error) {
        apiTestResult = {
          error: error instanceof Error ? error.message : 'Unknown error',
          success: false
        };
      }
    }

    // Check token details
    const tokenDetails = tokens ? {
      hasAccessToken: !!tokens.accessToken,
      hasRefreshToken: !!tokens.refreshToken,
      accessTokenLength: tokens.accessToken?.length || 0,
      refreshTokenLength: tokens.refreshToken?.length || 0,
      accessTokenPreview: tokens.accessToken ? `${tokens.accessToken.substring(0, 20)}...` : null,
      refreshTokenPreview: tokens.refreshToken ? `${tokens.refreshToken.substring(0, 20)}...` : null,
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      expiresIn: tokens.accessTokenExpiresAt ? Math.max(0, tokens.accessTokenExpiresAt - Math.floor(Date.now() / 1000)) : null,
      isExpired: tokens.accessTokenExpiresAt ? tokens.accessTokenExpiresAt <= Math.floor(Date.now() / 1000) : false
    } : null;

    return NextResponse.json({
      success: true,
      debug: {
        timestamp: new Date().toISOString(),
        environment: envConfig,
        tokenStatus,
        tokenDetails,
        apiTestResult,
        analysis: analyzeTokenIssue(tokenStatus, tokenDetails, apiTestResult, envConfig)
      }
    });

  } catch (error) {
    console.error('❌ Token details debug error:', error);
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
    
    if (action === 'test_different_endpoint') {
      const tokens = await getStoredTokens();
      if (!tokens?.accessToken) {
        return NextResponse.json({ 
          success: false, 
          error: 'No access token available' 
        });
      }

      // Test with a different endpoint
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/users`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();
      let responseData = null;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      return NextResponse.json({
        success: true,
        message: 'Different endpoint test completed',
        endpoint: '/crm/v6/users',
        status: response.status,
        statusText: response.statusText,
        response: responseData,
        success: response.ok
      });
    }
    
    if (action === 'test_with_different_headers') {
      const tokens = await getStoredTokens();
      if (!tokens?.accessToken) {
        return NextResponse.json({ 
          success: false, 
          error: 'No access token available' 
        });
      }

      // Test with different headers
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/org`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${tokens.accessToken}`, // Try Bearer instead of Zoho-oauthtoken
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
      });

      const responseText = await response.text();
      let responseData = null;
      try {
        responseData = JSON.parse(responseText);
      } catch (e) {
        responseData = responseText;
      }

      return NextResponse.json({
        success: true,
        message: 'Different headers test completed',
        endpoint: '/crm/v6/org',
        headers: 'Bearer token instead of Zoho-oauthtoken',
        status: response.status,
        statusText: response.statusText,
        response: responseData,
        success: response.ok
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Token details debug POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

function analyzeTokenIssue(tokenStatus: any, tokenDetails: any, apiTestResult: any, envConfig: any): any {
  const analysis = {
    issues: [] as string[],
    recommendations: [] as string[],
    possibleCauses: [] as string[]
  };

  // Check if environment is properly configured for Indian server
  if (!envConfig.isIndianServer) {
    analysis.issues.push('Environment not configured for Indian server');
    analysis.recommendations.push('Ensure ZOHO_ACCOUNTS_URL and ZOHO_API_DOMAIN point to .in domains');
  }

  // Check if tokens exist
  if (!tokenDetails?.hasAccessToken) {
    analysis.issues.push('No access token available');
    analysis.recommendations.push('Re-authenticate with Indian Zoho server');
  }

  // Check if token is expired
  if (tokenDetails?.isExpired) {
    analysis.issues.push('Access token is expired');
    analysis.recommendations.push('Refresh the access token or re-authenticate');
  }

  // Check API test results
  if (apiTestResult) {
    if (apiTestResult.success) {
      analysis.recommendations.push('API call successful - tokens are working correctly');
    } else {
      if (apiTestResult.status === 401) {
        analysis.issues.push('401 Unauthorized - Token authentication failed');
        analysis.possibleCauses.push('Token is invalid for this API endpoint');
        analysis.possibleCauses.push('Token was issued for different server (global vs Indian)');
        analysis.possibleCauses.push('Token has insufficient permissions');
        analysis.recommendations.push('Check if token was obtained from correct server');
        analysis.recommendations.push('Verify OAuth scope includes required permissions');
      } else if (apiTestResult.status === 400) {
        analysis.issues.push('400 Bad Request - API call format issue');
        analysis.possibleCauses.push('Incorrect API endpoint format');
        analysis.possibleCauses.push('Missing required parameters');
        analysis.recommendations.push('Check API endpoint URL format');
      } else {
        analysis.issues.push(`API call failed with status ${apiTestResult.status}`);
        analysis.recommendations.push('Check API response for specific error details');
      }
    }
  }

  return analysis;
}
