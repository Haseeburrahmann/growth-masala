# Growth Masala — TODO

> **Read this file before starting any session.**
>
> ⚠️ **Verify before you trust.** This file has been stale before: it once
> claimed the testimonials and case studies were fake placeholders months after
> they had been replaced with real clients, and that dead claim was repeated
> into an SEO audit as a live finding. **Grep the source before acting on any
> item here.** When you find something already done, fix this file in the same
> pass.

Last verified against source: **2026-08-09**

Progress tracking lives in [`docs/seo-scorecard.md`](../docs/seo-scorecard.md).
Shipped work lives in [`updates.md`](updates.md). This file is only what is
*open*.

---

## 🔴 Blocking — only the owner can do these

Nothing in the codebase moves these.

- [ ] **Replace the placeholder street address** ⚠️ *highest risk item on this list*
  - `src/data/business.ts` → currently `"Station Road"`, PIN `509001`
  - Set on owner instruction. Road-level only — **not a verified premises**
  - **Must be replaced before creating any directory listing.** Once a wrong NAP
    is published to Justdial/Clutch/Sulekha, correcting it across every citation
    is far more work than getting it right once, and inconsistent NAP actively
    suppresses local ranking
  - Whatever lands here must match every external listing character-for-character

- [ ] **Confirm Google Search Console state**
  - Runbook: [`docs/search-console-setup.md`](../docs/search-console-setup.md)
  - Verify ownership → submit `sitemap.xml` → request indexing
  - Cannot be checked from the codebase; only the console shows it
  - **Watch: Pages → Indexed. Target 23.**

- [ ] **Collect client reviews** → unlocks `AggregateRating`
  - Star ratings in the SERP are the largest CTR lift still available
  - Target 5 reviews across Google / Justdial / Clutch
  - Once they exist the schema is ~30 minutes of work. Not before — the builder
    is deliberately absent rather than stubbed

- [ ] **One real outcome metric for a case study** 🔥 *highest-value copy task*
  - `src/data/caseStudies.ts` — every entry has `outcome?: string` and **all are
    undefined** (verified 2026-08-09). That is the honest state
  - One real number from any one client — enquiries a month, admissions, search
    traffic — is enough. Set `outcome` and the card already has the treatment
  - Delete `src/components/case-studies/CaseStudiesNote.tsx` at the same time:
    once real figures exist, that section stops being honest and becomes false
    modesty

---

## 🟠 High — off-site citations (free, ~3 hours)

The site has zero citations. Every competitor ranking locally has these.

| Platform | Why |
|----------|-----|
| [ ] Justdial | owns 3+ of the top 10 Mahabubnagar results |
| [ ] Sulekha | same pattern, strong local presence |
| [ ] Clutch | AI assistants cite Clutch when recommending agencies |
| [ ] GoodFirms | appears in "Top 10 Hyderabad" SERPs |
| [ ] Sortlist | ranked #5 for "digital marketing agency Telangana" |
| [ ] DesignRush | ranked #2 for Hyderabad agency queries |

**Do not start these until the street address is real** — see the blocking item
above. Publishing a placeholder NAP to six directories is the expensive mistake.

Google Business Profile is intentionally out of scope per the owner. Clutch and
GoodFirms matter more for AI visibility anyway.

---

## 🟡 Medium — local blog content

Two of the five planned posts now exist (verified 2026-08-09). Local-intent
posts have almost no competition here; the existing generic posts compete
against the whole internet.

- [x] ~~"Website Design Cost in Mahabubnagar: 2026 Price Guide"~~ — shipped
- [x] ~~"Website Design Cost in Hyderabad"~~ — shipped
- [ ] **"Top 10 Digital Marketing Agencies in Mahabubnagar (2026)"** ← start here
  - A listicle including ourselves — exactly how IIDE and ZeroAdo rank for Hyderabad
- [ ] "How to Choose a Digital Marketing Agency in Mahabubnagar"
- [ ] "Local SEO Guide for Mahabubnagar Businesses"
- [ ] "Meta Ads for Telangana Small Businesses: What Actually Works"

New posts get `BlogPosting` schema, breadcrumbs, canonical and a sitemap entry
automatically. Drop the markdown in `src/content/blog/` and set a `.webp`
`image` in the frontmatter.

---

## 🟢 Low — open engineering items

- [ ] **Sitemap `lastmod` is the build timestamp**
  - `src/app/sitemap.ts` uses `lastModified: new Date()` for all 19 non-blog
    URLs, so every deploy claims all of them changed
  - Google honours `lastmod` only when it is consistently accurate, and ignores
    it otherwise — so the cost is that the signal stops working precisely when
    it is wanted, e.g. after genuinely rewriting one location page
  - The 4 blog posts already do this correctly, deriving from frontmatter
  - **Fix needs a decision:** an explicit `updated` field per entry in
    `locations.ts` (honest, manually maintained) vs deriving from git commit
    dates (automatic, unreliable on Vercel's shallow clones). Recommend the
    explicit field

- [ ] **Mobile LCP is 3.1s, above the 2.5s "Good" threshold**
  - Now font-swap bound: text paints fast, then repaints when Poppins arrives
  - Closing it means `font-display: optional`, which trades the brand face for
    the metric on slow first loads — **an owner decision, not a perf decision**,
    on a site that sells web design and has already shipped an incident where
    every heading rendered in the OS default font. Recommend leaving it
  - Weights are already minimal: Poppins 600/700, Inter 400/500/600, latin
    subset, each with a documented reason in `layout.tsx`

- [ ] **Amber headline rule wraps at 390px**
  - At mobile width the `<h1>` breaks "your business found" across two lines and
    `.headline-mark` draws the underline twice. `HeroSection`'s own comment calls
    that outcome "a scribble" when discussing desktop sizing
  - Pre-existing, cosmetic, a type-scale decision rather than a bug

- [ ] **Rate limiter persistence** (low urgency)
  - In-memory `Map` in `/api/chat/route.ts` resets on Vercel cold starts
  - Only matters at scale

---

## ✅ Recently closed — verify before re-adding

These were open in earlier versions of this file and are **done** (source-verified
2026-08-09). Listed so they are not re-reported as findings.

| Item | State |
|------|-------|
| Site-wide canonical bug | fixed; every route self-canonical, verified on production |
| Lighthouse 90+ | mobile 92, desktop 100 |
| Pre-existing lint error in `Navbar.tsx` | `pnpm lint` passes clean |
| Stray `public/logoo.png` | gone |
| Social profile links resolve | all three 200, verified by crawl |
| JS bundle audit | GA moved to `lazyOnload`, CSS inlined, TBT 110ms → 0ms |
| Publish pricing | `src/data/pricing.ts` renders end to end |
| GA4 live in production | gtag renders on the live site |
| 12 location landing pages | live, 9% duplicate content (Siteliner) |
| Nine empty image slots | filled; see `updates.md` 2026-08-09 |

---

## 🔗 Related

- Project config: [`CLAUDE.md`](../CLAUDE.md)
- **Progress tracking / tool scores**: [`docs/seo-scorecard.md`](../docs/seo-scorecard.md)
- SEO rules: [`docs/seo-architecture.md`](../docs/seo-architecture.md)
- Audit + competitor teardown: [`docs/seo-audit-2026-08.md`](../docs/seo-audit-2026-08.md)
- Search Console runbook: [`docs/search-console-setup.md`](../docs/search-console-setup.md)
- Shipped work log: [`updates.md`](updates.md)
