/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
    };
    return config;
  },
  images: {
    domains: [
      "mint-toast.infura-ipfs.io",
      "gateway.pinata.cloud",
      "images.ctfassets.net",
    ],
  },
  async redirects() {
    return [
      {
        source: "/collection",
        destination: "/collections",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
