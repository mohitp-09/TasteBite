import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        // Get the email from localStorage
        const email = localStorage.getItem('userEmail'); // Ensure the email is stored in localStorage during login
        console.log('Email from localStorage:', email); // Debugging line

        if (!email) {
          setError('No user is logged in.');
          setLoading(false);
          return;
        }

        // Fetch orders for the logged-in user's email
        const response = await axios.get('http://localhost:5000/order/history', { params: { email } });
        console.log('API Response:', response.data); // Log the response to check the order data
        setOrders(response.data.orders);
      } catch (err) {
        console.error('Error fetching order history:', err);
        setError(err.response?.data?.error || 'Failed to fetch order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading order history...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div>
      <h1>Order History</h1>
      {orders && orders.order_data.length > 0 ? (
        <ul>
          {orders.order_data.map((order, index) => (
            <li key={index}>
              <p><strong>Order #{index + 1}</strong></p>
              <p>Items:</p>
              <ul>
                {order.items.map((item, idx) => (
                  <li key={idx}>
                    {item.name} - {item.quantity} @ ${item.price}
                  </li>
                ))}
              </ul>
              <p><strong>Status:</strong> {orders.payment_status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default OrderHistory;
