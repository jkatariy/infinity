import fs from 'fs';
import path from 'path';

export interface StoredZohoTokens {
  accessToken?: string;
  refreshToken?: string;
  accessTokenExpiresAt?: number; // epoch seconds
}

const TOKEN_FILE_PATH = path.resolve(process.cwd(), 'zoho_tokens.json');

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

export function getStoredTokens(): StoredZohoTokens | null {
  const raw = readFileSafe(TOKEN_FILE_PATH);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredZohoTokens;
    return parsed;
  } catch {
    return null;
  }
}

export function saveStoredTokens(tokens: StoredZohoTokens): void {
  const current = getStoredTokens() || {};
  const merged: StoredZohoTokens = {
    ...current,
    ...tokens,
  };
  writeFileSafe(TOKEN_FILE_PATH, JSON.stringify(merged, null, 2));
}

export function getAccessToken(): string | undefined {
  return getStoredTokens()?.accessToken;
}

export function getRefreshToken(): string | undefined {
  return getStoredTokens()?.refreshToken;
}

export function setAccessToken(accessToken: string, expiresInSeconds?: number): void {
  const nowSeconds = Math.floor(Date.now() / 1000);
  const expiresAt = expiresInSeconds ? nowSeconds + expiresInSeconds : undefined;
  saveStoredTokens({ accessToken, accessTokenExpiresAt: expiresAt });
}

export function setRefreshToken(refreshToken: string): void {
  saveStoredTokens({ refreshToken });
}

export function isAccessTokenValid(): boolean {
  const tokens = getStoredTokens();
  if (!tokens?.accessToken) return false;
  if (!tokens.accessTokenExpiresAt) return true; // if unknown expiry, assume valid and rely on API test
  const now = Math.floor(Date.now() / 1000);
  return tokens.accessTokenExpiresAt - 30 > now; // 30s buffer
}


