import type { Service, ServiceGroup } from "@/types";
import {
  Globe,
  TrendingUp,
  BarChart3,
  Search,
  Bot,
  ShoppingCart,
  Wrench,
  Code2,
  MessageCircle,
} from "lucide-react";
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
  ShoppingCart,
  Wrench,
  Code2,
  MessageCircle,
};

/**
 * The four customer-intent groups, in homepage display order.
 *
 * This is a presentation layer over `services` — it holds slugs, never copies of
 * the service data. `locations.ts` (`featuredServices`), `schema.ts`
 * (`OfferCatalog`), and `ContactForm` all read the flat array below by slug and
 * are deliberately unaffected by anything here.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    id: "web",
    title: "Websites & E-Commerce",
    outcome: "Get your business online — properly.",
    icon: "Globe",
    image: "/images/services/websites.webp",
    serviceSlugs: [
      "website-development",
      "ecommerce-development",
      "website-maintenance",
    ],
    featured: true,
  },
  {
    id: "software",
    title: "Custom Software",
    outcome: "Tools built for how your business actually works.",
    icon: "Code2",
    image: "/images/services/software.webp",
    serviceSlugs: ["software-development"],
  },
  {
    id: "marketing",
    title: "Marketing & Growth",
    outcome: "Get found by people already looking for you.",
    icon: "TrendingUp",
    image: "/images/services/marketing.webp",
    serviceSlugs: ["seo", "performance-marketing", "social-media-growth"],
  },
  {
    id: "ai",
    title: "AI & Automation",
    outcome: "Answer every enquiry, even at 2am.",
    icon: "Bot",
    image: "/images/services/ai.webp",
    serviceSlugs: ["ai-automation", "whatsapp-automation"],
  },
];

export const services: Service[] = [
  {
    slug: "website-development",
    icon: "Globe",
    title: "Website Development",
    group: "web",
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
    slug: "ecommerce-development",
    icon: "ShoppingCart",
    title: "E-Commerce Stores",
    group: "web",
    description:
      "Online stores that take orders and payments without anyone having to answer the phone. You manage products yourself; orders land on your WhatsApp.",
    features: [
      "Razorpay Checkout",
      "Admin Panel",
      "Order Management",
      "WhatsApp Alerts",
    ],
    deliverables: [
      "Storefront with product catalogue and search",
      "Razorpay payment gateway integration",
      "Admin panel for products, stock, and pricing",
      "Order management with status tracking",
      "WhatsApp alert on every new order",
      "Invoice and delivery-partner setup",
    ],
  },
  {
    slug: "website-maintenance",
    icon: "Wrench",
    title: "Website Care & Maintenance",
    group: "web",
    description:
      "A website is not finished at launch. Backups, security patches, content edits, and someone who actually picks up when something breaks.",
    features: [
      "Scheduled Backups",
      "Security Patching",
      "Content Updates",
      "Uptime Monitoring",
    ],
    deliverables: [
      "Scheduled backups with restores tested, not assumed",
      "Security patching and malware scanning",
      "Uptime monitoring with alerts to us, not to you",
      "Content, image, and price updates on request",
      "Plugin and dependency updates",
      "Monthly performance and uptime report",
    ],
  },
  {
    slug: "software-development",
    icon: "Code2",
    title: "Custom Software & Web Apps",
    group: "software",
    description:
      "For when an off-the-shelf tool does not fit how you actually work. Calculators, dashboards, admin panels, and internal tools built around your process.",
    features: [
      "Web Applications",
      "Admin Dashboards",
      "Internal Tools",
      "API Integrations",
    ],
    deliverables: [
      "Process mapping and requirements written down first",
      "Web application design and build",
      "Admin dashboard with role-based access",
      "Third-party API and payment integrations",
      "Deployment, monitoring, and handover documentation",
      "Post-launch support window",
    ],
    subItems: [
      {
        title: "Web Applications",
        description:
          "Tools your customers use directly — calculators, booking flows, portals. ZakatEasy and LancerCalc are both ours, both live, both built this way.",
      },
      {
        title: "Admin Panels & Dashboards",
        description:
          "One screen that shows what is actually happening in the business, with the controls to act on it. Role-based, so staff see only what they should.",
      },
      {
        title: "Internal Tools",
        description:
          "The spreadsheet that has outgrown itself, rebuilt properly — stock, scheduling, quotations, or whatever your team currently does by hand.",
      },
    ],
  },
  {
    slug: "seo",
    icon: "Search",
    title: "SEO & Google Business Profile",
    group: "marketing",
    description:
      "Search engine optimisation that gets your business found on Google. From local map-pack visibility to technical fixes that lift rankings.",
    features: [
      "On-Page SEO",
      "Technical SEO",
      "Google Business Profile",
      "Keyword Research",
    ],
    deliverables: [
      "On-page SEO (meta tags, headings, content structure)",
      "Technical SEO (site speed, mobile, crawlability)",
      "Google Business Profile setup and optimisation",
      "Keyword research and content strategy",
      "Schema / structured data setup",
      "Monthly ranking and traffic reports",
    ],
  },
  {
    slug: "performance-marketing",
    icon: "BarChart3",
    title: "Meta & Google Ads",
    group: "marketing",
    description:
      "Data-driven advertising campaigns on Meta and Google. Every rupee spent is tracked, optimised, and accountable — reported as cost per enquiry, not impressions.",
    features: [
      "Meta Ads",
      "Google Ads",
      "Conversion Tracking",
      "ROI Optimisation",
    ],
    deliverables: [
      "Campaign strategy and account setup",
      "Audience research and local targeting",
      "Ad creative design and copywriting",
      "A/B testing and ongoing optimisation",
      "Conversion tracking and pixel setup",
      "Reporting on cost per enquiry, not just reach",
    ],
  },
  {
    slug: "social-media-growth",
    icon: "TrendingUp",
    title: "Social Media Management",
    group: "marketing",
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
    slug: "ai-automation",
    icon: "Bot",
    title: "AI Chatbots & Voice Agents",
    group: "ai",
    description:
      "AI assistants that answer customers 24/7, qualify visitors, and capture leads — so nothing waits until Monday morning.",
    features: [
      "AI Chatbots",
      "Voice Agents",
      "Lead Capture 24/7",
      "Workflow Automation",
    ],
    deliverables: [
      "AI chatbot trained on your business, live on your site",
      "Voice agent for calls you cannot always answer",
      "Lead-capture flow that records and routes enquiries",
      "Escalation to a human when the question needs one",
      "CRM / workflow integration (form → qualify → follow-up)",
      "Ongoing tuning and support",
    ],
    subItems: [
      {
        title: "AI Chatbots",
        description:
          "Smart website assistants that answer FAQs, qualify visitors, and capture leads around the clock — like the Masala Bot live on this site.",
      },
      {
        title: "Voice Agents",
        description:
          "An AI that picks up when you cannot, takes the enquiry properly, and passes it on — instead of a missed call nobody rings back.",
      },
      {
        title: "AI Automation & Workflows",
        description:
          "Connect your forms, chat, and tools into automated flows: a lead comes in, AI qualifies it, your CRM logs it, and follow-up fires within minutes.",
      },
    ],
  },
  {
    slug: "whatsapp-automation",
    icon: "MessageCircle",
    title: "WhatsApp Automation",
    group: "ai",
    description:
      "WhatsApp is where your customers already are. Automated replies, catalogues, and follow-ups that keep running whether or not anyone is at the desk.",
    features: [
      "Auto-Replies",
      "Broadcast Campaigns",
      "Product Catalogue",
      "Lead Routing",
    ],
    deliverables: [
      "WhatsApp Business API setup and verification",
      "Automated greeting, FAQ, and away replies",
      "Product catalogue browsable inside WhatsApp",
      "Broadcast campaigns to opted-in contacts",
      "Lead routing so enquiries reach the right person",
      "Ongoing tuning and support",
    ],
  },
];

/** Services belonging to a group, in the order the group declares them. */
export function servicesInGroup(group: ServiceGroup): Service[] {
  return group.serviceSlugs
    .map((slug) => services.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service));
}
