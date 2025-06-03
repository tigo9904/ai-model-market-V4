import { supabase, type ProductWithImages } from "./supabase"
import type { Product } from "@/types/product"

// Convert database product to frontend product format
function convertToProduct(dbProduct: ProductWithImages): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    category: dbProduct.category,
    paymentLink: dbProduct.payment_link,
    images: dbProduct.product_images.sort((a, b) => a.image_order - b.image_order).map((img) => img.image_url),
    createdAt: dbProduct.created_at,
    updatedAt: dbProduct.updated_at,
  }
}

// Fetch all products
export async function getProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        product_images (*)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching products:", error)
      return []
    }

    return (data as ProductWithImages[]).map(convertToProduct)
  } catch (error) {
    console.error("Error in getProducts:", error)
    return []
  }
}

// Create a new product
export async function createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product | null> {
  try {
    // Insert product
    const { data: productData, error: productError } = await supabase
      .from("products")
      .insert({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        payment_link: product.paymentLink,
      })
      .select()
      .single()

    if (productError) {
      console.error("Error creating product:", productError)
      return null
    }

    // Insert images
    if (product.images.length > 0) {
      const imageInserts = product.images.map((imageUrl, index) => ({
        product_id: productData.id,
        image_url: imageUrl,
        image_order: index,
      }))

      const { error: imageError } = await supabase.from("product_images").insert(imageInserts)

      if (imageError) {
        console.error("Error creating product images:", imageError)
        // Don't return null here, product was created successfully
      }
    }

    // Fetch the complete product with images
    const { data: completeProduct, error: fetchError } = await supabase
      .from("products")
      .select(`
        *,
        product_images (*)
      `)
      .eq("id", productData.id)
      .single()

    if (fetchError) {
      console.error("Error fetching created product:", fetchError)
      return null
    }

    return convertToProduct(completeProduct as ProductWithImages)
  } catch (error) {
    console.error("Error in createProduct:", error)
    return null
  }
}

// Update a product
export async function updateProduct(product: Product): Promise<Product | null> {
  try {
    // Update product
    const { data: productData, error: productError } = await supabase
      .from("products")
      .update({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category,
        payment_link: product.paymentLink,
        updated_at: new Date().toISOString(),
      })
      .eq("id", product.id)
      .select()
      .single()

    if (productError) {
      console.error("Error updating product:", productError)
      return null
    }

    // Delete existing images
    const { error: deleteError } = await supabase.from("product_images").delete().eq("product_id", product.id)

    if (deleteError) {
      console.error("Error deleting old images:", deleteError)
    }

    // Insert new images
    if (product.images.length > 0) {
      const imageInserts = product.images.map((imageUrl, index) => ({
        product_id: product.id,
        image_url: imageUrl,
        image_order: index,
      }))

      const { error: imageError } = await supabase.from("product_images").insert(imageInserts)

      if (imageError) {
        console.error("Error creating new product images:", imageError)
      }
    }

    // Fetch the complete updated product with images
    const { data: completeProduct, error: fetchError } = await supabase
      .from("products")
      .select(`
        *,
        product_images (*)
      `)
      .eq("id", product.id)
      .single()

    if (fetchError) {
      console.error("Error fetching updated product:", fetchError)
      return null
    }

    return convertToProduct(completeProduct as ProductWithImages)
  } catch (error) {
    console.error("Error in updateProduct:", error)
    return null
  }
}

// Delete a product
export async function deleteProduct(productId: string): Promise<boolean> {
  try {
    // Delete product (images will be deleted automatically due to CASCADE)
    const { error } = await supabase.from("products").delete().eq("id", productId)

    if (error) {
      console.error("Error deleting product:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error in deleteProduct:", error)
    return false
  }
}
