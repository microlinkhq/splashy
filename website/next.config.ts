import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // splashy → sharp uses native binaries; bundling breaks install-time platform targets
  serverExternalPackages: ["sharp", "splashy"],
};

export default nextConfig;
