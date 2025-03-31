import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        // Optional: Add pathname restrictions for better security
        pathname: "/**", // Allows all paths under res.cloudinary.com
      },
    ],
    // Optional: Add deviceSizes and imageSizes for better optimization
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Optional: Configure formats and minimumCacheTTL
    formats: ["image/webp"],
    minimumCacheTTL: 60,
  },
  // Other Next.js config options...
};

export default nextConfig;
