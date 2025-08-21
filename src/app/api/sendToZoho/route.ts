import { NextRequest, NextResponse } from 'next/server';
import {
  getAccessToken as getStoredAccessToken,
  getRefreshToken as getStoredRefreshToken,
  isAccessTokenValid,
  setAccessToken as setStoredAccessToken,
  getTokenStatus,
} from '@/server/zohoTokenStore';

interface ZohoLead {
  Last_Name: string;
  First_Name?: string;
  Email: string;
  Phone?: string;
  Company?: string;
  Lead_Source: string;
  Description?: string;
  Industry?: string;
  Annual_Revenue?: string;
  No_of_Employees?: string;
  Website?: string;
  Street?: string;
  City?: string;
  State?: string;
  Zip_Code?: string;
  Country?: string;
  Lead_Status?: string;
  Rating?: string;
  // Custom fields
  Product_Interest?: string;
  Machine_Type?: string;
  Inquiry_Type?: string;
  Budget_Range?: string;
  Timeline?: string;
  Additional_Requirements?: string;
}

interface ZohoContact {
  Last_Name: string;
  First_Name?: string;
  Email: string;
  Phone?: string;
  Company?: string;
  Lead_Source?: string;
  Description?: string;
  Industry?: string;
  Annual_Revenue?: string;
  No_of_Employees?: string;
  Website?: string;
  Street?: string;
  City?: string;
  State?: string;
  Zip_Code?: string;
  Country?: string;
  Lead_Status?: string;
  Rating?: string;
  // Custom fields
  Product_Interest?: string;
  Machine_Type?: string;
  Inquiry_Type?: string;
  Budget_Range?: string;
  Timeline?: string;
  Additional_Requirements?: string;
}

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
    await setStoredAccessToken(data.access_token, data.expires_in);
    
    return data.access_token;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

async function sendToZohoCRM(
  module: 'Leads' | 'Contacts',
  data: ZohoLead | ZohoContact,
  accessToken: string
): Promise<any> {
  const apiUrl = `${process.env.ZOHO_API_DOMAIN}/crm/v6/${module}`;
  
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: [data]
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`Failed to create ${module} in Zoho CRM:`, errorText);
    throw new Error(`Zoho CRM API error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields for simplified form
    const { name, email, phone, message, productName, leadSource } = body;
    
    if (!name || !email || !message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, and message are required'
      }, { status: 400 });
    }

    // Get access token
    let accessToken = await getStoredAccessToken();
    const refreshToken = await getStoredRefreshToken();

    console.log('Current token status:', await getTokenStatus());

    // If no access token or likely expired, try to refresh
    if ((!accessToken || !(await isAccessTokenValid())) && refreshToken) {
      console.log('Access token missing or expired, attempting refresh...');
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (!newAccessToken) {
        console.error('Failed to refresh access token');
        return NextResponse.json(
          { error: 'Authentication required. Please reconnect to Zoho CRM.' },
          { status: 401 }
        );
      }
      accessToken = newAccessToken;
    }

    if (!accessToken) {
      console.error('No access token available');
      return NextResponse.json(
        { error: 'No access token available. Please authenticate with Zoho CRM.' },
        { status: 401 }
      );
    }

    // Split name into first and last name
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || name; // If no last name, use full name

    // Prepare lead data for Zoho CRM
    const recordData: ZohoLead = {
      Last_Name: lastName,
      First_Name: firstName,
      Email: email.trim().toLowerCase(),
      Phone: phone?.trim() || '',
      Company: '', // Not collected in simplified form
      Lead_Source: leadSource || 'Website Form',
      Description: message.trim(),
      Lead_Status: 'New',
      Rating: 'Hot',
      Product_Interest: productName || '',
      Inquiry_Type: 'Quote Request',
      Additional_Requirements: message.trim(),
    };

    // Send to Zoho CRM
    console.log('Creating Lead in Zoho CRM...');
    const result = await sendToZohoCRM('Leads', recordData, accessToken);
    
    console.log('Lead created successfully:', result);

    return NextResponse.json({
      success: true,
      message: 'Lead created successfully',
      data: result
    });

  } catch (error) {
    console.error('Error in sendToZoho:', error);
    return NextResponse.json(
      { error: 'Failed to create record in Zoho CRM' },
      { status: 500 }
    );
  }
}

// Handle GET request to check authentication status
export async function GET(request: NextRequest) {
  try {
    const tokenStatus = await getTokenStatus();
    const accessToken = await getStoredAccessToken();
    const refreshToken = await getStoredRefreshToken();

    if (!accessToken && !refreshToken) {
      return NextResponse.json({
        authenticated: false,
        message: 'No authentication tokens found',
        tokenStatus
      });
    }

    // Test the access token by making a simple API call
    if (accessToken && tokenStatus.accessTokenValid) {
      const testUrl = `${process.env.ZOHO_API_DOMAIN}/crm/v6/org`;
      const response = await fetch(testUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
        },
      });

      if (response.ok) {
        return NextResponse.json({
          authenticated: true,
          message: 'Access token is valid',
          tokenStatus
        });
      }
    }

    // Try to refresh the token
    if (refreshToken) {
      console.log('Testing token refresh...');
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        const updatedTokenStatus = await getTokenStatus();
        return NextResponse.json({
          authenticated: true,
          message: 'Token refreshed successfully',
          tokenStatus: updatedTokenStatus
        });
      }
    }

    return NextResponse.json({
      authenticated: false,
      message: 'Authentication tokens are invalid or expired',
      tokenStatus
    });

  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({
      authenticated: false,
      message: 'Error checking authentication status',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
