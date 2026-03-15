'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  ShoppingCart, 
  Users, 
  DollarSign, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Loader2, 
  Gamepad2,
  Upload,
  X,
  File,
  FileArchive,
  Smartphone,
  Monitor,
  Cloud,
  Download,
  Search,
  Brain,
  Zap,
  AlertCircle
} from 'lucide-react';
import Header from '@/components/Header';
import { createClient } from '@/lib/supabase';
import { useAuth } from '@/components/AuthProvider';
import { Product, Order, SupabaseGame, SupabaseProfile } from '@/lib/types';

export default function AdminDashboard() {
  const { user: authUser, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('releases');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [games, setGames] = useState<SupabaseGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddGame, setShowAddGame] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profile, setProfile] = useState<SupabaseProfile | null>(null);
  
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    download_url: '',
    is_free: false,
    version: '1.0.0',
    category: 'Gaming' as 'AI' | 'Gaming',
  });

  const [searchQuery, setSearchQuery] = useState('');

   
  const gamesWithAlias: any[] = games;

  useEffect(() => {
    if (authUser !== null) {
      checkAdminAndFetch();
    }
  }, [authUser]);

  const checkAdminAndFetch = async () => {
    if (!authUser) return;
    
    const supabase = createClient();
    const { data: profileData } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authUser.id)
      .single();
    
    if (profileData) {
      setProfile(profileData);
      if (profileData.role === 'admin') {
        fetchData();
      }
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      
      const { data: gamesData } = await supabase
        .from('games')
        .select('*')
        .order('created_at', { ascending: false });
      
      setGames(gamesData || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileSelect = (file: File) => {
    const allowedExtensions = ['.exe', '.zip', '.apk', '.msi', '.dmg', '.app'];
    const maxSize = 5 * 1024 * 1024 * 1024;
    
    const fileName = file.name.toLowerCase();
    const fileExt = fileName.substring(fileName.lastIndexOf('.'));
    
    if (!allowedExtensions.includes(fileExt)) {
      alert(`Invalid file type. Allowed: ${allowedExtensions.join(', ')}`);
      return;
    }
    
    if (file.size > maxSize) {
      alert('File too large. Maximum size is 5GB');
      return;
    }
    
    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const uploadFile = async (): Promise<string | null> => {
    if (!selectedFile) return null;
    
    setUploading(true);
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Upload failed');
      }
      
      setUploadProgress(100);
      const data = await res.json();
      return data.url;
    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Upload failed');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let downloadUrl = newGame.download_url;
    
    if (selectedFile) {
      const uploadedUrl = await uploadFile();
      if (uploadedUrl) {
        downloadUrl = uploadedUrl;
      } else {
        return;
      }
    }
    
    try {
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...newGame,
          download_url: downloadUrl,
          fileName: selectedFile?.name,
          fileSize: selectedFile?.size,
        }),
      });
      
      if (res.ok) {
        const game = await res.json();
        setGames([...games, game]);
        setShowAddGame(false);
        setNewGame({
          title: '',
          description: '',
          price: 0,
          image: '',
          download_url: '',
          is_free: false,
          version: '1.0.0',
          category: 'Gaming',
        });
        setSelectedFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Failed to add game:', error);
    }
  };

  const handleDeleteGame = async (gameId: string) => {
    if (!confirm('Are you sure you want to delete this release?')) return;
    
    try {
      const res = await fetch(`/api/games?id=${gameId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setGames(games.filter(g => g.id !== gameId));
      }
    } catch (error) {
      console.error('Failed to delete game:', error);
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setOrders(orders.map(o => o.id === orderId ? updated : o));
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  const filteredGames = games.filter(game => 
    game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;
  const totalDownloads = games.reduce((sum, g) => sum + g.download_count, 0);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'AI':
        return <Brain className="w-4 h-4" />;
      case 'Gaming':
        return <Gamepad2 className="w-4 h-4" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  const getFileIcon = (url: string) => {
    if (!url) return <File className="w-4 h-4 text-gray-400" />;
    const ext = url.toLowerCase().split('.').pop();
    switch (ext) {
      case 'exe':
        return <Monitor className="w-4 h-4 text-blue-500" />;
      case 'zip':
      case 'rar':
        return <FileArchive className="w-4 h-4 text-yellow-500" />;
      case 'apk':
        return <Smartphone className="w-4 h-4 text-green-500" />;
      default:
        return <File className="w-4 h-4 text-gray-500" />;
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-accent" />
      </div>
    );
  }

  if (!authUser || profile?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-primary">
        <Header />
        <main className="pt-24 pb-12 px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-primary-light border border-border p-8">
              <AlertCircle className="w-16 h-16 text-accent mx-auto mb-4" />
              <h1 className="text-2xl font-bold text-white mb-4">Admin Access Required</h1>
              <p className="text-gray-400 mb-6">
                You must be logged in as an administrator to access this page.
              </p>
              <Link
                href="/account"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent-hover text-white font-medium transition-colors"
              >
                Sign In as Admin
              </Link>
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
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-white">Phantom Illusions Studio</h1>
              <p className="text-gray-400 text-sm">Admin Dashboard</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Logged in as</span>
              <span className="text-white font-medium">{profile?.full_name || authUser.email}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-primary-light border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-white">{totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-primary-light border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-bold text-white">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
            </div>
            <div className="bg-primary-light border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Products</p>
                  <p className="text-2xl font-bold text-white">{products.length}</p>
                </div>
                <Package className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-primary-light border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Releases</p>
                  <p className="text-2xl font-bold text-white">{games.length}</p>
                </div>
                <Gamepad2 className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-primary-light border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Downloads</p>
                  <p className="text-2xl font-bold text-white">{totalDownloads.toLocaleString()}</p>
                </div>
                <Download className="w-8 h-8 text-warning" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6 flex-wrap items-center">
            <button
              onClick={() => setActiveTab('releases')}
              className={`px-4 py-2 border transition-colors ${
                activeTab === 'releases'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-primary-light text-gray-300 border-border hover:border-accent'
              }`}
            >
              Releases
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 border transition-colors ${
                activeTab === 'orders'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-primary-light text-gray-300 border-border hover:border-accent'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 border transition-colors ${
                activeTab === 'products'
                  ? 'bg-accent text-white border-accent'
                  : 'bg-primary-light text-gray-300 border-border hover:border-accent'
              }`}
            >
              Products
            </button>
            
            {activeTab === 'releases' && (
              <div className="flex items-center gap-2 ml-auto">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search releases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-10 pl-9 pr-4 bg-primary-light border border-border text-white text-sm focus:border-accent"
                  />
                </div>
                <button
                  onClick={() => setShowAddGame(true)}
                  className="px-4 py-2 bg-accent hover:bg-accent-hover text-white border border-accent transition-colors flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  New Release
                </button>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : activeTab === 'releases' ? (
            <div className="bg-primary-light border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Title</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Version</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Category</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Price</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Downloads</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">File</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredGames.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400">
                          No releases found
                        </td>
                      </tr>
                    ) : (
                      filteredGames.map((game) => (
                        <tr key={game.id} className="border-t border-border hover:bg-primary transition-colors">
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary shrink-0 relative overflow-hidden">
                                <Image
                                  src={game.image_url}
                                  alt={game.title}
                                  width={40}
                                  height={40}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-white line-clamp-1">{game.title}</p>
                                <p className="text-xs text-gray-500 line-clamp-1 max-w-[200px]">{game.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-sm text-gray-300 font-mono">{game.version}</td>
                          <td className="p-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium border ${
                              game.category === 'AI'
                                ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                              {getCategoryIcon(game.category)}
                              {game.category}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-medium text-white">
                            {game.is_free ? (
                              <span className="text-success">FREE</span>
                            ) : (
                              `$${game.price.toFixed(2)}`
                            )}
                          </td>
                          <td className="p-4 text-sm text-gray-300">
                            {game.download_count.toLocaleString()}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              {getFileIcon(game.downloadUrl)}
                              {game.fileSize && (
                                <span className="text-xs text-gray-500">
                                  {formatFileSize(game.fileSize)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1.5 text-gray-400 hover:text-accent hover:bg-primary transition-colors">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-1.5 text-gray-400 hover:text-accent hover:bg-primary transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDeleteGame(game.id)}
                                className="p-1.5 text-gray-400 hover:text-error hover:bg-primary transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : activeTab === 'orders' ? (
            <div className="bg-primary-light border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Order ID</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Customer</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Items</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Total</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Status</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Date</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-gray-400">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-t border-border hover:bg-primary transition-colors">
                          <td className="p-4 text-sm text-gray-300">#{order.id}</td>
                          <td className="p-4 text-sm text-gray-300">{order.userId}</td>
                          <td className="p-4 text-sm text-gray-300">{order.items.length} items</td>
                          <td className="p-4 text-sm font-medium text-white">${order.total.toFixed(2)}</td>
                          <td className="p-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className={`px-2 py-1 text-xs font-medium border ${
                                order.status === 'delivered'
                                  ? 'bg-success/10 text-success border-success/20'
                                  : order.status === 'shipped'
                                  ? 'bg-accent/10 text-accent border-accent/20'
                                  : order.status === 'processing'
                                  ? 'bg-warning/10 text-warning border-warning/20'
                                  : 'bg-gray-100 text-gray-600 border-gray-200'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                            </select>
                          </td>
                          <td className="p-4 text-sm text-gray-400">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <button className="p-1.5 text-gray-400 hover:text-accent hover:bg-primary transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-primary-light border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-primary border-b border-border">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Product</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Category</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Price</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Stock</th>
                      <th className="text-left p-4 font-semibold text-sm text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t border-border hover:bg-primary transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary shrink-0">
                              <Image
                                src={product.image_url}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium text-white line-clamp-1">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-gray-300">{product.category}</td>
                        <td className="p-4 text-sm font-medium text-white">${product.price.toFixed(2)}</td>
                        <td className="p-4 text-sm text-gray-300">
                          <span className={product.stock < 10 ? 'text-warning' : ''}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-gray-400 hover:text-accent hover:bg-primary transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1.5 text-gray-400 hover:text-error hover:bg-primary transition-colors">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>

      {showAddGame && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
          <div className="bg-primary-light w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">New Release</h2>
              <button
                onClick={() => {
                  setShowAddGame(false);
                  setSelectedFile(null);
                }}
                className="p-1 text-gray-400 hover:text-white hover:bg-primary transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleAddGame} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Release Title</label>
                  <input
                    type="text"
                    value={newGame.title}
                    onChange={(e) => setNewGame({ ...newGame, title: e.target.value })}
                    className="w-full h-10 px-3 bg-primary border border-border text-white focus:border-accent"
                    placeholder="Enter game/app title"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                  <textarea
                    value={newGame.description}
                    onChange={(e) => setNewGame({ ...newGame, description: e.target.value })}
                    className="w-full h-24 px-3 py-2 bg-primary border border-border text-white focus:border-accent resize-none"
                    placeholder="Describe your release..."
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Version</label>
                  <input
                    type="text"
                    value={newGame.version}
                    onChange={(e) => setNewGame({ ...newGame, version: e.target.value })}
                    className="w-full h-10 px-3 bg-primary border border-border text-white focus:border-accent font-mono"
                    placeholder="1.0.0"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setNewGame({ ...newGame, category: 'Gaming' })}
                      className={`flex-1 h-10 border flex items-center justify-center gap-2 transition-colors ${
                        newGame.category === 'Gaming'
                          ? 'bg-blue-500/20 border-blue-500 text-blue-400'
                          : 'bg-primary border-border text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Gamepad2 className="w-4 h-4" />
                      Gaming
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewGame({ ...newGame, category: 'AI' })}
                      className={`flex-1 h-10 border flex items-center justify-center gap-2 transition-colors ${
                        newGame.category === 'AI'
                          ? 'bg-purple-500/20 border-purple-500 text-purple-400'
                          : 'bg-primary border-border text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Brain className="w-4 h-4" />
                      AI
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      step="0.01"
                      value={newGame.price}
                      onChange={(e) => setNewGame({ ...newGame, price: Number(e.target.value) })}
                      className="w-full h-10 px-3 bg-primary border border-border text-white focus:border-accent"
                      disabled={newGame.isFree}
                    />
                    <label className="flex items-center gap-2 cursor-pointer whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={newGame.isFree}
                        onChange={(e) => setNewGame({ ...newGame, isFree: e.target.checked, price: e.target.checked ? 0 : newGame.price })}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-gray-300">Free</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newGame.image}
                    onChange={(e) => setNewGame({ ...newGame, image: e.target.value })}
                    className="w-full h-10 px-3 bg-primary border border-border text-white focus:border-accent"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Upload File</label>
                <div
                  className={`border-2 border-dashed transition-colors ${
                    dragActive 
                      ? 'border-accent bg-accent/10' 
                      : selectedFile 
                        ? 'border-success bg-success/10'
                        : 'border-border hover:border-gray-500'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".exe,.zip,.apk,.msi,.dmg,.app"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                  
                  {selectedFile ? (
                    <div className="p-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getFileIcon(selectedFile.name)}
                        <div>
                          <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                          <p className="text-xs text-gray-400">{formatFileSize(selectedFile.size)}</p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                        className="p-1 text-gray-400 hover:text-error"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full p-8 flex flex-col items-center justify-center gap-3 text-gray-400 hover:text-white transition-colors"
                    >
                      <Upload className="w-10 h-10" />
                      <div className="text-center">
                        <p className="text-sm font-medium">Drag and drop your file here</p>
                        <p className="text-xs text-gray-500 mt-1">or click to browse</p>
                      </div>
                    </button>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Allowed: .exe, .zip, .apk, .msi, .dmg, .app (Max 5GB)
                </p>
              </div>
              
              {uploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-300">Uploading...</span>
                    <span className="text-accent">{uploadProgress}%</span>
                  </div>
                  <div className="h-2 bg-primary border border-border">
                    <div 
                      className="h-full bg-accent transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
              
              <div className="flex gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddGame(false);
                    setSelectedFile(null);
                  }}
                  className="flex-1 h-12 border border-border text-gray-300 hover:bg-primary transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 h-12 bg-accent hover:bg-accent-hover text-white border border-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="w-4 h-4" />
                      Publish Release
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
