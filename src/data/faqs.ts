import type { FaqItem } from "@/lib/schema";
import { address, business } from "@/data/business";

/**
 * FAQ content shown on the homepage and rendered as FAQPage schema.
 *
 * IMPORTANT: every answer here must be literally true. FAQ schema is a
 * high-trust surface — Google pulls it into rich results and AI Overviews
 * verbatim. Do not add pricing, timelines, client counts, or guarantees here
 * unless the business has confirmed them.
 *
 * TODO(owner): the two highest-value additions once you're ready to commit to
 * them publicly are (1) a real starting price range and (2) a typical delivery
 * timeline. Competitors publish both; we currently publish neither, and it is
 * the most common question buyers search for.
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
    answer:
      "It depends on the scope — a single-page site for a local business and a multi-section site with an admissions or enquiry portal are very different builds. Send us your requirements and we will give you a fixed quote and timeline before any work starts. The consultation is free.",
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
      answer:
        "Cost depends entirely on scope, so we do not publish a flat rate. Tell us what you are trying to achieve and we will send a fixed quote and timeline before any work begins.",
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
