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
  Package
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase';
import { SupabaseGame } from '@/lib/types';

export default function LandingPage() {
  const [aiTools, setAiTools] = useState<SupabaseGame[]>([]);
  const [games, setGames] = useState<SupabaseGame[]>([]);
  const [loading, setLoading] = useState(true);

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
        const ai = gamesData.filter(g => g.category === 'AI');
        const gaming = gamesData.filter(g => g.category === 'Gaming');
        setAiTools(ai);
        setGames(gaming);
      }
    } catch (error) {
      console.log('Using fallback content');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>
          
          <div className="relative max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Box className="w-12 h-12" />
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
              TechWorld
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-4">
              Powered by Phantom Illusions Studio
            </p>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Your destination for enterprise AI tools and premium gaming experiences
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#ai-tools"
                className="inline-flex items-center gap-3 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold transition-colors"
              >
                <Brain className="w-5 h-5" />
                AI Tools
              </Link>
              <Link
                href="#game-store"
                className="inline-flex items-center gap-3 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-lg font-semibold transition-colors"
              >
                <Gamepad2 className="w-5 h-5" />
                Game Store
              </Link>
            </div>
          </div>
        </section>

        {/* Section 1: AI Tools */}
        <section id="ai-tools" className="py-16 md:py-24 bg-primary-light">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="w-10 h-10 text-purple-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">AI Tools</h2>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Discover powerful AI solutions from Phantom Illusions Studio. 
              Build, train, and deploy custom AI models with our developer tools.
            </p>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-primary border border-border p-6 animate-pulse">
                    <div className="h-40 bg-border mb-4" />
                    <div className="h-6 bg-border mb-2" />
                    <div className="h-4 bg-border w-2/3" />
                  </div>
                ))}
              </div>
            ) : aiTools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {aiTools.map((tool) => (
                  <div key={tool.id} className="bg-primary border border-border overflow-hidden group">
                    <div className="aspect-video bg-primary relative overflow-hidden">
                      {tool.image_url ? (
                        <Image
                          src={tool.image_url}
                          alt={tool.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-purple-400">v{tool.version}</span>
                        <span className="text-xs text-gray-500">{tool.download_count} users</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{tool.title}</h3>
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-white">
                          {tool.is_free ? (
                            <span className="text-success">FREE</span>
                          ) : (
                            `$${tool.price.toFixed(2)}`
                          )}
                        </span>
                        {tool.is_free ? (
                          <Link
                            href={`/download/${tool.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Link>
                        ) : (
                          <Link
                            href={`/checkout?game=${tool.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Purchase
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-primary border border-border p-12 text-center">
                <Brain className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No AI Tools Available</h3>
                <p className="text-gray-400">Check back soon for new AI releases from Phantom Illusions Studio.</p>
              </div>
            )}

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary border border-border p-6">
                <Cpu className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">SmartAI Console</h3>
                <p className="text-gray-400 text-sm">
                  All-in-one DIY AI development system for researchers and developers.
                </p>
              </div>
              <div className="bg-primary border border-border p-6">
                <Database className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Neural Network Processing</h3>
                <p className="text-gray-400 text-sm">
                  High-performance computing for training and deploying ML models.
                </p>
              </div>
              <div className="bg-primary border border-border p-6">
                <Cloud className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">Cloud Integration</h3>
                <p className="text-gray-400 text-sm">
                  Seamless deployment to edge devices and cloud infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Game Store */}
        <section id="game-store" className="py-16 md:py-24 bg-primary">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Gamepad2 className="w-10 h-10 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">Game Store</h2>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl">
              Explore and download premium games developed by Phantom Illusions Studio.
              From indie gems to innovative experiences.
            </p>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-primary-light border border-border p-6 animate-pulse">
                    <div className="aspect-video bg-border mb-4" />
                    <div className="h-6 bg-border mb-2" />
                    <div className="h-4 bg-border w-2/3" />
                  </div>
                ))}
              </div>
            ) : games.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                  <div key={game.id} className="bg-primary-light border border-border overflow-hidden group">
                    <div className="aspect-video bg-primary relative overflow-hidden">
                      {game.image_url ? (
                        <Image
                          src={game.image_url}
                          alt={game.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Gamepad2 className="w-16 h-16 text-gray-600" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-gray-500">v{game.version}</span>
                        <span className="text-xs text-gray-500">{game.download_count} downloads</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1 truncate">{game.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4 min-h-[40px]">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-accent">
                          {game.is_free ? 'FREE' : `$${game.price.toFixed(2)}`}
                        </span>
                        {game.is_free ? (
                          <Link
                            href={`/download/${game.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-success hover:bg-success/90 text-white text-sm font-medium transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </Link>
                        ) : (
                          <Link
                            href={`/checkout?game=${game.id}`}
                            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Purchase
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-primary-light border border-border p-12 text-center">
                <Gamepad2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Games Available</h3>
                <p className="text-gray-400">Check back soon for new game releases from Phantom Illusions Studio.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary-light">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Your Library, Anywhere</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Create a TechWorld account to access your purchased AI tools and games from any device.
              Never lose access to your digital collection.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-white text-lg font-semibold transition-colors"
              >
                <Package className="w-5 h-5" />
                My Library
              </Link>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary border border-border text-white text-lg font-semibold hover:bg-primary-light transition-colors"
              >
                <Globe className="w-5 h-5" />
                Sign In
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
                <Box className="w-8 h-8" />
                <h3 className="text-xl font-bold">TechWorld</h3>
              </div>
              <p className="text-sm text-gray-400">
                Powered by Phantom Illusions Studio
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#ai-tools" className="hover:text-white">AI Tools</Link></li>
                <li><Link href="#game-store" className="hover:text-white">Game Store</Link></li>
                <li><Link href="/studio" className="hover:text-white">Studio</Link></li>
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
            &copy; 2024 TechWorld. Powered by Phantom Illusions Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
