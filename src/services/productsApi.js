import axios from 'axios'

const API_BASE_URL = 'https://fakestoreapi.com'

// کلاینت axios با تنظیمات پایه
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// اینترسپتور برای مدیریت خطاهای全局
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('درخواست با تایم‌اوت مواجه شد'))
    }
    if (!error.response) {
      return Promise.reject(new Error('مشکل در ارتباط با سرور'))
    }
    return Promise.reject(error)
  }
)

// ============== توابع API ==============

// دریافت همه محصولات
export const fetchProducts = async () => {
  const { data } = await apiClient.get('/products')
  return data
}

// دریافت محصول با آیدی
export const fetchProductById = async (id) => {
  const { data } = await apiClient.get(`/products/${id}`)
  return data
}

// دریافت دسته‌بندی‌ها
export const fetchCategories = async () => {
  const { data } = await apiClient.get('/products/categories')
  return data
}

// دریافت محصولات بر اساس دسته‌بندی
export const fetchProductsByCategory = async (category) => {
  const { data } = await apiClient.get(`/products/category/${category}`)
  return data
}

// دریافت محصولات محدود (برای صفحه اصلی)
export const fetchLimitedProducts = async (limit = 8) => {
  const { data } = await apiClient.get(`/products?limit=${limit}`)
  return data
}