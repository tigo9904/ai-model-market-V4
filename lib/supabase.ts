import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database
export interface DatabaseProduct {
  id: string
  name: string
  description: string
  price: string
  category: string
  payment_link: string
  created_at: string
  updated_at: string
}

export interface DatabaseProductImage {
  id: string
  product_id: string
  image_url: string
  image_order: number
  created_at: string
}

export interface ProductWithImages extends DatabaseProduct {
  product_images: DatabaseProductImage[]
}
