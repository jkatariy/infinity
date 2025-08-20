/**
 * Google Apps Script to sync Supabase chatbot leads to Google Sheets
 * 
 * Setup Instructions:
 * 1. Create a new Google Apps Script project at script.google.com
 * 2. Replace the default Code.gs content with this script
 * 3. Update the configuration variables below
 * 4. Create a Google Sheet for the data
 * 5. Set up a time-based trigger to run syncChatbotLeads periodically
 */

// Configuration - UPDATE THESE VALUES
const SUPABASE_URL = 'https://zxvhgpejwgrlxksnqtxk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp4dmhncGVqd2dybHhrc25xdHhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg2OTk4NjEsImV4cCI6MjA2NDI3NTg2MX0.UfPkqIRY56eN8HvTNFXhG0MVzVtkZmXEHhSyD7M7eKU';
const GOOGLE_SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE'; // Replace with your Google Sheet ID

/**
 * Main function to sync chatbot leads from Supabase to Google Sheets
 */
function syncChatbotLeads() {
  try {
    console.log('Starting sync of chatbot leads...');
    
    // Get data from Supabase
    const leads = fetchChatbotLeadsFromSupabase();
    
    if (!leads || leads.length === 0) {
      console.log('No new leads to sync');
      return;
    }
    
    // Update Google Sheet
    updateGoogleSheet(leads);
    
    console.log(`Successfully synced ${leads.length} leads`);
    
  } catch (error) {
    console.error('Error syncing chatbot leads:', error);
    
    // Send email notification on error
    const email = Session.getActiveUser().getEmail();
    MailApp.sendEmail({
      to: email,
      subject: 'Chatbot Leads Sync Error',
      body: `Error occurred while syncing chatbot leads:\n\n${error.toString()}\n\nPlease check the script logs for more details.`
    });
  }
}

/**
 * Fetch chatbot leads from Supabase
 */
function fetchChatbotLeadsFromSupabase() {
  const url = `${SUPABASE_URL}/rest/v1/chatbot_leads?select=*&order=created_at.desc`;
  
  const options = {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  };
  
  try {
    const response = UrlFetchApp.fetch(url, options);
    
    if (response.getResponseCode() !== 200) {
      throw new Error(`Supabase API error: ${response.getResponseCode()} - ${response.getContentText()}`);
    }
    
    const data = JSON.parse(response.getContentText());
    console.log(`Fetched ${data.length} leads from Supabase`);
    
    return data;
    
  } catch (error) {
    console.error('Error fetching from Supabase:', error);
    throw error;
  }
}

/**
 * Update Google Sheet with leads data
 */
function updateGoogleSheet(leads) {
  try {
    const sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID);
    let worksheet = sheet.getSheetByName('Chatbot Leads');
    
    // Create worksheet if it doesn't exist
    if (!worksheet) {
      worksheet = sheet.insertSheet('Chatbot Leads');
      
      // Add headers
      const headers = [
        'ID',
        'Created At',
        'Name',
        'Email',
        'Phone',
        'Industry',
        'Category',
        'Model Name',
        'Model Label',
        'Lead Source',
        'Status',
        'Notes'
      ];
      
      worksheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      worksheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
      worksheet.setFrozenRows(1);
      
      // Set column widths
      worksheet.setColumnWidth(1, 280); // ID
      worksheet.setColumnWidth(2, 150); // Created At
      worksheet.setColumnWidth(3, 150); // Name
      worksheet.setColumnWidth(4, 200); // Email
      worksheet.setColumnWidth(5, 120); // Phone
      worksheet.setColumnWidth(6, 150); // Industry
      worksheet.setColumnWidth(7, 150); // Category
      worksheet.setColumnWidth(8, 120); // Model Name
      worksheet.setColumnWidth(9, 250); // Model Label
      worksheet.setColumnWidth(10, 120); // Lead Source
      worksheet.setColumnWidth(11, 100); // Status
      worksheet.setColumnWidth(12, 300); // Notes
    }
    
    // Get existing data to avoid duplicates
    const existingData = worksheet.getDataRange().getValues();
    const existingIds = existingData.slice(1).map(row => row[0]); // Skip header row
    
    // Filter out leads that already exist
    const newLeads = leads.filter(lead => !existingIds.includes(lead.id));
    
    if (newLeads.length === 0) {
      console.log('No new leads to add');
      return;
    }
    
    // Prepare data for insertion
    const newRows = newLeads.map(lead => [
      lead.id,
      new Date(lead.created_at),
      lead.name,
      lead.email,
      lead.phone,
      lead.industry || '',
      lead.category || '',
      lead.model_name || '',
      lead.model_label || '',
      lead.lead_source || '',
      lead.status || '',
      lead.notes || ''
    ]);
    
    // Insert new rows
    if (newRows.length > 0) {
      const lastRow = worksheet.getLastRow();
      const range = worksheet.getRange(lastRow + 1, 1, newRows.length, 12);
      range.setValues(newRows);
      
      // Format the new rows
      range.setVerticalAlignment('top');
      range.setWrap(true);
      
      // Format dates
      const dateRange = worksheet.getRange(lastRow + 1, 2, newRows.length, 1);
      dateRange.setNumberFormat('yyyy-mm-dd hh:mm:ss');
      
      console.log(`Added ${newRows.length} new leads to Google Sheet`);
    }
    
    // Sort by Created At (newest first)
    const dataRange = worksheet.getRange(2, 1, worksheet.getLastRow() - 1, 12);
    dataRange.sort({column: 2, ascending: false});
    
  } catch (error) {
    console.error('Error updating Google Sheet:', error);
    throw error;
  }
}

/**
 * Setup function to create time-based trigger
 * Run this once to set up automatic syncing
 */
function setupTrigger() {
  // Delete existing triggers
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(trigger => {
    if (trigger.getHandlerFunction() === 'syncChatbotLeads') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  
  // Create new trigger to run every 15 minutes
  ScriptApp.newTrigger('syncChatbotLeads')
    .timeBased()
    .everyMinutes(15)
    .create();
  
  console.log('Trigger created successfully. Sync will run every 15 minutes.');
}

/**
 * Test function to run sync manually
 */
function testSync() {
  syncChatbotLeads();
}

/**
 * Function to get sheet info for debugging
 */
function getSheetInfo() {
  try {
    const sheet = SpreadsheetApp.openById(GOOGLE_SHEET_ID);
    console.log('Sheet name:', sheet.getName());
    console.log('Sheet URL:', sheet.getUrl());
    
    const worksheets = sheet.getSheets();
    console.log('Available worksheets:');
    worksheets.forEach(ws => console.log('- ' + ws.getName()));
    
  } catch (error) {
    console.error('Error accessing sheet:', error);
    console.log('Please check that GOOGLE_SHEET_ID is correct and you have access to the sheet');
  }
}

/**
 * Function to create a new Google Sheet for chatbot leads
 * Run this if you need to create a new sheet
 */
function createNewSheet() {
  try {
    const sheet = SpreadsheetApp.create('Chatbot Leads Data');
    console.log('New sheet created!');
    console.log('Sheet ID:', sheet.getId());
    console.log('Sheet URL:', sheet.getUrl());
    console.log('Copy the Sheet ID and update GOOGLE_SHEET_ID in the script');
    
    return sheet.getId();
    
  } catch (error) {
    console.error('Error creating sheet:', error);
  }
}
