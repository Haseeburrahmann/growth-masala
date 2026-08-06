import dynamic from "next/dynamic";
import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";
import FAQSection from "@/components/ui/FAQSection";
import { generalFaqs } from "@/data/faqs";
import { buildFaqSchema } from "@/lib/schema";

const ServicesPreview = dynamic(() => import("@/components/home/ServicesPreview"));
const AISpotlight = dynamic(() => import("@/components/home/AISpotlight"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const PortfolioPreview = dynamic(() => import("@/components/home/PortfolioPreview"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const CTASection = dynamic(() => import("@/components/home/CTASection"));

// The homepage inherits its title and description from the root layout; it only
// needs to claim its own canonical so it isn't covered by a route-level one.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const faqSchema = buildFaqSchema(generalFaqs);

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection />
      <IntroSection />
      <ServicesPreview />
      <AISpotlight />
      <ProcessSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <FAQSection
        faqs={generalFaqs}
        intro="Everything people usually ask before getting in touch. If your question isn't here, message us — we'll answer it straight."
      />
      <CTASection />
    </>
  );
}
