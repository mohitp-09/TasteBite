import React from 'react';
import { ShoppingBag } from 'lucide-react';

export function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-800/30 rounded-lg backdrop-blur-sm border border-gray-700/30">
      <ShoppingBag className="w-16 h-16 text-gray-500 mb-4" />
      <h2 className="text-xl font-semibold text-gray-300 mb-2">Your cart is empty</h2>
      <p className="text-gray-400 text-center">Add some delicious items to your cart and come back!</p>
    </div>
  );
}