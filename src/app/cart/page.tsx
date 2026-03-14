'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import Header from '@/components/Header';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotal } = useCartStore();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background-alt">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <ShoppingBag className="w-16 h-16 mx-auto text-text-muted mb-4" />
            <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
            <p className="text-text-secondary mb-6">Add some products to get started</p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white hover:bg-primary-light transition-colors"
            >
              Browse Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-alt">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Shopping Cart ({items.length})</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <div className="bg-white border border-border">
                {items.map((item) => (
                  <div
                    key={item.productId}
                    className="flex gap-4 p-4 border-b border-border last:border-b-0"
                  >
                    <div className="w-24 h-24 bg-background-alt shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="font-medium hover:text-accent transition-colors line-clamp-2"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-text-secondary mt-1">
                        {item.product.category}
                      </p>
                      <p className="font-bold mt-2">
                        ${item.product.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-2 text-text-muted hover:text-error transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="p-2 hover:bg-background-alt transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="p-2 hover:bg-background-alt transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-80">
              <div className="bg-white border border-border p-6 sticky top-24">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                
                <Link
                  href="/checkout"
                  className="flex items-center justify-center gap-2 w-full h-12 bg-accent hover:bg-accent-hover text-white transition-colors"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
