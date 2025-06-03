/**
 * This file contains utility functions for working with Vercel Blob storage
 * for storing and retrieving product images
 */

import { put } from "@vercel/blob"

/**
 * Uploads an image to Vercel Blob storage
 * @param base64Image - Base64 encoded image string
 * @param fileName - Optional file name (will generate one if not provided)
 * @returns URL of the uploaded image
 */
export async function uploadImageToBlob(base64Image: string, fileName?: string): Promise<string> {
  try {
    if (!base64Image || !base64Image.startsWith("data:image/")) {
      console.error("Invalid base64 image format provided to uploadImageToBlob:", base64Image?.substring(0, 100))
      throw new Error("Invalid image data format. Expected data URL.")
    }
    // Extract the base64 data (remove the data:image/jpeg;base64, part)
    const base64Data = base64Image.split(",")[1]

    // Convert base64 to blob
    const byteCharacters = atob(base64Data)
    const byteArrays = []

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
      const slice = byteCharacters.slice(offset, offset + 1024)

      const byteNumbers = new Array(slice.length)
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i)
      }

      const byteArray = new Uint8Array(byteNumbers)
      byteArrays.push(byteArray)
    }

    const blob = new Blob(byteArrays, { type: "image/jpeg" })

    // Generate a unique file name if not provided
    const uniqueFileName = fileName || `product-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.jpg`

    // Upload to Vercel Blob
    const imageType = base64Image.substring(base64Image.indexOf(":") + 1, base64Image.indexOf(";"))
    const { url } = await put(uniqueFileName, blob, {
      access: "public",
      contentType: imageType || "image/jpeg", // Fallback to image/jpeg if type extraction fails
    })

    return url
  } catch (error) {
    console.error("Error uploading image to Blob:", error)
    throw new Error("Failed to upload image")
  }
}

/**
 * Uploads multiple images to Vercel Blob storage
 * @param base64Images - Array of base64 encoded image strings
 * @returns Array of URLs of the uploaded images
 */
export async function uploadMultipleImagesToBlob(base64Images: string[]): Promise<string[]> {
  try {
    const uploadPromises = base64Images.map((image, index) =>
      uploadImageToBlob(image, `product-${Date.now()}-${index}.jpg`),
    )

    return await Promise.all(uploadPromises)
  } catch (error) {
    console.error("Error uploading multiple images to Blob:", error)
    throw new Error("Failed to upload images")
  }
}
