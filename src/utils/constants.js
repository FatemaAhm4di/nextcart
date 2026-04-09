// ثابت‌های سراسری پروژه

export const API_CONFIG = {
  BASE_URL: 'https://fakestoreapi.com',
  TIMEOUT: 10000,
  CACHE_TIME: 1000 * 60 * 10, // 10 دقیقه
  STALE_TIME: 1000 * 60 * 5, // 5 دقیقه
}

export const PRODUCT_LIMITS = {
  HOME_PAGE: 8,
  SEARCH_RESULTS: 12,
}

export const ROUTES = {
  HOME: '/',
  PRODUCT_DETAILS: '/product/:id',
  CART: '/cart',
  LOGIN: '/login',
  REGISTER: '/register',
  PROFILE: '/profile',
}

export const STORAGE_KEYS = {
  CART: 'nexcart_cart',
  THEME: 'nexcart_theme',
  VIEW_MODE: 'nexcart_viewMode',
  AUTH: 'nexcart_auth',
}

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'مشکل در ارتباط با اینترنت',
  SERVER_ERROR: 'خطا در سرور، لطفاً چند دقیقه دیگر تلاش کنید',
  NOT_FOUND: 'محصول مورد نظر یافت نشد',
  TIMEOUT: 'درخواست زمانبر شد، لطفاً دوباره تلاش کنید',
  UNKNOWN: 'خطای ناشناخته رخ داد',
}