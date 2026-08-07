import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { address, business, trackRecord } from "@/data/business";

/**
 * The title stays as it was — it is already keyword-first with the locality in
 * it, and it is the one thing on this route that did not need fixing. What
 * changed is that the page underneath it now actually mentions Mahabubnagar.
 *
 * The description leads with the founding year and project count rather than
 * "we combine strategy, creativity, and data", which is a sentence that
 * describes every agency and distinguishes none.
 */
export const metadata: Metadata = {
  title: "About — Digital Agency in Mahabubnagar",
  description: `Growth Masala is a digital agency in ${address.locality}, ${address.region}, building websites and running campaigns for local businesses since ${business.foundingYear}. ${trackRecord.projectsDelivered}+ projects delivered, every price published.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Digital Agency in Mahabubnagar | Growth Masala",
    description: `A digital agency based in ${address.locality}, ${address.region} — ${trackRecord.projectsDelivered}+ projects delivered since ${business.foundingYear}, with every price published.`,
    url: "/about",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
]);

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
