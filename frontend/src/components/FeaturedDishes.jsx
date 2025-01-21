import React, { useState } from 'react';
import { CategorySection } from './CategorySection';

function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-center gap-4 mb-8 px-4 overflow-x-auto">
        {[1, 2, 3].map((tab) => (
          <div key={tab} className="h-10 bg-gray-700 rounded-full w-32" />
        ))}
      </div>
      {[1, 2].map((category) => (
        <div key={category} className="mb-16">
          <div className="h-8 bg-gray-700 rounded w-48 mb-8 mx-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="w-full h-48 bg-gray-700" />
                <div className="p-6">
                  <div className="h-6 bg-gray-700 rounded w-3/4 mb-2" />
                  <div className="h-4 bg-gray-700 rounded w-full mb-4" />
                  <div className="flex justify-between items-center">
                    <div className="h-6 bg-gray-700 rounded w-20" />
                    <div className="h-10 bg-gray-700 rounded w-28" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function FeaturedDishes({ foodCat, foodItem, loading = false }) {
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Get categories that have matching items
  const categoriesWithItems = foodCat.filter(category => 
    foodItem.some(item => item.CategoryName === category.CategoryName)
  );

  return (
    <section className="bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          <span className="text-yellow-400">Our</span>{' '}
          <span className="text-white">Menu</span>
        </h2>

        {loading ? (
          <SkeletonLoader />
        ) : categoriesWithItems.length > 0 ? (
          <>
            <div className="flex justify-center gap-4 mb-12 px-4 overflow-x-auto pb-4">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap
                  ${activeCategory === 'all'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                  }`}
              >
                All Categories
              </button>
              {categoriesWithItems.map((category) => (
                <button
                  key={category._id}
                  onClick={() => setActiveCategory(category.CategoryName)}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 whitespace-nowrap
                    ${activeCategory === category.CategoryName
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-800 text-white hover:bg-gray-700'
                    }`}
                >
                  {category.CategoryName}
                </button>
              ))}
            </div>

            {categoriesWithItems.map((category) => (
              <CategorySection
                key={category._id}
                categoryName={category.CategoryName}
                items={foodItem.filter(
                  (item) => item.CategoryName === category.CategoryName
                )}
                isVisible={activeCategory === 'all' || activeCategory === category.CategoryName}
              />
            ))}
          </>
        ) : (
          <div className="text-center text-gray-400 py-8">
            No matching items found
          </div>
        )}
      </div>
    </section>
  );
}