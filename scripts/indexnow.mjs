#!/usr/bin/env node
/**
 * Submit every URL in the live sitemap to IndexNow (Bing, Yandex, Seznam, Naver).
 *
 * Why: Bing had indexed only 16 of 33 sitemap URLs (Oct 2026), and ChatGPT
 * search and Copilot ground their answers in Bing's index. IndexNow tells Bing
 * about new and changed pages immediately instead of waiting for a crawl.
 *
 * The key file lives at public/<KEY>.txt and must contain exactly the key.
 * Runs from .github/workflows/indexnow.yml after each successful production
 * deploy, or by hand:  node scripts/indexnow.mjs
 */
const SITE = process.env.SITE_URL ?? "https://growthmasala.com";
const KEY = process.env.INDEXNOW_KEY ?? "9955c3d3a5eb45cf975e093b63847fa0";
const host = new URL(SITE).host;

const sitemap = await fetch(`${SITE}/sitemap.xml`, { cache: "no-store" });
if (!sitemap.ok) throw new Error(`sitemap fetch failed: ${sitemap.status}`);
const xml = await sitemap.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
  .map((m) => m[1].trim())
  .filter((u) => new URL(u).host === host);
if (urls.length === 0) throw new Error("no URLs found in sitemap");

// Fail early if the key file isn't live — IndexNow rejects the batch otherwise.
const keyFile = await fetch(`${SITE}/${KEY}.txt`, { cache: "no-store" });
if (!keyFile.ok || (await keyFile.text()).trim() !== KEY) {
  throw new Error(`key file ${SITE}/${KEY}.txt missing or wrong`);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList: urls,
  }),
});
// 200 = accepted, 202 = accepted, key validation pending.
console.log(`IndexNow: submitted ${urls.length} URLs, HTTP ${res.status}`);
if (res.status !== 200 && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
