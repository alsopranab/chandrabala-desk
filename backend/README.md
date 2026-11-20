# Google Sheets & Drive backend setup

1. Go to https://script.google.com and create a project.
2. Paste backend/Code.gs into the editor.
3. Run setup() once and authorize. It creates a spreadsheet and backup folder.
4. Run setAppToken() once. In Project Settings > Script Properties, copy APP_TOKEN.
5. Deploy > New deployment > Web app. Execute as Me. Access: Anyone. Deploy and copy the /exec URL.
6. In Chandrabala Desk Settings, enter the URL and token and save. Use Restore from cloud to load the latest saved state.

Security: Anyone possessing both the URL and token can read/write state. Keep the token private and avoid sharing it. Cloud sync is fire-and-forget via a no-cors POST, so test carefully with noncritical records first. Local browser storage remains a fallback. This is not production-grade accounting software or multi-user authentication.
