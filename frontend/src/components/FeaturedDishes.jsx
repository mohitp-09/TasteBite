import React from 'react';
import { CategorySection } from './CategorySection';

function SkeletonLoader() {
  return (
    <div className="animate-pulse">
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
          categoriesWithItems.map((category) => (
            <CategorySection
              key={category._id}
              categoryName={category.CategoryName}
              items={foodItem.filter(
                (item) => item.CategoryName === category.CategoryName
              )}
            />
          ))
        ) : (
          <div className="text-center text-gray-400 py-8">
            No matching items found
          </div>
        )}
      </div>
    </section>
  );
}