import { NextRequest, NextResponse } from 'next/server';
import { storeLeadData } from '@/server/zohoTokenStore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, message, source } = body;
    
    if (!name || !email || !message || !source) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, message, and source are required'
      }, { status: 400 });
    }

    // Validate source
    if (!['quote_form', 'chatbot'].includes(source)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid source. Must be either "quote_form" or "chatbot"'
      }, { status: 400 });
    }

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

    console.log('Lead stored successfully:', { leadId, name, email, source });

    return NextResponse.json({
      success: true,
      message: 'Lead data stored successfully',
      leadId
    });

  } catch (error) {
    console.error('Error storing lead data:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Failed to store lead data'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
