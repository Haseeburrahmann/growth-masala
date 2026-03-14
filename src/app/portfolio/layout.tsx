import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio — Growth Masala",
  description:
    "Explore 50+ websites, web apps, and digital marketing projects we've delivered for businesses across India.",
  openGraph: {
    title: "Portfolio — Growth Masala",
    description:
      "Explore 50+ websites, web apps, and digital marketing projects we've delivered for businesses across India.",
  },
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
