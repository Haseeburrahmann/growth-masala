import type { Metadata } from "next";

import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";
import { getLegalDoc } from "@/lib/legal";
import { pageOpenGraph } from "@/lib/metadata";

/** See `src/app/privacy/layout.tsx` for why frontmatter drives all three of
 *  the title, the description and the `<h1>`, and why these pages are indexed. */
const { meta } = getLegalDoc("terms");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/terms" },
  openGraph: pageOpenGraph({
    title: `${meta.title} | Growth Masala`,
    description: meta.description,
    url: "/terms",
  }),
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: meta.title, path: "/terms" },
]);

const webPageSchema = buildWebPageSchema({
  name: meta.title,
  description: meta.description,
  path: "/terms",
  dateModified: meta.updated,
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      {children}
    </>
  );
}
