import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/admin/"],
      },
    ],
    sitemap: "https://website-pi-ruddy-23.vercel.app/sitemap.xml",
    host: "https://website-pi-ruddy-23.vercel.app",
  };
}
