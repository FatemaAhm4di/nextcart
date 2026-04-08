import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import Cart from '../pages/Cart'
import Login from '../pages/Login'
import Register from '../pages/Register'

// این خط رو اضافه کن 👇
export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}