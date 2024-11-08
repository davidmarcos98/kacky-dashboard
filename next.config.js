/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/twitch/clip/:path/:path',
        destination: '/api/twitch/clip',
      },
      {
        source: '/api/twitch/clip/:path',
        destination: '/api/twitch/clip/:path',
      },
    ]
  },
  reactStrictMode: false,
}

module.exports = nextConfig
