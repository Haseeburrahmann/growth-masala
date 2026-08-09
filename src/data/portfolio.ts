import type { PortfolioItem } from "@/types";
import { Globe, TrendingUp, BarChart3, Calculator, ShoppingCart } from "lucide-react";
import type { ElementType } from "react";

export interface CategoryConfig {
  icon: ElementType;
  gradient: string;
  tag: string;
}

export const portfolioCategoryConfig: Record<string, CategoryConfig> = {
  website: { icon: Globe, gradient: "from-primary/20 to-secondary/10", tag: "Website" },
  "web-app": { icon: Calculator, gradient: "from-emerald-500/20 to-teal-500/10", tag: "Web App" },
  ecommerce: { icon: ShoppingCart, gradient: "from-sky-500/20 to-blue-500/10", tag: "E-Commerce" },
  "social-media": { icon: TrendingUp, gradient: "from-violet-500/20 to-fuchsia-500/10", tag: "Social Media" },
  marketing: { icon: BarChart3, gradient: "from-accent/20 to-orange-500/10", tag: "Marketing" },
};

export const portfolioCategories = [
  { key: "all", label: "All Projects" },
  { key: "website", label: "Websites" },
  { key: "web-app", label: "Web Apps" },
  { key: "ecommerce", label: "E-Commerce" },
  { key: "social-media", label: "Social Media" },
  { key: "marketing", label: "Marketing" },
];

export const portfolioItems: PortfolioItem[] = [
  {
    title: "Triveni Balavikas Central School",
    summary:
      "ICSE school in Bengaluru. Admissions portal, academics pages and a campus gallery.",
    tag: "School website",
    category: "website",
    description:
      "Website for an ICSE school (Grade I–VIII) in Bengaluru — admissions portal, academics & pedagogy pages, school-life gallery, leadership profiles, parent testimonials, FAQs, and WhatsApp contact.",
    image: "/images/portfolio/triveni-balavikas.webp",
    link: "https://trivenibalavikascentralschool.in",
  },
  {
    title: "Razzak Constructions",
    summary:
      "Mahabubnagar builders since 1992. A 1,100-project gallery and published pricing.",
    tag: "Construction",
    category: "website",
    description:
      "Website for a Mahbubnagar construction firm (building since 1992) — services, a 1,100+ project gallery, transparent pricing packages, a 4-step build process, testimonials, and WhatsApp enquiries.",
    image: "/images/portfolio/razzak-constructions.webp",
    link: "https://razzakconstructions.com",
  },
  {
    title: "Kings Mobile World",
    summary:
      "Mobile repair across four Hyderabad branches, with WhatsApp enquiries built in.",
    tag: "Local retail",
    category: "website",
    description:
      "Business website for Hyderabad's leading mobile repair service — showcasing 4 branches, repair stats, brand carousel, and WhatsApp-driven lead capture.",
    image: "/images/portfolio/kings-mobile.webp",
    link: "https://kingsmobileworld.in",
  },
  {
    title: "Automotive Dudes",
    summary:
      "Car modification store. Product reviews, photo uploads and ShipRocket tracking.",
    tag: "E-commerce",
    category: "ecommerce",
    description:
      "E-commerce store for car modification accessories — dark themed Shopify build with product reviews, photo uploads, and ShipRocket delivery tracking.",
    image: "/images/portfolio/automotive-dudes.webp",
    link: "https://automotivedudes.in",
  },
  {
    title: "TrustWave FinServ",
    summary:
      "Loan provider in Mahabubnagar with a live EMI calculator and 20+ bank partners.",
    tag: "Financial services",
    category: "website",
    description:
      "Financial services website for a loan provider in Mahabubnagar — featuring an interactive EMI calculator, 20+ bank partner logos, and blog section.",
    image: "/images/portfolio/trustwave.webp",
    link: "https://trustwavefinserv.com",
  },
  {
    title: "Freewings School",
    summary:
      "Pre-primary and upper primary in Telangana. Gallery, principal's message, WhatsApp.",
    tag: "School website",
    category: "website",
    description:
      "School website for a pre-primary and upper primary school in Telangana — photo gallery, principal's message, scroll animations, and WhatsApp contact.",
    image: "/images/portfolio/freewings.webp",
    link: "https://freewingsschool.com",
  },
  {
    title: "ZakatEasy",
    summary:
      "Free Zakat calculator with live gold and silver prices. Nothing is stored.",
    tag: "Web app",
    category: "web-app",
    description:
      "Free online Zakat calculator with live gold/silver prices, multi-asset fields (cash, crypto, investments), auto currency detection, and zero data storage.",
    image: "/images/portfolio/zakateasy.webp",
    link: "https://zakateasy.org",
  },
  {
    title: "LancerCalc",
    summary:
      "Tax and rate calculators for freelancers, including a quarterly tax planner.",
    tag: "Web app",
    category: "web-app",
    description:
      "Financial calculator suite for freelancers — self-employment tax, hourly rate, 1099 vs W-2 comparison, invoicing tools, and quarterly tax planner.",
    image: "/images/portfolio/lancercalc.webp",
    link: "https://lancercalc.com",
  },
];
