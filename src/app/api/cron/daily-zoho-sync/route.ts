import { NextRequest, NextResponse } from 'next/server';
import { 
  getStoredTokens, 
  setAccessToken, 
  getTokenStatus,
  clearStoredTokens,
  getPendingLeads,
  markLeadAsSent
} from '@/server/zohoTokenStore';

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

interface ZohoLead {
  Last_Name: string;
  First_Name?: string;
  Email: string;
  Phone?: string;
  Company?: string;
  Lead_Source: string;
  Description?: string;
  Lead_Status: string;
  Rating: string;
  Product_Interest?: string;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('🔄 Refreshing Zoho access token for daily sync...');
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
      console.error('❌ Failed to refresh token:', errorText);
      return null;
    }

    const data: ZohoTokenResponse = await response.json();
    console.log('✅ Token refresh successful');
    
    // Store the new access token
    await setAccessToken(data.access_token, data.expires_in);
    
    return data.access_token;
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    return null;
  }
}

async function sendLeadToZoho(leadData: any, accessToken: string): Promise<{ success: boolean; zohoId?: string; error?: string }> {
  try {
    console.log(`📤 Sending lead to Zoho: ${leadData.name} (${leadData.email})`);
    
    // Transform lead data to Zoho format
    const nameParts = leadData.name.trim().split(/\s+/);
    const firstName = nameParts[0] || '';
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';
    
    const zohoLead: ZohoLead = {
      Last_Name: lastName,
      First_Name: firstName,
      Email: leadData.email,
      Phone: leadData.phone || undefined,
      Company: leadData.company || undefined,
      Lead_Source: leadData.source === 'quote_form' ? 'Website Quote Form' : 'Chatbot Assistant',
      Description: leadData.message,
      Lead_Status: 'New',
      Rating: 'Hot',
      Product_Interest: leadData.product_name || undefined
    };

    const apiUrl = `${process.env.ZOHO_API_DOMAIN}/crm/v6/Leads`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [zohoLead]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ Failed to create lead in Zoho CRM:`, errorText);
      return { success: false, error: `Zoho CRM API error: ${response.status} ${response.statusText}` };
    }

    const result = await response.json();
    const zohoId = result.data?.[0]?.details?.id;
    
    console.log(`✅ Lead sent to Zoho successfully: ${zohoId}`);
    return { success: true, zohoId };
    
  } catch (error) {
    console.error('❌ Error sending lead to Zoho:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify this is a legitimate cron request (optional security)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      console.log('⚠️ Unauthorized cron request');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🕐 Starting daily Zoho sync at 9 AM IST...');
    
    // Get current token status
    const tokenStatus = await getTokenStatus();
    const tokens = await getStoredTokens();
    
    console.log('📊 Current token status:', {
      hasAccessToken: tokenStatus.hasAccessToken,
      hasRefreshToken: tokenStatus.hasRefreshToken,
      accessTokenValid: tokenStatus.accessTokenValid
    });

    // If no refresh token, we can't proceed
    if (!tokens?.refreshToken) {
      console.log('❌ No refresh token available for daily sync');
      return NextResponse.json({
        success: false,
        message: 'No refresh token available',
        action: 'manual_authentication_required'
      });
    }

    // Always refresh the token for daily sync
    console.log('🔄 Refreshing access token for daily sync...');
    const newAccessToken = await refreshAccessToken(tokens.refreshToken);
    
    if (!newAccessToken) {
      console.log('❌ Failed to refresh token, clearing invalid tokens');
      await clearStoredTokens();
      return NextResponse.json({
        success: false,
        message: 'Failed to refresh token, tokens cleared',
        action: 'manual_authentication_required'
      });
    }

    // Get all pending leads
    console.log('📋 Fetching pending leads...');
    const pendingLeads = await getPendingLeads();
    
    if (pendingLeads.length === 0) {
      console.log('✅ No pending leads to sync');
      return NextResponse.json({
        success: true,
        message: 'No pending leads to sync',
        action: 'no_leads_to_sync',
        leadsProcessed: 0
      });
    }

    console.log(`📤 Processing ${pendingLeads.length} pending leads...`);
    
    let successCount = 0;
    let errorCount = 0;
    const errors: string[] = [];

    // Process each pending lead
    for (const lead of pendingLeads) {
      try {
        const result = await sendLeadToZoho(lead, newAccessToken);
        
        if (result.success) {
          // Mark lead as sent
          await markLeadAsSent(lead.id!, result.zohoId);
          successCount++;
          console.log(`✅ Lead processed successfully: ${lead.name} (${lead.email})`);
        } else {
          errorCount++;
          errors.push(`${lead.name} (${lead.email}): ${result.error}`);
          console.log(`❌ Failed to process lead: ${lead.name} (${lead.email}) - ${result.error}`);
        }
      } catch (error) {
        errorCount++;
        const errorMsg = error instanceof Error ? error.message : 'Unknown error';
        errors.push(`${lead.name} (${lead.email}): ${errorMsg}`);
        console.log(`❌ Error processing lead: ${lead.name} (${lead.email}) - ${errorMsg}`);
      }
    }

    console.log(`✅ Daily sync completed: ${successCount} successful, ${errorCount} failed`);

    return NextResponse.json({
      success: true,
      message: 'Daily Zoho sync completed',
      action: 'daily_sync_completed',
      summary: {
        totalLeads: pendingLeads.length,
        successful: successCount,
        failed: errorCount
      },
      errors: errors.length > 0 ? errors : undefined,
      syncedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ Error in daily Zoho sync:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// Handle POST requests for manual trigger
export async function POST(request: NextRequest) {
  return GET(request);
}
