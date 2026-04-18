import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
  const saved = localStorage.getItem('nexcart_wishlist');
  return saved ? JSON.parse(saved) : [];
};

const saveWishlist = (items) => {
  localStorage.setItem('nexcart_wishlist', JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlist(),
  },
  reducers: {
    toggleWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter(item => item.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
      saveWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlist(state.items);
    },
  },
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlistItems = (state) => state.wishlist.items;
export default wishlistSlice.reducer;