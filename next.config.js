/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.PORTFOLIO_DIST_DIR || '.next-portfolio',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
}

export default nextConfig
