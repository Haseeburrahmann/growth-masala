# Growth Masala — TODO

> **Read this at the start of every session.**
>
> ⚠️ **This file is not evidence.** It has been stale before — an out-of-date
> claim here was once repeated into an SEO audit as a live finding. **Grep the
> source before acting on anything below.**

Last updated: 2026-08-06 · Full SEO reference: [`docs/SEO.md`](../docs/SEO.md)

---

## 🔴 NEXT ACTION — Google Search Console

Everything else is blocked behind this. The SEO fixes are deployed and verified
live, but Google hasn't re-crawled, so none of it is visible yet.

- [ ] **Verify the property, submit the sitemap, request indexing**
  - Full step-by-step: [`docs/SEO.md` → Search Console Setup](../docs/SEO.md#search-console-setup)
  - Prefer DNS TXT (Domain property) — no redeploy needed
  - Sitemap must report **22 discovered URLs**. If it says 10, the deploy didn't land
  - **Watch: Indexing → Pages. Should climb toward 22 within two weeks**

---

## 🟠 HIGH — Publish pricing

Pricing is already designed and priced — it just isn't on the website. Every
competitor publishes theirs; "website design cost Mahabubnagar" is high-intent
traffic currently forfeited.

> The `pricing-cards/` folder was archived on 2026-08-06. **The numbers are
> preserved below** so nothing is lost. Source files are in
> `~/Desktop/2026/growth-masala-archive-20260806/pricing-cards/`.

### Website Development — one-time

| Plan | Price | Includes |
|------|-------|----------|
| **Basic** | ₹9,999 | 5 pages · mobile responsive · 2 revision rounds · 1 month support · basic SEO · delivery 5–7 days |
| **Business** ★ | ₹14,999 | 8–10 pages · AI chatbot · 5 revision rounds · 3 months support · SEO optimised · delivery 10–14 days |
| **Premium** | ₹24,999 | E-commerce · AI chatbot · 8 revision rounds · 6 months support · full SEO · delivery 14–21 days |

### Social Media Growth — monthly

| Plan | Price | Includes |
|------|-------|----------|
| **Starter** | ₹6,999/mo | 4 reels · 1 shoot day · content planning · captions · IG + FB · monthly report |
| **Growth** ★ | ₹12,999/mo | 8 reels · 2 shoot days · strategy · captions + hashtags · IG/FB/YouTube · stories · bi-weekly report |
| **Pro Growth** | ₹19,999/mo | 12 reels · 3 shoot days · full strategy · all platforms · stories · weekly report |

### Meta Ads Management — monthly

| Plan | Price | Includes |
|------|-------|----------|
| **Starter** | ₹6,999/mo | 3 creatives · ad spend ₹10k–30k · FB + IG · monthly report · WhatsApp support |
| **Growth** ★ | ₹9,999/mo | 6 creatives · ad spend ₹30k–60k · A/B testing · bi-weekly reports · dedicated AM |
| **Scale** | ₹14,999/mo | 6–10 creatives · ad spend ₹60k–90k · advanced A/B · weekly reports · dedicated AM |

*All prices in ₹. "Prices may vary based on project requirements."*

- [ ] **Build a `/pricing` page** from the tables above
  - Add `Offer` schema per plan (the `OfferCatalog` node in `src/lib/schema.ts` already has the hook)
  - Add to `sitemap.ts` + nav
  - Update `src/data/faqs.ts` — the "How much does a website cost?" answer currently says "it depends"; replace with a real starting figure
  - Update `src/lib/chatbot.ts` so the bot can quote plans

---

## 🟠 HIGH — Off-site citations (free, ~3 hours)

The site has zero citations. Every competitor that ranks has these.

- [ ] **Justdial** — owns 3+ of the top 10 Mahabubnagar results
- [ ] **Sulekha** — same pattern, strong local presence
- [ ] **Clutch** (clutch.co/get-listed) — AI tools cite Clutch when recommending agencies
- [ ] **GoodFirms** — appears in "Top 10 Hyderabad" SERPs
- [ ] **Sortlist** — ranked #5 for "digital marketing agency Telangana"
- [ ] **DesignRush** — ranked #2 for Hyderabad agency queries

Also pitch for inclusion in the page-one listicles: IIDE, ZeroAdo, AmigoCreatz, HivePulse.

> Google Business Profile is intentionally out of scope. Everything above works
> without it — and Clutch/GoodFirms matter more for AI visibility anyway.

> ⛔ **Before creating any listing:** replace the placeholder street address in
> [`src/data/business.ts`](../src/data/business.ts). It currently reads
> "Station Road" — road-level, not your real premises. Whatever you list first
> has to match the site and every later directory character-for-character.

---

## 🟠 HIGH — Owner-only items

- [ ] **Replace the placeholder street address** — `src/data/business.ts`
- [ ] **Verify GA4 in production** — `NEXT_PUBLIC_GA_ID` must be in Vercel's env vars, not just `.env.local`. Check GA4 → Real-time
- [ ] **Collect 5 client reviews** → unlocks `AggregateRating` schema (biggest CTR lift available)
- [ ] **Get one real outcome metric** for a case study — `src/app/case-studies/page.tsx` shows capabilities ("Live", "1-tap"), not results

---

## 🟡 MEDIUM — Local blog content (2 posts/month)

Existing posts are generic and compete against the whole internet. Local-intent
posts have almost no competition here.

- [ ] **"Website Design Cost in Mahabubnagar: 2026 Price Guide"** ← start here, pairs with the pricing page
- [ ] **"Top 10 Digital Marketing Agencies in Mahabubnagar (2026)"** — a listicle including ourselves, exactly how IIDE ranks for Hyderabad
- [ ] **"How to Choose a Digital Marketing Agency in Mahabubnagar"**
- [ ] **"Local SEO Guide for Mahabubnagar Businesses"**
- [ ] **"Meta Ads for Telangana Small Businesses: What Actually Works"**

New posts get `BlogPosting` schema, breadcrumbs, canonical, and a sitemap entry
automatically — just add the markdown file.

---

## 🟢 LOW — Code quality

- [ ] **Pre-existing lint error** — `src/components/layout/Navbar.tsx:22`,
      `react-hooks/set-state-in-effect`. `pnpm lint` fails on it; `pnpm build` is fine
- [ ] **PII in logs** — `src/app/api/lead/route.ts:35` logs lead name and phone to
      server logs. Worth redacting
- [ ] **Run Lighthouse** (target 90+) — image weight already down 85%; JS is the remaining lever
- [ ] **Audit JS bundle** — largest chunk 218KB, ~600KB total for a marketing site
- [ ] **Rate limiter persistence** — in-memory Map in `/api/chat/route.ts` resets on
      Vercel cold starts. Only matters at scale

---

## ✅ Done — 2026-08-06

**SEO remediation** (`1c10a2d`, `9ce71da`) — deployed and verified live:
site-wide canonical bug, duplicate brand in titles, broken `icon.png` reference,
NAP on every page, location keywords in visible copy (0 → 13 on homepage),
12 location landing pages, schema expansion (WebSite/Breadcrumb/FAQ/Service/
OfferCatalog/BlogPosting), FAQ sections, WebP conversion (5.2MB → 788KB),
title de-duplication. Detail: [`docs/SEO.md`](../docs/SEO.md).

**Repo cleanup** — consolidated 12 docs into 3, removed dead code and 17MB of
unused assets. Archived (not deleted) to
`~/Desktop/2026/growth-masala-archive-20260806/`.

**Branch protection rule** — `CLAUDE.md` now forbids working on `main` directly.

---

## 🔗 Files

| What | Where |
|------|-------|
| Project bible + hard rules | [`CLAUDE.md`](../CLAUDE.md) |
| SEO architecture, competitors, playbook | [`docs/SEO.md`](../docs/SEO.md) |
| This file | `.claude/TODO.md` |
| Archived docs & assets | `~/Desktop/2026/growth-masala-archive-20260806/` |
