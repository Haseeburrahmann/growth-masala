# October search-growth sprint implementation plan

> For agentic workers: use executing-plans for parent implementation and the dispatched bounded tasks. The user explicitly authorized research, planning, website changes and deployment in this turn; do not introduce another approval gate.

**Goal:** Pursue 50 Google organic clicks during October 6–20, 2026, while improving qualified WhatsApp enquiries. Outcome remains unachieved until Search Console evidence confirms it.

**Architecture:** Preserve the current Next.js design and data-driven location pages. Add distinct missing service pages with explicit scope and proof; publish two factual project articles using the existing blog renderer. Keep WhatsApp handoff separate from delivered-lead tracking. Preserve workbook history and create one dated goal sheet.

**Tech stack:** Next.js 16, React 19, TypeScript, Tailwind, file-based Markdown; existing spreadsheet artifact runtime.

**Brief:** User's October 5 authorization plus docs/seo-audit-2026-10-05.md and docs/seo-competitors-2026-10-05.md. Older no-change observation periods are superseded by the current explicit instruction to plan and apply.

## Constraints
- Existing brand/layout, no new production dependencies; no fabricated premises, reviews, client results or search volumes.
- Use actual project screenshots; archive notes remain on Kings Mobile World.
- Prices from pricing.ts. Any worksheet has blank editable costs and explicit inclusions; no invented market-price claims.
- Preserve self-canonicals, unique titles, one H1, schema-visible content parity, and sitemap discovery.
- No email enquiry delivery. Visitors explicitly continue to WhatsApp and must send there. No visitor PII in analytics.
- Do not buy ads, links, accounts, or send unsolicited outreach. Paid/referral/self-generated clicks cannot satisfy the organic goal.

## Task 1 — WhatsApp enquiries (delegated)
- [x] Test valid/invalid brief input, Unicode encoding, fixed configured destination, bounded lengths, PII-free analytics, retired endpoints.
- [x] Replace contact/chat email submission with explicit WhatsApp handoff; retire obsolete email POST endpoints.
- [x] Update contact/privacy copy; lint and tests. Parent performs browser tests without sending messages.

## Task 2 — evidence and pricing intent (parent + content delegate)
- [x] Publish two distinct case-study articles for SQC and Health Factor, using observed features and honest measurement limits.
- [x] Add a downloadable quote-comparison worksheet and contextual links in all three existing cost guides.
- [x] Remove unsupported claims about competitor pricing and stale live-project claims where edited.
- [x] Surface write-ups from the case-studies page and city website service pages.

## Task 3 — city/service coverage (parent)
- [x] Add /seo-services-hyderabad, /ai-automation-mahabubnagar, /ai-automation-hyderabad with different useful copy, scope and FAQs.
- [x] Extend existing Mahabubnagar SEO and Hyderabad/Mahabubnagar digital/website pages with service-specific scope, measurement and proof links.
- [x] Explain AI search optimization within SEO pages separately from chatbot/workflow automation. Do not promise inclusion in AI answers.
- [x] Link all new pages from relevant services, locations, content and sitemap. Preserve existing keyword owners and URLs.

## Task 4 — measurement (workbook delegate + parent)
- [x] Preserve original workbook, refresh baseline, mark stale rank snapshots, add Oct6–20 daily blanks and formula-driven goal tracking.
- [x] Record deployment URLs, changes and indexing status. Unknown data stays unknown.
- [x] Schedule daily follow-up through final data availability; check evidence, make bounded justified improvements, notify meaningful changes only.

## Review focus and release checks
- [x] CTA does not falsely promise an email, callback record or confirmed WhatsApp send.
- [x] New city pages offer genuinely distinct use cases; no unsupported client outcomes or office locations.
- [x] Article/worksheet links work and no spreadsheet text triggers formula injection.
- [x] Full production build and lint, helper tests, rendered crawl, desktop/mobile form and content visual checks.
- [x] Fresh independent code/content review; fix material findings before deploying.
- [x] Commit only scoped changes, deploy via main, verify production pages and assets; submit updated sitemap/new pages once where tools allow.

## Progress
Baseline: 13 clicks/552 impressions over Sep6–Oct3; 50 clicks in15 days requires roughly7.2x that daily pace. Initial portfolio update6d28f80 already live. Current sprint passed build, seven helper tests, lint, 32-page core SEO crawl, 33 internal destination checks, desktop/mobile form checks and independent review. WhatsApp draft destination/Unicode verified without sending. Daily 10:30 local-time heartbeat created: growth-masala-50-organic-clicks. Deployed production commit `0db3aa8`; Vercel success. All32 live sitemap URLs pass core checks. Google accepted the updated sitemap and recrawl request for the substantially changed Mahabubnagar pricing guide. Workbook release records updated separately. Outcome remains pending October6–20 data.
