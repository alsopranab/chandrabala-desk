# Chandrabala Desk

A mobile-friendly static business operations app for Chandrabala Rubber Industries.

## Features
- Google Material design: navigation rail on desktop, bottom bar on phones, light and dark themes
- Sales and purchase entries with GST (CGST + SGST or IGST), payment status, partial payments, editing and delete-with-undo
- Printable GST invoice (amount in words, signature block) and save as PDF
- WhatsApp message handoff (10-digit Indian numbers get +91 automatically)
- Stock by grade calculated from opening balances and recorded purchases/sales, with low-stock warnings
- Receivables and payables, party directory with balances, 6-month sales vs purchases chart
- CSV exports, JSON backup and restore, business profile and settings
- Replaceable SVG logo at `assets/logo.svg`
- Optional Google Sheets/Drive backup via the Apps Script backend in `backend/`
- Installable offline-capable PWA

Existing data saved by earlier versions in the same browser keeps working.

## Deploy
GitHub Pages uses the GitHub Actions workflow `.github/workflows/deploy-pages.yml`. In repository Settings > Pages, set Source to **GitHub Actions**.

## Data and safety
The app stores its data in the browser by default. Browser storage is not shared between devices or users. Cloud backup is optional and must be configured separately. Export CSV regularly. This prototype is not statutory accounting software; verify GST, invoice and tax requirements with your accountant before operational use.
