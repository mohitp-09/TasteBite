import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { DishDetail } from "./components/DishDetail";
import { CartProvider } from "./components/ContextReducer";
import { Cart } from "./components/Cart";
import Orders from "./components/myOrders/Orders";
import PaymentSuccessful from "./components/ui/PaymentSuccessful";
import './App.css';

const AppLayout = () => {
  const location = useLocation(); 
  const hideNavbarFooterRoutes = ["/order/success"];

  const shouldHideNavbarFooter = hideNavbarFooterRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen">
      {!shouldHideNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/food" element={<DishDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order/success" element={<PaymentSuccessful />} />
      </Routes>
      {!shouldHideNavbarFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <CartProvider>
    <Router>
      <AppLayout />
    </Router>
  </CartProvider>
);

export default App;