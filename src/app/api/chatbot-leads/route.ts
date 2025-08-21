import { NextRequest, NextResponse } from 'next/server';
import { storeLeadData } from '@/server/zohoTokenStore';

interface ChatbotLeadData {
  name: string;
  email: string;
  phone: string;
  industry?: string;
  category?: string;
  model_name?: string;
  model_label?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, industry, category, model_name, model_label, message } = body as ChatbotLeadData;

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

    // Store lead data in Supabase for batch processing
    const leadId = await storeLeadData({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: undefined, // Chatbot doesn't collect company
      message: message || `Chatbot inquiry from ${name}. Industry: ${industry || 'Not specified'}. Category: ${category || 'Not specified'}. Model: ${model_name || 'Not specified'}`,
      source: 'chatbot',
      product_name: model_name || undefined,
      product_url: undefined
    });

    console.log('Chatbot lead stored successfully:', { leadId, name, email, phone });

    return NextResponse.json({
      success: true,
      message: 'Lead data stored successfully',
      leadId
    });

  } catch (error: any) {
    console.error('Error in chatbot leads API:', error);
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
