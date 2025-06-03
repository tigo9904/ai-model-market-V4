"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

interface ImageSliderProps {
  images: string[]
  alt: string
  onImageClick: (imageIndex: number) => void
}

export default function ImageSlider({ images, alt, onImageClick }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="relative h-full bg-gray-200 rounded-lg flex items-center justify-center">
        <span className="text-gray-500">No images available</span>
      </div>
    )
  }

  const goToPrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))
  }

  const goToNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1))
  }

  const handleDotClick = (e: React.MouseEvent, index: number) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentIndex(index)
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg group">
      <Image
        src={images[currentIndex] || "/placeholder.svg"}
        alt={`${alt} - Image ${currentIndex + 1}`}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={() => onImageClick(currentIndex)}
      />

      {/* Navigation arrows - Previous/Next buttons */}
      {images.length > 1 && (
        <>
          <Button
            size="sm"
            variant="secondary"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-black/70 hover:bg-black/90 text-white border-0 opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-90 shadow-lg z-20"
            onClick={goToPrevious}
            title="Previous image"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            size="sm"
            variant="secondary"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 bg-black/70 hover:bg-black/90 text-white border-0 opacity-0 group-hover:opacity-100 transition-all duration-200 active:scale-90 shadow-lg z-20"
            onClick={goToNext}
            title="Next image"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </>
      )}

      {/* Image indicators/dots - clickable to jump to specific image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-200 hover:scale-110 ${
                index === currentIndex ? "bg-white shadow-lg" : "bg-white/60 hover:bg-white/80"
              }`}
              onClick={(e) => handleDotClick(e, index)}
              title={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
