# Growth Masala — TODO & Pending Plan

> **Read this file before starting any session.**
> Live task tracker for everything pending — content, SEO, and code.
>
> ⚠️ **Verify before you trust.** An earlier version of this file claimed the
> testimonials and case studies were fake placeholders. They had already been
> replaced with real clients months earlier, and that stale claim was repeated
> into an SEO audit as a real finding. **Grep the source before acting on any
> item here.**

Last updated: 2026-08-06

---

## ✅ Completed — 2026-08-06 SEO remediation

Full detail: [`docs/seo-audit-2026-08.md`](../docs/seo-audit-2026-08.md)

- [x] **Site-wide canonical bug** — every page pointed its canonical at the
      homepage, blocking indexation of the whole site. Root cause was
      `alternates.canonical` in the root layout, which App Router inherits into
      every child route. Removed it; each route now sets its own relative canonical.
- [x] **Title tags** — brand was double-printed (`Services — Growth Masala | Growth Masala`)
      and no title contained a location keyword. All titles are now bare and
      keyword-first; the root template appends the brand exactly once.
- [x] **Broken `icon.png` reference** — deleted from the repo but still referenced
      by the favicon and the LocalBusiness schema. Repointed to `/favicon.ico`
      and `/images/logo.png`.
- [x] **NAP on every page** — contact page said "Location: India". Now shows
      Mahabubnagar, Telangana with phone and email; footer carries the full NAP
      site-wide. Single source of truth: `src/data/business.ts`.
- [x] **Location keywords in visible copy** — "Mahabubnagar" appeared 0 times in
      visible body text. Now 13 on the homepage, 31 on the primary landing page.
- [x] **12 location landing pages** — 5 Mahabubnagar service pages, 5 micro-local
      (Shadnagar, Wanaparthy, Kalwakurthy, Jadcherla, Narayanpet), 2 Hyderabad.
      Data in `src/data/locations.ts`, rendered by `src/app/[slug]/page.tsx`.
- [x] **Schema expansion** — added `WebSite`, `BreadcrumbList` (all inner pages),
      `FAQPage` (homepage + every location page), `Service`, `OfferCatalog`, and
      `BlogPosting`. Builders live in `src/lib/schema.ts`.
- [x] **FAQ sections** — 6 questions on the homepage, 4 per location page.
      Server-rendered `<details>`, so schema and visible content match.
- [x] **Image compression** — portfolio and blog images converted to WebP.
      5.2MB → 788KB (85% smaller). Originals preserved in
      `~/Desktop/2026/growth-masala-image-originals/20260806/`.
- [x] **Sitemap** — now includes all 12 location pages (22 URLs total) and the
      root entry matches the canonical form.

---

## 🔴 BLOCKING — Only the owner can do these

These are the highest-ROI items left. The code work is done and invisible to
Google until #1 happens.

- [ ] **Deploy, then set up Google Search Console** 🔥
  - 📄 **Step-by-step browser-agent brief:** [`docs/search-console-setup.md`](../docs/search-console-setup.md)
  - Deploy FIRST — submitting the sitemap before the canonical fix is live wastes the crawl
  - Confirm live: `curl -s https://growthmasala.com/services | grep -o '<link rel="canonical"[^>]*>'`
    must return `.../services`, not the bare domain
  - Then verify ownership → submit sitemap → request indexing on 10 priority URLs
  - **Watch: Pages → Indexed. Should climb toward 22 within two weeks.**

- [ ] **Replace the placeholder street address** ⚠️
  - File: `src/data/business.ts` → currently `"Station Road"` / `"509001"`
  - Set 2026-08-06 on owner instruction. Road-level only, **not a verified premises**
  - 509001 is the correct PIN for Mahabubnagar town
  - **Must be replaced with the real address BEFORE creating any directory listing** —
    once a wrong NAP is published to Justdial/Clutch, correcting it everywhere is
    far more work than getting it right once
  - Whatever ends up here must match every listing character-for-character

- [ ] **Verify GA4 is live in production**
  - `NEXT_PUBLIC_GA_ID=G-46R8LQJ581` is in `.env.local` — confirm it is also set
    in Vercel's environment variables, or no data is being collected
  - Check GA4 → Real-time for active users

---

## 🟠 HIGH — Off-site citations (free, ~3 hours total)

The site currently has zero citations. Every competitor that ranks has these.

| Platform | URL | Why |
|----------|-----|-----|
| [ ] Justdial | justdial.com | Owns 3+ of the top 10 Mahabubnagar results |
| [ ] Sulekha | sulekha.com | Same pattern, strong local presence |
| [ ] Clutch | clutch.co/get-listed | AI tools cite Clutch when recommending agencies |
| [ ] GoodFirms | goodfirms.co/directory/register | Appears in "Top 10 Hyderabad" SERPs |
| [ ] Sortlist | sortlist.com/agency/register | Ranked #5 for "digital marketing agency Telangana" |
| [ ] DesignRush | designrush.com | Ranked #2 for Hyderabad agency queries |

Also worth pitching for inclusion in the "Top 10 agencies in Hyderabad" listicles
that rank page-one: IIDE, ZeroAdo, AmigoCreatz, HivePulse.

> **Note:** Google Business Profile is intentionally out of scope per the owner.
> Everything above works without it — and Clutch/GoodFirms matter more for AI
> visibility than GBP does.

---

## 🟠 HIGH — Content the code can't invent

- [ ] **Publish pricing** — even as ranges
  - Every competitor publishes one; we publish none
  - World of Nexa: ₹4,999/₹9,999/₹19,999 per month, websites from ₹10–15k
  - Local benchmarks: websites ₹6,000–₹90,000 · SEM/PPC ₹5,000–₹75,000
  - `src/data/faqs.ts` has a TODO marking exactly where this slots in
  - "website design cost Mahabubnagar" is a high-intent query we currently forfeit

- [ ] **Collect client reviews** → unlocks `AggregateRating` schema
  - Star ratings in the SERP are the biggest CTR lift available
  - Target: 5 reviews across Google/Justdial/Clutch within 2 weeks
  - Once they exist, adding the schema is ~30 minutes of code

- [ ] **Get one real outcome metric for a case study**
  - `src/app/case-studies/page.tsx` currently shows capability statements
    ("Live", "1-tap", "4 Branches") rather than results
  - Even one number — enquiries per month, admissions, traffic — materially
    strengthens the page. The file already flags this in a comment.

---

## 🟡 MEDIUM — Local blog content (2 posts/month)

Existing posts are generic and compete against the whole internet. Local-intent
posts have almost no competition here.

- [ ] **"Website Design Cost in Mahabubnagar: 2026 Price Guide"** ← start here
  - Target: `website design cost Mahabubnagar` · highest commercial intent
  - `src/content/blog/website-design-cost-mahabubnagar.md`
- [ ] **"Top 10 Digital Marketing Agencies in Mahabubnagar (2026)"**
  - A listicle including ourselves — exactly how IIDE and ZeroAdo rank for Hyderabad
- [ ] **"How to Choose a Digital Marketing Agency in Mahabubnagar"**
- [ ] **"Local SEO Guide for Mahabubnagar Businesses"**
- [ ] **"Meta Ads for Telangana Small Businesses: What Actually Works"**

New posts get `BlogPosting` schema, breadcrumbs, and canonicals automatically —
just add the markdown file.

---

## 🟢 LOW — Code quality & performance

- [ ] **Fix pre-existing lint error** — `src/components/layout/Navbar.tsx:22`
  - `react-hooks/set-state-in-effect` — `pnpm lint` fails on it
  - Predates the SEO work; left untouched to keep that change set clean
  - `pnpm build` is unaffected

- [ ] **Run Lighthouse** (target 90+)
  - `pnpm build && pnpm start` → Chrome DevTools → Lighthouse
  - Image weight is already down 85%; JS is the remaining lever

- [ ] **Audit JS bundle** — largest chunk is 218KB, total ~600KB for a marketing site
  - Check for barrel imports pulling in more than needed

- [ ] **Social icons in Footer** — verify the three profile links resolve
  - Instagram, Facebook, and X are live in the footer and in `sameAs` JSON-LD

- [ ] **Stray file**: `public/logoo.png` is untracked and unreferenced (404s in
      production). Left in place rather than deleted — confirm it's unwanted first.

- [ ] **Rate limiter persistence** (low urgency)
  - In-memory Map in `/api/chat/route.ts` resets on Vercel cold starts
  - Only matters at scale

---

## 📋 QUICK WINS

| Task | Effort | Impact |
|------|--------|--------|
| Deploy + submit sitemap to Search Console | 20 mins | 🔥 Critical |
| Fill in street address + PIN in `business.ts` | 2 mins | High |
| Verify GA4 env var in Vercel | 10 mins | Medium |
| List on Justdial + Sulekha | 45 mins | High |
| Register on Clutch + GoodFirms | 50 mins | High (AI visibility) |
| Publish a starting price range | 30 mins | High |

---

## 🔗 Related Files

- Project config: [`CLAUDE.md`](../CLAUDE.md)
- **SEO audit + competitor teardown**: [`docs/seo-audit-2026-08.md`](../docs/seo-audit-2026-08.md)
- SEO architecture: [`docs/seo-architecture.md`](../docs/seo-architecture.md)
- **Search Console setup (browser brief)**: [`docs/search-console-setup.md`](../docs/search-console-setup.md)
- Completed work log: [`.claude/updates.md`](updates.md)
- Chatbot template: [`.claude/chatbot-template.md`](chatbot-template.md)
