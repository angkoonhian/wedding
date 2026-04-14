/**
 * Google Apps Script for Wedding RSVP
 *
 * Setup instructions:
 * 1. Create a new Google Sheet
 * 2. Add header row: Timestamp | Name | Side | Attending | Additional Guests | Dietary Restrictions | Special Requests | Message
 * 3. Go to Extensions > Apps Script
 * 4. Delete any existing code and paste this entire file
 * 5. Click Deploy > New deployment
 * 6. Select type: Web app
 * 7. Set "Execute as": Me
 * 8. Set "Who has access": Anyone
 * 9. Click Deploy and authorize
 * 10. Copy the web app URL
 * 11. Paste the URL into index.html where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data;
    if (e.postData.type === 'application/x-www-form-urlencoded') {
      data = e.parameter;
    } else {
      data = JSON.parse(e.postData.contents);
    }

    sheet.appendRow([
      new Date(),
      data.name || '',
      data.side || '',
      data.attending || '',
      data.additionalGuests || '0',
      data.dietary || '',
      data.specialRequests || '',
      data.message || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
