import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const pages = ["", "/collections", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
  const items = products.map((p) => ({
    url: `${base}/products/${p.slug}`,
    lastModified: new Date(),
  }));
  return [...pages, ...items];
}