# Chandrabala Desk

A mobile-friendly static business operations app for Chandrabala Rubber Industries.

## Features
- Sales and purchase entries with GST, payment status and editing/deletion
- Printable invoice / save as PDF; WhatsApp message handoff
- Stock calculated from opening balances and recorded purchase/sales entries by grade
- Party directory, CSV exports, business profile and settings
- Replaceable SVG logo at `assets/logo.svg`
- Optional Google Sheets/Drive backup via the Apps Script backend in `backend/`
- Responsive pastel widget-style interface and installable PWA

## Deploy
GitHub Pages uses the GitHub Actions workflow `.github/workflows/deploy-pages.yml`. In repository Settings > Pages, set Source to **GitHub Actions**.

## Data and safety
The app stores its data in the browser by default. Browser storage is not shared between devices or users. Cloud backup is optional and must be configured separately. Export CSV regularly. This prototype is not statutory accounting software; verify GST, invoice and tax requirements with your accountant before operational use.
