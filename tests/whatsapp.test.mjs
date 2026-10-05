import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadTypescript } from './helpers/load-typescript.mjs';

const whatsapp = loadTypescript('src/lib/whatsapp.ts');
const analytics = loadTypescript('src/lib/analytics.ts');
const { business } = loadTypescript('src/data/business.ts');

// Catches unescaped query delimiters, Unicode loss, and caller-controlled destinations.
test('enquiry link preserves Unicode and newlines without changing the destination', () => {
  assert.equal(typeof whatsapp.enquiryWhatsappLink, 'function');
  const link = new URL(whatsapp.enquiryWhatsappLink({
    name: '  అనిల్  ', business: 'Café & Co', service: 'Website',
    message: 'Hello 👋\nhttps://other.example/?x=1&text=oops#fragment',
    destination: 'https://other.example/',
  }));
  assert.equal(link.origin + link.pathname, business.whatsapp);
  assert.deepEqual([...link.searchParams.keys()], ['text']);
  assert.equal(link.hash, '');
  assert.equal(link.searchParams.get('text'), "Hi Growth Masala, I'd like to discuss a project.\n\nName: అనిల్\nBusiness: Café & Co\nService: Website\n\nHello 👋\nhttps://other.example/?x=1&text=oops#fragment");
});

test('blank optional fields are omitted and chatbot phone is retained when supplied', () => {
  assert.equal(typeof whatsapp.enquiryWhatsappLink, 'function');
  const link = new URL(whatsapp.enquiryWhatsappLink({ name: 'Ana', business: '  ', service: '', message: 'A website', phone: '+91 98765 43210' }));
  assert.equal(link.searchParams.get('text'), "Hi Growth Masala, I'd like to discuss a project.\n\nName: Ana\nPhone: +91 98765 43210\n\nA website");
});

test('required brief fields reject whitespace, malformed values, and excessive lengths', () => {
  assert.equal(typeof whatsapp.validateEnquiry, 'function');
  assert.deepEqual(whatsapp.validateEnquiry({ name: 'Ana', message: 'A website' }), {});
  for (const values of [null, {}, { name: ' ', message: '\n' }, { name: 42, message: [] }]) {
    const errors = whatsapp.validateEnquiry(values);
    assert.ok(errors.name);
    assert.ok(errors.message);
  }
  const errors = whatsapp.validateEnquiry({ name: 'a'.repeat(101), business: 'b'.repeat(151), service: 'c'.repeat(151), message: 'd'.repeat(1501) });
  assert.deepEqual(Object.keys(errors).sort(), ['business', 'message', 'name', 'service']);
});

test('malformed or oversized chatbot data produces a bounded link without crashing', () => {
  assert.equal(typeof whatsapp.enquiryWhatsappLink, 'function');
  const link = new URL(whatsapp.enquiryWhatsappLink({ name: null, business: {}, phone: '1'.repeat(100), service: 's'.repeat(10000), message: 'm'.repeat(10000) }));
  assert.ok(link.searchParams.get('text').length < 2000);
  assert.equal(link.origin + link.pathname, business.whatsapp);
});

test('WhatsApp analytics emits only controlled intent metadata, never a confirmed lead or PII', () => {
  assert.equal(typeof analytics.trackWhatsAppClick, 'function');
  const previousWindow = globalThis.window;
  const previousId = process.env.NEXT_PUBLIC_GA_ID;
  process.env.NEXT_PUBLIC_GA_ID = 'G-TEST';
  globalThis.window = {};
  try {
    analytics.trackWhatsAppClick('contact_form', 'website-development');
    analytics.trackWhatsAppClick('chatbot', 'Ana +919876543210 private@example.com');
    analytics.trackWhatsAppClick('private@example.com', 'website-development');
    assert.deepEqual(window.dataLayer, [
      ['event', 'whatsapp_click', { method: 'contact_form', service: 'website-development' }],
      ['event', 'whatsapp_click', { method: 'chatbot' }],
    ]);
    const events = [];
    window.gtag = (...args) => events.push(args);
    analytics.trackWhatsAppClick('chatbot');
    assert.deepEqual(events, [['event', 'whatsapp_click', { method: 'chatbot' }]]);
  } finally {
    if (previousWindow === undefined) delete globalThis.window;
    else globalThis.window = previousWindow;
    if (previousId === undefined) delete process.env.NEXT_PUBLIC_GA_ID;
    else process.env.NEXT_PUBLIC_GA_ID = previousId;
  }
});

for (const endpoint of ['contact', 'lead']) {
  test(`retired ${endpoint} endpoint returns WhatsApp instructions without reading enquiry data`, async () => {
    const { POST } = loadTypescript(`src/app/api/${endpoint}/route.ts`);
    let bodyRead = false;
    const response = await POST({ json: async () => { bodyRead = true; throw new Error('Do not read private enquiry data'); } });
    assert.equal(response.status, 410);
    assert.equal(bodyRead, false);
    const body = await response.json();
    assert.equal(body.whatsapp, business.whatsapp);
    assert.match(body.error, /WhatsApp/);
    assert.equal(body.success, undefined);
  });
}
