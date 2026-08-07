import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { address } from "@/data/business";

/**
 * The title was "Case Studies — Real Client Results". The page had no results —
 * it had deliverables typeset as results — so the tag was promising in the SERP
 * what the page could not deliver on arrival. That is a bounce, and a bounce
 * from a query this specific is an expensive one.
 *
 * "Three Client Builds in Detail" is what a reader actually gets, and it sets
 * the expectation the page can meet.
 */
export const metadata: Metadata = {
  title: "Case Studies — Three Client Builds in Detail",
  description: `How Growth Masala approached three real projects — two schools and a four-branch repair chain in ${address.region} and Bengaluru. The problem, the build, and exactly what shipped. Every study links to the live site.`,
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Three Client Builds in Detail | Growth Masala",
    description: `The problem, the build, and what shipped — three projects delivered from ${address.locality} for clients across ${address.region} and Bengaluru.`,
    url: "/case-studies",
  },
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Case Studies", path: "/case-studies" },
]);

export default function CaseStudiesLayout({ children }: { children: React.ReactNode }) {
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
