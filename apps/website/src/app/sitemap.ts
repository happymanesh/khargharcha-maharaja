import { MetadataRoute } from "next";

const BASE = "https://website-pi-ruddy-23.vercel.app";
const locales = ["mr", "hi", "en", "gu", "bn", "pa", "ta", "te", "ml", "kn"];
const pages = ["", "/about", "/events", "/gallery", "/donate", "/live", "/contact", "/membership", "/volunteer"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${BASE}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "daily" : page === "/events" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : page === "/donate" || page === "/events" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
