import { NextRequest, NextResponse } from 'next/server';
import { storeLeadData } from '@/server/zohoTokenStore';

interface InitialContactData {
  name: string;
  email: string;
  phone: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone } = body as InitialContactData;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Store initial contact data in Supabase
    const leadId = await storeLeadData({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: undefined,
      message: `Initial chatbot contact from ${name.trim()}. Awaiting product selection.`,
      source: 'chatbot',
      product_name: undefined,
      product_url: undefined
    });

    console.log('Initial chatbot contact stored successfully:', { leadId, name, email, phone });

    return NextResponse.json({
      success: true,
      message: 'Contact information stored successfully',
      leadId
    });

  } catch (error: any) {
    console.error('Error in chatbot initial contact API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
