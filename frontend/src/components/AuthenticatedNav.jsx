import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, ClipboardList, LogOut } from 'lucide-react';

export function AuthenticatedNav({ onLogout }) {

  return (
    <div className="flex items-center space-x-6">
      <Link 
        to="/orders" 
        className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
      >
        <ClipboardList size={20} className="text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-gray-200 group-hover:text-yellow-400 transition-colors duration-300">Orders</span>
      </Link>
      
      <Link 
        to="/cart" 
        className="group relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
      >
        <ShoppingCart size={20} className="text-yellow-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-gray-200 group-hover:text-yellow-400 transition-colors duration-300">Cart</span>
        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          0
        </span>
      </Link>
      
      <div className="h-6 w-px bg-gray-700"></div>
      
      <button
        onClick={onLogout}
        className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-900/30 transition-all duration-300"
      >
        <LogOut size={20} className="text-red-400 group-hover:scale-110 transition-transform duration-300" />
        <span className="text-gray-200 group-hover:text-red-400 transition-colors duration-300">Logout</span>
      </button>
    </div>
  );
}