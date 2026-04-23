import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

// نرمالایز کردن محصول با تصاویر متنوع از Picsum
const normalizeProduct = (product) => {
  // استفاده از picsum با id متفاوت برای هر محصول (تصاویر متنوع)
  const imageId = (product.id % 100) + 1
  const imageUrl = `https://picsum.photos/id/${imageId}/300/300`
  const thumbnailUrl = `https://picsum.photos/id/${imageId}/100/100`
  
  return {
    id: product.id,
    title: product.title,
    price: product.price,
    description: product.description,
    category: product.category,
    image: product.images?.[0] || product.thumbnail || imageUrl,
    thumbnail: product.thumbnail || product.images?.[0] || thumbnailUrl,
    images: product.images || [],
    rating: product.rating,
    stock: product.stock,
    brand: product.brand,
  }
}

// دریافت همه محصولات
export const fetchProducts = async () => {
  const response = await apiClient.get('/products?limit=30')
  const products = response.data.products || []
  return products.map(normalizeProduct)
}

// دریافت محصول با آیدی
export const fetchProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`)
  return normalizeProduct(response.data)
}

// دریافت دسته‌بندی‌ها
export const fetchCategories = async () => {
  const response = await apiClient.get('/products/categories')
  const categories = response.data.map(cat => cat.name || cat)
  return categories
}

// دریافت محصولات بر اساس دسته‌بندی
export const fetchProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`)
  const products = response.data.products || []
  return products.map(normalizeProduct)
}

// دریافت محصولات محدود
export const fetchLimitedProducts = async (limit = 8) => {
  const response = await apiClient.get(`/products?limit=${limit}`)
  const products = response.data.products || []
  return products.map(normalizeProduct)
}