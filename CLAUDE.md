# CLAUDE.md — Growth Masala Website Project

> 📋 **Pending tasks & SEO action plan:** [`.claude/TODO.md`](.claude/TODO.md)
> Read TODO.md at the start of every session to know what needs to be worked on next.
>
> 🔍 **Before touching metadata, schema, canonicals, the footer, or location pages:**
> read [`docs/seo-architecture.md`](docs/seo-architecture.md). It documents rules
> that are easy to break silently and expensive to notice — a root-level canonical
> once removed the entire site from Google's index.
>
> ⚠️ **TODO.md is not evidence.** It has been stale before. Grep the source to
> confirm any claim in it before acting on that claim.

## Project Overview
Growth Masala is a digital marketing agency website for a startup agency offering website development, social media growth, and performance marketing services. The site must be professional, modern, animated, and conversion-focused.

**Tagline:** Spice Up Your Brand Growth
**Live Domain:** https://growthmasala.com (deployed on Vercel)
**Client:** Growth Masala (startup digital agency)

---

## Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Next.js 14+ (App Router)** | SEO, SSR/SSG, API routes, Vercel-native |
| Styling | **Tailwind CSS v4** | CSS-first config in `globals.css` — there is no `tailwind.config.*` |
| Animations | **CSS keyframes + IntersectionObserver** | Framer Motion was removed; reveals run through `AnimatedContainer` + `useInView`, zero JS animation runtime |
| Icons | **Lucide React** | Clean, consistent icon set |
| Fonts | **Google Fonts** — Poppins (headings), Inter (body) | Per brand guide |
| Blog | **Markdown + gray-matter** | File-based blog. `next-mdx-remote` is NOT installed — `lib/blog.ts` parses and renders directly |
| Chatbot | **Claude API (Anthropic)** | Full AI assistant for visitor questions |
| Forms | **Vercel Serverless Functions** | Contact form submissions + email notifications |
| Email | **Nodemailer + Gmail** | `lib/email.ts`. Resend is not installed |
| Deployment | **Vercel** | Free tier, automatic GitHub deploys |
| Package Manager | **pnpm** | Fast, disk-efficient |

---

## Brand Style Guide

```
Primary Color:    #2563EB (blue-600)
Secondary Color:  #3B82F6 (blue-500)
Accent/Gradient:  linear-gradient(135deg, #2563EB, #3B82F6)
Background:       #FFFFFF (white)
Surface/Cards:    #F8FAFC (slate-50)
Text Primary:     #0F172A (slate-900)
Text Secondary:   #475569 (slate-600)
Border:           #E2E8F0 (slate-200)

Heading Font:     'Poppins', sans-serif (weight: 600, 700)
Body Font:        'Inter', sans-serif (weight: 400, 500)

Border Radius:    rounded-full (buttons/pills, 112 uses) · rounded-2xl (cards, 35)
                  rounded-xl (inputs & small cards, 18) · rounded-3xl (large slabs, 9)
                  NOTE: the old "8px cards / 6px buttons / 12px large cards" spec
                  described nothing in the codebase — rounded-sm/md are unused.
Shadows:          shadow-lg is the workhorse (16 uses); shadow-xl/2xl for raised
                  slabs; colour-tinted variants (shadow-primary/25) on CTAs.
                  Card lift uses the custom .hover-lift, not a shadow utility.
```

---

## Project Structure

```
growth-masala/
├── CLAUDE.md                          # This file — project bible
├── .claude/
│   └── agents/
│       ├── coder.md                   # Coder agent instructions
│       ├── reviewer.md                # Code reviewer agent
│       └── tester.md                  # Tester agent instructions
├── public/
│   ├── images/
│   │   ├── logo.png                   # Growth Masala text logo
│   │   ├── icon.png                   # Growth arrow icon
│   │   └── portfolio/                 # Portfolio project screenshots
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx                 # Root layout (nav + footer + fonts)
│   │   ├── page.tsx                   # Homepage
│   │   ├── services/
│   │   │   └── page.tsx               # Services page
│   │   ├── portfolio/
│   │   │   └── page.tsx               # Portfolio page
│   │   ├── case-studies/
│   │   │   └── page.tsx               # Case studies page
│   │   ├── about/
│   │   │   └── page.tsx               # About page
│   │   ├── blog/
│   │   │   ├── page.tsx               # Blog listing page
│   │   │   └── [slug]/
│   │   │       └── page.tsx           # Individual blog post
│   │   ├── contact/
│   │   │   └── page.tsx               # Contact page
│   │   ├── [slug]/
│   │   │   └── page.tsx               # Location landing pages (dynamicParams=false)
│   │   ├── sitemap.ts                 # Sitemap — derives location + blog URLs
│   │   └── api/
│   │       ├── contact/
│   │       │   └── route.ts           # Contact form API endpoint
│   │       ├── chat/
│   │       │   └── route.ts           # Claude chatbot API endpoint
│   │       └── lead/
│   │           └── route.ts           # Chatbot lead capture
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Nav + the fullscreen mobile menu (no separate file)
│   │   │   └── Footer.tsx             # Site footer
│   │   ├── home/                      # 9 homepage sections — see src/app/page.tsx for order
│   │   │   ├── HeroSection.tsx        │   ├── ProblemSection.tsx
│   │   │   ├── TrustBar.tsx           │   ├── ServicesPreview.tsx
│   │   │   ├── ProcessSection.tsx     │   ├── PortfolioPreview.tsx
│   │   │   ├── WhyUsSection.tsx       │   ├── PricingSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── about/ case-studies/ contact/ portfolio/ services/   # per-route sections
│   │   ├── ui/
│   │   │   ├── AnimatedContainer.tsx  # IntersectionObserver scroll-reveal wrapper
│   │   │   ├── SectionHeading.tsx     # Consistent section titles
│   │   │   ├── SectionDivider.tsx     # Marker between two LIGHT sections
│   │   │   └── FAQSection.tsx         # Server-rendered <details> FAQ (schema parity)
│   │   ├── blog/
│   │   │   └── PostBody.tsx           # Markdown renderer for blog posts
│   │   ├── chatbot/
│   │   │   ├── ChatWidget.tsx         # Whole widget: FABs, panel, messages, input
│   │   │   └── ChatWidgetLazy.tsx     # Dynamic import wrapper
│   │   └── forms/
│   │       └── ContactForm.tsx        # Contact form with validation
│   ├── content/
│   │   └── blog/                      # 4 markdown posts
│   ├── lib/
│   │   ├── chatbot.ts                 # Claude system prompt
│   │   ├── email.ts                   # Nodemailer utility
│   │   ├── blog.ts                    # Blog post parsing
│   │   ├── schema.ts                  # JSON-LD builders (see docs/seo-architecture.md)
│   │   ├── whatsapp.ts                # Pre-filled wa.me link builder
│   │   └── useInView.ts               # Scroll-reveal trigger (read the comment before editing)
│   ├── data/
│   │   ├── business.ts                # NAP + business facts — SINGLE SOURCE OF TRUTH
│   │   ├── locations.ts               # 12 location landing pages (unique copy each)
│   │   ├── faqs.ts                    # FAQ content (homepage + per-location)
│   │   ├── services.ts                # Services + group taxonomy
│   │   ├── pricing.ts                 # Tiers, care plans, add-ons — feeds UI, schema AND chatbot
│   │   ├── portfolio.ts               # Portfolio items
│   │   ├── caseStudies.ts             # Case study content
│   │   ├── clients.ts                 # Trust-bar client logos
│   │   ├── testimonials.ts            # Testimonials (REAL clients — verify before editing)
│   │   └── navigation.ts              # Nav links
│   └── types/
│       └── index.ts                   # TypeScript interfaces
├── next.config.ts                     # NOTE: no tailwind.config.* — Tailwind v4 is
├── tsconfig.json                      # configured in src/app/globals.css via @theme
├── package.json
├── .env.local                         # API keys (NEVER commit)
├── .env.example                       # Template for env vars
└── .gitignore
```

---

## Page Breakdown

### Homepage (`/`)
Sections in order:
1. **Hero** — Headline, subheadline, two CTAs, subtle background animation (floating dots or gradient shift)
2. **Intro** — "Growth is Not Luck. It's Strategy." with supporting paragraph
3. **Services Preview** — 3 service cards with icons, hover animations
4. **Process** — 4-step visual timeline (Discovery → Strategy → Execution → Growth)
5. **Portfolio Preview** — Top 3 portfolio items as image cards
6. **Testimonials** — Carousel or stacked testimonial cards
7. **CTA** — "Ready to Grow Your Business Online?" with button
8. **Contact snippet** — Mini contact form or "Get in touch" link

### Services (`/services`)
- Detailed breakdown of each service with sub-items
- Each service gets its own card/section with icon, description, deliverables
- CTA at bottom

### Portfolio (`/portfolio`)
- Grid of project cards with thumbnail, title, category tag
- Click to expand or view details (modal or detail page)
- Filter by category (Website, Marketing, Social Media)

### Case Studies (`/case-studies`)
- Challenge → Solution → Result format
- Each case study as a detailed card or separate page
- Include metrics/results where available

### About (`/about`)
- Agency story and mission
- Team section (if applicable)
- Values or approach

### Blog (`/blog`)
- Markdown-based posts from `src/content/blog/`
- Listing page with title, date, excerpt, read time
- Individual post pages with full content
- SEO meta tags per post

### Contact (`/contact`)
- Full contact form: Name, Phone, Email, Business Name, Service Needed (dropdown), Message
- WhatsApp button (wa.me link — number TBD)
- Email and social links
- Full NAP block — must match `src/data/business.ts` exactly
- Google Maps embed (optional, if office location exists)

### Location landing pages (root-level, e.g. `/digital-marketing-agency-mahabubnagar`)
The pages the site is built to rank with. Twelve of them, all rendered by
`src/app/[slug]/page.tsx` from `src/data/locations.ts`.

- **Mahabubnagar (5):** digital marketing agency, website development, SEO services, social media marketing, Meta ads
- **Micro-local (5):** Shadnagar, Wanaparthy, Kalwakurthy, Jadcherla, Narayanpet
- **Hyderabad (2):** digital marketing agency, website development

Each page: exact-match H1 and title, unique intro / why-local / market-context
copy, featured services, process, 4 FAQs with `FAQPage` schema, `Service` schema,
breadcrumbs, and cross-links to 3 sibling pages. Adding one means writing real
copy for it — see [`docs/seo-architecture.md`](docs/seo-architecture.md) §Rule 4.

---

## Animation Strategy (CSS keyframes)

All animations should be **subtle and professional** — not flashy.

There is no `src/lib/animations.ts` and no Framer Motion. Everything lives in
`src/app/globals.css` as keyframes, triggered one of two ways:

```tsx
// 1. Scroll reveal — IntersectionObserver flips the class after hydration
<AnimatedContainer animation="fade-in-up" delay={120}>…</AnimatedContainer>

// The `animation` prop is interpolated into `animate-{name}`, so every member
// of that union needs a matching class in globals.css. Grepping for
// "animate-scale-in" finds nothing — the union type IS the usage list.
// Available: fade-in-up (default) · fade-in · scale-in · slide-in-left

// 2. Load-time — class applied directly, staggered with inline animationDelay
<span className="animate-hero-reveal" style={{ animationDelay: "300ms" }}>
```

Two rules that are easy to break:

- **`.reveal-pending` starts at `opacity: 0`.** The `<noscript>` block in
  `layout.tsx` un-hides it, so the page is never blank without JS. Do not
  repurpose that class name for hover-only affordances.
- **Anything new that animates must be added to the `prefers-reduced-motion`
  blocks by hand.** They enumerate class names, so motion without an
  `.animate-*` class is silently exempt — `scroll-behavior`, the `main`
  page-enter and the chat wiggle all shipped that way once.

**Where to animate:**
- Hero headline: word-by-word reveal on load
- Section headings: fade-in-up on scroll
- Service cards: stagger fade-in on scroll
- Process steps: sequential reveal with connecting line animation
- Portfolio cards: fade-in-up with stagger
- Testimonials: slide transition
- Buttons: subtle scale on hover
- Navbar: backdrop blur on scroll, transparent at top
- Page transitions: crossfade between routes

---

## Chatbot Architecture

> **Full reference template:** `.claude/chatbot-template.md`
> Contains the reusable template, filled Growth Masala system prompt, and Next.js adaptation notes.
> Methodology: System Prompt Injection with Scoped Guardrails (no DB, no vector search).

### Frontend (`src/components/chatbot/ChatWidget.tsx`)
- Floating button (bottom-right, 60x60px circle, brand blue)
- Click to open 340x480px chat panel
- Bot avatar + name in header with "Online" status indicator
- Separate bubble styles: bot (white, left-aligned) / user (blue, right-aligned)
- Typing indicator (animated dots) while waiting
- Markdown rendering: bold text + bullet lists
- Persists conversation in sessionStorage
- Enter key to send, disabled state while thinking
- Responsive — works on mobile

### Backend (`src/app/api/chat/route.ts`)
- POST endpoint accepting `{ messages }` (full conversation history)
- Calls Claude API via `@anthropic-ai/sdk`
- Model: `claude-sonnet-4-6`
- `max_tokens: 350` (short, punchy responses — increase to 600 if needed)
- System prompt loaded from `src/lib/chatbot.ts`
- **Sanitization:** slice last 20 messages, cap each at 2000 chars
- **Validation:** last message must be from user role
- **Error handling:** separate responses for 401 (bad key), 429 (rate limit), network errors
- Rate limiting to prevent abuse

### System Prompt Location
- **File:** `src/lib/chatbot.ts` — exports `SYSTEM_PROMPT` constant
- **Full prompt:** See `.claude/chatbot-template.md` → "Growth Masala — Filled System Prompt"
- Covers: business info, all 3 services with sub-items, 4-step process, FAQ, response rules, lead capture flow
- **Key rules:** only Growth Masala topics, max 2-3 sentences, never make up pricing, lead capture in 3 steps

### Environment Variables
```
ANTHROPIC_API_KEY=sk-ant-xxxxx     # Claude API key (user adds their own)
CONTACT_EMAIL=xxx@gmail.com         # Where form submissions go
RESEND_API_KEY=re_xxxxx             # For sending email notifications
NEXT_PUBLIC_WHATSAPP_NUMBER=91XXXXXXXXXX  # WhatsApp number (TBD)
NEXT_PUBLIC_SITE_URL=https://growthmasala.com
```

---

## Contact Form Flow

1. User fills form on `/contact` page
2. Client-side validation (required fields, email format, phone format)
3. POST to `/api/contact` serverless function
4. Server validates + sanitizes input
5. Sends email notification via Nodemailer to `CONTACT_EMAIL`
6. Returns success response
7. Frontend shows success toast/message
8. Optional: also save to a simple JSON/database for lead tracking

---

## SEO Strategy

> Full conventions and the reasoning behind them: [`docs/seo-architecture.md`](docs/seo-architecture.md)

**Non-negotiable rules** (each of these has already caused a real bug):

1. **Canonicals are per-route, never in the root layout.** `alternates.canonical`
   set at the root is inherited by every child route and makes the whole site
   canonicalise to the homepage. This de-indexed the site once.
2. **Child titles must not contain "Growth Masala".** The root template appends
   it. Including it in a child title double-prints the brand.
3. **Titles lead with the keyword, not the brand**, and include the location where
   it fits naturally. Keep the rendered title under 60 characters.
4. **FAQ schema must match visible page content**, which is why `FAQSection` is a
   server component using native `<details>`. Hidden FAQ schema is a policy violation.
5. **NAP lives in one place and must match every external listing.**
   `src/data/business.ts` is the single source of truth; `buildPostalAddress()`
   omits any field left empty rather than emitting a guess. The street address is
   currently a **road-level placeholder** ("Station Road", set on owner
   instruction) — replace it with the real premises **before** creating any
   directory listing, because inconsistent NAP across citations suppresses local
   ranking and is painful to unwind once published.
6. **Location pages need genuinely unique copy.** Cloning an entry in
   `src/data/locations.ts` and swapping the city name produces doorway pages.

**Standard coverage:**

- Custom `<title>` and `<meta description>` per page
- Open Graph + Twitter card tags
- JSON-LD: `LocalBusiness`, `WebSite`, `BreadcrumbList`, `FAQPage`, `Service`, `OfferCatalog`, `BlogPosting`
- Sitemap via `src/app/sitemap.ts` (location + blog URLs derived automatically)
- `robots.txt` explicitly allows AI crawlers (GPTBot, PerplexityBot, ClaudeBot) for AI citation visibility
- Image alt text on everything; images stored as WebP under ~120KB
- Semantic HTML, exactly one `<h1>` per page
- Performance target: 90+ Lighthouse score

**Verify metadata against rendered HTML, not source.** Next.js merges parent and
child metadata in ways that aren't obvious from reading either file:

```bash
pnpm build && pnpm start
curl -s http://localhost:3000/services | grep -oE '<title>[^<]*</title>|<link rel="canonical"[^>]*>'
```

---

## Deployment Plan

1. **Development:** Local dev with `pnpm dev`
2. **Version Control:** GitHub repository
3. **Deployment:** Connect GitHub repo to Vercel
4. **Environment:** Set env vars in Vercel dashboard
5. **Domain:** Connect custom domain in Vercel (when ready)
6. **CI/CD:** Every push to `main` auto-deploys

---

## Development Phases

### Phase 1: Foundation
- [x] Project setup (Next.js + Tailwind v4 + CSS animations)
- [ ] Brand assets (logo, icon, favicon)
- [ ] Layout components (Navbar, Footer, fonts)
- [ ] Reusable UI components (Button, Card, SectionHeading, AnimatedContainer)
- [ ] Homepage — all sections

### Phase 2: Inner Pages
- [ ] Services page
- [ ] Portfolio page (with placeholder projects)
- [ ] Case Studies page
- [ ] About page
- [ ] Contact page with working form

### Phase 3: Blog
- [ ] Blog listing page
- [ ] Blog post template
- [ ] Sample blog posts
- [ ] Blog SEO (meta tags, slugs)

### Phase 4: AI Chatbot
- [ ] Chat UI widget
- [ ] Claude API integration
- [ ] System prompt tuning
- [ ] Rate limiting + error handling

### Phase 5: Polish & Deploy
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] Lighthouse optimization
- [ ] SEO meta tags + sitemap
- [ ] Deploy to Vercel
- [ ] Connect domain

---

## Coding Standards

- **TypeScript** everywhere — no `any` types
- **Components** are functional with proper typing
- **File naming:** PascalCase for components, camelCase for utilities
- **Imports:** absolute paths via `@/` alias
- **CSS:** Tailwind only — no custom CSS files unless absolutely necessary
- **Accessibility:** proper aria labels, keyboard navigation, semantic HTML
- **Performance:** lazy load images, dynamic imports for heavy components
- **Git commits:** conventional commits (`feat:`, `fix:`, `style:`, `docs:`)

---

## Key File Locations

| What | Where |
|------|-------|
| Project config (this file) | `CLAUDE.md` (root) |
| **Pending tasks & SEO plan** | **`.claude/TODO.md`** ← read this each session |
| **SEO rules & conventions** | **`docs/seo-architecture.md`** ← read before touching metadata/schema |
| SEO audit + competitor teardown | `docs/seo-audit-2026-08.md` |
| **Business NAP (single source of truth)** | `src/data/business.ts` |
| JSON-LD schema builders | `src/lib/schema.ts` |
| Location landing page data | `src/data/locations.ts` |
| Location landing page template | `src/app/[slug]/page.tsx` |
| FAQ content | `src/data/faqs.ts` |
| FAQ component | `src/components/ui/FAQSection.tsx` |
| Completed work log | `.claude/updates.md` |
| Chatbot template | `.claude/chatbot-template.md` |
| Agent instructions | `.claude/agents/` |
| Homepage sections | `src/components/home/` |
| Layout (Nav/Footer) | `src/components/layout/` |
| Chat widget | `src/components/chatbot/ChatWidget.tsx` |
| System prompt | `src/lib/chatbot.ts` |
| Chat API | `src/app/api/chat/route.ts` |
| Contact API | `src/app/api/contact/route.ts` |
| Email utility | `src/lib/email.ts` |
| Blog posts | `src/content/blog/` |
| Blog images | `public/images/blog/` |
| Portfolio data | `src/data/portfolio.ts` |
| Brand logo | `public/images/logo.png` |
| Portfolio images | `public/images/portfolio/` |
| Design system + animations | `src/app/globals.css` |
| IntersectionObserver hook | `src/lib/useInView.ts` |
| JSON-LD schema | `src/app/layout.tsx` |
| Sitemap | `src/app/sitemap.ts` |
| 404 page | `src/app/not-found.tsx` |
| Env vars | `.env.local` (never commit) |
| Env template | `.env.example` |

---

## Important Rules

1. NEVER commit `.env.local` — it contains API keys
2. ALWAYS use the brand colors from the style guide above
3. ALWAYS use Poppins for headings and Inter for body text
4. Every section must have scroll-reveal animation
5. Mobile-first responsive design
6. All images must have alt text
7. Contact form must validate before submission
8. Chatbot must gracefully handle API errors
9. No placeholder text in production — use real copy from the content guide
10. Test on Chrome, Firefox, Safari, and mobile browsers

---

## ⚠️ Mistakes to Never Repeat

### 1. Creating visual assets without checking brand guidelines first
**What happened:** OG image was created using orange (`#f97316`) and purple — completely wrong colours. The actual brand uses blue (`#2563EB`) primary, amber (`#F59E0B`) accent, and navy (`#0B1121`) background. A chili 🌶 emoji was used as the logo instead of the actual bar chart + trend line logo mark.

**Rule:** Before creating ANY visual asset (OG images, banners, thumbnails, email headers, social graphics, etc.) you MUST:
1. Read `public/brand-assets/brand-guidelines.svg` to confirm the exact colour hex values, logo mark, and typography
2. Cross-check against `src/app/globals.css` CSS variables (`--color-primary`, `--color-accent`, `--color-navy`, etc.)
3. Use the actual logo SVG paths from `public/brand-assets/logo-mark.svg` — never approximate or substitute with an emoji

**Brand colours (locked):**
```
Primary:    #2563EB  (blue-600)
Secondary:  #3B82F6  (blue-500)
Accent:     #F59E0B  (amber)
Navy BG:    #0B1121
Text grad:  linear-gradient(135deg, #2563EB, #3B82F6, #F59E0B)
Logo:       Bar chart bars (blue) + upward trend line arrow (amber)
```

### 2. Triple H1 tags on a single page
**What happened:** HeroSection.tsx had three separate `<h1>` tags (one per line of the stacked headline) to achieve a visual multi-line effect. Google expects exactly one H1 per page.

**Rule:** A page must have exactly ONE `<h1>`. For multi-line visual headlines, use a single `<h1>` with `<span className="block">` for each visual line — never multiple `<h1>` elements.

### 3. A canonical tag in the root layout de-indexed the entire site
**What happened:** `src/app/layout.tsx` had `alternates: { canonical: "https://growthmasala.com" }`. In the Next.js App Router that field is **inherited by every child route**, so `/services`, `/portfolio`, `/blog/*` — every page — served a canonical pointing at the homepage. Google treated all of them as duplicates and indexed none of them. `site:growthmasala.com` returned zero results for months while the sitemap was dutifully submitting ten URLs Google had been told not to index.

**Rule:** never set `alternates.canonical` in the root layout. Every route sets its own relative canonical (`alternates: { canonical: "/services" }`). After any metadata change, verify against **rendered HTML**, not the source file:

```bash
pnpm build && pnpm start
curl -s http://localhost:3000/services | grep -o '<link rel="canonical"[^>]*>'
```

### 4. Trusting a stale TODO instead of grepping the source
**What happened:** `.claude/TODO.md` said the testimonials and case studies were fake placeholders ("Sarah Johnson", "TechStart India"). That had been true in April. By August both files contained real, named clients with live URLs — but the TODO was never updated, and the stale claim got repeated into an SEO audit as a live finding. A grep would have taken five seconds and returned zero matches.

**Rule:** documentation describes the past; code describes the present. Before acting on any claim in `TODO.md`, `updates.md`, or a previous audit — **grep the source and confirm it still holds.** When you find a doc claim that is no longer true, fix the doc in the same pass.

### 5. A theme alias pointing at a variable that did not exist at `:root`

**What happened:** `@theme` declared `--font-heading: var(--font-poppins)` on
`:root`, but `next/font` defines `--font-poppins` on whichever element carries
its class — and that class was on `<body>`. At `:root` the alias referenced an
undefined variable, which makes the custom property guaranteed-invalid, and that
invalid value inherits everywhere. `font-family: var(--font-heading), …` failed
substitution and fell back to Tailwind Preflight's `ui-sans-serif`. **Every
heading and all body copy on the entire site rendered in the OS default font**,
on an agency site that sells web design. It survived months of review because
the theme block reads correctly and the `.font-heading` utility genuinely works
on non-heading elements.

**Rule:** font variables go on `<html>`, not `<body>`. And verify typography in
a real browser, never by reading CSS:

```bash
pnpm build && pnpm start
# then: getComputedStyle(document.querySelector('h1')).fontFamily
```

If that returns `ui-sans-serif`, the brand font is not rendering.

### 6. Checking diffs from feature branches after merging — not the actual files
**What happened:** After merging two feature branches, `git diff main feature/branch` showed large diffs that looked alarming. These diffs were just showing the feature branches as stale/behind main — not indicating missing code. The actual files on main were correct.

**Rule:** After merging, verify the actual state of files on main directly (`grep` / `Read` the files) rather than reading cross-branch diffs which can be misleading.
