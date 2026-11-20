/* Chandrabala Desk — rubber trading operations (static, browser-local, optional Google backup). */
(() => {
  'use strict';

  /* ---------------------------------------------------------------- constants */
  const GRADES = ['RSS 4', 'RSS 5', 'Dry Lot', 'Good Lot', 'Washing Lot'];
  const KEY = 'cbDesk_data_v2';            // same key as the previous version: existing data keeps working
  const CLOUD_KEY = 'cbDesk_cloud';
  const THEME_KEY = 'cbDesk_theme';

  const ICONS = {
    home: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
    receipt: 'M18 17H6v-2h12v2zm0-4H6v-2h12v2zm0-4H6V7h12v2zM3 22l1.5-1.5L6 22l1.5-1.5L9 22l1.5-1.5L12 22l1.5-1.5L15 22l1.5-1.5L18 22l1.5-1.5L21 22V2l-1.5 1.5L18 2l-1.5 1.5L15 2l-1.5 1.5L12 2l-1.5 1.5L9 2 7.5 3.5 6 2 4.5 3.5 3 2v20z',
    cart: 'M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0020 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z',
    box: 'M20 2H4c-1 0-2 .9-2 2v3.01c0 .72.43 1.34 1 1.69V20c0 1.1 1.1 2 2 2h14c.9 0 2-.9 2-2V8.7c.57-.35 1-.97 1-1.69V4c0-1.1-1-2-2-2zm-5 12H9v-2h6v2zm5-7H4V4h16v3z',
    people: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z',
    settings: 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z',
    add: 'M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z',
    search: 'M15.5 14h-.79l-.28-.27A6.471 6.471 0 0016 9.5 6.5 6.5 0 109.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z',
    edit: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 000-1.41l-2.34-2.34a.996.996 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z',
    del: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z',
    print: 'M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z',
    send: 'M2.01 21L23 12 2.01 3 2 10l15 2-15 2z',
    download: 'M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z',
    upload: 'M9 16h6v-6h4l-7-7-7 7h4zm-4 2h14v2H5z',
    check: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z',
    up: 'M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z',
    down: 'M16 18l2.29-2.29-4.88-4.88-4 4L2 7.41 3.41 6l6 6 4-4 6.3 6.29L22 12v6z',
    cloud: 'M19.35 10.04A7.49 7.49 0 0012 4C9.11 4 6.6 5.64 5.35 8.04A5.994 5.994 0 000 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z',
    warn: 'M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z',
    person: 'M15 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm-9-2V7H4v3H1v2h3v3h2v-3h3v-2H6zm9 4c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z',
    wallet: 'M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z',
    close: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
  };
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICONS[n]}"/></svg>`;

  const NAV = [
    { id: 'home', label: 'Overview', icon: 'home' },
    { id: 'sales', label: 'Sales', icon: 'receipt' },
    { id: 'purchase', label: 'Purchases', icon: 'cart' },
    { id: 'stock', label: 'Inventory', icon: 'box' },
    { id: 'parties', label: 'Parties', icon: 'people' },
  ];
  const VIEWS = {
    home: ['Overview', 'Your rubber trading business at a glance'],
    sales: ['Sales & invoices', 'Create, share and print sales invoices'],
    purchase: ['Purchases', 'Record and review supplier purchase bills'],
    stock: ['Inventory', 'Stock by grade, from opening balances and transactions'],
    parties: ['Parties', 'Your customers and suppliers'],
    settings: ['Settings', 'Business profile, backup and data'],
  };

  /* ---------------------------------------------------------------- helpers */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const r2 = n => Math.round((+n || 0) * 100) / 100;
  const inr = n => '₹' + Number(n || 0).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const num = n => Number(n || 0).toLocaleString('en-IN', { maximumFractionDigits: 2 });
  const sum = (arr, f) => arr.reduce((s, x) => s + (+f(x) || 0), 0);
  const today = () => { const t = new Date(); return `${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, '0')}-${String(t.getDate()).padStart(2, '0')}`; };
  const fmtDate = s => { const t = new Date(String(s) + 'T00:00:00'); return isNaN(t) ? esc(s || '') : t.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }); };
  const initial = s => (String(s || '?').trim()[0] || '?').toUpperCase();
  const isSale = t => t.type === 'sale';

  const ONES = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  const TENS = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
  const two = n => n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  const three = n => (n >= 100 ? ONES[Math.floor(n / 100)] + ' Hundred' + (n % 100 ? ' ' : '') : '') + (n % 100 ? two(n % 100) : '');
  function rupeesInWords(v) {
    v = Math.round((+v || 0) * 100);
    let r = Math.floor(v / 100); const p = v % 100;
    if (!r && !p) return 'Zero Rupees Only';
    const cr = Math.floor(r / 1e7); r %= 1e7;
    const lk = Math.floor(r / 1e5); r %= 1e5;
    const th = Math.floor(r / 1e3); r %= 1e3;
    const parts = [];
    if (cr) parts.push(three(cr) + ' Crore');
    if (lk) parts.push(two(lk) + ' Lakh');
    if (th) parts.push(two(th) + ' Thousand');
    if (r) parts.push(three(r));
    let s = parts.length ? parts.join(' ') + ' Rupees' : '';
    if (p) s += (s ? ' and ' : '') + two(p) + ' Paise';
    return s + ' Only';
  }

  /* ---------------------------------------------------------------- state */
  const defaults = () => ({
    tx: [], parties: [], opening: Object.fromEntries(GRADES.map(g => [g, 0])),
    business: { name: 'Chandrabala Rubber Industries', address: 'Tripura, India', phone: '', gstin: '' }, counter: 0,
  });
  function normalize(x) {
    const b = defaults(), o = x && typeof x === 'object' ? x : {};
    const s = { ...b, ...o };
    s.tx = Array.isArray(o.tx) ? o.tx : [];
    s.parties = Array.isArray(o.parties) ? o.parties : [];
    s.opening = { ...b.opening, ...(o.opening || {}) };
    s.business = { ...b.business, ...(o.business || {}) };
    s.counter = Math.max(+o.counter || 0, ...s.tx.map(t => +(String(t.id || '').match(/(\d+)$/)?.[1] || 0)));
    return s;
  }
  function load() {
    let raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY) || 'null'); }
    catch (e) {
      try { localStorage.setItem(KEY + '_corrupt_' + Date.now(), localStorage.getItem(KEY)); } catch (_) { /* ignore */ }
      console.warn('Stored data was unreadable; a copy was kept.', e);
    }
    return normalize(raw);
  }
  let d = load();
  let cloudCfg = {};
  try { cloudCfg = JSON.parse(localStorage.getItem(CLOUD_KEY) || '{}') || {}; } catch (e) { cloudCfg = {}; }
  const ui = { view: 'home', q: '', status: 'all' };
  let cloudState = cloudCfg.url ? 'Connected' : 'Not connected';

  let cloudTimer;
  function scheduleCloud() {
    if (!cloudCfg.url) return;
    clearTimeout(cloudTimer);
    cloudTimer = setTimeout(cloudPush, 1500);
  }
  async function cloudPush() {
    if (!cloudCfg.url) return;
    try {
      await fetch(cloudCfg.url, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify({ action: 'save', token: cloudCfg.token, state: d }) });
      cloudState = 'Last sync sent ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } catch (e) { cloudState = 'Sync error — will retry on next change'; console.warn(e); }
    const el = $('#cloudstatus'); if (el) el.textContent = 'Cloud: ' + cloudState;
  }
  async function cloudPull() {
    if (!cloudCfg.url) { toast('Save the Apps Script URL first'); return; }
    try {
      const r = await fetch(cloudCfg.url + '?action=load&token=' + encodeURIComponent(cloudCfg.token || ''));
      const x = await r.json();
      if (x.error) { toast('Cloud says: ' + x.error); return; }
      if (!x.state) { toast('No cloud backup found yet'); return; }
      if (await ask('Restore from cloud?', 'This replaces the data in this browser with the latest cloud backup.', 'Restore')) {
        d = normalize(x.state); save(); render(); toast('Cloud data restored');
      }
    } catch (e) { toast('Could not read the cloud backup. Check the URL and deployment access.'); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(d)); }
    catch (e) { toast('Could not save: browser storage is full or blocked. Export a backup now.'); }
    scheduleCloud();
  }

  /* ---------------------------------------------------------------- business maths */
  const calc = t => {
    const taxable = r2((+t.qty || 0) * (+t.rate || 0)), tax = r2(taxable * (+t.gst || 0) / 100);
    return { taxable, tax, total: r2(taxable + tax) };
  };
  const balance = t => t.status === 'paid' ? 0 : Math.max(0, r2(calc(t).total - (+t.paid || 0)));
  const paidOf = t => t.status === 'paid' ? calc(t).total : (+t.paid || 0);
  function settle(t) {                       // keep status and paid amount consistent
    const { total } = calc(t);
    t.paid = r2(Math.max(0, +t.paid || 0));
    if (t.status === 'paid') t.paid = total;
    else if (total > 0 && t.paid >= total) { t.status = 'paid'; t.paid = total; }
    else if (t.paid > 0) t.status = 'partial';
    else t.status = 'pending';
    return t;
  }
  const allGrades = () => [...new Set([...GRADES, ...Object.keys(d.opening), ...d.tx.map(t => t.grade).filter(Boolean)])];
  function stockMap() {
    const m = {};
    allGrades().forEach(g => m[g] = { open: +d.opening[g] || 0, in: 0, out: 0 });
    d.tx.forEach(t => { const e = m[t.grade] || (m[t.grade] = { open: 0, in: 0, out: 0 }); e[isSale(t) ? 'out' : 'in'] += +t.qty || 0; });
    Object.values(m).forEach(e => e.bal = r2(e.open + e.in - e.out));
    return m;
  }
  function monthly() {
    const out = [], now = new Date();
    for (let i = 5; i >= 0; i--) {
      const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
      out.push({ k: dt.getFullYear() + '-' + String(dt.getMonth() + 1).padStart(2, '0'), label: dt.toLocaleString('en-IN', { month: 'short' }), s: 0, p: 0 });
    }
    d.tx.forEach(t => { const m = out.find(x => x.k === String(t.date || '').slice(0, 7)); if (m) m[isSale(t) ? 's' : 'p'] += calc(t).total; });
    return out;
  }
  const sorted = arr => arr.slice().sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')) || (b.created || 0) - (a.created || 0));
  const normPhone = p => { const x = String(p || '').replace(/\D/g, ''); return x.length === 10 ? '91' + x : x; };

  /* ---------------------------------------------------------------- UI pieces */
  const badge = t => `<span class="badge ${esc(t.status)}">${{ paid: 'Paid', pending: 'Pending', partial: 'Partial' }[t.status] || 'Pending'}</span>`;
  const stat = (icon, label, value, sub, tone) => `<div class="card stat ${tone}"><div class="stat-top">${ic(icon)}${label}</div><div class="stat-value">${value}</div><div class="stat-sub">${sub}</div></div>`;
  const emptyState = (icon, title, msg) => `<div class="empty">${ic(icon)}<b>${title}</b>${msg}</div>`;

  function txRow(t) {
    const c = calc(t), sale = isSale(t);
    return `<div class="row" data-act="view-tx" data-id="${esc(t.id)}" tabindex="0" role="button" aria-label="${esc(t.party)} ${esc(t.id)}">
      <div class="avatar ${sale ? 'out' : 'in'}">${ic(sale ? 'up' : 'down')}</div>
      <div class="rmain"><b>${esc(t.party)}</b><span>${esc(t.id)} · ${fmtDate(t.date)} · ${esc(t.grade)}</span></div>
      <div class="rqty">${num(t.qty)} kg<span>@ ${inr(t.rate)}</span></div>
      <div class="ramt"><b>${inr(c.total)}</b>${badge(t)}</div>
      <div class="racts">
        ${sale ? `<button class="ib" data-act="invoice" data-id="${esc(t.id)}" title="Print invoice" aria-label="Print invoice">${ic('print')}</button>` : ''}
        <button class="ib" data-act="edit-tx" data-id="${esc(t.id)}" title="Edit" aria-label="Edit">${ic('edit')}</button>
      </div>
    </div>`;
  }
  function partyStats(p) {
    const mine = d.tx.filter(t => t.party === p.name);
    return {
      count: mine.length,
      recv: sum(mine.filter(isSale), balance),
      pay: sum(mine.filter(t => !isSale(t)), balance),
    };
  }
  function partyRow(p) {
    const s = partyStats(p);
    const owed = [s.recv ? `<span style="color:var(--green)">To receive ${inr(s.recv)}</span>` : '', s.pay ? `<span style="color:var(--red)">To pay ${inr(s.pay)}</span>` : ''].filter(Boolean).join('<br>') || '<span>Settled</span>';
    return `<div class="row p-row plain">
      <div class="avatar">${esc(initial(p.name))}</div>
      <div class="rmain"><b>${esc(p.name)}</b><span>${esc(p.type)}${p.phone ? ' · ' + esc(p.phone) : ''} · ${s.count} transaction${s.count === 1 ? '' : 's'}</span></div>
      <div class="rqty" style="text-align:right">${owed}</div>
      <div class="racts" style="opacity:1">
        ${p.phone ? `<button class="ib" data-act="party-wa" data-name="${esc(p.name)}" title="WhatsApp" aria-label="WhatsApp">${ic('send')}</button>` : ''}
        <button class="ib" data-act="edit-party" data-name="${esc(p.name)}" title="Edit" aria-label="Edit party">${ic('edit')}</button>
        <button class="ib" data-act="delete-party" data-name="${esc(p.name)}" title="Delete" aria-label="Delete party">${ic('del')}</button>
      </div>
    </div>`;
  }
  const q = () => ui.q.trim().toLowerCase();

  function listHtml(view) {
    if (view === 'parties') {
      const items = d.parties.filter(p => !q() || [p.name, p.phone, p.type].join(' ').toLowerCase().includes(q()))
        .sort((a, b) => a.name.localeCompare(b.name));
      return items.length ? items.map(partyRow).join('') : emptyState('people', d.parties.length ? 'No matching parties' : 'No parties yet', d.parties.length ? 'Try a different search.' : 'Parties are added automatically when you record a transaction, or add one manually.');
    }
    const type = view === 'sales' ? 'sale' : 'purchase';
    const items = sorted(d.tx.filter(t => t.type === type)
      .filter(t => (!q() || [t.id, t.party, t.grade, t.notes].join(' ').toLowerCase().includes(q())) && (ui.status === 'all' || t.status === ui.status)));
    if (!items.length) {
      const any = d.tx.some(t => t.type === type);
      return emptyState(type === 'sale' ? 'receipt' : 'cart', any ? 'Nothing matches' : (type === 'sale' ? 'No sales yet' : 'No purchases yet'), any ? 'Try a different search or filter.' : 'Use the button below to record your first one.');
    }
    return items.map(txRow).join('');
  }
  function summaryHtml(type) {
    const all = d.tx.filter(t => t.type === type);
    const label = type === 'sale' ? ['invoice', 'To receive'] : ['bill', 'To pay'];
    return `<b>${all.length}</b> ${label[0]}${all.length === 1 ? '' : 's'} · <b>${inr(sum(all, t => calc(t).total))}</b> total · ${label[1]} <b>${inr(sum(all, balance))}</b>`;
  }

  /* ---------------------------------------------------------------- views */
  const R = {};
  R.home = () => {
    const sales = d.tx.filter(isSale), purch = d.tx.filter(t => !isSale(t));
    const st = stockMap(), totalKg = sum(Object.values(st), e => e.bal);
    const months = monthly(), max = Math.max(1, ...months.map(m => Math.max(m.s, m.p)));
    const welcome = d.tx.length ? '' : `<section class="card welcome"><h2>Welcome to Chandrabala Desk</h2><p>Record purchases and sales, track stock by grade, print GST invoices and share them on WhatsApp. Your workspace starts empty.</p><div class="btnrow" style="margin-top:0"><button class="btn filled" data-act="new-tx" data-type="sale">${ic('add')}New sale</button><button class="btn outlined" style="background:var(--surface)" data-act="new-tx" data-type="purchase">${ic('add')}New purchase</button><a class="btn" href="#/settings" style="color:var(--on-primary-c)">Set up business profile</a></div></section>`;
    const maxBal = Math.max(1, ...Object.values(st).map(e => Math.max(0, e.bal)));
    return `${welcome}
    <section class="stats">
      ${stat('up', 'Sales', inr(sum(sales, t => calc(t).total)), `${sales.length} invoice${sales.length === 1 ? '' : 's'}`, 'blue')}
      ${stat('down', 'Purchases', inr(sum(purch, t => calc(t).total)), `${purch.length} bill${purch.length === 1 ? '' : 's'}`, 'amber')}
      ${stat('wallet', 'To receive', inr(sum(sales, balance)), 'Pending from customers', 'green')}
      ${stat('cart', 'To pay', inr(sum(purch, balance)), 'Pending to suppliers', 'red')}
    </section>
    <section class="dash">
      <div class="card pad"><div class="card-head"><h2>Last 6 months</h2></div>
        <div class="chart">${months.map(m => `<div class="col"><div class="bars"><div class="bar s" style="height:${m.s / max * 100}%" title="Sales ${inr(m.s)}"></div><div class="bar p" style="height:${m.p / max * 100}%" title="Purchases ${inr(m.p)}"></div></div><small>${m.label}</small></div>`).join('')}</div>
        <div class="legend"><span><i style="background:var(--primary)"></i>Sales</span><span><i style="background:#f9ab00"></i>Purchases</span></div>
      </div>
      <div class="card pad"><div class="card-head"><h2>Stock by grade</h2><a href="#/stock">Inventory</a></div>
        ${allGrades().map(g => `<div class="stockmini"><div><b>${esc(g)}</b><span>${num(st[g].bal)} kg</span></div><div class="progress"><span style="width:${Math.max(2, Math.min(100, Math.max(0, st[g].bal) / maxBal * 100))}%"></span></div></div>`).join('')}
        <div class="muted" style="font-size:12px">Total on hand: <b style="color:var(--on)">${num(totalKg)} kg</b></div>
      </div>
      <div class="card span2"><div class="card-head" style="padding:16px 20px 0"><h2>Recent activity</h2><a href="#/sales">View sales</a></div>
        <div class="list">${d.tx.length ? sorted(d.tx).slice(0, 6).map(txRow).join('') : emptyState('receipt', 'No activity yet', 'Your latest sales and purchases will show up here.')}</div>
      </div>
    </section>`;
  };

  const txView = type => {
    const chips = [['all', 'All'], ['paid', 'Paid'], ['pending', 'Pending'], ['partial', 'Partial']]
      .map(([v, l]) => `<button class="chip" data-act="chip" data-v="${v}" aria-pressed="${ui.status === v}">${l}</button>`).join('');
    return `<div class="toolbar"><label class="search">${ic('search')}<input id="q" type="search" placeholder="Search ${type === 'sale' ? 'invoices' : 'bills'}, parties, grades" value="${esc(ui.q)}" autocomplete="off"></label><div class="chips">${chips}</div></div>
      <div class="summary" id="summary">${summaryHtml(type)}</div>
      <div class="card list" id="list">${listHtml(type === 'sale' ? 'sales' : 'purchase')}</div>`;
  };
  R.sales = () => txView('sale');
  R.purchase = () => txView('purchase');

  R.stock = () => {
    const st = stockMap(), maxBal = Math.max(1, ...Object.values(st).map(e => e.bal));
    return `<section class="grades">${allGrades().map(g => {
      const e = st[g], neg = e.bal < 0;
      return `<div class="card grade ${neg ? 'low' : ''}"><h3>${esc(g)}</h3><div class="big">${num(e.bal)} <small>kg</small></div>
        <div class="progress"><span style="width:${Math.max(2, Math.min(100, Math.max(0, e.bal) / maxBal * 100))}%"></span></div>
        <div class="meta"><span>Opening ${num(e.open)}</span><span>In ${num(e.in)}</span><span>Out ${num(e.out)}</span></div>
        ${neg ? `<div class="warn">${ic('warn')}Sales exceed stock. Check entries or the opening balance.</div>` : ''}</div>`;
    }).join('')}</section>
    <section class="card pad" style="max-width:760px"><h2>Opening balances</h2>
      <p class="muted" style="margin:4px 0 16px">Stock you already had before you started recording. Current stock = opening + purchases − sales.</p>
      <form id="openingForm" class="grid2">${allGrades().map(g => `<label class="field"><input type="number" min="0" step="0.01" inputmode="decimal" data-opening="${esc(g)}" value="${+d.opening[g] || 0}" placeholder=" "><span>${esc(g)} (kg)</span></label>`).join('')}</form>
      <div class="btnrow"><button class="btn filled" data-act="save-opening">Save opening balances</button></div>
    </section>`;
  };

  R.parties = () => `<div class="toolbar"><label class="search">${ic('search')}<input id="q" type="search" placeholder="Search parties" value="${esc(ui.q)}" autocomplete="off"></label>
    <button class="btn outlined" data-act="export-parties">${ic('download')}Export CSV</button></div>
    <div class="card list" id="list">${listHtml('parties')}</div>`;

  R.settings = () => {
    const b = d.business, theme = localStorage.getItem(THEME_KEY) || 'auto';
    const f = (id, label, val, extra = '') => `<label class="field"><input id="${id}" value="${esc(val)}" placeholder=" " ${extra}><span>${label}</span></label>`;
    return `<div class="sections">
      <section class="card section"><h2>Business profile</h2><p class="muted">Shown on every printed invoice.</p>
        <div class="grid1">${f('bn', 'Business name', b.name)}${f('ba', 'Address', b.address)}${f('bp', 'Phone / WhatsApp', b.phone, 'inputmode="tel"')}${f('bg', 'GSTIN', b.gstin, 'style="text-transform:uppercase" maxlength="15"')}</div>
        <div class="btnrow"><button class="btn filled" data-act="save-business">Save profile</button></div></section>
      <section class="card section"><h2>Appearance</h2><p class="muted">Follow your device, or pick a theme.</p>
        <label class="field float"><select id="theme"><option value="auto" ${theme === 'auto' ? 'selected' : ''}>Match device</option><option value="light" ${theme === 'light' ? 'selected' : ''}>Light</option><option value="dark" ${theme === 'dark' ? 'selected' : ''}>Dark</option></select><span>Theme</span></label></section>
      <section class="card section"><h2>Google Sheets &amp; Drive backup</h2><p class="muted">Optional. Deploy the Apps Script in the <code>backend</code> folder, then paste its URL and secret here. Data is saved to your Google account after every change.</p>
        <div class="grid1">${f('cloudurl', 'Apps Script URL', cloudCfg.url || '', 'inputmode="url"')}
        <label class="field"><input id="cloudtoken" type="password" value="${esc(cloudCfg.token || '')}" placeholder=" " autocomplete="off"><span>Sync secret</span></label></div>
        <p class="muted" id="cloudstatus" style="margin-top:12px">Cloud: ${esc(cloudState)}</p>
        <div class="btnrow"><button class="btn filled" data-act="save-cloud">${ic('cloud')}Save connection</button><button class="btn outlined" data-act="cloud-pull">Restore from cloud</button></div></section>
      <section class="card section"><h2>Your data</h2><p class="muted">Data lives in this browser. Download a backup regularly, especially before clearing browser data.</p>
        <div class="btnrow" style="margin-top:0"><button class="btn tonal" data-act="export-json">${ic('download')}Backup (JSON)</button><button class="btn outlined" data-act="import-json">${ic('upload')}Restore backup</button><button class="btn outlined" data-act="export-csv">${ic('download')}Transactions CSV</button><button class="btn outlined" data-act="export-parties">${ic('download')}Parties CSV</button></div>
        <div class="btnrow"><button class="btn danger" data-act="reset">Delete all data in this browser</button></div></section>
      <p class="muted" style="font-size:12px;padding:0 4px">Chandrabala Desk is a working tool, not statutory accounting software. Have your accountant verify GST, invoice numbering and e-invoice / e-way bill rules before relying on it.</p>
    </div>`;
  };

  /* ---------------------------------------------------------------- shell rendering */
  function buildNav() {
    const html = NAV.map(n => `<a class="navitem" data-v="${n.id}" href="#/${n.id}"><span class="pill">${ic(n.icon)}</span><span>${n.label}</span></a>`).join('');
    $('#rail').innerHTML = `<img class="brand" src="assets/logo.svg" alt="Chandrabala">` + html;
    $('#bottomnav').innerHTML = html;
    $('#settingsLink').innerHTML = ic('settings');
  }
  const currentView = () => { const v = location.hash.replace(/^#\/?/, '') || 'home'; return VIEWS[v] ? v : 'home'; };
  function updateFab(v) {
    const fab = $('#fab');
    const cfg = { home: ['add', 'New transaction'], sales: ['add', 'New sale'], purchase: ['add', 'New purchase'], parties: ['person', 'Add party'] }[v];
    fab.hidden = !cfg;
    if (cfg) fab.innerHTML = ic(cfg[0]) + cfg[1];
  }
  function render() {
    const v = ui.view = currentView();
    $('#title').textContent = VIEWS[v][0];
    $('#subtitle').textContent = VIEWS[v][1];
    document.title = VIEWS[v][0] + ' · Chandrabala Desk';
    $('#view').innerHTML = R[v]();
    $$('.navitem').forEach(a => a.classList.toggle('active', a.dataset.v === v));
    $('#settingsLink').style.color = v === 'settings' ? 'var(--primary)' : '';
    updateFab(v);
    $('#partyList').innerHTML = d.parties.map(p => `<option value="${esc(p.name)}">`).join('');
  }

  /* ---------------------------------------------------------------- feedback: toast + confirm */
  let toastTimer;
  function toast(msg, actionLabel, fn) {
    const el = $('#snackbar');
    el.innerHTML = `<span>${esc(msg)}</span>` + (actionLabel ? `<button type="button">${esc(actionLabel)}</button>` : '');
    if (actionLabel) $('button', el).onclick = () => { el.classList.remove('show'); fn && fn(); };
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), actionLabel ? 7000 : 3500);
  }
  function ask(title, msg, ok = 'Delete') {
    return new Promise(res => {
      const dlg = $('#confirmDlg');
      $('#cTitle').textContent = title; $('#cMsg').textContent = msg; $('#cOk').textContent = ok;
      $('#cOk').classList.toggle('danger', /delete|reset/i.test(ok));
      dlg.returnValue = '';
      dlg.addEventListener('close', () => res(dlg.returnValue === 'ok'), { once: true });
      dlg.showModal();
    });
  }

  /* ---------------------------------------------------------------- transactions */
  const byId = id => d.tx.find(t => t.id === id);
  function openTx(t, type) {
    const f = $('#txForm');
    f.reset();
    const gradeSel = f.grade;
    gradeSel.innerHTML = allGrades().map(g => `<option>${esc(g)}</option>`).join('');
    f.editid.value = t?.id || '';
    f.type.value = t?.type || type || 'sale';
    f.date.value = t?.date || today();
    f.party.value = t?.party || '';
    f.phone.value = t?.phone || '';
    f.grade.value = t?.grade || GRADES[0];
    f.qty.value = t?.qty ?? '';
    f.rate.value = t?.rate ?? '';
    f.gst.value = String(t?.gst ?? 0);
    f.igst.checked = !!t?.igst;
    f.status.value = t?.status || 'pending';
    f.paid.value = t?.paid || '';
    f.notes.value = t?.notes || '';
    $('#txTitle').textContent = t ? 'Edit ' + t.id : 'New transaction';
    updateTxForm();
    $('#txDlg').showModal();
  }
  function formTx() {
    const f = $('#txForm');
    return { type: f.type.value, grade: f.grade.value, qty: +f.qty.value || 0, rate: +f.rate.value || 0, gst: +f.gst.value || 0, editid: f.editid.value };
  }
  function updateTxForm() {
    const x = formTx(), c = calc(x);
    $('#calc').innerHTML = `<span>${x.gst ? `Taxable ${inr(c.taxable)} + GST ${inr(c.tax)}` : 'Total'}</span><b>${inr(c.total)}</b>`;
    const hint = $('#stockHint');
    hint.className = 'hint full';
    hint.textContent = '';
    if (x.type === 'sale' && x.qty) {
      const old = x.editid ? byId(x.editid) : null;
      const avail = stockMap()[x.grade]?.bal ?? 0;
      const free = avail + (old && isSale(old) && old.grade === x.grade ? +old.qty : 0);
      hint.textContent = x.qty > free ? `Only ${num(free)} kg of ${x.grade} in stock. You can still save this sale.` : `${num(free)} kg of ${x.grade} in stock.`;
      if (x.qty > free) hint.classList.add('warn');
    }
  }
  function submitTx(e) {
    e.preventDefault();
    const f = e.target, id = f.editid.value, old = id ? byId(id) : null;
    const t = settle({
      id: id || 'CRI-' + String(++d.counter).padStart(4, '0'),
      type: f.type.value, date: f.date.value, party: f.party.value.trim(), phone: f.phone.value.trim(),
      grade: f.grade.value, qty: +f.qty.value, rate: +f.rate.value, gst: +f.gst.value, igst: f.igst.checked && +f.gst.value > 0,
      status: f.status.value, paid: +f.paid.value || 0, notes: f.notes.value.trim(), created: old?.created || Date.now(),
    });
    if (!t.party) { toast('Enter a party name'); return; }
    if (old) d.tx = d.tx.map(x => x.id === id ? t : x); else d.tx.push(t);
    const p = d.parties.find(x => x.name === t.party);
    if (p) { if (t.phone) p.phone = t.phone; }
    else d.parties.push({ name: t.party, phone: t.phone, type: isSale(t) ? 'Customer' : 'Supplier' });
    save();
    $('#txDlg').close();
    render();
    toast((old ? 'Updated ' : 'Saved ') + t.id);
  }
  async function deleteTx(id) {
    const t = byId(id); if (!t) return;
    if (!await ask('Delete ' + t.id + '?', `${t.party} · ${inr(calc(t).total)}. Stock and totals will recalculate.`)) return;
    const idx = d.tx.indexOf(t);
    d.tx.splice(idx, 1); save(); render();
    toast('Deleted ' + t.id, 'Undo', () => { d.tx.splice(Math.min(idx, d.tx.length), 0, t); save(); render(); });
  }
  function showDetail(id) {
    const t = byId(id); if (!t) return;
    const c = calc(t), sale = isSale(t), half = r2(c.tax / 2);
    const taxRows = !t.gst ? '' : t.igst ? `<dt>IGST @ ${t.gst}%</dt><dd>${inr(c.tax)}</dd>` : `<dt>CGST @ ${t.gst / 2}%</dt><dd>${inr(half)}</dd><dt>SGST @ ${t.gst / 2}%</dt><dd>${inr(r2(c.tax - half))}</dd>`;
    $('#detailBody').innerHTML = `
      <div class="dhead"><div><h2>${esc(t.party)}</h2><div class="dsub">${sale ? 'Sales invoice' : 'Purchase bill'} ${esc(t.id)} · ${fmtDate(t.date)}</div>${t.phone ? `<div class="dsub">${esc(t.phone)}</div>` : ''}</div>${badge(t)}</div>
      <dl class="dl">
        <dt>${esc(t.grade)}</dt><dd>${num(t.qty)} kg × ${inr(t.rate)}</dd>
        <dt>Taxable value</dt><dd>${inr(c.taxable)}</dd>${taxRows}
        <div class="sep"></div><dt class="tot">Total</dt><dd class="tot">${inr(c.total)}</dd>
        <dt>${sale ? 'Received' : 'Paid'}</dt><dd>${inr(paidOf(t))}</dd>
        <dt>Balance</dt><dd><b>${inr(balance(t))}</b></dd>
        ${t.notes ? `<div class="sep"></div><dt>Notes</dt><dd>${esc(t.notes)}</dd>` : ''}
      </dl>
      <div class="dactions" style="justify-content:flex-start">
        ${balance(t) > 0 ? `<button class="btn filled" data-act="pay" data-id="${esc(t.id)}">${ic('wallet')}Record payment</button>` : ''}
        <button class="btn tonal" data-act="invoice" data-id="${esc(t.id)}">${ic('print')}${sale ? 'Invoice' : 'Print'}</button>
        <button class="btn outlined" data-act="whatsapp" data-id="${esc(t.id)}">${ic('send')}WhatsApp</button>
        <button class="btn outlined" data-act="edit-tx" data-id="${esc(t.id)}">${ic('edit')}Edit</button>
        <button class="btn danger" data-act="delete-tx" data-id="${esc(t.id)}">${ic('del')}Delete</button>
      </div>
      <div class="dactions" style="margin-top:8px"><button class="btn" data-act="close">Close</button></div>`;
    $('#detailDlg').showModal();
  }
  function openPay(id) {
    const t = byId(id); if (!t) return;
    $('#payInfo').textContent = `${t.id} · ${t.party} · balance ${inr(balance(t))}`;
    const f = $('#payForm'); f.tid.value = id; f.amount.value = balance(t); f.amount.max = balance(t);
    $('#detailDlg').close(); $('#payDlg').showModal();
  }
  function submitPay(e) {
    e.preventDefault();
    const f = e.target, t = byId(f.tid.value); if (!t) return;
    t.paid = r2(paidOf(t) + (+f.amount.value || 0)); t.status = 'partial'; settle(t);
    save(); $('#payDlg').close(); render(); toast('Payment recorded for ' + t.id);
  }

  /* ---------------------------------------------------------------- invoice + WhatsApp */
  function printInvoice(id) {
    const t = byId(id); if (!t) return;
    const b = d.business, c = calc(t), sale = isSale(t), half = r2(c.tax / 2);
    const taxRows = !t.gst ? '' : t.igst ? `<tr><td>IGST @ ${t.gst}%</td><td class="r">${inr(c.tax)}</td></tr>` : `<tr><td>CGST @ ${t.gst / 2}%</td><td class="r">${inr(half)}</td></tr><tr><td>SGST @ ${t.gst / 2}%</td><td class="r">${inr(r2(c.tax - half))}</td></tr>`;
    $('#printArea').innerHTML = `<div class="inv">
      <div class="inv-top">
        <div class="inv-brand"><img src="assets/logo.svg" alt=""><div><h1>${esc(b.name)}</h1><p>${esc(b.address)}</p><p>${b.phone ? 'Phone: ' + esc(b.phone) : ''}${b.gstin ? ' &nbsp; GSTIN: ' + esc(b.gstin.toUpperCase()) : ''}</p></div></div>
        <div class="inv-title"><h2>${sale ? (b.gstin ? 'Tax Invoice' : 'Invoice') : 'Purchase Bill'}</h2><p><b>${esc(t.id)}</b></p><p>Date: ${fmtDate(t.date)}</p></div>
      </div>
      <div class="inv-meta">
        <div><h3>${sale ? 'Bill to' : 'Supplier'}</h3><b>${esc(t.party)}</b>${t.phone ? '<br>' + esc(t.phone) : ''}</div>
        <div style="text-align:right"><h3>Payment</h3><b>${{ paid: 'Paid', pending: 'Pending', partial: 'Partially paid' }[t.status]}</b><br>${sale ? 'Received' : 'Paid'}: ${inr(paidOf(t))}<br>Balance: ${inr(balance(t))}</div>
      </div>
      <table><thead><tr><th>#</th><th>Description</th><th class="r">Qty (kg)</th><th class="r">Rate</th><th class="r">Taxable value</th></tr></thead>
        <tbody><tr><td>1</td><td>Natural rubber — ${esc(t.grade)}</td><td class="r">${num(t.qty)}</td><td class="r">${inr(t.rate)}</td><td class="r">${inr(c.taxable)}</td></tr></tbody></table>
      <table class="inv-sum"><tbody><tr><td>Taxable value</td><td class="r">${inr(c.taxable)}</td></tr>${taxRows}<tr class="t"><td>Total</td><td class="r">${inr(c.total)}</td></tr></tbody></table>
      <div class="inv-words"><b>Amount in words:</b> ${rupeesInWords(c.total)}</div>
      ${t.notes ? `<p style="margin-top:12px"><b>Notes:</b> ${esc(t.notes)}</p>` : ''}
      <div class="inv-foot"><div class="inv-note" style="margin:0">Thank you for your business.<br>This is a computer-generated document.</div><div class="inv-sign">For ${esc(b.name)}<br><br>Authorised signatory</div></div>
    </div>`;
    const dlg = $('#detailDlg'); if (dlg.open) dlg.close();
    const prev = document.title; document.title = t.id + ' · ' + t.party;
    setTimeout(() => { window.print(); document.title = prev; }, 60);
  }
  function openWhatsApp(phone, text) {
    const p = normPhone(phone);
    if (!p) { toast('Add a WhatsApp number first'); return false; }
    window.open('https://wa.me/' + p + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    return true;
  }
  function whatsappTx(id) {
    const t = byId(id); if (!t) return;
    const c = calc(t), name = d.business.name;
    const phone = t.phone || d.parties.find(p => p.name === t.party)?.phone || prompt('WhatsApp number (with country code, or 10-digit Indian number)');
    if (!phone) return;
    const msg = `${isSale(t) ? 'Invoice' : 'Purchase bill'} ${t.id} from ${name}\nDate: ${fmtDate(t.date)}\nParty: ${t.party}\n${t.grade}: ${num(t.qty)} kg @ ${inr(t.rate)}${t.gst ? `\nGST ${t.gst}%: ${inr(c.tax)}` : ''}\nTotal: ${inr(c.total)}\nBalance due: ${inr(balance(t))}\n\nThank you.`;
    openWhatsApp(phone, msg);
  }

  /* ---------------------------------------------------------------- parties */
  function openParty(name) {
    const f = $('#partyForm'), p = name ? d.parties.find(x => x.name === name) : null;
    f.reset(); f.orig.value = p?.name || ''; f.pname.value = p?.name || ''; f.phone.value = p?.phone || ''; f.type.value = p?.type || 'Customer';
    $('#partyTitle').textContent = p ? 'Edit party' : 'Add party';
    $('#partyDlg').showModal();
  }
  function submitParty(e) {
    e.preventDefault();
    const f = e.target, orig = f.orig.value, name = f.pname.value.trim(), phone = f.phone.value.trim(), type = f.type.value;
    if (!name) return;
    if (d.parties.some(p => p.name === name && p.name !== orig)) { toast('A party named “' + name + '” already exists'); return; }
    if (orig) {
      const p = d.parties.find(x => x.name === orig);
      if (p) { d.tx.forEach(t => { if (t.party === orig) t.party = name; }); Object.assign(p, { name, phone, type }); }
    } else d.parties.push({ name, phone, type });
    save(); $('#partyDlg').close(); render(); toast(orig ? 'Party updated' : 'Party added');
  }
  async function deleteParty(name) {
    if (d.tx.some(t => t.party === name)) { toast('“' + name + '” has transactions. Edit the party instead of deleting it.'); return; }
    if (!await ask('Delete ' + name + '?', 'This party has no transactions.')) return;
    d.parties = d.parties.filter(p => p.name !== name); save(); render(); toast('Party deleted');
  }

  /* ---------------------------------------------------------------- export / import */
  function download(content, name, type) {
    const a = document.createElement('a'), url = URL.createObjectURL(new Blob([content], { type }));
    a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  const csvCell = x => { let s = String(x ?? ''); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
  function downloadCsv(rows, name) { download('﻿' + rows.map(r => r.map(csvCell).join(',')).join('\r\n'), name, 'text/csv;charset=utf-8'); }
  function exportCsv() {
    downloadCsv([['Document', 'Type', 'Date', 'Party', 'Phone', 'Grade', 'Qty kg', 'Rate', 'GST %', 'Taxable', 'GST amount', 'Total', 'Paid', 'Balance', 'Status', 'Notes'],
      ...sorted(d.tx).map(t => { const c = calc(t); return [t.id, t.type, t.date, t.party, t.phone, t.grade, t.qty, t.rate, t.gst, c.taxable, c.tax, c.total, paidOf(t), balance(t), t.status, t.notes]; })], 'chandrabala-transactions-' + today() + '.csv');
  }
  const exportParties = () => downloadCsv([['Name', 'Phone', 'Type'], ...d.parties.map(p => [p.name, p.phone, p.type])], 'chandrabala-parties-' + today() + '.csv');
  const exportJson = () => { download(JSON.stringify(d, null, 2), 'chandrabala-desk-backup-' + today() + '.json', 'application/json'); toast('Backup downloaded'); };
  function importJson(file) {
    const rd = new FileReader();
    rd.onload = async () => {
      try {
        const x = JSON.parse(rd.result);
        if (!x || !Array.isArray(x.tx)) throw new Error('shape');
        if (await ask('Restore this backup?', `It contains ${x.tx.length} transactions. This replaces the data currently in this browser.`, 'Restore')) { d = normalize(x); save(); render(); toast('Backup restored'); }
      } catch (e) { toast('That file is not a valid Chandrabala Desk backup'); }
    };
    rd.readAsText(file);
  }

  /* ---------------------------------------------------------------- events */
  const actions = {
    fab: () => { const v = ui.view; if (v === 'parties') openParty(); else openTx(null, v === 'purchase' ? 'purchase' : 'sale'); },
    'new-tx': el => { $('#detailDlg').open && $('#detailDlg').close(); openTx(null, el.dataset.type); },
    'view-tx': el => showDetail(el.dataset.id),
    'edit-tx': el => { $('#detailDlg').open && $('#detailDlg').close(); openTx(byId(el.dataset.id)); },
    'delete-tx': el => { $('#detailDlg').open && $('#detailDlg').close(); deleteTx(el.dataset.id); },
    invoice: el => printInvoice(el.dataset.id),
    whatsapp: el => whatsappTx(el.dataset.id),
    pay: el => openPay(el.dataset.id),
    chip: el => { ui.status = el.dataset.v; $$('.chip').forEach(c => c.setAttribute('aria-pressed', String(c === el))); $('#list').innerHTML = listHtml(ui.view === 'sales' ? 'sales' : 'purchase'); },
    close: el => el.closest('dialog').close(),
    'edit-party': el => openParty(el.dataset.name),
    'delete-party': el => deleteParty(el.dataset.name),
    'party-wa': el => { const p = d.parties.find(x => x.name === el.dataset.name); if (p) openWhatsApp(p.phone, `Hello ${p.name}, this is ${d.business.name}.`); },
    'save-opening': () => { $$('[data-opening]').forEach(i => d.opening[i.dataset.opening] = Math.max(0, +i.value || 0)); save(); render(); toast('Opening balances saved'); },
    'save-business': () => { d.business = { name: $('#bn').value.trim() || 'My Business', address: $('#ba').value.trim(), phone: $('#bp').value.trim(), gstin: $('#bg').value.trim().toUpperCase() }; save(); toast('Business profile saved'); },
    'save-cloud': () => { cloudCfg = { url: $('#cloudurl').value.trim(), token: $('#cloudtoken').value.trim() }; localStorage.setItem(CLOUD_KEY, JSON.stringify(cloudCfg)); cloudState = cloudCfg.url ? 'Connection saved' : 'Not connected'; if (cloudCfg.url) cloudPush(); $('#cloudstatus').textContent = 'Cloud: ' + cloudState; toast(cloudCfg.url ? 'Cloud connection saved' : 'Cloud connection removed'); },
    'cloud-pull': cloudPull,
    'export-csv': exportCsv, 'export-parties': exportParties, 'export-json': exportJson,
    'import-json': () => $('#importFile').click(),
    reset: async () => {
      if (!await ask('Delete all data?', 'This removes every transaction, party and opening balance from this browser. Download a backup first.', 'Delete everything')) return;
      d = { ...defaults(), business: d.business }; save(); render(); toast('All data deleted');
    },
  };
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-act]');
    if (el) { actions[el.dataset.act]?.(el); return; }
    const dlg = e.target; if (dlg.tagName === 'DIALOG' && dlg.id !== 'confirmDlg') dlg.close();   // backdrop click
  });
  document.addEventListener('keydown', e => {
    if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('.row[data-act]')) { e.preventDefault(); actions[e.target.dataset.act](e.target); }
  });
  document.addEventListener('input', e => {
    if (e.target.id === 'q') {
      ui.q = e.target.value;
      $('#list').innerHTML = listHtml(ui.view === 'parties' ? 'parties' : ui.view === 'sales' ? 'sales' : 'purchase');
    }
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'theme') { localStorage.setItem(THEME_KEY, e.target.value); applyTheme(); }
  });
  $('#txForm').addEventListener('input', updateTxForm);
  $('#txForm').addEventListener('change', updateTxForm);
  $('#txForm').addEventListener('submit', submitTx);
  $('#txForm').party.addEventListener('change', e => {      // autofill phone for known parties
    const p = d.parties.find(x => x.name === e.target.value.trim()), f = $('#txForm');
    if (p && !f.phone.value) f.phone.value = p.phone || '';
  });
  $('#payForm').addEventListener('submit', submitPay);
  $('#partyForm').addEventListener('submit', submitParty);
  $('#importFile').addEventListener('change', e => { if (e.target.files[0]) importJson(e.target.files[0]); e.target.value = ''; });
  window.addEventListener('hashchange', () => { ui.q = ''; ui.status = 'all'; render(); window.scrollTo(0, 0); });

  function applyTheme() {
    const t = localStorage.getItem(THEME_KEY) || 'auto';
    if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.setAttribute('data-theme', t);
    const dark = t === 'dark' || (t === 'auto' && matchMedia('(prefers-color-scheme: dark)').matches);
    $('meta[name="theme-color"]').setAttribute('content', dark ? '#1f2023' : '#1a73e8');
  }

  /* ---------------------------------------------------------------- start */
  applyTheme();
  buildNav();
  render();
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('sw.js').catch(() => { });
})();
