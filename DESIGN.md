# DESIGN.md — Growth Masala

Documents the system as it is implemented. Tokens live in
[`src/app/globals.css`](src/app/globals.css) under `@theme inline`; that file is the
source of truth, this one explains the intent.

## Color

**Strategy: Committed.** Navy carries roughly half the page surface. Amber is not a
sprinkle, it is a structural material used in filled slabs. Blue is reserved for
things you can click. Locked in `public/brand-assets/brand-guidelines.svg`.

| Token | Value | Role |
|---|---|---|
| `--color-navy` | `#0B1121` | The room. Hero, process, CTA, footer. |
| `--color-navy-light` | `#111B33` | Raised surfaces inside navy. |
| `--color-primary` | `#2563EB` | Action. Links, buttons, active nav. |
| `--color-secondary` | `#3B82F6` | Hover state of primary. |
| `--color-sky` | `#38BDF8` | Icon/gradient blue from the logo mark. |
| `--color-accent` | `#F59E0B` | Amber. Emphasis and filled slabs. |
| `--color-surface` | `#F8FAFC` | The light room. |
| `--color-text-primary` | `#0F172A` | Body on light. |
| `--color-text-secondary` | `#475569` | Secondary on light; also the recessive half of two-tone headings at 45% |

**Contrast rule that has already bitten:** `--color-primary` on `--color-navy` is
about 2.9:1. It fails for text. Blue text never sits directly on navy — on navy use
white, `slate-300`, or amber. This is why the hero headline's gradient span was
removed.

## Typography

Poppins (headings, 600/700) and Inter (body, 400/500), loaded via `next/font`.
Shipped brand identity: **do not substitute.** The reflex-reject lists do not apply
to a family the brand already owns.

- Headings: `font-heading`, tight tracking, `leading-[1.05]`–`leading-[1.1]` at
  display sizes, `text-balance` on anything that wraps.
- **Two-tone heading pattern** — the section-title grammar of the whole site. First
  clause at full `text-text-primary`, remainder at `text-text-secondary/45`. The
  emphasis lands on the claim and the qualifier recedes. On navy the recessive half
  is `text-slate-500`.
- Exactly one `<h1>` per page. Multi-line display headlines use a single `<h1>` with
  `<span className="block">` per visual line.
- Body caps at ~65–75ch.

## Section rhythm

Backgrounds alternate so an eleven-section scroll has landmarks:

```
Hero      TrustBar   Problem   Services   Process   Portfolio   Why-us   Pricing   FAQ     CTA
navy      navy       light     white      navy      white       NAVY     white     light   white
```

Why-us is the capitalised one. It was light until Portfolio, Why-us and Pricing
formed three consecutive pale sections in the back half of the page — the stretch
where a reader is most likely to leave.

**The homepage `<h1>` does not name the city.** `/digital-marketing-agency-mahabubnagar`
and `/website-development-mahabubnagar` carry exact-match H1s for those queries;
repeating the city here competes with the pages built to win it. The `<title>` still
carries it, and above the fold it survives in the photo badge, the subheading and the
promise strip. See `.agents/product-marketing.md` → positioning constraint.

**The hero holds one viewport** (`min-h-svh`, measured at exactly 900px on a 1440×900
desktop). That is a height budget, spent mostly by the headline and the portrait. It
is not achievable on a 390×844 phone without deleting either the photograph or the
capability panel, so mobile runs about 1.4 viewports by design.

**Separator system.** The alternation carries every navy boundary by itself. It does
nothing for light-on-light: `#F8FAFC` meeting `#FFFFFF` is invisible, so those seams
read as one continuous field with unexplained gaps in it.

- `<SectionDivider />` — the marker between two light sections. A hairline
  (`.edge-rule`, fading out at both ends) interrupted by a small amber diamond, or
  by a label. Used at exactly three seams: Problem → Services, Why-us → Pricing,
  Pricing → FAQ. A divider at every boundary becomes page furniture.
- Alternating `bg-white` / `bg-surface` plus `.dot-pattern` gives texture contrast
  where a rule would be too loud.

**Do not gradient a light section into a navy one.** Interpolating `#FFFFFF` to
`#0B1121` passes through mid-grey, and the result renders as a dirty grey smear
across the full width — more conspicuous than the hard edge it was meant to soften.
Both a `.seam-to-light` and a `.seam-to-navy` utility were written, shipped, looked
at, and deleted. Where a navy section needs to meet a lighter one, fade it to *its
own* colour first (the hero fades its ambient bloom down to flat navy at its foot so
the strip below does not step) and let the background change be a clean cut.

## Imagery

Photography is generated (Codex CLI) and shipped as WebP under ~70KB. It must look
like Telangana: real shopfronts, real counters, real light. Never Bay Area
co-working stock. Alt text carries the argument, not the file name.

- **Borderless blending (`.photo-blend`).** A rounded card with a 1px border around
  a photograph reads as a stock image dropped into a template no matter how good the
  photograph is. An elliptical `mask-image` fades every edge to transparent instead,
  so no cut-out alpha is needed — but the shot has to have been taken against a
  near-black backdrop for the mask to land invisibly on navy. Brief the photo and
  the mask together or neither works.
- **Stadium capsules.** `rounded-full` on a non-square box clamps to 50% of *both*
  axes and yields an ellipse: curved everywhere, straight nowhere. A stadium needs an
  explicit radius slightly under half the element's width, set per breakpoint.
- **Bleeding off the edge.** A photo anchored to the viewport edge with a panel
  overlapping its corner is a composition; the same two elements side by side is a
  two-column layout. Use `lg:absolute` for the bleed and drop back into flow below
  `lg`, where a half-width absolute image leaves the text nowhere to go.

## The closing CTA

Two overlapping discs above a filled amber slab, with a cut-out figure standing
in front of the seam. It replaced a centred navy panel that said the same thing
with no evidence attached.

- **The map is the point.** A view of Mahabubnagar beside the ask is the one
  claim a metro competitor cannot copy, and it costs no copy to make.
- **No marker, until the address is real.** `business.ts` carries a road-level
  placeholder. A pin turns that placeholder into a specific claim about
  premises. Land the marker in the same commit as the real address.
- **It is a static WebP, not an embed.** The OpenStreetMap iframe it started as
  pulled **1.9MB** of Leaflet and tiles for a section nobody interacts with, and
  swallowed vertical swipes on touch. The capture is 44KB and identical to look
  at. OSM's licence still wants the credit line at the foot of the slab.
- **The figure is the only cut-out on the site.** Everything else is masked
  (`.photo-blend`) or cropped; she has a real alpha channel because there is no
  single colour behind her to dissolve into. Desktop only — stacked on a phone
  there is nowhere for her to stand. The slab's grid keeps an empty middle
  column at `lg` for exactly that reason.
- **The button stays blue.** The reference uses an amber CTA. Here amber is the
  object and blue is the thing you click; an amber button would be the only one
  in the codebase.

## Progressive disclosure

Panels that open transition `grid-template-rows: 0fr → 1fr`, never `height` — height
cannot animate to `auto`, and the workarounds either clip at some viewport or drag a
layout read into the hover path. The child needs `min-height: 0` and
`overflow: hidden` or it refuses to collapse.

Two rules that are easy to forget:

- **`@media (hover: none)` must open everything.** A picture that only appears on
  hover is a picture that never appears on a phone, which is this audience's primary
  device.
- **Grid siblings stretch by default.** Opening one card pushes the whole row to its
  new height and leaves the others with a column of dead space inside them.
  `items-start` lets exactly one card grow, at the cost of a ragged row.

**The service cards no longer disclose anything, and that is the point.** Their
artwork used to open on hover by this exact mechanism; it grew the card it lived in,
so one card in the row stood taller than the rest, and touch needed a media query to
force it open anyway. The band is now permanent, fixed-height, and bleeding to the
card's own edges — the row never reflows, every card is the same height, and hover
pays out in saturation and a 1.06 scale, both compositor-only. Disclosure earns its
place when the hidden content is genuinely secondary. A photograph carrying the
locality claim is not.

**Three service groups on the homepage, not four.** Custom Software carries
`homepageHidden` in `services.ts`; at four columns each card was 286px, too narrow
for a photograph and a list. Three run 389px. The group is still sold in full on
/services and still quoted by the chatbot, both of which read `serviceGroups`
directly — only the homepage reads the filtered `homepageServiceGroups`.

## Elevation and shape

Radii: 6px buttons, 8–12px cards, 16px (`rounded-2xl`) large panels, `rounded-full`
for pills and CTAs. Shadows are used sparingly and always coloured toward the brand
hue rather than neutral black: `0 12px 32px -8px rgba(37,99,235,0.22)`.

## Motion

CSS keyframes only. Framer Motion was removed for bundle weight; reveals run through
`AnimatedContainer` + an IntersectionObserver hook (`src/lib/useInView.ts`), with a
`reveal-pending` class and a `<noscript>` override so the page is never blank without
JS.

- Entrance: `fade-in-up` 0.7s `cubic-bezier(0.25,0.4,0.25,1)`. Stagger siblings by
  100–120ms.
- Hover: `.hover-lift` translates only, never scales — scaling a card that contains
  text resamples glyphs and reads as blur. `.hover-zoom` scales the image inside
  instead.
- `.cta-arrow` nudges 4px on group hover. `.link-sweep` draws an underline from the
  left.
- Blur and ambient drift are desktop-only (`min-width: 768px`); mid-range Android
  GPUs cannot run blur plus animation together.
- Every animation class has a `prefers-reduced-motion` override that disables it.

## Bans specific to this codebase

- **No gradient text.** `.text-gradient` is legacy — the blue-to-amber ramp lands
  muddy mid-word — and survives only because non-homepage routes still use it. A
  cool blue-into-sky variant existed and was deleted; it failed contrast on navy.
  Emphasis comes from weight, size, and a solid amber word.
- **No coloured side-stripe borders** (`border-l-2 border-accent` on a callout).
  Use a filled tint, a leading mark, or a full hairline box.
- **No fabricated metrics.** No invented dashboards, counters, or growth charts.
- **No nested cards.**
- **No canonical in the root layout.** See `docs/seo-architecture.md`.
