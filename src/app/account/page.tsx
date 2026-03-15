'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Mail, 
  Lock, 
  User, 
  Package, 
  Loader2, 
  Download, 
  ShoppingBag,
  LogOut,
  CreditCard,
  Settings,
  Gamepad2,
  Brain,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { SupabaseGame, SupabasePurchase } from '@/lib/types';

export default function AccountPage() {
  const router = useRouter();
  const { user, loading: authLoading, signIn, signUp, signOut } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const [activeTab, setActiveTab] = useState<'library' | 'orders' | 'settings'>('library');
  const [purchases, setPurchases] = useState<SupabasePurchase[]>([]);
  const [purchasedGames, setPurchasedGames] = useState<SupabaseGame[]>([]);
  const [loadingPurchases, setLoadingPurchases] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      fetchPurchases();
    }
  }, [user, authLoading]);

  const fetchPurchases = async () => {
    if (!user) return;
    
    setLoadingPurchases(true);
    try {
      const supabase = createClient();
      
      const { data: purchasesData } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('status', 'completed')
        .order('created_at', { ascending: false });
      
      if (purchasesData && purchasesData.length > 0) {
        setPurchases(purchasesData);
        
        const gameIds = purchasesData
          .filter(p => p.game_id)
          .map(p => p.game_id);
        
        if (gameIds.length > 0) {
          const { data: gamesData } = await supabase
            .from('games')
            .select('*')
            .in('id', gameIds);
          
          if (gamesData) {
            setPurchasedGames(gamesData);
          }
        }
      }
    } catch (error) {
      console.error('Failed to fetch purchases:', error);
    } finally {
      setLoadingPurchases(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          setError(error.message);
          return;
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          setError(error.message);
          return;
        }
        setError('Check your email to confirm your account.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const downloadGame = async (game: SupabaseGame) => {
    if (game.storage_path) {
      const supabase = createClient();
      const { data } = supabase.storage
        .from('game-files')
        .getPublicUrl(game.storage_path);
      
      if (data?.publicUrl) {
        window.open(data.publicUrl, '_blank');
      }
    } else if (game.download_url) {
      window.open(game.download_url, '_blank');
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-md mx-auto">
            <div className="bg-primary-light border border-border p-8">
              <div className="text-center mb-8">
                <Package className="w-12 h-12 text-accent mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </h1>
                <p className="text-gray-400">
                  {isLogin 
                    ? 'Sign in to access your library and purchases' 
                    : 'Create a TechWorld account to get started'
                  }
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-10 pl-10 pr-3 bg-primary border border-border text-white focus:border-accent"
                        placeholder="John Doe"
                        required={!isLogin}
                      />
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 bg-primary border border-border text-white focus:border-accent"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-10 pl-10 pr-3 bg-primary border border-border text-white focus:border-accent"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                </div>

                {error && (
                  <div className={`p-3 border text-sm ${
                    error.includes('Check your email') 
                      ? 'bg-success/10 border-success/20 text-success'
                      : 'bg-error/10 border-error/20 text-error'
                  }`}>
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 bg-accent hover:bg-accent-hover text-white font-medium transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
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
                <button
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                  }}
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : 'Already have an account? Sign in'
                  }
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">My Account</h1>
              <p className="text-gray-400">{user.email}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 border border-border text-gray-300 hover:text-white hover:border-gray-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap">
            <button
              onClick={() => setActiveTab('library')}
              className={`px-4 py-2 border transition-colors flex items-center gap-2 ${
                activeTab === 'library'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-primary-light text-gray-300 border-border hover:border-accent'
              }`}
            >
              <Package className="w-4 h-4" />
              My Library
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 border transition-colors flex items-center gap-2 ${
                activeTab === 'orders'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-primary-light text-gray-300 border-border hover:border-accent'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Orders
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 border transition-colors flex items-center gap-2 ${
                activeTab === 'settings'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-primary-light text-gray-300 border-border hover:border-accent'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </div>

          {activeTab === 'library' && (
            <div className="bg-primary-light border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-white">My Library</h2>
                <p className="text-gray-400 text-sm">Access your purchased AI tools and games</p>
              </div>
              
              {loadingPurchases ? (
                <div className="p-12 text-center">
                  <Loader2 className="w-8 h-8 animate-spin text-accent mx-auto" />
                </div>
              ) : purchasedGames.length > 0 ? (
                <div className="divide-y divide-border">
                  {purchasedGames.map((game) => (
                    <div key={game.id} className="p-6 flex items-center gap-6">
                      <div className="w-20 h-20 bg-primary shrink-0 relative overflow-hidden">
                        {game.image_url ? (
                          <Image
                            src={game.image_url}
                            alt={game.title}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            {game.category === 'AI' ? (
                              <Brain className="w-8 h-8 text-purple-400" />
                            ) : (
                              <Gamepad2 className="w-8 h-8 text-gray-500" />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs px-2 py-0.5 border ${
                            game.category === 'AI'
                              ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                              : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          }`}>
                            {game.category}
                          </span>
                          <span className="text-xs font-mono text-gray-500">v{game.version}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-white truncate">{game.title}</h3>
                        <p className="text-gray-400 text-sm truncate">{game.description}</p>
                      </div>
                      <button
                        onClick={() => downloadGame(game)}
                        className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Purchases Yet</h3>
                  <p className="text-gray-400 mb-6">Your purchased games and AI tools will appear here.</p>
                  <Link
                    href="/"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
                  >
                    Browse Store
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="bg-primary-light border border-border">
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-bold text-white">Order History</h2>
                <p className="text-gray-400 text-sm">View your past purchases</p>
              </div>
              
              {purchases.length > 0 ? (
                <div className="divide-y divide-border">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="p-6 flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">Order #{purchase.id.slice(0, 8)}</p>
                        <p className="text-gray-400 text-sm">
                          {new Date(purchase.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">
                          {purchase.currency} {purchase.amount.toFixed(2)}
                        </p>
                        <span className={`text-xs px-2 py-1 border ${
                          purchase.status === 'completed'
                            ? 'bg-success/10 text-success border-success/20'
                            : purchase.status === 'refunded'
                            ? 'bg-warning/10 text-warning border-warning/20'
                            : 'bg-gray-500/10 text-gray-400 border-gray-500/20'
                        }`}>
                          {purchase.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-12 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">No Orders Yet</h3>
                  <p className="text-gray-400">Your order history will appear here.</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-primary-light border border-border p-6">
              <h2 className="text-xl font-bold text-white mb-6">Account Settings</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400 text-sm">{user.email}</p>
                  </div>
                  <CreditCard className="w-5 h-5 text-gray-500" />
                </div>
                
                <div className="flex items-center justify-between py-4 border-b border-border">
                  <div>
                    <p className="text-white font-medium">Account Type</p>
                    <p className="text-gray-400 text-sm">Premium Member</p>
                  </div>
                  <Settings className="w-5 h-5 text-gray-500" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
