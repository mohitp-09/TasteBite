import React from 'react';

export function Badge({ children, className = '' }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium bg-yellow-400 text-gray-900 ${className}`}>
      {children}
    </span>
  );
}