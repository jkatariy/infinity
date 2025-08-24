import { NextRequest, NextResponse } from 'next/server';
import { storeLeadData } from '@/server/zohoTokenStore';

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Store lead API called');
    
    const body = await request.json();
    console.log('📝 Request body:', { ...body, email: body.email ? '[REDACTED]' : undefined });
    
    // Validate required fields
    const { name, email, message, source } = body;
    
    if (!name || !email || !message || !source) {
      console.log('❌ Missing required fields:', { name: !!name, email: !!email, message: !!message, source: !!source });
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, message, and source are required'
      }, { status: 400 });
    }

    // Validate source
    if (!['quote_form', 'chatbot'].includes(source)) {
      console.log('❌ Invalid source:', source);
      return NextResponse.json({
        success: false,
        error: 'Invalid source. Must be either "quote_form" or "chatbot"'
      }, { status: 400 });
    }

    console.log('✅ Validation passed, attempting to store lead data...');

    // Store lead data in Supabase
    const leadId = await storeLeadData({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      company: body.company?.trim() || null,
      message: message.trim(),
      source,
      product_name: body.product_name?.trim() || null,
      product_url: body.product_url?.trim() || null
    });

    console.log('✅ Lead stored successfully:', { leadId, name, email: '[REDACTED]', source });

    return NextResponse.json({
      success: true,
      message: 'Lead data stored successfully',
      leadId
    });

  } catch (error) {
    console.error('❌ Error storing lead data:', error);
    
    // Provide more detailed error information
    let errorMessage = 'Failed to store lead data';
    if (error instanceof Error) {
      errorMessage = error.message;
      
      // Check for specific Supabase errors
      if (error.message.includes('relation') && error.message.includes('does not exist')) {
        errorMessage = 'Database table not found. Please check database setup.';
      } else if (error.message.includes('permission denied')) {
        errorMessage = 'Database permission denied. Please check RLS policies.';
      } else if (error.message.includes('connection')) {
        errorMessage = 'Database connection failed. Please check environment variables.';
      }
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      details: process.env.NODE_ENV === 'development' ? error : undefined
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
