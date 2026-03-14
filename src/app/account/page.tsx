'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, User, ArrowRight, Package, Loader2 } from 'lucide-react';
import { useUserStore } from '@/store/user';
import Header from '@/components/Header';
import { Order } from '@/lib/types';

export default function AccountPage() {
  const router = useRouter();
  const { user, isAuthenticated, login } = useUserStore();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [showOrders, setShowOrders] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: isLogin ? 'login' : 'register',
          email,
          password,
          name,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Authentication failed');
        return;
      }

      login(data);
      
      if (data.role === 'admin') {
        router.push('/admin');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/orders?userId=${user.id}`);
      const data = await res.json();
      setOrders(data);
      setShowOrders(true);
    } catch (err) {
      console.error('Failed to fetch orders:', err);
    } finally {
      setLoading(false);
    }
  };

  if (isAuthenticated && user) {
    return (
      <div className="min-h-screen bg-background-alt">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-border p-6 mb-6">
              <h1 className="text-2xl font-semibold mb-2">Welcome, {user.name}</h1>
              <p className="text-text-secondary">{user.email}</p>
              <p className="text-sm text-text-muted mt-1">Account Type: {user.role}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={fetchOrders}
                disabled={loading}
                className="flex items-center justify-between p-6 bg-white border border-border hover:border-primary transition-colors text-left"
              >
                <div>
                  <Package className="w-8 h-8 mb-2 text-secondary" />
                  <h3 className="font-semibold">Order History</h3>
                  <p className="text-sm text-text-secondary">View your past orders</p>
                </div>
                <ArrowRight className="w-5 h-5 text-text-muted" />
              </button>

              {user.role === 'admin' && (
                <Link
                  href="/admin"
                  className="flex items-center justify-between p-6 bg-white border border-border hover:border-primary transition-colors text-left"
                >
                  <div>
                    <h3 className="font-semibold">Admin Dashboard</h3>
                    <p className="text-sm text-text-secondary">Manage products and orders</p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-text-muted" />
                </Link>
              )}
            </div>

            {showOrders && (
              <div className="mt-6 bg-white border border-border">
                <div className="p-4 border-b border-border">
                  <h2 className="font-semibold">Your Orders</h2>
                </div>
                {loading ? (
                  <div className="p-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-accent" />
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-8 text-center text-text-secondary">
                    No orders found
                  </div>
                ) : (
                  <div>
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 border-b border-border last:border-b-0">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Order #{order.id}</span>
                          <span
                            className={`px-2 py-1 text-xs font-medium ${
                              order.status === 'delivered'
                                ? 'bg-success/10 text-success'
                                : order.status === 'shipped'
                                ? 'bg-accent/10 text-accent'
                                : order.status === 'processing'
                                ? 'bg-warning/10 text-warning'
                                : 'bg-text-muted/10 text-text-muted'
                            }`}
                          >
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-text-secondary">
                          {order.items.length} item(s) - ${order.total.toFixed(2)}
                        </p>
                        <p className="text-xs text-text-muted mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-alt">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-border p-6">
            <h1 className="text-2xl font-semibold text-center mb-6">
              {isLogin ? 'Sign In' : 'Create Account'}
            </h1>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 border border-border focus:border-accent"
                      placeholder="John Doe"
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 border border-border focus:border-accent"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-10 pl-10 pr-3 border border-border focus:border-accent"
                    placeholder="Enter your password"
                    required
                  />
                </div>
              </div>

              {error && (
                <p className="text-sm text-error">{error}</p>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-primary hover:bg-primary-light text-white transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-sm text-text-secondary">
                {isLogin ? "Don't have an account?" : 'Already have an account?'}
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="ml-1 text-accent hover:text-accent-hover font-medium"
                >
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </button>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-text-muted text-center">
                Demo credentials:<br />
                Buyer: buyer@example.com<br />
                Admin: admin@example.com
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
