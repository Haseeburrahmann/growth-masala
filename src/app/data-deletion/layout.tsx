import type { Metadata } from "next";

import { buildBreadcrumbSchema, buildWebPageSchema } from "@/lib/schema";
import { getLegalDoc } from "@/lib/legal";
import { pageOpenGraph } from "@/lib/metadata";

/**
 * See `src/app/privacy/layout.tsx` for the shared conventions.
 *
 * This route exists because Meta requires a **Data Deletion Instructions URL**
 * before a Developer app can be published, and the WhatsApp outreach the lead
 * engine feeds cannot send a single message until the app is Live. So the URL
 * has to resolve and has to actually explain the process — a stub would pass a
 * link check and fail a human review.
 *
 * The slug is `/data-deletion` and should stay that way. It is what gets typed
 * into the Meta console, and changing it silently breaks an app setting nothing
 * in this repo can see.
 */
const { meta } = getLegalDoc("data-deletion");

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: { canonical: "/data-deletion" },
  openGraph: pageOpenGraph({
    title: `${meta.title} | Growth Masala`,
    description: meta.description,
    url: "/data-deletion",
  }),
};

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: meta.title, path: "/data-deletion" },
]);

const webPageSchema = buildWebPageSchema({
  name: meta.title,
  description: meta.description,
  path: "/data-deletion",
  dateModified: meta.updated,
});

export default function DataDeletionLayout({
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
