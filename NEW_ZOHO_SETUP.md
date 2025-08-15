# 🔧 NEW Zoho App Setup Instructions

## ❌ Issue Identified
The current Client ID `1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK` does not exist in your Zoho account.

## ✅ Solution: Create New Zoho App

### Step 1: Create New App in Zoho API Console

1. **Go to**: https://api-console.zoho.com/
2. **Sign in** with your Zoho account
3. **Click "Add Client"**
4. **Select "Server-based Applications"**
5. **Fill in details:**
   ```
   Client Name: Infinity Automated Solutions CRM
   Homepage URL: https://infinitysols.vercel.app
   
   Authorized Redirect URIs:
   https://infinitysols.vercel.app/api/oauth/callback
   http://localhost:3000/api/oauth/callback
   ```
6. **Click "Create"**
7. **Copy the new Client ID and Client Secret**

### Step 2: Update Vercel Environment Variables

Replace the old variables in your Vercel project with:

```bash
ZOHO_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
ZOHO_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET_HERE
ZOHO_REDIRECT_URI=https://infinitysols.vercel.app/api/oauth/callback
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024
NODE_ENV=production
```

### Step 3: Update Local Environment

Update your `.env.local` file:

```bash
ZOHO_CLIENT_ID=YOUR_NEW_CLIENT_ID_HERE
ZOHO_CLIENT_SECRET=YOUR_NEW_CLIENT_SECRET_HERE
ZOHO_REDIRECT_URI=http://localhost:3000/api/oauth/callback
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024
NODE_ENV=development
DEBUG_ZOHO=true
```

### Step 4: Test the New Setup

After updating environment variables:

1. **Check Environment**: https://infinitysols.vercel.app/debug-env
2. **Test OAuth**: https://infinitysols.vercel.app/test-oauth-minimal
3. **Test Quote Form**: https://infinitysols.vercel.app/products/cartoning/acm-100/

### Step 5: Verification Checklist

- ✅ New app created in Zoho API Console
- ✅ Redirect URIs configured correctly
- ✅ Environment variables updated in Vercel
- ✅ Local environment updated
- ✅ OAuth flow working
- ✅ Quote forms connecting to Zoho CRM

## 🎯 Important Notes

1. **Data Center**: Make sure you're creating the app in the correct Zoho data center (.com, .eu, .in, etc.)
2. **Account**: Use the same Zoho account where you want the CRM data
3. **Scopes**: The app needs CRM permissions to create leads
4. **Redirect URIs**: Must match exactly (no trailing slashes)

## 🚨 Common Issues

- **Wrong redirect URI**: Must be exact match
- **Wrong data center**: Use .com for global, .eu for Europe, etc.
- **Insufficient permissions**: Make sure CRM is enabled in your Zoho account
- **Case sensitivity**: Client ID and Secret are case-sensitive
