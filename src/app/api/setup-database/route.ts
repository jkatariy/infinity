import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://zxvhgpejwgrlxksnqtxk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU'
);

export async function POST(request: NextRequest) {
  try {
    // Check if zoho_leads table exists
    const { data: tableExists, error: checkError } = await supabase
      .from('zoho_leads')
      .select('id')
      .limit(1);

    if (checkError && checkError.code === '42P01') {
      // Table doesn't exist, create it
      console.log('Creating zoho_leads table...');
      
      const createTableSQL = `
        CREATE TABLE IF NOT EXISTS public.zoho_leads (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          company TEXT,
          message TEXT NOT NULL,
          source TEXT NOT NULL CHECK (source IN ('quote_form', 'chatbot')),
          product_name TEXT,
          product_url TEXT,
          sent_to_zoho BOOLEAN DEFAULT FALSE,
          zoho_lead_id TEXT,
          zoho_contact_id TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        -- Create indexes for better performance
        CREATE INDEX IF NOT EXISTS idx_zoho_leads_sent_to_zoho ON public.zoho_leads(sent_to_zoho);
        CREATE INDEX IF NOT EXISTS idx_zoho_leads_created_at ON public.zoho_leads(created_at);
        CREATE INDEX IF NOT EXISTS idx_zoho_leads_source ON public.zoho_leads(source);
        CREATE INDEX IF NOT EXISTS idx_zoho_leads_email ON public.zoho_leads(email);

        -- Enable Row Level Security
        ALTER TABLE public.zoho_leads ENABLE ROW LEVEL SECURITY;

        -- Create policy to allow service role access
        DROP POLICY IF EXISTS "Service role can manage zoho leads" ON public.zoho_leads;
        CREATE POLICY "Service role can manage zoho leads" ON public.zoho_leads
          FOR ALL USING (auth.role() = 'service_role');
      `;

      const { error: createError } = await supabase.rpc('exec_sql', { sql: createTableSQL });
      
      if (createError) {
        console.error('Error creating table:', createError);
        return NextResponse.json({
          success: false,
          error: 'Failed to create zoho_leads table',
          details: createError
        }, { status: 500 });
      }

      console.log('zoho_leads table created successfully');
      return NextResponse.json({
        success: true,
        message: 'zoho_leads table created successfully'
      });
    } else if (checkError) {
      console.error('Error checking table:', checkError);
      return NextResponse.json({
        success: false,
        error: 'Error checking table existence',
        details: checkError
      }, { status: 500 });
    } else {
      // Table exists
      console.log('zoho_leads table already exists');
      return NextResponse.json({
        success: true,
        message: 'zoho_leads table already exists'
      });
    }
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({
      success: false,
      error: 'Database setup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    error: 'Method not allowed'
  }, { status: 405 });
}
