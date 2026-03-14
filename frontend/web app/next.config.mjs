/** @type {import('next').NextConfig} */
import path from "path";
const nextConfig = {
  /* config options here */
  outputFileTracingRoot: path.join(process.cwd()),
};

export default nextConfig;
