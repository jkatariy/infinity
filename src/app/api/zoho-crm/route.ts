import { NextRequest, NextResponse } from 'next/server';

const ZOHO_CLIENT_ID = '1000.Z977GSH51D9ZBNYE23JCCGRQO2UQGP';
const ZOHO_CLIENT_SECRET = '777603b98aca45c9a8995f7d9ee2003cc1bfadd5b2';
const ZOHO_REFRESH_TOKEN = process.env.ZOHO_REFRESH_TOKEN || ''; // Fallback to empty string to prevent build errors

interface LeadData {
  company: string;
  email: string;
  phone: string;
  requirements: string;
  firstName?: string;
  lastName?: string;
  leadSource?: string;
  productInterest?: string;
}

async function getZohoAccessToken(): Promise<string> {
  try {
    if (!ZOHO_REFRESH_TOKEN) {
      throw new Error('ZOHO_REFRESH_TOKEN environment variable is not set');
    }

    const response = await fetch('https://accounts.zoho.com/oauth/v2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        refresh_token: ZOHO_REFRESH_TOKEN,
        client_id: ZOHO_CLIENT_ID,
        client_secret: ZOHO_CLIENT_SECRET,
        grant_type: 'refresh_token',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Zoho access token:', error);
    throw error;
  }
}

async function submitLeadToZoho(leadData: LeadData, accessToken: string): Promise<any> {
  try {
    // Split name if provided as full name
    const nameParts = leadData.firstName?.split(' ') || ['', ''];
    const firstName = nameParts[0] || 'Unknown';
    const lastName = nameParts.slice(1).join(' ') || 'Lead';

    const zohoLeadData = {
      data: [
        {
          Company: leadData.company,
          First_Name: firstName,
          Last_Name: lastName,
          Email: leadData.email,
          Phone: leadData.phone,
          Lead_Source: leadData.leadSource || 'Website',
          Description: leadData.requirements,
          Product_Interest: leadData.productInterest || 'General Inquiry',
          Lead_Status: 'Not Contacted',
        },
      ],
    };

    const response = await fetch('https://www.zohoapis.com/crm/v2/Leads', {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(zohoLeadData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to submit lead: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error submitting lead to Zoho:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { company, email, phone, requirements, firstName, lastName, leadSource, productInterest } = body;

    // Validate required fields
    if (!company || !email || !phone || !requirements) {
      return NextResponse.json(
        { error: 'Missing required fields: company, email, phone, and requirements are required' },
        { status: 400 }
      );
    }

    // For development/testing, if no refresh token is set, just return success
    if (!ZOHO_REFRESH_TOKEN) {
      console.log('Zoho CRM submission (test mode):', body);
      return NextResponse.json({
        success: true,
        message: 'Lead submitted successfully (test mode)',
        leadId: `TEST-${Date.now()}`,
      });
    }

    // Get access token
    const accessToken = await getZohoAccessToken();

    // Submit lead to Zoho
    const result = await submitLeadToZoho(
      {
        company,
        email,
        phone,
        requirements,
        firstName,
        lastName,
        leadSource,
        productInterest,
      },
      accessToken
    );

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully to Zoho CRM',
      data: result,
    });
  } catch (error: any) {
    console.error('Error in Zoho CRM API:', error);
    return NextResponse.json(
      { error: 'Failed to submit lead. Please try again later.' },
      { status: 500 }
    );
  }
} 