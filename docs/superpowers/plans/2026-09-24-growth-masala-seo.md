# Growth Masala SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve qualified organic impressions and clicks, especially for Hyderabad website development, while keeping business facts and lead measurement accurate.

**Architecture:** Correct the business entity source and every shared location claim first, then strengthen the existing Hyderabad commercial page with facts already present in the project. Add a PII-safe analytics event at successful lead response boundaries, prepare and distribute only useful factual content on already accessible platforms, and produce a dated workbook copy with current evidence.

**Tech Stack:** Existing project framework and GA4 integration, TypeScript/React, Google Search Console and Analytics browser interfaces, existing XLSX workbook, bundled spreadsheet runtime.

**Spec:** `docs/superpowers/specs/2026-09-24-growth-masala-seo-design.md`

## Global Constraints

- The business is based in Mahabubnagar, Telangana, serves Hyderabad remotely, and has no customer-facing office.
- Do not emit an unverified street address, physical coordinates, visitor hours, directions, “Studio,” walk-in, or Hyderabad office claim.
- Keep `/website-development-hyderabad` as the one commercial owner for the Hyderabad website-development query cluster.
- Use only public, already-present Kings Mobile World project facts; do not invent outcomes, approval, or client statements.
- `generate_lead` fires once only after accepted server response and carries no personal data.
- Publish only factual, useful original content; do not mass-submit directories, buy links, solicit false reviews, or treat `nofollow`/`ugc` placements as authority wins.
- Do not accept legal terms or create accounts requiring owner credentials or identity; pause at those gates.
- Create a revised workbook copy and preserve the existing workbook, formulas, priority model, and unrelated uncommitted files.
- Do not run a test suite; use suitable build/lint and inspection checks only.
- Commit only task-owned files on a `codex/` branch and push after review; current sandbox may block Git metadata writes.

## Review Focus

- Shared pages can still render stale address or visit wording from components or location records; inspect rendered source data and search all site copy for those claims.
- JSON-LD may reference the old entity/address from nested `@id` fields; inspect every emitted schema reference and its stable canonical identifier.
- A failed, repeated, or rejected lead submission must never create a `generate_lead`; inspect each success branch and make event emission idempotent for one accepted submission.
- Analytics event payload must exclude form values, free text, and chatbot transcript; review payload construction and call sites.
- A content platform may label links `nofollow`/`ugc` or require a login/legal step; inspect the actual placement and destination before publishing and record the actual attributes.

---

## File Structure

- `src/data/business.ts`: canonical business facts consumed by site UI and metadata.
- `src/lib/schema.ts`: JSON-LD entity graph.
- `src/data/locations.ts` and shared header/footer/contact/page components: location-aware copy and service-area language.
- Existing Hyderabad page route/component and `src/data/caseStudies.ts`: commercial page content and project evidence; no duplicate route.
- `src/components/forms/ContactForm.tsx`, `src/components/chatbot/ChatWidget.tsx`, and a focused analytics helper under `src/lib/`: accepted-lead event boundary and payload.
- `seo/`: research and publication ledger for channel choices and outcomes.
- `outputs/seo_expert_tracker_2026_08_20/`: existing workbook source; create dated output copy in `outputs/`.
- `docs/superpowers/specs/2026-09-24-growth-masala-seo-design.md`: approved design and guardrails.

## Task 1: Align Business Facts and Structured Data

**Files:**
- Modify: `src/data/business.ts`
- Modify: `src/lib/schema.ts`
- Modify: `src/data/locations.ts`
- Modify: shared UI and route files identified by searching for `Station Road`, `509001`, `Studio`, `walk-in`, `visit us`, physical-hours/address/map copy.

**Interfaces:** Business constants remain the shared source for visible copy and schema; preserve existing public exports or update every import in the same task.

- [x] Search the codebase for every old physical-address, coordinate, visitor-hours, walk-in, and local-presence claim; map each occurrence to its owning component/data record.
- [x] Remove physical address/geo and customer-visit hours from canonical facts; retain verified Mahabubnagar base, contact data, service areas, and remote-delivery wording.
- [x] Change JSON-LD to accurate Organization/Service entities and remove address/geo assertions; update linked `@id` references consistently.
- [x] Rewrite shared and Hyderabad-facing location copy to say Growth Masala serves Hyderabad remotely from Mahabubnagar.
- [x] Inspect all matches again and inspect the rendered metadata/schema generation path; confirm no old location claim can be emitted.

## Task 2: Improve the Existing Hyderabad Website Development Page

**Files:**
- Modify: existing route/component for `/website-development-hyderabad` (locate via `rg` before editing).
- Reference: `src/data/caseStudies.ts`, Hyderabad guide in `src/content/blog/website-design-cost-hyderabad.md`, existing pricing/package content.
- Modify only if needed: `src/app/sitemap.ts` or page metadata source.

**Interfaces:** Reuse current route, canonical, and case-study data. Keep the page's established component and metadata conventions.

- [x] Inspect current page, title/description/canonical, package/pricing pages, case-study facts, and Hyderabad guide; capture current values in the SEO log.
- [x] Improve page description and opening copy to clearly describe remote Hyderabad service without overstating local presence; retain existing title/canonical due sparse query evidence.
- [x] Add useful scope, support, and pricing links supported by existing offer facts.
- [x] Add concise project evidence from Kings Mobile World already on the public site; state no performance outcome.
- [x] Add natural internal links to the Hyderabad cost guide and case study/portfolio; retain one commercial route and canonical.
- [x] Check FAQ copy against visible FAQ content and schema; remove unsupported or duplicate markup.
- [x] Review the page copy and metadata for query relevance, factuality, and absence of doorway/keyword stuffing.

## Task 3: Add PII-Safe Accepted-Lead Measurement

**Files:**
- Create or modify: focused GA4 helper in `src/lib/` following current analytics initialization conventions.
- Modify: `src/components/forms/ContactForm.tsx`
- Modify: `src/components/chatbot/ChatWidget.tsx`
- Reference: `seo/CONVERSION-MEASUREMENT-PLAN.md`

**Interfaces:** Helper accepts only a controlled source enum (`contact_form` or `chatbot`) and, if present, an allowlisted service category. It sends one `generate_lead` event with those fields only.

- [x] Trace existing GA4 initialization and both server accepted-response branches; verify event API availability and current forms' controlled service values.
- [x] Implement a helper that no-ops safely when analytics is unavailable and accepts only source plus an allowlisted service category.
- [x] Invoke helper once only in each accepted response branch; do not invoke for contact clicks or rejected requests.
- [x] Inspect constructed event payloads and both call paths to ensure names, email, phone, business, message, and transcripts cannot be passed.
- [x] Link Search Console with the existing GA4 property. Defer key-event designation until the first genuine event is observed.

## Task 4: Research and Publish Selectively

**Files:**
- Create: `docs/superpowers/seo-publishing-log-2026-09-24.md` (task-owned evidence log; existing `seo/` files are pre-existing untracked user files).
- Create: original channel-specific post only after verifying access and current platform link behavior.

**Interfaces:** Each asset has a defined reader need, one owned destination, public URL/date, and measured distribution fields; unavailable platform access leaves a ready draft and an explicit access note.

- [x] Recheck free channel options and owned account availability; use the existing Growth Masala Medium account.
- [x] Publish a distinct factual Hyderabad article supported by public project facts, with one relevant site link.
- [x] Record link treatment as unknown because source inspection was blocked; do not count it as an authority backlink.
- [x] Verify the public URL, destination, and displayed text.
- [x] Record publication URL/date, destination, link attribute caveat, and measurement follow-up.

## Task 5: Refresh the SEO Operating Workbook

**Files:**
- Read: `outputs/seo_expert_tracker_2026_08_20/growth-masala-seo-operating-system.xlsx`
- Create: a dated revised workbook copy under `outputs/`.
- Use: `spreadsheets:Spreadsheets` skill and bundled `@oai/artifact-tool` workflow.

**Interfaces:** Preserve source workbook and existing formulas/priority model. Update current Search Console evidence and add minimal content status/public URL/distribution evidence columns to the copy.

- [x] Read the spreadsheet skill and inspect sheet names, existing cell formats, formulas, and workbook snapshot date.
- [x] Before workbook authoring, run the required operation marker exactly once and create a dated output copy.
- [x] Update dated GSC totals and Hyderabad page evidence with reporting windows; label the 3-impression sample as sparse and avoid a stable rank claim.
- [x] Record technical/page/content work and publication status, date, URL, destination, link classification, and outcome fields while preserving formulas and priorities.
- [x] Reopen the copied workbook, scan for formula errors, inspect changed ranges, and verify the original source hash is unchanged.

## Task 6: Review, Verify, Commit, and Push

**Files:**
- Review all task-owned edits and generated workbook copy; do not stage existing user changes.

**Interfaces:** Implementation deliverables satisfy the approved spec; publication record and workbook baseline refer to the same evidence period.

- [x] Inspect `git status` and list task-owned paths; preserve user-owned dirty/untracked files.
- [x] Run project build/lint checks only (no test suite); verify source schema/event paths and inspect the dashboard render.
- [x] Reopen the workbook, confirm formulas persist and no formula errors were found; confirm original workbook hash is unchanged.
- [ ] Stage only task-owned source, SEO log/content, workbook copy, and plan/spec if appropriate; commit on a `codex/` branch.
- [ ] Push the branch to `origin` and report commit and remote branch, or state the exact Git permission limitation if metadata/network writes remain blocked.

## Self-Review

- Spec coverage: identity/schema is Task 1; Hyderabad service content is Task 2; lead event is Task 3; publication and link classification are Task 4; workbook update is Task 5; verification and Git delivery are Task 6.
- Placeholder scan: no placeholder instructions remain; paths that require repository discovery are explicitly located by a concrete search before editing.
- Interface consistency: analytics helper takes only controlled source and optional allowlisted service; UI callers provide no form values.
- Review focus: location/schema checks in Task 1; canonical/FAQ checks in Task 2; event idempotence and PII in Task 3; link attributes/access gates in Task 4; formula/source integrity in Task 5.
