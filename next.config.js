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
  // Add headers for video files
  async headers() {
    return [
      {
        source: '/videos/:path*',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
          {
            key: 'Content-Type',
            value: 'video/mp4'
          }
        ],
      },
    ]
  }
}

module.exports = nextConfig 