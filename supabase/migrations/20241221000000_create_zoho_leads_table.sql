-- Create zoho_leads table for storing lead data before sending to Zoho CRM
-- First, drop the existing table if it exists to avoid conflicts
DROP TABLE IF EXISTS public.zoho_leads CASCADE;

CREATE TABLE public.zoho_leads (
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
CREATE INDEX idx_zoho_leads_sent_to_zoho ON public.zoho_leads(sent_to_zoho);
CREATE INDEX idx_zoho_leads_created_at ON public.zoho_leads(created_at);
CREATE INDEX idx_zoho_leads_source ON public.zoho_leads(source);
CREATE INDEX idx_zoho_leads_email ON public.zoho_leads(email);

-- Enable Row Level Security
ALTER TABLE public.zoho_leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role access (for server-side operations)
CREATE POLICY "Service role can manage zoho leads" ON public.zoho_leads
    FOR ALL USING (auth.role() = 'service_role');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_zoho_leads_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_zoho_leads_updated_at 
    BEFORE UPDATE ON public.zoho_leads 
    FOR EACH ROW 
    EXECUTE FUNCTION update_zoho_leads_updated_at();

-- Add comments for documentation
COMMENT ON TABLE public.zoho_leads IS 'Stores lead data from quote forms and chatbot before sending to Zoho CRM';
COMMENT ON COLUMN public.zoho_leads.source IS 'Source of the lead: quote_form or chatbot';
COMMENT ON COLUMN public.zoho_leads.sent_to_zoho IS 'Whether the lead has been sent to Zoho CRM';
COMMENT ON COLUMN public.zoho_leads.zoho_lead_id IS 'ID of the lead in Zoho CRM after successful sync';
COMMENT ON COLUMN public.zoho_leads.zoho_contact_id IS 'ID of the contact in Zoho CRM after successful sync';
