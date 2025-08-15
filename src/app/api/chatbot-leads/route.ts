import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

interface ChatbotLeadData {
  name: string;
  email: string;
  phone: string;
  industry?: string;
  category?: string;
  model_name?: string;
  model_label?: string;
  lead_source?: string;
  notes?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      industry, 
      category, 
      model_name, 
      model_label, 
      lead_source = 'Chatbot Assistant',
      notes 
    } = body;

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

    // Insert lead into Supabase
    const { data, error } = await supabase
      .from('chatbot_leads')
      .insert({
        name,
        email,
        phone,
        industry,
        category,
        model_name,
        model_label,
        lead_source,
        notes
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to save lead. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
      leadId: data.id,
    });
  } catch (error: any) {
    console.error('Error in chatbot leads API:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('chatbot_leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch leads' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      leads: data,
    });
  } catch (error: any) {
    console.error('Error fetching chatbot leads:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
