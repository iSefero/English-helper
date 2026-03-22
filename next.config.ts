import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/lessons",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
