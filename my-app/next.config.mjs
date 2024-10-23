/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['img.clerk.com', 'utfs.io'],
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'img.clerk.com',
          port: ''
        },

        {
          protocol: 'https',
          hostname: 'utfs.io',
          port: ''
        }
      ]
    }
  }
  
export default nextConfig