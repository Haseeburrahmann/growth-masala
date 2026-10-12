import assert from 'node:assert/strict';
import { test } from 'node:test';
import { loadTypescript } from './helpers/load-typescript.mjs';

const { estimateWebsiteCost } = loadTypescript('src/lib/website-cost.ts');

// Missing supplier charges must not turn into a misleading zero-cost total.
test('unknown domain or hosting keeps complete estimates unavailable', () => {
  for (const [domain, hosting] of [['', ''], ['1200', ''], ['', '2400']]) {
    assert.equal(estimateWebsiteCost(9999, 0, domain, hosting), null);
  }
});

// Catches charging the one-time build repeatedly or omitting a year of renewals.
test('separates one-time build from annual running costs', () => {
  assert.deepEqual(estimateWebsiteCost(9999, 0, '1200', '2400'), {
    annualRunning: 3600, firstYear: 13599, threeYears: 20799,
  });
});

// Optional care is monthly, not an annual fee or another build payment.
test('includes all twelve months of selected care each year', () => {
  assert.deepEqual(estimateWebsiteCost(18999, 1499, '1000', '2000'), {
    annualRunning: 20988, firstYear: 39987, threeYears: 81963,
  });
});

test('accepts an explicitly confirmed zero and decimal rupee inputs', () => {
  assert.deepEqual(estimateWebsiteCost(9999, 0, '0', '0'), {
    annualRunning: 0, firstYear: 9999, threeYears: 9999,
  });
  assert.deepEqual(estimateWebsiteCost(9999, 0, '999.50', '1500.25'), {
    annualRunning: 2499.75, firstYear: 12498.75, threeYears: 17498.25,
  });
});

test('rejects negative, malformed and non-finite costs', () => {
  for (const invalid of [' ', '-1', 'Infinity', '1e9', 'abc', '0x10', '1.234']) {
    assert.equal(estimateWebsiteCost(9999, 0, invalid, '0'), null);
  }
});
