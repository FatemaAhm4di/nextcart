import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Cart from "../pages/Cart";
import About from "../pages/About";
import Contact from "../pages/Contact";
import ProductDetails from "../pages/ProductDetails";
import Wishlist from "../pages/Wishlist";  // ✅ اضافه شد

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/shop" element={<Shop />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/wishlist" element={<Wishlist />} />  {/* ✅ اضافه شد */}
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
  );
}