import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { address, trackRecord } from "@/data/business";

/**
 * The title used to read "Portfolio — 50+ Websites & Digital Projects" with the
 * 50 typed in by hand, while the page it described rendered "8+". Interpolating
 * `trackRecord` is what stops that pair from drifting apart again.
 *
 * No location keyword in the title, deliberately. The brand suffix costs 16 of
 * the 60 rendered characters, and "Mahabubnagar" does not fit the remainder
 * without dropping the count — which is the stronger signal on a portfolio page.
 * The locality is carried by the description, the H1, and the body copy instead.
 */
export const metadata: Metadata = {
  title: `Portfolio — ${trackRecord.projectsDelivered}+ Websites & Web Apps`,
  description: `See websites, e-commerce stores, and web apps Growth Masala has built for schools, retailers, and service businesses in ${address.locality}, Hyderabad, and across ${address.region}. Every project links to the live site.`,
  alternates: { canonical: "/portfolio" },
  openGraph: {
    title: `Portfolio — ${trackRecord.projectsDelivered}+ Websites & Web Apps | Growth Masala`,
    description: `Websites, stores, and web apps delivered for businesses in ${address.locality}, Hyderabad, and across ${address.region}.`,
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
