# 🇮🇳 Zoho India Data Center Configuration

## ✅ Issue Identified
Your Zoho app exists in the **India (.in) data center**, not the global (.com) data center.

## 🔧 IMMEDIATE FIX REQUIRED

### Update Vercel Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

**Change these two variables:**

| Variable Name | OLD Value | NEW Value |
|---------------|-----------|-----------|
| `ZOHO_ACCOUNTS_URL` | `https://accounts.zoho.com` | `https://accounts.zoho.in` |
| `ZOHO_API_DOMAIN` | `https://www.zohoapis.com` | `https://www.zohoapis.in` |

**Keep all other variables unchanged:**
- ✅ `ZOHO_CLIENT_ID=1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD`
- ✅ `ZOHO_CLIENT_SECRET=9939a4e704fcbe859813bc379d9b61d00af978d5a9`
- ✅ `ZOHO_REDIRECT_URI=https://infinitysols.vercel.app/api/oauth/callback`
- ✅ `ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ`
- ✅ `ZOHO_OAUTH_STATE=infinity_automated_solutions_2024`

### Update Local .env.local

```bash
NEXT_PUBLIC_SUPABASE_URL=https://zxvhgpejwgrlxksnqtxk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU

ZOHO_CLIENT_ID=1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD
ZOHO_CLIENT_SECRET=9939a4e704fcbe859813bc379d9b61d00af978d5a9
ZOHO_REDIRECT_URI=http://localhost:3000/api/oauth/callback
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
ZOHO_API_DOMAIN=https://www.zohoapis.in
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024
NODE_ENV=development
DEBUG_ZOHO=true
```

## 🧪 After Making Changes

Wait 2-3 minutes for Vercel to redeploy, then test:

1. **Environment Check**: https://infinitysols.vercel.app/debug-env
2. **OAuth Test**: https://infinitysols.vercel.app/test-oauth-minimal
3. **Full Integration**: https://infinitysols.vercel.app/test-zoho
4. **Quote Form**: https://infinitysols.vercel.app/products/cartoning/acm-100/

## ✅ Expected Results

- ✅ OAuth URLs should work without errors
- ✅ Authentication should complete successfully  
- ✅ Quote forms should connect to Zoho CRM India
- ✅ Leads should appear in your Zoho CRM account

## 📍 Important Links for India Data Center

- **Zoho API Console**: https://api-console.zoho.in/
- **Zoho CRM**: https://crm.zoho.in/
- **OAuth URL**: https://accounts.zoho.in/oauth/v2/auth

Make these changes and your integration will work perfectly! 🎉
