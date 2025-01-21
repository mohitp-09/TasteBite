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
      <div className="relative h-48">
        {/* Skeleton loader */}
        <div className={`absolute inset-0 bg-gray-700 animate-pulse transition-opacity duration-300 ${
          imageLoading ? 'opacity-100' : 'opacity-0'
        }`} />
        
        {/* Image */}
        <img
          src={foodImage}
          alt={foodName}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-300 hover:scale-110 ${
            imageLoading ? 'opacity-0' : 'opacity-100'
          }`}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black opacity-0 hover:opacity-40 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        {/* Title skeleton */}
        <div className={`transition-opacity duration-300 ${imageLoading ? 'block' : 'hidden'}`}>
          <div className="h-7 bg-gray-700 rounded w-3/4 mb-2 animate-pulse" />
        </div>
        
        {/* Actual title */}
        <h3 className={`text-xl font-bold text-white mb-2 transition-opacity duration-300 ${
          imageLoading ? 'hidden' : 'block'
        }`}>
          {foodName}
        </h3>

        {/* Description skeleton */}
        <div className={`transition-opacity duration-300 ${imageLoading ? 'block' : 'hidden'}`}>
          <div className="h-4 bg-gray-700 rounded w-full mb-2 animate-pulse" />
          <div className="h-4 bg-gray-700 rounded w-2/3 mb-4 animate-pulse" />
        </div>
        
        {/* Actual description */}
        <p className={`text-gray-400 mb-4 transition-opacity duration-300 ${
          imageLoading ? 'hidden' : 'block'
        }`}>
          {foodDescription}
        </p>

        <div className="flex justify-between items-center">
          {/* Price skeleton */}
          <div className={`transition-opacity duration-300 ${imageLoading ? 'block' : 'hidden'}`}>
            <div className="h-6 bg-gray-700 rounded w-16 animate-pulse" />
          </div>
          
          {/* Actual price */}
          <span className={`text-yellow-400 text-xl font-bold transition-opacity duration-300 ${
            imageLoading ? 'hidden' : 'block'
          }`}>
            ₹{foodPrice}
          </span>

          {/* Button skeleton */}
          <div className={`transition-opacity duration-300 ${imageLoading ? 'block' : 'hidden'}`}>
            <div className="h-10 bg-gray-700 rounded w-24 animate-pulse" />
          </div>
          
          {/* Actual button */}
          <button
            className={`bg-yellow-400 px-4 py-2 rounded hover:bg-yellow-500 transition-all duration-300 ${
              imageLoading ? 'hidden' : 'block'
            }`}
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