# Google Search Console Setup — Browser Agent Brief

A paste-ready prompt for Claude in the browser (Chrome extension / Claude for
Chrome), plus the human context behind it.

---

## ⛔ Do this first — deploy

**Do not run the browser task until the SEO fixes are deployed to production.**

Search Console acts on what Google crawls. If you submit the sitemap while the
old build is live, Google re-crawls pages that still canonicalise to the homepage
and you burn the crawl for nothing.

```bash
git add -A && git commit -m "fix: SEO — per-page canonicals, location pages, schema"
git push
```

Then confirm the fix is actually live before continuing:

```bash
curl -s https://growthmasala.com/services | grep -o '<link rel="canonical"[^>]*>'
```

**Expected:** `<link rel="canonical" href="https://growthmasala.com/services"/>`

If it still says `href="https://growthmasala.com"`, the deploy hasn't propagated.
Wait and re-check. **Do not proceed until this returns the `/services` URL.**

---

## Which verification method

| Method | Use when | Trade-off |
|--------|----------|-----------|
| **DNS TXT (Domain property)** ← recommended | You can edit DNS for `growthmasala.com` | Covers http, https, www, and all subdomains in one property. No redeploy needed. |
| **HTML tag (URL prefix property)** | No DNS access | Only covers the exact prefix `https://growthmasala.com`. Needs an env var **and a redeploy**. |

The code already supports the HTML-tag path: set `GOOGLE_SITE_VERIFICATION` in
Vercel to the token, then **redeploy**. Pages are statically prerendered, so the
token is read at build time — setting the variable without a new deploy does
nothing. (Verified.)

**Where DNS lives:** if the domain is managed by Vercel, it's Vercel → Project →
Settings → Domains. If bought from GoDaddy / Namecheap / Hostinger and pointed at
Vercel, DNS records are at that registrar, not Vercel.

---

## The prompt

Copy everything below into Claude in the browser.

---

> **Task: set up Google Search Console for growthmasala.com**
>
> I need you to verify ownership of my site in Google Search Console, submit the
> sitemap, and request indexing on the priority pages. Work through this in
> order and tell me what you find at each checkpoint — don't skip ahead if
> something looks wrong.
>
> **Context you need:**
> - Site: `https://growthmasala.com` (Next.js, hosted on Vercel)
> - Sitemap: `https://growthmasala.com/sitemap.xml` — should contain **22 URLs**
> - The site was previously not indexed at all because of a canonical-tag bug.
>   That is now fixed and deployed. The goal of this task is to get Google to
>   re-crawl everything.
>
> ---
>
> **Step 1 — Confirm I'm signed in**
>
> Go to https://search.google.com/search-console
>
> Tell me which Google account is signed in. If it isn't the account that should
> own this property, stop and tell me — don't add the property to the wrong
> account, because moving it later means re-verifying.
>
> Also tell me whether `growthmasala.com` already appears in the property list.
> If it does, skip to Step 4.
>
> ---
>
> **Step 2 — Add the property**
>
> Click the property dropdown (top-left) → **Add property**.
>
> You'll see two options. **Try "Domain" first** — it covers www, non-www, http,
> and https in one property.
>
> - Enter: `growthmasala.com` (no `https://`, no `www.`)
> - Google will show a **TXT record** to add to my DNS
> - **Copy that TXT record exactly and show it to me.** Don't try to guess where
>   my DNS is hosted — I'll add the record and tell you when it's done.
>
> **If I tell you I don't have DNS access**, delete that property attempt and use
> **URL prefix** instead:
>
> - Enter: `https://growthmasala.com` (with `https://`, no `www.`)
> - Choose the **HTML tag** verification method
> - It shows: `<meta name="google-site-verification" content="TOKEN" />`
> - **Copy just the TOKEN value and show it to me** — not the whole tag. I'll add
>   it to Vercel and redeploy, then tell you to hit Verify.
>
> ---
>
> **Step 3 — Verify**
>
> Once I confirm the DNS record or the redeploy is done, click **Verify**.
>
> - If it succeeds, say so and move on.
> - If it fails, tell me the exact error message. DNS can take 5–60 minutes to
>   propagate — if it's a "record not found" error, wait a few minutes and retry
>   rather than changing method.
>
> ---
>
> **Step 4 — Record the baseline (important)**
>
> Before submitting anything, go to **Indexing → Pages** in the left nav.
>
> Tell me:
> - How many pages are currently **indexed**
> - How many are **not indexed**, and the reason breakdown
>
> I specifically want to know if any pages are listed under **"Alternate page
> with proper canonical tag"** or **"Duplicate without user-selected canonical"** —
> those are the fingerprint of the bug we just fixed, and I need the before-number
> to confirm the fix worked.
>
> If this is a brand-new property it may show no data yet. That's fine — just say
> so.
>
> ---
>
> **Step 5 — Submit the sitemap**
>
> Left nav → **Sitemaps**.
>
> In "Add a new sitemap", enter just: `sitemap.xml`
> (the domain prefix is already filled in — don't paste the full URL)
>
> Click **Submit**, then refresh the page after ~30 seconds.
>
> Report back:
> - The **Status** (should be "Success")
> - The **Discovered URLs** count — **this should be 22.** If it's 10, Google
>   fetched a cached copy and I need to know, because it means the deploy didn't
>   land.
> - Any error message shown
>
> ---
>
> **Step 6 — Request indexing on priority pages**
>
> Use the **URL Inspection** bar at the very top. For each URL below: paste it,
> wait for the inspection to finish, then click **Request Indexing**.
>
> Google rate-limits this to roughly 10–15 per day, so do them **in this order**
> and stop when you hit the quota:
>
> 1. `https://growthmasala.com/`
> 2. `https://growthmasala.com/digital-marketing-agency-mahabubnagar`
> 3. `https://growthmasala.com/website-development-mahabubnagar`
> 4. `https://growthmasala.com/seo-services-mahabubnagar`
> 5. `https://growthmasala.com/social-media-marketing-mahabubnagar`
> 6. `https://growthmasala.com/meta-ads-mahabubnagar`
> 7. `https://growthmasala.com/services`
> 8. `https://growthmasala.com/contact`
> 9. `https://growthmasala.com/portfolio`
> 10. `https://growthmasala.com/case-studies`
>
> **On the first URL only**, before clicking Request Indexing, expand the test
> results and tell me:
> - What **"User-declared canonical"** shows
> - What **"Google-selected canonical"** shows
>
> If those two disagree, stop and tell me immediately — that means the canonical
> fix didn't take and requesting indexing on the rest would be wasted.
>
> Tell me how many you managed to submit before hitting the quota.
>
> ---
>
> **Step 7 — Check for blockers**
>
> Quick pass over the left nav — tell me if anything appears under:
> - **Security & Manual actions → Manual actions** (should say "No issues detected")
> - **Experience → Page experience** / Core Web Vitals (may say "no data" — fine)
> - Any red warning banners anywhere
>
> ---
>
> **Guardrails — please follow these**
>
> - **Do not remove or delete any existing property.**
> - **Do not change settings I didn't ask about** — no ownership changes, no
>   removing users, no URL removal requests, no changing crawl rate.
> - **Do not submit URL removal requests.** Ever, in this task.
> - If a screen looks different from what I described, **describe what you see and
>   ask** rather than clicking something that looks close.
> - If you hit a CAPTCHA or a login wall you can't pass, stop and tell me.
>
> ---
>
> **Final report**
>
> When done, give me:
> 1. Verification method used, and whether it succeeded
> 2. Sitemap status + discovered URL count
> 3. Baseline indexed / not-indexed numbers from Step 4
> 4. User-declared vs Google-selected canonical for the homepage
> 5. How many indexing requests you submitted
> 6. Anything that looked wrong

---

## After the browser task

**Set a reminder for 7 days out** and check Search Console → Indexing → Pages.

| What you see | What it means |
|--------------|---------------|
| Indexed count climbing toward 22 | ✅ Working. Nothing more to do but wait and build citations. |
| Still 0–2 indexed after 14 days | ⚠️ Something else is blocking crawl. Check the "Why pages aren't indexed" breakdown and bring it back. |
| Pages under "Alternate page with proper canonical tag" | ⚠️ A canonical is still wrong somewhere. Re-run the verification in [`seo-architecture.md`](seo-architecture.md#verification). |
| "Crawled — currently not indexed" | 😐 Normal for new pages. Means Google saw them and deferred. Usually resolves; citations and internal links speed it up. |

**Then move to the off-site work** in [`.claude/TODO.md`](../.claude/TODO.md) —
Justdial, Sulekha, Clutch, GoodFirms. Indexing gets you eligible to rank;
citations are what actually move you up.

> ⚠️ **Before creating any of those listings**, replace the placeholder address in
> [`src/data/business.ts`](../src/data/business.ts). It currently says
> "Station Road, Mahabubnagar, Telangana, 509001", which is road-level, not your
> real premises. Whatever address you list on the first directory has to match the
> site and every subsequent directory character-for-character — fixing an
> inconsistent NAP after the fact is significantly more work than getting it right
> once.
