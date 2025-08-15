import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendToZohoCRM, transformFormData } from '@/utils/zohoIntegration';

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

interface MultiPlatformResult {
  supabase: { success: boolean; data?: any; error?: string };
  zoho: { success: boolean; data?: any; error?: string };
  overall: { success: boolean; message: string; leadId?: string; zohoId?: string };
}

async function saveToSupabase(leadData: ChatbotLeadData) {
  try {
    const { data, error } = await supabase
      .from('chatbot_leads')
      .insert(leadData)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return { success: true, data };
  } catch (error: any) {
    console.error('Supabase error:', error);
    return { success: false, error: error.message };
  }
}

async function saveToZohoCRM(leadData: ChatbotLeadData) {
  try {
    // Transform chatbot data to Zoho format
    const nameParts = leadData.name.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || 'Unknown';

    const zohoData = transformFormData({
      firstName,
      lastName,
      email: leadData.email,
      phone: leadData.phone,
      company: '', // Chatbot doesn't collect company
      message: leadData.notes || '',
      productInterest: leadData.model_label || leadData.model_name || '',
      machineType: leadData.model_name || '',
      industry: leadData.industry || '',
      leadSource: leadData.lead_source || 'Chatbot Assistant',
      inquiryType: 'Chatbot Inquiry',
      timeline: 'Not specified',
      budgetRange: 'Not specified'
    }, 'chatbot');

    const result = await sendToZohoCRM(zohoData);
    return result;
  } catch (error: any) {
    console.error('Zoho CRM error:', error);
    return { success: false, error: error.message };
  }
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

    const leadData: ChatbotLeadData = {
      name,
      email,
      phone,
      industry,
      category,
      model_name,
      model_label,
      lead_source,
      notes
    };

    // Save to multiple platforms in parallel
    const [supabaseResult, zohoResult] = await Promise.allSettled([
      saveToSupabase(leadData),
      saveToZohoCRM(leadData)
    ]);

    // Process results
    const result: MultiPlatformResult = {
      supabase: supabaseResult.status === 'fulfilled' 
        ? supabaseResult.value 
        : { success: false, error: supabaseResult.reason?.message || 'Unknown error' },
      zoho: zohoResult.status === 'fulfilled' 
        ? zohoResult.value 
        : { success: false, error: zohoResult.reason?.message || 'Unknown error' },
      overall: { success: false, message: '' }
    };

    // Determine overall success
    if (result.supabase.success && result.zoho.success) {
      result.overall = {
        success: true,
        message: 'Lead submitted successfully to all platforms',
        leadId: result.supabase.data?.id,
        zohoId: result.zoho.data?.zohoId
      };
    } else if (result.supabase.success) {
      result.overall = {
        success: true,
        message: 'Lead submitted successfully to Supabase. Zoho CRM sync may follow later.',
        leadId: result.supabase.data?.id
      };
    } else if (result.zoho.success) {
      result.overall = {
        success: true,
        message: 'Lead submitted successfully to Zoho CRM. Database sync may follow later.',
        zohoId: result.zoho.data?.zohoId
      };
    } else {
      result.overall = {
        success: false,
        message: 'Failed to submit lead to any platform. Please try again.'
      };
    }

    // Log results for monitoring
    console.log('Multi-platform lead submission:', {
      supabase: result.supabase.success ? 'success' : 'failed',
      zoho: result.zoho.success ? 'success' : 'failed',
      supabaseError: result.supabase.error,
      zohoError: result.zoho.error
    });

    return NextResponse.json({
      success: result.overall.success,
      message: result.overall.message,
      leadId: result.overall.leadId,
      zohoId: result.overall.zohoId,
      platforms: {
        supabase: result.supabase.success,
        zoho: result.zoho.success,
        googleSheets: result.supabase.success // Google Sheets syncs from Supabase
      }
    });

  } catch (error: any) {
    console.error('Error in multi-platform chatbot leads API:', error);
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
