import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export — deploys cleanly on Cloudflare Pages
  output: "export",
  poweredByHeader: false,
  reactStrictMode: true,
  images: {
    // Required for static export (no image optimization server)
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
  },
  // Trailing slashes help static hosts map directories → index.html
  trailingSlash: true,
};

export default nextConfig;
