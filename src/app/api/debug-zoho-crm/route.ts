import { NextRequest, NextResponse } from 'next/server';
import { getStoredTokens, isAccessTokenValid } from '@/server/zohoTokenStore';

export async function POST(request: NextRequest) {
  try {
    console.log('🔍 Starting detailed Zoho CRM debug...');
    
    const body = await request.json();
    const { name, email, phone, message, productName, leadSource } = body;

    // Step 1: Check authentication
    console.log('🔐 Step 1: Checking authentication...');
    const tokens = await getStoredTokens();
    const accessTokenValid = await isAccessTokenValid();
    
    if (!tokens?.accessToken) {
      return NextResponse.json({
        success: false,
        error: 'No access token found',
        step: 'authentication',
        debug: {
          hasAccessToken: !!tokens?.accessToken,
          hasRefreshToken: !!tokens?.refreshToken,
          accessTokenValid,
          tokens: tokens ? 'Present' : 'Missing'
        }
      });
    }

    if (!accessTokenValid) {
      return NextResponse.json({
        success: false,
        error: 'Access token is invalid or expired',
        step: 'authentication',
        debug: {
          hasAccessToken: !!tokens?.accessToken,
          hasRefreshToken: !!tokens?.refreshToken,
          accessTokenValid,
          accessToken: tokens?.accessToken?.substring(0, 20) + '...'
        }
      });
    }

    console.log('✅ Authentication is valid');

    // Step 2: Check environment variables
    console.log('🔧 Step 2: Checking environment variables...');
    const envStatus = {
      ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL: !!process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: !!process.env.ZOHO_API_DOMAIN,
      ZOHO_REDIRECT_URI: !!process.env.ZOHO_REDIRECT_URI,
    };

    const missingEnvVars = Object.entries(envStatus)
      .filter(([_, value]) => !value)
      .map(([key, _]) => key);

    if (missingEnvVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing environment variables: ${missingEnvVars.join(', ')}`,
        step: 'environment',
        debug: { envStatus }
      });
    }

    console.log('✅ Environment variables are set');

    // Step 3: Prepare lead data
    console.log('📝 Step 3: Preparing lead data...');
    const nameParts = name.trim().split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || name;

    const zohoLead = {
      Last_Name: lastName,
      First_Name: firstName,
      Email: email.trim().toLowerCase(),
      Phone: phone?.trim() || '',
      Company: '',
      Lead_Source: leadSource || 'Website Form',
      Description: message.trim(),
      Lead_Status: 'New',
      Rating: 'Hot',
      Product_Interest: productName || '',
      Inquiry_Type: 'Quote Request',
    };

    console.log('📊 Lead data prepared:', {
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      leadSource: leadSource || 'Website Form',
      productName: productName || ''
    });

    // Step 4: Make API call to Zoho CRM
    console.log('🌐 Step 4: Making API call to Zoho CRM...');
    const apiUrl = `${process.env.ZOHO_API_DOMAIN}/crm/v6/Leads`;
    
    console.log('🔗 API URL:', apiUrl);
    console.log('🔑 Using access token:', tokens.accessToken.substring(0, 20) + '...');

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Zoho-oauthtoken ${tokens.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: [zohoLead]
      }),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response headers:', Object.fromEntries(response.headers.entries()));

    const responseText = await response.text();
    console.log('📡 Response body:', responseText);

    if (!response.ok) {
      return NextResponse.json({
        success: false,
        error: `Zoho CRM API error: ${response.status} ${response.statusText}`,
        step: 'api_call',
        debug: {
          apiUrl,
          requestData: { data: [zohoLead] },
          responseStatus: response.status,
          responseStatusText: response.statusText,
          responseBody: responseText,
          accessTokenPrefix: tokens.accessToken.substring(0, 20) + '...'
        }
      });
    }

    let result;
    try {
      result = JSON.parse(responseText);
    } catch (parseError) {
      return NextResponse.json({
        success: false,
        error: 'Failed to parse Zoho CRM response',
        step: 'response_parsing',
        debug: {
          responseText,
          parseError: parseError instanceof Error ? parseError.message : 'Unknown error'
        }
      });
    }

    console.log('✅ API call successful');
    console.log('📊 API response:', result);

    const zohoId = result.data?.[0]?.details?.id;
    
    return NextResponse.json({
      success: true,
      message: 'Lead created successfully in Zoho CRM',
      zohoId,
      debug: {
        apiUrl,
        requestData: { data: [zohoLead] },
        responseData: result,
        accessTokenPrefix: tokens.accessToken.substring(0, 20) + '...'
      }
    });

  } catch (error) {
    console.error('❌ Zoho CRM debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      step: 'exception',
      debug: {
        errorType: error instanceof Error ? error.constructor.name : 'Unknown',
        errorMessage: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      }
    }, { status: 500 });
  }
}
