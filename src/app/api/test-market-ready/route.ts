import { NextRequest, NextResponse } from 'next/server';
import { perfectZohoIntegration } from '@/utils/perfectZohoIntegration';

export async function GET(request: NextRequest) {
  try {
    console.log('🧪 Running comprehensive market-ready system test...');
    
    const testResults = {
      timestamp: new Date().toISOString(),
      tests: {} as any,
      overall_status: 'unknown'
    };
    
    // Test 1: Environment Variables
    console.log('🔍 Test 1: Environment Variables');
    testResults.tests.environment = await testEnvironmentVariables();
    
    // Test 2: Database Connection
    console.log('🔍 Test 2: Database Connection');
    testResults.tests.database = await testDatabaseConnection();
    
    // Test 3: Token Management
    console.log('🔍 Test 3: Token Management');
    testResults.tests.token_management = await testTokenManagement();
    
    // Test 4: Lead Processing Functions
    console.log('🔍 Test 4: Lead Processing Functions');
    testResults.tests.lead_processing = await testLeadProcessing();
    
    // Test 5: Health Check System
    console.log('🔍 Test 5: Health Check System');
    testResults.tests.health_check = await testHealthCheck();
    
    // Test 6: Error Handling
    console.log('🔍 Test 6: Error Handling');
    testResults.tests.error_handling = await testErrorHandling();
    
    // Determine overall status
    const allTests = Object.values(testResults.tests);
    const passedTests = allTests.filter((test: any) => test.status === 'passed').length;
    const totalTests = allTests.length;
    
    testResults.overall_status = passedTests === totalTests ? 'passed' : 'failed';
    testResults.summary = {
      total_tests: totalTests,
      passed_tests: passedTests,
      failed_tests: totalTests - passedTests,
      success_rate: Math.round((passedTests / totalTests) * 100)
    };
    
    console.log(`✅ Market-ready system test completed: ${passedTests}/${totalTests} tests passed`);
    
    return NextResponse.json(testResults);
    
  } catch (error) {
    console.error('❌ Error in market-ready system test:', error);
    
    return NextResponse.json({
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
      overall_status: 'error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  return GET(request);
}

// Test Functions

async function testEnvironmentVariables() {
  try {
    const requiredVars = [
      'ZOHO_CLIENT_ID',
      'ZOHO_CLIENT_SECRET',
      'ZOHO_ACCOUNTS_URL',
      'ZOHO_API_DOMAIN',
      'NEXT_PUBLIC_SUPABASE_URL',
      'SUPABASE_SERVICE_ROLE_KEY'
    ];
    
    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    return {
      status: missingVars.length === 0 ? 'passed' : 'failed',
      details: {
        required_vars: requiredVars.length,
        configured_vars: requiredVars.length - missingVars.length,
        missing_vars: missingVars
      },
      message: missingVars.length === 0 ? 'All required environment variables are configured' : `Missing variables: ${missingVars.join(', ')}`
    };
  } catch (error) {
    return {
      status: 'failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      message: 'Environment variable test failed'
    };
  }
}

async function testDatabaseConnection() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    const startTime = Date.now();
    const { data, error } = await supabase.rpc('get_zoho_token_status');
    const responseTime = Date.now() - startTime;
    
    return {
      status: !error ? 'passed' : 'failed',
      details: {
        connected: !error,
        response_time_ms: responseTime,
        error: error?.message || null
      },
      message: !error ? 'Database connection successful' : `Database connection failed: ${error?.message}`
    };
  } catch (error) {
    return {
      status: 'failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      message: 'Database connection test failed'
    };
  }
}

async function testTokenManagement() {
  try {
    // Test token status
    const healthStatus = await perfectZohoIntegration.getPerfectHealthStatus();
    
    // Test token refresh capability
    const tokenRefreshTest = await perfectZohoIntegration.testTokenRefresh();
    
    const tokenValid = healthStatus.token_status.has_token;
    const canRefresh = healthStatus.token_status.has_refresh_token;
    const refreshTestPassed = tokenRefreshTest.success;
    
    return {
      status: tokenValid && canRefresh && refreshTestPassed ? 'passed' : 'failed',
      details: {
        has_token: tokenValid,
        has_refresh_token: canRefresh,
        refresh_test_passed: refreshTestPassed,
        token_status: healthStatus.token_status
      },
      message: tokenValid && canRefresh && refreshTestPassed 
        ? 'Token management is working correctly' 
        : 'Token management has issues'
    };
  } catch (error) {
    return {
      status: 'failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      message: 'Token management test failed'
    };
  }
}

async function testLeadProcessing() {
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Test lead statistics function
    const { data: leadStats, error: statsError } = await supabase.rpc('get_comprehensive_lead_stats');
    
    // Test pending leads function
    const { data: pendingLeads, error: pendingError } = await supabase.rpc('get_all_pending_leads', { limit_count: 5 });
    
    const statsWorking = !statsError;
    const pendingWorking = !pendingError;
    
    return {
      status: statsWorking && pendingWorking ? 'passed' : 'failed',
      details: {
        lead_stats_working: statsWorking,
        pending_leads_working: pendingWorking,
        lead_stats: leadStats,
        pending_leads_count: pendingLeads?.length || 0
      },
      message: statsWorking && pendingWorking 
        ? 'Lead processing functions are working correctly' 
        : 'Lead processing functions have issues'
    };
  } catch (error) {
    return {
      status: 'failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      message: 'Lead processing test failed'
    };
  }
}

async function testHealthCheck() {
  try {
    const healthStatus = await perfectZohoIntegration.getPerfectHealthStatus();
    
    const hasTokenStatus = !!healthStatus.token_status;
    const hasLeadProcessing = !!healthStatus.lead_processing;
    const hasEnvironment = !!healthStatus.environment;
    const hasSystemStatus = !!healthStatus.system_status;
    
    return {
      status: hasTokenStatus && hasLeadProcessing && hasEnvironment && hasSystemStatus ? 'passed' : 'failed',
      details: {
        has_token_status: hasTokenStatus,
        has_lead_processing: hasLeadProcessing,
        has_environment: hasEnvironment,
        has_system_status: hasSystemStatus,
        system_status: healthStatus.system_status
      },
      message: hasTokenStatus && hasLeadProcessing && hasEnvironment && hasSystemStatus 
        ? 'Health check system is working correctly' 
        : 'Health check system has issues'
    };
  } catch (error) {
    return {
      status: 'failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      message: 'Health check test failed'
    };
  }
}

async function testErrorHandling() {
  try {
    // Test with invalid data to ensure error handling works
    const { createClient } = await import('@supabase/supabase-js');
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    
    // Test with invalid function call (should handle error gracefully)
    const { data, error } = await supabase.rpc('nonexistent_function');
    
    // Test validation function with invalid data
    const { data: validationResult, error: validationError } = await supabase.rpc('validate_zoho_lead_data', {
      p_name: '',
      p_email: 'invalid-email',
      p_message: ''
    });
    
    const errorHandlingWorking = error !== null; // Should return error for nonexistent function
    const validationWorking = validationResult && !validationResult.valid; // Should detect invalid data
    
    return {
      status: errorHandlingWorking && validationWorking ? 'passed' : 'failed',
      details: {
        error_handling_working: errorHandlingWorking,
        validation_working: validationWorking,
        test_error: error?.message,
        validation_result: validationResult
      },
      message: errorHandlingWorking && validationWorking 
        ? 'Error handling is working correctly' 
        : 'Error handling has issues'
    };
  } catch (error) {
    return {
      status: 'failed',
      details: { error: error instanceof Error ? error.message : 'Unknown error' },
      message: 'Error handling test failed'
    };
  }
}
