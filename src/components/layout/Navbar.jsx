import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSettings } from "../../hooks/useSettings";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const cartCount = useSelector(
    (state) => state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  const { theme, dispatch } = useSettings();

  return (
    <nav className="bg-surface shadow-sm px-4 py-3 flex items-center justify-between">

      {/* Logo */}
      <Link to="/" className="font-bold text-lg">
        NextCart
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 items-center">

        <Link to="/shop">Shop</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>

        {/* Search (UI ساده فعلاً) */}
        <input
          type="text"
          placeholder="Search..."
          className="border px-2 py-1 rounded"
        />

        {/* Cart */}
        <Link to="/cart" className="relative">
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Theme toggle */}
        <button
          onClick={() =>
            dispatch({
              type: "TOGGLE_THEME",
            })
          }
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
      </div>

      {/* Mobile Button */}
      <button
        className="md:hidden"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-14 left-0 w-full bg-surface flex flex-col gap-4 p-4 md:hidden">
          <Link to="/shop">Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
        </div>
      )}
    </nav>
  );
}