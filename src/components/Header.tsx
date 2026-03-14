'use client';

import { Search, ShoppingCart, User, Menu, X, Package, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/cart';
import { useUserStore } from '@/store/user';

interface HeaderProps {
  onSearch?: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const itemCount = useCartStore((state) => state.getItemCount());
  const { user, isAuthenticated, logout } = useUserStore();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary text-white h-16 border-b border-primary-light">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Package className="w-8 h-8" />
            <span className="text-xl font-bold tracking-tight">TechWorld</span>
          </Link>
          <Link 
            href="/shop" 
            className="hidden md:block text-sm text-gray-300 hover:text-white transition-colors"
          >
            Shop
          </Link>
          <Link 
            href="/studio" 
            className="hidden md:block text-sm text-gray-300 hover:text-white transition-colors"
          >
            Developer Showcase
          </Link>
        </div>

        <form onSubmit={handleSearch} className="flex-1 max-w-xl hidden md:flex">
          <div className="flex w-full">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="flex-1 h-10 px-4 text-primary bg-white border-0 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="h-10 px-6 bg-accent hover:bg-accent-hover transition-colors border-0"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-primary-light transition-colors">
            <ShoppingCart className="w-6 h-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center font-medium">
                {itemCount}
              </span>
            )}
          </Link>

          <div className="relative">
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 p-2 hover:bg-primary-light transition-colors"
                >
                  <User className="w-6 h-6" />
                  <span className="hidden lg:block text-sm">{user?.name}</span>
                </button>
                
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white text-primary shadow-dropdown border border-border">
                    <div className="p-3 border-b border-border">
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-text-secondary">{user?.email}</p>
                    </div>
                    <div className="py-1">
                      {user?.role === 'admin' && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 px-4 py-2 hover:bg-background-alt transition-colors"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/account"
                        className="flex items-center gap-2 px-4 py-2 hover:bg-background-alt transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 hover:bg-background-alt transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/account"
                className="flex items-center gap-2 p-2 hover:bg-primary-light transition-colors"
              >
                <User className="w-6 h-6" />
                <span className="hidden lg:block text-sm">Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-primary-light transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-primary border-t border-primary-light p-4 md:hidden">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="flex-1 h-10 px-4 text-primary bg-white border-0 focus:outline-none"
                />
                <button
                  type="submit"
                  className="h-10 px-4 bg-accent hover:bg-accent-hover transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="space-y-2">
              <Link 
                href="/shop" 
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/studio" 
                className="block py-2 text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                Developer Showcase
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
