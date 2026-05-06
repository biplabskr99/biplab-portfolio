import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow accessing the dev server from your mobile phone/other devices on the network
  // @ts-ignore
  allowedDevOrigins: ["192.168.0.214"],
};

export default nextConfig;
