import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images:{
    remotePatterns: [
      {
        hostname:"marshal-lms-yt.t3.storageapi.dev",
        port:'',
        protocol:'https'
      }
    ]
   }
};

export default nextConfig;
