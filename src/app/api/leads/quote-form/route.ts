import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyRecaptcha } from '@/utils/verifyRecaptcha';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    console.log('📝 Processing quote form submission...');
    
    const body = await request.json();
    const { name, email, phone, description, company, product_name, product_url, recaptchaToken } = body;

    // Validate required fields
    if (!name || !email || !description) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: name, email, and description are required'
      }, { status: 400 });
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      return NextResponse.json({
        success: false,
        error: 'reCAPTCHA verification required'
      }, { status: 400 });
    }

    const recaptchaResult = await verifyRecaptcha(recaptchaToken);

    if (!recaptchaResult.success) {
      return NextResponse.json({
        success: false,
        error: 'reCAPTCHA verification failed',
        details: recaptchaResult.errors
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

    // Insert lead into zoho_leads table
    const { data, error } = await supabase
      .from('zoho_leads')
      .insert({
        name,
        email,
        phone: phone || null,
        company: company || null,
        message: description,
        source: 'quote_form',
        product_name: product_name || null,
        product_url: product_url || null,
        lead_source: 'Website Quote Form',
        lead_status: 'New',
        rating: 'Warm',
        processing_status: 'pending',
        sent_to_zoho: false
      })
      .select()
      .single();

    if (error) {
      console.error('❌ Error inserting quote form lead:', error);
      return NextResponse.json({
        success: false,
        error: 'Failed to save lead information'
      }, { status: 500 });
    }

    console.log('✅ Quote form lead saved successfully:', data.id);

    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry! We will get back to you soon.',
      lead_id: data.id
    });

  } catch (error) {
    console.error('❌ Error processing quote form:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 });
  }
}
