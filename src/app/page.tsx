import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import FAQSection from "@/components/ui/FAQSection";
import { generalFaqs } from "@/data/faqs";
import { buildFaqSchema } from "@/lib/schema";

// Below-the-fold sections load on demand. TrustBar stays static: it sits
// immediately under the hero, weighs almost nothing, and a credibility strip
// that pops in late is worse than no strip at all.
const ProblemSection = dynamic(() => import("@/components/home/ProblemSection"));
const ServicesPreview = dynamic(() => import("@/components/home/ServicesPreview"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const PortfolioPreview = dynamic(() => import("@/components/home/PortfolioPreview"));
const WhyUsSection = dynamic(() => import("@/components/home/WhyUsSection"));
const PricingSection = dynamic(() => import("@/components/home/PricingSection"));
const CTASection = dynamic(() => import("@/components/home/CTASection"));

// The homepage inherits its title and description from the root layout; it only
// needs to claim its own canonical so it isn't covered by a route-level one.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqSchema = buildFaqSchema(generalFaqs);

/**
 * Homepage section order.
 *
 * The sequence is the argument, and each section has exactly one job:
 *
 *   1 Hero        — what we do, for whom, where
 *   2 Trust bar   — named clients, before any claim needs believing
 *   3 Problem     — the reader's situation (no mention of us)
 *   4 Services    — the three headline groups (Custom Software lives on /services)
 *   5 Process     — de-risking + the page's soft CTA
 *   6 Projects    — proof, each with its client's quote
 *   7 Why us      — comparison against the real alternatives
 *   8 Pricing     — value established, now the number
 *   9 FAQ         — last objections
 *  10 CTA         — one ask
 *
 * Sections 3, 5 and 7 must stay distinct: 3 is about the reader, 5 is mechanism,
 * 7 is comparison. The moment two of them make the same argument the page goes
 * soft, which is the usual failure mode of a homepage this long.
 *
 * Backgrounds, hero downwards:
 *
 *   navy · navy | surface · white · surface · white | NAVY | white · surface | NAVY
 *
 * Two dark rooms below the hero, not three. Process used to be navy as well,
 * which made the mid-page anchor and the comparison anchor the same gesture
 * twice within one screen of each other; moving Process to `surface` leaves
 * Why-us as the only dark block in the middle of the page and the closing CTA
 * as the one that ends it. The page now opens and closes dark, and the navy CTA
 * runs straight into the navy footer without a seam that needs explaining.
 *
 * Below the hero every seam is now a tone change, so the page carries no
 * drawn dividers at all. It used to: two `<SectionDivider />` hairlines marked
 * Problem → Services and Pricing → FAQ, the two places where the alternation
 * had nothing to say. Both are gone on client instruction. Problem moved from
 * white to `surface` (its cards went white to compensate) which makes the first
 * seam visible on its own, and the second seam was already a tone change —
 * white into surface — that simply needed no help.
 *
 * Keep it that way: if a section's background changes and two same-tone blocks
 * end up adjacent, move one of them, do not draw a line between them.
 */
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection />
      <TrustBar />
      <ProblemSection />
      <ServicesPreview />
      <ProcessSection />
      <PortfolioPreview />
      {/* No divider either side of Why-us: it is navy, so both boundaries are
          already a change of room. */}
      <WhyUsSection />
      <PricingSection />
      <FAQSection
        faqs={generalFaqs}
        eyebrow="Straight answers"
        heading="The questions people actually ask us"
        intro="Including the awkward ones. If yours is not here, message us on WhatsApp."
        image="/images/sections/hero-owner.webp"
        imageAlt="A Mahabubnagar shop owner checking his phone behind the counter"
      />
      <CTASection />
    </>
  );
}
