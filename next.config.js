const path = require('path');


module.exports = {
    webpack: (config, { isServer }) => {
        config.resolve.alias['~bootstrap'] = path.resolve(__dirname, 'node_modules/bootstrap');
        return config;
    },
    images: {
        domains: ['d2qigxh2j3kzdo.cloudfront.net'],
    },
    ignoreDuringBuilds: true,
    experimental: {
        legacyBrowsers: false,
    },
    swcMinify: true,
    webpack: (config, { isServer }) => {
        config.optimization.splitChunks = false; // 
        return config;
    }
};
