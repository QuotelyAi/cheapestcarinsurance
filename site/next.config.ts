import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cheapestcarinsurancetulsa.com',
        pathname: '/wp-content/**',
      },
      {
        protocol: 'https',
        hostname: '*.cheapestcarinsurancetulsa.com',
        pathname: '/wp-content/**',
      },
    ],
  },
  // Enable static exports for Vercel
  output: 'standalone',
};

export default nextConfig;
