import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['next-sanity'],
  },
  images: {
    qualities: [75, 82],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560],
    imageSizes: [256, 384, 512, 640, 750, 828, 1080, 1200, 1600],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          {key: 'Cache-Control', value: 'private, max-age=0, must-revalidate'},
        ],
      },
      {
        source: '/about',
        headers: [
          {key: 'Cache-Control', value: 'private, max-age=0, must-revalidate'},
        ],
      },
      {
        source: '/projects/:slug*',
        headers: [
          {key: 'Cache-Control', value: 'private, max-age=0, must-revalidate'},
        ],
      },
    ]
  },
};

export default nextConfig;
