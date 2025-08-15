# Vercel Environment Variables for infinitysols.vercel.app

## Required Environment Variables for Production

Add these **exact** environment variables to your Vercel project:

### Go to: Vercel Dashboard → Your Project → Settings → Environment Variables

```bash
ZOHO_CLIENT_ID=1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK
ZOHO_CLIENT_SECRET=6eb1dfd83a0d59342a462e0eb426a2ca6541992416
ZOHO_REDIRECT_URI=https://infinitysols.vercel.app/api/oauth/callback
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024
NODE_ENV=production
```

## Important URLs for Zoho API Console

### In Zoho API Console (https://api-console.zoho.com/), add these Authorized Redirect URIs:

```
https://infinitysols.vercel.app/api/oauth/callback
http://localhost:3000/api/oauth/callback
```

## Test URLs After Setup

- **Environment Debug**: https://infinitysols.vercel.app/debug-env
- **Zoho Test Page**: https://infinitysols.vercel.app/test-zoho
- **OAuth Authorization**: https://infinitysols.vercel.app/api/oauth/authorize
- **Quote Form Test**: https://infinitysols.vercel.app/products/cartoning/acm-100/

## Setup Checklist

1. ✅ Update Vercel environment variables (above)
2. ✅ Update Zoho API Console redirect URIs
3. ✅ Redeploy your Vercel app
4. ✅ Test authentication flow
5. ✅ Verify quote forms work
