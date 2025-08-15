# 🔧 Zoho CRM Setup with Your Credentials

## Step 1: Create Local Environment File

Create a new file called `.env.local` in your project root with the following content:

```bash
# Zoho CRM Integration Environment Variables
ZOHO_CLIENT_ID=1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK
ZOHO_CLIENT_SECRET=6eb1dfd83a0d59342a462e0eb426a2ca6541992416

# OAuth Redirect URI (for local development)
ZOHO_REDIRECT_URI=http://localhost:3000/api/oauth/callback

# Zoho Data Center URLs (India/.com accounts)
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com

# OAuth Scope
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ

# OAuth State for security
ZOHO_OAUTH_STATE=infinity_automated_solutions_2024

# Environment
NODE_ENV=development

# Debug mode
DEBUG_ZOHO=true
```

## Step 2: Configure Zoho API Console

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Sign in with your Zoho account
3. Click on your existing app or create a new one
4. Add these **Authorized Redirect URIs**:
   - `http://localhost:3000/api/oauth/callback` (for development)
   - `https://infinitysols.com/api/oauth/callback` (for production)
   - `https://your-vercel-app.vercel.app/api/oauth/callback` (if using Vercel subdomain)

## Step 3: Vercel Production Setup

Add these environment variables to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable:

| Variable Name | Value |
|---------------|-------|
| `ZOHO_CLIENT_ID` | `1000.TKUXCBXBHUT60VWCH5NL63BX11L9ZK` |
| `ZOHO_CLIENT_SECRET` | `6eb1dfd83a0d59342a462e0eb426a2ca6541992416` |
| `ZOHO_REDIRECT_URI` | `https://infinitysols.com/api/oauth/callback` |
| `ZOHO_ACCOUNTS_URL` | `https://accounts.zoho.com` |
| `ZOHO_API_DOMAIN` | `https://www.zohoapis.com` |
| `ZOHO_SCOPE` | `ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ` |
| `ZOHO_OAUTH_STATE` | `infinity_automated_solutions_2024` |

## Step 4: Test the Integration

### Local Testing:
1. Start your development server: `npm run dev`
2. Visit: `http://localhost:3000/api/oauth/authorize`
3. Complete the Zoho authorization
4. Test form submission to `/api/sendToZoho`

### Production Testing:
1. Deploy to Vercel
2. Visit: `https://infinitysols.com/api/oauth/authorize`
3. Complete authorization
4. Test your contact forms

## Step 5: Update Your Forms

Add this to your existing form components:

```typescript
import { sendToZohoCRM, transformFormData } from '@/utils/zohoIntegration';

const handleFormSubmit = async (formData) => {
  try {
    // Transform your form data to Zoho format
    const zohoData = transformFormData(formData, 'contact'); // or 'quote', 'demo', etc.
    
    // Send to Zoho CRM
    const result = await sendToZohoCRM(zohoData);
    
    if (result.success) {
      console.log('Lead created in Zoho:', result.zohoId);
      // Show success message to user
    } else {
      console.error('Zoho error:', result.error);
      // Handle error (maybe fallback to email)
    }
  } catch (error) {
    console.error('Form submission error:', error);
  }
};
```

## Authentication Flow URLs

- **Start OAuth**: `/api/oauth/authorize`
- **Callback**: `/api/oauth/callback` (Zoho redirects here)
- **Send Data**: `/api/sendToZoho` (POST)
- **Check Auth**: `/api/sendToZoho` (GET)

## Security Notes

✅ **Client Secret is secure** - Only used on server-side
✅ **Tokens stored in HTTP-only cookies** - Not accessible via JavaScript
✅ **State parameter** - Prevents CSRF attacks
✅ **Redirect URI validation** - Must match exactly in Zoho console

## Quick Commands

```bash
# Create .env.local file
touch .env.local

# Add content to .env.local (copy from Step 1 above)
# Then restart your development server

# Test OAuth flow
curl http://localhost:3000/api/oauth/authorize

# Test data submission
curl -X POST http://localhost:3000/api/sendToZoho \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","lastName":"Test","firstName":"User"}'
```

## Next Steps

1. ✅ Create `.env.local` file with the credentials above
2. ✅ Configure Zoho API Console redirect URIs  
3. ✅ Add environment variables to Vercel
4. ✅ Test the OAuth flow
5. ✅ Integrate with your existing forms

Your Zoho CRM integration is ready to go! 🚀
