export interface ServiceSubItem {
  title: string;
  description: string;
}

/**
 * The four customer-intent groups the homepage presents.
 *
 * Grouping is a presentation layer laid *on top of* the flat `services` array —
 * it never replaces slugs. `locations.ts` references services by slug in
 * `featuredServices`, `schema.ts` builds the OfferCatalog from the same array,
 * and `ContactForm` builds its dropdown from it. Renaming or removing a slug
 * breaks all three at once.
 */
export type ServiceGroupId = "web" | "software" | "marketing" | "ai";

export interface ServiceGroup {
  id: ServiceGroupId;
  /** Keyword-bearing — "SEO" and "E-Commerce" earn search traffic, "Grow" does not. */
  title: string;
  /** The outcome, in the customer's words. Goes in the subhead, never the title. */
  outcome: string;
  icon: string;
  /** Group photograph. These used to be abstract artwork, which is why every
   *  usage carried `alt=""`; they are now photographs staged to depict the
   *  service, so they carry real alt text from `imageAlt` below. */
  image: string;
  /** Describes what the photograph shows. Required — these images convey
   *  information the card copy does not, so an empty alt withholds it. */
  imageAlt: string;
  /** Slugs from `services`, in display order. */
  serviceSlugs: string[];
  /** The hero group renders larger and carries the primary border. */
  featured?: boolean;
  /**
   * Kept off the homepage row. The group still exists everywhere else — the
   * services page sells it and the chatbot quotes it — it just does not earn a
   * quarter of the homepage's most-read section.
   */
  homepageHidden?: boolean;
}

export interface Service {
  slug: string;
  icon: string;
  title: string;
  group: ServiceGroupId;
  description: string;
  features: string[];
  deliverables: string[];
  /** Sub-services shown for grouped pillars (e.g. AI & Automation). */
  subItems?: ServiceSubItem[];
}

/**
 * Published prices.
 *
 * `amount` is the number in rupees and is the value used for JSON-LD `Offer`
 * markup — keep it a number, never a pre-formatted string, so schema and UI can
 * never disagree about what something costs.
 */
export interface PricingTier {
  id: string;
  name: string;
  /** Who this tier is for, in the buyer's words. */
  audience: string;
  amount: number;
  /** One-time build vs recurring retainer. Drives the "/month" suffix. */
  billing: "one-time" | "monthly";
  features: string[];
  /** Exactly one tier across a block may set this. */
  popular?: boolean;
  ctaLabel: string;
}

export interface PricingAddOn {
  name: string;
  amount: number;
  billing: "one-time" | "monthly";
}

export interface PortfolioItem {
  title: string;
  category: "website" | "marketing" | "social-media" | "web-app" | "ecommerce";
  description: string;
  image: string;
  link?: string;
  /**
   * One-line card caption. Falls back to `description` when absent.
   *
   * `description` is the full prose record of what was built (2-3 sentences)
   * and is what a reader wants once they care. In a four-up card it only ever
   * appeared line-clamped, which cut it mid-phrase — "academics & pedagogy…" —
   * and read as unfinished on our own portfolio. This is the sentence the card
   * actually wants; the long form stays for anywhere with room for it.
   */
  summary?: string;
  /**
   * Optional per-project label shown on the card, e.g. "School website".
   *
   * `category` drives filtering and must stay a small closed set, but a filter
   * bucket makes a poor caption — six of our eight projects are `website`, so
   * every card read "Website" and the tag row carried no information. When set,
   * this overrides `portfolioCategoryConfig[category].tag` for display only;
   * filtering still keys off `category`.
   */
  tag?: string;
}

/**
 * A /case-studies entry.
 *
 * Note what this type does *not* have: a `results` array of metric/label pairs.
 * The page used to render one, and it held things like `{ metric: "Live",
 * label: "Online Presence" }` — set in 24px bold beside a green trending-up
 * icon, under a heading that said RESULTS. Those are deliverables wearing a
 * KPI's clothes, and the typography did the lying.
 *
 * `delivered` is therefore a plain string list rendered as a checklist. It can
 * only describe what was built, because that is all anyone has verified.
 * `outcome` is the separate, optional field for a real measured number — leave
 * it undefined rather than reaching for something that sounds like one.
 */
export interface CaseStudy {
  /** Stable key for React and for any future per-study route. */
  slug: string;
  client: string;
  /** e.g. "Website · Education". Shown as a pill above the client name. */
  category: string;
  /** Where the client trades. Local-intent copy, and true for each of them. */
  location: string;
  link?: string;
  image: string;
  challenge: string;
  solution: string;
  /** What was built. Verifiable by opening `link` — nothing else belongs here. */
  delivered: string[];
  /**
   * A measured business outcome — enquiries per month, admissions, traffic.
   *
   * Undefined on every study today because no client has shared numbers yet.
   * When one does, set it here and it renders as the only figure on the card.
   * Do not populate this with a capability ("Live", "1-tap"); that is what
   * `delivered` is for, and conflating the two is the bug this type replaced.
   */
  outcome?: string;
  /** Tailwind gradient stops for the card wash. */
  gradient: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  /** The `<h1>` and the listing card headline. Written for a human. */
  title: string;
  /**
   * Optional shorter `<title>`, used when the headline is too long for a SERP.
   *
   * The root layout appends " | Growth Masala", which costs 16 of the ~60
   * rendered characters Google will show. All four launch posts had headlines
   * between 68 and 82 characters once the brand was appended — good headlines,
   * truncated titles.
   *
   * Falls back to `title`. Only set this when `title` genuinely does not fit;
   * two different strings is a maintenance cost, not a default.
   */
  seoTitle?: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
  /**
   * Last substantive revision, ISO date. Feeds `dateModified` on the
   * `BlogPosting` schema. Price guides go stale fast and a post that says 2026
   * in its title while carrying a two-year-old `dateModified` is worse than one
   * that carries none — so set this whenever the figures are re-checked.
   */
  updated?: string;
  /**
   * Optional per-post FAQ, rendered as visible `<details>` *and* as `FAQPage`
   * schema. Both come from this one array, which is the whole point: schema
   * that does not match visible content is a policy violation, not a shortcut
   * (docs/seo-architecture.md §Rule 4).
   */
  faqs?: FaqEntry[];
}

/**
 * Structurally identical to `FaqItem` in `lib/schema.ts`, declared separately
 * because `types/index.ts` must not import from `lib/` — nothing else here does.
 */
export interface FaqEntry {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
