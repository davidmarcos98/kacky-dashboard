/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/twitch/clip/:path(\\d{1,})',
        destination: '/api/twitch/clip/:path',
      },
      {
        source: '/api/twitch/clip/:path*',
        destination: '/api/twitch/clip',
      },
    ]
  },
  reactStrictMode: false,
}

module.exports = nextConfig
