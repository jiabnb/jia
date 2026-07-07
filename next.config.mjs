/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  webpack: (config) => {
    // Silence optional peer deps pulled in by wagmi connectors that we don't use.
    config.externals.push("pino-pretty", "@react-native-async-storage/async-storage");
    return config;
  },
};

export default nextConfig;
