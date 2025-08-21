import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens } from '@/server/zohoTokenStore';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Debugging Zoho API 400 error...');
    
    const tokens = await getStoredTokens();
    if (!tokens?.accessToken) {
      return NextResponse.json({
        success: false,
        error: 'No access token available'
      });
    }

    // Test different API endpoints and methods
    const apiTests = [];
    
    // Test 1: GET /crm/v6/Leads (what we're currently using)
    try {
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/Leads`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      apiTests.push({
        test: 'GET /crm/v6/Leads',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        error: response.ok ? null : await response.text()
      });
    } catch (error) {
      apiTests.push({
        test: 'GET /crm/v6/Leads',
        status: 'ERROR',
        statusText: 'Network Error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 2: GET /crm/v6/Leads with query parameters
    try {
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/Leads?page=1&per_page=1`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      apiTests.push({
        test: 'GET /crm/v6/Leads with pagination',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        error: response.ok ? null : await response.text()
      });
    } catch (error) {
      apiTests.push({
        test: 'GET /crm/v6/Leads with pagination',
        status: 'ERROR',
        statusText: 'Network Error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 3: GET /crm/v6/settings/modules (simpler endpoint)
    try {
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/settings/modules`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      apiTests.push({
        test: 'GET /crm/v6/settings/modules',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        error: response.ok ? null : await response.text()
      });
    } catch (error) {
      apiTests.push({
        test: 'GET /crm/v6/settings/modules',
        status: 'ERROR',
        statusText: 'Network Error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Test 4: GET /crm/v6/org (organization info)
    try {
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/org`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      apiTests.push({
        test: 'GET /crm/v6/org',
        status: response.status,
        statusText: response.statusText,
        success: response.ok,
        error: response.ok ? null : await response.text()
      });
    } catch (error) {
      apiTests.push({
        test: 'GET /crm/v6/org',
        status: 'ERROR',
        statusText: 'Network Error',
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }

    // Analyze results
    const successfulTests = apiTests.filter(test => test.success);
    const failedTests = apiTests.filter(test => !test.success);
    
    let diagnosis = '';
    let recommendations = [];
    
    if (successfulTests.length > 0) {
      diagnosis = '✅ Some API endpoints work - the issue is specific to the Leads endpoint';
      recommendations.push('🔧 The Leads endpoint might require specific permissions or parameters');
      recommendations.push('🔧 Try using a different endpoint for testing connectivity');
    } else if (failedTests.every(test => test.status === 400)) {
      diagnosis = '❌ All endpoints return 400 - likely a permissions or scope issue';
      recommendations.push('🔧 Check if your OAuth scope includes the required permissions');
      recommendations.push('🔧 Verify that your Zoho CRM account has the necessary modules enabled');
      recommendations.push('🔧 Try re-authenticating with broader scope permissions');
    } else if (failedTests.every(test => test.status === 401)) {
      diagnosis = '❌ All endpoints return 401 - token authentication issue';
      recommendations.push('🔧 Token might be invalid or expired');
      recommendations.push('🔧 Try refreshing the token or re-authenticating');
    } else {
      diagnosis = '⚠️ Mixed results - some endpoints work, others fail';
      recommendations.push('🔧 Check specific error messages for each failing endpoint');
      recommendations.push('🔧 Verify API permissions for each module');
    }

    return NextResponse.json({
      success: true,
      debug: {
        timestamp: new Date().toISOString(),
        accessTokenPreview: tokens.accessToken ? `${tokens.accessToken.substring(0, 10)}...` : null,
        apiDomain: process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in',
        apiTests,
        analysis: {
          totalTests: apiTests.length,
          successfulTests: successfulTests.length,
          failedTests: failedTests.length,
          diagnosis,
          recommendations
        }
      }
    });

  } catch (error) {
    console.error('❌ Zoho API 400 debug error:', error);
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
    
    if (action === 'test_alternative_endpoint') {
      const tokens = await getStoredTokens();
      if (!tokens?.accessToken) {
        return NextResponse.json({ 
          success: false, 
          error: 'No access token available' 
        });
      }

      // Test with a simpler endpoint
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/org`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          success: true,
          message: 'Alternative endpoint test successful',
          endpoint: '/crm/v6/org',
          status: response.status,
          data: data
        });
      } else {
        const errorText = await response.text();
        return NextResponse.json({
          success: false,
          message: 'Alternative endpoint test failed',
          endpoint: '/crm/v6/org',
          status: response.status,
          error: errorText
        });
      }
    }
    
    if (action === 'test_oauth_scope') {
      const tokens = await getStoredTokens();
      if (!tokens?.accessToken) {
        return NextResponse.json({ 
          success: false, 
          error: 'No access token available' 
        });
      }

      // Test if we can access user info (basic scope)
      const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/users`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      return NextResponse.json({
        success: true,
        message: 'OAuth scope test completed',
        endpoint: '/crm/v6/users',
        status: response.status,
        hasAccess: response.ok,
        error: response.ok ? null : await response.text()
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Zoho API 400 debug POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
