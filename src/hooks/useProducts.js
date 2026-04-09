import { useQuery } from '@tanstack/react-query'
import { 
  fetchProducts, 
  fetchProductById, 
  fetchCategories,
  fetchProductsByCategory,
  fetchLimitedProducts 
} from '../services/productsApi'

// کلیدهای query (برای کش و مدیریت)
export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), { ...filters }],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
  categories: () => [...productKeys.all, 'categories'],
  byCategory: (category) => [...productKeys.all, 'category', category],
}

// هوک دریافت همه محصولات
export const useProducts = (options = {}) => {
  return useQuery({
    queryKey: productKeys.lists(),
    queryFn: fetchProducts,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
    retry: 2,
    ...options,
  })
}

// هوک دریافت محصول با آیدی
export const useProduct = (id, options = {}) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}

// هوک دریافت دسته‌بندی‌ها
export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
    ...options,
  })
}

// هوک دریافت محصولات بر اساس دسته
export const useProductsByCategory = (category, options = {}) => {
  return useQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category && category !== 'all',
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}

// هوک دریافت محصولات محدود
export const useLimitedProducts = (limit = 8, options = {}) => {
  return useQuery({
    queryKey: [...productKeys.lists(), 'limited', limit],
    queryFn: () => fetchLimitedProducts(limit),
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}