export interface Product {
  id: string
  name: string
  description: string
  price: string
  images: string[] // Array of image URLs
  paymentLink: string
  category: string
  createdAt?: string
  updatedAt?: string
}
