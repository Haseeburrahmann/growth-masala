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

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
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
