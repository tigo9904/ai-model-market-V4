import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

// 🔥 UPDATE THIS WITH YOUR ACTUAL VERCEL URL
const SITE_URL = "https://aimodelmarket.io" // Replace with your actual Vercel URL

export const metadata: Metadata = {
  title: "AI Influencer Hub - Premium AI Influencer Models Marketplace",
  description:
    "Discover and purchase cutting-edge AI influencer models for your brand. High-quality, customizable, and ready to engage your audience. Starter and Pro packages available.",
  keywords: [
    "AI influencer",
    "AI models",
    "digital influencer",
    "AI marketing",
    "virtual influencer",
    "AI content creation",
    "ComfyUI",
    "LoRa models",
    "AI generated content",
    "digital marketing",
  ],
  authors: [{ name: "AI Influencer Hub" }],
  creator: "AI Influencer Hub",
  publisher: "AI Influencer Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AI Influencer Hub - Premium AI Influencer Models",
    description:
      "Discover and purchase cutting-edge AI influencer models for your brand. High-quality, customizable, and ready to engage your audience.",
    url: SITE_URL,
    siteName: "AI Influencer Hub",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Influencer Hub - Premium AI Models",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Influencer Hub - Premium AI Influencer Models",
    description: "Discover and purchase cutting-edge AI influencer models for your brand.",
    images: ["/og-image.png"],
    creator: "@yourtwitterhandle", // Replace with your Twitter handle if you have one
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-verification-code", // Add later when you set up Google Search Console
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional SEO tags */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Schema.org structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AI Influencer Hub",
              description: "Premium AI influencer models marketplace",
              url: SITE_URL,
              logo: `${SITE_URL}/logo.png`,
              potentialAction: {
                "@type": "SearchAction",
                target: `${SITE_URL}/search?q={search_term_string}`,
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
