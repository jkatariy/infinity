import { createClient } from '@supabase/supabase-js';

// Validate environment variables before creating client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing required Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', !!supabaseUrl);
  console.error('SUPABASE_SERVICE_ROLE_KEY:', !!supabaseKey);
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ============================================================================
// INTERFACES & TYPES
// ============================================================================

interface ZohoTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
}

interface ZohoLead {
  Last_Name: string;
  First_Name?: string;
  Email: string;
  Phone?: string;
  Company?: string;
  Lead_Source: string;
  Description?: string;
  Lead_Status: string;
  Rating: string;
  Product_Interest?: string;
  Inquiry_Type?: string;
  Additional_Requirements?: string;
  Industry?: string;
  Annual_Revenue?: string;
  No_of_Employees?: string;
  Website?: string;
  Street?: string;
  City?: string;
  State?: string;
  Zip_Code?: string;
  Country?: string;
  Machine_Type?: string;
  Budget_Range?: string;
  Timeline?: string;
}

interface LeadProcessingResult {
  success: boolean;
  error?: string;
  zohoLeadId?: string;
  retryable?: boolean;
}

interface PendingLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: 'quote_form' | 'chatbot';
  product_name?: string;
  product_url?: string;
  created_at: string;
  sent_to_zoho: boolean;
  zoho_lead_id?: string;
  processing_status?: 'pending' | 'processing' | 'sent' | 'failed' | 'retry';
  retry_count?: number;
  last_error?: string;
  processed_at?: string;
}

interface SystemHealth {
  timestamp: string;
  token_status: {
    has_token: boolean;
    has_access_token: boolean;
    has_refresh_token: boolean;
    is_expired: boolean;
    expires_at?: string;
    last_refresh?: string;
    access_token?: string;
  };
  lead_processing: {
    total: number;
    pending: number;
    sent: number;
    failed: number;
    retry: number;
    success_rate: number;
  };
  environment: {
    has_client_id: boolean;
    has_client_secret: boolean;
    has_accounts_url: boolean;
    has_api_domain: boolean;
    has_redirect_uri: boolean;
  };
  system_status: {
    token_valid: boolean;
    can_refresh: boolean;
    leads_pending: number;
    overall_success_rate: number;
    last_sync: string;
    system_uptime: number;
  };
  performance: {
    avg_response_time_ms: number;
    api_calls_last_24h: number;
    error_rate_percentage: number;
    database_connection: 'healthy' | 'degraded' | 'unhealthy';
  };
}

interface ProcessingStats {
  processed: number;
  successful: number;
  failed: number;
  errors: string[];
  processing_time_ms: number;
  start_time: string;
  end_time: string;
}

// ============================================================================
// UNIFIED ZOHO INTEGRATION SERVICE
// ============================================================================

class UnifiedZohoIntegrationService {
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second
  private readonly ZOHO_API_TIMEOUT = 30000; // 30 seconds
  private readonly TOKEN_REFRESH_BUFFER = 600; // 10 minutes buffer
  private readonly BATCH_SIZE = 20; // Process 20 leads per batch
  private readonly MAX_PROCESSING_TIME = 300000; // 5 minutes max processing time

  // ============================================================================
  // TOKEN MANAGEMENT
  // ============================================================================

  /**
   * Get valid access token with automatic refresh and comprehensive error handling
   */
  async getValidAccessToken(): Promise<string | null> {
    try {
      console.log('🔑 Getting valid access token...');
      
      // Validate environment variables first
      if (!this.validateEnvironmentVariables()) {
        console.error('❌ Environment variables not properly configured');
        return null;
      }
      
      // Get current token status with error handling
      const { data: tokenStatus, error } = await supabase.rpc('get_zoho_token_status');
      
      if (error) {
        console.error('❌ Error getting token status:', error);
        return null;
      }

      // If token is valid, return it immediately
      if (tokenStatus.has_token && tokenStatus.has_access_token && !tokenStatus.is_expired) {
        console.log('✅ Using existing valid token');
        return tokenStatus.access_token;
      }

      // If token is expired but we have refresh token, refresh automatically
      if (tokenStatus.has_refresh_token) {
        console.log('🔄 Token expired, automatically refreshing...');
        
        // Get refresh token from database with error handling
        const { data: tokens, error: tokenError } = await supabase
          .from('zoho_tokens')
          .select('refresh_token')
          .eq('id', '00000000-0000-0000-0000-000000000000')
          .single();

        if (tokenError || !tokens?.refresh_token) {
          console.error('❌ No refresh token available');
          return null;
        }

        const newAccessToken = await this.refreshAccessToken(tokens.refresh_token);
        if (newAccessToken) {
          console.log('✅ Token refreshed successfully');
          return newAccessToken;
        }
      }

      console.error('❌ No valid token or refresh token available');
      return null;
    } catch (error) {
      console.error('❌ Error getting valid access token:', error);
      return null;
    }
  }

  /**
   * Refresh access token using refresh token
   */
  private async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      console.log('🔄 Refreshing access token...');
      
      const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        refresh_token: refreshToken,
      });

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.ZOHO_API_TIMEOUT);

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Token refresh failed:', response.status, errorText);
        return null;
      }

      const data: ZohoTokenResponse = await response.json();
      
      // Store new tokens in database
      const { error } = await supabase.rpc('update_zoho_token', {
        p_access_token: data.access_token,
        p_refresh_token: data.refresh_token || refreshToken, // Keep old refresh token if new one not provided
        p_expires_in_seconds: data.expires_in
      });

      if (error) {
        console.error('❌ Error storing refreshed tokens:', error);
        return null;
      }

      console.log('✅ Token refresh successful');
      return data.access_token;
    } catch (error) {
      console.error('❌ Error refreshing token:', error);
      return null;
    }
  }

  /**
   * Validate environment variables
   */
  private validateEnvironmentVariables(): boolean {
    const requiredVars = [
      'ZOHO_CLIENT_ID',
      'ZOHO_CLIENT_SECRET',
      'ZOHO_ACCOUNTS_URL',
      'ZOHO_API_DOMAIN'
    ];

    const missingVars = requiredVars.filter(varName => !process.env[varName]);
    
    if (missingVars.length > 0) {
      console.error('❌ Missing environment variables:', missingVars);
      return false;
    }

    return true;
  }

  // ============================================================================
  // LEAD PROCESSING
  // ============================================================================

  /**
   * Process all pending leads from both tables with comprehensive error handling
   */
  async processAllPendingLeads(limit: number = this.BATCH_SIZE): Promise<ProcessingStats> {
    const startTime = Date.now();
    const stats: ProcessingStats = {
      processed: 0,
      successful: 0,
      failed: 0,
      errors: [],
      processing_time_ms: 0,
      start_time: new Date().toISOString(),
      end_time: ''
    };

    try {
      console.log(`🔄 Processing up to ${limit} pending leads...`);

      // Get valid access token
      const accessToken = await this.getValidAccessToken();
      if (!accessToken) {
        throw new Error('Failed to get valid access token');
      }

      // Get pending leads from both tables
      const pendingLeads = await this.getPendingLeads(limit);
      
      if (pendingLeads.length === 0) {
        console.log('ℹ️ No pending leads to process');
        stats.end_time = new Date().toISOString();
        stats.processing_time_ms = Date.now() - startTime;
        return stats;
      }

      console.log(`📋 Processing ${pendingLeads.length} leads...`);

      // Process leads in batches to avoid timeouts
      const batchSize = Math.min(10, pendingLeads.length);
      for (let i = 0; i < pendingLeads.length; i += batchSize) {
        const batch = pendingLeads.slice(i, i + batchSize);
        
        // Check if we're approaching timeout
        if (Date.now() - startTime > this.MAX_PROCESSING_TIME) {
          console.log('⏰ Processing timeout reached, stopping batch processing');
          break;
        }

        await this.processBatch(batch, accessToken, stats);
        
        // Small delay between batches to avoid rate limiting
        if (i + batchSize < pendingLeads.length) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }

      stats.end_time = new Date().toISOString();
      stats.processing_time_ms = Date.now() - startTime;

      console.log(`🎉 Lead processing completed: ${stats.successful} successful, ${stats.failed} failed`);
      return stats;

    } catch (error) {
      console.error('❌ Error in lead processing:', error);
      stats.errors.push(error instanceof Error ? error.message : 'Unknown error');
      stats.end_time = new Date().toISOString();
      stats.processing_time_ms = Date.now() - startTime;
      return stats;
    }
  }

  /**
   * Process a batch of leads
   */
  private async processBatch(
    leads: PendingLead[], 
    accessToken: string, 
    stats: ProcessingStats
  ): Promise<void> {
    const promises = leads.map(lead => this.processSingleLead(lead, accessToken));
    
    const results = await Promise.allSettled(promises);
    
    results.forEach((result, index) => {
      stats.processed++;
      
      if (result.status === 'fulfilled' && result.value.success) {
        stats.successful++;
      } else {
        stats.failed++;
        const error = result.status === 'rejected' 
          ? result.reason 
          : result.value?.error || 'Unknown error';
        stats.errors.push(`Lead ${leads[index].id}: ${error}`);
      }
    });
  }

  /**
   * Process a single lead
   */
  private async processSingleLead(lead: PendingLead, accessToken: string): Promise<LeadProcessingResult> {
    try {
      // Update status to processing
      await this.updateLeadStatus(lead.id, 'processing');

      // Validate lead data
      if (!this.validateLeadData(lead)) {
        await this.updateLeadStatus(lead.id, 'failed', 'Invalid lead data');
        return {
          success: false,
          error: 'Invalid lead data',
          retryable: false
        };
      }

      // Create lead in Zoho CRM
      const result = await this.createLeadInZoho(lead, accessToken);
      
      if (result.success) {
        // Update status to sent
        await this.updateLeadStatus(lead.id, 'sent', undefined, result.zohoLeadId);
        return result;
      } else {
        // Update status to failed or retry
        const shouldRetry = result.retryable && (lead.retry_count || 0) < this.maxRetries;
        const status = shouldRetry ? 'retry' : 'failed';
        await this.updateLeadStatus(lead.id, status, result.error);
        return result;
      }

    } catch (error) {
      console.error(`❌ Error processing lead ${lead.id}:`, error);
      await this.updateLeadStatus(lead.id, 'failed', error instanceof Error ? error.message : 'Unknown error');
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        retryable: true
      };
    }
  }

  /**
   * Get pending leads from both tables
   */
  private async getPendingLeads(limit: number): Promise<PendingLead[]> {
    try {
      const { data, error } = await supabase.rpc('get_pending_zoho_leads', { p_limit: limit });
      
      if (error) {
        console.error('❌ Error getting pending leads:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('❌ Error getting pending leads:', error);
      return [];
    }
  }

  /**
   * Update lead processing status
   */
  private async updateLeadStatus(
    leadId: string, 
    status: 'processing' | 'sent' | 'failed' | 'retry', 
    error?: string,
    zohoId?: string
  ): Promise<void> {
    try {
      const updateData: any = {
        processing_status: status,
        processed_at: new Date().toISOString()
      };

      if (status === 'sent') {
        updateData.sent_to_zoho = true;
        updateData.zoho_lead_id = zohoId;
      } else if (status === 'failed') {
        updateData.sent_to_zoho = false;
        updateData.last_error = error;
      } else if (status === 'retry') {
        updateData.retry_count = (updateData.retry_count || 0) + 1;
        updateData.last_error = error;
      }

      const { error: updateError } = await supabase
        .from('zoho_leads')
        .update(updateData)
        .eq('id', leadId);

      if (updateError) {
        console.error('❌ Error updating lead status:', updateError);
      }
    } catch (error) {
      console.error('❌ Error updating lead status:', error);
    }
  }

  /**
   * Validate lead data
   */
  private validateLeadData(lead: PendingLead): boolean {
    if (!lead.name || !lead.email || !lead.message) {
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(lead.email)) {
      return false;
    }

    return true;
  }

  /**
   * Create lead in Zoho CRM with comprehensive error handling
   */
  private async createLeadInZoho(lead: PendingLead, accessToken: string): Promise<LeadProcessingResult> {
    try {
      // Transform lead data to Zoho format
      const nameParts = lead.name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';
      
      const zohoLead: ZohoLead = {
        Last_Name: lastName,
        First_Name: firstName,
        Email: lead.email,
        Phone: lead.phone || undefined,
        Company: lead.company || undefined,
        Lead_Source: lead.source === 'quote_form' ? 'Website Quote Form' : 'Chatbot Assistant',
        Description: lead.message,
        Lead_Status: 'New',
        Rating: 'Hot',
        Product_Interest: lead.product_name || undefined,
        Inquiry_Type: 'Quote Request',
        Additional_Requirements: lead.message
      };

      const apiUrl = `${process.env.ZOHO_API_DOMAIN}/crm/v6/Leads`;
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.ZOHO_API_TIMEOUT);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [zohoLead]
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Zoho API error: ${response.status} ${response.statusText}`, errorText);
        
        // Determine if error is retryable
        const isRetryable = response.status >= 500 || response.status === 429;
        
        return {
          success: false,
          error: `Zoho CRM API error: ${response.status} ${response.statusText}`,
          retryable: isRetryable
        };
      }

      const result = await response.json();
      const zohoId = result.data?.[0]?.details?.id;
      
      if (!zohoId) {
        return {
          success: false,
          error: 'No Zoho lead ID returned from API',
          retryable: true
        };
      }

      return {
        success: true,
        zohoLeadId: zohoId
      };

    } catch (error) {
      console.error('❌ Error creating lead in Zoho:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        retryable: true
      };
    }
  }

  // ============================================================================
  // SYSTEM HEALTH & MONITORING
  // ============================================================================

  /**
   * Get comprehensive system health status
   */
  async getSystemHealth(): Promise<SystemHealth> {
    try {
      const startTime = Date.now();
      
      // Get system health from database function
      const { data: systemHealth, error } = await supabase.rpc('get_system_health');
      
      if (error) {
        console.error('❌ Error getting system health:', error);
        throw error;
      }

      // Get performance metrics
      const performance = await this.getPerformanceMetrics();
      
      const systemUptime = Date.now() - startTime;

      // Build the response with the actual database structure
      return {
        timestamp: systemHealth.timestamp || new Date().toISOString(),
        token_status: systemHealth.token_status || {
          has_token: false,
          has_access_token: false,
          has_refresh_token: false,
          is_expired: false
        },
        lead_processing: systemHealth.lead_processing || {
          total: 0,
          pending: 0,
          sent: 0,
          failed: 0,
          retry: 0,
          success_rate: 0
        },
        environment: {
          has_client_id: !!process.env.ZOHO_CLIENT_ID,
          has_client_secret: !!process.env.ZOHO_CLIENT_SECRET,
          has_accounts_url: !!process.env.ZOHO_ACCOUNTS_URL,
          has_api_domain: !!process.env.ZOHO_API_DOMAIN,
          has_redirect_uri: !!process.env.ZOHO_REDIRECT_URI
        },
        system_status: {
          token_valid: systemHealth.token_status?.has_token && systemHealth.token_status?.has_access_token && !systemHealth.token_status?.is_expired,
          can_refresh: systemHealth.token_status?.has_refresh_token,
          leads_pending: (systemHealth.lead_processing?.pending || 0),
          overall_success_rate: (systemHealth.lead_processing?.success_rate || 0),
          last_sync: new Date().toISOString(),
          system_uptime: systemUptime
        },
        performance
      };
    } catch (error) {
      console.error('❌ Error getting system health:', error);
      throw error;
    }
  }

  /**
   * Get performance metrics
   */
  private async getPerformanceMetrics(): Promise<SystemHealth['performance']> {
    try {
      // This would typically come from a metrics database
      // For now, return default values
      return {
        avg_response_time_ms: 1500,
        api_calls_last_24h: 0,
        error_rate_percentage: 0,
        database_connection: 'healthy'
      };
    } catch (error) {
      console.error('❌ Error getting performance metrics:', error);
      return {
        avg_response_time_ms: 0,
        api_calls_last_24h: 0,
        error_rate_percentage: 0,
        database_connection: 'unhealthy'
      };
    }
  }

  /**
   * Test token refresh functionality
   */
  async testTokenRefresh(): Promise<{ success: boolean; message: string; details?: any }> {
    try {
      console.log('🧪 Testing token refresh functionality...');
      
      const { data: tokenStatus, error } = await supabase.rpc('get_zoho_token_status');
      
      if (error) {
        return {
          success: false,
          message: 'Failed to get token status',
          details: { error }
        };
      }

      if (!tokenStatus.has_refresh_token) {
        return {
          success: false,
          message: 'No refresh token available for testing',
          details: { tokenStatus }
        };
      }

      // Get refresh token
      const { data: tokens, error: tokenError } = await supabase
        .from('zoho_tokens')
        .select('refresh_token')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .single();

      if (tokenError || !tokens?.refresh_token) {
        return {
          success: false,
          message: 'Failed to retrieve refresh token',
          details: { tokenError }
        };
      }

      // Attempt to refresh token
      const newAccessToken = await this.refreshAccessToken(tokens.refresh_token);
      
      if (newAccessToken) {
        return {
          success: true,
          message: 'Token refresh test successful',
          details: { newTokenLength: newAccessToken.length }
        };
      } else {
        return {
          success: false,
          message: 'Token refresh test failed',
          details: { refreshTokenExists: true }
        };
      }

    } catch (error) {
      console.error('❌ Error testing token refresh:', error);
      return {
        success: false,
        message: 'Token refresh test error',
        details: { error: error instanceof Error ? error.message : 'Unknown error' }
      };
    }
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  /**
   * Store lead data in Supabase
   */
  async storeLeadData(leadData: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    source: 'quote_form' | 'chatbot';
    product_name?: string;
    product_url?: string;
  }): Promise<string> {
    try {
      console.log('📝 Storing lead data:', { name: leadData.name, email: leadData.email, source: leadData.source });
      
      const { data, error } = await supabase
        .from('zoho_leads')
        .insert({
          name: leadData.name.trim(),
          email: leadData.email.trim().toLowerCase(),
          phone: leadData.phone?.trim() || null,
          company: leadData.company?.trim() || null,
          message: leadData.message.trim(),
          source: leadData.source,
          product_name: leadData.product_name?.trim() || null,
          product_url: leadData.product_url?.trim() || null,
          sent_to_zoho: false,
          processing_status: 'pending',
          retry_count: 0
        })
        .select('id')
        .single();

      if (error) {
        console.error('❌ Error storing lead data:', error);
        throw error;
      }

      console.log('✅ Lead data stored successfully with ID:', data.id);
      return data.id;
    } catch (error) {
      console.error('❌ Failed to store lead data:', error);
      throw error;
    }
  }

  /**
   * Get processing statistics
   */
  async getProcessingStats(): Promise<{
    total: number;
    pending: number;
    sent: number;
    failed: number;
    retry: number;
    success_rate: number;
  }> {
    try {
      const { data, error } = await supabase.rpc('get_lead_processing_stats');
      
      if (error) {
        console.error('❌ Error getting processing stats:', error);
        return {
          total: 0,
          pending: 0,
          sent: 0,
          failed: 0,
          retry: 0,
          success_rate: 0
        };
      }

      return data || {
        total: 0,
        pending: 0,
        sent: 0,
        failed: 0,
        retry: 0,
        success_rate: 0
      };
    } catch (error) {
      console.error('❌ Error getting processing stats:', error);
      return {
        total: 0,
        pending: 0,
        sent: 0,
        failed: 0,
        retry: 0,
        success_rate: 0
      };
    }
  }
}

// Export singleton instance
export const unifiedZohoIntegration = new UnifiedZohoIntegrationService();
