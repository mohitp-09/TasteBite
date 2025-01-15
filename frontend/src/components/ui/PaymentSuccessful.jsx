import React from 'react'
import { motion } from 'framer-motion';
import { CheckCircle, ArrowLeft, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PaymentSuccessful() {

    const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleClick = () => {
    navigate('/'); // Navigate to the home route
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e293b] to-[#0f172a] flex items-center justify-center p-4 relative overflow-hidden">
    {/* Background Animation Circles */}
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

    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-900/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-md w-full border border-slate-800 relative z-10"
    >
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="w-20 h-20 mx-auto mb-6 rounded-full bg-yellow-400/20 flex items-center justify-center"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <CheckCircle className="w-12 h-12 text-yellow-400" />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-slate-100 mb-2">Order Confirmed!</h1>
        <p className="text-slate-400 mb-8">Your delicious food is being prepared.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="space-y-4"
      >
        <motion.div 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 space-y-3 border border-slate-700 hover:border-slate-600 transition-colors"
        >
          <div className="flex justify-between items-center pb-2 border-b border-slate-700">
            <span className="text-slate-100 font-semibold">Order Details</span>
            <span className="text-sm text-slate-400">#ORD-2024-1234</span>
          </div>
          
          <div className="space-y-2">
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-slate-200">Chicken Biryani</p>
                <p className="text-sm text-slate-400">Quantity: 2</p>
              </div>
              <span className="font-semibold text-slate-200">₹399</span>
            </motion.div>
            
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="flex justify-between items-center"
            >
              <div>
                <p className="font-medium text-slate-200">Veg Fried Rice</p>
                <p className="text-sm text-slate-400">Quantity: 1</p>
              </div>
              <span className="font-semibold text-slate-200">₹149</span>
            </motion.div>
          </div>

          <div className="border-t border-slate-700 pt-2 mt-2">
            <div className="flex justify-between items-center">
              <span className="font-medium text-slate-300">Total Amount</span>
              <motion.span 
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="font-bold text-lg text-yellow-400"
              >
                ₹947
              </motion.span>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-yellow-400 text-slate-900 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer hover:bg-yellow-300 transition-colors"
        >
          <Mail className="w-5 h-5" />
          Bill sent to your email
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full border border-slate-700 text-slate-300 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-slate-800/50 cursor-pointer transition-all hover:border-slate-600"
          onClick={handleClick}
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </motion.button>
      </motion.div>
    </motion.div>
  </div>
  )
}
