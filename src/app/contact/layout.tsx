import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { address } from "@/data/business";
import { pageOpenGraph } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact — Free Consultation in Mahabubnagar",
  description: `Call, WhatsApp or message us about your website, SEO or ads. Based in ${address.locality}, ${address.region} — reply within 24 hours, free consultation, prices published.`,
  alternates: { canonical: "/contact" },
  openGraph: pageOpenGraph({
    title: "Contact — Free Consultation in Mahabubnagar | Growth Masala",
    description: `Based in ${address.locality}, ${address.region}. Call, WhatsApp, or message us for a free consultation — reply within 24 hours.`,
    url: "/contact",
  }),
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Contact", path: "/contact" },
]);

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
