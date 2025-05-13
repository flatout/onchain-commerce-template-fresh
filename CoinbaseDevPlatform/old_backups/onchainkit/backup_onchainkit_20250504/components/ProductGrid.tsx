'use client';

import { useState } from 'react';
import { ProductType } from '../utils/commerce';
import { products } from '../data/products';
import ProductCard from './ProductCard';

const FILTER_OPTIONS: { label: string; value: ProductType | 'all' }[] = [
  { label: 'All Items', value: 'all' },
  { label: 'NFTs', value: 'nft' },
  { label: 'Physical Items', value: 'physical' },
  { label: 'Digital Items', value: 'digital' }
];

export default function ProductGrid() {
  const [selectedFilter, setSelectedFilter] = useState<ProductType | 'all'>('all');

  const filteredProducts = products.filter(product => 
    selectedFilter === 'all' || product.productType === selectedFilter
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_OPTIONS.map(option => (
          <button
            key={option.value}
            onClick={() => setSelectedFilter(option.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedFilter === option.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            {...product}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No items found for the selected filter.</p>
        </div>
      )}
    </div>
  );
} 