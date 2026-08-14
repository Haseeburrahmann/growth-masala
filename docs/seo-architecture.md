# SEO Architecture

How search-facing concerns are wired in this codebase, and the rules that keep
them correct. Read this before touching metadata, schema, the footer, or the
location pages.

Companion documents:
- [`seo-scorecard.md`](seo-scorecard.md) — **what the tools currently say, the trend, and the false positives not to re-fix**
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
| Sitemap | `src/app/sitemap.ts` | Derives location, blog and legal URLs automatically. |
| Crawler directives | `public/robots.txt` | Explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot…). |
| Legal documents | `src/content/legal/*.md` + `src/lib/legal.ts` | Markdown. NAP is interpolated from `business.ts` — see Rule 9. |

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

### Titles must be unique across routes

Two pages carrying the same title compete for the same query and split the
ranking signal. This bit us once: the homepage and
`/digital-marketing-agency-mahabubnagar` both shipped as *"Digital Marketing
Agency in Mahabubnagar | Growth Masala"* with near-identical descriptions.

**The rule:** an exact-match keyword phrase belongs to exactly one page — the
dedicated landing page, which has the FAQ schema, `Service` schema, and internal
links to support it. The homepage takes a broader, service-led angle.

Check after any title change:

```bash
for p in "" services portfolio case-studies about blog contact \
         digital-marketing-agency-mahabubnagar website-development-mahabubnagar; do
  curl -s "https://growthmasala.com/$p" | grep -o '<title>[^<]*</title>'
done | sort | uniq -d
```

Any output means a duplicate. Expect none.

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

**Replacing an image at an existing path is invisible to Next's optimizer
cache**, which keys on request URL rather than file contents. Clear it before
verifying, or you are grading the previous version:

```bash
rm -rf .next/cache/images
```

This is a local trap only — Vercel builds fresh — which is exactly what makes it
dangerous: it lies only to the person checking the work. Full account: `CLAUDE.md`
item 7.

**Alt text is a factual claim.** Do not name a real place or a real person for a
staged photograph. Five alts on this site asserted things their images could not
support — two named Mahabubnagar, one called stock photography "A Growth Masala
consultation", one called a staged photo the team, and `LocationWhyLocal`
interpolated `page.city` so one shared image claimed twelve different towns.
Decorative images take `alt=""` **and** `aria-hidden` (the marquee's duplicate
logo track is the correct pattern); informative ones get a real description.

---

## Rule 6 — Two-tone headings need a real word break

The house headline treatment is one heading split across two visual lines:

```tsx
<h1>
  <span className="block">Digital marketing services</span>{" "}
  <span className="block text-slate-400">in {address.locality}.</span>
</h1>
```

**The `{" "}` is load-bearing.** `display: block` breaks the line in CSS, not in
the DOM. Without an explicit space the heading's *text content* concatenates —
`"Digital marketing servicesin Mahabubnagar."` — which is what a screen reader
announces, what Google extracts, and what every AI crawler reads. It renders
identically either way, so this is invisible in review and in screenshots.

This shipped broken across **27 headings on 8 pages**, and on `/services` it
mangled the exact phrase the page exists to rank for. Both spans are `block`, so
the space collapses to nothing visually.

`SectionIntro` handles this once for every section heading. Only hand-written
heroes and CTAs need it inline.

---

## Rule 7 — Nothing above the fold animates opacity from zero

Chrome does not count an element at `opacity: 0` as painted, so an entrance
animation on above-the-fold content postpones Largest Contentful Paint by its
delay plus most of its duration. The hero was costing itself **1061ms of element
render delay against a 36ms TTFB** — the page had arrived and was waiting on a
fade.

The trap: **LCP tracks whichever element is largest.** Fixing the `<h1>` alone
did nothing to the metric — it promoted the subheading, which had a 600ms delay
of its own, to LCP. Every large hero element has to be fixed together.

```css
/* Above the fold: transform only. Painted from the first frame. */
@keyframes hero-reveal-text {
  from { transform: translateY(28px); }
  to   { transform: translateY(0); }
}
```

Small elements (badges, promise strips) may still fade — they can never be the
largest paint. Below the fold, `AnimatedContainer` is unaffected.

Related: prefer compositable properties. The amber headline rule animated
`text-decoration-color`, which no browser can composite, so it ran on the main
thread every frame and was the one animation Lighthouse flagged. It is drawn
statically now.

---

## Rule 8 — `serviceType` belongs to `Service`, not to the business

`serviceType` is not a property of `LocalBusiness` or `ProfessionalService`.
Emitting it on the business node produced nine validator warnings, one per
service, and duplicated what `hasOfferCatalog` already declares properly.

**`hasOfferCatalog` is the single place services are declared in JSON-LD.** Each
entry is an `Offer` wrapping a `Service`, and `serviceType` is valid *there*.

---

## Rule 9 — Legal pages interpolate NAP, they never retype it

`/privacy`, `/terms` and `/data-deletion` are markdown in `src/content/legal/`,
rendered through the blog's `PostBody` and loaded by `src/lib/legal.ts`.

Markdown cannot import `business.ts`, so without help these three would be the
one surface allowed to keep private copies of the email address and phone
number — on the pages where a regulator, an opted-out lead and Meta's app
review are all told where to write. `lib/legal.ts` therefore resolves
`{{email}}`, `{{phoneDisplay}}`, `{{phone}}`, `{{addressLine}}`, `{{locality}}`,
`{{region}}`, `{{name}}` and `{{site}}` at read time, the same way
`lib/blog.ts` resolves `{{price:…}}`.

An unknown token is left in place verbatim rather than blanked. A stray
`{{emial}}` in rendered output is obvious in review; an empty space where the
contact address belongs is not.

**Frontmatter values must be quoted.** `updated: 2026-08-13` unquoted is parsed
by YAML as a *timestamp*, so gray-matter returns a `Date` and the
`as string` cast used throughout this repo compiles and then throws
`e.split is not a function` — during sitemap prerender, several files from the
edit that caused it. `toIsoDate()` in `lib/legal.ts` now absorbs both shapes,
but quote them anyway; every blog post already does.

### These pages are indexed on purpose

Priority 0.3, `changefreq: yearly`. A published privacy policy and terms are a
trust signal for a local business and the pages a cautious buyer checks before
enquiring, and Meta fetches `/privacy` and `/data-deletion` during app review.
Low priority keeps them from competing with a service or location page; it is
not an instruction to hide them.

`lastmod` comes from the `updated` frontmatter, not from git. The sitemap date,
the date rendered in the hero, and `dateModified` on the `WebPage` node all read
that one field, so a revision cannot update two of the three and leave the
sitemap claiming the terms changed on a day they did not.

### `/data-deletion` is a fixed URL

That slug is typed into the Meta Developer console as the app's **Data Deletion
Instructions URL**, and Meta will not let an app be published without it.
Renaming the route silently breaks a setting nothing in this repo can see.

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

**A new legal document:** add the markdown to `src/content/legal/` with quoted
frontmatter, add the slug to `LegalSlug` in `src/types/index.ts`, add an entry
to `legalLinks` in `src/data/navigation.ts`, and create the route's
`layout.tsx` / `page.tsx` from `/privacy`'s. The footer link and the sitemap
entry both follow `legalLinks`, so neither needs touching. `getLegalDoc()`
throws on a missing file, which makes a mismatch a failed build rather than a
404 discovered by Meta.

**A new service:** add it to `src/data/services.ts`. It propagates to the
homepage, the services page, the chatbot prompt and the `OfferCatalog` JSON-LD
without further edits. A new service *group* additionally requires `imageAlt` —
the type enforces it, because those photographs are informative rather than
decorative (Rule 5).

**Business details change:** edit `src/data/business.ts` only. Then update every
external directory listing to match character-for-character — inconsistent NAP
across citations actively suppresses local ranking.
