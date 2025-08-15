import { NextResponse } from 'next/server';

export async function GET() {
  // Return the exact environment variables being used
  return NextResponse.json({
    raw_env_check: {
      ZOHO_CLIENT_ID_RAW: process.env.ZOHO_CLIENT_ID || 'NOT_SET',
      ZOHO_CLIENT_ID_LENGTH: process.env.ZOHO_CLIENT_ID?.length || 0,
      ZOHO_CLIENT_SECRET_SET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_CLIENT_SECRET_LENGTH: process.env.ZOHO_CLIENT_SECRET?.length || 0,
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'NOT_SET',
      VERCEL_ENV: process.env.VERCEL_ENV || 'NOT_SET',
      NODE_ENV: process.env.NODE_ENV || 'NOT_SET',
      ALL_ZOHO_VARS: {
        CLIENT_ID: process.env.ZOHO_CLIENT_ID || 'MISSING',
        CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? 'SET' : 'MISSING',
        REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'MISSING',
        ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL || 'MISSING',
        API_DOMAIN: process.env.ZOHO_API_DOMAIN || 'MISSING',
        SCOPE: process.env.ZOHO_SCOPE || 'MISSING',
        STATE: process.env.ZOHO_OAUTH_STATE || 'MISSING'
      }
    },
    expected_values: {
      CLIENT_ID: '1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD',
      CLIENT_ID_LENGTH: 38,
      REDIRECT_URI_EXPECTED: 'https://infinitysols.vercel.app/api/oauth/callback'
    },
    deployment_info: {
      timestamp: new Date().toISOString(),
      vercel_url: process.env.VERCEL_URL || 'NOT_SET',
      vercel_env: process.env.VERCEL_ENV || 'NOT_SET'
    }
  });
}
