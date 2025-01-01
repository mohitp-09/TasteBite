import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, ClipboardList, LogOut, Menu, X } from "lucide-react";
import { useCart } from "./ContextReducer";

export function AuthenticatedNav({ onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  let data = useCart();

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      <button
        onClick={toggleMenu}
        className="sm:hidden flex items-center justify-center p-2 rounded-md bg-gray-800 text-yellow-400 hover:bg-gray-700 focus:outline-none"
      >
        {isMenuOpen ? (
          <X size={24} className="transition-transform duration-300" />
        ) : (
          <Menu size={24} className="transition-transform duration-300" />
        )}
      </button>

      {/* Navigation Menu */}
      <div
        className={`absolute sm:relative sm:flex flex-col sm:flex-row sm:items-center sm:space-x-6 bg-gray-900 sm:bg-transparent text-white sm:space-y-0 space-y-4 sm:static z-50 w-full sm:w-auto sm:translate-y-0 transition-all duration-300 ${
          isMenuOpen ? "translate-y-12" : "translate-y-[-300%] sm:translate-y-0"
        }`}
      >
        {/* Orders Link */}
        <Link
          to="/orders"
          className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)} // Close menu on link click
        >
          <ClipboardList
            size={20}
            className="text-yellow-400 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-gray-200 group-hover:text-yellow-400 transition-colors duration-300">
            Orders
          </span>
        </Link>

        {/* Cart Link */}
        <Link
          to="/cart"
          className="group relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
          onClick={() => setIsMenuOpen(false)} // Close menu on link click
        >
          <ShoppingCart
            size={20}
            className="text-yellow-400 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-gray-200 group-hover:text-yellow-400 transition-colors duration-300">
            Cart
          </span>

          {/* badge */}

          {data.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {data.length}
            </span>
          )}
          
        </Link>

        {/* Divider */}
        <div className="hidden sm:block h-6 w-px bg-gray-700"></div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-900/30 transition-all duration-300"
        >
          <LogOut
            size={20}
            className="text-red-400 group-hover:scale-110 transition-transform duration-300"
          />
          <span className="text-gray-200 group-hover:text-red-400 transition-colors duration-300">
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}
