import React from 'react';
import { Link } from 'react-router-dom';
import { Utensils } from 'lucide-react';

export function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Utensils className="text-yellow-400" size={24} />
      <span className="text-xl font-bold">
        <span className="text-yellow-400">Taste</span>
        <span className="text-white">Bite</span>
      </span>
    </Link>
  );
}