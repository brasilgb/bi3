/** @type {import('next').NextConfig} */

const nextConfig = {
  basePath: '/bi3',
  assetPrefix: '/bi3',
  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/acesso-negado',
        destination: '/acesso-negado',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
