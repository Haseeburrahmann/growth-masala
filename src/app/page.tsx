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
 * Backgrounds alternate so an eleven-section scroll has landmarks instead of
 * running together:
 *
 *   navy · navy | light · light | navy | light · NAVY · light | light · light
 *
 * Why-us is the capitalised one. It used to be light, which left Portfolio,
 * Why-us and Pricing as three consecutive pale sections in the back half of the
 * page — the stretch where a reader is most likely to give up.
 *
 * That alternation carries the navy boundaries on its own. It does nothing for
 * the light-on-light ones: #F8FAFC meeting #FFFFFF is invisible, so Problem →
 * Services and Pricing → FAQ read as one continuous white field with an
 * unexplained gap in it. <SectionDivider /> marks those two seams and only
 * those two — a divider at every boundary would become page furniture, and the
 * navy edges do not need help.
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
      <SectionDivider tone="surface" />
      <ServicesPreview />
      <ProcessSection />
      <PortfolioPreview />
      {/* No divider after Why-us any more: that section went navy, so the
          boundary into Pricing is now a change of room and needs no marker. */}
      <WhyUsSection />
      <PricingSection />
      <SectionDivider />
      <FAQSection
        faqs={generalFaqs}
        intro="Everything people usually ask before getting in touch. If your question isn't here, message us — we'll answer it straight."
      />
      <CTASection />
    </>
  );
}
