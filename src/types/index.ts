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
  /** Abstract group artwork. Decorative — every usage needs empty alt. */
  image: string;
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
  category: "website" | "marketing" | "social-media" | "web-app";
  description: string;
  image: string;
  link?: string;
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
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
