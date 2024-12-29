import React from 'react';
import { Clock, Star, Users } from 'lucide-react';

export function DishMetrics({ prepTime, rating, servings }) {
  return (
    <div className="flex gap-6 text-gray-400">
      <div className="flex items-center gap-2">
        <Clock className="w-5 h-5" />
        <span>{prepTime}</span>
      </div>
      <div className="flex items-center gap-2">
        <Star className="w-5 h-5 text-yellow-400" />
        <span>{rating}</span>
      </div>
      <div className="flex items-center gap-2">
        <Users className="w-5 h-5" />
        <span>Serves {servings}</span>
      </div>
    </div>
  );
}