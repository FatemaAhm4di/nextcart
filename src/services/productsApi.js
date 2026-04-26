import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

const normalizeProduct = (product) => {
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

export const fetchProducts = async () => {
  const response = await apiClient.get('/products?limit=30')
  const products = response.data.products || []
  return products.map(normalizeProduct)
}

export const fetchProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`)
  return normalizeProduct(response.data)
}

export const fetchCategories = async () => {
  const response = await apiClient.get('/products/categories')
  const categories = response.data.map(cat => cat.name || cat)
  return categories
}

export const fetchProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`)
  const products = response.data.products || []
  return products.map(normalizeProduct)
}

export const fetchLimitedProducts = async (limit = 8) => {
  const response = await apiClient.get(`/products?limit=${limit}`)
  const products = response.data.products || []
  return products.map(normalizeProduct)
}