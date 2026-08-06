# SEO Architecture

How search-facing concerns are wired in this codebase, and the rules that keep
them correct. Read this before touching metadata, schema, the footer, or the
location pages.

Companion documents:
- [`seo-audit-2026-08.md`](seo-audit-2026-08.md) — the audit that produced this design, plus the competitor teardown
- [`.claude/TODO.md`](../.claude/TODO.md) — what's still outstanding

---

## Ownership map

| Concern | Owner | Notes |
|---------|-------|-------|
| NAP, geo, areas served, opening hours | `src/data/business.ts` | Single source of truth. Nothing else hardcodes these. |
| JSON-LD construction | `src/lib/schema.ts` | Pure builders. Return plain objects; callers serialise. |
| Titles, descriptions, canonicals | Each route's `layout.tsx` / `page.tsx` | Never the root layout — see the canonical rule below. |
| FAQ content | `src/data/faqs.ts` | Must stay in sync with what `FAQSection` renders. |
| Location landing pages | `src/data/locations.ts` + `src/app/[slug]/page.tsx` | Data-driven; one component serves all 12. |
| Sitemap | `src/app/sitemap.ts` | Derives location and blog URLs automatically. |
| Crawler directives | `public/robots.txt` | Explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot…). |

---

## Rule 1 — Canonicals are per-route, never at the root

**This is the rule that matters most.** Violating it took the entire site out of
Google's index once already.

In the App Router, `alternates.canonical` set in the root layout's metadata is
**inherited by every child route**. A root canonical therefore makes every inner
page declare itself a duplicate of the homepage, and Google drops them.

```ts
// src/app/layout.tsx — there is deliberately NO `alternates` block here.

// Every route sets its own, relative to metadataBase:
export const metadata: Metadata = {
  alternates: { canonical: "/services" },
};
```

**Checklist when adding a route:**
1. Set `alternates.canonical` to that route's own path.
2. Add it to `src/app/sitemap.ts` (location and blog routes are automatic).
3. Verify after building — see [Verification](#verification) below.

Dynamic routes build the canonical from the resolved param:

```ts
alternates: { canonical: `/blog/${slug}` }   // blog/[slug]/page.tsx
alternates: { canonical: `/${page.slug}` }   // [slug]/page.tsx
```

---

## Rule 2 — Child titles are bare; the template adds the brand

The root layout defines:

```ts
title: {
  default: "Digital Marketing Agency in Mahabubnagar | Growth Masala",
  template: "%s | Growth Masala",
},
```

A child that sets `title: "Services — Growth Masala"` renders as
`Services — Growth Masala | Growth Masala`. **Child titles must not contain the
brand.**

```ts
title: "Digital Marketing Services in Mahabubnagar"   // ✅
title: "Services — Growth Masala"                     // ❌ double-prints
```

Keep the bare title under ~45 characters so the full rendered title stays under
60 and isn't truncated in the SERP. Lead with the keyword, not the brand — brand
search is a losing fight here (an established agency called *Marketing Masala*
owns that semantic space).

**`openGraph.title`, by contrast, takes no template** — write it out in full
including the brand.

---

## Rule 3 — Schema is server-rendered, and FAQ schema must match visible content

All JSON-LD is emitted into the HTML from server components. Nothing is injected
client-side, so crawlers see it on first fetch without executing JavaScript.

### The entity graph

| Node | Where | @id |
|------|-------|-----|
| `LocalBusiness` + `ProfessionalService` | Root layout — once, site-wide | `{SITE_URL}/#business` |
| `WebSite` | Root layout | `{SITE_URL}/#website` |
| `BreadcrumbList` | Every inner route's `layout.tsx` | — |
| `FAQPage` | Homepage + every location page | — |
| `Service` | Location pages | references `#business` |
| `BlogPosting` | `blog/[slug]` | references `#business` |
| `OfferCatalog` | Nested in the business node | built from `src/data/services.ts` |

Page-level nodes reference the business by `@id` rather than repeating it.

### FAQ parity is non-negotiable

`FAQPage` schema whose answers are not visible on the page is a structured-data
policy violation. This is why `FAQSection` is a **server component using native
`<details>`** rather than a JS accordion — the answers ship inside the HTML.

If you change `src/data/faqs.ts`, the rendered output changes with it because both
the schema and the component read the same array. Don't break that coupling.

### Conditional address fields

`buildPostalAddress()` omits any address field left empty in `business.ts`, so a
partial address degrades gracefully instead of emitting a guess.

**Current state:** `streetAddress` is `"Station Road"` — a real public
thoroughfare in Mahabubnagar, but road-level only, not a verified premises. It
was set on the owner's explicit instruction (2026-08-06) to complete the schema.
`postalCode` `509001` is correct for Mahabubnagar town.

**This must be replaced with the real address before any directory listing is
created.** Local ranking scores NAP consistency across sources, so whatever is in
this file has to appear character-for-character on Justdial, Sulekha, Clutch, and
everywhere else. Correcting a published inconsistency is far more work than
setting it right once.

---

## Rule 4 — Location pages must carry unique copy

`src/app/[slug]/page.tsx` renders all 12 location pages from
`src/data/locations.ts`. Every entry must supply its own:

- `intro` — opening paragraph under the H1
- `whyLocal` — the local-agency argument for that specific place
- `marketContext` — what that market actually looks like

Cloning an entry and find-replacing the city name produces **doorway pages**,
which Google filters. The current set measures **0.552 max 5-gram Jaccard
similarity** (median 0.462), with 24–29% of each page's content unique to it.
Keep new pages in that range.

### Routing

The route lives at the site root so URLs are exact-match
(`/digital-marketing-agency-mahabubnagar`), matching what competitors rank with.

```ts
export const dynamicParams = false;   // unlisted slugs 404 instead of generating empty pages
export function generateStaticParams() { /* the 12 slugs */ }
```

Static routes take precedence over the dynamic segment, so `/services`,
`/about`, `/blog`, `/robots.txt`, and `/sitemap.xml` are unaffected. This is
verified — see below.

### Internal linking

Location pages are otherwise orphans. Two things prevent that:
- `relatedSlugs` cross-links each page to 3 siblings
- `Footer.tsx` surfaces the first 6 on **every** page

---

## Rule 5 — Images are WebP and pre-sized

Source images live in `public/images/` as `.webp`, resized to max 1600px wide at
quality 82. `next/image` handles responsive serving on top of that.

```bash
cwebp -q 82 -resize 1600 0 input.jpg -o output.webp
```

Oversized sources were 85% of the site's asset weight (5.2MB → 788KB). Keep new
images under ~120KB. Originals from the 2026-08-06 conversion are preserved in
`~/Desktop/2026/growth-masala-image-originals/`.

---

## Verification

Assumptions about metadata are unreliable — Next.js merges parent and child
metadata in ways that aren't obvious from reading either file alone. **Check the
rendered HTML.**

```bash
pnpm build && pnpm start
```

**Canonical must equal the page's own URL on every route:**

```bash
curl -s http://localhost:3000/services | grep -o '<link rel="canonical"[^>]*>'
```

**Brand must appear exactly once in the title:**

```bash
curl -s http://localhost:3000/services | grep -o '<title>[^<]*</title>'
```

**Schema must parse from raw HTML** (proves it's server-rendered):

```bash
curl -s http://localhost:3000/ | python3 -c "
import sys,re,json
for b in re.findall(r'<script type=\"application/ld\+json\"[^>]*>(.*?)</script>', sys.stdin.read(), re.S):
    print(json.loads(b).get('@type'))"
```

**Every sitemap URL must return 200, and unlisted slugs must 404.**

The full verification matrix run against these changes is recorded in
[`seo-audit-2026-08.md` → Verification performed](seo-audit-2026-08.md#verification-performed).

---

## Adding things

**A new page:** set a bare keyword-first title, a unique description, its own
canonical, and a `BreadcrumbList` in its `layout.tsx`. Add it to `sitemap.ts`.

**A new location page:** add an entry to `src/data/locations.ts` with genuinely
new `intro` / `whyLocal` / `marketContext` copy, wire `relatedSlugs` both ways,
and re-check the similarity numbers. Sitemap and static params update themselves.

**A new blog post:** drop the markdown in `src/content/blog/`. Canonical,
`BlogPosting` schema, breadcrumbs, and the sitemap entry are all automatic. Set
`image` in the frontmatter to a `.webp` path.

**A new service:** add it to `src/data/services.ts`. It propagates to the
homepage, the services page, the chatbot prompt, `serviceType`, and `OfferCatalog`
without further edits.

**Business details change:** edit `src/data/business.ts` only. Then update every
external directory listing to match character-for-character — inconsistent NAP
across citations actively suppresses local ranking.
