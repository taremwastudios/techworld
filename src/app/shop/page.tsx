'use client';

import { useState, useEffect, useCallback } from 'react';
import { Product, Category } from '@/lib/types';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import FilterSidebar from '@/components/FilterSidebar';
import { Filter, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (selectedCategory !== 'all') params.set('category', selectedCategory);
    if (minPrice > 0) params.set('minPrice', minPrice.toString());
    if (maxPrice < 50000) params.set('maxPrice', maxPrice.toString());
    if (minRating > 0) params.set('rating', minRating.toString());
    if (sort) params.set('sort', sort);
    if (searchQuery) params.set('search', searchQuery);

    try {
      const res = await fetch(`/api/products?${params.toString()}`);
      const data = await res.json();
      setProducts(data.products);
      setCategories(data.categories);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory, minPrice, maxPrice, minRating, sort, searchQuery]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(debounce);
  }, [fetchProducts]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(50000);
    setMinRating(0);
    setSort('newest');
    setSearchQuery('');
  };

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
  ];

  return (
    <div className="min-h-screen bg-background-alt">
      <Header onSearch={handleSearch} />
      
      <main className="pt-16">
        <div className="bg-primary text-white py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold">Shop</h1>
            <p className="text-gray-300 mt-1">Browse our enterprise technology catalog</p>
          </div>
        </div>
        
        <div className="flex">
          <FilterSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onPriceChange={(min, max) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
            minRating={minRating}
            onRatingChange={setMinRating}
            onClearFilters={handleClearFilters}
            isOpen={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
          />

          <div className="flex-1 p-4 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 border border-border bg-white"
                >
                  <Filter className="w-4 h-4" />
                  Filters
                </button>
                <p className="text-text-secondary">
                  {products.length} {products.length === 1 ? 'product' : 'products'}
                </p>
              </div>

              <div className="relative">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-border bg-white"
                >
                  Sort: {sortOptions.find(o => o.value === sort)?.label}
                  {sortDropdownOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
                
                {sortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-border shadow-dropdown z-10">
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSort(option.value);
                          setSortDropdownOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 hover:bg-background-alt ${
                          sort === option.value ? 'bg-background-alt font-medium' : ''
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-text-secondary text-lg">No products found</p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 text-accent hover:text-accent-hover"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
