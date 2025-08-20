import { NextRequest, NextResponse } from 'next/server';
import { updateLeadData } from '@/server/zohoTokenStore';

interface ChatbotLeadData {
  leadId: string;
  category?: string;
  model_name?: string;
  model_label?: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, category, model_name, model_label, message } = body as ChatbotLeadData;

    // Validate required fields
    if (!leadId) {
      return NextResponse.json(
        { error: 'Missing required field: leadId is required' },
        { status: 400 }
      );
    }

    // Update lead data in Supabase with final details
    await updateLeadData(leadId, {
      message: message || `Chatbot inquiry completed. Category: ${category || 'Not specified'}. Model: ${model_name || 'Not specified'}. ${model_label ? `Model details: ${model_label}` : ''}`,
      product_name: model_name || undefined,
      product_url: undefined
    });

    console.log('Chatbot lead updated successfully:', { leadId, category, model_name, model_label });

    return NextResponse.json({
      success: true,
      message: 'Lead data updated successfully',
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
