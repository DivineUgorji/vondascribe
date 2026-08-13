import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      // zod schema caps uploads at 5MB
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;
