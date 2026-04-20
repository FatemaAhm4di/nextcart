import { createSlice } from '@reduxjs/toolkit';

const loadUser = () => {
  const saved = localStorage.getItem('nexcart_user');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse user:', e);
      return null;
    }
  }
  return null;
};

const initialState = {
  user: loadUser(),
  isAuthenticated: !!loadUser(),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const newUser = {
        id: Date.now().toString(),
        name: action.payload.name || action.payload.email?.split('@')[0] || 'User',
        email: action.payload.email,
        avatar: action.payload.avatar || null,
        memberSince: new Date().toISOString(),
      };
      state.user = newUser;
      state.isAuthenticated = true;
      localStorage.setItem('nexcart_user', JSON.stringify(newUser));
    },
    
    register: (state, action) => {
      const newUser = {
        id: Date.now().toString(),
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar || null,
        memberSince: new Date().toISOString(),
      };
      state.user = newUser;
      state.isAuthenticated = true;
      localStorage.setItem('nexcart_user', JSON.stringify(newUser));
    },
    
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('nexcart_user');
    },
    
    updateUser: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        localStorage.setItem('nexcart_user', JSON.stringify(state.user));
      }
    },
    
    updateAvatar: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          avatar: action.payload,
        };
        localStorage.setItem('nexcart_user', JSON.stringify(state.user));
      }
    },
  },
});

export const { 
  login, 
  register, 
  logout, 
  updateUser, 
  updateAvatar 
} = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserName = (state) => state.auth.user?.name;
export const selectUserAvatar = (state) => state.auth.user?.avatar;

export default authSlice.reducer;