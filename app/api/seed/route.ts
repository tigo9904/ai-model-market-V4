import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

// This is a helper API route to seed your database with sample products
// You can call this route to create sample products in your database

export async function GET() {
  try {
    // Check if we already have products
    const { count, error: countError } = await supabase.from("products").select("*", { count: "exact", head: true })

    if (countError) {
      return NextResponse.json({ error: "Failed to check existing products" }, { status: 500 })
    }

    // If we already have products, don't seed again
    if (count && count > 0) {
      return NextResponse.json({ message: "Database already has products", count }, { status: 200 })
    }

    // Sample product data
    const products = [
      {
        name: "Starter AI Model Package",
        description: `Starter Package ($497)

(For Beginners Ready To Launch Their First AI Model whilst skipping the AI Creation Phase)

What You Get:

• A Custom Built Pre-made AI Model LoRa - (So that you can plug and play and start generating images of your model immediately)
• A Basic ComfyUI Workflow - (So that you can skip the platform setup and plug in your LoRa Immediately)  
• A Basic ComfyUI Workflow Video Guide - (So you know how to use the Lora to create content)

This Package Is Perfect For:

• People who are just starting out in their AI Model journey and would like to skip the trial and error phase of designing and creating their first model
• People who have completed The AI Model Method $47 course and would like to take their AI Model business to the next level immediately
• Those who are struggling to generate consistent ultra realistic content
• Those who want to fast track the process and have an extremely high quality AI Model within the next couple minutes`,
        price: "$497",
        category: "Starter Package",
        payment_link: "https://example.com/pay/starter-package",
      },
      {
        name: "Pro AI Model Package",
        description: `Pro Package ($997)

(For Serious AI Model Creators Ready To Monetise)

What You Get:

EVERYTHING IN 'STARTER PACKAGE', PLUS:

• 15 Pre-made Instagram Posts - (So that you can start marketing immediately)
• 15 Fanvue Free Wall Posts - (So that you have a Fanvue worth subscribing to today)
• 1 Fanvue Profile Picture - (Designed for conversions)
• 1 Fanvue Banner Image - (A 5 image collage designed for conversion)
• 1 Image ready to turn into a Fanvue Intro Video - (To help boost your discoverability and conversions)

Bonuses:

• Intermediate ComfyUI Workflow + Upscaler - (So that you can develop content on the most advanced AI platform with ease)
• Video Tutorial Guide
• SFW Prompt Guide

This Package Is Perfect For:

• Creators who understand the basics and are ready to establish a profitable AI Model presence
• Those who want a head start getting their AI Model business up and running from DAY 1
• Creators looking to implement a world class level AI Model into their business`,
        price: "$997",
        category: "Pro Package",
        payment_link: "https://example.com/pay/pro-package",
      },
    ]

    // Insert products
    const { data: productData, error: productError } = await supabase.from("products").insert(products).select()

    if (productError) {
      return NextResponse.json({ error: "Failed to seed products" }, { status: 500 })
    }

    // Create sample image URLs
    const sampleImageUrls = [
      "https://public-files.gumroad.com/variants/3ot5gzm2l2t9xtrvs2fg3ixotnqe/baaca0eb0e33dc4f9d45910b8c86623f0144cea0fe0c2093c546d17d535752eb",
      "https://public-files.gumroad.com/variants/3ot5gzm2l2t9xtrvs2fg3ixotnqe/baaca0eb0e33dc4f9d45910b8c86623f0144cea0fe0c2093c546d17d535752eb",
    ]

    // Insert sample images for each product
    const imageInserts = productData.flatMap((product, productIndex) => {
      return [
        {
          product_id: product.id,
          image_url: sampleImageUrls[productIndex % sampleImageUrls.length],
          image_order: 0,
        },
        {
          product_id: product.id,
          image_url: sampleImageUrls[(productIndex + 1) % sampleImageUrls.length],
          image_order: 1,
        },
      ]
    })

    const { error: imageError } = await supabase.from("product_images").insert(imageInserts)

    if (imageError) {
      return NextResponse.json({ error: "Failed to seed product images" }, { status: 500 })
    }

    return NextResponse.json(
      {
        message: "Database seeded successfully",
        products: productData.length,
        images: imageInserts.length,
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Error seeding database:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
