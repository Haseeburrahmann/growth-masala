# Search-demand update — 12 October 2026

## Evidence and decision

Authenticated Search Console Web performance for September 13–October 10 shows 14 clicks, 454 impressions, 3.1% CTR and average position 9.9. This rolling window is not the sprint total. October 6–10 separately has 3 clicks and 60 impressions, leaving 47 of the 50-click target unfulfilled. October 11–20 actuals remain unavailable in the tracker.

The Mahabubnagar website-cost guide has 177 impressions, one click, 0.6% CTR and average position 12.6 in the 28-day window. Its page-filtered queries include:

| Query | Impressions | Clicks | Average position |
|---|---:|---:|---:|
| website costs | 19 | 0 | 9.7 |
| price for a website | 16 | 0 | 7.4 |
| quotes for website design | 15 | 0 | 19.7 |
| website design price | 12 | 0 | 12.4 |
| website design quotes | 12 | 0 | 18.2 |
| how much does it cost to run a website | 7 | 0 | 19.3 |

The national five-page guide has 16 impressions and no clicks; its query table contains no visible rows. The Hyderabad cost guide has one impression and no clicks. The local cost guide therefore receives the main functional improvement. Broad query wording does not establish local search volume. Query privacy means visible rows do not reconcile to property totals.

Research covered twelve distinct searches across local website development, pricing, maintenance, SEO, WhatsApp and AI automation. Primary competitor pages inspected include [EasyQuickWeb pricing](https://easyquickweb.com/pricing/), [DevXAI's Hyderabad cost guide](https://devxaitechnologies.com/blog/website-development-cost-hyderabad), [Bablu Hosters](https://babluhosters.com/), [WebEnrich SEO](https://www.webenrich.com/seo-services-india), [Aivolve Hyderabad](https://aivolve.co.in/locations/hyderabad) and [SaptaAI](https://www.saptaai.in/). Offers differ in scope; prices alone do not establish quality, support or supplier overhead. These are self-published offers, not verified market averages or geolocated Google rankings.

Google's [snippet guidance](https://developers.google.com/search/docs/appearance/snippet) supports clear, relevant visible answers. No featured snippet, indexing or click improvement is promised. Research evidence is preserved in the task's `outputs/seo-monitor-2026-10-12/` directory.

## Changes

- Three existing cost guides now lead with actual published packages, included work, exclusions, ownership questions and recurring charges. Unsupported citywide price bands and competitor stereotypes were removed. Existing URLs, SEO titles and original publication dates remain; substantive revision dates are October 12.
- The Mahabubnagar guide includes a running-cost estimator using `pricing.ts` for build and optional care prices. Domain and hosting inputs start blank. Annual, first-year and three-year estimates appear only after both rates are entered. Explicit zero is supported; invalid, negative and non-finite inputs are rejected. Estimates exclude GST, tools, transaction fees and additional work, assume unchanged annual rates, and count selected care for twelve months per year separately from launch support.
- The estimator is linked from the guide's introduction, recurring-cost section, contents navigation and national guide. It complements the existing quote worksheet. The formula and scope remain in prerendered HTML.
- Homepage provider comparisons now ask factual buying questions; unsupported exclusivity and competitor shortcomings were removed. Kings Mobile World links are labelled as archived work, including accessible labels.

The hypothesis is that direct price, quote-scope and renewal answers better serve the queries already producing impressions. Interactivity itself is not claimed as a ranking factor. No additional city clones, invented client outcomes, purchased traffic or outreach were used.

## Discovery actions

The live audit found 32 successful, indexable, self-canonical pages and no site-wide crawl block. Hyderabad SEO already has contextual and site-wide links; its October 12 inspection still reports discovered, not indexed, without a crawl. No repeated request was made for that unchanged page.

Health Factor's case study also reported discovered, not indexed, with no crawl. Google accepted its first manual indexing request on October 12. Queue acceptance is not indexing. SQC was indexed at its last October 9 inspection.

## Verification before deployment

- Production build and full ESLint pass.
- All 12 tests pass, including five estimator calculation/validation tests and seven existing WhatsApp/API tests. The estimator arithmetic tests were observed failing before implementation.
- Local production crawl passes all 32 URLs: HTTP 200, self-canonical, one H1, unique title/description, parseable JSON-LD, matching visible FAQ answers, valid same-page anchors and no unresolved price tokens.
- Browser checks verify Starter + annual domain 1,200 + hosting 2,400 gives 3,600 annual, 13,599 first-year and 20,799 three-year estimates. Growth + Care Basic + annual 1,000/2,000 gives 20,988 / 39,987 / 81,963. Blank/negative inputs remove totals appropriately.
- Mobile at 390px has no horizontal document overflow. Independent review found a missing-cost wording mismatch; corrected before deployment.
- Fresh PageSpeed API was unavailable due to quota; no new performance score is claimed.

## Follow-up

After deployment, verify the live page content and sitemap dates, then request a recrawl of the substantively changed priority guide. Preserve this release as an experiment and compare new completed-day page/query results after recrawl. Track the cost/quote/running-cost cluster separately from the long-term Hyderabad SEO and AI pages. Do not infer change impact from overlapping rolling windows or count tests/referrals as organic clicks. Continue the October 6–20 sprint and report its actual final total after data settles.
