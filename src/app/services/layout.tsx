import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { formatPrice, websiteTiers } from "@/data/pricing";
import { pageOpenGraph } from "@/lib/metadata";

// The price is interpolated, never typed as a literal — same rule the FAQ and
// pricing components follow. A description promising a figure the page does not
// show is worse than no figure at all.
const startingPrice = formatPrice(websiteTiers[0].amount);

// Titles here are deliberately bare (no "Growth Masala") — the root layout's
// title template appends the brand exactly once.
export const metadata: Metadata = {
  title: "Digital Marketing Services in Mahabubnagar",
  description:
    `Websites from ${startingPrice}, e-commerce, custom software, SEO, Meta and Google ads, social media, and AI automation for businesses in Mahabubnagar, Hyderabad, and across Telangana. Full pricing published — no call required.`,
  alternates: { canonical: "/services" },
  openGraph: pageOpenGraph({
    title: "Digital Marketing Services in Mahabubnagar | Growth Masala",
    description:
      `Websites from ${startingPrice}, plus SEO, ads, and AI automation for businesses across Telangana. Every price published up front.`,
    url: "/services",
  }),
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
