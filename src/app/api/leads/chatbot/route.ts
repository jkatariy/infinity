import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('🤖 Processing chatbot lead submission...');
    
    const body = await request.json();
    const { 
      name, 
      email, 
      phone, 
      description, 
      industry, 
      category, 
      model_name, 
      model_label 
    } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, and description are required'
      }, { status: 400 });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid email format'
      }, { status: 400 });
    }

    // Insert lead into chatbot_leads table
    const { data, error } = await supabase
      .from('chatbot_leads')
      .insert({
        name,
        email,
        phone: phone || null,
        industry: industry || null,
        category: category || null,
        model_name: model_name || null,
        model_label: model_label || null,
        lead_source: 'Chatbot Assistant',
        status: 'new',
        notes: description,
        processing_status: 'pending'
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting chatbot lead:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to save lead information'
      }, { status: 500 });
    }

    console.log('✅ Chatbot lead saved successfully:', data.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! Our team will contact you soon.',
      lead_id: data.id
    });

  } catch (error) {
    console.error('❌ Error processing chatbot lead:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
