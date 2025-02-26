import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  redirects: async () => [
    {
      source: "/",
      destination: "/products/1",
      permanent: true, 
    },
  ],

};

export default nextConfig;
