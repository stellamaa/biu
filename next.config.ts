import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [{key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate'}],
      },
      {
        source: '/about',
        headers: [{key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate'}],
      },
      {
        source: '/projects/:slug*',
        headers: [{key: 'Cache-Control', value: 'private, no-cache, no-store, must-revalidate'}],
      },
    ]
  },
};

export default nextConfig;
