import type { NextConfig } from "next";
import { apiUrl } from "./lib/api";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // The browser only talks to this origin; these paths are proxied to the
  // pop-ladle backend. Without API_URL the forms show "being connected".
  async rewrites() {
    if (!apiUrl) return [];
    return [
      { source: "/api/early-access", destination: `${apiUrl}/api/v1/early-access` },
      { source: "/api/subscriber/:path*", destination: `${apiUrl}/api/v1/subscriber/:path*` },
      { source: "/api/contact", destination: `${apiUrl}/api/v1/contact` },
    ];
  },
  // Old static-site URLs keep working.
  async redirects() {
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/contact.html", destination: "/contact", permanent: true },
      { source: "/privacy.html", destination: "/privacy", permanent: true },
      { source: "/thank-you.html", destination: "/thank-you", permanent: true },
    ];
  },
};

export default nextConfig;
