import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";

// Titles here are deliberately bare (no "Growth Masala") — the root layout's
// title template appends the brand exactly once.
export const metadata: Metadata = {
  title: "Digital Marketing Services in Mahabubnagar",
  description:
    "Website development, social media growth, SEO, Meta ads, and AI automation for businesses in Mahabubnagar, Hyderabad, and across Telangana. See what each service includes.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Digital Marketing Services in Mahabubnagar | Growth Masala",
    description:
      "Website development, social media growth, SEO, Meta ads, and AI automation for businesses across Telangana.",
    url: "/services",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Services", path: "/services" },
]);

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
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
