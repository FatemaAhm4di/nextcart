import { createSlice } from '@reduxjs/toolkit'

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
      
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
      saveToStorage(state)
    },
    
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      state.totalQuantity = state.items.reduce((sum, item) => sum + item.quantity, 0)
      state.totalPrice = state.items.reduce((sum, item) => sum + item.totalPrice, 0)
      saveToStorage(state)
    },
    
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
    
    clearCart: (state) => {
      state.items = []
      state.totalQuantity = 0
      state.totalPrice = 0
      saveToStorage(state)
    },
  },
})

// ✅ اکشن‌ها
export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions

// ✅ سلیکتورها
export const selectCartItems = (state) => state.cart.items
export const selectCartTotalQuantity = (state) => state.cart.totalQuantity
export const selectCartTotalPrice = (state) => state.cart.totalPrice

export default cartSlice.reducer