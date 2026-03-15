/** @type {import('next').NextConfig} */
const nextConfig = {
  // Workaround for React Client Manifest errors with ESM packages like framer-motion
  // in the App Router (RSC) pipeline.
  transpilePackages: ['framer-motion'],
}

module.exports = nextConfig
