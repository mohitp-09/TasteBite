import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Mail, Clock, Calendar, Receipt } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function PaymentSuccessful() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const sessionId = params.get('session_id');
  const email = params.get('email');
  const orderData = params.get('order_data') ? JSON.parse(decodeURIComponent(params.get('order_data'))) : [];

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(savedCart);

    if (sessionId && email) {
      const verifyPayment = async () => {
        try {
          setLoading(true);
          setError(null);
          const response = await axios.get(`http://localhost:5000/order/success?session_id=${sessionId}&email=${email}`);
          console.log('Order processed successfully:', response.data);
          localStorage.removeItem('cart');
          setCart([]);
        } catch (error) {
          console.error('Error processing payment:', error.response?.data || error.message);
          setError('There was an issue processing your payment. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
      verifyPayment();
    }
  }, [sessionId, email]);

  const handleClick = () => {
    navigate('/');
  };

  const totalAmount = orderData.reduce((acc, item) => acc + item.total_price, 0);
  const orderDate = orderData[0]?.date ? new Date(orderData[0].date) : new Date();
  const orderId = orderData[0]?.order_id || 'N/A';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <motion.div
        initial={{ scale: 0, x: '100%', y: '100%' }}
        animate={{ scale: 1, x: '70%', y: '60%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"
      />
      <motion.div
        initial={{ scale: 0, x: '-100%', y: '-100%' }}
        animate={{ scale: 1, x: '-70%', y: '-60%' }}
        transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse" }}
        className="absolute w-96 h-96 bg-slate-500/10 rounded-full blur-3xl"
      />

      {/* Main Receipt Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-xl w-full border border-slate-800 relative z-10"
      >
        {/* Success Icon */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-400/20 flex items-center justify-center"
        >
          <CheckCircle className="w-12 h-12 text-green-400" />
        </motion.div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-2">Thank You!</h1>
          <p className="text-slate-400">Your order has been confirmed</p>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <Receipt className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Order ID</p>
            <p className="text-slate-200 font-medium">{orderId}</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <Calendar className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Date</p>
            <p className="text-slate-200 font-medium">{orderDate.toLocaleDateString()}</p>
          </div>
          <div className="text-center p-4 bg-slate-800/50 rounded-lg">
            <Clock className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
            <p className="text-sm text-slate-400">Time</p>
            <p className="text-slate-200 font-medium">{orderDate.toLocaleTimeString()}</p>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-slate-800/50 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5" />
            Order Summary
          </h2>
          
          <div className="space-y-4">
            {orderData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center py-2 border-b border-slate-700 last:border-0"
              >
                <div className="flex-1">
                  <h3 className="text-slate-100 font-medium">{item.name}</h3>
                  <p className="text-sm text-slate-400">Quantity: {item.qty}</p>
                </div>
                <p className="text-yellow-400 font-semibold">₹{item.total_price}</p>
              </motion.div>
            ))}
          </div>

          {/* Total */}
          <div className="mt-6 pt-4 border-t border-slate-700">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-100">Total Amount</span>
              <motion.span 
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-2xl font-bold text-yellow-400"
              >
                ₹{totalAmount}
              </motion.span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <motion.div
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-green-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            Receipt sent to your email
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={handleClick}
            className="w-full border border-slate-700 text-slate-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-slate-800/50 transition-all hover:border-slate-600"
          >
            <ArrowLeft className="w-5 h-5" />
            Return to Menu
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}