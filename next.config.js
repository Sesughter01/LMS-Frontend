/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["i.ibb.co","s3.eu-west-1.wasabisys.com", "example.com"],
    // domains: ["s3.eu-west-1.wasabisys.com", "example.com"],
  },
};
// domains: ["i.ibb.co","s3.eu-west-1.wasabisys.com", "example.com"],
module.exports = nextConfig;
