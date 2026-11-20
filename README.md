# Chandrabala Desk

Mobile-friendly static operations app for Chandrabala Rubber Industries.

- Sales and purchase transactions with edit/delete and payment status
- Sales invoice print / PDF and WhatsApp message handoff
- Inventory by rubber grade, opening balances and stock summary
- Parties, CSV exports, business profile and SVG logo
- Optional Google Apps Script / Sheets / Drive backup integration
- Responsive lavender widget-style dashboard

## GitHub Pages
Deploy from the `root` branch using GitHub Actions. The workflow runs `node --check app.js` before publishing.

## Prototype limitations
The default data store is browser-local storage. It is not shared between browsers or devices. Optional Google Apps Script backup must be separately authorized and tested. Do not treat this prototype as statutory accounting software. Validate GST settings, invoice fields and applicable tax requirements with your accountant.
