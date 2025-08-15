import { NextRequest, NextResponse } from 'next/server';

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
  Account_Name?: string;
  Title?: string;
  Department?: string;
  Lead_Source?: string;
  Description?: string;
  Mailing_Street?: string;
  Mailing_City?: string;
  Mailing_State?: string;
  Mailing_Zip?: string;
  Mailing_Country?: string;
}

interface ZohoTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

async function refreshAccessToken(refreshToken: string): Promise<string | null> {
  try {
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
      console.error('Failed to refresh token:', await response.text());
      return null;
    }

    const data: ZohoTokenResponse = await response.json();
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
  
  const payload = {
    data: [data],
    trigger: ['approval', 'workflow', 'blueprint'],
  };

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Zoho-oauthtoken ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Zoho API error: ${response.status} ${await response.text()}`);
  }

  return await response.json();
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.email || !body.lastName) {
      return NextResponse.json(
        { error: 'Email and Last Name are required' },
        { status: 400 }
      );
    }

    // Get access token from cookies
    let accessToken = request.cookies.get('zoho_access_token')?.value;
    const refreshToken = request.cookies.get('zoho_refresh_token')?.value;

    // If no access token, try to refresh
    if (!accessToken && refreshToken) {
      accessToken = await refreshAccessToken(refreshToken);
      if (!accessToken) {
        return NextResponse.json(
          { error: 'Authentication required. Please reconnect to Zoho CRM.' },
          { status: 401 }
        );
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        { error: 'No access token available. Please authenticate with Zoho CRM.' },
        { status: 401 }
      );
    }

    // Determine if this should be a Lead or Contact based on the data
    const recordType = body.recordType || 'Leads'; // Default to Leads

    let recordData: ZohoLead | ZohoContact;

    if (recordType === 'Leads') {
      recordData = {
        Last_Name: body.lastName,
        First_Name: body.firstName || '',
        Email: body.email,
        Phone: body.phone || '',
        Company: body.company || '',
        Lead_Source: body.leadSource || 'Website',
        Description: body.message || body.description || '',
        Industry: body.industry || '',
        Annual_Revenue: body.annualRevenue || '',
        No_of_Employees: body.numberOfEmployees || '',
        Website: body.website || '',
        Street: body.street || '',
        City: body.city || '',
        State: body.state || '',
        Zip_Code: body.zipCode || '',
        Country: body.country || 'India',
        Lead_Status: body.leadStatus || 'Not Contacted',
        Rating: body.rating || 'Cold',
        // Custom fields for packaging automation
        Product_Interest: body.productInterest || '',
        Machine_Type: body.machineType || '',
        Inquiry_Type: body.inquiryType || 'General Inquiry',
        Budget_Range: body.budgetRange || '',
        Timeline: body.timeline || '',
        Additional_Requirements: body.additionalRequirements || '',
      };
    } else {
      recordData = {
        Last_Name: body.lastName,
        First_Name: body.firstName || '',
        Email: body.email,
        Phone: body.phone || '',
        Account_Name: body.company || '',
        Title: body.title || '',
        Department: body.department || '',
        Lead_Source: body.leadSource || 'Website',
        Description: body.message || body.description || '',
        Mailing_Street: body.street || '',
        Mailing_City: body.city || '',
        Mailing_State: body.state || '',
        Mailing_Zip: body.zipCode || '',
        Mailing_Country: body.country || 'India',
      };
    }

    // Send to Zoho CRM
    const result = await sendToZohoCRM(recordType, recordData, accessToken);

    // Check if the record was created successfully
    if (result.data && result.data[0] && result.data[0].status === 'success') {
      const response = NextResponse.json({
        success: true,
        message: `${recordType.slice(0, -1)} created successfully in Zoho CRM`,
        zohoId: result.data[0].details.id,
        data: result.data[0],
      });

      // Update access token cookie if we refreshed it
      if (refreshToken && accessToken !== request.cookies.get('zoho_access_token')?.value) {
        response.cookies.set('zoho_access_token', accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600, // 1 hour
          path: '/',
        });
      }

      return response;
    } else {
      // Handle Zoho API errors
      const errorMessage = result.data?.[0]?.message || 'Unknown error occurred';
      console.error('Zoho CRM error:', result);
      
      return NextResponse.json(
        { 
          error: 'Failed to create record in Zoho CRM',
          details: errorMessage,
          zohoResponse: result 
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error sending to Zoho CRM:', error);
    
    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.includes('Zoho API error')) {
      return NextResponse.json(
        { error: 'Zoho CRM API error', details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error while sending to Zoho CRM' },
      { status: 500 }
    );
  }
}

// Handle GET request to check authentication status
export async function GET(request: NextRequest) {
  try {
    const accessToken = request.cookies.get('zoho_access_token')?.value;
    const refreshToken = request.cookies.get('zoho_refresh_token')?.value;

    if (!accessToken && !refreshToken) {
      return NextResponse.json({
        authenticated: false,
        message: 'No authentication tokens found'
      });
    }

    // Test the access token by making a simple API call
    if (accessToken) {
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
          message: 'Access token is valid'
        });
      }
    }

    // Try to refresh the token
    if (refreshToken) {
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        const response = NextResponse.json({
          authenticated: true,
          message: 'Token refreshed successfully'
        });

        response.cookies.set('zoho_access_token', newAccessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          maxAge: 3600, // 1 hour
          path: '/',
        });

        return response;
      }
    }

    return NextResponse.json({
      authenticated: false,
      message: 'Authentication tokens are invalid or expired'
    });

  } catch (error) {
    console.error('Error checking authentication:', error);
    return NextResponse.json({
      authenticated: false,
      message: 'Error checking authentication status'
    });
  }
}
