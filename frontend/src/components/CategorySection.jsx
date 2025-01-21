import React from 'react';
import { DishCard } from './DishCard';

export function CategorySection({ categoryName, items, isVisible }) {
  if (!isVisible) return null;

  return (
    <div className="mb-12 animate-fade-in">
      <h3 className="text-3xl font-bold text-white mb-6 px-4">{categoryName}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {items.map((item) => (
          <DishCard
            key={item._id}
            id={item._id}
            foodName={item.name}
            foodDescription={item.description}
            foodPrice={item.basicPrice}
            foodImage={item.img}
            foodOptions={item.options}
            foodCategory={item.CategoryName}
          />
        ))}
      </div>
    </div>
  );
}