/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
    })
    return config
  },
  // Add support for large video files
  experimental: {
    largePageDataBytes: 128 * 1000 * 1000, // 128MB
  },
}

module.exports = nextConfig 