import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Comparing environment variables...');
    
    // Get current environment variables (Vercel)
    const vercelEnv = {
      ZOHO_OAUTH_STATE: process.env.ZOHO_OAUTH_STATE,
      ZOHO_SCOPE: process.env.ZOHO_SCOPE,
      ZOHO_ACCOUNTS_URL: process.env.ZOHO_ACCOUNTS_URL,
      ZOHO_API_DOMAIN: process.env.ZOHO_API_DOMAIN,
      ZOHO_CLIENT_ID: process.env.ZOHO_CLIENT_ID,
      ZOHO_CLIENT_SECRET: process.env.ZOHO_CLIENT_SECRET ? '***SET***' : 'MISSING',
      ZOHO_REDIRECT_URI: process.env.ZOHO_REDIRECT_URI,
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '***SET***' : 'MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '***SET***' : 'MISSING',
    };

    // Expected values based on your Vercel config
    const expectedEnv = {
      ZOHO_OAUTH_STATE: 'infinity_automated_solutions_2024',
      ZOHO_SCOPE: 'ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ',
      ZOHO_ACCOUNTS_URL: 'https://accounts.zoho.in',
      ZOHO_API_DOMAIN: 'https://www.zohoapis.in',
      ZOHO_CLIENT_ID: '1000.9OEZV2LKCCD0XHG7JYWP1SBT9OATCA',
      ZOHO_CLIENT_SECRET: '8f31d1c9dbcaf51ac866e3ed11182a727113dc6522',
      ZOHO_REDIRECT_URI: 'https://infinitysols.com/api/oauth/callback',
      NEXT_PUBLIC_SUPABASE_URL: 'https://zxvhgpejwgrlxksnqtxk.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU',
      SUPABASE_SERVICE_ROLE_KEY: 'MISSING_FROM_VERCEL',
    };

    // Compare and find differences
    const differences = [];
    const matches = [];

    for (const [key, expectedValue] of Object.entries(expectedEnv)) {
      const actualValue = vercelEnv[key as keyof typeof vercelEnv];
      
      if (actualValue === expectedValue) {
        matches.push({ key, status: '✅ Match', value: actualValue });
      } else {
        differences.push({ 
          key, 
          status: '❌ Mismatch', 
          expected: expectedValue, 
          actual: actualValue 
        });
      }
    }

    return NextResponse.json({
      success: true,
      debug: {
        timestamp: new Date().toISOString(),
        environment: 'Vercel Production',
        matches,
        differences,
        summary: {
          total: Object.keys(expectedEnv).length,
          matches: matches.length,
          differences: differences.length
        },
        recommendations: getEnvRecommendations(differences)
      }
    });

  } catch (error) {
    console.error('Compare env error:', error);
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

function getEnvRecommendations(differences: any[]): string[] {
  const recommendations = [];
  
  if (differences.length === 0) {
    recommendations.push('✅ All environment variables match expected values');
    return recommendations;
  }

  recommendations.push(`❌ Found ${differences.length} environment variable differences`);
  
  for (const diff of differences) {
    if (diff.key === 'ZOHO_CLIENT_ID' && !diff.actual) {
      recommendations.push('❌ ZOHO_CLIENT_ID is missing - this will cause OAuth to fail');
    }
    
    if (diff.key === 'ZOHO_CLIENT_SECRET' && !diff.actual) {
      recommendations.push('❌ ZOHO_CLIENT_SECRET is missing - this will cause OAuth to fail');
    }
    
    if (diff.key === 'SUPABASE_SERVICE_ROLE_KEY' && !diff.actual) {
      recommendations.push('⚠️ SUPABASE_SERVICE_ROLE_KEY is missing - token storage may fail');
    }
    
    if (diff.key.includes('ZOHO_') && diff.expected !== diff.actual) {
      recommendations.push(`⚠️ ${diff.key} mismatch: expected "${diff.expected}" but got "${diff.actual}"`);
    }
  }
  
  recommendations.push('💡 Update your Vercel environment variables to match the expected values');
  
  return recommendations;
}
