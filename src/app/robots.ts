import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://geraldgyimah.com";

  return {
    rules: [
      {
        // Allow all bots on all public routes
        userAgent: "*",
        allow: "/",
        // Block Sanity Studio — it's an authenticated tool, not public content
        disallow: "/studio",
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
