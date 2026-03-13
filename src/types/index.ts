export interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

export interface PortfolioItem {
  title: string;
  category: "website" | "marketing" | "social-media" | "web-app";
  description: string;
  image: string;
  link?: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
