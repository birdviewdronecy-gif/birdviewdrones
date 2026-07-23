import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Production-ready defaults for Vercel
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Local assets under /public — no remote patterns required today
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
