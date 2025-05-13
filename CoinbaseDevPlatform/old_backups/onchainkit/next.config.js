/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'app.manifold.xyz',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'manifold.xyz',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig 