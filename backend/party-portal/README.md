# Party Portal (Apps Script MVP)

**Prototype caution:** this initial MVP is not hardened for production sensitive records. Basic hashed-password login, cache sessions, party-scoped bill retrieval and private uploads are implemented. No comprehensive brute-force mitigation, password change/reset, virus scanning or penetration test. Bill approvals do not automatically post to the billing app or stock ledger.

## Setup
1. Create a Google Apps Script project in your Google account.
2. Add files named Code.gs and Portal.html; copy the respective files from this folder.
3. Verify the Drive upload folder is private. The script uses the folder ID configured in Code.gs. (This is a reference ID, not access permission.)
4. Run setupPortal() and authorize. It creates the portal spreadsheet and tables.
5. Run createPortalAdmin('your-email','your-unique-password-12-or-more-characters') once. Never publish credentials.
6. Deploy > New deployment > Web app; execute as Me; access Anyone. The URL is publicly reachable, but the login code gates data. Protect your Google account and review code before using real bills.
7. Sign in and create party accounts. Share credentials privately.
8. Test isolation with separate party accounts and test documents before real use.

Uploads: PDF/JPG/PNG, 8MB maximum. Folder uploads remain private. Admin review can approve/reject with remarks. Only pending records are reviewable; statuses are recorded, but no automated accounting/inventory integration exists yet.
