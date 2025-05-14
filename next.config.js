const nextConfig = {
    reactStrictMode: true,
    trailingSlash: true,
    distDir: "_build",
    experimental: {},
    images: {
        domains: ['natreeapi.webmotech.com', 'localhost'],
        unoptimized: true,
    },
    sassOptions: {},
};

module.exports = nextConfig;
