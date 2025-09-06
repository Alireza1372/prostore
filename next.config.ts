import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
