# Automated Zoho CRM Integration System

## 🕘 Daily Schedule (IST)

### 8:59 AM IST - Token Refresh
- **Endpoint**: `POST /api/refresh-token-daily`
- **Action**: Automatically refreshes Zoho access token using refresh token
- **Purpose**: Ensures fresh authentication for the day's operations
- **Authentication**: Requires `CRON_SECRET_KEY` in Authorization header

### 9:00 AM IST - Lead Processing
- **Endpoint**: `POST /api/process-stored-leads`
- **Action**: Processes all pending leads from Supabase and sends to Zoho CRM
- **Purpose**: Sends leads collected during off-hours (10 AM - 9 AM IST)
- **Authentication**: Requires `CRON_SECRET_KEY` in Authorization header

## 📋 Form Behavior

### Time-Based Routing
- **9:00 AM - 10:00 AM IST**: Direct submission to Zoho CRM
- **10:00 AM - 9:00 AM IST**: Storage in Supabase for next-day processing

### Form Fields (Simplified)
- **Name** (Full name)
- **Email**
- **Phone**
- **Message/Description**

## 🔧 Setup Instructions

### 1. Environment Variables
```env
# Zoho Configuration
ZOHO_CLIENT_ID=your_client_id
ZOHO_CLIENT_SECRET=your_client_secret
ZOHO_ACCOUNTS_URL=https://accounts.zoho.in
ZOHO_API_DOMAIN=https://www.zohoapis.in
ZOHO_REDIRECT_URI=https://yourdomain.com/api/oauth/callback

# Cron Security
CRON_SECRET_KEY=your_secure_random_key

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### 2. Initial Authentication (One-time)
1. Visit `/test-zoho` page
2. Complete OAuth flow
3. Refresh token will be stored permanently

### 3. Cron Job Setup
Set up two daily cron jobs:

#### 8:59 AM IST - Token Refresh
```bash
# Cron expression: 59 8 * * *
curl -X POST https://yourdomain.com/api/refresh-token-daily \
  -H "Authorization: Bearer YOUR_CRON_SECRET_KEY"
```

#### 9:00 AM IST - Lead Processing
```bash
# Cron expression: 0 9 * * *
curl -X POST https://yourdomain.com/api/process-stored-leads \
  -H "Authorization: Bearer YOUR_CRON_SECRET_KEY"
```

## 🔄 System Flow

```
Daily Schedule:
8:59 AM IST → Token Refresh → Fresh Access Token
9:00 AM IST → Process Stored Leads → Supabase → Zoho CRM

Form Submissions:
9-10 AM IST → Direct to Zoho CRM
10 AM-9 AM IST → Store in Supabase → Next day 9 AM → Zoho CRM
```

## 📊 Monitoring

### Check Token Status
```bash
curl -X GET https://yourdomain.com/api/refresh-token-daily \
  -H "Authorization: Bearer YOUR_CRON_SECRET_KEY"
```

### Manual Processing (if needed)
```bash
curl -X POST https://yourdomain.com/api/process-stored-leads \
  -H "Authorization: Bearer YOUR_CRON_SECRET_KEY"
```

## 🛡️ Security Features

- **Cron Authentication**: All automated endpoints require `CRON_SECRET_KEY`
- **Token Management**: Automatic refresh with permanent refresh token
- **Error Handling**: Comprehensive logging and error recovery
- **Data Validation**: Input sanitization and validation

## 📝 Logging

The system provides detailed logging with emojis for easy monitoring:
- 🔄 Token refresh operations
- 📊 Lead processing statistics
- ✅ Successful operations
- ❌ Error conditions
- ℹ️ Informational messages

## 🚀 Benefits

1. **Fully Automated**: No manual intervention required after initial setup
2. **Time-Optimized**: Fresh tokens before processing window
3. **Reliable**: Supabase backup ensures no data loss
4. **Scalable**: Handles multiple leads efficiently
5. **Secure**: Proper authentication and validation

## 🔧 Troubleshooting

### Token Refresh Issues
- Check refresh token exists in storage
- Verify Zoho credentials are correct
- Ensure cron job is running at 8:59 AM IST

### Lead Processing Issues
- Verify access token is fresh (from 8:59 AM refresh)
- Check Supabase connection
- Review logs for specific error messages

### Manual Override
If automated system fails, you can manually trigger:
1. Token refresh: `GET /api/refresh-token-daily`
2. Lead processing: `POST /api/process-stored-leads`
