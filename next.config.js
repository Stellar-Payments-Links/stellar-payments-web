/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  webpack(config) {
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      'stellar-sdk': path.join(__dirname, 'node_modules/stellar-sdk/dist/stellar-sdk.min.js')
    };
    return config;
  }
};

module.exports = nextConfig;
