import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
// import { Hero } from './components/Hero';
// import { FeaturedDishes } from './components/FeaturedDishes';
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { DishDetail } from "./components/DishDetail";
import { CartProvider } from "./components/ContextReducer";
import { Cart } from "./components/Cart";

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/food" element={<DishDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
