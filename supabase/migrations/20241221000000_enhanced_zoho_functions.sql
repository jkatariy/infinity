-- Enhanced Zoho Integration Functions
-- This migration adds comprehensive functions for the unified Zoho integration system

-- ============================================================================
-- TOKEN MANAGEMENT FUNCTIONS
-- ============================================================================

-- Function to get comprehensive token status
CREATE OR REPLACE FUNCTION get_zoho_token_status()
RETURNS TABLE (
  has_token BOOLEAN,
  has_access_token BOOLEAN,
  has_refresh_token BOOLEAN,
  is_expired BOOLEAN,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  last_refresh TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COALESCE(zt.access_token IS NOT NULL OR zt.refresh_token IS NOT NULL, FALSE) as has_token,
    COALESCE(zt.access_token IS NOT NULL, FALSE) as has_access_token,
    COALESCE(zt.refresh_token IS NOT NULL, FALSE) as has_refresh_token,
    COALESCE(zt.access_token_expires_at < NOW(), FALSE) as is_expired,
    zt.access_token,
    zt.refresh_token,
    zt.access_token_expires_at as expires_at,
    zt.updated_at as last_refresh
  FROM zoho_tokens zt
  WHERE zt.id = '00000000-0000-0000-0000-000000000000';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update Zoho tokens
CREATE OR REPLACE FUNCTION update_zoho_token(
  p_access_token TEXT,
  p_refresh_token TEXT,
  p_expires_in_seconds INTEGER
)
RETURNS VOID AS $$
BEGIN
  UPDATE zoho_tokens 
  SET 
    access_token = p_access_token,
    refresh_token = p_refresh_token,
    access_token_expires_at = NOW() + (p_expires_in_seconds || ' seconds')::INTERVAL,
    updated_at = NOW()
  WHERE id = '00000000-0000-0000-0000-000000000000';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- LEAD PROCESSING FUNCTIONS
-- ============================================================================

-- Function to get pending leads with enhanced status tracking
CREATE OR REPLACE FUNCTION get_pending_zoho_leads(p_limit INTEGER DEFAULT 20)
RETURNS TABLE (
  id UUID,
  name TEXT,
  email TEXT,
  phone TEXT,
  company TEXT,
  message TEXT,
  source TEXT,
  product_name TEXT,
  product_url TEXT,
  created_at TIMESTAMPTZ,
  sent_to_zoho BOOLEAN,
  zoho_lead_id TEXT,
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
    zl.product_url,
    zl.created_at,
    zl.sent_to_zoho,
    zl.zoho_lead_id,
    COALESCE(zl.processing_status, 'pending') as processing_status,
    COALESCE(zl.retry_count, 0) as retry_count,
    zl.last_error,
    zl.processed_at
  FROM zoho_leads zl
  WHERE 
    zl.sent_to_zoho = FALSE 
    AND (zl.processing_status IS NULL OR zl.processing_status IN ('pending', 'retry'))
    AND (zl.retry_count IS NULL OR zl.retry_count < 3)
  ORDER BY zl.created_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get comprehensive lead processing statistics
CREATE OR REPLACE FUNCTION get_comprehensive_lead_stats()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  WITH stats AS (
    SELECT 
      COUNT(*) as total,
      COUNT(*) FILTER (WHERE sent_to_zoho = FALSE AND (processing_status IS NULL OR processing_status = 'pending')) as pending,
      COUNT(*) FILTER (WHERE sent_to_zoho = TRUE AND processing_status = 'sent') as sent,
      COUNT(*) FILTER (WHERE processing_status = 'failed') as failed,
      COUNT(*) FILTER (WHERE processing_status = 'retry') as retry,
      CASE 
        WHEN COUNT(*) FILTER (WHERE sent_to_zoho = TRUE) > 0 
        THEN ROUND((COUNT(*) FILTER (WHERE sent_to_zoho = TRUE)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2)
        ELSE 0 
      END as success_rate
    FROM zoho_leads
  )
  SELECT json_build_object(
    'zoho_leads', json_build_object(
      'total', stats.total,
      'pending', stats.pending,
      'sent', stats.sent,
      'failed', stats.failed,
      'retry', stats.retry,
      'success_rate', stats.success_rate
    ),
    'chatbot_leads', json_build_object(
      'total', 0,
      'pending', 0,
      'sent', 0,
      'failed', 0,
      'retry', 0,
      'success_rate', 0
    ),
    'combined', json_build_object(
      'total', stats.total,
      'pending', stats.pending,
      'sent', stats.sent,
      'failed', stats.failed,
      'retry', stats.retry,
      'overall_success_rate', stats.success_rate
    )
  ) INTO result
  FROM stats;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get lead processing statistics (simplified)
CREATE OR REPLACE FUNCTION get_lead_processing_stats()
RETURNS TABLE (
  total BIGINT,
  pending BIGINT,
  sent BIGINT,
  failed BIGINT,
  retry BIGINT,
  success_rate DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total,
    COUNT(*) FILTER (WHERE sent_to_zoho = FALSE AND (processing_status IS NULL OR processing_status = 'pending')) as pending,
    COUNT(*) FILTER (WHERE sent_to_zoho = TRUE AND processing_status = 'sent') as sent,
    COUNT(*) FILTER (WHERE processing_status = 'failed') as failed,
    COUNT(*) FILTER (WHERE processing_status = 'retry') as retry,
    CASE 
      WHEN COUNT(*) FILTER (WHERE sent_to_zoho = TRUE) > 0 
      THEN ROUND((COUNT(*) FILTER (WHERE sent_to_zoho = TRUE)::DECIMAL / COUNT(*)::DECIMAL) * 100, 2)
      ELSE 0 
    END as success_rate
  FROM zoho_leads;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to mark lead as processed
CREATE OR REPLACE FUNCTION mark_lead_processed(
  p_lead_id UUID,
  p_zoho_lead_id TEXT,
  p_status TEXT DEFAULT 'sent'
)
RETURNS VOID AS $$
BEGIN
  UPDATE zoho_leads 
  SET 
    sent_to_zoho = (p_status = 'sent'),
    zoho_lead_id = CASE WHEN p_status = 'sent' THEN p_zoho_lead_id ELSE zoho_lead_id END,
    processing_status = p_status,
    processed_at = NOW(),
    updated_at = NOW()
  WHERE id = p_lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update lead processing status
CREATE OR REPLACE FUNCTION update_lead_processing_status(
  p_lead_id UUID,
  p_status TEXT,
  p_error_message TEXT DEFAULT NULL,
  p_zoho_lead_id TEXT DEFAULT NULL
)
RETURNS VOID AS $$
BEGIN
  UPDATE zoho_leads 
  SET 
    processing_status = p_status,
    last_error = p_error_message,
    zoho_lead_id = CASE WHEN p_status = 'sent' THEN p_zoho_lead_id ELSE zoho_lead_id END,
    sent_to_zoho = (p_status = 'sent'),
    processed_at = NOW(),
    updated_at = NOW()
  WHERE id = p_lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- SYSTEM MONITORING FUNCTIONS
-- ============================================================================

-- Function to get system health overview
CREATE OR REPLACE FUNCTION get_system_health()
RETURNS JSON AS $$
DECLARE
  result JSON;
  token_status JSON;
  lead_stats JSON;
BEGIN
  -- Get token status
  SELECT json_build_object(
    'has_token', has_token,
    'has_access_token', has_access_token,
    'has_refresh_token', has_refresh_token,
    'is_expired', is_expired,
    'expires_at', expires_at,
    'last_refresh', last_refresh
  ) INTO token_status
  FROM get_zoho_token_status();

  -- Get lead statistics
  SELECT get_comprehensive_lead_stats() INTO lead_stats;

  -- Build comprehensive health report
  SELECT json_build_object(
    'timestamp', NOW(),
    'token_status', token_status,
    'lead_processing', lead_stats,
    'system_status', json_build_object(
      'database_connected', TRUE,
      'functions_available', TRUE,
      'last_check', NOW()
    )
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get recent activity
CREATE OR REPLACE FUNCTION get_recent_activity(p_hours INTEGER DEFAULT 24)
RETURNS TABLE (
  activity_type TEXT,
  count BIGINT,
  last_activity TIMESTAMPTZ
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'leads_created' as activity_type,
    COUNT(*) as count,
    MAX(created_at) as last_activity
  FROM zoho_leads
  WHERE created_at >= NOW() - (p_hours || ' hours')::INTERVAL
  
  UNION ALL
  
  SELECT 
    'leads_processed' as activity_type,
    COUNT(*) as count,
    MAX(processed_at) as last_activity
  FROM zoho_leads
  WHERE processed_at >= NOW() - (p_hours || ' hours')::INTERVAL
  
  UNION ALL
  
  SELECT 
    'failed_leads' as activity_type,
    COUNT(*) as count,
    MAX(processed_at) as last_activity
  FROM zoho_leads
  WHERE processing_status = 'failed' 
    AND processed_at >= NOW() - (p_hours || ' hours')::INTERVAL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- DATA VALIDATION FUNCTIONS
-- ============================================================================

-- Function to validate lead data
CREATE OR REPLACE FUNCTION validate_lead_data(
  p_name TEXT,
  p_email TEXT,
  p_message TEXT
)
RETURNS BOOLEAN AS $$
BEGIN
  -- Check required fields
  IF p_name IS NULL OR p_name = '' THEN
    RETURN FALSE;
  END IF;
  
  IF p_email IS NULL OR p_email = '' THEN
    RETURN FALSE;
  END IF;
  
  IF p_message IS NULL OR p_message = '' THEN
    RETURN FALSE;
  END IF;
  
  -- Validate email format (basic regex)
  IF p_email !~ '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$' THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean and validate lead data before insertion
CREATE OR REPLACE FUNCTION insert_validated_lead(
  p_name TEXT,
  p_email TEXT,
  p_phone TEXT DEFAULT NULL,
  p_company TEXT DEFAULT NULL,
  p_message TEXT,
  p_source TEXT,
  p_product_name TEXT DEFAULT NULL,
  p_product_url TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  lead_id UUID;
BEGIN
  -- Validate data
  IF NOT validate_lead_data(p_name, p_email, p_message) THEN
    RAISE EXCEPTION 'Invalid lead data provided';
  END IF;
  
  -- Insert validated lead
  INSERT INTO zoho_leads (
    name,
    email,
    phone,
    company,
    message,
    source,
    product_name,
    product_url,
    sent_to_zoho,
    processing_status,
    retry_count
  ) VALUES (
    TRIM(p_name),
    LOWER(TRIM(p_email)),
    CASE WHEN p_phone IS NOT NULL THEN TRIM(p_phone) ELSE NULL END,
    CASE WHEN p_company IS NOT NULL THEN TRIM(p_company) ELSE NULL END,
    TRIM(p_message),
    p_source,
    CASE WHEN p_product_name IS NOT NULL THEN TRIM(p_product_name) ELSE NULL END,
    CASE WHEN p_product_url IS NOT NULL THEN TRIM(p_product_url) ELSE NULL END,
    FALSE,
    'pending',
    0
  ) RETURNING id INTO lead_id;
  
  RETURN lead_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- MAINTENANCE FUNCTIONS
-- ============================================================================

-- Function to cleanup old failed leads (older than 30 days)
CREATE OR REPLACE FUNCTION cleanup_old_failed_leads(p_days INTEGER DEFAULT 30)
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM zoho_leads 
  WHERE processing_status = 'failed' 
    AND created_at < NOW() - (p_days || ' days')::INTERVAL;
  
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset processing status for stuck leads
CREATE OR REPLACE FUNCTION reset_stuck_leads()
RETURNS INTEGER AS $$
DECLARE
  updated_count INTEGER;
BEGIN
  UPDATE zoho_leads 
  SET 
    processing_status = 'pending',
    last_error = NULL,
    updated_at = NOW()
  WHERE processing_status = 'processing' 
    AND processed_at < NOW() - INTERVAL '1 hour';
  
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RETURN updated_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get system metrics for monitoring
CREATE OR REPLACE FUNCTION get_system_metrics()
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'database_size', pg_database_size(current_database()),
    'table_sizes', json_build_object(
      'zoho_leads', pg_total_relation_size('zoho_leads'),
      'zoho_tokens', pg_total_relation_size('zoho_tokens')
    ),
    'index_sizes', json_build_object(
      'zoho_leads_indexes', (
        SELECT SUM(pg_total_relation_size(indexrelid))
        FROM pg_stat_user_indexes
        WHERE relname = 'zoho_leads'
      )
    ),
    'connection_count', (
      SELECT count(*) 
      FROM pg_stat_activity 
      WHERE datname = current_database()
    ),
    'last_vacuum', (
      SELECT last_vacuum 
      FROM pg_stat_user_tables 
      WHERE relname = 'zoho_leads'
    ),
    'last_analyze', (
      SELECT last_analyze 
      FROM pg_stat_user_tables 
      WHERE relname = 'zoho_leads'
    )
  ) INTO result;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant execute permissions to service role
GRANT EXECUTE ON FUNCTION get_zoho_token_status() TO service_role;
GRANT EXECUTE ON FUNCTION update_zoho_token(TEXT, TEXT, INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION get_pending_zoho_leads(INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION get_comprehensive_lead_stats() TO service_role;
GRANT EXECUTE ON FUNCTION get_lead_processing_stats() TO service_role;
GRANT EXECUTE ON FUNCTION mark_lead_processed(UUID, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION update_lead_processing_status(UUID, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION get_system_health() TO service_role;
GRANT EXECUTE ON FUNCTION get_recent_activity(INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION validate_lead_data(TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION insert_validated_lead(TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT, TEXT) TO service_role;
GRANT EXECUTE ON FUNCTION cleanup_old_failed_leads(INTEGER) TO service_role;
GRANT EXECUTE ON FUNCTION reset_stuck_leads() TO service_role;
GRANT EXECUTE ON FUNCTION get_system_metrics() TO service_role;
