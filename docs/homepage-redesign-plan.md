# Homepage Redesign & Pricing Launch — Plan

> **Status: plan only. No code has changed.**
> Approve or amend before Phase 1 starts.
> Author: Claude · Date: 2026-08-06

---

## 1. Decisions locked by the owner

| # | Decision | Consequence |
|---|---|---|
| 1 | Website development is the **hero service** | Homepage pricing tiers the website ladder only |
| 2 | Nine services grouped into **four** | Additive slug model — §3 |
| 3 | Tiers **Starter / Growth / Premium**, ₹9,999 – ₹24,999 | Growth confirmed at ₹18,999 |
| 4 | **Monthly website maintenance is in scope** | Care plans ship with the pricing section |
| 5 | **Google Business Profile is charged, not bundled** | GBP becomes a paid add-on — §5.4 |
| 6 | **Marketing retainers deferred** | Social/SEO/ads retainers are **out of scope** for this launch — §5.5 |

---

## 2. Competitive baseline

Researched 2026-08-06. StaffArc's figures were extracted from its JavaScript
bundle: the site is a client-rendered SPA serving a **2.4 KB HTML shell**, so
search engines and AI crawlers see almost none of its content. That is a standing
advantage for us and must not be copied.

### 2.1 StaffArc (staffarc.tech)

No address, no location, WhatsApp-only contact. A remote build shop, **not a local
competitor**. Three separate ladders:

| Websites | | Logo | | Maintenance | |
|---|---|---|---|---|---|
| Service-Based | ₹5,000 | Basic | ₹2,000 | Care Basic | ₹1,500/mo |
| Product-Based | ₹7,000 | Standard | ₹3,250 | Care Pro | ₹3,500/mo |
| Semi E-Commerce | ₹15,000 | Premium | ₹5,750 | Care E-Comm | ₹6,500/mo |
| Full E-Commerce | ₹25,000 | | | | |

Explicit add-on pricing ("Additional Page: ₹1,000", "Additional 50 Products:
₹1,000"). Every CTA is a WhatsApp deep link with pre-filled text. Currently running
a "Complete Setup & Launch — ₹20k" offer. **Sells no marketing, SEO, ads, or social.**

### 2.2 WorldofNexa (worldofnexa.com)

Four groups: Websites · Branding · Marketing · Content.

- Social media, monthly: ₹4,999 / ₹9,999 / ₹19,999
- Business plans, one-time: ₹9,999 / ₹24,999 *(Most Popular)* / ₹39,999
- Websites "from ₹10,000"; e-commerce ₹15,000

### 2.3 What this means

Our Starter is **2× StaffArc's entry**. That gap must be visibly earned in the
bullet list, not asserted — see §5.3. Our Premium at ₹24,999 deliberately shadows
their ₹25,000; that is the market rate for full e-commerce, so do not undercut it.

Our moat against StaffArc is not price. It is that we have an address, a phone
number, and three named local clients who will vouch for us. They have none.

---

## 3. Service architecture — 9 services into 4 groups

### 3.1 The mapping

Grouped by **customer intent**, not by technology.

#### Group 1 — Websites & E-Commerce ⭐ *hero*

> *Outcome line: "Get your business online — properly."*

| Sub-service | Slug | Source |
|---|---|---|
| Business Websites | `website-development` | existing |
| E-Commerce Stores | `ecommerce-development` | **new** |
| Website Care & Maintenance | `website-maintenance` | **new** |

Entry point for the large majority of leads. Maintenance belongs here because
people buy care *with* the site, not as a separate category.

#### Group 2 — Custom Software

> *Outcome line: "Tools built for how your business actually works."*

| Sub-service | Slug | Source |
|---|---|---|
| Web Applications | `software-development` | **new** |
| Admin Panels & Dashboards | ↳ same slug | |
| Internal Tools | ↳ same slug | |

We have **ZakatEasy** and **LancerCalc** shipped and live. StaffArc lists "Custom
Software" with nothing to show for it.

#### Group 3 — Marketing & Growth

> *Outcome line: "Get found by people already looking for you."*

| Sub-service | Slug | Source |
|---|---|---|
| SEO & Google Business Profile | `seo` | existing |
| Meta Ads & Google Ads | `performance-marketing` | existing |
| Social Media Management | `social-media-growth` | existing |

**Our widest competitive gap.** StaffArc does not offer any of this.

#### Group 4 — AI & Automation

> *Outcome line: "Answer every enquiry, even at 2am."*

| Sub-service | Slug | Source |
|---|---|---|
| AI Chatbots & Voice Agents | `ai-automation` | existing |
| WhatsApp Automation | `whatsapp-automation` | **new** |

Neither competitor offers this. Highest margin, most defensible.

### 3.2 All nine services accounted for

| Owner's list | Lands in |
|---|---|
| 1. Website development | Group 1 — `website-development` |
| 2. E-commerce websites | Group 1 — `ecommerce-development` |
| 3. SEO, GBP | Group 3 — `seo` |
| 4. Website maintenance | Group 1 — `website-maintenance` |
| 5. Software development | Group 2 — `software-development` |
| 6. WhatsApp automations | Group 4 — `whatsapp-automation` |
| 7. Meta ads / Google Ads | Group 3 — `performance-marketing` |
| 8. Social media management | Group 3 — `social-media-growth` |
| 9. AI automations (chatbots, voice agents) | Group 4 — `ai-automation` |

### 3.3 Naming rule

Keep group names **keyword-bearing**. "SEO", "E-Commerce", and "Website" earn
search traffic; "Grow" and "Automate" do not. The outcome goes in the subheading,
never in the group title.

### 3.4 The additive slug model — do not skip this

`src/data/locations.ts` references services **by slug** in `featuredServices`
across all 12 location pages. `src/lib/schema.ts` builds the `OfferCatalog` from
the same array. `src/components/forms/ContactForm.tsx` builds its dropdown from it.
**Renaming or removing a slug breaks all three at once.**

Therefore: **all five existing slugs are preserved unchanged. Grouping is a new
layer on top.**

Implementation:
- Add a `group` field to the `Service` type in `src/types/index.ts`
- Add a `serviceGroups` array to `src/data/services.ts` describing the four groups
- Add the four new services with real, non-templated copy
- Existing consumers keep reading the flat `services` array and are unaffected
- Only the homepage and `/services` read the grouping

**`featuredServices` arrays in `locations.ts` need zero edits.**

### 3.5 Fallback

If Group 2 looks thin in layout, fold it into Group 1 as "Websites, Stores &
Software" and split Group 4 into "AI Chatbots & Voice" + "WhatsApp Automation".
Decide visually in Phase 4, not now.

---

## 4. Homepage section plan

Current order: Hero → Intro → Services → AISpotlight → Process → Portfolio →
Testimonials → FAQ → CTA

### 4.1 Proposed order

| # | Section | Component | Action |
|---|---|---|---|
| 1 | Hero | `HeroSection.tsx` | rework copy + CTA hierarchy |
| 2 | Trust bar | `TrustBar.tsx` | **new** |
| 3 | Problem | `IntroSection.tsx` | rework |
| 4 | Services | `ServicesPreview.tsx` | rework to 4 groups |
| 5 | How we work | `ProcessSection.tsx` | keep, add soft CTA |
| 6 | Projects + quotes | `PortfolioPreview.tsx` | merge in `TestimonialsSection` |
| 7 | Why us | `AISpotlight.tsx` → `WhyUsSection.tsx` | rework |
| 8 | Pricing | `PricingSection.tsx` | **new** |
| 9 | FAQ | `ui/FAQSection.tsx` | keep, extend content |
| 10 | Final CTA | `CTASection.tsx` | keep |
| 11 | Footer | `layout/Footer.tsx` | unchanged |

### 4.2 Section-by-section spec

---

**1 · Hero** — *rework*

**Job:** in five seconds, say what we do, for whom, where, and give one reason to
believe.

- Lead with **website development** — it is the hero service and the entry point
- H1: outcome-led, naming Mahabubnagar. Exactly **one** `<h1>`; use
  `<span className="block">` for visual line breaks
- Subhead: names the services and the area served
- Two CTAs: primary "Get a free quote" → WhatsApp/contact; secondary "See our
  work" → anchors to §6
- One proof element inline — a number or a client name, not a carousel

**Constraints:** the H1 is the LCP element — no heavy entrance animation on it.
Keep the existing background treatment; do not add new above-fold JavaScript.

---

**2 · Trust bar** — *new*

**Job:** immediate credibility before the reader has to trust a single claim.

- A ~80px strip, **not a full section**. No heading, no padding-heavy layout
- Client names: Triveni Balavikas · Freewings School · Kings Mobile World · Razzak
  Constructions · Automotive Dudes · TrustWave FinServ
- **Prefer named clients over stat counters.** Names are verifiable; "50+ projects"
  is not, and the portfolio only contains 8
- If logos are unavailable, set names in type — this is fine and still works
- Optional slow marquee on mobile; `globals.css` already has the keyframes

---

**3 · Problem** — *rework of `IntroSection`*

**Job:** make the reader feel the cost of the status quo.

- **Zero mentions of Growth Masala.** This section is about the reader
- Local and concrete. Not "in today's digital world"
- Angle: someone in Mahabubnagar searches for what you sell, finds a competitor,
  and you never find out it happened
- Three specific failure scenarios beat one abstract paragraph
- Ends with one transition line into services

**Current copy is "Growth is Not Luck. It's Strategy."** — that is a positioning
statement, not a problem statement. It moves to §7 or is cut.

**Avoid:** fear-mongering, and statistics we cannot source.

---

**4 · Services** — *rework of `ServicesPreview`*

**Job:** show the full range without burying the hero.

- Four cards, one per group, reading from `serviceGroups`
- Group 1 visually emphasised — larger card or first position with accent
- Each card: icon · keyword-bearing group name · outcome subhead · three
  sub-services listed · link to `/services`
- Sub-services listed as plain text, not nested cards — the card must stay scannable

---

**5 · How we work** — *keep `ProcessSection`*

**Job:** de-risking, not persuasion. Someone about to spend ₹19,000 needs to know
what happens and when.

- Keep the existing four steps
- Emphasise **"fixed quote before any work starts"** — this is the anxiety-killer
  and it is already true
- Add a **soft CTA** immediately after: *"Not sure what you need? Free 20-minute
  call."* This is the page's mid-point conversion opportunity

---

**6 · Projects + quotes** — *merge*

**Job:** proof that the work is real.

- Three featured projects, each carrying its client's testimonial inline
- All three testimonials are **also portfolio items** — Triveni, Freewings, Kings
  Mobile World. A quote beside the site it describes is far more credible than
  three quotes in a carousel
- Projects without a quote show a concrete result line instead
- Link to `/portfolio` for the remaining five
- `TestimonialsSection.tsx` is retired from the homepage. **Keep
  `src/data/testimonials.ts`** — the data is real and is consumed elsewhere

---

**7 · Why us** — *rework of `AISpotlight`*

**Job:** comparison against the alternatives, not a list of adjectives.

The reader is choosing between four options. Address them:

| Alternative | Their problem | Our answer |
|---|---|---|
| A Hyderabad agency | Expensive; you are a small account handled by juniors | Senior attention, direct communication |
| A freelancer | Disappears mid-project, no accountability | A registered business with an address and a phone number |
| A relative who "knows computers" | Never finishes | Fixed timeline, fixed quote |
| Doing nothing | Competitors are already found | §3 already established this |

Four pillars: **local and reachable · senior attention · fixed quote before work
starts · AI and automation nobody else here offers.**

AI becomes one pillar rather than the whole section — that is the change from the
current `AISpotlight`.

**Rule:** every claim must be provable. Unprovable differentiators are worse than
none. **Sections 3, 5, and 7 must not repeat each other** — 3 is about the reader,
5 is mechanism, 7 is comparison. If 7 cannot say something 3 and 5 do not, cut it.

---

**8 · Pricing** — *new* — full spec in §5

**Job:** convert the reader who is now sold but does not know if they can afford it.

Placed at 8, after "Why us", because price is meaningless until value is
established. This is the earliest point a number does not read as expensive.

---

**9 · FAQ** — *keep `ui/FAQSection`*

**Job:** last objections.

- **Must remain a server component using native `<details>`.** Converting it to a
  client-side accordion breaks the match between visible content and `FAQPage`
  schema — that is a policy violation, not a style choice
- Extend `src/data/faqs.ts` with pricing questions — §6.4

---

**10 · Final CTA** — *keep `CTASection`*

One clear action. No competing links.

---

## 5. Pricing

### 5.1 Structure — two blocks, never one table

Builds are one-time; Care is monthly. Mixing billing models in a single table is
the most common way a pricing section loses people. The homepage carries:

1. **Build it** — three website packages, one-time
2. **Keep it running** — three Care plans, monthly
3. One line linking to a `/pricing` page for the other three service groups

The homepage prices the **hero service only**.

### 5.2 Block 1 — Website packages (one-time)

| | **Starter** | **Growth** ⭐ Most Popular | **Premium** |
|---|---|---|---|
| **Price** | **₹9,999** | **₹18,999** | **₹24,999** |
| **For** | A business with nothing online yet | A business that wants to be found | A business ready to sell online |
| | 5-page website, custom designed — not a template | **Everything in Starter, plus:** | **Everything in Growth, plus:** |
| | Website copy written for you | Up to 10 pages + blog | Online store, up to 100 products |
| | Mobile-responsive, loads in under 2 seconds | Full on-page SEO + schema markup | Razorpay payment gateway |
| | WhatsApp enquiry button + contact form | Google Analytics + Search Console | Admin panel — manage products and orders yourself |
| | On-page SEO basics | One landing page built for ads | WhatsApp order alerts |
| | 30 days post-launch support | 90 days support | 6 months support |

### 5.3 Defending ₹9,999 against StaffArc's ₹5,000

GBP is no longer available as the differentiator (decision 5), so the argument
rests on five things that are true and that a remote ₹5,000 shop cannot match:

1. **Copy written for you.** A ₹5,000 "Basic UI/UX" build means the client writes
   every word. Most local owners never do, and the site dies half-finished.
   **The strongest bullet — lead with it.**
2. **Built to be found.** On-page SEO and Search Console from day one. Our own site
   ranks; that is demonstrable.
3. **Enquiries land where they get answered** — WhatsApp routing, not a contact
   form nobody checks.
4. **We are here.** Mahabubnagar address, phone number, meetings in person, support
   in Telugu and Hindi. StaffArc publishes no location at all.
5. **Named clients you can call.** Triveni, Freewings, Kings Mobile World — live
   URLs, real people.

**Points 1 and 4 belong inside the pricing section**, not only in §7. They are the
price justification, so they sit next to the price.

### 5.4 Block 2 — Care plans (monthly)

Confirmed in scope (decision 4). StaffArc charges ₹1,500 / ₹3,500 / ₹6,500 — we sit
level at entry and undercut at the top, where we are directly comparable.

| | **Care Basic** | **Care Pro** | **Care Commerce** |
|---|---|---|---|
| **Price** | **₹1,499/mo** | **₹3,499/mo** | **₹5,999/mo** |
| | Monthly backups | Weekly backups | Daily backups |
| | Security & uptime monitoring | 8 content updates/month | Unlimited minor updates |
| | 2 content updates/month | Plugin & dependency updates | Payment gateway monitoring |
| | Email support | Speed checks | Bug fixes |
| | | Priority support | Monthly performance report |

> **Sell Care at handover on every single build.** This is the highest-leverage
> item in the plan. One-time website sales restart from zero every month; a Care
> base compounds.

### 5.5 Add-ons — where GBP now lives

Explicit add-on pricing prevents scope arguments before they start.

| Add-on | Price |
|---|---|
| **Google Business Profile setup** | **₹2,999** one-time |
| **Google Business Profile management** | **₹1,999/mo** |
| Extra page | ₹1,000 |
| Extra 50 products | ₹1,000 |
| Logo design | ₹3,500 |
| AI chatbot on your site | ₹7,999 setup |

Charging for GBP is arguably better than bundling it: it is the number one local
ranking factor, so it sells itself on the call, and it creates a second recurring
line beside Care.

### 5.6 Out of scope for this launch

**Marketing retainers are deferred** (decision 6). Social media, SEO, and ads
retainers are **not** priced on the site in this release. Those services still
appear in Group 3 as services — they route to "free consultation, custom quote."

Do not build retainer pricing UI now. When it is approved later it slots into the
same two-block layout as a third block.

### 5.7 Pricing section requirements

1. Two visually separate blocks — one-time and monthly. **Never one table.**
2. Middle card highlighted, larger, "Most Popular" badge.
3. "Everything in X, plus…" as the first bullet of tiers 2 and 3.
4. Maximum 7 bullets per card. More reads as a spec sheet.
5. Per-card CTA → WhatsApp deep link with pre-filled text, using
   `business.whatsapp` from `src/data/business.ts`.
6. Add-on list rendered below the cards.
7. Fine print, explicit: *All prices exclude GST* · *Domain and hosting charged at
   cost* · *Custom scope quoted separately*.
8. An escape hatch: *"Need something custom? Free consultation, fixed quote before
   work starts."* Published prices should **qualify** leads, not replace quoting.

**Avoid:** "starting from" on all three cards (reads evasive), hiding GST, and a
monthly/annual toggle that hides half the offer on mobile.

---

## 6. Knock-on work triggered by publishing prices

Not optional. These ship in the same release or the site contradicts itself.

1. **`src/lib/chatbot.ts` is hard-coded never to quote** (rule 4: "Never make up
   pricing"). A bot saying "pricing depends on scope" on a page showing ₹9,999
   reads as evasive. Rewrite it to quote the published packages and route anything
   custom to a consultation.
2. **Schema — a real opportunity.** Published prices let the `OfferCatalog` emit
   `Offer` + `PriceSpecification`. `public/robots.txt` already allows GPTBot,
   PerplexityBot, and ClaudeBot, so when someone asks an AI "what does a website
   cost in Mahabubnagar", we have machine-readable numbers and StaffArc is an empty
   HTML shell.
3. **A `/pricing` page** for the full ladder. The homepage carries only the website
   tiers.
4. **`src/data/faqs.ts`** gains pricing questions — GST, what is not included,
   payment schedule, what happens when support ends. Visible `<details>` and
   `FAQPage` schema share one source, so parity is automatic. Do not break it.
5. **`ContactForm.tsx`** service dropdown gains the four new slugs.

---

## 7. Build phases

Design last. The conversion win is in the ordering and the copy, not the animation.

| Phase | Work | Gate |
|---|---|---|
| **0** | Confirm every price is deliverable at margin. Write exact Care and add-on scope so support terms are unambiguous | **Owner sign-off** |
| **1** | `services.ts` — add `group` + `serviceGroups`, add the 4 new slugs with real copy. Verify all 12 location pages and the `OfferCatalog` still build | `pnpm build` clean; location pages byte-identical in rendered HTML |
| **2** | Reorder `page.tsx`; stub §2, §7, §8 with placeholder copy. No styling | Scroll on a real phone — does the journey flow? |
| **3** | Copy, one section at a time. §3, §7, §8 first — they carry the argument | Owner reads it aloud |
| **4** | Design + motion, section by section | — |
| **5** | Pricing knock-ons — §6 | — |
| **6** | Verification: rendered-HTML metadata, Lighthouse, mobile scroll depth | 90+ Lighthouse; canonical and FAQ schema intact |

---

## 8. Guardrails

From `CLAUDE.md` and `docs/seo-architecture.md`. **Each has already caused a real bug.**

1. **Do not touch homepage metadata.** The title deliberately avoids "Digital
   Marketing Agency in Mahabubnagar" — that phrase belongs to
   `/digital-marketing-agency-mahabubnagar`. Two pages competing for it split the
   signal.
2. **Never set `alternates.canonical` in the root layout.** It is inherited by every
   child route and once de-indexed the entire site.
3. **`FAQSection` stays a server component using native `<details>`.**
4. **Exactly one `<h1>` per page.** `<span className="block">` for multi-line
   headlines.
5. **Verify metadata against rendered HTML, not source:**
   ```bash
   pnpm build && PORT=3111 pnpm start
   curl -s http://localhost:3111/ | grep -oE '<title>[^<]*</title>|<link rel="canonical"[^>]*>'
   ```
6. **Eleven sections is a long mobile page.** Keep below-fold sections on
   `dynamic()` as they are now, and watch LCP.
7. **Prices are a NAP-class fact.** Once published they land in schema, the chatbot,
   and eventually directory listings. Changing them later is expensive — get Phase
   0 right.
8. **Brand colours are locked.** Primary `#2563EB`, secondary `#3B82F6`, accent
   `#F59E0B`, navy `#0B1121`. Check `public/brand-assets/brand-guidelines.svg`
   before creating any visual asset. Use `public/images/logo.png` for the logo —
   never a redrawn SVG.

---

## 9. Open items

- Whether Group 2 (Custom Software) stands alone or folds into Group 1 — decide
  visually in Phase 4
- Whether the abandoned `feature/homepage-redesign` snapshot holds anything worth
  salvaging
- Client logo files for the trust bar, or set names in type instead
- Marketing retainer pricing — deferred, revisit after launch
