# Google Apps Script Setup for Supabase Chatbot Leads Sync

This Google Apps Script automatically syncs chatbot leads from your Supabase database to a Google Sheet in real-time.

## Setup Instructions

### Step 1: Create Google Apps Script Project

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Replace the default `Code.gs` content with the code from `SupabaseChatbotSync.js`

### Step 2: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Rename it to "Chatbot Leads Data" (or any name you prefer)
4. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`

### Step 3: Configure the Script

1. In your Google Apps Script project, update these variables at the top of the script:
   ```javascript
   const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your actual Sheet ID
   ```

2. The Supabase URL and API key are already configured for your project:
   ```javascript
   const SUPABASE_URL = 'https://zxvhgpejwgrlxksnqtxk.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

### Step 4: Test the Setup

1. Save your script (Ctrl+S or Cmd+S)
2. Run the `getSheetInfo()` function to verify your sheet connection:
   - Select `getSheetInfo` from the function dropdown
   - Click the "Run" button
   - Check the execution log for any errors

3. Run the `testSync()` function to perform a manual sync:
   - Select `testSync` from the function dropdown
   - Click "Run"
   - Check your Google Sheet to see if data appears

### Step 5: Set Up Automatic Sync

1. Run the `setupTrigger()` function once:
   - Select `setupTrigger` from the function dropdown
   - Click "Run"
   - This will create a trigger to run the sync every 15 minutes

2. To verify the trigger was created:
   - Go to "Triggers" in the left sidebar (clock icon)
   - You should see a trigger for `syncChatbotLeads` function

## Features

### Automatic Data Sync
- Syncs every 15 minutes automatically
- Avoids duplicates by checking existing IDs
- Sorts data by creation date (newest first)

### Data Structure
The Google Sheet will have these columns:
- **ID**: Unique identifier from Supabase
- **Created At**: When the lead was submitted
- **Name**: Customer's full name
- **Email**: Customer's email address
- **Phone**: Customer's phone number
- **Industry**: Selected industry category
- **Category**: Product category of interest
- **Model Name**: Specific model code (e.g., IBP-120)
- **Model Label**: Full model description
- **Lead Source**: Always "Chatbot Assistant"
- **Status**: Lead status (default: "new")
- **Notes**: Additional information about the lead

### Error Handling
- Automatically sends email notifications if sync fails
- Logs detailed error information for debugging
- Gracefully handles API errors and missing data

## Available Functions

### Core Functions
- `syncChatbotLeads()`: Main sync function (runs automatically)
- `setupTrigger()`: Creates the automatic sync trigger
- `testSync()`: Manually run sync for testing

### Utility Functions
- `getSheetInfo()`: Display sheet information for debugging
- `createNewSheet()`: Create a new Google Sheet if needed
- `fetchChatbotLeadsFromSupabase()`: Fetch data from Supabase
- `updateGoogleSheet()`: Update the Google Sheet with new data

## Customization Options

### Change Sync Frequency
To change how often the sync runs, modify the trigger setup:
```javascript
// Every 5 minutes
ScriptApp.newTrigger('syncChatbotLeads')
  .timeBased()
  .everyMinutes(5)
  .create();

// Every hour
ScriptApp.newTrigger('syncChatbotLeads')
  .timeBased()
  .everyHours(1)
  .create();

// Daily at 9 AM
ScriptApp.newTrigger('syncChatbotLeads')
  .timeBased()
  .everyDays(1)
  .atHour(9)
  .create();
```

### Add Custom Columns
You can add custom columns by modifying the `headers` array and the data mapping in `updateGoogleSheet()`.

### Email Notifications
The script sends error notifications to the Google account owner. To change this, update the email address in the error handling section.

## Troubleshooting

### Common Issues

1. **"Cannot read property of undefined" error**
   - Check that `GOOGLE_SHEET_ID` is correctly set
   - Verify you have edit access to the Google Sheet

2. **"Access denied" error**
   - Make sure you've authorized the script to access Google Sheets
   - Check that the Google Sheet exists and is accessible

3. **"Supabase API error"**
   - Verify the Supabase URL and API key are correct
   - Check that the `chatbot_leads` table exists in Supabase

4. **No data appearing in sheet**
   - Run `testSync()` manually to check for errors
   - Verify there's actual data in the Supabase table
   - Check the execution logs for any error messages

### Debugging Steps

1. Check execution logs:
   - Go to "Executions" in the Apps Script editor
   - Look for error messages or warnings

2. Test individual functions:
   - Run `getSheetInfo()` to test sheet access
   - Run `fetchChatbotLeadsFromSupabase()` to test Supabase connection

3. Manual sync:
   - Run `testSync()` to perform a one-time sync
   - Check both the logs and the Google Sheet

## Security Notes

- The Supabase anonymous key is included in the script (this is safe for read-only operations)
- The script only reads data from Supabase, it cannot modify your database
- Google Apps Script runs securely in Google's cloud environment
- Only you (the script owner) can access and modify the script

## Support

If you encounter issues:
1. Check the troubleshooting section above
2. Review the execution logs in Google Apps Script
3. Verify your Supabase table structure matches the expected format
4. Test the sync manually before relying on automatic triggers
