import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  /**
   * Inlines the CSS into the document instead of serving it as a <link>.
   *
   * The stylesheet is a single 16.8KB render-blocking request. On a throttled
   * mobile connection that is a whole round-trip the browser must complete
   * before it can paint anything at all — Lighthouse costed it at ~910ms. The
   * file is small enough that inlining it is strictly cheaper than fetching it,
   * and the HTML document is 29KB, comfortably under the 33KB average.
   *
   * Revisit if the stylesheet grows past ~30KB: past that, inlining starts
   * costing more on repeat visits than the round-trip it saves, because the
   * inlined copy cannot be cached separately from the HTML.
   */
  experimental: {
    inlineCss: true,
  },
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
