import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  getAccessToken as getStoredAccessToken,
  getRefreshToken as getStoredRefreshToken,
  isAccessTokenValid,
  setAccessToken as setStoredAccessToken,
  markLeadAsSent,
  getPendingLeads,
  getTokenStatus,
} from '@/server/zohoTokenStore';

// Initialize Supabase client
const supabaseUrl = 'https://zxvhgpejwgrlxksnqtxk.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
    console.log('Refreshing access token...');
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
      console.error('Failed to refresh token:', errorText);
      return null;
    }

    const data: ZohoTokenResponse = await response.json();
    console.log('Token refresh successful');
    
    // Store the new access token
    await setStoredAccessToken(data.access_token);
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

async function sendToZohoCRM(recordType: string, recordData: any, accessToken: string) {
      // Use Indian Zoho server domain
    const apiUrl = `${process.env.ZOHO_API_DOMAIN || 'https://www.zohoapis.in'}/crm/v3/${recordType}`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [recordData]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Zoho API error: ${response.status} - ${errorText}`);
  }

  return await response.json();
}

export async function POST(request: NextRequest) {
  try {
    // Check if this is a scheduled job (you can add authentication here)
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET_KEY}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🕘 9:00 AM IST - Starting daily lead processing...');

    // Get access token (should be fresh from 8:59 AM refresh)
    let accessToken = await getStoredAccessToken();
    const refreshToken = await getStoredRefreshToken();

    console.log('Current token status:', await getTokenStatus());

    // If no access token or likely expired, try to refresh
    if ((!accessToken || !(await isAccessTokenValid())) && refreshToken) {
      console.log('🔄 Access token missing or expired, attempting refresh...');
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (!newAccessToken) {
        console.error('❌ Failed to refresh access token');
        return NextResponse.json(
          { error: 'Authentication required. Please reconnect to Zoho CRM.' },
          { status: 401 }
        );
      }
      accessToken = newAccessToken;
    }

    if (!accessToken) {
      console.error('❌ No access token available');
      return NextResponse.json(
        { error: 'No access token available. Please authenticate with Zoho CRM.' },
        { status: 401 }
      );
    }

    console.log('✅ Access token ready for lead processing');

    // Fetch pending leads using the helper function
    const pendingLeads = await getPendingLeads();

    if (!pendingLeads || pendingLeads.length === 0) {
      console.log('ℹ️ No pending leads to process');
      return NextResponse.json({
        success: true,
        message: 'No pending leads to process',
        processed: 0
      });
    }

    console.log(`📊 Processing ${pendingLeads.length} pending leads...`);

    let processedCount = 0;
    let errorCount = 0;

    for (const lead of pendingLeads) {
      try {
        console.log(`🔄 Processing lead ${lead.id}: ${lead.name} (${lead.email})`);
        
        // Split name into first and last name
        const nameParts = lead.name.trim().split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || lead.name;

        // Prepare lead data for Zoho CRM
        const recordData = {
          Last_Name: lastName,
          First_Name: firstName,
          Email: lead.email.trim().toLowerCase(),
          Phone: lead.phone?.trim() || '',
          Company: lead.company?.trim() || '',
          Lead_Source: lead.source || 'Website Form',
          Description: lead.message.trim(),
          Lead_Status: 'New',
          Rating: 'Hot',
          Product_Interest: lead.product_name || '',
          Inquiry_Type: 'Quote Request',
          Additional_Requirements: lead.message.trim(),
        };

        // Send to Zoho CRM
        const result = await sendToZohoCRM('Leads', recordData, accessToken);
        
        // Update lead status in Supabase
        await markLeadAsSent(lead.id!, result.data?.[0]?.details?.id);
        
        processedCount++;
        console.log(`✅ Lead ${lead.id} processed successfully`);
      } catch (error) {
        console.error(`❌ Error processing lead ${lead.id}:`, error);
        errorCount++;
        
        // Update lead status to failed - we'll need to create a function for this
        try {
          await supabase
            .from('zoho_leads')
            .update({ sent_to_zoho: false, zoho_lead_id: null })
            .eq('id', lead.id);
        } catch (updateError) {
          console.error('Failed to update lead status to failed:', updateError);
        }
      }
    }

    console.log(`🎉 Daily lead processing completed: ${processedCount} successful, ${errorCount} failed`);

    return NextResponse.json({
      success: true,
      message: `Processed ${processedCount} leads successfully, ${errorCount} failed`,
      processed: processedCount,
      failed: errorCount,
      timestamp: new Date().toISOString(),
      istTime: new Date(new Date().getTime() + (5.5 * 60 * 60 * 1000)).toISOString()
    });

  } catch (error) {
    console.error('❌ Error processing stored leads:', error);
    return NextResponse.json(
      { error: 'Failed to process stored leads' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
