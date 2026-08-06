import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Portfolio — 50+ Websites & Digital Projects",
  description:
    "Explore websites, web apps, and digital marketing projects Growth Masala has delivered for schools, retailers, and service businesses across Telangana and India.",
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: "Portfolio — 50+ Websites & Digital Projects | Growth Masala",
    description:
      "Websites, web apps, and marketing projects delivered for businesses across Telangana and India.",
    url: "/portfolio",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Portfolio", path: "/portfolio" },
]);

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  );
}
