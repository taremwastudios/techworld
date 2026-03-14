'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Brain, 
  Globe, 
  Download, 
  ShoppingCart, 
  AlertTriangle, 
  Info, 
  Cpu, 
  Layers, 
  Zap, 
  HardDrive,
  ArrowRight,
  Box,
  Gamepad2
} from 'lucide-react';
import Header from '@/components/Header';
import { Game } from '@/lib/types';

export default function StudioPage() {
  const [games, setGames] = useState<Game[]>([]);
  const [showShippingTooltip, setShowShippingTooltip] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      const res = await fetch('/api/games');
      if (res.ok) {
        const data = await res.json();
        setGames(data.games || []);
      }
    } catch (error) {
      console.error('Failed to fetch games:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = (game: Game) => {
    if (game.downloadUrl) {
      window.open(game.downloadUrl, '_blank');
    }
  };

  const handlePurchase = (game: Game) => {
    alert(`Purchase flow for ${game.title} - $${game.price.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-background-alt">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Gamepad2 className="w-10 h-10" />
              <Box className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Phantom Illusions Studio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Pioneering the future of AI and gaming technology
            </p>
          </div>
        </section>

        {/* Section 1: In AI - SmartAI Console */}
        <section className="bg-primary text-white py-16 md:py-24 border-t border-primary-light">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <Brain className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold">In AI</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SmartAI Console Showcase */}
              <div className="bg-primary-light border border-accent/30 p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Cpu className="w-12 h-12 text-accent" />
                  <div>
                    <h3 className="text-2xl font-bold">SmartAI Console</h3>
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-warning/20 text-warning text-xs font-medium border border-warning/30 mt-1">
                      <AlertTriangle className="w-3 h-3" />
                      Limited Global Availability
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 mb-6 text-lg">
                  All-in-one DIY AI development system designed for researchers, developers, and AI enthusiasts.
                </p>

                <div className="mb-6">
                  <h4 className="font-semibold mb-3 text-sm uppercase tracking-wide text-gray-400">Key Features</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Layers className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm">Neural Network Processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Zap className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm">Real-time Inference</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <HardDrive className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm">Local Model Storage</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Globe className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm">Cloud Integration</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Restrictions */}
                <div 
                  className="relative"
                  onMouseEnter={() => setShowShippingTooltip(true)}
                  onMouseLeave={() => setShowShippingTooltip(false)}
                >
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-background-alt border border-border text-sm">
                    <Globe className="w-4 h-4" />
                    <span>Shipping to restricted regions</span>
                    <Info className="w-4 h-4 text-gray-400" />
                  </div>
                  
                  {showShippingTooltip && (
                    <div className="absolute left-0 top-full mt-2 w-64 bg-white text-primary border border-border p-3 z-10">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                        Restricted Shipping Regions
                      </p>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-warning" />
                          Asia
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-warning" />
                          Northern Europe
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-warning" />
                          Pacific
                        </li>
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-primary">
                  <p className="text-text-secondary text-sm">
                    Professional placeholder for detailed specifications. Full technical documentation will be provided upon product release.
                  </p>
                </div>
              </div>

              {/* Additional AI Content */}
              <div className="space-y-6">
                <div className="p-6 bg-primary-light border border-border">
                  <h4 className="font-semibold mb-2">DIY AI System</h4>
                  <p className="text-gray-400 text-sm">
                    Build, train, and deploy custom AI models with our comprehensive development platform.
                    Perfect for hobbyists and professionals alike.
                  </p>
                </div>
                <div className="p-6 bg-primary-light border border-border">
                  <h4 className="font-semibold mb-2">Enterprise Solutions</h4>
                  <p className="text-gray-400 text-sm">
                    Scalable AI infrastructure for businesses requiring on-premise machine learning capabilities.
                  </p>
                </div>
                <div className="p-6 bg-primary-light border border-border">
                  <h4 className="font-semibold mb-2">Research Partnership</h4>
                  <p className="text-gray-400 text-sm">
                    Collaborate with our research team on cutting-edge AI projects and publications.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Phantom Illusions Game Store */}
        <section className="py-16 md:py-24 bg-primary text-white">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-8">
              <ShoppingCart className="w-8 h-8 text-accent" />
              <h2 className="text-3xl md:text-4xl font-bold">Phantom Illusions Game Store</h2>
            </div>

            <p className="text-gray-400 mb-8 max-w-2xl">
              Discover and download games developed by Phantom Illusions Studio. 
              From indie gems to innovative experiences.
            </p>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-none animate-spin mx-auto" />
              </div>
            ) : games.length === 0 ? (
              <div className="text-center py-12 border border-border">
                <Gamepad2 className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No games available yet. Check back soon!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {games.map((game) => (
                  <div 
                    key={game.id} 
                    className="bg-primary-light border border-border overflow-hidden group"
                  >
                    <div className="aspect-video bg-primary relative overflow-hidden">
                      <Image
                        src={game.image}
                        alt={game.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 truncate">{game.title}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-4 min-h-[40px]">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-accent">
                          {game.isFree ? 'FREE' : `$${game.price.toFixed(2)}`}
                        </span>
                        {game.isFree ? (
                          <button
                            onClick={() => handleDownload(game)}
                            className="flex items-center gap-2 px-4 py-2 bg-success hover:bg-success/90 text-white text-sm font-medium transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Instant Download
                          </button>
                        ) : (
                          <button
                            onClick={() => handlePurchase(game)}
                            className="flex items-center gap-2 px-4 py-2 bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-colors"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Purchase
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-background-alt">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Experience the Future</h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of developers and gamers exploring the innovations from Phantom Illusions Studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-light text-white font-semibold transition-colors"
              >
                Browse Tech Catalog
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Phantom Illusions Studio</h3>
              <p className="text-sm text-gray-400">
                Innovating in AI and gaming technology
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Studio</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/studio" className="hover:text-white">Developer Showcase</Link></li>
                <li><Link href="/studio" className="hover:text-white">Game Store</Link></li>
                <li><Link href="/studio" className="hover:text-white">SmartAI Console</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">TechWorld</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/shop" className="hover:text-white">Shop</Link></li>
                <li><Link href="/account" className="hover:text-white">Account</Link></li>
                <li><Link href="/cart" className="hover:text-white">Cart</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            &copy; 2024 Phantom Illusions Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
