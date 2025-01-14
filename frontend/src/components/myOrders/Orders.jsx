import React, { useEffect, useState } from "react";

export default function Orders() {
  const [orders, setOrders] = useState([]); // State to hold orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch orders from backend
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/order/myorderdata", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: localStorage.getItem("userEmail") }),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await response.json();
        console.log("Fetched data:", data); // Debug the fetched data

        // Ensure orderData exists and is an array of arrays
        if (Array.isArray(data.orderData)) {
          setOrders(data.orderData);
        } else {
          console.error("Invalid orderData format:", data.orderData);
          setOrders([]);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading)
    return <div style={{ textAlign: "center", marginTop: "20px" }}>Loading...</div>;

  if (error)
    return (
      <div style={{ textAlign: "center", color: "red", marginTop: "20px" }}>
        Error: {error}
      </div>
    );

  if (orders.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No orders found.
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", color: "#fff" }}>Order History</h1>
      {orders.map((orderGroup, index) => {
        if (!Array.isArray(orderGroup)) {
          console.error(`Invalid orderGroup at index ${index}:`, orderGroup);
          return (
            <div
              key={index}
              style={{
                marginBottom: "20px",
                padding: "20px",
                borderRadius: "8px",
                backgroundColor: "#1a1a1a",
                color: "#fff",
              }}
            >
              <h3 style={{ color: "red" }}>Invalid Order Group</h3>
            </div>
          );
        }

        const totalPrice = orderGroup
          .reduce((sum, item) => {
            const price = parseFloat(item.price) || 0;
            const qty = parseInt(item.qty) || 0;
            return sum + price * qty;
          }, 0)
          .toFixed(2);

        return (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              backgroundColor: "#1a1a1a",
              color: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "15px", color: "#f1c40f" }}>
              Order #{orderGroup[0]?.orderId || "N/A"}
            </h3>
            <p style={{ marginBottom: "10px", color: "#aaa" }}>
              {orderGroup[0]?.date || "Date not available"}
            </p>
            {orderGroup.map((item, idx) => (
              <div key={idx} style={{ marginBottom: "10px" }}>
                <p>
                  <span style={{ fontWeight: "bold" }}>{item.name || "Unnamed Item"}</span> x
                  {item.qty || 0} ({item.size || "Unknown Size"})
                </p>
                <p style={{ color: "#aaa" }}>₹{parseFloat(item.price).toFixed(2) || "0.00"}</p>
              </div>
            ))}
            <div
              style={{
                marginTop: "10px",
                paddingTop: "10px",
                borderTop: "1px solid #444",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontWeight: "bold", fontSize: "16px", color: "#f1c40f" }}>Total:</span>
              <span style={{ fontWeight: "bold", fontSize: "16px", color: "#f1c40f" }}>
                ₹{totalPrice}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
