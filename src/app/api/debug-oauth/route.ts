import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Generate the same OAuth URL that would be used for authorization
    const state = process.env.ZOHO_OAUTH_STATE || 'infinity_automated_solutions_2024';
    
    const accountsUrl = process.env.ZOHO_ACCOUNTS_URL;
    if (!accountsUrl) {
      return NextResponse.json({
        success: false,
        error: 'ZOHO_ACCOUNTS_URL environment variable is not set',
        environment_check: {
          ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? 'SET' : 'MISSING',
          ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? 'SET' : 'MISSING',
          ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'MISSING',
          ZOHO_ACCOUNTS_URL: 'MISSING',
          ZOHO_SCOPE: process.env.ZOHO_SCOPE || 'MISSING',
          ZOHO_OAUTH_STATE: process.env.ZOHO_OAUTH_STATE || 'MISSING'
        }
      });
    }
    
    const authUrl = new URL(`${accountsUrl}/oauth/v2/auth`);
    
    authUrl.searchParams.append('scope', process.env.ZOHO_SCOPE || 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ');
    authUrl.searchParams.append('client_id', process.env.ZOHO_CLIENT_ID!);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('redirect_uri', process.env.ZOHO_REDIRECT_URI!);
    authUrl.searchParams.append('state', state);
    authUrl.searchParams.append('prompt', 'consent');

    return NextResponse.json({
      success: true,
      oauth_url: authUrl.toString(),
      environment_check: {
        ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? 'SET' : 'MISSING',
        ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? 'SET' : 'MISSING',
        ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'MISSING',
        ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL || 'MISSING',
        ZOHO_SCOPE: process.env.ZOHO_SCOPE || 'MISSING',
        ZOHO_OAUTH_STATE: process.env.ZOHO_OAUTH_STATE || 'MISSING'
      },
      url_parts: {
        base_url: process.env.ZOHO_ACCOUNTS_URL,
        client_id: process.env.ZOHO_CLIENT_ID,
        redirect_uri: process.env.ZOHO_REDIRECT_URI,
        scope: process.env.ZOHO_SCOPE,
        state: state
      }
    });

  } catch (error) {
    console.error('OAuth debug error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment_check: {
        ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? 'SET' : 'MISSING',
        ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? 'SET' : 'MISSING',
        ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'MISSING',
        ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL || 'MISSING',
      }
    });
  }
}
