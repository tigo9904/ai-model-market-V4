"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, ArrowLeft, LogOut } from "lucide-react"
import Link from "next/link"
import ProductForm from "@/components/product-form"
import AdminProductList from "@/components/admin-product-list"
import type { Product } from "@/types/product"
import { getProducts, createProduct, updateProduct, deleteProduct } from "@/lib/database"
import { isAdminAuthenticated, logoutAdmin } from "@/lib/auth"

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Check authentication on component mount
  useEffect(() => {
    if (!isAdminAuthenticated()) {
      router.push("/admin/login")
      return
    }
    fetchProducts()
  }, [router])

  const handleLogout = () => {
    logoutAdmin()
    router.push("/admin/login")
  }

  const fetchProducts = async () => {
    try {
      setIsLoading(true)
      const fetchedProducts = await getProducts()
      setProducts(fetchedProducts)
    } catch (err) {
      console.error("Error fetching products:", err)
      setError("Failed to load products")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddProduct = async (product: Omit<Product, "id">) => {
    setIsLoading(true)
    setError(null)

    try {
      const newProduct = await createProduct(product)
      if (newProduct) {
        setProducts((prev) => [newProduct, ...prev])
        setShowForm(false)
        alert("Product added successfully!")
      } else {
        setError("Failed to add product. Please try again.")
      }
    } catch (error) {
      console.error("Error adding product:", error)
      setError("Failed to add product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditProduct = async (product: Product) => {
    setIsLoading(true)
    setError(null)

    try {
      const updatedProduct = await updateProduct(product)
      if (updatedProduct) {
        setProducts((prev) => prev.map((p) => (p.id === product.id ? updatedProduct : p)))
        setEditingProduct(null)
        setShowForm(false)
        alert("Product updated successfully!")
      } else {
        setError("Failed to update product. Please try again.")
      }
    } catch (error) {
      console.error("Error updating product:", error)
      setError("Failed to update product. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      setIsLoading(true)
      setError(null)

      try {
        const success = await deleteProduct(id)
        if (success) {
          setProducts((prev) => prev.filter((p) => p.id !== id))
          alert("Product deleted successfully!")
        } else {
          setError("Failed to delete product. Please try again.")
        }
      } catch (error) {
        console.error("Error deleting product:", error)
        setError("Failed to delete product. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  // Don't render anything if not authenticated (will redirect)
  if (!isAdminAuthenticated()) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Store
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => {
                setShowForm(true)
                setEditingProduct(null)
              }}
              className="gap-2 hover:scale-105 transition-transform duration-200 active:scale-95"
              disabled={isLoading}
            >
              <Plus className="h-4 w-4" />
              {isLoading ? "Processing..." : "Add Product"}
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-700"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
            <Button variant="outline" size="sm" onClick={() => setError(null)} className="mt-2">
              Dismiss
            </Button>
          </div>
        )}

        {showForm ? (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{editingProduct ? "Edit Product" : "Add New Product"}</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductForm
                product={editingProduct}
                onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                onCancel={() => {
                  setShowForm(false)
                  setEditingProduct(null)
                }}
              />
            </CardContent>
          </Card>
        ) : null}

        <AdminProductList
          products={products}
          onEdit={(product) => {
            setEditingProduct(product)
            setShowForm(true)
          }}
          onDelete={handleDeleteProduct}
          isLoading={isLoading}
        />
      </div>
    </div>
  )
}
