import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    // Option 1: Allow all domains (wildcard)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    // Option 2: Or explicitly allow domains
    // domains: ["example.com", "anotherdomain.com"],
  },
};

export default withNextIntl(nextConfig);
