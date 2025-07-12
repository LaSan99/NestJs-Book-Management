/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: '/books/:path*',
        destination: '/books/:path*',
      },
    ];
  },
};

export default nextConfig;
