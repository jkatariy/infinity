import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

export interface StoredZohoTokens {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number; // epoch seconds
}

const TOKEN_FILE_PATH = path.resolve(process.cwd(), 'zoho_tokens.json');
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only secure key
);

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
    const { data, error } = await supabase
      .from('zoho_tokens')
      .select('*')
      .limit(1)
      .maybeSingle();
    if (error) throw error;
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
  } catch {}
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
      access_token: merged.accessToken ?? null,
      refresh_token: merged.refreshToken ?? null,
      access_token_expires_at: merged.accessTokenExpiresAt
        ? new Date(merged.accessTokenExpiresAt * 1000).toISOString()
        : null,
      updated_at: new Date().toISOString(),
    };
    // Upsert single row
    const { error } = await supabase
      .from('zoho_tokens')
      .upsert(payload, { onConflict: 'id' });
    if (error) throw error;
  } catch {
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


