-- Enhanced Zoho Leads Schema
-- This migration adds additional columns to the zoho_leads table for better processing status tracking

-- Add new columns to zoho_leads table
ALTER TABLE zoho_leads 
ADD COLUMN IF NOT EXISTS processing_status TEXT DEFAULT 'pending' CHECK (processing_status IN ('pending', 'processing', 'sent', 'failed', 'retry')),
ADD COLUMN IF NOT EXISTS retry_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_error TEXT,
ADD COLUMN IF NOT EXISTS processed_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS zoho_response JSONB;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_zoho_leads_processing_status ON zoho_leads(processing_status);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_status_created ON zoho_leads(processing_status, created_at);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_retry_count ON zoho_leads(retry_count);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_processed_at ON zoho_leads(processed_at);
CREATE INDEX IF NOT EXISTS idx_zoho_leads_source_status ON zoho_leads(source, processing_status);

-- Create a view for monitoring pending leads
CREATE OR REPLACE VIEW zoho_pending_leads_view AS
SELECT 
  id,
  name,
  email,
  phone,
  company,
  message,
  source,
  product_name,
  created_at,
  processing_status,
  retry_count,
  last_error,
  CASE 
    WHEN processing_status = 'pending' THEN 'Ready for processing'
    WHEN processing_status = 'processing' THEN 'Currently being processed'
    WHEN processing_status = 'retry' THEN 'Scheduled for retry'
    WHEN processing_status = 'failed' THEN 'Processing failed'
    WHEN processing_status = 'sent' THEN 'Successfully sent to Zoho'
    ELSE 'Unknown status'
  END as status_description
FROM zoho_leads
WHERE sent_to_zoho = FALSE 
  AND (processing_status IS NULL OR processing_status IN ('pending', 'retry'))
  AND (retry_count IS NULL OR retry_count < 3)
ORDER BY created_at ASC;

-- Create a view for processing statistics
CREATE OR REPLACE VIEW zoho_processing_stats_view AS
SELECT 
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE sent_to_zoho = FALSE AND (processing_status IS NULL OR processing_status = 'pending')) as pending_leads,
  COUNT(*) FILTER (WHERE sent_to_zoho = TRUE AND processing_status = 'sent') as sent_leads,
  COUNT(*) FILTER (WHERE processing_status = 'failed') as failed_leads,
  COUNT(*) FILTER (WHERE processing_status = 'retry') as retry_leads,
  COUNT(*) FILTER (WHERE processing_status = 'processing') as processing_leads,
  CASE 
    WHEN COUNT(*) FILTER (WHERE sent_to_zoho = TRUE) > 0 
    THEN ROUND((COUNT(*) FILTER (WHERE sent_to_zoho = TRUE)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2)
    ELSE 0 
  END as success_rate,
  COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '24 hours') as leads_last_24h,
  COUNT(*) FILTER (WHERE processed_at >= NOW() - INTERVAL '24 hours') as processed_last_24h,
  MAX(created_at) as latest_lead_created,
  MAX(processed_at) as latest_lead_processed
FROM zoho_leads;

-- Create a view for error analysis
CREATE OR REPLACE VIEW zoho_error_analysis_view AS
SELECT 
  processing_status,
  retry_count,
  COUNT(*) as count,
  MIN(created_at) as first_error,
  MAX(created_at) as last_error,
  STRING_AGG(DISTINCT last_error, '; ') as error_messages
FROM zoho_leads
WHERE processing_status IN ('failed', 'retry') AND last_error IS NOT NULL
GROUP BY processing_status, retry_count
ORDER BY count DESC;

-- Create a view for source analysis
CREATE OR REPLACE VIEW zoho_source_analysis_view AS
SELECT 
  source,
  COUNT(*) as total_leads,
  COUNT(*) FILTER (WHERE sent_to_zoho = TRUE) as sent_leads,
  COUNT(*) FILTER (WHERE sent_to_zoho = FALSE) as pending_leads,
  COUNT(*) FILTER (WHERE processing_status = 'failed') as failed_leads,
  CASE 
    WHEN COUNT(*) FILTER (WHERE sent_to_zoho = TRUE) > 0 
    THEN ROUND((COUNT(*) FILTER (WHERE sent_to_zoho = TRUE)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2)
    ELSE 0 
  END as success_rate,
  AVG(EXTRACT(EPOCH FROM (processed_at - created_at))) as avg_processing_time_seconds
FROM zoho_leads
GROUP BY source
ORDER BY total_leads DESC;

-- Create a function to get leads by status
CREATE OR REPLACE FUNCTION get_leads_by_status(p_status TEXT, p_limit INTEGER DEFAULT 50)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT,
  product_name TEXT,
  created_at TIMESTAMPTZ,
  processing_status TEXT,
  retry_count INTEGER,
  last_error TEXT,
  processed_at TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    zl.id,
    zl.name,
    zl.email,
    zl.phone,
    zl.company,
    zl.message,
    zl.source,
    zl.product_name,
    zl.created_at,
    zl.processing_status,
    zl.retry_count,
    zl.last_error,
    zl.processed_at
  FROM zoho_leads zl
  WHERE zl.processing_status = p_status
  ORDER BY zl.created_at DESC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get leads that need retry
CREATE OR REPLACE FUNCTION get_leads_needing_retry(p_limit INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT,
  product_name TEXT,
  created_at TIMESTAMPTZ,
  retry_count INTEGER,
  last_error TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    zl.id,
    zl.name,
    zl.email,
    zl.phone,
    zl.company,
    zl.message,
    zl.source,
    zl.product_name,
    zl.created_at,
    zl.retry_count,
    zl.last_error
  FROM zoho_leads zl
  WHERE 
    zl.processing_status = 'retry'
    AND zl.retry_count < 3
    AND zl.sent_to_zoho = FALSE
  ORDER BY zl.created_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to get stuck leads (processing for more than 1 hour)
CREATE OR REPLACE FUNCTION get_stuck_leads()
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT,
  product_name TEXT,
  created_at TIMESTAMPTZ,
  processing_status TEXT,
  retry_count INTEGER,
  last_error TEXT,
  stuck_duration_minutes INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    zl.id,
    zl.name,
    zl.email,
    zl.phone,
    zl.company,
    zl.message,
    zl.source,
    zl.product_name,
    zl.created_at,
    zl.processing_status,
    zl.retry_count,
    zl.last_error,
    EXTRACT(EPOCH FROM (NOW() - zl.created_at)) / 60 as stuck_duration_minutes
  FROM zoho_leads zl
  WHERE 
    zl.processing_status = 'processing'
    AND zl.created_at < NOW() - INTERVAL '1 hour'
    AND zl.sent_to_zoho = FALSE
  ORDER BY zl.created_at ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT SELECT ON zoho_pending_leads_view TO service_role;
GRANT SELECT ON zoho_processing_stats_view TO service_role;
GRANT SELECT ON zoho_error_analysis_view TO service_role;
GRANT SELECT ON zoho_source_analysis_view TO service_role;
GRANT EXECUTE ON FUNCTION get_leads_by_status(TEXT, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION get_leads_needing_retry(INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION get_stuck_leads() TO service_role;

-- Update existing leads to have proper processing status
UPDATE zoho_leads 
SET processing_status = CASE 
  WHEN sent_to_zoho = TRUE THEN 'sent'
  WHEN sent_to_zoho = FALSE THEN 'pending'
  ELSE 'pending'
END
WHERE processing_status IS NULL;
