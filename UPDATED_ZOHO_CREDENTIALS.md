# 🎯 Updated Zoho Credentials - Ready to Use!

## ✅ New Credentials Received
- **Client ID**: `1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD`
- **Client Secret**: `9939a4e704fcbe859813bc379d9b61d00af978d5a9`

## 🚀 STEP 1: Update Vercel Environment Variables

Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**

Replace these variables with the new values:

```bash
ZOHO_CLIENT_ID=1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD
ZOHO_CLIENT_SECRET=9939a4e704fcbe859813bc379d9b61d00af978d5a9
ZOHO_REDIRECT_URI=https://infinitysols.vercel.app/api/oauth/callback
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024
NODE_ENV=production
```

## 💻 STEP 2: Update Local .env.local File

Replace the content of your `.env.local` file with:

```bash
# Supabase (existing)
NEXT_PUBLIC_SUPABASE_URL=https://zxvhgpejwgrlxksnqtxk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhnc2VqadilyaGrsbnFxdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU

# Updated Zoho Credentials
ZOHO_CLIENT_ID=1000.KPNB9RXVFZUD4HYFM8KZH32PF1MWDD
ZOHO_CLIENT_SECRET=9939a4e704fcbe859813bc379d9b61d00af978d5a9
ZOHO_REDIRECT_URI=http://localhost:3000/api/oauth/callback
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024
NODE_ENV=development
DEBUG_ZOHO=true
```

## 🧪 STEP 3: Test the New Setup

After updating the environment variables:

### **Immediate Tests (Production):**
1. **Environment Check**: https://infinitysols.vercel.app/debug-env
2. **OAuth Test**: https://infinitysols.vercel.app/test-oauth-minimal
3. **Full Integration**: https://infinitysols.vercel.app/test-zoho
4. **Quote Form**: https://infinitysols.vercel.app/products/cartoning/acm-100/

### **Local Development Tests:**
```bash
# After updating .env.local
npm run dev

# Then test:
# http://localhost:3000/debug-env
# http://localhost:3000/test-zoho
# http://localhost:3000/products/cartoning/acm-100/
```

## ✅ Expected Results

After updating the credentials:

1. **debug-env page** should show the new Client ID
2. **OAuth URLs** should work without "Invalid Client" error
3. **Authentication flow** should complete successfully
4. **Quote forms** should connect to Zoho CRM
5. **Leads** should appear in your Zoho CRM

## 🚨 Important Notes

- **Vercel Auto-Deploy**: After updating environment variables, Vercel will automatically redeploy
- **Wait 2-3 minutes** for deployment to complete before testing
- **Clear browser cache** if you encounter any issues
- **Use incognito/private mode** for testing to avoid cached errors

## 🎉 Once Working

Your quote request forms will:
- ✅ Show "Connected to Zoho CRM" status
- ✅ Submit leads directly to your Zoho CRM
- ✅ Provide reference IDs for tracking
- ✅ Include structured data (budget, timeline, product info)
- ✅ Automatically categorize leads as "Hot" quote requests

## 🔄 Next Steps After Setup

1. Test a real quote submission
2. Check your Zoho CRM for the new lead
3. Verify all form data is captured correctly
4. Set up any additional CRM workflows if needed
