/**
 * Google Apps Script for Wedding RSVP
 *
 * Each guest is stored as an individual row. Guests who RSVP together
 * (primary + their date) share the same Group ID.
 *
 * Sheet columns:
 *   Timestamp | Group ID | Name | Role | Side | Attending | Dietary Restrictions | Special Requests | Message
 *
 * Setup instructions:
 * 1. Create a new Google Sheet
 * 2. Add header row: Timestamp | Group ID | Name | Role | Side | Attending | Dietary Restrictions | Special Requests | Message
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

    var now = new Date();
    var groupId = data.groupId || now.getTime().toString(36);

    sheet.appendRow([
      now,
      groupId,
      data.name || '',
      'Primary',
      data.side || '',
      data.attending || '',
      data.dietary || '',
      data.specialRequests || '',
      data.message || ''
    ]);

    var dateName = (data.dateName || '').trim();
    if (data.attending === 'Yes' && dateName) {
      sheet.appendRow([
        now,
        groupId,
        dateName,
        'Date',
        data.side || '',
        data.attending || '',
        data.dateDietary || '',
        '',
        ''
      ]);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
