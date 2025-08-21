import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export interface StoredZohoTokens {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number; // epoch seconds
}

const TOKEN_FILE_PATH = path.resolve(process.cwd(), 'zoho_tokens.json');

// Use environment variables if available, otherwise fall back to hardcoded values
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zxvhgpejwgrlxksnqtxk.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create two clients: one for public operations and one for service role operations
const supabase = createClient(supabaseUrl, supabaseAnonKey);
const supabaseService = supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

function readFileSafe(filePath: string): string | null {
  try {
    if (!fs.existsSync(filePath)) return null;
    return fs.readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

function writeFileSafe(filePath: string, data: string): void {
  try {
    fs.writeFileSync(filePath, data, { encoding: 'utf8' });
  } catch {
    // ignore write errors silently; caller can decide fallback
  }
}

export async function getStoredTokens(): Promise<StoredZohoTokens | null> {
  // Prefer Supabase; fall back to file locally
  try {
    // Try service role client first, then fall back to anon client
    const client = supabaseService || supabase;
    
    const { data, error } = await client
      .from('zoho_tokens')
      .select('*')
      .order('updated_at', { ascending: false })
      .limit(1)
      .maybeSingle();
    
    if (error) {
      console.error('Supabase error getting tokens:', error);
      throw error;
    }
    
    if (data) {
      const tokens: StoredZohoTokens = {
        accessToken: data.access_token ?? undefined,
        refreshToken: data.refresh_token ?? undefined,
        accessTokenExpiresAt: data.access_token_expires_at
          ? Math.floor(new Date(data.access_token_expires_at).getTime() / 1000)
          : undefined,
      };
      return tokens;
    }
  } catch (error) {
    console.error('Error getting tokens from Supabase:', error);
  }
  
  // Fallback to file storage
  const raw = readFileSafe(TOKEN_FILE_PATH);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredZohoTokens;
    return parsed;
  } catch {
    return null;
  }
}

export async function saveStoredTokens(tokens: StoredZohoTokens): Promise<void> {
  const current = (await getStoredTokens()) || {};
  const merged: StoredZohoTokens = { ...current, ...tokens };
  
  try {
    const payload = {
      id: '00000000-0000-0000-0000-000000000000', // Use fixed ID for single record
      access_token: merged.accessToken ?? null,
      refresh_token: merged.refreshToken ?? null,
      access_token_expires_at: merged.accessTokenExpiresAt
        ? new Date(merged.accessTokenExpiresAt * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    };
    
    // Try service role client first, then fall back to anon client
    const client = supabaseService || supabase;
    
    // Upsert single row with fixed ID
    const { error } = await client
      .from('zoho_tokens')
      .upsert(payload, { 
        onConflict: 'id',
        ignoreDuplicates: false 
      });
      
    if (error) {
      console.error('Supabase error saving tokens:', error);
      throw error;
    }
    
    console.log('Tokens saved to Supabase successfully');
  } catch (error) {
    console.error('Error saving tokens to Supabase, falling back to file:', error);
    // Fallback to file storage
    writeFileSafe(TOKEN_FILE_PATH, JSON.stringify(merged, null, 2));
  }
}

export async function getAccessToken(): Promise<string | undefined> {
  return (await getStoredTokens())?.accessToken;
}

export async function getRefreshToken(): Promise<string | undefined> {
  return (await getStoredTokens())?.refreshToken;
}

export async function setAccessToken(accessToken: string, expiresInSeconds?: number): Promise<void> {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expiresAt = expiresInSeconds ? nowSeconds + expiresInSeconds : undefined;
  await saveStoredTokens({ accessToken, accessTokenExpiresAt: expiresAt });
}

export async function setRefreshToken(refreshToken: string): Promise<void> {
  await saveStoredTokens({ refreshToken });
}

export async function isAccessTokenValid(): Promise<boolean> {
  const tokens = await getStoredTokens();
  if (!tokens?.accessToken) return false;
  if (!tokens.accessTokenExpiresAt) return true; // if unknown expiry, assume valid
  const now = Math.floor(Date.now() / 1000);
  return tokens.accessTokenExpiresAt - 30 > now; // 30s buffer
}

// New function to clear all tokens (useful for testing or re-authentication)
export async function clearStoredTokens(): Promise<void> {
  try {
    // Try service role client first, then fall back to anon client
    const client = supabaseService || supabase;
    
    const { error } = await client
      .from('zoho_tokens')
      .update({
        access_token: null,
        refresh_token: null,
        access_token_expires_at: null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', '00000000-0000-0000-0000-000000000000');
      
    if (error) {
      console.error('Error clearing tokens from Supabase:', error);
    }
  } catch (error) {
    console.error('Error clearing tokens:', error);
  }
  
  // Also clear file storage
  try {
    if (fs.existsSync(TOKEN_FILE_PATH)) {
      fs.unlinkSync(TOKEN_FILE_PATH);
    }
  } catch {
    // ignore file deletion errors
  }
}

// New function to get token status for debugging
export async function getTokenStatus(): Promise<{
  hasAccessToken: boolean;
  hasRefreshToken: boolean;
  accessTokenValid: boolean;
  accessTokenExpiresAt?: number;
  lastUpdated?: string;
}> {
  const tokens = await getStoredTokens();
  const accessTokenValid = await isAccessTokenValid();
  
  return {
    hasAccessToken: !!tokens?.accessToken,
    hasRefreshToken: !!tokens?.refreshToken,
    accessTokenValid,
    accessTokenExpiresAt: tokens?.accessTokenExpiresAt,
    lastUpdated: tokens ? new Date().toISOString() : undefined,
  };
}

interface LeadData {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  source: 'quote_form' | 'chatbot';
  product_name?: string;
  product_url?: string;
  created_at?: string;
  sent_to_zoho?: boolean;
  zoho_lead_id?: string;
  zoho_contact_id?: string;
}

// New functions for lead data management
export async function storeLeadData(leadData: Omit<LeadData, 'id' | 'created_at' | 'sent_to_zoho'>): Promise<string> {
  try {
    console.log('Storing lead data in Supabase:', { name: leadData.name, email: leadData.email, source: leadData.source });
    
    const { data, error } = await supabase
      .from('zoho_leads')
      .insert({
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone,
        company: leadData.company,
        message: leadData.message,
        source: leadData.source,
        product_name: leadData.product_name,
        product_url: leadData.product_url,
        sent_to_zoho: false
      })
      .select('id')
      .single();

    if (error) {
      console.error('Error storing lead data in Supabase:', error);
      throw error;
    }

    console.log('Lead data stored successfully with ID:', data.id);
    return data.id;
  } catch (error) {
    console.error('Failed to store lead data in Supabase:', error);
    throw error;
  }
}

export async function getPendingLeads(): Promise<LeadData[]> {
  try {
    const { data, error } = await supabase
      .from('zoho_leads')
      .select('*')
      .eq('sent_to_zoho', false)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching pending leads:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Failed to fetch pending leads:', error);
    throw error;
  }
}

export async function markLeadAsSent(leadId: string, zohoLeadId?: string, zohoContactId?: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('zoho_leads')
      .update({
        sent_to_zoho: true,
        zoho_lead_id: zohoLeadId,
        zoho_contact_id: zohoContactId
      })
      .eq('id', leadId);

    if (error) {
      console.error('Error marking lead as sent:', error);
      throw error;
    }
  } catch (error) {
    console.error('Failed to mark lead as sent:', error);
    throw error;
  }
}

export async function updateLeadData(leadId: string, updates: Partial<Omit<LeadData, 'id' | 'created_at' | 'sent_to_zoho'>>): Promise<void> {
  try {
    const { error } = await supabase
      .from('zoho_leads')
      .update(updates)
      .eq('id', leadId);

    if (error) {
      console.error('Error updating lead data:', error);
      throw error;
    }

    console.log('Lead data updated successfully for ID:', leadId);
  } catch (error) {
    console.error('Failed to update lead data:', error);
    throw error;
  }
}

export async function getLeadStats(): Promise<{ total: number; pending: number; sent: number }> {
  try {
    const { data, error } = await supabase
      .from('zoho_leads')
      .select('sent_to_zoho');

    if (error) {
      console.error('Error fetching lead stats:', error);
      throw error;
    }

    const total = data?.length || 0;
    const sent = data?.filter(lead => lead.sent_to_zoho).length || 0;
    const pending = total - sent;

    return { total, pending, sent };
  } catch (error) {
    console.error('Failed to fetch lead stats:', error);
    throw error;
  }
}


