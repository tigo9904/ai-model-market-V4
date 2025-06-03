"use server"

import { put } from "@vercel/blob"
import { Buffer } from "buffer" // Node.js Buffer

interface UploadResult {
  urls?: string[]
  error?: string
}

export async function uploadProductImagesAction(base64Images: string[]): Promise<UploadResult> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    console.error("BLOB_READ_WRITE_TOKEN is not configured.")
    return { error: "File upload service is not configured correctly. Missing token." }
  }

  const uploadedUrls: string[] = []

  try {
    for (let i = 0; i < base64Images.length; i++) {
      const base64Image = base64Images[i]
      if (!base64Image || !base64Image.startsWith("data:image/")) {
        console.warn(`Invalid base64 image format provided at index ${i}:`, base64Image?.substring(0, 100))
        // Optionally skip this image or return an error for the whole batch
        continue // Skip this image
      }

      const parts = base64Image.split(",")
      if (parts.length !== 2) {
        console.warn(`Malformed base64 image data at index ${i}.`)
        continue
      }
      const base64Data = parts[1]
      const imageTypeMatch = parts[0].match(/^data:(image\/[a-zA-Z+]+);base64$/)
      const imageType = imageTypeMatch && imageTypeMatch[1] ? imageTypeMatch[1] : "image/jpeg" // Default to jpeg

      // Convert base64 to Buffer for Node.js environment
      const buffer = Buffer.from(base64Data, "base64")

      const uniqueFileName = `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${imageType.split("/")[1] || "jpg"}`

      const { url } = await put(uniqueFileName, buffer, {
        access: "public",
        contentType: imageType,
        token: process.env.BLOB_READ_WRITE_TOKEN, // Explicitly pass token for clarity, though `put` should pick it up
      })
      uploadedUrls.push(url)
    }

    if (uploadedUrls.length === 0 && base64Images.length > 0) {
      return { error: "No images were successfully uploaded. Check image formats or server logs." }
    }
    return { urls: uploadedUrls }
  } catch (error) {
    console.error("Error uploading images to Blob via Server Action:", error)
    const errorMessage = error instanceof Error ? error.message : "Unknown error during upload."
    // Check for specific Vercel Blob errors if possible
    if (errorMessage.includes("No token found")) {
      return { error: "File upload configuration error: The server is missing the required access token." }
    }
    return { error: `Failed to upload images: ${errorMessage}` }
  }
}
