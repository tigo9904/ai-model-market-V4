import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  // 🔥 UPDATE THIS WITH YOUR ACTUAL VERCEL URL
  const baseUrl = "https://aimodelmarket.io" // Replace with your actual Vercel URL

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/_next/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/admin/", "/api/", "/private/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
