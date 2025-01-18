import React, { useState } from 'react';
import { Search } from 'lucide-react';

export function Hero({ onSearch }) {
  const [searchInput, setSearchInput] = useState('');
  const [imageLoading, setImageLoading] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    onSearch(value); // Real-time search
  };

  return (
    <div className="relative h-[70vh]">
      <div className="absolute inset-0 bg-black/50 z-10" />
      {imageLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse" />
      )}
      <img
        src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
        alt="Food background"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
          imageLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={() => setImageLoading(false)}
      />
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <h1 className="text-6xl font-bold mb-6">
          Discover Amazing <span className="text-yellow-400">Food</span>
        </h1>
        <p className="text-xl mb-8 max-w-2xl">
          Explore our curated selection of delicious dishes from top local restaurants
        </p>
        <form onSubmit={handleSubmit} className="relative w-full max-w-2xl">
          <input
            type="text"
            value={searchInput}
            onChange={handleChange}
            placeholder="Search for your favorite food..."
            className="w-full px-6 py-4 rounded-full text-gray-800 text-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-yellow-400 p-3 rounded-full hover:bg-yellow-500 transition-colors"
          >
            <Search size={24} className="text-gray-800" />
          </button>
        </form>
      </div>
    </div>
  );
}