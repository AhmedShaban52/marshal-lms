/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { NextConfig } from "next";
// @ts-ignore
import { PrismaPlugin } from "@prisma/nextjs-monorepo-workaround-plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "marshal-lms-yt.t3.storageapi.dev",
        port: "",
        protocol: "https",
      },
    ],
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    return config;
  },
};

export default nextConfig;
