import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact — Free Consultation in Mahabubnagar",
  description:
    "Talk to Growth Masala about your website, social media, SEO, or ads. Based in Mahabubnagar, Telangana — call, WhatsApp, or send a message for a free consultation.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact — Free Consultation in Mahabubnagar | Growth Masala",
    description:
      "Based in Mahabubnagar, Telangana. Call, WhatsApp, or message us for a free consultation.",
    url: "/contact",
  },
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
