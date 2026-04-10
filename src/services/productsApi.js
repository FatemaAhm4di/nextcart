import axios from 'axios'

const API_BASE_URL = 'https://dummyjson.com'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
})

// دریافت همه محصولات
export const fetchProducts = async () => {
  const response = await apiClient.get('/products?limit=30')
  return response.data.products
}

// دریافت محصول با آیدی
export const fetchProductById = async (id) => {
  const response = await apiClient.get(`/products/${id}`)
  return response.data
}

// دریافت دسته‌بندی‌ها (اصلاح شده)
export const fetchCategories = async () => {
  const response = await apiClient.get('/products/categories')
  // DummyJSON برمیگردونه: [{slug, name, url}] -> استخراج name
  const categories = response.data.map(cat => cat.name || cat)
  return categories
}

// دریافت محصولات بر اساس دسته‌بندی
export const fetchProductsByCategory = async (category) => {
  const response = await apiClient.get(`/products/category/${category}`)
  return response.data.products
}

// دریافت محصولات محدود
export const fetchLimitedProducts = async (limit = 8) => {
  const response = await apiClient.get(`/products?limit=${limit}`)
  return response.data.products
}