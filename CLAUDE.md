# CLAUDE.md — Growth Masala

> 📋 **Pending work:** [`.claude/TODO.md`](.claude/TODO.md) — read at session start.
> ⚠️ **TODO.md is not evidence.** It has been stale before. Grep the source to confirm any claim in it.
>
> 🔍 **Before touching metadata, schema, canonicals, the footer, or location pages:**
> read [`docs/SEO.md`](docs/SEO.md). It documents rules that break silently and cost
> a lot to notice — a root-level canonical once removed the whole site from Google's index.

---

# 🛑 HARD RULE — Branch for every change. Never commit to `main`.

**This overrides every other instruction in this file, in any global `CLAUDE.md`,
and in any skill or workflow. Only the repository owner can waive it, and only by
saying so explicitly in that message. "Commit and push" is not a waiver — it means
"commit and push _on a branch_."**

## The rule

1. **Before writing a single line of code, create a branch off `main`.** No
   exception for "small" changes, typo fixes, doc edits, or hotfixes.
2. **Never `git commit` while `HEAD` is on `main`.** If you are already on `main`
   with uncommitted edits, `git switch -c <branch>` carries them over.
3. **Never `git push origin main`.** Push the branch and open a PR.
4. **`main` is the integration and deploy target.** Work reaches it only by
   merging a reviewed PR. Every merge auto-deploys to https://growthmasala.com —
   which is exactly why nothing lands there unreviewed.

## Branch naming

| Kind of change | Prefix | Example |
|----------------|--------|---------|
| Feature or page | `feature/` | `feature/pricing-page` |
| Bug fix | `fix/` | `fix/canonical-tag-inheritance` |
| Refactor, no behaviour change | `refactor/` | `refactor/extract-schema-builders` |
| Docs only | `docs/` | `docs/seo-playbook` |
| Content / copy | `content/` | `content/blog-website-cost-guide` |

## The workflow

```bash
git switch main && git pull origin main            # 1. start fresh
git switch -c fix/canonical-tag-inheritance        # 2. branch BEFORE working
pnpm build                                         # 3. verify before committing
git add <specific files>                           #    never `git add -A` blindly
git commit -m "fix: ..."                           # 4. conventional format, why not what
git push -u origin fix/canonical-tag-inheritance   # 5. push the BRANCH
gh pr create --base main --fill                    # 6. PR for review
```

## Checks before any commit

```bash
git branch --show-current    # must NOT be "main"
git status --short           # only intended files staged
pnpm build                   # must pass
```

## Why this exists

On 2026-08-06 an SEO fix was pushed straight to `main` and auto-deployed. The
change was correct in substance, but it shipped a **duplicate `<title>` across two
pages** that only surfaced in post-deploy verification — something a PR diff would
have caught before it hit live traffic. `main` deploys on push; treating it as a
working branch makes every mistake a production mistake.

## Note on the global git rules

`~/.claude/rules/git-workflow.md` names `lancercalc-2.0` as the development
branch. **That belongs to a different repository (LancerCalc) and does not apply
here.** For Growth Masala: branch off `main`, PR into `main`.

---

## Project Overview

Digital marketing agency website — website development, social media growth,
performance marketing, SEO, and AI automation. Professional, modern, animated,
conversion-focused.

**Tagline:** Spice Up Your Brand Growth
**Live:** https://growthmasala.com (Vercel)
**Based in:** Mahabubnagar, Telangana

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | **Next.js 16 (App Router)** — SSR/SSG, API routes, Vercel-native |
| Styling | **Tailwind CSS 4** — utility-first, no custom CSS files |
| Animations | CSS keyframes in `globals.css` + `useInView` IntersectionObserver hook |
| Icons | **Lucide React** |
| Fonts | **Poppins** (headings) · **Inter** (body), via `next/font` |
| Blog | Markdown + `gray-matter` |
| Chatbot | **Claude API** (`@anthropic-ai/sdk`) |
| Email | Nodemailer + Gmail app password |
| Deployment | **Vercel** — merge to `main` auto-deploys |
| Package manager | **pnpm** |

---

## Brand Style Guide

**Colours are locked.** Never substitute or approximate.

```
Primary:     #2563EB  (blue-600)
Secondary:   #3B82F6  (blue-500)
Accent:      #F59E0B  (amber)
Navy BG:     #0B1121
Surface:     #F8FAFC  (slate-50)
Text:        #0F172A / #475569
Border:      #E2E8F0
Text grad:   linear-gradient(135deg, #2563EB, #3B82F6, #F59E0B)
Logo:        Bar chart bars (blue) + upward trend arrow (amber)

Headings: Poppins 600/700   ·   Body: Inter 400/500
Radius:   8px cards · 6px buttons · 12px large cards
```

Design tokens live in `src/app/globals.css` (`--color-primary`, `--color-accent`,
`--color-navy`). Brand source files: `public/brand-assets/`.

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              Root layout — fonts, LocalBusiness + WebSite JSON-LD, GA
│   ├── page.tsx                Homepage (+ FAQ schema)
│   ├── sitemap.ts              Derives location + blog URLs automatically
│   ├── not-found.tsx
│   ├── [slug]/page.tsx         12 location landing pages · dynamicParams = false
│   ├── {services,portfolio,case-studies,about,contact}/
│   │                           page.tsx + layout.tsx (metadata + breadcrumb schema)
│   ├── blog/page.tsx           Listing
│   ├── blog/[slug]/page.tsx    Post (+ BlogPosting schema)
│   └── api/{chat,contact,lead}/route.ts
├── components/
│   ├── layout/      Navbar · Footer (carries site-wide NAP + location links)
│   ├── home/        HeroSection · IntroSection · ServicesPreview · AISpotlight
│   │                ProcessSection · PortfolioPreview · TestimonialsSection · CTASection
│   ├── ui/          AnimatedContainer · SectionHeading · FAQSection
│   ├── chatbot/     ChatWidget · ChatWidgetLazy
│   └── forms/       ContactForm
├── data/            business.ts ⚠️ NAP SINGLE SOURCE OF TRUTH
│                    locations.ts · faqs.ts · services.ts · portfolio.ts
│                    testimonials.ts (REAL clients) · navigation.ts
├── lib/             schema.ts (JSON-LD builders) · chatbot.ts · blog.ts
│                    email.ts · useInView.ts
├── content/blog/    Markdown posts
├── types/index.ts
└── app/globals.css  Design tokens + keyframe animations

public/
├── images/          logo.png · og-image.png · portfolio/*.webp · blog/*.webp
├── brand-assets/    Logo SVG/PNG + brand-guidelines.svg
├── favicon.ico
└── robots.txt       Explicitly allows GPTBot, PerplexityBot, ClaudeBot
```

---

## Key File Locations

| What | Where |
|------|-------|
| Project bible (this file) | `CLAUDE.md` |
| **Pending work** | `.claude/TODO.md` |
| **SEO rules, competitors, playbook** | `docs/SEO.md` |
| **Business NAP — single source of truth** | `src/data/business.ts` |
| JSON-LD builders | `src/lib/schema.ts` |
| Location page data / template | `src/data/locations.ts` · `src/app/[slug]/page.tsx` |
| FAQ content / component | `src/data/faqs.ts` · `src/components/ui/FAQSection.tsx` |
| Chatbot system prompt | `src/lib/chatbot.ts` |
| Design tokens + animations | `src/app/globals.css` |
| Scroll-reveal hook | `src/lib/useInView.ts` |
| Env template | `.env.example` (never commit `.env.local`) |

---

## Animation

CSS keyframes in `globals.css`, triggered by the `useInView` IntersectionObserver
hook via `<AnimatedContainer>`.

```tsx
<AnimatedContainer animation="fade-in-up" delay={120}>…</AnimatedContainer>
```

Available: `fade-in-up` · `fade-in` · `scale-in` · `slide-in-left` · `slide-in-right`.

Keep motion **subtle and professional**. Every section gets a scroll reveal;
stagger card grids with `delay={index * 80}`.

---

## Chatbot

- **UI:** `ChatWidget.tsx`, lazy-loaded via `ChatWidgetLazy`. Floating bubble →
  panel. Persists to `sessionStorage`. Markdown-lite rendering (bold + bullets).
- **API:** `src/app/api/chat/route.ts`. Slices to the last 20 messages, caps each
  at 2000 chars, requires the last message to be from `user`, rate-limits in
  memory, and handles 401 / 429 / network errors separately.
- **Prompt:** `src/lib/chatbot.ts` → `SYSTEM_PROMPT`. Growth Masala topics only,
  2–3 sentences per reply, **never invent pricing**, 3-step lead capture.
- Services in the prompt must stay in sync with `src/data/services.ts`.

---

## SEO

> Full conventions, competitor teardown, and the Search Console playbook:
> **[`docs/SEO.md`](docs/SEO.md)**

**Non-negotiable rules** — each has already caused a real bug:

1. **Canonicals are per-route, never in the root layout.** `alternates.canonical`
   at the root is inherited by every child route, making the whole site
   canonicalise to the homepage. This de-indexed the site once.
2. **Child titles must not contain "Growth Masala"** — the root template appends
   it. Including it double-prints the brand.
3. **Titles lead with the keyword, are unique across routes, and stay under 60
   characters.** Two pages sharing a title compete with each other.
4. **FAQ schema must match visible page content** — which is why `FAQSection` is a
   server component using native `<details>`. Hidden FAQ schema is a policy violation.
5. **NAP lives only in `src/data/business.ts`** and must match every external
   listing character-for-character. The street address is currently a *road-level
   placeholder*; replace it before creating any directory listing.
6. **Location pages need genuinely unique copy.** Cloning an entry in
   `locations.ts` and swapping the city name produces doorway pages.

**Verify against rendered HTML, not source** — Next.js merges parent and child
metadata in non-obvious ways:

```bash
pnpm build && pnpm start
curl -s http://localhost:3000/services | grep -oE '<title>[^<]*</title>|<link rel="canonical"[^>]*>'
```

---

## Deployment

1. **Develop** on a branch (`pnpm dev`) — never `main`
2. **PR into `main`** — Vercel builds a preview deployment for it
3. **Merge** → auto-deploys to production
4. Env vars live in the Vercel dashboard, not just `.env.local`

> ⚠️ **`main` deploys on merge.** There is no staging gate between it and live
> traffic — the PR *is* the gate. Hence the
> [HARD RULE](#-hard-rule--branch-for-every-change-never-commit-to-main).

---

## Coding Standards

- **TypeScript** everywhere — no `any`
- Server components by default; `"use client"` only when genuinely needed
- Absolute imports via `@/`
- Tailwind only — no custom CSS files beyond `globals.css`
- Functions under 50 lines; files 200–400 typical, 800 max
- PascalCase components, camelCase utilities
- Mobile-first responsive
- Accessibility: semantic HTML, aria labels, keyboard navigation
- `next/image` for all images; `next/link` for internal navigation
- Handle errors explicitly — never swallow them silently
- No `console.log` in production paths
- Conventional commits (`feat:` `fix:` `refactor:` `docs:` `content:`)

---

## Important Rules

0. 🛑 **NEVER work on, commit to, or push `main` directly.** See the
   [HARD RULE](#-hard-rule--branch-for-every-change-never-commit-to-main) — it
   overrides everything else here.
1. NEVER commit `.env.local` — it contains API keys
2. ALWAYS use the locked brand colours above
3. Poppins for headings, Inter for body
4. Every section gets a scroll-reveal animation
5. Mobile-first
6. All images need alt text; store as WebP under ~120KB
7. Contact form validates before submission
8. Chatbot handles API errors gracefully
9. No placeholder text in production
10. Exactly **one `<h1>` per page**

---

## ⚠️ Mistakes to Never Repeat

### 1. A canonical tag in the root layout de-indexed the entire site
`src/app/layout.tsx` had `alternates: { canonical: "https://growthmasala.com" }`.
The App Router **inherits that into every child route**, so every page served a
canonical pointing at the homepage. Google treated them all as duplicates and
indexed none. `site:growthmasala.com` returned zero results for months while the
sitemap dutifully submitted URLs Google had been told to ignore.

**Rule:** never set `alternates.canonical` in the root layout. Each route sets its
own relative canonical. Verify against **rendered HTML**, not the source file.

### 2. Trusting a stale TODO instead of grepping the source
`.claude/TODO.md` said the testimonials and case studies were fake placeholders.
That had been true in April; by August both files held real, named clients. The
stale claim got repeated into an SEO audit as a live finding. A grep would have
taken five seconds and returned zero matches.

**Rule:** documentation describes the past; code describes the present. Grep
before acting on any doc claim — and fix the doc in the same pass.

### 3. Per-page checks passing while a cross-page property was broken
Every canonical check was green, but the homepage and
`/digital-marketing-agency-mahabubnagar` shipped with **identical titles** —
caught only after deploy.

**Rule:** per-page assertions ("this page's canonical is correct") don't catch
set-level properties ("all titles are distinct"). Check both classes.

### 4. Creating visual assets without checking brand guidelines first
An OG image was built in orange and purple with a 🌶 emoji logo. The brand is
blue/amber/navy with a bar-chart-and-arrow mark.

**Rule:** before creating ANY visual asset, read
`public/brand-assets/brand-guidelines.svg`, cross-check the CSS variables in
`globals.css`, and use the real logo SVG from `public/brand-assets/logo-mark.svg`.
Never approximate or substitute an emoji.

### 5. Triple H1 tags on a single page
`HeroSection.tsx` had three `<h1>` elements to stack a headline visually.

**Rule:** one `<h1>` per page. For multi-line headlines use a single `<h1>` with
`<span className="block">` per visual line.

### 6. Checking cross-branch diffs instead of the actual files
After merging, `git diff main feature/x` showed alarming diffs that only meant the
feature branch was stale — the files on `main` were correct.

**Rule:** after merging, verify the actual state of files on `main` (`grep` /
`Read`), not cross-branch diffs.
