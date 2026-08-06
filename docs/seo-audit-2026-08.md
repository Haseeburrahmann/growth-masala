# SEO Audit & Competitor Teardown — growthmasala.com

**Audited:** 2026-08-06
**Remediated:** 2026-08-06 (same day — see [Implementation Log](#implementation-log))
**Scope:** Technical SEO, on-page, local (Mahabubnagar / Telangana), India-wide, competitor reverse-engineering
**Method:** Live HTTP inspection of production, source review, SERP research, raw-HTML scraping of competitors

> **🚀 Deployed to production 2026-08-06** (commits `1c10a2d`, `9ce71da`).
> Verified live: 20/20 canonicals correct, 19/19 titles unique and under 60
> characters, 22 sitemap URLs, all schema rendering server-side.
>
> **Status: all code-level findings are fixed and verified in production.** The
> [Implementation Log](#implementation-log) records exactly what shipped and how each
> fix was verified. What remains is off-site work (directory listings, Search
> Console) and two data items only the business owner can supply — see
> [What's Still Open](#whats-still-open).
>
> **Two findings in the original audit were wrong.** Both are corrected in place
> and marked ~~struck through~~. See [Corrections](#corrections-to-this-audit).

---

## Executive Summary

The site is well-built but **structurally prevented from ranking**. There is one bug that alone explains near-total organic invisibility, and it is a two-line fix.

**Verified current state:** `site:growthmasala.com` returns zero pages. The domain does not appear for any Mahabubnagar or Telangana agency query. Brand searches for "Growth Masala" surface a different, established agency (Marketing Masala).

### The five things that matter

| # | Finding | Impact | Status |
|---|---------|--------|--------|
| 1 | **Every page canonicalizes to the homepage** | Blocks indexation of the entire site | ✅ Fixed |
| 2 | Brand name duplicated in every title tag; zero location keywords in any title | Wasted SERP real estate, no local relevance | ✅ Fixed |
| 3 | Zero location landing pages — the exact asset every ranking competitor uses | Cannot compete for the money keywords | ✅ Fixed — 12 pages built |
| 4 | Location says "India"; Mahabubnagar appears **zero times** in visible body copy | No local relevance signal at all | ✅ Fixed |
| 5 | `public/images/icon.png` deleted locally but still referenced by favicon + schema | Would 404 favicon and break LocalBusiness schema on next deploy | ✅ Fixed |

**The good news:** the technical foundation is genuinely strong — SSR, fast TTFB (0.14–0.38s), valid LocalBusiness schema, clean HTTPS/redirects, all images have alt text, AI-crawler-friendly robots.txt. Growth Masala's schema markup is **better than all three competitors reviewed**. The problem is not build quality. It is that four or five specific signals are missing or actively broken.

---

## Part 1 — Critical Technical Findings

### 🔴 C1. Site-wide canonical points to the homepage

**Severity:** Critical — this is the single reason the site is invisible.

**Evidence** (live production, verified by direct HTTP fetch):

| URL | Canonical tag served |
|-----|----------------------|
| `/` | `https://growthmasala.com` ✅ |
| `/services` | `https://growthmasala.com` ❌ |
| `/portfolio` | `https://growthmasala.com` ❌ |
| `/case-studies` | `https://growthmasala.com` ❌ |
| `/about` | `https://growthmasala.com` ❌ |
| `/blog` | `https://growthmasala.com` ❌ |
| `/contact` | `https://growthmasala.com` ❌ |
| `/blog/meta-ads-guide-for-small-businesses` | `https://growthmasala.com` ❌ |

**Root cause:** [src/app/layout.tsx](../src/app/layout.tsx) sets an absolute canonical in root metadata:

```ts
alternates: {
  canonical: "https://growthmasala.com",
},
```

In Next.js App Router, `alternates.canonical` is inherited by every child route unless explicitly overridden. No child layout overrides it — so all ten sitemap URLs declare themselves duplicates of the homepage.

**What Google does with this:** treats every inner page as a non-canonical duplicate and drops it from the index. The sitemap submits ten URLs; the canonicals tell Google nine of them do not exist. This directly contradicts the sitemap and is why nothing ranks.

**Fix:** remove the canonical from the root layout, then set a relative canonical per route (`metadataBase` is already configured, so relative paths resolve correctly):

```ts
// src/app/layout.tsx — DELETE the alternates block entirely

// src/app/page.tsx
export const metadata = { alternates: { canonical: "/" } };

// src/app/services/layout.tsx
export const metadata = { alternates: { canonical: "/services" } };
// …and so on for every route, including blog/[slug] (dynamic: `/blog/${slug}`)
```

~~**Secondary issue:** `sitemap.ts` emits `https://growthmasala.com` (no trailing slash) but the server 308-redirects to `https://growthmasala.com/`. Sitemaps should list the final destination URL. Append the slash for the root entry.~~

> **⚠️ Correction — this finding was wrong.** The 308 I observed was the
> `http://` → `https://` protocol redirect, not slash normalisation. Re-tested
> directly: `https://growthmasala.com` and `https://growthmasala.com/` **both
> return 200 with no redirect between them**. There was no bug here.
>
> What does matter is that the sitemap and the canonical tag agree. Next.js
> normalises `canonical: "/"` to `https://growthmasala.com` (no trailing slash),
> so `sitemap.ts` now emits the same form. Fixed for consistency, not because
> the original diagnosis was correct.

---

### 🔴 C2. Title tags — duplicated brand, zero location keywords

**Severity:** Critical for local ranking.

**Evidence** (live titles as served):

```
/            Growth Masala — Spice Up Your Brand Growth                                    (46 chars)
/services    Services — Growth Masala | Growth Masala                                      (39 chars)
/portfolio   Portfolio — Growth Masala | Growth Masala                                     (40 chars)
/about       About — Growth Masala | Growth Masala                                         (36 chars)
/contact     Contact — Growth Masala | Growth Masala                                       (38 chars)
/blog/…      Meta Ads for Small Businesses: A Beginner's Guide — Growth Masala Blog | Growth Masala  (85 chars — truncated)
```

**Two separate defects:**

1. **Brand appears twice.** Root layout defines `template: "%s | Growth Masala"`. Each child layout then sets a literal title that *already* contains the brand (`"Services — Growth Masala"`). The template appends it again.

2. **No page targets a keyword.** Not one title contains "Mahabubnagar", "Telangana", or "Hyderabad". Compare to what actually ranks:
   - ASH Group: `Digital Marketing Company Services in Mahabubnagar | ASH Group`
   - HighXBrand: `Digital Marketing Services in Mahabubnagar- Digital Marketing Company in Mahabubnagar- Digital Marketing Agency in Mahabubnagar`
   - Dizi Solutions: `Website Design Company in Hyderabad | Web Design & Website Creator`

**Fix** — strip the brand from child titles and lead with the keyword:

| Page | Recommended title (≤60 chars) |
|------|-------------------------------|
| `/` | `Digital Marketing Agency in Mahabubnagar \| Growth Masala` |
| `/services` | `Digital Marketing & Web Development Services in Mahabubnagar` |
| `/portfolio` | `Our Work — 50+ Websites Built for Indian Businesses` |
| `/case-studies` | `Client Results & Case Studies — Telangana Businesses` |
| `/about` | `About Growth Masala — Digital Agency in Mahabubnagar` |
| `/contact` | `Contact — Free Consultation, Mahabubnagar & Hyderabad` |

Set these as the *bare* string (no `— Growth Masala`) and let the existing template append the brand once.

---

### 🔴 C3. Missing asset will break on next deploy

`git status` shows `D public/images/icon.png` (deleted locally, still live in production). It is referenced in two places in [src/app/layout.tsx](../src/app/layout.tsx):

```ts
icons: { icon: "/images/icon.png", apple: "/images/icon.png" },
// and
image: "https://growthmasala.com/images/icon.png",   // ← inside the LocalBusiness JSON-LD
```

Verified: the URL currently returns `200` from production, but the file is gone from the repo. **The next deploy 404s the favicon and breaks the `image` property of the LocalBusiness schema.** Also note `public/logoo.png` is untracked and 404s in production — likely a stray file, worth deleting.

**Fix:** restore `icon.png`, or repoint both references to `/images/logo.png`. Separately, the schema `image` should be a proper 1200×630 or square business image, not a favicon-sized icon.

---

## Part 2 — Local SEO Findings

### 🟠 L1. The site does not say where it is

This is the biggest content gap. Verified counts across the entire `src/` tree:

| Location keyword | Occurrences | Where |
|------------------|-------------|-------|
| Mahabubnagar / Mahbubnagar | **17 total** | `layout.tsx` metadata + JSON-LD (20 hits incl. other cities), `chatbot.ts` system prompt, 2 portfolio entries, 1 case study |
| In *visible body copy* on any page | **0** | — |

The `/contact` page renders:

```
Location: India
```

Not Mahabubnagar. Not Telangana. **"India."**

Meanwhile the homepage H1 is `Spice Up Your Brand Growth.` and inner-page H1s are `Our Work`, `Results That Speak`, `Insights & Ideas`, `Let's Talk Growth` — brand-poetic, keyword-empty.

**Why this matters:** ASH Group ranks for Mahabubnagar with "Mahabubnagar" appearing **98 times** in their page HTML across ~1,200 words. They are a Delhi company with no Mahabubnagar office. Growth Masala is *actually in Mahabubnagar* and mentions it zero times where a user or crawler can see it.

**Fix:**
- Contact page → real address block: street, Mahabubnagar, Telangana, PIN, phone `+91 86882 69427`
- Footer → full NAP on every page (currently has email only, no address, no phone)
- Homepage → work "Mahabubnagar" and "Telangana" into hero subheadline, intro, and a "Serving businesses across Mahabubnagar, Hyderabad & Telangana" line
- Add `streetAddress` and `postalCode` to the JSON-LD `PostalAddress` (currently only locality/region/country — an incomplete NAP weakens local trust)

### 🟠 L2. Zero location landing pages

Every competitor that ranks for Mahabubnagar does it with **one dedicated exact-match page**. Growth Masala has none.

Observed competitor URL patterns:

| Competitor | Pattern | Base |
|------------|---------|------|
| Pixel MediaTech | `/best-digital-marketing-agency-in-mahabubnagar/` | Exact-match slug |
| ASH Group | `/digital-marketing-company-services-in-mahabubnagar/` | Exact-match slug |
| HighXBrand | `/mahabubnagar/digital-marketing.php` | **City folder** — scales to every city |
| Dizi Solutions | `/webdesign.php`, `/webdevelopment.php`, `/ecommerce.php`, `/branch.php` | Service-per-page + branches |

**Recommended build** (already scoped in `.claude/TODO.md`, now with the proven template — see Part 4):

Tier 1 — primary money pages:
- `/digital-marketing-agency-mahabubnagar`
- `/website-development-mahabubnagar`
- `/seo-services-mahabubnagar`
- `/social-media-marketing-mahabubnagar`
- `/meta-ads-mahabubnagar`

Tier 2 — micro-local, low competition, fast wins:
- `/digital-marketing-agency-shadnagar`
- `/digital-marketing-agency-wanaparthy`
- `/digital-marketing-agency-kalwakurthy`
- `/digital-marketing-agency-jadcherla`
- `/digital-marketing-agency-narayanpet`

Tier 3 — the bigger market:
- `/digital-marketing-agency-hyderabad`
- `/website-development-hyderabad`

Build these as a single templated route (`/[service]-[city]` or a data-driven map) so all twelve share one component and one schema block. Add them to `sitemap.ts` automatically.

### 🟠 L3. Off-site presence is empty

The site has no citations anywhere. Every ranking competitor has verified listings. GBP is out of scope per your instruction — but **these are not**, and several matter more for AI visibility than GBP does:

| Platform | Why | Cost |
|----------|-----|------|
| **Justdial** | Dominates Mahabubnagar SERPs — 3 of the top results for local agency queries are Justdial category pages | Free |
| **Sulekha** | Same pattern, strong local presence | Free |
| **Clutch.co** | AI tools (ChatGPT, Perplexity) cite Clutch when recommending agencies | Free |
| **GoodFirms** | Appears in "Top 10 agencies in Hyderabad" SERPs | Free |
| **Sortlist** | Ranked #5 for "digital marketing agency Telangana" in my test search | Free |
| **DesignRush** | Ranked #2 for Hyderabad agency queries | Free |

Also: get listed on the "Top 10 agencies in Hyderabad" listicles (IIDE, ZeroAdo, AmigoCreatz, HivePulse) — these rank on page one and most accept submissions or paid placement.

### 🟡 L4. Brand name collision

Searching "Growth Masala" returns **Marketing Masala** (marketingmasala.com) — an established agency with a Clutch profile, LinkedIn presence, Crunchbase entry, and press coverage. They own the "masala agency" semantic space.

This is not fixable by renaming, and I would not recommend renaming. But it means:
- Brand-name SEO will be an uphill fight; **lead with the local keyword, not the brand** (reinforces the C2 title fix)
- Every citation, listing, and backlink should use the exact string "Growth Masala" plus "Mahabubnagar" to build a distinct entity in Google's Knowledge Graph
- Register the brand on Crunchbase / LinkedIn Company / Instagram with consistent NAP to establish entity separation

---

## Part 3 — Competitor Teardown

### 3.1 Dizi Solutions — `dizisolutions.in`
**Verdict: the strongest SEO operator of the three. Study their structure, ignore their design.**

| Dimension | Finding |
|-----------|---------|
| Title (home) | `Website, Mobile App & Digital Marketing Company Hyderabad` — keyword-first, city included |
| Title (service) | `Website Design Company in Hyderabad \| Web Design & Website Creator` |
| Meta description | Written for CTR: *"Looking for a website design company in Hyderabad? Dizi Solutions provides professional web design, website development, eCommerce websites, and custom business websites at affordable prices."* |
| H1 | `Building Stunning Websites` — **weak**, no keyword |
| Architecture | Page-per-service: `webdesign.php`, `webdevelopment.php`, `ecommerce.php`, `lms.php`, `graphic-design.php`, `portfolio.php`, `blog/`, `branch.php` |
| Sitemaps | **Four** (`sitemap.xml` + `sitemap-1/2/3.xml`, 21KB index) → large indexed footprint |
| Local signals | **Two physical addresses** — Hastinapuram and LB Nagar, plus a dedicated `branch.php` location page |
| Trust | 10+ years · 950+ happy clients · 1000+ projects · 95% success rate · 14 client logos · **government client section** |
| Contact | Phone `+91 9440912631`, email, WhatsApp link |
| Stack | Legacy PHP |

**What they beat you on:** page-per-service architecture, keyword-first titles, hand-written meta descriptions, real addresses, hard numbers, government logos, a branches page, and roughly 10× the indexed page count.

**What you beat them on:** modern stack, page speed, design quality, structured data (they have no LocalBusiness schema on the pages I checked), and mobile experience.

**Steal:** the service-page architecture and the trust-number strip. Their `branch.php` is a template for a Mahabubnagar location page.

---

### 3.2 StaffArc — `staffarc.tech`
**Verdict: strong-looking brand, near-zero organic capability. This is what NOT to do.**

| Dimension | Finding |
|-----------|---------|
| Served HTML | **2,432 bytes.** A client-side Vite/React SPA shell — `assets/index-ChM7-yMC.css` |
| Headings in HTML | **Zero.** No `<h1>`, no `<h2>`, no `<h3>` in the served document |
| Meta description | **Missing entirely** |
| Meta keywords | Present — `web development, e-commerce, custom software, logo design, StaffArc, digital growth`. Google has ignored this tag since 2009 |
| Schema | `Organization` only — no `LocalBusiness`, no address, no phone, no `areaServed` |
| og:image | `/og-image.png` — **relative path**. Social platforms require absolute URLs; link previews break |
| Sitemap | 618 bytes — a handful of URLs |
| Location targeting | **None.** No city, no region, no address anywhere |

**Analysis:** Google can render JavaScript, but CSR pages go into a deferred second-wave rendering queue and consistently underperform SSR sites for competitive local terms. Combined with no meta description, no location, no LocalBusiness schema, and no headings in HTML — this site cannot compete locally regardless of how good it looks.

**Relevance to you:** Growth Masala already wins this comparison decisively. Next.js SSR serves 130KB of fully-rendered HTML with proper headings and complete LocalBusiness schema. **Do not copy anything from StaffArc's technical approach.** Their brand/visual work may be worth a look; their SEO is a cautionary tale.

---

### 3.3 World of Nexa — `worldofnexa.com`
**Verdict: weakest SEO, strongest conversion model. Steal the offer structure, not the SEO.**

| Dimension | Finding |
|-----------|---------|
| Title tag | `worldofnexa` — **catastrophic.** No keyword, no service, no city |
| Meta description | Missing |
| H1 | `Turning Businesses Into Brands.` — brand-poetic, keyword-empty |
| Platform | **Shopify storefront** (`/collections/all`, `/pages/about`, `/policies/*`) |
| Location targeting | None — India only, no city, no address |
| Sitemap | 748 bytes |

**But their commercial model is genuinely better than yours:**

| Lever | What they do |
|-------|--------------|
| **Transparent pricing** | Social Media ₹4,999 / ₹9,999 / ₹19,999 per month · Packages ₹9,999 / ₹24,999 / ₹39,999 · Websites from ₹10,000–15,000 |
| **Productized services** | Sold as buyable products with a cart — removes the "request a quote" friction entirely |
| **Service breadth** | Logo design, websites, social media, Meta Ads, **WhatsApp marketing**, graphic design, thumbnail editing, **drone video ads**, **Amazon/Flipkart/Meesho listing** |
| **Trust** | 100+ clients served · 16+ client logos · named testimonials (Bhuvaneshwari, Sudheer, Mahideer) with 5-star ratings |
| **CTA** | WhatsApp-first (`+91 7330386608`), live chat |
| **Policy pages** | Privacy, Terms, Refund — trust signals Google's E-E-A-T rewards |
| **Forward-looking** | Exposes UCP/MCP agent endpoints and an `agents.md` — built for AI shopping agents |

**Steal:** publish pricing, add WhatsApp-first CTAs, add an FAQ section, add policy pages, and consider the niche services (WhatsApp marketing, marketplace listing, drone ads) — these have low competition in Telangana and are exactly what Mahabubnagar SMBs buy.

---

### 3.4 ASH Group — `ashgroup.co.in` *(your actual SERP competitor for Mahabubnagar)*
**Verdict: this is the page you have to beat. It is beatable.**

| Dimension | Finding |
|-----------|---------|
| URL | `/digital-marketing-company-services-in-mahabubnagar/` |
| Title | `Digital Marketing Company Services in Mahabubnagar \| ASH Group` |
| Meta description | *"Boost your business with top-rated Digital Marketing Company Services in Mahabubnagar by ASH Group. From SEO to PPC and Social Media, we offer result-driven solutions."* |
| H1 | `Digital Marketing Company Services in Mahabubnagar` — **exact match to title** |
| Word count | ~1,200 words |
| "Mahabubnagar" density | **98 occurrences** in HTML |
| Schema | `Organization`, `WebPage`, `WebSite`, `Place`, `PostalAddress`, `ContactPoint`, `BlogPosting`, `Person` |
| Platform | WordPress (Yoast — `sitemap_index.xml`) |

**Their page structure — this is the template that ranks:**

```
H1  Digital Marketing Company Services in Mahabubnagar
H2  Why Choose a Digital Marketing Agency in Mahabubnagar?
H2  Core Digital Marketing Company Services in Mahabubnagar by ASH Group
    H3  1. Search Engine Optimization (SEO)
    H3  2. Social Media Marketing (SMM)
    H3  3. Pay-Per-Click Advertising (PPC)
    H3  4. Website Designing and Development
    H3  5. Content Marketing
    H3  6. Local SEO & Google Business Optimization
    H3  7. Email Marketing
    H3  8. Influencer Marketing
H2  Benefits of Digital Marketing Services in Mahabubnagar
H2  Why ASH Group is the Best Digital Marketing Agency in Mahabubnagar
H2  Industries We Serve
H2  Our Process
H2  ASH Group – Your Local Digital Partner in Mahabubnagar
H2  Conclusion
```

**Their exploitable weaknesses:**
1. **They are not in Mahabubnagar.** Corporate offices listed are in Delhi. The page claims "Your Local Digital Partner in Mahabubnagar" with no local address, no local phone, no local clients.
2. **No FAQ section** → no `FAQPage` schema → no FAQ rich snippet in SERP.
3. **No internal links to other location pages** → no local topical cluster.
4. **No real Mahabubnagar case studies or client names.**
5. Generic stock content — reads as templated, which it is.

**You have what they don't:** an actual Mahabubnagar address, a local phone, and real local clients (Razzak Constructions is *in* Mahabubnagar; Kings Mobile World is Hyderabad). Named local clients and a genuine local NAP are signals ASH Group structurally cannot fake.

---

### 3.5 The wider Mahabubnagar & Hyderabad field

**Mahabubnagar SERP occupants:**

| Player | Approach |
|--------|----------|
| **Justdial** | Owns 3+ of the top 10 results via category pages (`/Mahabubnagar/Digital-Marketing-Services/nct-10948367`) — including sub-area pages for Balajinagar and Kalwakurthy |
| ASH Group | Delhi company, one programmatic Mahabubnagar page |
| HighXBrand | `/mahabubnagar/digital-marketing.php` — city-folder pattern, title stuffed with 3 keyword variants |
| Pixel MediaTech | Exact-match URL slug |
| KSK Digital Marketing | Training + services hybrid, price-led (`₹765 Free 50% Off`) |
| Rising Bizz | Listed via lead-generation directories |
| Futuremind IT | MB Towers, Station Rd — a genuine local business |

**Key insight:** almost nobody ranking for "Mahabubnagar" is actually *in* Mahabubnagar. They win on page structure alone. A genuinely local agency with a proper landing page, real local NAP, and real local client names should outrank them within 60–90 days.

**Hyderabad field** (a much harder, more valuable market): SJ Media Labs (12+ yrs), DigiClues, Inovies (70+ staff), Emblix Solutions, Cloud Timon (500+ clients, est. 2014), ResoluteB2B. Directory aggregators — GoodFirms, DesignRush, Sortlist, Clutch — and listicle publishers (IIDE, ZeroAdo) dominate the head terms. **Getting listed on those directories is a faster route into Hyderabad SERPs than trying to outrank the agencies directly.**

**Observed local price benchmarks:** business websites ₹6,000–₹90,000 · digital branding ₹350–₹50,000 · SEM/PPC ₹5,000–₹75,000 · social media ₹4,999–₹19,999/month.

---

## Part 4 — Content Gaps

### ~~🟠 G1. E-E-A-T is undermined by fabricated content~~ — **RETRACTED**

> **⚠️ Correction — this finding was wrong, and it was my error.**
>
> I repeated a claim from `.claude/TODO.md` (last updated 2026-04-02) without
> verifying it against the code. Grepping the source returns **zero** matches for
> "Sarah Johnson", "Michael Chen", "Priya Sharma", "TechStart India", "FreshBite",
> or "UrbanFit". Those placeholders were replaced at some point after that TODO
> was written; the TODO was simply stale.
>
> **Actual state — both files already contain real clients:**
>
> - `src/data/testimonials.ts` → Kiran (Triveni Balavikas Central School),
>   Shahbuddin (Freewings School), Mr. Khan (Kings Mobile World)
> - `src/app/case-studies/page.tsx` → Freewings School, Kings Mobile World,
>   Triveni Balavikas Central School — each with a live URL
>
> No action was needed. The `.claude/TODO.md` entries have been removed so the
> stale claim cannot propagate again.

**The one real gap that remains here** is that the case-study "results" are
capability statements ("Live", "1-tap", "4 Branches") rather than outcome metrics
(enquiries, admissions, traffic). The source file already flags this in a comment.
Getting even one client to share a real number would materially strengthen the page —
that is a client-relationship task, not a code task.

### 🟡 G2. Blog is thin and non-local

Three posts, none targeting a local keyword:
- `why-every-business-needs-a-website-in-2026`
- `5-social-media-mistakes-killing-your-engagement`
- `meta-ads-guide-for-small-businesses`

These are generic and compete against the entire internet. Local-intent posts have almost no competition. Priority queue:

1. `How to Choose a Digital Marketing Agency in Mahabubnagar` → *digital marketing agency Mahabubnagar*
2. `Website Design Cost in Mahabubnagar: 2026 Price Guide` → *website design cost Mahabubnagar* (high commercial intent; also answers the pricing question competitors answer and you don't)
3. `Local SEO Guide for Mahabubnagar Businesses` → *SEO agency Mahabubnagar*
4. `Meta Ads for Telangana Small Businesses: What Actually Works` → *Meta ads agency Mahabubnagar*
5. `Top 10 Digital Marketing Agencies in Mahabubnagar (2026)` → **listicle including yourself** — this is exactly how IIDE and ZeroAdo rank for Hyderabad

### 🟡 G3. No pricing anywhere

World of Nexa publishes everything. Local benchmarks are public. Buyers searching "website design cost Mahabubnagar" find competitors and never reach you. Even "starting from ₹X" ranges capture that traffic and pre-qualify leads.

### 🟡 G4. No FAQ content → no rich snippets

Zero `FAQPage` schema on the site. No competitor reviewed has it either — **this is an uncontested opportunity.** FAQ rich results expand SERP footprint substantially and feed AI Overviews directly.

---

## Part 5 — Schema & Structured Data

**Current state** ([src/app/layout.tsx](../src/app/layout.tsx)): a single `LocalBusiness` + `ProfessionalService` JSON-LD block with name, description, url, email, telephone, image, priceRange, address, geo, openingHours, sameAs, serviceType, areaServed.

**This is better than every competitor reviewed.** Dizi has no LocalBusiness schema; StaffArc has Organization only; World of Nexa has Shopify defaults.

**Gaps:**

| Missing | Value | Where |
|---------|-------|-------|
| `streetAddress` + `postalCode` | Incomplete NAP weakens local trust; Google cross-references address consistency | `layout.tsx` PostalAddress |
| `FAQPage` | FAQ rich snippet — nobody local has it | New FAQ section, homepage + service pages |
| `BreadcrumbList` | Breadcrumb display in SERP instead of raw URL | All inner pages |
| `Service` (per service) | Service-level rich results | Each of the 5 services |
| `AggregateRating` / `Review` | Star ratings in SERP — highest CTR lift available | Once real reviews exist |
| `Article` / `BlogPosting` | Blog post eligibility for Top Stories / Discover | `blog/[slug]/page.tsx` |
| `WebSite` + `SearchAction` | Sitelinks search box | `layout.tsx` |
| `Person` (founder) | Entity/E-E-A-T signal — ASH Group has this | About page |

Note: the schema `image` currently points at `icon.png` (see C3) — a favicon. Google prefers 1200×630 or larger for business images.

---

## Part 6 — Performance

**Good:** TTFB 0.14s (home) / 0.35–0.39s (inner), HTTPS with HSTS (`max-age=63072000`), clean 308/307 redirects for HTTP and www, all 5 homepage images have non-empty alt text, SSR delivers complete HTML.

**Issues:**

| Issue | Evidence | Fix |
|-------|----------|-----|
| **Oversized source images** | `public/images/portfolio/` = 4.6MB across 8 JPGs — `kings-mobile.jpg` 906KB, `triveni-balavikas.jpg` 775KB, `automotive-dudes.jpg` 759KB, `freewings.jpg` 662KB | Convert to WebP, resize to max 1600px wide, target <120KB each. Next `<Image>` transforms on demand but oversized sources inflate transform cost and cold-start LCP |
| **Heavy JS** | Largest chunks: 218KB, 115KB, 109KB, 38KB, 36KB, 32KB, 29KB, 24KB ≈ **600KB+** for a marketing site | Audit Framer Motion imports — import specific components rather than the barrel; `next/dynamic` the chat widget (already lazy) and any below-fold animated sections |
| **Homepage HTML 130KB** | Large SSR payload | Acceptable, but trimming inline content helps LCP |

**Not yet measured:** actual Core Web Vitals (LCP/INP/CLS). Run PageSpeed Insights on the live URL once the canonical fix ships — that requires field data which needs traffic, so lab data is the near-term proxy.

---

## Prioritized Action Plan

### Tier 0 — Unblocks everything ✅ **SHIPPED**

1. ✅ **Remove the root canonical; add per-page relative canonicals.**
2. ✅ **Fix title tags** — strip the duplicated brand, put the location keyword first.
3. ✅ **Repoint the broken `icon.png` reference** (now `/favicon.ico` + `/images/logo.png`).
4. ⬜ **Set up Google Search Console**, verify the domain, submit `sitemap.xml`, request indexing. *(owner action — cannot be done in code)*
5. ✅ Align the sitemap root URL with the canonical form.

### Tier 1 — On-site ✅ **SHIPPED** / off-site ⬜ **OWNER**

6. ✅ **Contact page + footer NAP** — locality, region, phone, and email on every page.
7. ⚠️ **`streetAddress` + `postalCode` in JSON-LD** — now populated ("Station Road" / 509001, set on owner instruction 2026-08-06). The street value is road-level, **not a verified premises**, and must be replaced before any directory listing is created. See [What's Still Open](#whats-still-open).
8. ✅ ~~Replace fabricated testimonials and case studies~~ — **retracted, they were already real.** See [G1](#-g1-e-e-a-t-is-undermined-by-fabricated-content--retracted).
9. ⬜ **Directory listings**: Justdial → Sulekha → Clutch → GoodFirms → Sortlist → DesignRush. *(owner action)*
10. ⬜ **Verify GA4** is firing in production (`NEXT_PUBLIC_GA_ID` must be set in Vercel env, not just `.env.local`). *(owner action)*

### Tier 2 ✅ **SHIPPED**

11. ✅ **Location landing pages** — 12 built (5 Mahabubnagar service pages, 5 micro-local, 2 Hyderabad), each with FAQ, local market copy, and cross-links.
12. ✅ **`FAQPage` schema** — homepage (6 Q) and every location page (4 Q).
13. ✅ **`BreadcrumbList`** on all inner pages + **`Service`** schema on location pages + **`OfferCatalog`** on the business node.
14. ⬜ **Publish pricing** — deliberately not invented. See [What's Still Open](#whats-still-open).
15. ✅ **Compressed images to WebP** — 5.2MB → 788KB (85% reduction).

### Tier 3 — 4–12 weeks

16. ✅ Micro-local pages: Shadnagar, Wanaparthy, Kalwakurthy, Jadcherla, Narayanpet — **shipped early.**
17. ⬜ Two local blog posts per month from the [G2 queue](#-g2-blog-is-thin-and-non-local), starting with the cost guide and the "Top 10 agencies in Mahabubnagar" listicle.
18. ✅ Hyderabad pages — **shipped early** (they cost nothing extra once the route was templated).
19. ⬜ Collect real reviews → add `AggregateRating` schema. *(owner action, then ~30 min of code)*
20. ⬜ Audit JS bundle weight; run Lighthouse and fix to 90+.

---

## Implementation Log

Everything below was implemented and verified on 2026-08-06 against a local
production build (`pnpm build && pnpm start`), not assumed.

### Files added

| File | Purpose |
|------|---------|
| `src/data/business.ts` | Single source of truth for NAP, geo, areas served, opening hours. Every surface imports from here so the business details can never drift between the footer, the contact page, and the JSON-LD. |
| `src/lib/schema.ts` | JSON-LD builders: `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`, `BlogPosting`. All server-rendered. |
| `src/data/faqs.ts` | FAQ content for the homepage plus a builder for per-location FAQs. |
| `src/data/locations.ts` | The 12 location landing pages, each with its own `intro`, `whyLocal`, and `marketContext` copy. |
| `src/app/[slug]/page.tsx` | Renders the location pages at the site root with `dynamicParams = false`. |
| `src/components/ui/FAQSection.tsx` | Server-rendered `<details>` accordion — zero JS, so the answers are in the HTML and the FAQ schema stays valid. |

### Files changed

`src/app/layout.tsx` · `src/app/page.tsx` · `src/app/sitemap.ts` ·
`src/app/{services,portfolio,case-studies,about,contact}/layout.tsx` ·
`src/app/blog/page.tsx` · `src/app/blog/[slug]/page.tsx` ·
`src/app/contact/page.tsx` · `src/components/layout/Footer.tsx` ·
`src/components/home/{HeroSection,IntroSection}.tsx` · `src/data/portfolio.ts` ·
`src/content/blog/*.md`

### Verification performed

| Check | Result |
|-------|--------|
| Production build | ✅ Compiles, 29 static pages generated |
| Canonical tag on all 20 routes | ✅ Each page canonicalises to **itself** (was: all → homepage) |
| Title tags | ✅ Brand appears exactly once; all 44–63 chars; all keyword-first |
| All 22 sitemap URLs | ✅ Every one returns 200 |
| Unlisted slugs (`/nope`, `/digital-marketing-agency-fake`) | ✅ 404 — `dynamicParams = false` holds |
| Static route precedence over `[slug]` | ✅ `/services`, `/about`, `/blog`, `/robots.txt`, `/sitemap.xml` all unaffected |
| Schema renders server-side | ✅ Parsed from raw HTML via `curl` — no JS execution needed |
| FAQ schema ↔ visible content parity | ✅ 0 of 10 answers missing from visible HTML (hidden FAQ schema is a policy violation) |
| NAP on every page | ✅ Address + phone + email present site-wide |
| "Mahabubnagar" in visible body copy | ✅ 0 → 13 (home), 10 (contact), 8 (services/about), 31 (primary landing page) |
| Location page uniqueness (5-gram Jaccard) | ✅ Max 0.552, median 0.462; 24–29% of each page is unique to it. Well clear of doorway-page territory |
| Location page depth | ✅ 702–826 words each (ASH Group, the page to beat, is ~1,200) |
| All image assets resolve | ✅ 14/14 return 200; `icon.png` correctly 404s and is no longer referenced |
| Image weight | ✅ 5.2MB → 788KB |

### Caught in post-deploy verification

The first deploy shipped the homepage and `/digital-marketing-agency-mahabubnagar`
with **identical titles** and near-identical descriptions — keyword
cannibalization, and a violation of the "unique titles per page" rule this same
audit lists. Caught by a duplicate-title check against production, fixed in
`9ce71da`: the exact-match phrase now belongs solely to the landing page, and the
homepage took a broader service-led title (*"Websites, SEO & Meta Ads in
Mahabubnagar"*).

Worth noting because the local build passed every other check — a per-page
assertion (canonical equals own URL) can be green while a *cross-page* property
(all titles distinct) is broken. Both classes need checking.

### Known pre-existing issue, not touched

`pnpm lint` fails with one error in `src/components/layout/Navbar.tsx:22` —
`react-hooks/set-state-in-effect`. This predates these changes (the file is
untouched in this diff) and is unrelated to SEO, so it was left alone rather than
folded into an SEO change set. `pnpm build` is unaffected; lint is not part of the
build.

---

## What's Still Open

### Needs the owner (cannot be done in code)

| Item | Why it can't be automated | Impact |
|------|---------------------------|--------|
| **Google Search Console** — verify domain, submit sitemap, request indexing | Requires domain ownership auth | 🔥 Highest. The canonical fix does nothing until Google re-crawls |
| **Replace the placeholder street address** | `src/data/business.ts` now carries "Station Road, Mahabubnagar, Telangana, 509001" — road-level only, set on owner instruction to complete the schema. Must become the real premises **before** the first directory listing, since NAP has to match character-for-character across every citation | High |
| **Directory listings** — Justdial, Sulekha, Clutch, GoodFirms, Sortlist, DesignRush | Manual registration | High (Clutch/GoodFirms drive AI recommendations) |
| **GA4 in Vercel env** | `NEXT_PUBLIC_GA_ID` may only be in `.env.local` | Medium — no data without it |
| **Real pricing** | Deliberately not invented. A published range is the single most-requested thing buyers search for, and every competitor publishes one | High |
| **Client reviews** | Needed before `AggregateRating` schema is legitimate | High (star ratings have the biggest CTR lift available) |
| **One real outcome metric** for a case study | Needs a client to share their numbers | Medium |

### Remaining code work (not blocking)

- Local blog posts from the [G2 queue](#-g2-blog-is-thin-and-non-local) — highest value is the website-cost guide.
- JS bundle audit (largest chunk is 218KB) and a Lighthouse pass.
- `AggregateRating` + `Review` schema, once real reviews exist.

---

## Corrections to This Audit

Recorded because the original findings were circulated before verification.

| # | Original claim | Reality |
|---|----------------|---------|
| 1 | "Fabricated testimonials and case studies (Sarah Johnson, TechStart India…)" | **Wrong.** Repeated from a stale `.claude/TODO.md` without grepping the source. Both files already contain real, named clients with live URLs. Retracted in [G1](#-g1-e-e-a-t-is-undermined-by-fabricated-content--retracted); the stale TODO entries were removed. |
| 2 | "Sitemap root URL needs a trailing slash because the server 308-redirects" | **Wrong.** The 308 was the `http→https` protocol redirect. Both `https://growthmasala.com` and `https://growthmasala.com/` return 200 with no redirect. The sitemap was still changed — but to match the canonical tag, not to fix a redirect. |

Both errors share a cause: treating a secondary source (a stale TODO, a redirect
observed on a different URL) as evidence about the primary artifact. Verify against
the artifact itself.

---

## What Success Looks Like

Timelines run from **deploy + Search Console submission**, not from the code
landing. Until Google re-crawls, none of this work is visible to it.

| Milestone | Expected timeline |
|-----------|-------------------|
| All 22 pages indexed (`site:growthmasala.com` returns them) | 1–2 weeks |
| Ranking top 20 for `digital marketing agency Mahabubnagar` | 4–6 weeks |
| Ranking top 5 for the same | 8–12 weeks |
| Ranking for micro-local terms (Shadnagar, Wanaparthy, Kalwakurthy) | 6–10 weeks |
| FAQ rich results appearing in SERP | 2–6 weeks after indexing |
| Appearing in AI assistant recommendations | 3–6 months (requires Clutch/GoodFirms citations) |

**Leading indicator to watch first:** Search Console → Pages → Indexed. If that
number climbs past 20 within two weeks, the canonical fix worked and the rest is a
content-and-citations game. If it stays flat, something else is blocking crawl and
that becomes the next investigation.

---

## Honest Caveats

Unchanged from the original audit except where noted:

- **No Search Console or GA access** — everything here is derived from live HTTP inspection, source review, and public SERP data. Real impression and click data may reveal queries I cannot see.
- **Rank positions are inferred**, not measured with a rank-tracking tool. I verified *absence* (nothing appears for any target query) rather than measuring competitors' exact positions.
- **Core Web Vitals still not measured.** Image weight dropped 85%, which should help LCP, but I did not run Lighthouse and there is no field data without traffic. Treat the image work as a likely improvement, not a proven one.
- **Schema was verified from served HTML** and is genuinely server-rendered (parsed via `curl`, no JS needed) — but run it through Google's Rich Results Test after deploy before relying on rich-result eligibility.
- **The 12 location pages are new and unproven.** They follow the structure of pages that currently rank, and they clear the duplicate-content bar by a wide margin (max 0.552 Jaccard). But new pages targeting commercial keywords take time and links to rank; do not read a flat first month as failure.
- **Ranking predictions above are estimates**, based on observed competitor page structure and the low local competition, not on a rank-tracking baseline. The one thing I am confident about is the direction: the site went from structurally unable to rank to structurally able to.
- ~~**The canonical bug is the dominant variable.**~~ Fixed. The dominant variable is now **Search Console submission** — the work is done but invisible until Google is told to re-crawl.
