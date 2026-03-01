/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/itzfizz-car-animation",
  assetPrefix: "/itzfizz-car-animation",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;

