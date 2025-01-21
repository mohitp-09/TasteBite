import React, { useEffect, useState } from "react";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";
import { CartSummary } from "./CartSummary";
import { EmptyCart } from "./EmptyCart";
import { useCart, useDispatchCart } from "./ContextReducer";

const FREE_DELIVERY_THRESHOLD = 500;
const DELIVERY_FEE = 40;

// CartItem Component
function CartItem({ id, name, price, qty, size, onIncrement, onDecrement, onRemove }) {
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
          <span className="text-white w-8 text-center font-medium">{qty}</span>
          <button
            onClick={onIncrement}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-700 text-yellow-400 hover:bg-yellow-400 hover:text-black transform hover:scale-105 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="font-semibold text-yellow-400 min-w-[100px] text-right">₹{(price * qty).toFixed(2)}</span>
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
  const cartItems = useCart(); // Use cart context for global cart state
  const dispatch = useDispatchCart(); // Dispatch actions to cart reducer
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  // Fetch user email from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    } else {
      console.error("User email is missing.");
    }
  }, []);

  // Fetch cart data from the backend
  useEffect(() => {
    if (!userEmail) return;

    const fetchCart = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/getcart/${userEmail}`);
        const data = await response.json();

        if (response.ok) {
          dispatch({ type: "INITIALIZE", payload: data.order_data }); // Initialize cart with backend data
        } else {
          console.error("Error fetching cart:", data.message);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [dispatch, userEmail]);

  // Handle incrementing item quantity
  const handleIncrement = (id, size) => {
    dispatch({
      type: "UPDATE_QTY",
      payload: { id, size, qty: 1 },
    });
  };

  // Handle decrementing item quantity
  const handleDecrement = (id, size) => {
    const item = cartItems.find((item) => item.id === id && item.size === size);
    if (item && item.qty > 1) {
      dispatch({
        type: "UPDATE_QTY",
        payload: { id, size, qty: -1 },
      });
    }
  };
  
  // Handle removing an item from the cart
  const handleRemove = async (id, size) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/cart/removeitem`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userEmail, // Pass the user's email
          itemId: id,       // ID of the item to remove
          size,             // Size of the item
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update the frontend state
        dispatch({
          type: "REMOVE",
          payload: { id, size },
        });
      } else {
        console.error("Error removing item from the cart:", data.message);
      }
    } catch (error) {
      console.error("Error removing item from the cart:", error);
    }
  };

  // Calculate subtotal, delivery fee, and total
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const isFreeDelivery = subtotal >= FREE_DELIVERY_THRESHOLD;
  const total = subtotal + (isFreeDelivery ? 0 : DELIVERY_FEE);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a1f2e] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400"></div>
      </div>
    );
  }

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
                  key={`${item.id}-${item.size}`}
                  id={item.id}
                  name={item.name}
                  price={item.price}
                  qty={item.qty}
                  size={item.size}
                  onIncrement={() => handleIncrement(item.id, item.size)}
                  onDecrement={() => handleDecrement(item.id, item.size)}
                  onRemove={() => handleRemove(item.id, item.size)}
                />
              ))}
            </div>
            <div className="lg:col-span-1">
              <CartSummary
                subtotal={subtotal}
                deliveryFee={isFreeDelivery ? 0 : DELIVERY_FEE}
                total={total}
                isFreeDelivery={isFreeDelivery}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}