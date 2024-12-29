import React from 'react';
import { DishCard } from './DishCard';

export function CategorySection({ categoryName, items }) {
  return (
    <div className="mb-12">
      <h3 className="text-3xl font-bold text-white mb-6 px-4">{categoryName}</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {items.map((item) => (
          <DishCard
            id={item._id}
            foodName={item.name}
            foodDescription={item.description}
            foodPrice={item.basicPrice}
            foodImage={item.img}
          />
        ))}
      </div>
    </div>
  );
}