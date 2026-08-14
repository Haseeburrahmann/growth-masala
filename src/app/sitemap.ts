import type { MetadataRoute } from "next";
import { getAllPosts, parsePostDate } from "@/lib/blog";
import { getLegalDoc, parseLegalDate } from "@/lib/legal";
import { SITE_URL } from "@/data/business";
import { lastModifiedFor } from "@/lib/lastModified";
import { locationPages } from "@/data/locations";
import { legalLinks } from "@/data/navigation";
import type { LegalSlug } from "@/types";

/**
 * Source paths behind each static route.
 *
 * `lastmod` is a claim about when the page's *content* last changed, so a route
 * is credited with the newest commit across everything that renders it: the
 * route files, its section components, and the data modules it reads. Listing
 * only `page.tsx` would report a stale date every time copy moved in a data file
 * — which is where most of this site's copy actually lives.
 *
 * Add a path here when a route starts reading a new data module. A missing path
 * makes the date too old; it never makes it wrong in the dangerous direction.
 */
const ROUTE_SOURCES: Record<string, string[]> = {
  "": ["src/app/page.tsx", "src/components/home", "src/data/faqs.ts"],
  "/services": [
    "src/app/services",
    "src/components/services",
    "src/data/services.ts",
    "src/data/pricing.ts",
  ],
  "/portfolio": [
    "src/app/portfolio",
    "src/components/portfolio",
    "src/data/portfolio.ts",
  ],
  "/case-studies": [
    "src/app/case-studies",
    "src/components/case-studies",
    "src/data/caseStudies.ts",
  ],
  "/about": ["src/app/about", "src/components/about"],
  "/blog": ["src/app/blog/page.tsx", "src/components/blog", "src/content/blog"],
  "/contact": [
    "src/app/contact",
    "src/components/contact",
    "src/data/business.ts",
  ],
};

/**
 * All twelve location pages render from one template and one data file, so they
 * genuinely do share a last-modified date — this is not an approximation.
 */
const LOCATION_SOURCES = [
  "src/app/[slug]/page.tsx",
  "src/components/locations",
  "src/data/locations.ts",
  "src/data/faqs.ts",
];

export default function sitemap(): MetadataRoute.Sitemap {
  // Root is listed without a trailing slash to match the canonical tag Next.js
  // emits for `canonical: "/"`. Both forms serve 200 (no redirect between
  // them), so the only thing that matters is that sitemap and canonical agree.
  const staticPages: MetadataRoute.Sitemap = [
    { path: "", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/services", changeFrequency: "monthly" as const, priority: 0.9 },
    { path: "/portfolio", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/case-studies", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.7 },
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.8 },
    { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  ].map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: lastModifiedFor(ROUTE_SOURCES[path]),
    changeFrequency,
    priority,
  }));

  // Location + service landing pages. High priority — these target the
  // commercial-intent local keywords the site is built to rank for.
  const locationLastModified = lastModifiedFor(LOCATION_SOURCES);
  const locationUrls: MetadataRoute.Sitemap = locationPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: locationLastModified,
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  // Posts carry their own dates in frontmatter, which beats git: an edit that
  // fixes a typo is a commit but not a content change, and `updated` is set by
  // hand precisely when the substance moved. `updated` falls back to `date` for
  // a post that has never been revised.
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parsePostDate(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Legal documents. `lastModified` comes from frontmatter rather than git for
  // the same reason blog posts do, only more strictly: on a legal document the
  // effective date is a claim being made TO the reader. The date in the
  // sitemap, the date rendered in the hero, and `dateModified` in the WebPage
  // schema all read the one `updated` field, so a revision cannot update two of
  // the three and leave the sitemap insisting the terms changed on a day they
  // did not.
  //
  // Priority 0.3, yearly: these must never compete with a service or location
  // page for attention. They are indexed because a published privacy policy is
  // a trust signal and because Meta's app review fetches them — not because
  // they are meant to rank.
  const legalPages: MetadataRoute.Sitemap = legalLinks.map((link) => {
    const slug = link.href.replace("/", "") as LegalSlug;
    const { meta } = getLegalDoc(slug);

    return {
      url: `${SITE_URL}${link.href}`,
      lastModified: parseLegalDate(meta.updated),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    };
  });

  return [...staticPages, ...locationUrls, ...blogPages, ...legalPages];
}
