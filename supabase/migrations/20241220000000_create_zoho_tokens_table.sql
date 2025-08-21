-- Create zoho_tokens table for persistent Zoho CRM authentication
-- First, drop the existing table if it exists to avoid conflicts
DROP TABLE IF EXISTS public.zoho_tokens CASCADE;

CREATE TABLE public.zoho_tokens (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    access_token TEXT,
    refresh_token TEXT,
    access_token_expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX idx_zoho_tokens_updated_at ON public.zoho_tokens(updated_at);

-- Enable Row Level Security
ALTER TABLE public.zoho_tokens ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role access (for server-side operations)
CREATE POLICY "Service role can manage zoho tokens" ON public.zoho_tokens
    FOR ALL USING (auth.role() = 'service_role');

-- Create a function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_zoho_tokens_updated_at 
    BEFORE UPDATE ON public.zoho_tokens 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a default row to ensure we always have one record
INSERT INTO public.zoho_tokens (id, access_token, refresh_token, access_token_expires_at)
VALUES (
    '00000000-0000-0000-0000-000000000000',
    NULL,
    NULL,
    NULL
);
