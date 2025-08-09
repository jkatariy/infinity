# Zoho CRM Integration Setup

This application integrates with Zoho CRM to automatically create leads from form submissions across the website.

## Configuration

The application uses the following Zoho CRM credentials:
- **Client ID**: `1000.Z977GSH51D9ZBNYE23JCCGRQO2UQGP`
- **Client Secret**: `777603b98aca45c9a8995f7d9ee2003cc1bfadd5b2`

## Environment Variables

To complete the integration, you need to set up a refresh token. Create a `.env.local` file in the root directory with:

```bash
ZOHO_REFRESH_TOKEN=your_refresh_token_here
```

## Getting the Refresh Token

1. **Authorization URL**: Visit the following URL to authorize the application:
   ```
   https://accounts.zoho.com/oauth/v2/auth?scope=ZohoCRM.modules.ALL&client_id=1000.Z977GSH51D9ZBNYE23JCCGRQO2UQGP&response_type=code&redirect_uri=http://localhost:3000&access_type=offline
   ```

2. **Get Authorization Code**: After authorization, you'll be redirected to localhost with an authorization code in the URL.

3. **Exchange for Refresh Token**: Make a POST request to get the refresh token:
   ```bash
   curl -X POST https://accounts.zoho.com/oauth/v2/token \
     -d "code=YOUR_AUTHORIZATION_CODE" \
     -d "client_id=1000.Z977GSH51D9ZBNYE23JCCGRQO2UQGP" \
     -d "client_secret=777603b98aca45c9a8995f7d9ee2003cc1bfadd5b2" \
     -d "redirect_uri=http://localhost:3000" \
     -d "grant_type=authorization_code"
   ```

4. **Copy Refresh Token**: From the response, copy the `refresh_token` value to your `.env.local` file.

## Testing Mode

If no refresh token is provided, the application runs in test mode and will log form submissions to the console instead of sending them to Zoho CRM.

## Form Integration Points

The Zoho CRM form has been integrated into the following areas:

1. **Product Selector**: After showing recommendations, users can submit their requirements
2. **Product Pages**: Before the share options, users can request detailed quotes
3. **Request Quote Components**: Throughout the website for general inquiries

## Form Data Structure

The form collects the following information:
- Full Name
- Company Name
- Email Address
- Phone Number
- Requirements/Description

This data is automatically formatted and sent to Zoho CRM as new leads with appropriate lead sources and product interests.

## Success Message

After successful submission, users see a confirmation message indicating their inquiry has been submitted and that the engineering team will contact them within 24 hours. 