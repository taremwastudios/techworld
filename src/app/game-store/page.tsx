'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Gamepad2, 
  Download, 
  ShoppingCart,
  Box,
  Search,
  Filter,
  Star,
  Users,
  ChevronRight
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';
import { SupabaseGame } from '@/lib/types';

const MOCK_GAMES: SupabaseGame[] = [
  {
    id: '1',
    title: 'Cosmic Warriors RPG',
    description: 'Epic space adventure with stunning graphics and intense combat. Build your fleet and conquer the galaxy.',
    price: 14.99,
    image_url: 'https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&h=600&fit=crop',
    category: 'Gaming',
    version: '1.3.2',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 5420,
    file_size: 1258291,
  },
  {
    id: '2',
    title: 'Speed Racer Legends',
    description: 'High-octane racing game with realistic physics. Customize your cars and race against players worldwide.',
    price: 9.99,
    image_url: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&h=600&fit=crop',
    category: 'Gaming',
    version: '2.0.1',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 3200,
    file_size: 892416,
  },
  {
    id: '3',
    title: 'Dungeon Explorer',
    description: 'Action-packed dungeon crawler with roguelike elements. Explore procedurally generated dungeons.',
    price: 0,
    image_url: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=800&h=600&fit=crop',
    category: 'Gaming',
    version: '1.0.5',
    is_free: true,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 12000,
    file_size: 256000,
  },
  {
    id: '4',
    title: 'Puzzle Master Deluxe',
    description: 'Brain-teasing puzzle collection with over 500 levels. Challenge your mind with innovative puzzles.',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&h=600&fit=crop',
    category: 'Gaming',
    version: '3.1.0',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 8900,
    file_size: 156437,
  },
  {
    id: '5',
    title: 'Battle Arena MOBA',
    description: '5v5 competitive MOBA with unique heroes. Team up and dominate the arena.',
    price: 0,
    image_url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=600&fit=crop',
    category: 'Gaming',
    version: '1.8.0',
    is_free: true,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 25000,
    file_size: 524288,
  },
];

export default function GameStorePage() {
  const [games, setGames] = useState<SupabaseGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState<SupabaseGame | null>(null);

  useEffect(() => {
    fetchGames();
  }, []);

  const fetchGames = async () => {
    try {
      if (!isSupabaseConfigured()) {
        setGames(MOCK_GAMES);
        setSelectedGame(MOCK_GAMES[0]);
        setLoading(false);
        return;
      }
      
      const supabase = createClient();
      const { data } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .eq('category', 'Gaming')
        .order('created_at', { ascending: false });
      
      if (data) {
        setGames(data);
        if (data.length > 0) {
          setSelectedGame(data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch games:', error);
      setGames(MOCK_GAMES);
      setSelectedGame(MOCK_GAMES[0]);
    } finally {
      setLoading(false);
    }
  };

  const filteredGames = games.filter(g => 
    g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-blue-50 to-white py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Gamepad2 className="w-10 h-10 text-accent" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary">Game Store</h1>
            </div>
            <p className="text-lg text-secondary max-w-2xl">
              Explore and download premium games developed by Phantom Illusions Studio.
              From indie gems to innovative experiences.
            </p>
          </div>
        </section>

        {/* Featured Game - Wide Display */}
        {selectedGame && !loading && (
          <section className="bg-primary text-white">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-video bg-primary-light relative overflow-hidden">
                  {selectedGame.image_url ? (
                    <Image
                      src={selectedGame.image_url}
                      alt={selectedGame.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Gamepad2 className="w-24 h-24 text-gray-600" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-accent text-white text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-sm text-gray-400">v{selectedGame.version}</span>
                    <span className="text-sm text-gray-400">|</span>
                    <span className="text-sm text-gray-400 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {selectedGame.download_count} players
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {selectedGame.title}
                  </h2>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {selectedGame.description}
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold">
                      {selectedGame.is_free ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `$${selectedGame.price?.toFixed(2)}`
                      )}
                    </span>
                    {selectedGame.is_free ? (
                      <Link
                        href={`/download/${selectedGame.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-success hover:bg-success/90 text-white font-semibold transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Download Now
                      </Link>
                    ) : (
                      <Link
                        href={`/checkout?game=${selectedGame.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-semibold transition-colors"
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Purchase Now
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Search and Filter */}
        <section className="py-6 bg-blue-50 border-b border-border">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 border border-border text-primary bg-white focus:border-accent"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Filter className="w-4 h-4" />
                <span>{filteredGames.length} games available</span>
              </div>
            </div>
          </div>
        </section>

        {/* Games Grid */}
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-8">All Games</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white border border-border p-4 animate-pulse">
                    <div className="aspect-video bg-border mb-4" />
                    <div className="h-5 bg-border mb-2" />
                    <div className="h-4 bg-border w-2/3" />
                  </div>
                ))}
              </div>
            ) : filteredGames.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredGames.map((game) => (
                  <div 
                    key={game.id} 
                    className="bg-white border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedGame(game)}
                  >
                    <div className="aspect-video bg-blue-50 relative overflow-hidden group">
                      {game.image_url ? (
                        <Image
                          src={game.image_url}
                          alt={game.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Gamepad2 className="w-16 h-16 text-blue-200" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-text-muted">v{game.version}</span>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Users className="w-3 h-3" />
                          <span>{game.download_count}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2 truncate">{game.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-4">
                        {game.description}
                      </p>
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
              <div className="bg-blue-50 border border-blue-100 p-12 text-center">
                <Gamepad2 className="w-16 h-16 text-blue-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">No Games Found</h3>
                <p className="text-text-secondary">Try a different search term or check back later.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-accent text-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Join the Illusions Family</h2>
            <p className="mb-8 opacity-90 max-w-2xl mx-auto">
              Create an account to access your library, make purchases, and download your favorite games anytime, anywhere.
            </p>
            <Link
              href="/account"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-accent font-semibold hover:bg-gray-100 transition-colors"
            >
              Create Free Account
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
