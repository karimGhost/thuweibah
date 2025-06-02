import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const withPWANextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  scope: '/app',
  // sw: 'service-worker.js', // Uncomment if using a custom service worker
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true, // ⚠️ Use with caution in production
  },
  experimental: {
    serverActions: {},
  },
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Use with caution in production
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        pathname: '/**',
      },
    ],
  },
};

export default withPWANextConfig(nextConfig);
