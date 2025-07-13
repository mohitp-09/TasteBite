import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { History, ShoppingBag, IndianRupee , Package, Calendar, Tag, Utensils, ClipboardX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({ totalOrders: 0, totalSpend: 0, avgSpend: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError(null);

        const email = localStorage.getItem('userEmail');
        if (!email) {
          throw new Error('User email not found in localStorage');
        }

        console.log('Fetching order history for email:', email);

        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/order/history?email=${email}`);
        console.log('API Response:', response.data);

        if (response.data?.orders?.order_data && response.data.orders.order_data.length > 0) {
          const orderData = response.data.orders.order_data;

          const totalOrders = orderData.length;
          const totalSpend = orderData.reduce(
            (sum, item) => sum + item.total_price,
            0
          );
          const avgSpend = totalOrders > 0 ? (totalSpend / totalOrders).toFixed(2) : 0;

          setStats({ totalOrders, totalSpend, avgSpend });
          setOrders(orderData);
        } else {
          setOrders([]);
          setStats({ totalOrders: 0, totalSpend: 0, avgSpend: 0 });
        }
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError(err.response?.data?.error || 'Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date);
  };

  if (loading) return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-400"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-900 to-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 bg-gray-800/30 p-4 rounded-lg backdrop-blur-sm border border-gray-700/30">
          <Utensils className="w-6 h-6 text-yellow-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Previous Orders</h1>
            <p className="text-gray-400 mt-1">Your culinary journey with us</p>
          </div>
        </div>

        {orders.length > 0 ? (
          <>
            {/* Stats Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-r from-gray-800/30 to-gray-800/20 p-6 rounded-lg backdrop-blur-sm border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-400 font-medium">Total Visits</h2>
                  <ShoppingBag className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white mt-2">{stats.totalOrders}</p>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800/30 to-gray-800/20 p-6 rounded-lg backdrop-blur-sm border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-400 font-medium">Total Amount</h2>
                  <IndianRupee className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white mt-2">₹{stats.totalSpend}</p>
              </div>
              
              <div className="bg-gradient-to-r from-gray-800/30 to-gray-800/20 p-6 rounded-lg backdrop-blur-sm border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-400 font-medium">Average Bill</h2>
                  <IndianRupee className="w-5 h-5 text-yellow-400" />
                </div>
                <p className="text-2xl font-bold text-white mt-2">₹{stats.avgSpend}</p>
              </div>
            </div>

            {/* Orders Section */}
            <div className="space-y-4">
              {orders.map((item, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-gray-800/30 to-gray-800/20 rounded-lg backdrop-blur-sm border border-gray-700/30 hover:border-yellow-400/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.1)]"
                >
                  {/* Order ID Header */}
                  <div className="border-b border-gray-700/30 p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Package className="w-5 h-5 text-yellow-400" />
                        <span className="text-gray-400 font-medium">Reference No:</span>
                        <span className="font-mono text-white group-hover:text-yellow-400 transition-colors">{item.order_id}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-400">{formatDate(item.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Item Details */}
                      <div className="space-y-4">
                        <div className="flex items-start gap-3">
                          <Tag className="w-5 h-5 text-yellow-400 mt-1" />
                          <div>
                            <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">{item.name}</h3>
                            <div className="mt-2 space-y-2">
                              <p className="text-gray-400">
                                <span className="text-gray-500">Portion:</span> {item.size}
                              </p>
                              <p className="text-gray-400">
                                <span className="text-gray-500">Servings:</span> {item.qty}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Price Details */}
                      <div className="space-y-3 md:border-l md:border-gray-700/30 md:pl-6">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Per Serving:</span>
                          <span className="text-yellow-400">₹{item.price}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-gray-700/30">
                          <span className="text-gray-400 font-medium">Bill Amount:</span>
                          <span className="text-yellow-400 text-lg font-bold">₹{item.total_price}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-gradient-to-r from-gray-800/30 to-gray-800/20 rounded-lg p-12 text-center backdrop-blur-sm border border-gray-700/30">
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-yellow-400/20 blur-lg"></div>
                <div className="relative bg-gray-900/50 p-4 rounded-full border-2 border-yellow-400/50">
                  <ClipboardX className="w-12 h-12 text-yellow-400" />
                </div>
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-white">No Orders Yet</h2>
              <p className="mt-2 text-gray-400 max-w-sm">
                Your culinary journey is about to begin! Explore our menu and place your first order to start your gastronomic adventure.
              </p>
              <button 
                onClick={() => navigate('/')}
                className="mt-8 px-6 py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-300 transition-colors duration-300"
              >
                Explore Our Menu
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
