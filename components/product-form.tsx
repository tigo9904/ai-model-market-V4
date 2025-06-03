"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Product } from "@/types/product"
// Import the server action
import { uploadProductImagesAction } from "@/app/admin/actions" // Adjusted path

interface ProductFormProps {
  product?: Product | null
  onSubmit: (product: Product | Omit<Product, "id">) => void
  onCancel: () => void
}

export default function ProductForm({ product, onSubmit, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || "",
    // Existing images are URLs from the database
    images: product?.images || [],
    paymentLink: product?.paymentLink || "",
    category: product?.category || "Starter Package",
  })

  // Store temporary base64 images (newly selected files)
  const [newTempImages, setNewTempImages] = useState<string[]>([])

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isProcessingImages, setIsProcessingImages] = useState(false) // For client-side resizing
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.price.trim()) newErrors.price = "Price is required"
    if (!formData.paymentLink.trim()) newErrors.paymentLink = "Payment link is required"
    if (!formData.paymentLink.startsWith("http"))
      newErrors.paymentLink = "Payment link must be a valid URL (e.g., http://... or https://...)"

    const hasImages = formData.images.length > 0 || newTempImages.length > 0
    if (!hasImages) newErrors.images = "At least one image is required"

    setFormErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUploadError(null)

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      let finalImageUrls = [...formData.images] // Start with existing image URLs

      // If there are new temporary (base64) images, upload them
      if (newTempImages.length > 0) {
        const uploadResult = await uploadProductImagesAction(newTempImages)

        if (uploadResult.error || !uploadResult.urls || uploadResult.urls.length === 0) {
          setUploadError(uploadResult.error || "Failed to upload new images. Please try again.")
          setIsSubmitting(false)
          return
        }
        finalImageUrls = [...finalImageUrls, ...uploadResult.urls]
      }

      const productDataToSubmit = {
        ...formData,
        images: finalImageUrls,
      }

      await onSubmit(product ? { ...product, ...productDataToSubmit } : productDataToSubmit)
      // Clear temporary images on successful submission
      setNewTempImages([])
    } catch (error) {
      console.error("Error submitting product:", error)
      setUploadError(
        `Error during product submission. Details: ${error instanceof Error ? error.message : String(error)}`,
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageSelection = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    setUploadError(null)
    const currentTotalImages = formData.images.length + newTempImages.length
    if (currentTotalImages + files.length > 5) {
      alert("Maximum 5 images allowed per product.")
      return
    }

    setIsProcessingImages(true)

    try {
      const resizedBase64Images = await Promise.all(
        files.map(async (file) => {
          return new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (event) => {
              const img = new Image()
              img.onload = () => {
                const canvas = document.createElement("canvas")
                const ctx = canvas.getContext("2d")
                const maxWidth = 1920
                const maxHeight = 1920
                let { width, height } = img

                if (width > maxWidth || height > maxHeight) {
                  const ratio = Math.min(maxWidth / width, maxHeight / height)
                  width *= ratio
                  height *= ratio
                }
                canvas.width = width
                canvas.height = height
                ctx?.drawImage(img, 0, 0, width, height)
                resolve(canvas.toDataURL("image/jpeg", 0.95))
              }
              img.onerror = (err) => reject(new Error(`Failed to load image: ${file.name}. It might be corrupted.`))
              if (event.target?.result) {
                img.src = event.target.result as string
              } else {
                reject(new Error("Failed to read file."))
              }
            }
            reader.onerror = () => reject(new Error("Failed to read file."))
            reader.readAsDataURL(file)
          })
        }),
      )
      setNewTempImages((prev) => [...prev, ...resizedBase64Images])
    } catch (error) {
      console.error("Error processing image file:", error)
      setUploadError(
        `Error processing image(s). Please try different images. Details: ${error instanceof Error ? error.message : String(error)}`,
      )
    } finally {
      setIsProcessingImages(false)
    }
  }

  const removeExistingImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== indexToRemove),
    }))
  }

  const removeNewTempImage = (indexToRemove: number) => {
    setNewTempImages((prev) => prev.filter((_, i) => i !== indexToRemove))
  }

  const allDisplayImages = [
    ...formData.images.map((url) => ({ type: "existing" as const, src: url })),
    ...newTempImages.map((base64) => ({ type: "new" as const, src: base64 })),
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {uploadError && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          <p className="font-semibold">Upload Error:</p>
          <p>{uploadError}</p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g., Luna - Fashion Influencer"
            required
          />
          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            value={formData.price}
            onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
            placeholder="e.g., $299"
            required
          />
          {formErrors.price && <p className="text-red-500 text-sm">{formErrors.price}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => {
              if (value === "Starter Package") {
                setFormData((prev) => ({
                  ...prev,
                  category: value,
                  price: "$497",
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
                }))
              } else if (value === "Pro Package") {
                setFormData((prev) => ({
                  ...prev,
                  category: value,
                  price: "$997",
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
                }))
              } else {
                setFormData((prev) => ({ ...prev, category: value }))
              }
            }}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Starter Package">Starter Package</SelectItem>
              <SelectItem value="Pro Package">Pro Package</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="paymentLink">Payment Link</Label>
          <Input
            id="paymentLink"
            type="url"
            value={formData.paymentLink}
            onChange={(e) => setFormData((prev) => ({ ...prev, paymentLink: e.target.value }))}
            placeholder="https://your-payment-provider.com/product-link"
            required
          />
          {formErrors.paymentLink && <p className="text-red-500 text-sm">{formErrors.paymentLink}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
          placeholder="Describe your AI influencer model, its capabilities, and ideal use cases..."
          rows={16}
          required
        />
        {formErrors.description && <p className="text-red-500 text-sm">{formErrors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="images">
          Product Images ({allDisplayImages.length}/5)
          {isProcessingImages && <span className="text-blue-600"> - Resizing images...</span>}
        </Label>
        <Input
          id="images"
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageSelection}
          disabled={isProcessingImages || allDisplayImages.length >= 5}
          className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
        />
        {formErrors.images && <p className="text-red-500 text-sm">{formErrors.images}</p>}
        <p className="text-sm text-gray-500">
          Maximum 5 images. Images will be automatically resized to 1920x1920px maximum while maintaining quality and
          aspect ratio.
        </p>

        {allDisplayImages.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
            {allDisplayImages.map((image, index) => (
              <div key={`${image.type}-${index}`} className="relative group">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg border"
                />
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 h-6 w-6 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() =>
                    image.type === "existing"
                      ? removeExistingImage(formData.images.indexOf(image.src))
                      : removeNewTempImage(newTempImages.indexOf(image.src))
                  }
                >
                  ×
                </Button>
                {index === 0 && (
                  <div className="absolute bottom-1 left-1 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded">
                    Main
                  </div>
                )}
                {image.type === "new" && (
                  <div className="absolute top-1 left-1 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded">New</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <Button
          type="submit"
          className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
          disabled={isSubmitting || isProcessingImages}
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              {product ? "Updating Product..." : "Adding Product..."}
            </>
          ) : product ? (
            "Update Product"
          ) : (
            "Add Product"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isSubmitting || isProcessingImages}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
