/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  },
  // Aumentar el timeout
  experimental: {
    serverComponentsExternalPackages: ['@aws-sdk/client-s3'],
  }
};

export default nextConfig;
