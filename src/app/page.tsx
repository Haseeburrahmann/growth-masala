import dynamic from "next/dynamic";
import HeroSection from "@/components/home/HeroSection";
import IntroSection from "@/components/home/IntroSection";

const ServicesPreview = dynamic(() => import("@/components/home/ServicesPreview"));
const AISpotlight = dynamic(() => import("@/components/home/AISpotlight"));
const ProcessSection = dynamic(() => import("@/components/home/ProcessSection"));
const PortfolioPreview = dynamic(() => import("@/components/home/PortfolioPreview"));
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"));
const CTASection = dynamic(() => import("@/components/home/CTASection"));

export default function Home() {
  return (
    <>
      <HeroSection />
      <IntroSection />
      <ServicesPreview />
      <AISpotlight />
      <ProcessSection />
      <PortfolioPreview />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
