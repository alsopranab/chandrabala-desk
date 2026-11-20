# Optional Google Sheets / Drive backup

1. Create a project at https://script.google.com.
2. Copy `Code.gs` into the Apps Script editor.
3. Run `setup()` and authorize it. It creates the spreadsheet and backup folder.
4. Run `setAppToken()`; copy the APP_TOKEN from Script Properties.
5. Deploy as Web App: execute as you, access as Anyone. Copy the /exec URL.
6. In the app Settings, enter the URL and token. Use the cloud restore feature only after verifying the data.

The app's local browser storage remains the primary fallback. Cloud backup is not a secure multi-user accounting system. Protect the URL/token, test with noncritical data, and export backups.