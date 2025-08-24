import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const envVars = {
      // Supabase
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'MISSING',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'MISSING',
      
      // Zoho
      ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID ? 'SET' : 'MISSING',
      ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? 'SET' : 'MISSING',
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL || 'MISSING',
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN || 'MISSING',
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI || 'MISSING',
      ZOHO_SCOPE: process.env.ZOHO_SCOPE || 'MISSING',
      ZOHO_OAUTH_STATE: process.env.ZOHO_OAUTH_STATE || 'MISSING',
      
      // Other
      CRON_SECRET: process.env.CRON_SECRET ? 'SET' : 'MISSING',
      CRON_SECRET_KEY: process.env.CRON_SECRET_KEY ? 'SET' : 'MISSING',
      NODE_ENV: process.env.NODE_ENV || 'MISSING',
    };

    const missingVars = Object.entries(envVars)
      .filter(([key, value]) => value === 'MISSING')
      .map(([key]) => key);

    const criticalVars = [
      'NEXT_PUBLIC_SUPABASE_URL',
      'NEXT_PUBLIC_SUPABASE_ANON_KEY',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];

    const missingCritical = criticalVars.filter(key => envVars[key as keyof typeof envVars] === 'MISSING');

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      environment: envVars,
      summary: {
        total_vars: Object.keys(envVars).length,
        set_vars: Object.values(envVars).filter(v => v !== 'MISSING').length,
        missing_vars: missingVars.length,
        missing_critical: missingCritical.length,
        status: missingCritical.length > 0 ? 'CRITICAL' : missingVars.length > 0 ? 'WARNING' : 'HEALTHY'
      },
      missing_vars,
      missing_critical,
      recommendations: missingCritical.length > 0 ? [
        'Add missing critical environment variables to Vercel',
        'Redeploy after adding environment variables'
      ] : missingVars.length > 0 ? [
        'Consider adding missing optional environment variables'
      ] : [
        'All environment variables are properly configured'
      ]
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
