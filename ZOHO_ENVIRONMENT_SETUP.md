# Zoho CRM Integration - Environment Variables Setup

This document outlines the required environment variables for the Zoho CRM integration in your Vercel project.

## Required Environment Variables

Add these variables to your `.env.local` file for local development and to your Vercel project settings for production.

### Zoho OAuth Configuration

```bash
# Zoho Client Credentials (from Zoho API Console)
ZOHO_CLIENT_ID=your_zoho_client_id_here
ZOHO_CLIENT_SECRET=your_zoho_client_secret_here

# OAuth Redirect URI (must match exactly in Zoho API Console)
ZOHO_REDIRECT_URI=https://your-domain.vercel.app/api/oauth/callback
# For local development:
# ZOHO_REDIRECT_URI=http://localhost:3000/api/oauth/callback

# Zoho Data Center URLs (choose based on your Zoho account region)
# For .com accounts (Global):
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com

# For .eu accounts (Europe):
# ZOHO_ACCOUNTS_URL=https://accounts.zoho.eu
# ZOHO_API_DOMAIN=https://www.zohoapis.eu

# For .in accounts (India):
# ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
# ZOHO_API_DOMAIN=https://www.zohoapis.in

# For .com.au accounts (Australia):
# ZOHO_ACCOUNTS_URL=https://accounts.zoho.com.au
# ZOHO_API_DOMAIN=https://www.zohoapis.com.au

# For .jp accounts (Japan):
# ZOHO_ACCOUNTS_URL=https://accounts.zoho.jp
# ZOHO_API_DOMAIN=https://www.zohoapis.jp

# OAuth Scope (permissions required)
ZOHO_SCOPE=ZohoCRM.modules.ALL,ZohoCRM.settings.ALL,ZohoCRM.users.READ

# Optional: OAuth State for CSRF protection
ZOHO_OAUTH_STATE=your_random_state_string_here
```

## Setup Instructions

### 1. Create Zoho API Console Application

1. Go to [Zoho API Console](https://api-console.zoho.com/)
2. Click "Create App"
3. Choose "Server-based Applications"
4. Fill in the details:
   - **App Name**: Your app name (e.g., "Infinity Automated Solutions CRM")
   - **Homepage URL**: Your website URL
   - **Authorized Redirect URI**: `https://your-domain.vercel.app/api/oauth/callback`
5. Note down the **Client ID** and **Client Secret**

### 2. Set up Environment Variables

#### For Local Development:
Create a `.env.local` file in your project root:

```bash
cp .env.example .env.local
# Edit .env.local with your Zoho credentials
```

#### For Vercel Production:
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable listed above

### 3. Configure Zoho CRM Permissions

Ensure your Zoho CRM has the following modules enabled:
- **Leads** - for storing lead information
- **Contacts** - for storing contact information
- **Accounts** - for company information
- **Custom Fields** (if needed for specific form data)

### 4. Test the Integration

1. Deploy your changes to Vercel
2. Visit `/api/oauth/authorize` to start the OAuth flow
3. Complete the authorization with Zoho
4. Test form submission with `/api/sendToZoho`

## API Endpoints

### OAuth Flow
- `GET /api/oauth/authorize` - Redirects to Zoho authorization
- `POST /api/oauth/authorize` - Returns authorization URL as JSON
- `GET /api/oauth/callback` - Handles Zoho's OAuth callback

### CRM Integration
- `POST /api/sendToZoho` - Sends form data to Zoho CRM
- `GET /api/sendToZoho` - Checks authentication status

## Form Data Structure

When sending data to `/api/sendToZoho`, use this structure:

```javascript
const formData = {
  // Required fields
  email: "customer@example.com",
  lastName: "Smith",
  
  // Optional fields
  firstName: "John",
  phone: "+91-9876543210",
  company: "Example Corp",
  
  // Lead-specific fields
  leadSource: "Website",
  industry: "Manufacturing",
  budgetRange: "10-50 Lakhs",
  timeline: "3-6 months",
  
  // Product-specific fields
  productInterest: "Cartoning Machines",
  machineType: "ACM-100",
  inquiryType: "Product Demo",
  
  // Address fields
  street: "123 Business St",
  city: "Mumbai",
  state: "Maharashtra",
  zipCode: "400001",
  country: "India",
  
  // Additional info
  message: "Interested in automated packaging solutions",
  additionalRequirements: "Need customization for food products",
  
  // Record type (optional, defaults to "Leads")
  recordType: "Leads" // or "Contacts"
};

// Send to API
const response = await fetch('/api/sendToZoho', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData),
});
```

## Security Notes

1. **Never expose credentials**: Keep Client ID and Secret secure
2. **Use HTTPS**: Always use HTTPS in production
3. **Validate input**: Server-side validation is implemented
4. **Token security**: Access tokens are stored in HTTP-only cookies
5. **State parameter**: Used for CSRF protection

## Troubleshooting

### Common Issues:

1. **"Invalid redirect URI"**
   - Ensure `ZOHO_REDIRECT_URI` exactly matches the URI in Zoho API Console
   - Include the protocol (https://) and exact path

2. **"Invalid client credentials"**
   - Double-check `ZOHO_CLIENT_ID` and `ZOHO_CLIENT_SECRET`
   - Ensure no extra spaces or characters

3. **"Authentication required"**
   - Complete the OAuth flow first by visiting `/api/oauth/authorize`
   - Check if tokens have expired

4. **"API domain error"**
   - Ensure `ZOHO_API_DOMAIN` matches your Zoho account region
   - Check if you're using the correct data center URL

### Debug Mode:
Enable detailed logging by adding:
```bash
DEBUG_ZOHO=true
```

## Custom Fields Setup

If you need custom fields in Zoho CRM:

1. Go to Zoho CRM → Settings → Customization → Modules
2. Select "Leads" or "Contacts"
3. Add custom fields like:
   - Product Interest (Picklist)
   - Machine Type (Picklist)
   - Budget Range (Picklist)
   - Timeline (Picklist)
   - Inquiry Type (Picklist)

Update the field API names in the code accordingly.
