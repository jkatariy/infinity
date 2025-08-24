import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('📧 Processing contact form submission...');
    
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, subject, and message are required'
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

    // Insert contact message into contact_messages table
    const { data, error } = await supabase
      .from('contact_messages')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        status: 'new',
        source: 'contact_form'
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting contact message:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to save contact message'
      }, { status: 500 });
    }

    console.log('✅ Contact message saved successfully:', data.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your message! We will get back to you soon.',
      message_id: data.id
    });

  } catch (error) {
    console.error('❌ Error processing contact form:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
