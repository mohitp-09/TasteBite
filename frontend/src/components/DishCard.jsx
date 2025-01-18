import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function DishCard({
  id,
  foodOptions,
  foodName,
  foodDescription,
  foodPrice,
  foodImage,
  foodCategory
}) {
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        {imageLoading && (
          <div className="absolute inset-0 bg-gray-700 animate-pulse">
            <div className="w-full h-48" />
          </div>
        )}
        <img
          src={foodImage}
          alt={foodName}
          className={`w-full h-48 object-cover transition-transform duration-300 hover:scale-110 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
        />
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{foodName}</h3>
        <p className="text-gray-400 mb-4">{foodDescription}</p>
        <div className="flex justify-between items-center">
          <span className="text-yellow-400 text-xl font-bold">
            ₹{foodPrice}
          </span>
          <button
            className="bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 transition-colors duration-300"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/food`, {
                state: {
                  id,
                  foodOptions,
                  foodName,
                  foodDescription,
                  foodPrice,
                  foodImage,
                  foodCategory
                },
              });
            }}
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
}