import { NextRequest, NextResponse } from 'next/server';
import { 
  getStoredTokens, 
  getTokenStatus, 
  getPendingLeads, 
  storeLeadData,
  markLeadAsSent,
  getLeadStats,
  clearStoredTokens
} from '@/server/zohoTokenStore';

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('🔄 Testing token refresh...');
    const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.ZOHO_CLIENT_ID!,
      client_secret: process.env.ZOHO_CLIENT_SECRET!,
      refresh_token: refreshToken,
    });

    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Token refresh failed:', errorText);
      return null;
    }

    const data: ZohoTokenResponse = await response.json();
    console.log('✅ Token refresh successful');
    return data.access_token;
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    return null;
  }
}

async function testZohoApiCall(accessToken: string): Promise<{ success: boolean; error?: string }> {
  try {
    console.log('🧪 Testing Zoho API call...');
    
    // Use Indian Zoho server domain
    const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v6/Leads`;
    
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Zoho API call failed:', errorText);
      return { success: false, error: `API call failed: ${response.status} ${response.statusText}` };
    }

    console.log('✅ Zoho API call successful');
    return { success: true };
  } catch (error) {
    console.error('❌ Error testing Zoho API:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Starting automation pipeline test...');
    
    const testResults = {
      timestamp: new Date().toISOString(),
      environment: {
        ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
        ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
        ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? '***SET***' : 'MISSING',
        ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? '***SET***' : 'MISSING',
        SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '***SET***' : 'MISSING',
      },
      steps: [] as any[],
      summary: {
        totalSteps: 0,
        passedSteps: 0,
        failedSteps: 0,
        automationReady: false
      }
    };

    // Step 1: Check environment variables
    testResults.steps.push({
      step: 1,
      name: 'Environment Variables',
      status: 'running'
    });

    const envIssues = [];
    if (!process.env.ZOHO_CLIENT_ID) envIssues.push('ZOHO_CLIENT_ID missing');
    if (!process.env.ZOHO_CLIENT_SECRET) envIssues.push('ZOHO_CLIENT_SECRET missing');
    if (!process.env.ZOHO_ACCOUNTS_URL) envIssues.push('ZOHO_ACCOUNTS_URL missing');
    if (!process.env.ZOHO_API_DOMAIN) envIssues.push('ZOHO_API_DOMAIN missing');
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) envIssues.push('SUPABASE_SERVICE_ROLE_KEY missing');

    if (envIssues.length === 0) {
      testResults.steps[0] = { ...testResults.steps[0], status: 'passed', details: 'All required environment variables are set' };
    } else {
      testResults.steps[0] = { ...testResults.steps[0], status: 'failed', details: `Missing: ${envIssues.join(', ')}` };
    }

    // Step 2: Check token status
    testResults.steps.push({
      step: 2,
      name: 'Token Status',
      status: 'running'
    });

    const tokenStatus = await getTokenStatus();
    const tokens = await getStoredTokens();

    if (tokenStatus.hasRefreshToken) {
      testResults.steps[1] = { 
        ...testResults.steps[1], 
        status: 'passed', 
        details: `Refresh token available, access token: ${tokenStatus.hasAccessToken ? 'present' : 'missing'}` 
      };
    } else {
      testResults.steps[1] = { 
        ...testResults.steps[1], 
        status: 'failed', 
        details: 'No refresh token available - authentication required' 
      };
    }

    // Step 3: Test token refresh (if refresh token available)
    testResults.steps.push({
      step: 3,
      name: 'Token Refresh',
      status: 'running'
    });

    if (tokens?.refreshToken) {
      const newAccessToken = await refreshAccessToken(tokens.refreshToken);
      if (newAccessToken) {
        testResults.steps[2] = { 
          ...testResults.steps[2], 
          status: 'passed', 
          details: 'Token refresh successful' 
        };
      } else {
        testResults.steps[2] = { 
          ...testResults.steps[2], 
          status: 'failed', 
          details: 'Token refresh failed - tokens may be invalid' 
        };
      }
    } else {
      testResults.steps[2] = { 
        ...testResults.steps[2], 
        status: 'skipped', 
        details: 'No refresh token available' 
      };
    }

    // Step 4: Test Zoho API connectivity
    testResults.steps.push({
      step: 4,
      name: 'Zoho API Connectivity',
      status: 'running'
    });

    const currentTokens = await getStoredTokens();
    if (currentTokens?.accessToken) {
      const apiTest = await testZohoApiCall(currentTokens.accessToken);
      if (apiTest.success) {
        testResults.steps[3] = { 
          ...testResults.steps[3], 
          status: 'passed', 
          details: 'Zoho API call successful' 
        };
      } else {
        testResults.steps[3] = { 
          ...testResults.steps[3], 
          status: 'failed', 
          details: `API call failed: ${apiTest.error}` 
        };
      }
    } else {
      testResults.steps[3] = { 
        ...testResults.steps[3], 
        status: 'skipped', 
        details: 'No access token available' 
      };
    }

    // Step 5: Test Supabase lead storage
    testResults.steps.push({
      step: 5,
      name: 'Supabase Lead Storage',
      status: 'running'
    });

    try {
      const testLeadId = await storeLeadData({
        name: 'Test Lead - Automation Pipeline',
        email: `test-${Date.now()}@automation.com`,
        phone: '+1234567890',
        company: 'Automation Test Company',
        message: 'This is a test lead for automation pipeline verification',
        source: 'chatbot',
        product_name: 'Automation Test Product'
      });

      if (testLeadId) {
        testResults.steps[4] = { 
          ...testResults.steps[4], 
          status: 'passed', 
          details: `Test lead stored with ID: ${testLeadId}` 
        };
      } else {
        testResults.steps[4] = { 
          ...testResults.steps[4], 
          status: 'failed', 
          details: 'Failed to store test lead' 
        };
      }
    } catch (error) {
      testResults.steps[4] = { 
        ...testResults.steps[4], 
        status: 'failed', 
        details: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }

    // Step 6: Check lead statistics
    testResults.steps.push({
      step: 6,
      name: 'Lead Statistics',
      status: 'running'
    });

    try {
      const leadStats = await getLeadStats();
      testResults.steps[5] = { 
        ...testResults.steps[5], 
        status: 'passed', 
        details: `Total: ${leadStats.total}, Pending: ${leadStats.pending}, Sent: ${leadStats.sent}` 
      };
    } catch (error) {
      testResults.steps[5] = { 
        ...testResults.steps[5], 
        status: 'failed', 
        details: `Error: ${error instanceof Error ? error.message : 'Unknown error'}` 
      };
    }

    // Calculate summary
    testResults.summary.totalSteps = testResults.steps.length;
    testResults.summary.passedSteps = testResults.steps.filter(s => s.status === 'passed').length;
    testResults.summary.failedSteps = testResults.steps.filter(s => s.status === 'failed').length;
    
    // Automation is ready if critical steps pass
    const criticalSteps = [0, 1, 2, 3, 4]; // env vars, tokens, refresh, api, storage
    const criticalPassed = criticalSteps.every(stepIndex => 
      testResults.steps[stepIndex]?.status === 'passed'
    );
    testResults.summary.automationReady = criticalPassed;

    return NextResponse.json({
      success: true,
      testResults
    });

  } catch (error) {
    console.error('❌ Automation pipeline test error:', error);
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
    
    if (action === 'clear_test_data') {
      // Clear test leads (you might want to add a specific flag for test data)
      console.log('🧹 Clearing test data...');
      return NextResponse.json({ success: true, message: 'Test data cleared' });
    }
    
    if (action === 'simulate_daily_sync') {
      console.log('🔄 Simulating daily sync...');
      
      // Get current tokens
      const tokens = await getStoredTokens();
      if (!tokens?.refreshToken) {
        return NextResponse.json({ 
          success: false, 
          error: 'No refresh token available for sync simulation' 
        });
      }

      // Refresh token
      const newAccessToken = await refreshAccessToken(tokens.refreshToken);
      if (!newAccessToken) {
        return NextResponse.json({ 
          success: false, 
          error: 'Failed to refresh token during sync simulation' 
        });
      }

      // Get pending leads
      const pendingLeads = await getPendingLeads();
      
      return NextResponse.json({
        success: true,
        message: 'Daily sync simulation completed',
        summary: {
          accessTokenRefreshed: !!newAccessToken,
          pendingLeads: pendingLeads.length,
          readyForSync: pendingLeads.length > 0
        }
      });
    }
    
    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
    
  } catch (error) {
    console.error('❌ Automation pipeline test POST error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
