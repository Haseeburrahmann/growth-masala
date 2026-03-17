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
    ];
  },
};

export default nextConfig;
