import React from 'react';
import { CreditCard } from 'lucide-react';
import { useCart, useDispatchCart } from './ContextReducer';
import { loadStripe } from '@stripe/stripe-js';

export function CartSummary({ subtotal, deliveryFee, total, isFreeDelivery }) {
  let data = useCart(); 
  let dispatch = useDispatchCart();
  console.log(data);
  
  const makePayment = async () => {
    try {
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
  
      const userEmail = localStorage.getItem("userEmail"); // Get user email
      if (!userEmail) {
        console.error("User email not found");
        return;
      }
  
      const body = { order_data: data, email: userEmail }; // Include email
      const headers = { "Content-Type": "application/json" };

  
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/order/payment`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });
  
      const session = await response.json();
      console.log("Payment session created:", session);
  
      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
  
      if (result.error) {
        console.log(result.error.message);
      } else {
        console.log("Redirecting to payment page...");
      }
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };
  
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm border border-gray-700/30">
      <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <span className="text-yellow-400">📋</span> Order Summary
      </h2>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm text-gray-300">
          <span>Subtotal</span>
          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-gray-300 items-center">
          <div className="flex items-center gap-2">
            <span>Delivery Fee</span>
            {isFreeDelivery && (
              <span className="text-xs bg-green-500/20 text-green-400 px-1.5 py-0.5 rounded-full">
                Free
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {isFreeDelivery && (
              <span className="text-xs line-through text-gray-500">₹{deliveryFee.toFixed(2)}</span>
            )}
            <span className={isFreeDelivery ? 'text-green-400' : ''}>
              ₹{isFreeDelivery ? '0.00' : deliveryFee.toFixed(2)}
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-700/50" />
        
        <div className="flex justify-between text-white pt-1">
          <span className="font-medium">Total</span>
          <span className="font-semibold text-yellow-400">₹{total.toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={makePayment}
        className="w-full mt-4 py-2.5 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg flex items-center justify-center gap-2 transition-all duration-200"
      >
        <CreditCard className="w-4 h-4" />
        Place order
      </button>
    </div>
  );
}
