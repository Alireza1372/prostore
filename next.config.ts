import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],
  },
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
    dirs: ["pages", "utils"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
