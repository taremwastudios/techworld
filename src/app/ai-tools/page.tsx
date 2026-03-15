'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, 
  Brain, 
  Download, 
  ShoppingCart,
  Box,
  ChevronRight,
  Star,
  Users,
  Zap,
  Settings,
  Cpu,
  Database,
  Cloud
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient, isSupabaseConfigured } from '@/lib/supabase';
import { SupabaseGame } from '@/lib/types';

const MOCK_AI_TOOLS: SupabaseGame[] = [
  {
    id: '1',
    title: 'SmartAI Console',
    description: 'Advanced AI assistant for productivity and automation. Features natural language processing, code generation, and smart workflows.',
    price: 49.99,
    image_url: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    category: 'AI',
    version: '2.1.0',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 1250,
    file_size: 256901,
  },
  {
    id: '2',
    title: 'Neural Text Processor',
    description: 'AI-powered text analysis and generation tool. Perfect for content creators, researchers, and writers.',
    price: 29.99,
    image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
    category: 'AI',
    version: '1.5.0',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 890,
    file_size: 188743,
  },
  {
    id: '3',
    title: 'DataMind Analytics',
    description: 'Machine learning platform for business intelligence. Analyze trends and predict outcomes with ease.',
    price: 99.99,
    image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    category: 'AI',
    version: '3.0.0',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 560,
    file_size: 545259,
  },
  {
    id: '4',
    title: 'VoiceGen Pro',
    description: 'AI voice generation and cloning tool. Create realistic synthetic voices for any purpose.',
    price: 39.99,
    image_url: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?w=800&h=600&fit=crop',
    category: 'AI',
    version: '1.2.0',
    is_free: false,
    download_url: '#',
    storage_path: '',
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    download_count: 2100,
    file_size: 325058,
  },
];

export default function AIToolsPage() {
  const [tools, setTools] = useState<SupabaseGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTool, setSelectedTool] = useState<SupabaseGame | null>(null);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      if (!isSupabaseConfigured()) {
        setTools(MOCK_AI_TOOLS);
        setSelectedTool(MOCK_AI_TOOLS[0]);
        setLoading(false);
        return;
      }
      
      const supabase = createClient();
      const { data } = await supabase
        .from('games')
        .select('*')
        .eq('is_active', true)
        .eq('category', 'AI')
        .order('created_at', { ascending: false });
      
      if (data) {
        setTools(data);
        if (data.length > 0) {
          setSelectedTool(data[0]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch tools:', error);
      setTools(MOCK_AI_TOOLS);
      setSelectedTool(MOCK_AI_TOOLS[0]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-purple-100 to-cream py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <Brain className="w-10 h-10 text-purple-600" />
              <h1 className="text-3xl md:text-5xl font-bold text-primary">AI Tools</h1>
            </div>
            <p className="text-lg text-secondary max-w-2xl">
              Discover powerful AI solutions from Phantom Illusions Studio. 
              Build, train, and deploy custom AI models with our developer tools.
            </p>
          </div>
        </section>

        {/* Featured Tool - Wide Display */}
        {selectedTool && !loading && (
          <section className="bg-white border-b border-border">
            <div className="max-w-6xl mx-auto px-4 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="aspect-video bg-purple-50 relative overflow-hidden">
                  {selectedTool.image_url ? (
                    <Image
                      src={selectedTool.image_url}
                      alt={selectedTool.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Brain className="w-24 h-24 text-purple-200" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium">
                      Featured
                    </span>
                    <span className="text-sm text-text-muted">v{selectedTool.version}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-primary mb-3">
                    {selectedTool.title}
                  </h2>
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    {selectedTool.description}
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Cpu className="w-4 h-4 text-purple-500" />
                      <span>Neural Processing</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Zap className="w-4 h-4 text-purple-500" />
                      <span>Real-time Inference</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Database className="w-4 h-4 text-purple-500" />
                      <span>Local Storage</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Cloud className="w-4 h-4 text-purple-500" />
                      <span>Cloud Sync</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-primary">
                      {selectedTool.is_free ? (
                        <span className="text-success">FREE</span>
                      ) : (
                        `$${selectedTool.price?.toFixed(2)}`
                      )}
                    </span>
                    {selectedTool.is_free ? (
                      <Link
                        href={`/download/${selectedTool.id}`}
                        className="flex items-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        Download Now
                      </Link>
                    ) : (
                      <Link
                        href={`/checkout?game=${selectedTool.id}`}
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

        {/* Tools Grid */}
        <section className="py-12 md:py-16 bg-cream">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-primary mb-8">All AI Tools</h2>
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3].map(i => (
                  <div key={i} className="bg-white border border-border p-6 animate-pulse">
                    <div className="aspect-video bg-border mb-4" />
                    <div className="h-6 bg-border mb-2" />
                    <div className="h-4 bg-border w-2/3" />
                  </div>
                ))}
              </div>
            ) : tools.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {tools.map((tool) => (
                  <div 
                    key={tool.id} 
                    className="bg-white border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedTool(tool)}
                  >
                    <div className="aspect-video bg-purple-50 relative overflow-hidden">
                      {tool.image_url ? (
                        <Image
                          src={tool.image_url}
                          alt={tool.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Brain className="w-16 h-16 text-purple-200" />
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-purple-600">v{tool.version}</span>
                        <div className="flex items-center gap-1 text-xs text-text-muted">
                          <Users className="w-3 h-3" />
                          <span>{tool.download_count}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-primary mb-2">{tool.title}</h3>
                      <p className="text-sm text-text-secondary line-clamp-3 mb-4">
                        {tool.description}
                      </p>
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
              <div className="bg-white border border-border p-12 text-center">
                <Brain className="w-16 h-16 text-purple-200 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-primary mb-2">No AI Tools Available</h3>
                <p className="text-text-secondary">Check back soon for new AI releases from Phantom Illusions Studio.</p>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 md:py-16 bg-white border-t border-border">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-8 text-primary">AI Development Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-purple-50 border border-purple-100">
                <Cpu className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-primary">SmartAI Console</h3>
                <p className="text-sm text-text-secondary">
                  All-in-one DIY AI development system for researchers and developers.
                </p>
              </div>
              <div className="p-6 bg-purple-50 border border-purple-100">
                <Database className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-primary">Neural Network Processing</h3>
                <p className="text-sm text-text-secondary">
                  High-performance computing for training and deploying ML models.
                </p>
              </div>
              <div className="p-6 bg-purple-50 border border-purple-100">
                <Cloud className="w-10 h-10 text-purple-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-primary">Cloud Integration</h3>
                <p className="text-sm text-text-secondary">
                  Seamless deployment to edge devices and cloud infrastructure.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
