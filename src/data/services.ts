import type { Service } from "@/types";
import { Globe, TrendingUp, BarChart3 } from "lucide-react";
import type { ElementType } from "react";

export const serviceIconMap: Record<string, ElementType> = {
  Globe,
  TrendingUp,
  BarChart3,
};

export const services: Service[] = [
  {
    icon: "Globe",
    title: "Website Development",
    description:
      "Custom-built, high-performance websites that convert visitors into customers. From landing pages to full-scale web applications.",
    features: [
      "Responsive Design",
      "SEO Optimised",
      "Fast Loading",
      "CMS Integration",
    ],
  },
  {
    icon: "TrendingUp",
    title: "Social Media Growth",
    description:
      "Strategic social media management that builds your brand presence, engages your audience, and drives organic growth across all platforms.",
    features: [
      "Content Strategy",
      "Community Management",
      "Analytics & Reporting",
      "Influencer Outreach",
    ],
  },
  {
    icon: "BarChart3",
    title: "Performance Marketing",
    description:
      "Data-driven advertising campaigns on Meta and beyond. Every rupee spent is tracked, optimised, and accountable.",
    features: [
      "Meta Ads",
      "Conversion Tracking",
      "A/B Testing",
      "ROI Optimisation",
    ],
  },
];
