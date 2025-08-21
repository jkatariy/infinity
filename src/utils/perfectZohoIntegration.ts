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
  supabaseUrl || 'https://zxvhgpejwgrlxksnqtxk.supabase.co',
  supabaseKey || 'fallback-key'
);

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
}

interface LeadProcessingResult {
  success: boolean;
  zohoLeadId?: string;
  zohoContactId?: string;
  error?: string;
  retryable: boolean;
}

interface PendingLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: string;
  product_name?: string;
  product_url?: string;
  created_at: string;
  retry_count: number;
  table_source: string;
}

interface SystemHealth {
  timestamp: string;
  token_status: any;
  lead_processing: any;
  environment: {
    has_client_id: boolean;
    has_client_secret: boolean;
    has_accounts_url: boolean;
    has_api_domain: boolean;
  };
  system_status: {
    token_valid: boolean;
    can_refresh: boolean;
    leads_pending: number;
    overall_success_rate: number;
  };
}

class PerfectZohoIntegrationService {
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second
  private readonly ZOHO_API_TIMEOUT = 30000; // 30 seconds
  private readonly TOKEN_REFRESH_BUFFER = 600; // 10 minutes buffer

  /**
   * PERFECT: Get valid access token with automatic refresh and comprehensive error handling
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
   * PERFECT: Validate environment variables
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
      console.error(`❌ Missing environment variables: ${missingVars.join(', ')}`);
      return false;
    }

    return true;
  }

  /**
   * PERFECT: Refresh access token with comprehensive error handling
   */
  async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      console.log('🔄 Refreshing Zoho access token...');
      
      if (!refreshToken) {
        console.error('❌ No refresh token provided');
        return null;
      }
      
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
        console.error('❌ Failed to refresh token:', errorText);
        
        // Handle specific error cases
        if (response.status === 400) {
          console.error('❌ Invalid refresh token - manual re-authentication required');
        } else if (response.status === 429) {
          console.error('❌ Rate limited - will retry later');
        }
        
        return null;
      }

      const data: ZohoTokenResponse = await response.json();
      
      if (!data.access_token) {
        console.error('❌ No access token in response');
        return null;
      }
      
      console.log('✅ Token refresh successful');
      
      // Update token in database with error handling
      await this.updateTokenInDatabase(data.access_token, refreshToken, data.expires_in);
      
      return data.access_token;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.error('❌ Token refresh request timed out');
      } else {
        console.error('❌ Error refreshing token:', error);
      }
      return null;
    }
  }

  /**
   * PERFECT: Update token in database with error handling
   */
  private async updateTokenInDatabase(
    accessToken: string, 
    refreshToken: string, 
    expiresIn: number
  ): Promise<void> {
    try {
      const { error } = await supabase.rpc('update_zoho_token', {
        p_access_token: accessToken,
        p_refresh_token: refreshToken,
        p_expires_in_seconds: expiresIn
      });

      if (error) {
        console.error('❌ Error updating token in database:', error);
        throw error;
      }

      console.log('✅ Token updated in database');
    } catch (error) {
      console.error('❌ Failed to update token in database:', error);
      throw error;
    }
  }

  /**
   * PERFECT: Send lead to Zoho CRM with comprehensive retry logic and error handling
   */
  async sendLeadToZoho(leadData: PendingLead): Promise<LeadProcessingResult> {
    let lastError: string | undefined;
    
    // Validate lead data
    if (!this.validateLeadData(leadData)) {
      return {
        success: false,
        error: 'Invalid lead data',
        retryable: false
      };
    }
    
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        console.log(`📤 Attempt ${attempt}/${this.maxRetries} to send lead: ${leadData.name}`);
        
        const accessToken = await this.getValidAccessToken();
        if (!accessToken) {
          return {
            success: false,
            error: 'No valid access token available',
            retryable: false
          };
        }

        const result = await this.createLeadInZoho(leadData, accessToken);
        
        if (result.success) {
          console.log(`✅ Lead sent successfully on attempt ${attempt}`);
          return result;
        } else {
          lastError = result.error;
          
          // Check if error is retryable
          if (!result.retryable) {
            console.log(`❌ Non-retryable error on attempt ${attempt}: ${lastError}`);
            return result;
          }
          
          // Wait before retry with exponential backoff
          if (attempt < this.maxRetries) {
            const delay = this.retryDelay * Math.pow(2, attempt - 1);
            console.log(`⏳ Waiting ${delay}ms before retry...`);
            await new Promise(resolve => setTimeout(resolve, delay));
          }
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : 'Unknown error';
        console.error(`❌ Error on attempt ${attempt}:`, lastError);
        
        // Wait before retry
        if (attempt < this.maxRetries) {
          const delay = this.retryDelay * Math.pow(2, attempt - 1);
          console.log(`⏳ Waiting ${delay}ms before retry...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    return {
      success: false,
      error: lastError || 'Max retries exceeded',
      retryable: false
    };
  }

  /**
   * PERFECT: Validate lead data
   */
  private validateLeadData(leadData: PendingLead): boolean {
    if (!leadData.name || !leadData.email || !leadData.message) {
      console.error('❌ Missing required lead data fields');
      return false;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(leadData.email)) {
      console.error('❌ Invalid email format');
      return false;
    }

    // Validate source
    if (!['quote_form', 'chatbot'].includes(leadData.source)) {
      console.error('❌ Invalid lead source');
      return false;
    }

    return true;
  }

  /**
   * PERFECT: Create lead in Zoho CRM with comprehensive error handling
   */
  private async createLeadInZoho(leadData: PendingLead, accessToken: string): Promise<LeadProcessingResult> {
    try {
      // Transform lead data to Zoho format
      const nameParts = leadData.name.trim().split(/\s+/);
      const firstName = nameParts[0] || '';
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : 'Unknown';
      
      const zohoLead: ZohoLead = {
        Last_Name: lastName,
        First_Name: firstName,
        Email: leadData.email,
        Phone: leadData.phone || undefined,
        Company: leadData.company || undefined,
        Lead_Source: leadData.source === 'quote_form' ? 'Website Quote Form' : 'Chatbot Assistant',
        Description: leadData.message,
        Lead_Status: 'New',
        Rating: 'Hot',
        Product_Interest: leadData.product_name || undefined,
        Inquiry_Type: 'Quote Request',
        Additional_Requirements: leadData.message
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
          error: 'No lead ID returned from Zoho',
          retryable: true
        };
      }
      
      console.log(`✅ Lead created in Zoho with ID: ${zohoId}`);
      return {
        success: true,
        zohoLeadId: zohoId,
        retryable: false
      };
      
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out',
          retryable: true
        };
      }
      
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error('❌ Error creating lead in Zoho:', errorMessage);
      
      return {
        success: false,
        error: errorMessage,
        retryable: true
      };
    }
  }

  /**
   * PERFECT: Process all pending leads with comprehensive error handling
   */
  async processAllPendingLeads(limit: number = 20): Promise<{
    processed: number;
    successful: number;
    failed: number;
    errors: string[];
  }> {
    try {
      console.log(`🔄 Processing up to ${limit} pending leads from all sources...`);
      
      // Validate limit
      if (limit <= 0 || limit > 100) {
        throw new Error('Invalid limit: must be between 1 and 100');
      }
      
      // Get pending leads from both tables
      const { data: pendingLeads, error } = await supabase.rpc('get_all_pending_leads', {
        limit_count: limit
      });

      if (error) {
        console.error('❌ Error fetching pending leads:', error);
        throw error;
      }

      if (!pendingLeads || pendingLeads.length === 0) {
        console.log('✅ No pending leads to process');
        return { processed: 0, successful: 0, failed: 0, errors: [] };
      }

      console.log(`📋 Found ${pendingLeads.length} pending leads to process`);

      let successful = 0;
      let failed = 0;
      const errors: string[] = [];

      // Process each lead with individual error handling
      for (const lead of pendingLeads) {
        try {
          // Mark as processing
          await supabase.rpc('mark_lead_processed_universal', {
            p_lead_id: lead.id,
            p_table_source: lead.table_source,
            p_success: false,
            p_error_message: 'Processing...'
          });

          const result = await this.sendLeadToZoho(lead);
          
          // Mark as processed
          await supabase.rpc('mark_lead_processed_universal', {
            p_lead_id: lead.id,
            p_table_source: lead.table_source,
            p_success: result.success,
            p_zoho_lead_id: result.zohoLeadId,
            p_error_message: result.error,
            p_zoho_response: result.success ? { success: true, zoho_id: result.zohoLeadId } : null
          });

          if (result.success) {
            successful++;
            console.log(`✅ Lead processed successfully: ${lead.name} (${lead.email}) from ${lead.table_source}`);
          } else {
            failed++;
            errors.push(`${lead.name} (${lead.email}) from ${lead.table_source}: ${result.error}`);
            console.log(`❌ Lead processing failed: ${lead.name} (${lead.email}) from ${lead.table_source} - ${result.error}`);
          }
        } catch (error) {
          failed++;
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          errors.push(`${lead.name} (${lead.email}) from ${lead.table_source}: ${errorMsg}`);
          console.log(`❌ Error processing lead: ${lead.name} (${lead.email}) from ${lead.table_source} - ${errorMsg}`);
        }
      }

      console.log(`✅ Lead processing completed: ${successful} successful, ${failed} failed`);
      
      return {
        processed: pendingLeads.length,
        successful,
        failed,
        errors
      };

    } catch (error) {
      console.error('❌ Error in processAllPendingLeads:', error);
      throw error;
    }
  }

  /**
   * PERFECT: Get comprehensive system health status with error handling
   */
  async getPerfectHealthStatus(): Promise<SystemHealth> {
    try {
      const [tokenStatus, leadStats] = await Promise.all([
        supabase.rpc('get_zoho_token_status'),
        supabase.rpc('get_comprehensive_lead_stats')
      ]);

      return {
        timestamp: new Date().toISOString(),
        token_status: tokenStatus.data,
        lead_processing: leadStats.data,
        environment: {
          has_client_id: !!process.env.ZOHO_CLIENT_ID,
          has_client_secret: !!process.env.ZOHO_CLIENT_SECRET,
          has_accounts_url: !!process.env.ZOHO_ACCOUNTS_URL,
          has_api_domain: !!process.env.ZOHO_API_DOMAIN
        },
        system_status: {
          token_valid: tokenStatus.data?.has_token && tokenStatus.data?.has_access_token && !tokenStatus.data?.is_expired,
          can_refresh: tokenStatus.data?.has_refresh_token,
          leads_pending: (leadStats.data?.zoho_leads?.pending || 0) + (leadStats.data?.chatbot_leads?.pending || 0),
          overall_success_rate: leadStats.data?.combined?.overall_success_rate || 0
        }
      };
    } catch (error) {
      console.error('❌ Error getting perfect health status:', error);
      throw error;
    }
  }

  /**
   * PERFECT: Test token refresh functionality with comprehensive validation
   */
  async testTokenRefresh(): Promise<any> {
    try {
      const { data, error } = await supabase.rpc('test_token_refresh');
      
      if (error) {
        return {
          success: false,
          error: 'Failed to test token refresh',
          details: error
        };
      }

      return {
        success: true,
        test_results: data,
        can_refresh: data?.refresh_token_exists || false,
        environment_ready: data?.client_id_exists && data?.client_secret_exists
      };
    } catch (error) {
      console.error('❌ Error testing token refresh:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * PERFECT: Emergency token refresh for critical situations
   */
  async emergencyTokenRefresh(): Promise<boolean> {
    try {
      console.log('🚨 Emergency token refresh initiated...');
      
      const { data: tokens, error } = await supabase
        .from('zoho_tokens')
        .select('refresh_token')
        .eq('id', '00000000-0000-0000-0000-000000000000')
        .single();

      if (error || !tokens?.refresh_token) {
        console.error('❌ No refresh token available for emergency refresh');
        return false;
      }

      const newToken = await this.refreshAccessToken(tokens.refresh_token);
      return !!newToken;
    } catch (error) {
      console.error('❌ Emergency token refresh failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const perfectZohoIntegration = new PerfectZohoIntegrationService();
