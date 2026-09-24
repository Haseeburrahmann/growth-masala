# Growth Masala SEO Growth Design

**Date:** 2026-09-24
**Status:** Approved for implementation
**Objective:** Increase qualified organic impressions and clicks, with Hyderabad website-development enquiries as the primary expansion target.

## Shared understanding

The owner authorizes evidence-led SEO improvements, suitable free-platform publishing, and a Git push. The measurable goal is more search visibility and clicks, especially for Hyderabad website development. The site is based in Mahabubnagar and serves Hyderabad remotely; it has no customer-facing office. Public business facts, client details, and performance claims must remain accurate.

This project starts from the live Search Console review on 2026-09-24:

- 26 Aug–22 Sep: 11 clicks, 417 impressions, 2.6% CTR, average position 16; India contributed 10 clicks and 377 impressions.
- `/website-development-hyderabad`: 3 impressions and no clicks in the same period. Its average position of 8 is too sparse to treat as a stable exact-query rank; Search Console returned no visible query rows for the page.
- 23 canonical URLs indexed. The successful sitemap contains 26 URLs. The remaining exclusions are three redirect URLs, one crawled-but-not-indexed blog post, and two newly discovered legal URLs.
- Eight external links from one referring domain are recognized by Google; all link to the homepage.
- The current site still publishes Station Road, a town-centre pin, “Studio,” and walk-in wording despite the remote-business policy recorded in the SEO architecture.

The workbook snapshot and older rank notes are useful starting context, not current rank evidence. The latest GSC values and exact-query reports take precedence. Tiny samples will be reported as such.

## Proposed design

### 1. Correct the business identity and location signals

Use the established remote-service model consistently across visible copy and machine-readable data:

- Remove the unverified street address, town-centre coordinates, directions/map-pin implications, customer-visit hours, “Studio,” “visit us,” and walk-in claims.
- Retain the truthful base location (Mahabubnagar, Telangana), service areas, contact details, and remote delivery.
- Reword Hyderabad positioning to say that Growth Masala serves Hyderabad remotely from Mahabubnagar. Do not imply a Hyderabad office or physical presence.
- Replace a physical-location `LocalBusiness` representation with an accurate organization/service representation if required to avoid asserting an address that does not exist. Keep entity identifiers stable where practical and update every `@id` reference together.
- Audit all shared footer, contact, homepage, about, service, portfolio, case-study, blog, and location-page components so shared copy does not reintroduce the removed claims.

This is the highest-priority correction because inaccurate local details damage user trust and conflict with the stated operating model. Google’s LocalBusiness documentation treats `address` as the business’s physical location; the project should not fabricate one to pursue local visibility.

### 2. Strengthen the existing Hyderabad commercial page

Keep `/website-development-hyderabad` as the sole commercial target for the website-development query cluster. Update its title, description, headings, and supporting copy only where the live page and query evidence support a useful improvement.

Improve the page with:

- A clear, truthful service area statement: based in Mahabubnagar and serving Hyderabad remotely.
- Original Kings Mobile World project details already published on the public site: four Hyderabad branches, the customer trust problem, branch details, mobile experience, and WhatsApp enquiry path. Add no new client statement or outcome without verifying permission and facts.
- Clear scope, ownership, delivery, support, and pricing links grounded in existing packages.
- Natural internal links to the existing Hyderabad cost guide and case-study/portfolio material.
- FAQs that answer real buyer questions and remain visible wherever their structured data is emitted.

Do not create separate pages for keyword variants, add unsupported performance metrics, or self-declare “best/top.” Do not create a second Hyderabad location page. A separate case-study route is out of scope unless the client supplies and approves additional original evidence that makes it materially more useful than the existing case study.

### 3. Make lead measurement usable

Add a small client-side GA4 event helper and send `generate_lead` exactly once only after the server accepts a contact-form submission or chatbot lead. The event may include only controlled, non-PII categories such as source (`contact_form` or `chatbot`) and selected service. Never transmit names, phone numbers, email addresses, business names, messages, or chatbot transcripts to Analytics.

Do not count phone, email, or WhatsApp clicks as completed leads. Validate the event paths in a local or debug workflow. Marking the event as a GA4 key event and linking Search Console to GA4 require account-side configuration; prepare the exact steps, then complete them only within the owner’s account and after the specific UI action is confirmed if needed.

### 4. Publish selectively and measure distribution

Research free options at implementation time, preferring accounts already controlled by Growth Masala. Prepare original, audience-useful content from the existing Hyderabad service page, cost guide, and project evidence. Each asset must have one clear reader need and a natural destination link.

- Do not submit duplicate directory profiles, use mass directories, buy links, solicit false reviews, or publish client claims without permission.
- Check whether a platform indexes outbound links and whether those links are `nofollow`/`ugc`; classify it accurately as referral/distribution when it cannot pass link equity.
- Do not create a new account if it requires owner identity, credentials, new access grants, or acceptance of legal terms. Stop for owner action at those gates.
- Record the public URL, publication date, link destination, link attributes, views/referrals, and any Search Console discovery. A published post is not automatically a backlink win.

The owner has authorized free-platform publishing generally. Before any action that requires owner credentials, client approval, legal acceptance, or sends non-public data, pause for that specific action. Public marketing copy should be factual and must not include unapproved claims.

### 5. Update the operating tracker

Preserve the existing workbook as the source template and create a revised output copy rather than overwrite the current file. Update the latest Search Console snapshot and record page-level Hyderabad evidence. Extend the content pipeline minimally so a planned asset can be distinguished from a published asset and its public URL/distribution evidence can be recorded. Keep the workbook’s formulas and existing priority model intact unless an affected formula must be updated.

## Components and data flow

1. `src/data/business.ts` becomes the single truthful source for identity, contact, base location, and service areas; no fabricated street/geo values feed the UI or schema.
2. Shared page components and `src/data/locations.ts` render the same remote-service truth.
3. `src/lib/schema.ts` emits organization/service entities and offer data that reference the same stable business entity. It does not emit a physical address or coordinates.
4. `/website-development-hyderabad` draws project evidence from existing case-study data and links to the existing Hyderabad guide; the page owns the commercial keyword cluster.
5. Successful server responses trigger one PII-safe GA4 lead event. Analytics remains separate from contact payloads and application logging.
6. Published content links to the owned service page where useful; a distribution log records channel and outcome without counting `nofollow` placements as authority wins.
7. The revised workbook records the baseline, implementation date, and subsequent complete-period evidence.

## Error handling and safeguards

- If a source fact cannot be verified, omit it rather than infer it.
- If a content platform blocks account access, imposes legal terms, requires non-public owner details, or has an unclear link policy, leave the draft unpublished and report the blocker.
- If no client-approved outcome metric exists, describe delivered work only; do not invent leads, rankings, traffic growth, speed claims, or ROI.
- If a page’s metadata is already aligned and query volume remains too small to diagnose CTR, prefer a limited, factual page improvement and record the before/after date rather than repeatedly changing titles.
- Avoid doorway pages and scaled city/keyword variants. Google’s spam policies prohibit doorway abuse and scaled content created primarily to manipulate rankings.
- Preserve existing uncommitted workspace files. Stage and commit only task-owned implementation and deliverable files.

## Verification and success measures

The implementation is complete when:

- Visible pages and rendered JSON-LD no longer expose the unverified address, location pin, visitor hours, “Studio,” or walk-in claims.
- Hyderabad copy consistently describes remote service from Mahabubnagar, and the existing commercial page has one clear keyword owner with accurate title/canonical/schema and useful links.
- Both successful enquiry paths emit one `generate_lead` event with no PII; failed attempts and contact clicks do not emit it.
- Any published asset is publicly accessible, factual, points to the intended page, and is classified by its real link attributes.
- The revised workbook shows the new baseline and has a clear planned/published evidence trail.
- Build/lint or other suitable non-test checks pass. No new test suite is in scope for this SEO operation.
- Changes are committed on a `codex/` branch and pushed to the configured Git remote; unrelated existing workspace changes are not included.

SEO outcomes are measured after implementation over complete, comparable reporting periods. The first signals to watch are India/Hyderabad-relevant impressions, clicks, page/query association, organic sessions, and confirmed lead events. A small early sample is not treated as proof of success or failure.

## Primary references

- [Google LocalBusiness structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google helpful, reliable, people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
- [Google Search spam policies](https://developers.google.com/search/docs/essentials/spam-policies)
- [Current project SEO architecture](../seo-architecture.md)
- [Current project SEO baseline](../seo-baseline-2026-08-17.md)
- [Hyderabad ranking plan](../../seo/HYDERABAD-RANKING-PLAN.md)
