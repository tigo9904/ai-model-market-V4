"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { Product } from "@/types/product"
import { useState } from "react"
import ImageSlider from "./image-slider"
import ImageModal from "./image-modal"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalImageIndex, setModalImageIndex] = useState(0)
  const [isPurchasing, setIsPurchasing] = useState(false)

  const handlePurchase = async () => {
    setIsPurchasing(true)

    // Add a small delay to show loading state
    setTimeout(() => {
      window.open(product.paymentLink, "_blank")
      setIsPurchasing(false)
    }, 500)
  }

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg">
      <div className="relative aspect-[4/5] overflow-hidden">
        <ImageSlider
          images={product.images}
          alt={product.name}
          onImageClick={(index) => {
            setModalImageIndex(index)
            setIsModalOpen(true)
          }}
        />
        <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg backdrop-blur-sm border-0 px-3 py-1 text-sm font-medium z-10">
          Premium
        </Badge>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>
      <CardContent className="p-8 relative">
        {/* Decorative element */}
        <div className="absolute top-0 left-8 w-12 h-1 bg-gradient-to-r from-purple-600 to-pink-600 transform -translate-y-1/2" />

        <div className="space-y-4">
          <h3 className="text-2xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight">
            {product.name}
          </h3>
          <p className="text-lg font-semibold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent leading-relaxed">
            {product.category}
          </p>
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              {product.price}
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-600 font-medium">Available</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-8 pt-0">
        <Button
          className="w-full gap-3 h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] border-0 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handlePurchase}
          disabled={isPurchasing}
        >
          {isPurchasing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Purchase Now</span>
              <ExternalLink className="h-5 w-5" />
            </>
          )}
        </Button>
      </CardFooter>
      <ImageModal
        images={product.images}
        initialIndex={modalImageIndex}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        alt={product.name}
      />
    </Card>
  )
}
