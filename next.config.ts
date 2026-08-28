import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  // @react-pdf/renderer pulls in node-ish modules; keep it client-only.
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      // The documents hub used to live at /about/certificates.
      { source: "/about/certificates", destination: "/about/documents", permanent: true },
    ];
  },
};

export default nextConfig;
