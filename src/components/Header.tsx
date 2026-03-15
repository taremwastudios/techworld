'use client';

import { Search, ShoppingCart, User, Menu, X, Box, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
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

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white text-primary h-16 border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-6 shrink-0">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Box className="w-8 h-8 text-accent" />
            <span className="text-xl font-bold tracking-tight text-primary">Illusions Family</span>
          </Link>
          <Link 
            href="/ai-tools" 
            className="hidden md:block text-sm text-secondary hover:text-primary transition-colors"
          >
            AI Tools
          </Link>
          <Link 
            href="/game-store" 
            className="hidden md:block text-sm text-secondary hover:text-primary transition-colors"
          >
            Game Store
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 hover:bg-background-alt transition-colors">
            <ShoppingCart className="w-6 h-6 text-primary" />
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
                  className="flex items-center gap-2 p-2 hover:bg-background-alt transition-colors"
                >
                  <User className="w-6 h-6 text-primary" />
                  <span className="hidden lg:block text-sm text-primary">{user?.name}</span>
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
                className="flex items-center gap-2 p-2 hover:bg-background-alt transition-colors"
              >
                <User className="w-6 h-6 text-primary" />
                <span className="hidden lg:block text-sm text-primary">Sign In</span>
              </Link>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-background-alt transition-colors md:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-primary" /> : <Menu className="w-6 h-6 text-primary" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-t border-border p-4 md:hidden shadow-lg">
            <div className="space-y-2">
              <Link 
                href="/ai-tools" 
                className="block py-2 text-primary hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                AI Tools
              </Link>
              <Link 
                href="/game-store" 
                className="block py-2 text-primary hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Game Store
              </Link>
              <Link 
                href="/account" 
                className="block py-2 text-primary hover:text-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
