/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {

    serverActions: true,
    
    },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'm.media-amazon.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: "encrypted-tbn0.gstatic.com",
        port: '',
        pathname: '/**',
      },
    ],
  },
  
};

export default nextConfig;
