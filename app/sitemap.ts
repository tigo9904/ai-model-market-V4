import type { MetadataRoute } from "next"
import { getProducts } from "@/lib/database"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 🔥 UPDATE THIS WITH YOUR ACTUAL VERCEL URL
  const baseUrl = "https://aimodelmarket.io" // Replace with your actual Vercel URL

  // Get all products for dynamic URLs
  const products = await getProducts()

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/admin/login`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.3,
    },
  ]

  // Dynamic product pages (if you add individual product pages later)
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(product.updatedAt || product.createdAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...productPages]
}
