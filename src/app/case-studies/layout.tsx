import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { pageOpenGraph } from "@/lib/metadata";

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
  title: "Website Case Studies — Client Projects",
  description: "Explore Growth Masala website projects for solar, finance, dental, education and retail businesses. Real screenshots, design decisions and delivered scope.",
  alternates: { canonical: "/case-studies" },
  openGraph: pageOpenGraph({
    title: "Website Case Studies — Client Projects | Growth Masala",
    description: "Client website projects: the user journey, design decisions and what shipped, with screenshots and honest measurement limits.",
    url: "/case-studies",
  }),
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
