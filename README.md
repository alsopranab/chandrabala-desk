# Chandrabala Desk

A mobile-first Progressive Web App (PWA) starter for Chandrabala Rubber Industries, designed around the purchase, sales, inventory and follow-up workflow of a natural-rubber trading business.

## Current prototype features

- Overview dashboard with sales, purchase, stock and receivable summaries.
- Sales invoices and purchase bills with quantity, rate, GST and calculated totals.
- Product grades seeded for RSS 4, RSS 5, Dry Lot, Good Lot and Washing Lot.
- Inventory movement calculation from opening stock, purchases and sales.
- Customer and supplier directory (parties are added automatically from transactions).
- CSV export of the transaction register.
- WhatsApp click-to-chat handoff with invoice, purchase and payment reminder message templates.
- Business profile settings and responsive mobile layout.
- PWA manifest and service worker for installability and basic offline shell caching.

## Run locally

This is a static app. From the project directory run:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Deploy with GitHub Pages

1. Create a repository named `chandrabala-desk` under the Chandrabala/GitHub owner account.
2. Upload these project files to the repository root and push to the `main` branch.
3. In repository Settings → Pages, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Open the published Pages URL over HTTPS. Users can then install the app from the browser's install option where supported.

## Important prototype limitations

This starter is a front-end prototype, not production accounting software. It stores its data in the current browser's `localStorage`; data is not shared between devices or staff, and clearing browser data can delete it. Sample opening stock and sample transactions are demonstration data—replace them before real use. Invoice numbering, statutory GST fields, tax rules, e-invoicing, e-way bills, PDF printing, payment reconciliation, audit logs, authentication, role permissions, backups and multi-user sync require proper implementation and validation before operational use.

## WhatsApp integration

The current WhatsApp screen opens a pre-filled `wa.me` chat for manual sending. Automated outbound notifications require the WhatsApp Business Platform/Cloud API (or an approved provider), a verified business setup, approved templates where applicable, customer opt-in, and a secure backend to hold access tokens and process webhooks. Do not put API tokens or secrets in this frontend repository. Suggested backend endpoints are documented in `docs/architecture.md`.

## Suggested production architecture

- Frontend: React/TypeScript PWA or current static UI upgraded to React.
- API: Node.js/TypeScript service.
- Database: PostgreSQL with tenant-aware access controls and immutable audit events.
- Auth: managed identity provider with owner, accounts, procurement and sales roles.
- Files: private object storage for invoice PDFs and supporting weighment documents.
- WhatsApp: server-side Cloud API integration, webhook verification, opt-in tracking, template registry and retry queue.

See `docs/architecture.md` for the proposed data model and API plan.
