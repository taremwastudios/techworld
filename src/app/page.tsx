'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Brain, 
  Cpu, 
  Database, 
  Shield, 
  Zap, 
  Globe, 
  Download, 
  ShoppingCart,
  Gamepad2,
  Sparkles,
  Box,
  Cloud,
  Package,
  Search,
  Star,
  Filter
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase';
import { SupabaseGame } from '@/lib/types';

export default function LandingPage() {
  const [aiTools, setAiTools] = useState<SupabaseGame[]>([]);
  const [games, setGames] = useState<SupabaseGame[]>([]);
  const [products, setProducts] = useState<[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const supabase = createClient();
      const { data: gamesData } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      
      if (gamesData) {
        const ai = gamesData.filter((g: SupabaseGame) => g.category === 'AI');
        const gaming = gamesData.filter((g: SupabaseGame) => g.category === 'Gaming');
        setAiTools(ai);
        setGames(gaming);
      }
    } catch (error) {
      console.log('Using fallback content');
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAI = aiTools.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Box className="w-10 h-10 text-accent" />
              <Sparkles className="w-6 h-6 text-yellow-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-primary">
              Illusions Family
            </h1>
            <p className="text-lg text-secondary mb-6">
              Your destination for premium games and AI tools
            </p>
            <p className="text-base text-text-secondary max-w-2xl mx-auto mb-8">
              Discover, purchase, and download amazing games and AI applications. 
              Your library, accessible anywhere.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <div className="relative max-w-md mx-auto w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games and AI tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-12 pl-10 pr-4 border border-border text-primary bg-white focus:border-accent"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#store"
                className="inline-flex items-center gap-2 px-8 py-3 bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                Browse Store
              </Link>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-3 border border-accent text-accent font-semibold hover:bg-blue-50 transition-colors"
              >
                <Package className="w-5 h-5" />
                My Library
              </Link>
            </div>
          </div>
        </section>

        {/* Store Section - Combined Games and AI Tools */}
        <section id="store" className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">Game Store</h2>
                <p className="text-secondary">Browse our collection of games and AI tools</p>
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white border border-border p-4 animate-pulse">
                    <div className="aspect-video bg-border mb-4" />
                    <div className="h-5 bg-border mb-2" />
                    <div className="h-4 bg-border w-2/3" />
                  </div>
                ))}
              </div>
            ) : (
              <>
                {/* AI Tools Section */}
                <div className="mb-12">
                  <div className="flex items-center gap-2 mb-6">
                    <Brain className="w-6 h-6 text-purple-600" />
                    <h3 className="text-xl font-bold text-primary">AI Tools</h3>
                  </div>
                  
                  {filteredAI.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredAI.map((tool) => (
                        <div key={tool.id} className="bg-white border border-border overflow-hidden group hover:shadow-lg transition-shadow">
                          <div className="aspect-video bg-blue-50 relative overflow-hidden">
                            {tool.image_url ? (
                              <Image
                                src={tool.image_url}
                                alt={tool.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Brain className="w-12 h-12 text-purple-300" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-purple-600">v{tool.version}</span>
                              <span className="text-xs text-text-muted">{tool.download_count} downloads</span>
                            </div>
                            <h4 className="font-semibold text-primary mb-1 truncate">{tool.title}</h4>
                            <p className="text-sm text-text-secondary line-clamp-2 mb-3">{tool.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">
                                {tool.is_free ? (
                                  <span className="text-success">FREE</span>
                                ) : (
                                  `$${tool.price?.toFixed(2)}`
                                )}
                              </span>
                              {tool.is_free ? (
                                <Link
                                  href={`/download/${tool.id}`}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  Download
                                </Link>
                              ) : (
                                <Link
                                  href={`/checkout?game=${tool.id}`}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                                >
                                  <ShoppingCart className="w-3 h-3" />
                                  Buy
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-100 p-8 text-center">
                      <Brain className="w-12 h-12 text-purple-300 mx-auto mb-3" />
                      <p className="text-secondary">No AI tools available yet</p>
                    </div>
                  )}
                </div>

                {/* Games Section */}
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Gamepad2 className="w-6 h-6 text-accent" />
                    <h3 className="text-xl font-bold text-primary">Games</h3>
                  </div>
                  
                  {filteredGames.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {filteredGames.map((game) => (
                        <div key={game.id} className="bg-white border border-border overflow-hidden group hover:shadow-lg transition-shadow">
                          <div className="aspect-video bg-blue-50 relative overflow-hidden">
                            {game.image_url ? (
                              <Image
                                src={game.image_url}
                                alt={game.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <Gamepad2 className="w-12 h-12 text-blue-300" />
                              </div>
                            )}
                          </div>
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-mono text-text-muted">v{game.version}</span>
                              <span className="text-xs text-text-muted">{game.download_count} downloads</span>
                            </div>
                            <h4 className="font-semibold text-primary mb-1 truncate">{game.title}</h4>
                            <p className="text-sm text-text-secondary line-clamp-2 mb-3">{game.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-primary">
                                {game.is_free ? (
                                  <span className="text-success">FREE</span>
                                ) : (
                                  `$${game.price?.toFixed(2)}`
                                )}
                              </span>
                              {game.is_free ? (
                                <Link
                                  href={`/download/${game.id}`}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-success hover:bg-success/90 text-white text-sm font-medium transition-colors"
                                >
                                  <Download className="w-3 h-3" />
                                  Download
                                </Link>
                              ) : (
                                <Link
                                  href={`/checkout?game=${game.id}`}
                                  className="flex items-center gap-1 px-3 py-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                                >
                                  <ShoppingCart className="w-3 h-3" />
                                  Buy
                                </Link>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-blue-50 border border-blue-100 p-8 text-center">
                      <Gamepad2 className="w-12 h-12 text-blue-300 mx-auto mb-3" />
                      <p className="text-secondary">No games available yet</p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-blue-50">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-primary">Why Choose Illusions Family?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 border border-border">
                <Download className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-primary">Instant Downloads</h3>
                <p className="text-text-secondary text-sm">
                  Get immediate access to your purchases. Download anytime, anywhere.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-border">
                <Cloud className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-primary">Cloud Library</h3>
                <p className="text-text-secondary text-sm">
                  Your purchases are saved to your account. Never lose access to your games.
                </p>
              </div>
              
              <div className="bg-white p-6 border border-border">
                <Shield className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-primary">Secure Payments</h3>
                <p className="text-text-secondary text-sm">
                  Safe and secure transactions powered by Stripe. Your data is protected.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-8 opacity-90 max-w-2xl mx-auto">
              Create an account to access your library, make purchases, and download your favorite games and AI tools.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-3 bg-white text-accent font-semibold hover:bg-gray-100 transition-colors"
              >
                Create Account
              </Link>
              <Link
                href="#store"
                className="inline-flex items-center gap-2 px-8 py-3 border border-white text-white font-semibold hover:bg-white/10 transition-colors"
              >
                Browse Store
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12 border-t border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-8 h-8 text-accent" />
                <h3 className="text-xl font-bold">Illusions Family</h3>
              </div>
              <p className="text-sm text-gray-400">
                Your destination for premium games and AI tools
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Store</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/ai-tools" className="hover:text-white">AI Tools</Link></li>
                <li><Link href="/game-store" className="hover:text-white">Games</Link></li>
                <li><Link href="/account" className="hover:text-white">My Library</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Account</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/account" className="hover:text-white">Sign In</Link></li>
                <li><Link href="/account" className="hover:text-white">My Library</Link></li>
                <li><Link href="/account" className="hover:text-white">Order History</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; 2024 Illusions Family. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
