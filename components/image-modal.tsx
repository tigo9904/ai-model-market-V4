"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ImageModalProps {
  images: string[]
  initialIndex: number
  isOpen: boolean
  onClose: () => void
  alt: string
}

export default function ImageModal({ images, initialIndex, isOpen, onClose, alt }: ImageModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    setCurrentIndex(initialIndex)
  }, [initialIndex])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "Escape":
          onClose()
          break
        case "ArrowLeft":
          goToPrevious()
          break
        case "ArrowRight":
          goToNext()
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
      {/* Close button */}
      <Button
        size="sm"
        variant="secondary"
        className="absolute top-4 right-4 h-10 w-10 p-0 bg-white/10 hover:bg-white/20 text-white border-0 z-10 transition-all duration-200 active:scale-90"
        onClick={onClose}
      >
        <X className="h-5 w-5" />
      </Button>

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <Button
            size="sm"
            variant="secondary"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 h-12 w-12 p-0 bg-white/10 hover:bg-white/20 text-white border-0 z-10 transition-all duration-200 active:scale-90"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 p-0 bg-white/10 hover:bg-white/20 text-white border-0 z-10 transition-all duration-200 active:scale-90"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Image */}
      <div className="relative max-w-4xl max-h-[80vh] w-full h-full flex items-center justify-center">
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${alt} - Image ${currentIndex + 1}`}
          width={800}
          height={600}
          className="max-w-full max-h-full object-contain"
          priority
        />
      </div>

      {/* Image counter and info */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-lg">
        <div className="text-center">
          <div className="text-sm opacity-75">{alt}</div>
          {images.length > 1 && (
            <div className="text-lg font-medium">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail navigation for multiple images */}
      {images.length > 1 && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-2 max-w-md overflow-x-auto p-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex ? "border-white" : "border-transparent opacity-60 hover:opacity-80"
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />
    </div>
  )
}
