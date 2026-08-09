import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";
import { address } from "@/data/business";
import { pageOpenGraph } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "Contact — Free Consultation in Mahabubnagar",
  description: `Talk to Growth Masala about your website, social media, SEO, or ads. Based in ${address.locality}, ${address.region} — call, WhatsApp, or message us. Reply within 24 hours, free consultation, and every price published up front.`,
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
