import type { Metadata } from "next";

import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";
import { getLegalDoc } from "@/lib/legal";
import { pageOpenGraph } from "@/lib/metadata";

/**
 * Title and description come from the document's own frontmatter rather than
 * being typed here, so the `<h1>`, the `<title>` and the meta description can
 * never describe three different versions of the same policy.
 *
 * The title is bare — no brand. The root template appends " | Growth Masala"
 * exactly once (docs/seo-architecture.md §Rule 2).
 *
 * These pages are indexable on purpose. A published privacy policy and terms
 * are a trust signal for a local business, they are the pages a cautious buyer
 * checks before enquiring, and Meta's app review fetches all three. Their
 * sitemap priority is low (0.3) because they should never outrank a service
 * page, not because they should be hidden.
 */
const { meta } = getLegalDoc("privacy");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/privacy" },
  openGraph: pageOpenGraph({
    title: `${meta.title} | Growth Masala`,
    description: meta.description,
    url: "/privacy",
  }),
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: meta.title, path: "/privacy" },
]);

const webPageSchema = buildWebPageSchema({
  name: meta.title,
  description: meta.description,
  path: "/privacy",
  dateModified: meta.updated,
});

export default function PrivacyLayout({
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
