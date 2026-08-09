# SEO & Performance Scorecard

The running record of what external tools say about this site, what we changed
in response, and — just as important — **which of their findings were wrong.**

This is the tracking document. Add a dated row to every table each time a check
is run. Do not overwrite history; the trend is the point.

Companion documents:
- [`seo-architecture.md`](seo-architecture.md) — the rules that keep search-facing code correct
- [`../.claude/TODO.md`](../.claude/TODO.md) — what is still open
- [`../.claude/updates.md`](../.claude/updates.md) — chronological log of shipped work

> **Read this before acting on any external audit.** Four of the tools below
> have produced confident false positives on this site. The
> [False positives](#false-positives-do-not-fix-these) section exists so nobody
> "fixes" a non-problem twice.

---

## Current state — 2026-08-09

| Tool | Result | Notes |
|------|--------|-------|
| PageSpeed Insights — mobile | **92** perf · **100** a11y · **100** BP · **100** SEO | LCP 3.1s is the one metric still outside "Good" |
| PageSpeed Insights — desktop | **100 · 100 · 100 · 100** | LCP 0.6s |
| validator.schema.org | **0 errors · 0 warnings** | 2 items (LocalBusiness nests inside WebSite) |
| AIOSEO Analyzer | **90 / 100** "Excellent" | 3 "critical" issues, all verified false positives |
| Siteliner | **9%** duplicate content | vs 16% median — better than 79% of sites |
| axe-core (WCAG 2.0/2.1 A+AA) | **0 violations** | run against the live homepage |
| Link crawl | **0 broken** of 43 | 30 internal + 13 external, all 200 |
| Chrome UX Report (field) | **No Data** | not enough traffic yet — see below |

**CrUX showing "No Data" is the single most important line in this table.**
Core Web Vitals only become a ranking input once Google has real-user field
data. Everything above is *lab* data. Nothing here is being held against the
site today — which means the work was done before it could cost anything, and
it also means these lab numbers should not be mistaken for ranking impact.

---

## Core Web Vitals history

PageSpeed Insights, run against production. Lab data, simulated throttling.

| Date | Profile | Perf | LCP | FCP | TBT | CLS | What changed |
|------|---------|------|-----|-----|-----|-----|--------------|
| 2026-08-09 am | mobile | 69 | 5.4s | 3.5s | 110ms | 0 | baseline after the image + heading work |
| 2026-08-09 pm | mobile | **92** | **3.1s** | **1.7s** | **0ms** | 0 | hero LCP animation, inline CSS, GA deferred |
| 2026-08-09 am | desktop | 98 | 1.2s | 0.4s | 30ms | 0 | baseline |
| 2026-08-09 pm | desktop | **100** | **0.6s** | **0.4s** | **10ms** | 0 | same change set |

### Accessibility history

| Date | PSI a11y | axe violations | What changed |
|------|----------|----------------|--------------|
| 2026-08-09 am | 89 | 3 | baseline |
| 2026-08-09 pm | **100** | **0** | contrast ×2, `<dl>` structure |

### Structured data history

| Date | Errors | Warnings | What changed |
|------|--------|----------|--------------|
| 2026-08-09 am | 0 | 9 | `serviceType` on `LocalBusiness` |
| 2026-08-09 pm | **0** | **0** | removed it; `hasOfferCatalog` is the sole declaration |

### Content quality (Siteliner)

| Date | Duplicate | Common | Unique | Words/page | Page size | Load |
|------|-----------|--------|--------|-----------|-----------|------|
| 2026-08-09 | 9% | 38% | 53% | 956 | 172Kb | 653ms |

Duplicate content is the metric that matters most here: twelve near-sibling
location pages are exactly where cloned doorway pages would surface. 9% against
a 16% median is direct evidence the location copy is genuinely distinct.

Common content 38% (median 28%) is the shared nav and footer — the footer alone
carries all twelve location links. That is structural boilerplate and the price
of the internal linking that gives every page 22 inbound links. Not a defect.

---

## False positives — do not "fix" these

Every one of these was reported as a real problem by a real tool, and every one
was verified wrong. If a future audit raises them again, re-read this section
before writing code.

| Claim | Tool | Reality |
|-------|------|---------|
| "No structured data on any page" | markdown-based AI auditor | Comprehensive JSON-LD on every page. The tool converts pages to markdown, which strips `<script type="application/ld+json">` entirely. **Any auditor that reads rendered markdown will always report this.** |
| "Multiple H1 tags on Contact and Blog" | same | Exactly one `<h1>` per page, everywhere. The parser read the two `<span class="block">` visual lines of one heading as separate headings. |
| "`<html lang>` not set" | same | `lang="en"` is set on `<html>`. |
| "Add BreadcrumbList schema" | same | Already present on every inner page. |
| "6 images have no alt attribute" | AIOSEO | Those are the six client logos in the marquee's **duplicate track**, deliberately `alt=""` **and** `aria-hidden` so screen readers do not announce client names twice. AIOSEO treats `alt=""` as missing. **Adding alt text here would make accessibility worse.** axe reports 0 violations. |
| "Some JavaScript files are not minified" | AIOSEO | The flagged chunk is 223KB across **zero newlines** with single-character identifiers. Fully minified; the heuristic cannot tell. |
| "28 requests — more than 20 slows loading" | AIOSEO | HTTP/1.1-era advice about connection limits. The site negotiates **HTTP/2**, which multiplexes. 24 `<img>` elements resolve to 17 unique URLs. |
| "LocalBusiness not detected" (2 items only) | validator.schema.org | It **is** detected. The validator resolves `publisher: { "@id": ".../#business" }` and renders the whole business node nested inside `WebSite`. The `@id` graph is working as designed. |

### And two traps in our own measurement

| Trap | What happened |
|------|---------------|
| **Measuring a dev server** | `pnpm start` failed silently with `EADDRINUSE` because a `next dev` server held port 3000. Two Lighthouse runs profiled an unminified dev build with a 219KB devtools chunk and reported mobile 70 / LCP 8.8s. **Any PSI or Lighthouse run pointed at a `next dev` server is meaningless.** Always confirm the port is a real `next start`. |
| **Stale image optimizer cache** | Replacing an image at an unchanged path is invisible to `.next/cache/images`, which keys on request URL, not file contents. Screenshots "confirmed" nine images that were not on disk. `rm -rf .next/cache/images` before verifying image work. Documented as item 7 in `CLAUDE.md`. |

---

## How to re-run each check

```bash
# --- Lab performance + a11y + SEO (must be a PRODUCTION server) ---
pnpm build
pnpm exec next start -p 3210          # NOT `pnpm start` if :3000 may be taken
npx lighthouse http://localhost:3210/ --only-categories=performance \
  --throttling-method=devtools --chrome-flags="--headless=new"
```

Two throttling models disagree and both are worth knowing:

- **`--throttling-method=simulate`** (the default, and what PageSpeed Insights
  uses) models the network graph. It is pessimistic on localhost — it reported
  LCP 6.5s where real throttling measured 2.9s. **This is the number Google
  shows**, so it is the one to optimise against.
- **`--throttling-method=devtools`** applies real throttling. Closer to what a
  user experiences, useful for A/B testing a change quickly.

Report both if they disagree, and say which is which.

```bash
# --- Structured data ---
open "https://validator.schema.org/#url=https%3A%2F%2Fgrowthmasala.com%2F"

# --- Broken links, internal + external (more reliable than Siteliner's
#     tables, which need a logged-in session to render) ---
#     see the crawl snippet in .claude/updates.md 2026-08-09

# --- Accessibility, precise node-level findings ---
#     inject axe-core into a Playwright page and run
#     axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}})
```

**Verify against rendered HTML, never source.** Next.js merges parent and child
metadata in ways neither file shows:

```bash
curl -s https://growthmasala.com/services | grep -oE '<title>[^<]*</title>|<link rel="canonical"[^>]*>'
```

**Tools that cannot be automated:** the AIOSEO analyzer is captcha-gated and
fails from both headless and real Chrome. Run it by hand and export the PDF.

---

## Invariants that must never regress

Each of these has already broken once, or was found broken by an audit. Re-check
them after any change to metadata, schema, headings, or the footer.

| Invariant | Check |
|-----------|-------|
| No canonical in the root layout | `grep canonical src/app/layout.tsx` → comment only |
| Every route self-canonical | curl the rendered HTML, per route |
| Exactly one `<h1>` per page | count `<h1` in rendered HTML |
| Brand appears once per title, ≤60 chars | rendered `<title>` |
| Meta descriptions ≤160 chars | rendered `<meta name="description">` |
| Two-tone headings keep a real word break | `{" "}` between block spans — see Rule 6 |
| No `opacity: 0` reveal above the fold | see Rule 7 |
| FAQ schema matches visible FAQ text | `FAQSection` stays a server component |
| NAP matches `business.ts` everywhere | and every external listing |
| All sitemap URLs return 200 and are `index, follow` | crawl |

---

## Known limits of this scorecard

- **All of it is lab data.** Field data (CrUX) is empty. Real Core Web Vitals,
  and therefore any ranking effect, will not exist until traffic accumulates.
- **Rankings are not tracked here.** No keyword position data has been collected
  yet; there is nothing to report and guessing would be worse than silence.
- **Search Console state is unverified.** Whether the sitemap is submitted and
  error-free can only be seen in the console itself.
