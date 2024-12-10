/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
  env: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
};

const withNextIntl = require("next-intl/plugin")(
  // This is the default (also the `src` folder is supported out of the box)
  "./i18n.js"
);

module.exports = withNextIntl(nextConfig);
