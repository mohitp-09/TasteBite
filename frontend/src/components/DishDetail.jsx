import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "./ui/Badge";
import { DishMetrics } from "./ui/DishMatrics";
import { useDispatchCart, useCart } from "./ContextReducer";

export function DishDetail() {

  let dispatch = useDispatchCart();

  let data = useCart()

  const handleAddToCart = async ()=>{
    await dispatch({
      type: "ADD",
      id: id,
      name: foodName,
      price: currentPrice,
      qty: quantity,
      size: selectedSize,
    });    
    // await console.log(data);
    // console.log(dispatch);
  }
  console.log(data);


  const location = useLocation();
  const {id, foodOptions, foodName, foodDescription, foodCategory, foodImage } =
    location.state || {};

  // console.log(location.state);   

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(
    Object.keys(foodOptions[0])[0]
  );

  const navigate = useNavigate();

  const currentPrice = Number(foodOptions[0][selectedSize]) * quantity;
  const sizes = Object.entries(foodOptions[0]);

  const getSizeLabel = (size) => {
    const sizeLabels = {
      regular: '(10")',
      medium: '(12")',
      large: '(14")',
      half: "(Half)",
      full: "(Full)",
    };
    return sizeLabels[size] || "";
  };


  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-6 md:px-12">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="group flex items-center gap-2 px-4 py-2 text-yellow-400 hover:text-yellow-500 transition-colors mb-6"
      >
        <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
        <span className="font-medium">Back to Menu</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Left Column - Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg">
          <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">
            {foodCategory}
          </Badge>
          <img
            src={foodImage}
            alt={foodName}
            className="w-full h-[400px] object-cover"
          />
        </div>

        {/* Right Column - Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-extrabold mb-2">{foodName}</h1>
            <p className="text-gray-400 text-lg">{foodDescription}</p>
          </div>

          <DishMetrics prepTime="25-30 mins" rating={4.8} servings="2-3" />

          {/* Size Selection */}

          <div>
            <h3 className="text-xl font-semibold mb-4 text-white">
              Select Size
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {sizes.map(([size, price]) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`p-4 rounded-lg border-2 text-center transition-all ${
                    selectedSize === size
                      ? "border-yellow-400 bg-yellow-400/10"
                      : "border-gray-700 hover:border-gray-600"
                  }`}
                >
                  <div className="text-white capitalize font-medium mb-1">
                    {size} {getSizeLabel(size)}
                  </div>
                  <div className="text-yellow-400 font-bold">₹{price}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selection */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quantity:</h3>
            <div className="flex items-center gap-6">
              <button
                onClick={() => quantity > 1 && setQuantity((q) => q - 1)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-6 h-6 text-yellow-400" />
              </button>
              <span className="text-2xl font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-all"
              >
                <Plus className="w-6 h-6 text-yellow-400" />
              </button>
            </div>
          </div>

          {/* Total Price and Add to Cart */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-700">
            <div>
              <p className="text-gray-400 mb-1">Total Price:</p>
              <p className="text-3xl font-bold text-yellow-400">
                ₹{currentPrice}
              </p>
            </div>
            <button className="px-8 py-3 bg-yellow-400 text-gray-900 rounded-full font-semibold hover:bg-yellow-500 transition-all" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
