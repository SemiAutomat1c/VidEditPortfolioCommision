/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
    domains: [],
    remotePatterns: [],
  },
  // Ensure static files are copied to the output
  distDir: '.next',
  // Configure webpack to handle video files
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(mp4|webm)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name][ext]'
      }
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
        source: '/:path*.mp4',
        headers: [
          {
            key: 'Accept-Ranges',
            value: 'bytes'
          },
          {
            key: 'Content-Type',
            value: 'video/mp4'
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ]
  },
  // Configure static file serving
  async rewrites() {
    return [
      {
        source: '/videos/:path*',
        destination: '/static/videos/:path*'
      }
    ]
  }
}

module.exports = nextConfig 