import { createSlice } from '@reduxjs/toolkit'

// بارگذاری از localStorage در شروع
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem('nexcart_cart')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (error) {
    console.error('Failed to load cart:', error)
  }
  return {
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  }
}

// ذخیره در localStorage
const saveToStorage = (state) => {
  try {
    localStorage.setItem('nexcart_cart', JSON.stringify({
      items: state.items,
      totalQuantity: state.totalQuantity,
      totalPrice: state.totalPrice,
    }))
  } catch (error) {
    console.error('Failed to save cart:', error)
  }
}

const initialState = loadFromStorage()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // اضافه کردن محصول
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id)
      
      if (existingItem) {
        existingItem.quantity += 1
        existingItem.totalPrice = existingItem.quantity * existingItem.price
      } else {
        state.items.push({
          ...action.payload,
          quantity: 1,
          totalPrice: action.payload.price,
        })
      }
      
      // محاسبه مجدد
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
      
      saveToStorage(state)
    },
    
    // حذف محصول
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
      saveToStorage(state)
    },
    
    // افزایش تعداد
    increaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item) {
        item.quantity += 1
        item.totalPrice = item.quantity * item.price
        state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
        state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
        saveToStorage(state)
      }
    },
    
    // کاهش تعداد
    decreaseQuantity: (state, action) => {
      const item = state.items.find(item => item.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
        item.totalPrice = item.quantity * item.price
        state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
        state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
        saveToStorage(state)
      }
    },
    
    // خالی کردن سبد خرید
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
      saveToStorage(state)
    },
  },
})

// اکشن‌ها برای استفاده در کامپوننت‌ها
export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

// سلیکتورها برای خواندن دیتا
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalPrice = (state) => state.cart.totalPrice
export const selectCartItemById = (id) => (state) => 
  state.cart.items.find(item => item.id === id)

export default cartSlice.reducer