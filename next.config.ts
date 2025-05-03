import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.yandexcloud.net',
                // hostname: '**',
            },
        ],
    },
};

export default nextConfig;
