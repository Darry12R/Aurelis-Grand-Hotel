import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';

// Any accidental old-store read, write or deletion fails these tests.
for (const name of ['localStorage', 'sessionStorage']) {
  Object.defineProperty(globalThis, name, { configurable: true, get() { throw new Error(`Unexpected ${name} access`); } });
}
const { state, save, resetDemo } = await import('../dist/js/state.js');
const D = await import('../dist/js/dialogs.js');
const C = await import('../dist/js/components.js');
const overlay = { innerHTML: '' };
globalThis.document = {
  activeElement: { focus() {} },
  body: { classList: { add() {}, remove() {} } },
  querySelector(selector) {
    if (selector === '#overlay') return overlay;
    return { focus() {}, append() {} };
  },
  createElement() { return { remove() {} }; },
};
globalThis.FormData = class { constructor(form) { return Object.entries(form); } };

test('fresh documents start empty and never read legacy browser values', async () => {
  resetDemo();
  state.cart.push({ id: 1, qty: 2, notes: 'Demo only' });
  state.orders.push({ id: 'SAMPLE' });
  state.room = '508';
  state.lang = 'en';
  save();
  const fresh = await import(`../dist/js/state.js?reload=${Date.now()}`);
  assert.deepEqual(fresh.state.cart, []);
  assert.deepEqual(fresh.state.orders, []);
  assert.deepEqual(fresh.state.reservations, []);
  assert.equal(fresh.state.room, '');
  assert.equal(fresh.state.lang, 'es');
  assert.equal(state.cart.length, 1, 'same-document interactions retain state');
});

test('simulated order remains interactive, escaped and temporary', () => {
  resetDemo();
  state.room = '508';
  state.cart.push({ id: 1, qty: 2, notes: '<script>not executable</script>' });
  D.Cart();
  assert.match(overlay.innerHTML, /&lt;script&gt;not executable&lt;\/script&gt;/);
  D.Checkout(true);
  D.checkoutAction('checkout-next');
  assert.match(overlay.innerHTML, /value="508"/);
  assert.match(overlay.innerHTML, /autocomplete="off"/);
  D.checkoutInfo({ first: '<img src=x>', last: 'Demo', phone: '000000000', room: '508', timing: 'now' });
  assert.match(overlay.innerHTML, /&lt;img src=x&gt;/);
  D.confirmOrder();
  assert.equal(state.orders.length, 1);
  assert.equal(state.cart.length, 0);
  assert.ok(state.orders[0].total > 0);
  assert.equal('first' in state.orders[0], false);
  assert.equal('phone' in state.orders[0], false);
  assert.match(overlay.innerHTML, /Pedido simulado/);
  assert.match(overlay.innerHTML, /No se prepara ni entrega/);
  D.OrderStatus(state.orders[0].id);
  assert.match(overlay.innerHTML, /SEGUIMIENTO SIMULADO/);
});

test('reservation confirmation uses dummy data without contact persistence', () => {
  resetDemo();
  D.resetDialogs();
  const future = new Date();
  future.setDate(future.getDate() + 10);
  if (future.getDay() === 1) future.setDate(future.getDate() + 1);
  const date = `${future.getFullYear()}-${String(future.getMonth() + 1).padStart(2, '0')}-${String(future.getDate()).padStart(2, '0')}`;
  D.reserveAvailability({ date, guests: '2', preferred: '19:00' });
  D.reserveSlot('19:00');
  assert.match(overlay.innerHTML, /No hay reservas, pedidos, mensajes ni cobros reales/);
  D.reserveConfirm({ first: '<b>Guest</b>', last: 'Sample', email: 'guest@example.invalid', phone: '000000000', allergies: 'SAMPLE', occasion: 'Cena' });
  assert.equal(state.reservations.length, 1);
  assert.equal('email' in state.reservations[0], false);
  assert.equal('phone' in state.reservations[0], false);
  assert.equal('allergies' in state.reservations[0], false);
  assert.match(overlay.innerHTML, /&lt;b&gt;Guest&lt;\/b&gt;/);
  assert.match(overlay.innerHTML, /No existe una reserva real/);
  assert.doesNotMatch(overlay.innerHTML, /<b>Guest<\/b>/);
});

test('explicit restart clears only current in-memory activity', () => {
  state.room = '508';
  state.favorites.push(1);
  resetDemo();
  D.resetDialogs();
  assert.equal(state.room, '');
  for (const name of ['cart', 'orders', 'reservations', 'favorites']) assert.deepEqual(state[name], []);
  D.Checkout(true);
  D.checkoutAction('checkout-next');
  assert.doesNotMatch(overlay.innerHTML, /value="508"/);
  D.ReservationsForm();
  assert.match(overlay.innerHTML, /name="date" type="date" value=""/);
});

test('both languages identify the demo and room number stays escaped', () => {
  state.lang = 'es';
  assert.match(C.DemoNotice(), /Sin reservas, pedidos ni cobros reales/);
  state.lang = 'en';
  assert.match(C.DemoNotice(), /No real bookings, orders or charges/);
  D.EventForm();
  assert.match(overlay.innerHTML, /Use fictional data only/);
  state.room = '\"><img src=x>';
  assert.match(C.RoomService(), /value="&quot;&gt;&lt;img src=x&gt;"/);
  resetDemo();
});

test('runtime has no persistent storage or network-submission APIs', () => {
  const files = readdirSync(new URL('../dist/js/', import.meta.url)).filter(x => x.endsWith('.js'));
  for (const name of files) {
    const body = readFileSync(new URL(`../dist/js/${name}`, import.meta.url), 'utf8');
    assert.doesNotMatch(body, /\b(?:localStorage|sessionStorage|indexedDB|XMLHttpRequest|WebSocket)\b|document\.cookie|\bfetch\s*\(|sendBeacon\s*\(/, name);
  }
  assert.match(readFileSync(new URL('../dist/js/app.js', import.meta.url), 'utf8'), /addEventListener\('submit',e=>\{e\.preventDefault\(\)/);
});

test('noindex, crawlable robots and compatible Vercel headers are present', () => {
  for (const file of ['index.html', 'room-service/index.html']) {
    const html = readFileSync(new URL(`../dist/${file}`, import.meta.url), 'utf8');
    assert.match(html, /name="robots" content="noindex, nofollow"/);
    assert.doesNotMatch(html, /<script(?![^>]*\bsrc=)/);
  }
  const robots = readFileSync(new URL('../dist/robots.txt', import.meta.url), 'utf8');
  assert.match(robots, /^User-agent: \*\r?\nAllow: \/\r?\n/);
  assert.doesNotMatch(robots, /Disallow: \/|<html/);
  const conf = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
  const headers = Object.fromEntries(conf.headers[0].headers.map(x => [x.key, x.value]));
  const csp = headers['Content-Security-Policy'];
  assert.match(csp, /connect-src 'none'/);
  assert.match(csp, /form-action 'none'/);
  assert.match(csp, /script-src 'self'/);
  assert.match(csp, /font-src 'self';/);
  assert.match(csp, /style-src 'self';/);
  assert.doesNotMatch(csp, /https?:\/\//);
  assert.doesNotMatch(csp, /unsafe-inline|unsafe-eval|\*/);
  assert.equal(headers['X-Robots-Tag'], 'noindex, nofollow');
  assert.equal(headers['X-Content-Type-Options'], 'nosniff');
  assert.equal(headers['X-Frame-Options'], 'DENY');
});
