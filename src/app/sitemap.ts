import type { MetadataRoute } from "next";
import { getAllPosts, parsePostDate } from "@/lib/blog";
import { SITE_URL } from "@/data/business";
import { locationPages } from "@/data/locations";

export default function sitemap(): MetadataRoute.Sitemap {
  // Root is listed without a trailing slash to match the canonical tag Next.js
  // emits for `canonical: "/"`. Both forms serve 200 (no redirect between
  // them), so the only thing that matters is that sitemap and canonical agree.
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/case-studies`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
  ];

  // Location + service landing pages. High priority — these target the
  // commercial-intent local keywords the site is built to rank for.
  const locationUrls: MetadataRoute.Sitemap = locationPages.map((page) => ({
    url: `${SITE_URL}/${page.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: parsePostDate(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...locationUrls, ...blogPages];
}
