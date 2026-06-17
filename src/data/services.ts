import type { Service } from "@/types";
import { Globe, TrendingUp, BarChart3, Search, Bot } from "lucide-react";
import type { ElementType } from "react";

// Single source of truth for services. Every surface (homepage, services page,
// chatbot prompt, chat widget chips, lead picker, contact form) should read from
// here so the list never drifts across files.
export const serviceIconMap: Record<string, ElementType> = {
  Globe,
  TrendingUp,
  BarChart3,
  Search,
  Bot,
};

export const services: Service[] = [
  {
    slug: "website-development",
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
    deliverables: [
      "Custom responsive website design",
      "SEO-optimised structure and content",
      "CMS integration (WordPress / headless)",
      "Performance optimisation (90+ Lighthouse)",
      "SSL, hosting setup, and deployment",
      "30-day post-launch support",
    ],
  },
  {
    slug: "social-media-growth",
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
    deliverables: [
      "Social media audit and strategy",
      "Monthly content calendar",
      "Post design and copywriting",
      "Community management and engagement",
      "Monthly analytics and performance report",
      "Hashtag and trend research",
    ],
  },
  {
    slug: "performance-marketing",
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
    deliverables: [
      "Meta campaign strategy and setup",
      "Audience research and targeting",
      "Ad creative design and copywriting",
      "A/B testing and optimisation",
      "Conversion tracking and pixel setup",
      "Weekly performance reports with ROI",
    ],
  },
  {
    slug: "seo",
    icon: "Search",
    title: "SEO",
    description:
      "Search engine optimisation that gets your business found on Google. From local map-pack visibility to technical fixes that lift rankings.",
    features: [
      "On-Page SEO",
      "Technical SEO",
      "Local SEO",
      "Keyword Research",
    ],
    deliverables: [
      "On-page SEO (meta tags, headings, content structure)",
      "Technical SEO (site speed, mobile, crawlability)",
      "Local SEO (Google Business Profile, local listings)",
      "Keyword research and content strategy",
      "Schema / structured data setup",
      "Monthly ranking and traffic reports",
    ],
  },
  {
    slug: "ai-automation",
    icon: "Bot",
    title: "AI & Automation",
    description:
      "AI assistants and automated workflows that capture leads, answer customers 24/7, and do the busywork — so your team focuses on closing.",
    features: [
      "AI Chatbots",
      "WhatsApp CRM",
      "Workflow Automation",
      "Lead Capture 24/7",
    ],
    deliverables: [
      "AI chatbot trained on your business (website + WhatsApp)",
      "WhatsApp Business API setup and automated replies",
      "Lead-capture flow that records and routes enquiries",
      "Automated follow-ups and broadcast campaigns",
      "CRM / workflow integration (form → qualify → follow-up)",
      "Ongoing tuning and support",
    ],
    subItems: [
      {
        title: "AI Chatbots",
        description:
          "Smart website and WhatsApp assistants that answer FAQs, qualify visitors, and capture leads around the clock — like the Masala Bot live on this site.",
      },
      {
        title: "WhatsApp CRM & Automation",
        description:
          "WhatsApp Business API with automated replies, broadcast campaigns, and a lead pipeline so no enquiry slips through the cracks.",
      },
      {
        title: "AI Automation & Workflows",
        description:
          "Connect your forms, chat, and tools into automated flows: a lead comes in, AI qualifies it, your CRM logs it, and follow-up fires within minutes.",
      },
    ],
  },
];
