import type { Metadata } from "next";

import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Case Studies — Real Client Results",
  description:
    "How Growth Masala helped Freewings School, Kings Mobile World, and Triveni Balavikas grow online — the challenge, the solution, and what we delivered.",
  alternates: { canonical: "/case-studies" },
  openGraph: {
    title: "Case Studies — Real Client Results | Growth Masala",
    description:
      "Real challenges, real solutions, real growth for businesses across Telangana and India.",
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
