'use client';

import { Star, ShoppingCart, Zap } from 'lucide-react';
import { Product } from '@/lib/types';
import { useCartStore } from '@/store/cart';
import { useState } from 'react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  showQuickBuy?: boolean;
}

export default function ProductCard({ product, showQuickBuy = true }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    window.location.href = '/checkout';
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-warning text-warning'
            : i < rating
            ? 'fill-warning/50 text-warning'
            : 'fill-gray-200 text-gray-200'
        }`}
      />
    ));
  };

  return (
    <div className="card shadow-card hover:shadow-lg transition-shadow group">
      <div className="relative aspect-square bg-background-alt overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.stock <= 5 && product.stock > 0 && (
          <span className="absolute top-2 left-2 bg-warning text-white text-xs px-2 py-1">
            Only {product.stock} left
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-2 left-2 bg-error text-white text-xs px-2 py-1">
            Out of Stock
          </span>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-xs text-text-muted uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-text-primary mb-2 line-clamp-2 h-12">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-text-muted ml-1">({product.reviewCount})</span>
        </div>
        
        <p className="text-xl font-bold text-primary mb-3">
          ${product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </p>
        
        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex-1 h-10 flex items-center justify-center gap-2 border transition-all ${
              product.stock === 0
                ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                : isAdded
                ? 'bg-success text-white border-success'
                : 'bg-white text-primary border-border hover:border-primary hover:bg-primary hover:text-white'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdded ? 'Added!' : 'Add to Cart'}
          </button>
          
          {showQuickBuy && product.stock > 0 && (
            <button
              onClick={handleQuickBuy}
              className="h-10 px-4 bg-accent hover:bg-accent-hover text-white border border-accent transition-colors flex items-center justify-center"
              title="Quick Buy"
            >
              <Zap className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
