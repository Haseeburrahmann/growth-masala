# Growth Masala — v2 Plan & Checklist

> Branch: `feature/v2-redesign` (never commit v2 work to `main` until approved & merged)
> Created: 2026-06-17 · Owner: Haseeb

## Locked decisions
- **Keep** brand palette + fonts (blue `#2563EB` / amber `#F59E0B` / navy `#0B1121`, Poppins + Inter). Layouts **may** change.
- **New service:** one **"AI & Automation"** pillar (with sub-items), not separate cards.
- **No public pricing page** — stay on "free consultation / custom quote".
- **Add to portfolio:** Triveni Balavikas Central School (ICSE school, Bengaluru).
- Work on a branch, QA on Vercel preview, merge only after sign-off.

## Why v2 (root problem this fixes)
The service list is **duplicated in 6 files** and has already drifted — the chatbot sells **SEO**, but the Services page and Contact form don't list it. Adding AI services the naive way would deepen the drift. v2 **centralizes the service list** so every surface (homepage, services page, chatbot prompt, chat widget chips, lead picker, contact dropdown) reads one source.

## Final service lineup (5)
1. Website Development
2. Social Media Growth
3. Performance Marketing
4. SEO  *(was sold by bot only — now first-class)*
5. **AI & Automation** *(new)* — sub-items:
   - AI Chatbots (website + WhatsApp, 24/7 FAQ + lead capture)
   - WhatsApp CRM & Automation (Business API, auto-replies, broadcasts, pipeline)
   - AI Automation / Workflows (form → AI qualifies → CRM → auto follow-up)

## Workstreams & status
- [x] WS5 — Triveni screenshot placed at `public/images/portfolio/triveni-balavikas.jpg`
- [ ] WS1 — Centralize service data model (`slug`, `deliverables`, `subItems`); add SEO + AI pillar in `src/data/services.ts`
- [ ] WS2 — Services page reads deliverables from data; render AI sub-items; fix `lg:direction-rtl` bug
- [ ] WS3 — AI pillar content + "See our AI in action" homepage band (live Masala Bot is the demo)
- [ ] WS4 — Wire services everywhere: `chatbot.ts`, `ChatWidget.tsx` (chips + lead picker), `ContactForm.tsx` dropdown
- [ ] WS5 — Add Triveni entry to `src/data/portfolio.ts`
- [ ] WS6 — Replace fake case studies with REAL projects (Freewings, Kings Mobile, Triveni); honest results only. Testimonials: HOLD until real client quotes are supplied (do not fabricate)
- [ ] QA — `pnpm build` passes, manual check on preview

## Reference insights (2026 AI-agency landscape)
- WhatsApp-first: ~98% open rates; productize "WhatsApp lead-gen + AI qualify + CRM + auto follow-up".
- Lead with **"AI agent, not just a chatbot"** (3–5× conversion vs scripted bots).
- India tooling is cheap/mature (AiSensy ₹999+, Interakt, Gallabox) → SMB clients can afford it; resell setup + management.
- Sell phased: basic automation → chatbot → full AI agent.

## Integrity guardrails (do not break)
- No fabricated metrics, quotes, or client claims. Case-study "results" must be truthful (capabilities delivered) until real numbers exist.
- Don't invent testimonials attributed to real people/schools.

## Files touched (map)
- `src/data/services.ts`, `src/types/index.ts` — model + content
- `src/app/services/page.tsx` — data-driven deliverables + AI block + bug fix
- `src/components/home/ServicesPreview.tsx` + homepage — AI emphasis / demo band
- `src/lib/chatbot.ts`, `src/components/chatbot/ChatWidget.tsx`, `src/components/forms/ContactForm.tsx` — wire services
- `src/data/portfolio.ts` — Triveni
- `src/app/case-studies/page.tsx` — real case studies
