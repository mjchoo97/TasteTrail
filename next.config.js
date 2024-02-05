/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tastetrailnodeserver.onrender.com",
      },
    ],
  },

  // env: {
  //     API_ENDPOINT: process.env.API_ENDPOINT,
  // },
};

module.exports = nextConfig;
