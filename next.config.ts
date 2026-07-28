import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Lets you open the dev server from another device on the same
  // Wi-Fi network (e.g. testing on a phone at http://192.168.1.32:3000).
  // Update this if your computer's local IP changes.
  allowedDevOrigins: ["192.168.1.32"],
};

export default nextConfig;
