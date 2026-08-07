import type { PricingAddOn, PricingTier } from "@/types";

/**
 * Published pricing — single source of truth.
 *
 * ⚠️ Prices behave like NAP data. Once published they appear here, in the
 * homepage UI, in the `Offer` JSON-LD emitted by `src/lib/schema.ts`, and in the
 * chatbot's system prompt. Changing a number means changing it here and nowhere
 * else — every surface reads from this file. Never hardcode a rupee figure in a
 * component.
 *
 * Rationale for the ladder is documented in `docs/homepage-redesign-plan.md` §5.
 * The short version: our entry tier is roughly double the nearest competitor's,
 * and that gap is earned by the copywriting and local presence bullets, not by
 * asserting quality.
 */

/** Rupee formatting, Indian digit grouping. Used by UI and schema alike. */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/** Block 1 — website builds, charged once. */
export const websiteTiers: PricingTier[] = [
  {
    id: "starter",
    name: "Starter",
    audience: "For a business with nothing online yet",
    amount: 9999,
    billing: "one-time",
    features: [
      "5-page website, designed for you — not a template",
      "Website copy written for you",
      "Mobile-responsive, loads in under 2 seconds",
      "WhatsApp enquiry button + contact form",
      "On-page SEO basics",
      "30 days post-launch support",
    ],
    ctaLabel: "Start with Starter",
  },
  {
    id: "growth",
    name: "Growth",
    audience: "For a business that wants to be found",
    amount: 18999,
    billing: "one-time",
    popular: true,
    features: [
      "Everything in Starter, plus:",
      "Up to 10 pages + blog",
      "Full on-page SEO and schema markup",
      "Google Analytics + Search Console setup",
      "One landing page built for ads",
      "90 days support",
    ],
    ctaLabel: "Get the Growth plan",
  },
  {
    id: "premium",
    name: "Premium",
    audience: "For a business ready to sell online",
    amount: 24999,
    billing: "one-time",
    features: [
      "Everything in Growth, plus:",
      "Online store, up to 100 products",
      "Razorpay payment gateway",
      "Admin panel — manage products and orders yourself",
      "WhatsApp alerts on every order",
      "6 months support",
    ],
    ctaLabel: "Talk about Premium",
  },
];

/** Block 2 — ongoing care, charged monthly. */
export const carePlans: PricingTier[] = [
  {
    id: "care-basic",
    name: "Care Basic",
    audience: "Keep the lights on",
    amount: 1499,
    billing: "monthly",
    features: [
      "Monthly backups",
      "Security and uptime monitoring",
      "2 content updates a month",
      "Email support",
    ],
    ctaLabel: "Add Care Basic",
  },
  {
    id: "care-pro",
    name: "Care Pro",
    audience: "For a site that changes often",
    amount: 3499,
    billing: "monthly",
    popular: true,
    features: [
      "Weekly backups",
      "8 content updates a month",
      "Plugin and dependency updates",
      "Speed checks and priority support",
    ],
    ctaLabel: "Add Care Pro",
  },
  {
    id: "care-commerce",
    name: "Care Commerce",
    audience: "For stores taking live orders",
    amount: 5999,
    billing: "monthly",
    features: [
      "Daily backups",
      "Unlimited minor updates",
      "Payment gateway monitoring",
      "Bug fixes + monthly report",
    ],
    ctaLabel: "Add Care Commerce",
  },
];

/**
 * Add-ons. Explicit pricing here prevents scope arguments later.
 *
 * Google Business Profile is sold rather than bundled (owner decision,
 * 2026-08-06). It is the strongest single local ranking factor, so it sells
 * itself on the call and creates a second recurring line beside Care.
 */
export const addOns: PricingAddOn[] = [
  { name: "Google Business Profile setup", amount: 2999, billing: "one-time" },
  { name: "Google Business Profile management", amount: 1999, billing: "monthly" },
  { name: "Extra page", amount: 1000, billing: "one-time" },
  { name: "Extra 50 products", amount: 1000, billing: "one-time" },
  { name: "Logo design", amount: 3500, billing: "one-time" },
  { name: "AI chatbot on your site", amount: 7999, billing: "one-time" },
];

/**
 * Shown directly beneath the tables. Vague pricing reads as evasive, and every
 * one of these is a question we would otherwise field on the phone.
 */
export const pricingFinePrint: string[] = [
  "All prices exclude GST.",
  "Domain and hosting are charged at cost — we never mark them up.",
  "Ad spend is billed separately by Meta or Google, never through us.",
  "Anything outside these packages is quoted as a fixed price before work starts.",
];
