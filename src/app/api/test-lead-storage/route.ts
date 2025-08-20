import { NextRequest, NextResponse } from 'next/server';
import { storeLeadData } from '@/server/zohoTokenStore';

export async function POST(request: NextRequest) {
  try {
    const testLeadData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '+1234567890',
      company: 'Test Company',
      message: 'This is a test lead from the API',
      source: 'quote_form' as const,
      product_name: 'Test Product',
      product_url: 'https://example.com/product'
    };

    console.log('Testing lead storage with data:', testLeadData);

    const leadId = await storeLeadData(testLeadData);

    return NextResponse.json({
      success: true,
      message: 'Lead storage test successful',
      leadId,
      testData: testLeadData
    });

  } catch (error) {
    console.error('Lead storage test failed:', error);
    return NextResponse.json({
      success: false,
      error: 'Lead storage test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
