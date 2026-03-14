'use client';

import { Category } from '@/lib/types';
import { X } from 'lucide-react';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  minRating: number;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export default function FilterSidebar({
  categories,
  selectedCategory,
  onCategoryChange,
  minPrice,
  maxPrice,
  onPriceChange,
  minRating,
  onRatingChange,
  onClearFilters,
  isOpen,
  onClose
}: FilterSidebarProps) {
  const hasActiveFilters = selectedCategory !== 'all' || minPrice > 0 || maxPrice < 50000 || minRating > 0;

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-50 w-72 bg-white border-r border-border
        transform transition-transform duration-300 overflow-y-auto scrollbar-thin
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 border-b border-border flex items-center justify-between md:hidden">
          <h2 className="font-semibold">Filters</h2>
          <button onClick={onClose} className="p-2">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-lg">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm text-accent hover:text-accent-hover"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={selectedCategory === 'all'}
                  onChange={() => onCategoryChange('all')}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm">All Categories</span>
              </label>
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat.name.toLowerCase()}
                    onChange={() => onCategoryChange(cat.name.toLowerCase())}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm">{cat.name}</span>
                  <span className="text-xs text-text-muted">({cat.count})</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="text-xs text-text-muted">Min</label>
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => onPriceChange(Number(e.target.value), maxPrice)}
                    className="w-full h-9 px-2 border border-border text-sm focus:border-accent"
                    placeholder="$0"
                  />
                </div>
                <span className="text-text-muted mt-4">-</span>
                <div className="flex-1">
                  <label className="text-xs text-text-muted">Max</label>
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
                    className="w-full h-9 px-2 border border-border text-sm focus:border-accent"
                    placeholder="$50,000"
                  />
                </div>
              </div>
              <input
                type="range"
                min="0"
                max="50000"
                value={maxPrice}
                onChange={(e) => onPriceChange(minPrice, Number(e.target.value))}
                className="w-full accent-accent"
              />
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-medium mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[0, 3, 3.5, 4, 4.5].map((rating) => (
                <label key={rating} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    checked={minRating === rating}
                    onChange={() => onRatingChange(rating)}
                    className="w-4 h-4 accent-accent"
                  />
                  <span className="text-sm">
                    {rating === 0 ? 'All Ratings' : `${rating}+ Stars`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
