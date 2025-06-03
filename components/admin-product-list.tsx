"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, ExternalLink } from "lucide-react"
import type { Product } from "@/types/product"
import Image from "next/image"

interface AdminProductListProps {
  products: Product[]
  onEdit: (product: Product) => void
  onDelete: (id: string) => void
  isLoading?: boolean
}

export default function AdminProductList({ products, onEdit, onDelete, isLoading = false }: AdminProductListProps) {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-gray-500 text-lg">No products added yet.</p>
          <p className="text-gray-400 mt-2">Click "Add Product" to get started!</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Products ({products.length})</h2>
      {products.map((product) => (
        <Card key={product.id}>
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <Badge variant="secondary" className="mb-2">
                      {product.category}
                    </Badge>
                    <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-purple-600">{product.price}</span>
                      <a
                        href={product.paymentLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                      >
                        Payment Link <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(product)}
                      className="gap-2 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all duration-200 active:scale-95"
                      disabled={isLoading}
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(product.id)}
                      className="gap-2 hover:bg-red-600 transition-all duration-200 active:scale-95"
                      disabled={isLoading}
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
