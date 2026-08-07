import type { FaqItem } from "@/lib/schema";
import { address, business } from "@/data/business";
import { websiteTiers, carePlans, formatPrice } from "@/data/pricing";

/**
 * FAQ content shown on the homepage and rendered as FAQPage schema.
 *
 * IMPORTANT: every answer here must be literally true. FAQ schema is a
 * high-trust surface — Google pulls it into rich results and AI Overviews
 * verbatim. Do not add timelines, client counts, or guarantees here unless the
 * business has confirmed them.
 *
 * Prices are read from `src/data/pricing.ts` rather than typed as literals, so
 * an answer can never quote a figure the pricing section does not show. If you
 * add a price here, interpolate it — never hardcode the number.
 *
 * TODO(owner): a typical delivery timeline is still the highest-value missing
 * answer. Competitors publish one and buyers search for it, but it needs your
 * confirmation before it can go in a high-trust surface like this.
 */
export const generalFaqs: FaqItem[] = [
  {
    question: "Where is Growth Masala based?",
    answer: `Growth Masala is a digital marketing agency based in ${address.locality}, ${address.region}. We work with businesses across ${address.locality} district, Hyderabad, and the rest of India — most of our work is delivered remotely, and we meet locally when a project calls for it.`,
  },
  {
    question: "What services does Growth Masala offer?",
    answer:
      "We offer website development, social media growth, performance marketing (Meta and Google ads), SEO, and AI and automation. Most clients start with one service and add others as they grow.",
  },
  {
    question: "Do you work with small and local businesses?",
    answer: `Yes — most of our clients are local businesses, schools, and service providers in and around ${address.locality} and Hyderabad. We have built websites for schools, mobile retail chains, and construction firms.`,
  },
  {
    question: "How much does a website cost?",
    answer: `Our website packages start at ${formatPrice(websiteTiers[0].amount)} for a five-page site, ${formatPrice(websiteTiers[1].amount)} for a larger SEO-focused build, and ${formatPrice(websiteTiers[2].amount)} for an online store with payments. All prices exclude GST. Anything outside those packages is quoted as a fixed price before work starts, and the consultation is free.`,
  },
  {
    question: "What is not included in the price?",
    answer:
      "GST is charged on top of the listed price. Domain and hosting are billed at cost with no markup from us. Advertising budget is paid directly to Meta or Google, never through us. Google Business Profile setup is a separate add-on.",
  },
  {
    question: "Do I have to pay anything monthly?",
    answer: `No. The website packages are one-time payments. Ongoing care — backups, security, and content updates — is optional and starts at ${formatPrice(carePlans[0].amount)} a month. You can decline it and the site remains entirely yours.`,
  },
  {
    question: "What is included in a website project?",
    answer:
      "Every website we build includes responsive design for mobile and desktop, an SEO-optimised page structure, performance optimisation, SSL and hosting setup, deployment, and 30 days of post-launch support.",
  },
  {
    question: "How do I get started?",
    answer: `Call or WhatsApp us on ${business.phoneDisplay}, email ${business.email}, or send a message through the contact form. We will set up a free consultation to understand what you need before quoting anything.`,
  },
];

/**
 * Builds FAQs for a location landing page. Keeps the answers grounded in the
 * same facts as the general set, with the city swapped in.
 */
export function buildLocationFaqs(city: string, serviceLabel: string): FaqItem[] {
  return [
    {
      question: `Do you offer ${serviceLabel.toLowerCase()} in ${city}?`,
      answer: `Yes. Growth Masala is based in ${address.locality}, ${address.region}, and we work with businesses in ${city} and the surrounding area. Get in touch for a free consultation.`,
    },
    {
      question: `How much does ${serviceLabel.toLowerCase()} cost in ${city}?`,
      answer: `Website packages start at ${formatPrice(websiteTiers[0].amount)} and go up to ${formatPrice(websiteTiers[2].amount)} for an online store, excluding GST. Marketing, SEO, and software work varies too much to list a flat rate, so we scope it and send a fixed quote before any work begins.`,
    },
    {
      question: `Why choose a local agency in ${city} over a large agency elsewhere?`,
      answer: `A local agency understands the market you actually sell into — the customers, the competition, and the seasons that matter. We are based in ${address.locality}, not a metro office running a template, so you get direct access to the people doing the work.`,
    },
    {
      question: "How do I get a quote?",
      answer: `Call or WhatsApp ${business.phoneDisplay}, email ${business.email}, or use the contact form. We respond within 24 hours and the first consultation is free.`,
    },
  ];
}
