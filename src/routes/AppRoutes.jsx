import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import Wishlist from "../pages/Wishlist";
import Login from "../pages/Login";        // ✅ اضافه کن
import Register from "../pages/Register";  // ✅ اضافه کن
import ProfilePage from "../pages/ProfilePage";
import MyOrders from "../pages/MyOrders";
import SettingsPage from "../pages/SettingsPage";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />        // ✅ اضافه کن
      <Route path="/register" element={<Register />} />  // ✅ اضافه کن
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<MyOrders />} />
<Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
}