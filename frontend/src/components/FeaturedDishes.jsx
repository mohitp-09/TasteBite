import React from 'react';
import { CategorySection } from './CategorySection';

export function FeaturedDishes({ foodCat, foodItem }) {
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
        
        {categoriesWithItems.length > 0 ? (
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