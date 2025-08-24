# Zoho CRM Integration Setup Guide

## 🔧 Environment Variables Required

Create a `.env.local` file in your project root with the following variables:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://zxvhgpejwgrlxksnqtxk.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Zoho CRM Configuration
ZOHO_CLIENT_ID=your_zoho_client_id_here
ZOHO_CLIENT_SECRET=your_zoho_client_secret_here
ZOHO_ACCOUNTS_URL=https://accounts.zoho.com
ZOHO_API_DOMAIN=https://www.zohoapis.com
ZOHO_REDIRECT_URI=https://your-domain.com/api/zoho/callback

# Vercel Configuration (for cron jobs)
VERCEL_URL=https://your-domain.com
VERCEL_CRON_SECRET=your_cron_secret_here

# Optional: Zoho CRM Organization ID (if you have multiple orgs)
ZOHO_ORGANIZATION_ID=your_org_id_here
```

## 🚀 Zoho CRM App Setup

### 1. Create Zoho CRM App
1. Go to [Zoho Developer Console](https://api-console.zoho.com/)
2. Click "Add Client"
3. Choose "Self-Client"
4. Fill in the details:
   - Client Name: Your App Name
   - Homepage URL: https://your-domain.com
   - Authorized Redirect URIs: https://your-domain.com/api/zoho/callback
5. Save and note your Client ID and Client Secret

### 2. Configure Scopes
Add these scopes to your Zoho app:
- `ZohoCRM.modules.ALL`
- `ZohoCRM.settings.ALL`
- `ZohoCRM.users.READ`

## 🔐 Initial Authentication

### 1. First-Time Setup
1. Deploy your application
2. Visit: `https://your-domain.com/api/zoho/auth`
3. Complete the OAuth flow
4. The system will automatically store and refresh tokens

### 2. Verify Authentication
Visit: `https://your-domain.com/dashboard/zoho-integration`
- Check token status
- Verify system health
- Test lead processing

## 📊 Dashboard Access

The monitoring dashboard is available at:
- **URL**: `/dashboard/zoho-integration`
- **Features**:
  - Real-time system health
  - Lead processing statistics
  - Token management
  - Manual operations

## 🔄 Automatic Operations

### Cron Jobs
The system runs automatic operations via Vercel cron jobs:
- **Schedule**: 9 AM and 9 PM UTC daily
- **Functions**:
  - Token refresh
  - Lead processing
  - System cleanup
  - Health checks

### Manual Operations
Available via the dashboard:
- Process pending leads
- Refresh tokens
- Reset stuck leads
- View system metrics

## 🛠️ Testing

### 1. Test Lead Creation
```bash
curl -X POST https://your-domain.com/api/unified-zoho \
  -H "Content-Type: application/json" \
  -d '{
    "action": "create_lead",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "+1234567890",
      "message": "Test message",
      "source": "quote_form"
    }
  }'
```

### 2. Test System Health
```bash
curl https://your-domain.com/api/unified-zoho?action=get_system_health
```

## 🔍 Monitoring

### Key Metrics to Monitor
1. **Token Status**: Ensure tokens are valid and auto-refreshing
2. **Lead Processing**: Check success rates and error counts
3. **System Health**: Monitor overall system status
4. **Error Logs**: Review failed operations

### Alerts
The system provides real-time alerts for:
- Token expiration
- High failure rates
- System degradation
- Processing delays

## 🚨 Troubleshooting

### Common Issues

1. **Token Expired**
   - Visit dashboard and click "Refresh Token"
   - Check environment variables

2. **Leads Not Processing**
   - Check processing status in dashboard
   - Verify Zoho CRM permissions
   - Review error logs

3. **Database Connection Issues**
   - Verify Supabase URL and service role key
   - Check database functions exist

### Support
For issues not covered here:
1. Check the dashboard for detailed error messages
2. Review system logs
3. Verify all environment variables are set correctly

## ✅ Verification Checklist

- [ ] Environment variables configured
- [ ] Zoho CRM app created and configured
- [ ] Initial authentication completed
- [ ] Dashboard accessible and showing healthy status
- [ ] Test lead creation successful
- [ ] Cron jobs running (check Vercel logs)
- [ ] Token auto-refresh working
- [ ] Lead processing successful

## 🔄 Maintenance

### Regular Tasks
1. **Weekly**: Review system health dashboard
2. **Monthly**: Check Zoho CRM app settings
3. **Quarterly**: Review and update scopes if needed

### Updates
- Monitor for Zoho API changes
- Update integration code as needed
- Test thoroughly after any changes
