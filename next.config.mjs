/** @type {import('next').NextConfig} */
const nextConfig = {
    // Silence warnings
    // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    webpack: (config) => {
      config.externals.push('pino-pretty', 'lokijs', 'encoding');
      return config;
    },
    // Enable static exports for middleware
    output: 'standalone',
    // Enable experimental features
    experimental: {
      serverComponentsExternalPackages: ['@neynar/nodejs-sdk'],
    },
    // Ensure proper middleware handling
    poweredByHeader: false,
};

export default nextConfig;
  