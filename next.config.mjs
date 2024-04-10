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
};

export default nextConfig;