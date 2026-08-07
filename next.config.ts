import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "growth-masala.vercel.app" }],
        destination: "https://growthmasala.com/:path*",
        permanent: true,
      },

      /**
       * Retired blog posts (2026-08-07).
       *
       * Two sub-300-word posts with no location signal were pulled during the
       * blog relaunch — the files are in
       * ~/Desktop/2026/growth-masala-blog-retired/20260807/, not deleted.
       *
       * They 301 rather than 404 because the URLs were in the sitemap and may
       * hold crawl history or an inbound link. Each points at the closest live
       * page by topic, not at /blog: a redirect to a listing page is a soft
       * dead end, and Google treats a mass redirect-to-index as a soft 404.
       */
      {
        source: "/blog/why-every-business-needs-a-website-in-2026",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/blog/5-social-media-mistakes-killing-your-engagement",
        destination: "/social-media-marketing-mahabubnagar",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
