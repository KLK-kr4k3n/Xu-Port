import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/media/[unit]/[...asset]": ["./00/**/*", "./01/**/*", "./02/**/*", "./03/**/*", "./04/**/*", "./05/**/*"]
  }
};

export default nextConfig;
