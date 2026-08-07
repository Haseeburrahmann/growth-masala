import type { CaseStudy } from "@/types";

/**
 * The three projects written up in full on /case-studies.
 *
 * These are real Growth Masala clients with live URLs — verify before editing,
 * the same rule that applies to `testimonials.ts`.
 *
 * This data used to live inside `src/app/case-studies/page.tsx`, which meant the
 * page could not be a server component and the content could not be reused. It
 * is here now for the same reason `portfolio.ts` and `services.ts` are.
 *
 * ── On the missing numbers ────────────────────────────────────────────────
 *
 * Every `outcome` is undefined. That is the honest state: nobody has measured
 * enquiries, admissions, or traffic for these clients, so there is nothing true
 * to put there. The earlier version of this page filled the gap with "Live",
 * "1-tap" and "100% Mobile Responsive" set as if they were KPIs.
 *
 * Getting one real number from one client is the single highest-value content
 * task left on this site (see `.claude/TODO.md`). When it arrives, set
 * `outcome` on that study — the card already has the treatment for it.
 *
 * Each study is a subset of `portfolio.ts`, so the two files name the same
 * clients. That is intentional: /portfolio answers "what have you built", and
 * /case-studies answers "how did you approach it". Keep the client names and
 * image paths in step between them.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "freewings-school",
    client: "Freewings School",
    category: "Website · Education",
    location: "Telangana",
    link: "https://freewingsschool.com",
    image: "/images/portfolio/freewings.webp",
    challenge:
      "Freewings is a pre-primary and upper-primary school in Telangana with a real campus, real teachers, and no way for a parent to find any of that online. Admissions research now starts on a phone — a parent searches the school name, finds nothing, and moves to the school that has a website. Word of mouth was carrying the entire admissions funnel.",
    solution:
      "We built a mobile-first school site around the two things a parent actually wants before they will visit: what the place looks like, and who is running it. A photo gallery of the campus and activities, the principal's message in their own words, and a WhatsApp button on every screen so an enquiry costs one tap instead of a phone call to a landline nobody answers at 9pm.",
    delivered: [
      "A site that ranks for the school's own name, so a parent searching it finds the school rather than nothing",
      "Campus and activity gallery — the objection most parents raise before booking a visit",
      "Principal's message and school profile, written for parents rather than for a brochure",
      "One-tap WhatsApp enquiries from any page, on the device parents actually research on",
    ],
    gradient: "from-primary/20 to-secondary/10",
  },
  {
    slug: "kings-mobile-world",
    client: "Kings Mobile World",
    category: "Website · Local Retail",
    location: "Hyderabad",
    link: "https://kingsmobileworld.in",
    image: "/images/portfolio/kings-mobile.webp",
    challenge:
      "Kings Mobile World runs mobile repair across four branches in Hyderabad and had no website at all. Phone repair is a trust purchase — someone is handing over a device with their photos, their banking apps, and their contacts on it — and there was nothing online to establish that trust. Four branches also meant customers had no way to find out which one was nearest.",
    solution:
      "A conversion-focused business site that leads with the things that make a repair shop credible: how many branches, how many repairs, which brands they handle. The brand carousel and repair stats sit above the fold because they answer the trust question before the visitor has to ask it, and every branch has its own details with WhatsApp lead capture attached.",
    delivered: [
      "All four Hyderabad branches listed with their own details, so customers can find the nearest one",
      "Repair stats and a brand carousel positioned as the trust proof, above the fold",
      "WhatsApp-driven enquiry capture — the channel this customer base already uses",
      "An online storefront that holds up when someone searches the shop name before walking in",
    ],
    gradient: "from-accent/20 to-orange-500/10",
  },
  {
    slug: "triveni-balavikas",
    client: "Triveni Balavikas Central School",
    category: "Website · Education",
    location: "Bengaluru",
    link: "https://trivenibalavikascentralschool.in",
    image: "/images/portfolio/triveni-balavikas.webp",
    challenge:
      "Triveni Balavikas is an ICSE school covering Grades I–VIII in Bengaluru, competing in a city where every established school already has a polished site. A thin presence is worse than none in that market — it signals a school that has not invested. They needed something that could carry curriculum, values, and an admissions process without a parent having to phone the office to understand any of it.",
    solution:
      "A full school site rather than a brochure page. Academics and pedagogy get their own sections so the ICSE curriculum is explained rather than asserted; leadership profiles and parent testimonials do the credibility work; and an admissions enquiry portal moves the first step of the funnel online, where a working parent can complete it at 10pm.",
    delivered: [
      "Admissions enquiry portal — the first funnel step moved off the phone and onto the site",
      "Academics and pedagogy pages that explain the ICSE curriculum for Grades I–VIII",
      "Leadership profiles and parent testimonials, the two credibility signals this market checks",
      "School-life gallery and FAQs, plus WhatsApp contact for parents mid-decision",
    ],
    gradient: "from-violet-500/20 to-fuchsia-500/10",
  },
];
