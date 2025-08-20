import { NextResponse } from 'next/server';

export async function GET() {
  // Return environment variables for debugging (without sensitive data)
  return NextResponse.json({
    ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? `${process.env.ZOHO_CLIENT_ID.substring(0, 20)}...` : 'NOT SET',
    ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? 'SET (hidden)' : 'NOT SET',
    ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'NOT SET',
    ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL || 'NOT SET',
    ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN || 'NOT SET',
    ZOHO_SCOPE: process.env.ZOHO_SCOPE || 'NOT SET',
    ZOHO_OAUTH_STATE: process.env.ZOHO_OAUTH_STATE || 'NOT SET',
    NODE_ENV: process.env.NODE_ENV || 'NOT SET',
    hostname: process.env.VERCEL_URL || 'localhost',
    isProduction: process.env.NODE_ENV === 'production',
  });
}
