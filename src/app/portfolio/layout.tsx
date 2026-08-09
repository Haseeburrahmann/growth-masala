import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { address } from "@/data/business";
import { portfolioItems } from "@/data/portfolio";
import { pageOpenGraph } from "@/lib/metadata";

/**
 * The count in this title is `portfolioItems.length`, not
 * `trackRecord.projectsDelivered`.
 *
 * Both numbers are real and they mean different things: `trackRecord` is the
 * owner-confirmed total delivered, and the array is the curated subset of
 * clients happy to be named beside a live URL. A title is a promise about the
 * page behind it, so it has to quote the one the page can honour. It read
 * "Portfolio — 50+ Websites & Web Apps" over a grid of eight, and a mismatch
 * that obvious is noticed in the first second after the click — a pogo-stick
 * back to the SERP is worth less than never having ranked.
 *
 * The 50+ figure is not gone. It belongs on the page, in the hero, where there
 * is room to state the relationship out loud ("a curated slice of 50+ projects
 * delivered"). A title has no room to explain itself.
 *
 * No location keyword in the title, deliberately. The brand suffix costs 16 of
 * the 60 rendered characters, and "Mahabubnagar" does not fit the remainder
 * without dropping the count — which is the stronger signal on a portfolio page.
 * The locality is carried by the description, the H1, and the body copy instead.
 */
export const metadata: Metadata = {
  title: `Portfolio — ${portfolioItems.length} Live Client Websites`,
  description: `See websites, e-commerce stores, and web apps Growth Masala has built for schools, retailers, and service businesses in ${address.locality}, Hyderabad, and across ${address.region}. Every project links to the live site.`,
  alternates: { canonical: "/portfolio" },
  openGraph: pageOpenGraph({
    title: `Portfolio — ${portfolioItems.length} Live Client Websites | Growth Masala`,
    description: `Websites, stores, and web apps delivered for businesses in ${address.locality}, Hyderabad, and across ${address.region}.`,
    url: "/portfolio",
  }),
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
