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

class ZohoIntegrationService {
  private maxRetries = 3;
  private retryDelay = 1000; // 1 second

  /**
   * Refresh Zoho access token
   */
  async refreshAccessToken(refreshToken: string): Promise<string | null> {
    try {
      console.log('🔄 Refreshing Zoho access token...');
      
      const tokenUrl = `${process.env.ZOHO_ACCOUNTS_URL}/oauth/v2/token`;
      const params = new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.ZOHO_CLIENT_ID!,
        client_secret: process.env.ZOHO_CLIENT_SECRET!,
        refresh_token: refreshToken,
      });

      const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params.toString(),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Failed to refresh token:', errorText);
        return null;
      }

      const data: ZohoTokenResponse = await response.json();
      console.log('✅ Token refresh successful');
      
      // Update token in database
      await this.updateTokenInDatabase(data.access_token, refreshToken, data.expires_in);
      
      return data.access_token;
    } catch (error) {
      console.error('❌ Error refreshing token:', error);
      return null;
    }
  }

  /**
   * Update token in database
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
   * Get valid access token (refresh if needed)
   */
  async getValidAccessToken(): Promise<string | null> {
    try {
      // Get current token status
      const { data: tokenStatus, error } = await supabase.rpc('get_zoho_token_status');
      
      if (error) {
        console.error('❌ Error getting token status:', error);
        return null;
      }

      // If token is valid, return it
      if (tokenStatus.has_token && tokenStatus.has_access_token && !tokenStatus.is_expired) {
        console.log('✅ Using existing valid token');
        return tokenStatus.access_token;
      }

      // If token is expired but we have refresh token, try to refresh
      if (tokenStatus.has_refresh_token) {
        console.log('🔄 Token expired, attempting refresh...');
        
        // Get refresh token from database
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
        return newAccessToken;
      }

      console.error('❌ No valid token or refresh token available');
      return null;
    } catch (error) {
      console.error('❌ Error getting valid access token:', error);
      return null;
    }
  }

  /**
   * Send lead to Zoho CRM with retry logic
   */
  async sendLeadToZoho(leadData: any): Promise<LeadProcessingResult> {
    let lastError: string | undefined;
    
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
          
          // Wait before retry
          if (attempt < this.maxRetries) {
            const delay = this.retryDelay * Math.pow(2, attempt - 1); // Exponential backoff
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
   * Create lead in Zoho CRM
   */
  private async createLeadInZoho(leadData: any, accessToken: string): Promise<LeadProcessingResult> {
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
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Zoho-oauthtoken ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: [zohoLead]
        }),
      });

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
   * Process pending leads
   */
  async processPendingLeads(limit: number = 10): Promise<{
    processed: number;
    successful: number;
    failed: number;
    errors: string[];
  }> {
    try {
      console.log(`🔄 Processing up to ${limit} pending leads...`);
      
      // Get pending leads
      const { data: pendingLeads, error } = await supabase.rpc('get_pending_zoho_leads', {
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

      // Process each lead
      for (const lead of pendingLeads) {
        try {
          // Mark as processing
          await supabase.rpc('mark_lead_processed', {
            p_lead_id: lead.id,
            p_success: false,
            p_error_message: 'Processing...'
          });

          const result = await this.sendLeadToZoho(lead);
          
          // Mark as processed
          await supabase.rpc('mark_lead_processed', {
            p_lead_id: lead.id,
            p_success: result.success,
            p_zoho_lead_id: result.zohoLeadId,
            p_error_message: result.error,
            p_zoho_response: result.success ? { success: true, zoho_id: result.zohoLeadId } : null
          });

          if (result.success) {
            successful++;
            console.log(`✅ Lead processed successfully: ${lead.name} (${lead.email})`);
          } else {
            failed++;
            errors.push(`${lead.name} (${lead.email}): ${result.error}`);
            console.log(`❌ Lead processing failed: ${lead.name} (${lead.email}) - ${result.error}`);
          }
        } catch (error) {
          failed++;
          const errorMsg = error instanceof Error ? error.message : 'Unknown error';
          errors.push(`${lead.name} (${lead.email}): ${errorMsg}`);
          console.log(`❌ Error processing lead: ${lead.name} (${lead.email}) - ${errorMsg}`);
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
      console.error('❌ Error in processPendingLeads:', error);
      throw error;
    }
  }

  /**
   * Get system health status
   */
  async getHealthStatus(): Promise<any> {
    try {
      const [tokenStatus, leadStats] = await Promise.all([
        supabase.rpc('get_zoho_token_status'),
        supabase.rpc('get_lead_processing_stats')
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
        }
      };
    } catch (error) {
      console.error('❌ Error getting health status:', error);
      throw error;
    }
  }
}

// Export singleton instance
export const zohoIntegration = new ZohoIntegrationService();
