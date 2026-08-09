# Growth Masala — Shipped Work Log

Chronological record of what has actually shipped, newest first. One entry per
release, with the commit and — where a change was driven by a measurement — the
before/after.

This file is **history**. It is not a task list (see [`TODO.md`](TODO.md)) and
not a scorecard (see [`docs/seo-scorecard.md`](../docs/seo-scorecard.md)).

> Documentation describes the past; code describes the present. Before quoting
> anything here as current state, grep the source.

---

## 2026-08-09 — Images, headings, accessibility, performance, schema

Six commits, all live on production and verified there.

### `a38351d` · Nine section images, generated to a brief

Every image slot emptied by `f8f3b68` refilled at the same paths and sizes, so
no component or layout changed to accept them.

The brief came from the one photograph that survived — `hero-team.webp` — which
sets the house style: real Indian subjects in a real small-city business,
near-black navy environment, brand blue arriving as screen glow rather than a
filter, one small amber practical, and a legible interface composited into the
frame. Each image was written to that spec and to one sentence it must say
without a caption.

Generated with GPT Image via the Codex CLI, cropped per slot rather than
uniformly: `consultation` keeps its left third near-empty because
`ProcessSection` runs a left-to-right navy scrim across it; `services/ai` is
cropped high so the card's short 2:1 window keeps the shutter and streetlight.
WebP, all under 120KB.

**The map is not generated.** It renders under a visible "Map data ©
OpenStreetMap contributors" credit and calls itself a street map of a real town,
so an invented one would have made that attribution a lie. It is a real z14 OSM
tile export centred on Mahabubnagar.

Four alt texts corrected in the same pass: two named Mahabubnagar for staged
photographs, one called a stock photo "A Growth Masala consultation", and
`LocationWhyLocal` interpolated `page.city` so one shared photograph claimed
twelve different towns.

### `12a011f` · Hero alt stops claiming the team

The alt opened "Two Growth Masala team members…" on a staged photograph. Now
describes the laptop screen instead — which genuinely is ours — so every keyword
survives verbatim and only the claim about who is holding it is gone.

### `5e237ce` · The missing word break in every two-tone heading

The site's headline treatment is one heading split across two visual lines with
`<span className="block">`. `display: block` breaks the line **in CSS, not in
the DOM** — so the heading's text content had no separator:

```
"Digital marketing servicesin Mahabubnagar."
"Someone nearby is searchingfor what you sell"
```

**27 headings across 8 pages**, compounded by every location page sharing the
components. On `/services` it mangled the exact phrase the page exists to rank
for. Fixed with one `{" "}` per seam — 21 files inline plus `SectionIntro` once,
which covers every section heading site-wide. Screenshots pixel-identical.

Found by an external audit, which reported it as 2 H1s; the real scope was 27.

Also: service card `alt=""` replaced with a required `imageAlt` on
`ServiceGroup` (the type had justified the empty alt as "abstract group
artwork", which my own image replacement had made stale), and four meta
descriptions trimmed from 187/216/212/181 to 141–155.

### `9f6528e` · Three WCAG AA failures → accessibility 100

PSI scored accessibility 89. axe-core pinned all three to exact nodes:

1. **Footer wordmark** — "Masala" was `text-primary` on navy at **3.63:1**
   against a 4.5:1 floor. Moved to `text-secondary`, same brand family, 5.2:1.
   `SectionIntro` already documented this exact trap; it had never been applied
   to the logo.
2. **Service card numerals** — `text-slate-400` on white at **2.63:1**. They
   carry `aria-hidden`, which was presumably the reasoning — but that removes an
   element from the accessibility tree, not from the screen.
3. **The `<dl>`** — "Reach us directly" had `<dt>`/`<dd>` one wrapper too deep,
   so screen readers were not treating phone, email, studio and hours as a
   labelled list at all. Rebuilt as a grid; rendering identical.

**axe: 3 violations → 0.**

### `eca5733` · Mobile performance 69 → 92

The trace gave it away: **Speed Index 2.1s against LCP 6.3s.** The page was
visually finished in two seconds and then spent four more waiting to be
*counted*. Four self-inflicted causes:

1. **The hero animated its own LCP element.** `hero-reveal` starts at
   `opacity: 0` and Chrome does not count an invisible element as painted —
   1061ms of "element render delay" against a 36ms TTFB. Added a transform-only
   variant. **Fixing the h1 alone was not enough:** LCP tracks whichever element
   is *largest*, so freeing the h1 promoted the subheading (600ms delay of its
   own) to LCP. Every large hero element now uses it.
2. **Render-blocking CSS** — one 16.8KB stylesheet between document and first
   pixel. `experimental.inlineCss`.
3. **GA on `afterInteractive`** — 165KB with ~70KB unused, executing the moment
   hydration finished. Moved to `lazyOnload`. Accepted trade-off: a visitor who
   leaves within ~1s may go uncounted.
4. **A non-composited animation** — the amber headline rule faded via
   `text-decoration-color`, which no browser can composite. Drawn statically now.

| | before | after |
|---|---|---|
| PSI mobile | 69 | **92** |
| LCP | 5.4s | **3.1s** |
| FCP | 3.5s | **1.7s** |
| TBT | 110ms | **0ms** |
| PSI desktop | 98 | **100** |

### `7ce9976` · Schema warnings 9 → 0

`serviceType` is a property of `Service`, not `LocalBusiness`. It produced nine
warnings — one per service — and was pure duplication: every title was already
published in `hasOfferCatalog` on `Service` nodes where the property is valid.
Removed the invalid copy.

**validator.schema.org: 0 errors, 0 warnings.**

### Also on this date, not code

- Reviewed five external tools; see [`docs/seo-scorecard.md`](../docs/seo-scorecard.md)
  for scores and, importantly, the eight verified **false positives** they produced
- Crawled all links: 30 internal + 13 external, **0 broken**
- Added item 7 to `CLAUDE.md` — the Next.js image optimizer cache trap that made
  a verification pass silently confirm nine images that were not on disk

---

## 2026-08-07 → 2026-08-08 — Canvas redesign

`73ba142` `1cd52e2` `32b71f8` `f320c1d` `8ab9c12` `e994580` `e4d53e8` `96f7e3a`
`1df0c1a` `13d54d7`

Full rebuild of every route to the approved canvas design: services, portfolio,
case studies, about, contact, blog, location pages and all homepage sections.
Hero rebuilt around the duo plate with a bleed layout and fixed-quote CTAs.
Section dividers dropped, Why-us halved, FAQ rebuilt in two columns. Masala Bot
given a face and brought up to the site's finish. Each `/services` entry expanded
to show what is actually included.

`e4d53e8` also restored social cards on ~20 pages: `openGraph` is **not**
deep-merged in the App Router, so eight routes declaring their own had silently
dropped the image. `pageOpenGraph()` in `src/lib/metadata.ts` now makes that
impossible.

---

## 2026-08-06 — SEO remediation

Full detail and the competitor teardown: [`docs/seo-audit-2026-08.md`](../docs/seo-audit-2026-08.md)

- **Site-wide canonical bug** — `alternates.canonical` in the root layout is
  inherited by every child route in the App Router, so every page declared itself
  a duplicate of the homepage. This had taken the entire site out of Google's
  index. Removed; every route now sets its own.
- **Titles** — brand was double-printed and no title carried a location keyword
- **NAP everywhere** — contact page said "Location: India"; `business.ts` became
  the single source of truth
- **Location keywords in visible copy** — "Mahabubnagar" appeared 0 times
- **12 location landing pages** with genuinely unique copy
- **Schema expansion** — `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`,
  `OfferCatalog`, `BlogPosting`
- **FAQ sections** — server-rendered `<details>` so schema matches visible content
- **Images** — 5.2MB → 788KB WebP
- **Sitemap** — location and blog URLs derived automatically

---

## 2026-03 → 2026-08 — Initial build

Next.js 14 App Router, Tailwind v4 (CSS-first, no config file), CSS keyframes +
IntersectionObserver in place of Framer Motion, Lucide icons, Poppins/Inter via
`next/font`.

Delivered across five phases: foundation and design system; inner pages
(services, portfolio, case studies, about, contact); markdown blog with
`gray-matter`; the Claude-powered chat widget with rate limiting and error
handling; then polish, responsive passes and the Vercel deploy.

Two incidents from this period are recorded permanently in `CLAUDE.md` because
both survived months of review:

- **Every heading and all body copy rendered in the OS default font.** `@theme`
  aliased `--font-heading` to a variable `next/font` defined on `<body>`, so at
  `:root` it referenced an undefined variable — guaranteed-invalid, inherited
  everywhere. Font variables now go on `<html>`.
- **Triple `<h1>`** in the hero, one per visual line.
