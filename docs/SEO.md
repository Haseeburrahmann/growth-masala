# SEO — Architecture, Rules & Playbook

Everything search-related for growthmasala.com in one place: the conventions that
keep the site rankable, the competitor intelligence behind them, and the
outstanding off-site work.

**Read this before touching metadata, schema, canonicals, the footer, or the
location pages.**

---

## Status

**Audited and remediated 2026-08-06.** The site had been invisible in Google —
`site:growthmasala.com` returned nothing — because every page served a canonical
pointing at the homepage. Fixed and deployed (`1c10a2d`, `9ce71da`).

Verified live in production:

| Check | Result |
|-------|--------|
| Canonicals | 20/20 routes canonicalise to themselves |
| Titles | 19/19 unique, all ≤ 60 chars, brand appears once |
| Sitemap | 22 URLs, all returning 200 |
| Schema | LocalBusiness · WebSite · Service · FAQPage · BreadcrumbList · BlogPosting, all server-rendered |
| NAP | Address, phone, email on every page |
| Images | 5.2MB → 788KB (WebP) |

**Next action:** Google Search Console — see [Search Console Setup](#search-console-setup). Nothing else moves until Google re-crawls.

---

## Ownership map

| Concern | Owner |
|---------|-------|
| NAP, geo, areas served, hours | `src/data/business.ts` — single source of truth |
| JSON-LD construction | `src/lib/schema.ts` — pure builders |
| Titles, descriptions, canonicals | Each route's `layout.tsx` / `page.tsx` — **never** the root layout |
| FAQ content | `src/data/faqs.ts` |
| Location landing pages | `src/data/locations.ts` + `src/app/[slug]/page.tsx` |
| Sitemap | `src/app/sitemap.ts` — derives location + blog URLs |
| Crawler directives | `public/robots.txt` — explicitly allows GPTBot, PerplexityBot, ClaudeBot |

---

## Rule 1 — Canonicals are per-route, never at the root

**The rule that matters most.** Violating it took the whole site out of the index.

In the App Router, `alternates.canonical` in the root layout is **inherited by
every child route**, so a root canonical makes every inner page declare itself a
duplicate of the homepage.

```ts
// src/app/layout.tsx — deliberately NO `alternates` block.

// Every route sets its own, relative to metadataBase:
export const metadata: Metadata = { alternates: { canonical: "/services" } };
```

Dynamic routes build it from the resolved param:

```ts
alternates: { canonical: `/blog/${slug}` }   // blog/[slug]/page.tsx
alternates: { canonical: `/${page.slug}` }   // [slug]/page.tsx
```

**Adding a route:** set its own canonical → add to `sitemap.ts` (location and blog
routes are automatic) → verify against rendered HTML.

---

## Rule 2 — Child titles are bare; the template adds the brand

Root layout defines `template: "%s | Growth Masala"`. A child setting
`title: "Services — Growth Masala"` renders as `Services — Growth Masala | Growth
Masala`.

```ts
title: "Digital Marketing Services in Mahabubnagar"   // ✅
title: "Services — Growth Masala"                     // ❌ double-prints
```

Keep the bare title under ~45 chars so the rendered title stays under 60. Lead
with the keyword, not the brand — brand search is a losing fight here, since an
established agency called **Marketing Masala** owns that semantic space.

`openGraph.title` takes **no** template — write it out in full including the brand.

### Titles must be unique across routes

Two pages with the same title compete for the same query and split the signal.
This shipped once: the homepage and `/digital-marketing-agency-mahabubnagar` both
went live as *"Digital Marketing Agency in Mahabubnagar | Growth Masala"*.

**An exact-match phrase belongs to exactly one page** — the dedicated landing
page, which has the FAQ schema, `Service` schema, and internal links behind it.
The homepage takes a broader service-led angle.

```bash
for p in "" services portfolio about blog contact \
         digital-marketing-agency-mahabubnagar website-development-mahabubnagar; do
  curl -s "https://growthmasala.com/$p" | grep -o '<title>[^<]*</title>'
done | sort | uniq -d      # any output = duplicate
```

---

## Rule 3 — Schema is server-rendered, and FAQ schema must match visible content

All JSON-LD is emitted from server components, so crawlers see it on first fetch
without executing JavaScript.

| Node | Where | @id |
|------|-------|-----|
| `LocalBusiness` + `ProfessionalService` | Root layout, once | `{SITE_URL}/#business` |
| `WebSite` | Root layout | `{SITE_URL}/#website` |
| `BreadcrumbList` | Every inner route's `layout.tsx` | — |
| `FAQPage` | Homepage + every location page | — |
| `Service` | Location pages | references `#business` |
| `BlogPosting` | `blog/[slug]` | references `#business` |
| `OfferCatalog` | Nested in the business node | from `src/data/services.ts` |

**FAQ parity is non-negotiable.** `FAQPage` schema whose answers aren't visible is
a structured-data policy violation. That's why `FAQSection` is a **server
component using native `<details>`** — the answers ship inside the HTML. Both the
schema and the component read the same array in `src/data/faqs.ts`; don't break
that coupling.

**Conditional address fields.** `buildPostalAddress()` omits any empty field
rather than emitting a guess. `streetAddress` is currently `"Station Road"` — a
real public thoroughfare in Mahabubnagar, but road-level only, set on the owner's
instruction (2026-08-06). `postalCode` 509001 is correct for the town.
**Replace with the real premises before creating any directory listing** — local
ranking scores NAP consistency across sources.

---

## Rule 4 — Location pages must carry unique copy

`src/app/[slug]/page.tsx` renders 12 pages from `src/data/locations.ts`. Every
entry supplies its own `intro`, `whyLocal`, and `marketContext`.

Cloning an entry and find-replacing the city name produces **doorway pages**,
which Google filters. Current set: **0.552 max 5-gram Jaccard similarity**
(median 0.462), 24–29% of each page unique to it. Keep new pages in that range.

**Routing.** Pages live at the site root so URLs are exact-match. Static routes
take precedence over the dynamic segment, so `/services`, `/blog`, `/robots.txt`
are unaffected. `dynamicParams = false` makes unlisted slugs 404.

**Internal linking.** Location pages would otherwise be orphans: `relatedSlugs`
cross-links each to 3 siblings, and `Footer.tsx` surfaces the first 6 on every page.

---

## Rule 5 — Images are WebP and pre-sized

```bash
cwebp -q 82 -resize 1600 0 input.jpg -o output.webp
```

Oversized sources were 85% of the site's asset weight. Keep new images under
~120KB. `next/image` handles responsive serving on top.

---

## Verification

Next.js merges parent and child metadata in ways that aren't obvious from reading
either file. **Check rendered HTML, never assume.**

```bash
pnpm build && pnpm start

# canonical must equal the page's own URL
curl -s http://localhost:3000/services | grep -o '<link rel="canonical"[^>]*>'

# brand exactly once
curl -s http://localhost:3000/services | grep -o '<title>[^<]*</title>'

# schema must parse from raw HTML (proves server-rendering)
curl -s http://localhost:3000/ | python3 -c "
import sys,re,json
for b in re.findall(r'<script type=\"application/ld\+json\"[^>]*>(.*?)</script>', sys.stdin.read(), re.S):
    print(json.loads(b).get('@type'))"
```

Also check: every sitemap URL returns 200, unlisted slugs 404, and **all titles
are distinct**.

> ⚠️ Per-page checks can all pass while a **cross-page** property is broken. The
> duplicate-title bug shipped to production with every per-page assertion green.
> Check both classes.

---

## Adding things

**A page:** bare keyword-first title, unique description, own canonical,
`BreadcrumbList` in its `layout.tsx`. Add to `sitemap.ts`.

**A location page:** new entry in `src/data/locations.ts` with genuinely new
`intro` / `whyLocal` / `marketContext`, wire `relatedSlugs` both ways, re-check
similarity. Sitemap and static params update themselves.

**A blog post:** drop markdown in `src/content/blog/`. Canonical, `BlogPosting`
schema, breadcrumbs, and sitemap entry are automatic. Set `image` to a `.webp`.

**A service:** add to `src/data/services.ts`. Propagates to homepage, services
page, chatbot prompt, `serviceType`, and `OfferCatalog`.

**Business details:** edit `src/data/business.ts` only, then update every external
listing to match character-for-character.

---

## Search Console Setup

⛔ **Deploy first.** Confirm the fix is live before submitting anything:

```bash
curl -s https://growthmasala.com/services | grep -o '<link rel="canonical"[^>]*>'
# must return .../services — not the bare domain
```

**Verification method:** prefer **DNS TXT (Domain property)** — covers http,
https, www, and subdomains, no redeploy. Fall back to **HTML tag (URL prefix)**
only without DNS access: set `GOOGLE_SITE_VERIFICATION` in Vercel to the token,
then **redeploy** (pages are statically prerendered, so it's read at build time —
setting the variable alone does nothing).

**Steps:**
1. https://search.google.com/search-console → confirm the right Google account
2. Add property → Domain → `growthmasala.com` → add the TXT record → Verify
3. **Record the baseline:** Indexing → Pages. Note anything under *"Alternate page
   with proper canonical tag"* or *"Duplicate without user-selected canonical"* —
   that's the fingerprint of the bug we fixed
4. Sitemaps → enter `sitemap.xml` → Submit → refresh. **Discovered URLs should be
   22.** If it says 10, Google fetched a cached copy and the deploy didn't land
5. URL Inspection → request indexing, in this order (rate-limited to ~10–15/day):
   `/` · `/digital-marketing-agency-mahabubnagar` · `/website-development-mahabubnagar` ·
   `/seo-services-mahabubnagar` · `/social-media-marketing-mahabubnagar` ·
   `/meta-ads-mahabubnagar` · `/services` · `/contact` · `/portfolio` · `/case-studies`
6. On the **first URL only**, check *User-declared canonical* vs *Google-selected
   canonical*. If they disagree, stop — the fix didn't take
7. Security & Manual actions → confirm "No issues detected"

**Never** submit URL removal requests.

### Follow up after 7 days

| What you see | Meaning |
|--------------|---------|
| Indexed climbing toward 22 | ✅ Working. Build citations next. |
| Still 0–2 after 14 days | ⚠️ Something else blocks crawl. Check the not-indexed breakdown. |
| "Alternate page with proper canonical tag" | ⚠️ A canonical is still wrong. Re-run verification above. |
| "Crawled — currently not indexed" | 😐 Normal for new pages. Citations and internal links speed it up. |

---

## Competitive landscape

**The key insight: almost nobody ranking for "Mahabubnagar" is actually in
Mahabubnagar.** They win on page structure alone. Growth Masala is genuinely
local with real local clients — an advantage they cannot fake.

### The page to beat — ASH Group

A Delhi company ranking on a single programmatic page at
`/digital-marketing-company-services-in-mahabubnagar/`:

- Title **and** H1 both exact-match: *"Digital Marketing Company Services in Mahabubnagar"*
- ~1,200 words; "Mahabubnagar" appears **98 times** in the HTML
- Structure: why-choose → 8 service H3s → benefits → why-us → industries → process → conclusion

**Exploitable weaknesses:** no FAQ section (so no FAQ rich result), no local
address or phone, no real local clients, no internal links to sibling location
pages.

### Other players

| Competitor | Approach | Takeaway |
|------------|----------|----------|
| **Dizi Solutions** (Hyderabad) | Keyword-first titles, page-per-service, 4 sitemaps, two physical addresses, `branch.php`, 10+ yrs / 950+ clients / government logos | Strongest SEO operator. Steal the service-page architecture and trust-number strip. |
| **World of Nexa** | Title tag is literally `worldofnexa`; no meta description. But: published pricing, productized services on Shopify, 100+ clients, named testimonials, WhatsApp-first CTAs, FAQ, policy pages | SEO-hopeless, **conversion-strong**. Steal the offer structure, not the SEO. |
| **StaffArc** | 2.4KB HTML — a client-side SPA. No headings, no meta description, no location, no LocalBusiness schema, relative `og:image`, deprecated meta keywords | Cannot rank locally. We already beat this decisively. Copy nothing technical. |
| **HighXBrand** | `/mahabubnagar/digital-marketing.php` — city-folder pattern, title stuffed with 3 keyword variants | Scales to any city. |
| **Justdial** | Owns 3+ of the top 10 Mahabubnagar results via category pages, including sub-area pages | Get listed — you can't outrank it, so join it. |

**Hyderabad** is harder and more valuable: SJ Media Labs, DigiClues, Inovies (70+
staff), Emblix, Cloud Timon. Directory aggregators (GoodFirms, DesignRush,
Sortlist, Clutch) and listicles (IIDE, ZeroAdo) dominate the head terms —
**getting listed on those is a faster route in than outranking the agencies.**

---

## Outstanding work

Code-level findings are all fixed. What remains needs the owner.

| Item | Why it can't be automated | Impact |
|------|---------------------------|--------|
| **Search Console** — verify, submit, request indexing | Needs domain-ownership auth | 🔥 Highest. Everything else is invisible until Google re-crawls |
| **Real street address** | Current value is a road-level placeholder. Must be right before the first directory listing | High |
| **Directory listings** — Justdial, Sulekha, Clutch, GoodFirms, Sortlist, DesignRush | Manual registration | High. Clutch/GoodFirms drive AI recommendations |
| **Publish pricing** | Pricing exists and is designed — see `.claude/TODO.md`. Every competitor publishes; we don't | High. "website design cost Mahabubnagar" is high-intent traffic we forfeit |
| **GA4 in Vercel env** | `NEXT_PUBLIC_GA_ID` may only be in `.env.local` | Medium — no data without it |
| **Client reviews** | Needed before `AggregateRating` schema is legitimate | High. Star ratings are the biggest CTR lift available |
| **Local blog posts** | See the content queue in `.claude/TODO.md` | Medium |

### Honest caveats

- **No Search Console or GA access** during the audit — findings come from live HTTP inspection, source review, and public SERP data.
- **Rank positions are inferred**, not measured with a rank tracker. Absence was verified; competitors' exact positions were not.
- **Core Web Vitals not measured.** Image weight dropped 85%, which should help LCP, but no Lighthouse run and no field data. A likely improvement, not a proven one.
- **The 12 location pages are new and unproven.** They follow the structure of pages that currently rank and clear the duplicate-content bar by a wide margin, but new pages take time and links. A flat first month is not failure.
- **Schema is server-rendered and verified via curl**, but run it through Google's Rich Results Test before relying on rich-result eligibility.

### Two corrections to the original audit

Recorded because both findings circulated before verification.

| Claim | Reality |
|-------|---------|
| "Fabricated testimonials and case studies (Sarah Johnson, TechStart India…)" | **Wrong.** Repeated from a stale TODO without grepping. Both files already held real, named clients with live URLs. |
| "Sitemap root needs a trailing slash — the server 308-redirects" | **Wrong.** That 308 was the `http→https` redirect. Both forms return 200. The sitemap was still changed, but to match the canonical — not to fix a redirect. |

Both share a cause: treating a secondary source (a stale TODO, a redirect on a
different URL) as evidence about the primary artifact. **Verify against the
artifact itself.**
