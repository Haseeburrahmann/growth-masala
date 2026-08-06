import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About — Digital Agency in Mahabubnagar",
  description:
    "Growth Masala is a digital marketing agency based in Mahabubnagar, Telangana. We combine strategy, creativity, and data to help local businesses grow online.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Digital Agency in Mahabubnagar | Growth Masala",
    description:
      "A digital marketing agency based in Mahabubnagar, Telangana, helping local businesses grow online.",
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
