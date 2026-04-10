import { useQuery } from '@tanstack/react-query'
import { 
  fetchProducts, 
  fetchProductById, 
  fetchCategories,
  fetchProductsByCategory,
  fetchLimitedProducts 
} from '../services/productsApi'

export const productKeys = {
  all: ['products'],
  lists: () => [...productKeys.all, 'list'],
  list: (filters) => [...productKeys.lists(), { ...filters }],
  details: () => [...productKeys.all, 'detail'],
  detail: (id) => [...productKeys.details(), id],
  categories: () => [...productKeys.all, 'categories'],
  byCategory: (category) => [...productKeys.all, 'category', category],
}

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

export const useProduct = (id, options = {}) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => fetchProductById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}

export const useCategories = (options = {}) => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
    ...options,
  })
}

export const useProductsByCategory = (category, options = {}) => {
  return useQuery({
    queryKey: productKeys.byCategory(category),
    queryFn: () => fetchProductsByCategory(category),
    enabled: !!category && category !== 'all',
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}

export const useLimitedProducts = (limit = 8, options = {}) => {
  return useQuery({
    queryKey: [...productKeys.lists(), 'limited', limit],
    queryFn: () => fetchLimitedProducts(limit),
    staleTime: 1000 * 60 * 5,
    ...options,
  })
}