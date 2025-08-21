import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Check all required environment variables
    const envStatus = {
      // Zoho CRM variables
      ZOHO_CLIENT_ID: !!process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: !!process.env.ZOHO_CLIENT_SECRET,
      ZOHO_ACCOUNTS_URL: !!process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: !!process.env.ZOHO_API_DOMAIN,
      ZOHO_REDIRECT_URI: !!process.env.ZOHO_REDIRECT_URI,
      
      // Supabase variables
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      
      // reCAPTCHA variables (optional)
      NEXT_PUBLIC_RECAPTCHA_SITE_KEY: !!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
      RECAPTCHA_SECRET_KEY: !!process.env.RECAPTCHA_SECRET_KEY,
    };

    return NextResponse.json(envStatus);
  } catch (error) {
    console.error('Error checking environment variables:', error);
    return NextResponse.json(
      { error: 'Failed to check environment variables' },
      { status: 500 }
    );
  }
}
