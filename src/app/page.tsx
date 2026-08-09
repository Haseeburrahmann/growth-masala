import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import FAQSection from "@/components/ui/FAQSection";
import SectionDivider from "@/components/ui/SectionDivider";
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
 *   navy · navy | white · white · surface · white | NAVY | white · surface | NAVY
 *
 * Two dark rooms below the hero, not three. Process used to be navy as well,
 * which made the mid-page anchor and the comparison anchor the same gesture
 * twice within one screen of each other; moving Process to `surface` leaves
 * Why-us as the only dark block in the middle of the page and the closing CTA
 * as the one that ends it. The page now opens and closes dark, and the navy CTA
 * runs straight into the navy footer without a seam that needs explaining.
 *
 * The cost is a four-section light run (Problem → Services → Process → Work),
 * which the alternation cannot mark on its own: #F8FAFC meeting #FFFFFF is
 * invisible. <SectionDivider /> marks Problem → Services, and Process's surface
 * ground separates the other two. The second divider marks Pricing → FAQ for
 * the same reason. Those two seams and no others — a divider at every boundary
 * would become page furniture, and the navy edges do not need help.
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
      {/* Both sides of this seam are white now — Problem moved off `surface`
          when it gained its own bordered cards, which would have sat on a
          tinted ground as cards on cards. */}
      <SectionDivider />
      <ServicesPreview />
      <ProcessSection />
      <PortfolioPreview />
      {/* No divider either side of Why-us: it is navy, so both boundaries are
          already a change of room. */}
      <WhyUsSection />
      <PricingSection />
      <SectionDivider />
      <FAQSection
        faqs={generalFaqs}
        eyebrow="Straight answers"
        heading="The questions people actually ask us"
        intro="Including the awkward ones. If yours is not here, message us on WhatsApp."
      />
      <CTASection />
    </>
  );
}
