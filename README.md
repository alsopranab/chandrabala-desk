# Chandrabala Desk

Initial prototype for inventory and party temporary-bill tracking.

## Included prototype features
- Inventory and purchase entry
- Available stock balances
- Party records, generated party keys, edit and delete
- Demo party portal credentials
- Party bill submission (product, rate, volume, date/time, vehicle)
- Admin bill approval and stock deduction
- Printable temporary bill / Save as PDF

## Disclaimer
This is a local-browser prototype. Data is stored in localStorage, passwords are not securely stored, and users do not share a central database across devices. It is **not suitable for production** or real authentication until a backend, secure password hashing, authorization, persistent database, and audit logging are implemented.

The generated document is explicitly a temporary inventory tracking bill, not a GST tax invoice.

## Run
Open index.html in a modern browser. For production, deploy behind a backend service with role-based authentication and a database.
