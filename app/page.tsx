import Link from "next/link"
import { Suspense } from "react"
import ProductGrid from "@/components/product-grid"
import Header from "@/components/header"
import Hero from "@/components/hero"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Influencer Hub - Premium AI Influencer Models Marketplace",
  description:
    "Discover and purchase cutting-edge AI influencer models for your brand. High-quality, customizable, and ready to engage your audience. Starter packages from $497, Pro packages from $997.",
  openGraph: {
    title: "AI Influencer Hub - Premium AI Influencer Models",
    description:
      "Discover and purchase cutting-edge AI influencer models for your brand. High-quality, customizable, and ready to engage your audience.",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Influencer Hub - Premium AI Influencer Models",
    description: "Discover and purchase cutting-edge AI influencer models for your brand.",
    images: ["/og-image.png"],
  },
}

// Add structured data for the homepage
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "AI Influencer Hub",
  description:
    "Premium AI influencer models marketplace offering high-quality, customizable AI models for brands and content creators.",
  url: "https://aimodelmarket.io", // 🔥 UPDATE THIS WITH YOUR ACTUAL VERCEL URL
  logo: "https://aimodelmarket.io/logo.png", // 🔥 UPDATE THIS WITH YOUR ACTUAL VERCEL URL
  image: "https://aimodelmarket.io/og-image.png", // 🔥 UPDATE THIS WITH YOUR ACTUAL VERCEL URL
  priceRange: "$497-$997",
  paymentAccepted: ["Credit Card", "PayPal"],
  currenciesAccepted: "USD",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "AI Influencer Models",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Starter Package",
          description: "Custom built pre-made AI Model LoRa with basic ComfyUI workflow",
        },
        price: "497",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Product",
          name: "Pro Package",
          description: "Complete AI influencer package with marketing materials and advanced workflows",
        },
        price: "997",
        priceCurrency: "USD",
      },
    ],
  },
}

export default function HomePage() {
  return (
    <>
      {/* Add structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <Hero />
        <main className="container mx-auto px-4 py-12">
          <Suspense fallback={<div className="text-center">Loading products...</div>}>
            <ProductGrid />
          </Suspense>
        </main>
        <footer className="bg-white border-t py-8">
          <div className="container mx-auto px-4 text-center">
            <p className="text-gray-600">© {new Date().getFullYear()} Ai Model Market. All rights reserved.</p>
            <div className="mt-4 flex justify-center space-x-6">
              <Link href="/terms" className="text-gray-500 hover:text-purple-600 transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-purple-600 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/contact" className="text-gray-500 hover:text-purple-600 transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
