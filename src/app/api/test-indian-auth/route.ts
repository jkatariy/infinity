import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get actual environment variable values
    const envValues = {
      ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? '***SET***' : 'MISSING',
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
    };

    // Generate OAuth URL for Indian server
    const accountsUrl = envValues.ZOHO_ACCOUNTS_URL || 'https://accounts.zoho.in';
    const clientId = envValues.ZOHO_CLIENT_ID || 'MISSING';
    const redirectUri = envValues.ZOHO_REDIRECT_URI || 'https://infinitysols.com/api/oauth/callback';
    
    const oauthUrl = `${accountsUrl}/oauth/v2/auth?response_type=code&client_id=${clientId}&scope=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL&redirect_uri=${encodeURIComponent(redirectUri)}&access_type=offline`;

    return NextResponse.json({
      success: true,
      environment: envValues,
      oauthUrl: oauthUrl,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Indian auth test error:', error);
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
