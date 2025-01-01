import React, { useState } from 'react';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import { CartSummary } from './CartSummary';
import { EmptyCart } from './EmptyCart';
import { useCart, useDispatchCart } from './ContextReducer';

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;

// CartItem Component
function CartItem({ name, price, quantity, size, onIncrement, onDecrement, onRemove }) {
  return (
    <div className="group flex items-center gap-4 p-6 bg-gradient-to-r from-gray-800/30 to-gray-800/20 rounded-lg backdrop-blur-sm border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.1)]">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-yellow-400 transition-colors">{name}</h3>
        <p className="text-sm text-gray-400">Size: {size}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 bg-gray-800/50 rounded-full p-1">
          <button 
            onClick={onDecrement}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-yellow-400 hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-200"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-white w-8 text-center font-medium">{quantity}</span>
          <button 
            onClick={onIncrement}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-yellow-400 hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="font-semibold text-yellow-400 min-w-[100px] text-right">₹{(price * quantity).toFixed(2)}</span>
        <button
          onClick={onRemove}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transform hover:rotate-12 transition-all duration-200"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// Main Cart Component
export function Cart() {
    let data = useCart(); 
    let dispatch = useDispatchCart();
  
    // Initialize state with data
    const [cartItems, setCartItems] = useState(data || []);
  
    const handleIncrement = (id) => {
      setCartItems(items =>
        items.map(item =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item // Update `qty` instead of `quantity`
        )
      );
    };
  
    const handleDecrement = (id) => {
      setCartItems(items =>
        items.map(item =>
          item.id === id && item.qty > 1
            ? { ...item, qty: item.qty - 1 }
            : item
        )
      );
    };
  
    const handleRemove = (id) => {
      dispatch({
        type: 'REMOVE',
        payload: id,
      });
      setCartItems(items => items.filter(item => item.id !== id));
    };
  
    const handlePayNow = () => {
      alert('Proceeding to payment...');
    };
  
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0); 
    const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
    const total = subtotal + (isFreeDelivery ? 0 : DELIVERY_FEE);
  
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black">
        <main className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-8 bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm border border-gray-700/30">
            <ShoppingCart className="w-6 h-6 text-yellow-400" />
            <h1 className="text-2xl font-bold text-white">Your Cart</h1>
          </div>
          
          {cartItems.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    quantity={item.qty} 
                    size={item.size}
                    onIncrement={() => handleIncrement(item.id)}
                    onDecrement={() => handleDecrement(item.id)}
                    onRemove={() => handleRemove(item.id)}
                  />
                ))}
              </div>
              <div className="lg:col-span-1">
                <CartSummary
                  subtotal={subtotal}
                  deliveryFee={DELIVERY_FEE}
                  total={total}
                  isFreeDelivery={isFreeDelivery}
                  onPayNow={handlePayNow}
                />
              </div>
            </div>
          )}
        </main>
      </div>
    );
  }
  