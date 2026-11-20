# Production architecture — Chandrabala Desk

## Operating model

The business handles inward procurement and outward sales of natural rubber. The system should preserve the chain from supplier/lot/weighment → purchase voucher → stock ledger → customer order/sales invoice → dispatch/payment follow-up. Dry Lot, Good Lot and Washing Lot must remain distinct grades; RSS 4 and RSS 5 must never be silently substituted for one another.

## Recommended modules

1. **Parties** — supplier/customer identity, GSTIN, billing and shipping address, contact and opt-in status.
2. **Products & grades** — SKU/grade, unit, standard tax classification, quality notes and active flag.
3. **Purchase intake** — supplier, lot/batch, gross weight, tare, net weight, moisture/quality adjustments if applicable, agreed rate, deductions, transport, tax and supporting documents.
4. **Sales** — customer order, grade, quantity, rate, tax, dispatch, invoice and outstanding amount.
5. **Inventory ledger** — append-only inbound/outbound/adjustment events, linked to the source voucher. Never calculate operational stock from editable summary totals alone.
6. **Payments** — receipts, supplier payments, allocations and outstanding balances.
7. **WhatsApp desk** — opt-in ledger, approved template mapping, outbound queue, delivery/read/failure webhooks and manual handoff.
8. **Reports** — grade-wise stock, purchase/sales register, party ledger, ageing, rate and weight variance, lot traceability.
9. **Administration** — roles, approvals, audit trail, backups and business configuration.

## Core relational entities

- `organizations(id, legal_name, gstin, address, settings_json)`
- `users(id, organization_id, name, email, role, active)`
- `parties(id, organization_id, party_type, name, gstin, phone_e164, whatsapp_opt_in_at, billing_address, shipping_address)`
- `products(id, organization_id, sku, name, grade, unit, hsn_sac, gst_rate, active)`
- `lots(id, organization_id, supplier_id, product_id, lot_code, received_at, gross_weight_kg, tare_weight_kg, net_weight_kg, quality_notes, status)`
- `purchase_bills(id, organization_id, supplier_id, bill_number, bill_date, status, taxable_value, tax_total, grand_total)`
- `purchase_bill_lines(id, bill_id, lot_id, product_id, qty_kg, rate_per_kg, tax_rate, line_total)`
- `sales_invoices(id, organization_id, customer_id, invoice_number, invoice_date, status, taxable_value, tax_total, grand_total, due_date)`
- `sales_invoice_lines(id, invoice_id, product_id, lot_id, qty_kg, rate_per_kg, tax_rate, line_total)`
- `inventory_events(id, organization_id, product_id, lot_id, event_type, quantity_kg, source_type, source_id, occurred_at, created_by)`
- `payments(id, organization_id, party_id, direction, amount, payment_date, reference)` and allocation tables
- `whatsapp_messages(id, organization_id, party_id, template_name, payload_json, provider_message_id, status, created_at)`
- `audit_events(id, organization_id, actor_id, entity_type, entity_id, action, before_json, after_json, created_at)`

All business tables need `organization_id`, server-side authorization and indexes for party/date/document searches. Store money as decimal/numeric, not floating-point. Preserve source documents and use reversal/correction entries instead of deleting posted transactions.

## Suggested API surface

- `POST /api/purchases` — create draft purchase bill and lot/weighment records.
- `POST /api/purchases/:id/post` — validate and post bill; create inventory receipt event atomically.
- `POST /api/sales` — create draft sales invoice.
- `POST /api/sales/:id/post` — validate available grade/lot balance, post invoice and create stock issue event atomically.
- `GET /api/inventory?grade=&lot=` — derive stock from ledger events.
- `POST /api/payments` and `POST /api/payments/:id/allocate` — record and allocate payment.
- `POST /api/whatsapp/messages` — enqueue a permitted template message.
- `POST /api/webhooks/whatsapp` — verify provider signature and update delivery state.

## WhatsApp rules and safety

- Use the official WhatsApp Business Platform/Cloud API or an approved BSP.
- Persist consent/opt-in source, timestamp and opt-out status per contact.
- Use approved templates for business-initiated conversations when required by current WhatsApp policy.
- Keep access tokens in server-side environment secrets, never client JavaScript or GitHub commits.
- Verify webhook signatures, rate-limit endpoints, de-duplicate webhook events and retry transient failures with backoff.
- Provide STOP/opt-out handling and a manual contact history.

## Go-live controls

Before real billing, have a qualified accountant validate GSTIN, HSN/SAC, applicable tax rates, invoice numbering, mandatory invoice particulars and current e-invoice/e-way bill applicability. Also implement authentication, backups, restore testing, access logs, audit trails, concurrency-safe stock posting and a reviewed deployment pipeline. The prototype must not be treated as a substitute for statutory accounting software.
