# Pricing discovery implementation plan

> Execute inline using executing-plans. Existing website/deployment authorization applies.

**Goal:** Help people already seeing our website-cost guide choose and use it, and connect relevant pricing readers to city services.
**Architecture:** Reuse the existing tested calculator in the blog template. Change only two articles, the template's pricing navigation and homepage pricing links. Preserve URLs, prices and schema sources.
**Tech Stack:** Next.js, React, TypeScript, Markdown.
**Spec:** Authenticated Oct16 GSC evidence: Sep16–Oct13 guide has 1 click /177 impressions, position12.6; website costs selects this guide, 0/19 position9.7. Target Oct6–14 remains4/87. No assertion that new changes caused improvement.

## Constraints and review focus
- No artificial traffic, unsupported price promises, location claims or changes to existing URLs.
- Calculator unknown costs stay blank; existing arithmetic and assumptions remain unchanged.
- New jump links must work on mobile and desktop, not just desktop rail.
- Unrelated posts must not receive pricing tools; date labels must describe actual updates.
- Metadata and schema remain unique, canonical and truthful; latest modified dates only for substantively updated articles.

## Tasks
- [x] Improve the local guide's title/description to describe its calculator; add early jump links to calculator and downloadable worksheet for both calculator articles.
- [x] Embed existing calculator in national five-page guide, update explanatory link, add scoped quotation example and relevant Bengaluru service link. Improve homepage pricing links to these tools and Hyderabad guide.
- [x] Run lint, build, existing calculator/WhatsApp tests, rendered HTML checks and browser interaction at mobile width. Review diff, push authorized release only if remote is still the expected base, verify live and record evidence.

## Ledger
Ruling: Use existing clean codex/seo-demand-oct12 worktree, leaving dirty primary checkout untouched.
Ruling: Reuse existing calculator logic without feature changes; existing tests plus rendered/browser checks cover this reversible content/navigation change. No implementation-mirroring tests.

Verification completed locally. Deployment and live evidence are recorded separately in the primary outputs directory.
