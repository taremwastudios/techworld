'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Package, ShoppingCart, Users, DollarSign, Plus, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import { Product, Order } from '@/lib/types';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [ordersRes, productsRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/products'),
      ]);
      const ordersData = await ordersRes.json();
      const productsData = await productsRes.json();
      setOrders(ordersData);
      setProducts(productsData.products);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      if (res.ok) {
        const product = await res.json();
        setProducts([...products, product]);
        setShowAddProduct(false);
        setNewProduct({ name: '', description: '', price: 0, category: '', image: '', stock: 0 });
      }
    } catch (error) {
      console.error('Failed to add product:', error);
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

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  const totalOrders = orders.length;

  return (
    <div className="min-h-screen bg-background-alt">
      <Header />
      
      <main className="pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Orders</p>
                  <p className="text-2xl font-semibold">{totalOrders}</p>
                </div>
                <ShoppingCart className="w-8 h-8 text-secondary" />
              </div>
            </div>
            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Revenue</p>
                  <p className="text-2xl font-semibold">${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <DollarSign className="w-8 h-8 text-success" />
              </div>
            </div>
            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Products</p>
                  <p className="text-2xl font-semibold">{products.length}</p>
                </div>
                <Package className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="bg-white border border-border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Customers</p>
                  <p className="text-2xl font-semibold">2</p>
                </div>
                <Users className="w-8 h-8 text-warning" />
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 border transition-colors ${
                activeTab === 'orders'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-border hover:border-primary'
              }`}
            >
              Orders
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 border transition-colors ${
                activeTab === 'products'
                  ? 'bg-primary text-white border-primary'
                  : 'bg-white border-border hover:border-primary'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => setShowAddProduct(true)}
              className="px-4 py-2 bg-accent hover:bg-accent-hover text-white border border-accent transition-colors flex items-center gap-2 ml-auto"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
          ) : activeTab === 'orders' ? (
            <div className="bg-white border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background-alt">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm">Order ID</th>
                      <th className="text-left p-4 font-semibold text-sm">Customer</th>
                      <th className="text-left p-4 font-semibold text-sm">Items</th>
                      <th className="text-left p-4 font-semibold text-sm">Total</th>
                      <th className="text-left p-4 font-semibold text-sm">Status</th>
                      <th className="text-left p-4 font-semibold text-sm">Date</th>
                      <th className="text-left p-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-text-secondary">
                          No orders found
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr key={order.id} className="border-t border-border hover:bg-background-alt">
                          <td className="p-4 text-sm">#{order.id}</td>
                          <td className="p-4 text-sm">{order.userId}</td>
                          <td className="p-4 text-sm">{order.items.length} items</td>
                          <td className="p-4 text-sm font-medium">${order.total.toFixed(2)}</td>
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
                          <td className="p-4 text-sm text-text-secondary">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="p-4">
                            <button className="p-1 hover:text-accent transition-colors">
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
            <div className="bg-white border border-border">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-background-alt">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm">Product</th>
                      <th className="text-left p-4 font-semibold text-sm">Category</th>
                      <th className="text-left p-4 font-semibold text-sm">Price</th>
                      <th className="text-left p-4 font-semibold text-sm">Stock</th>
                      <th className="text-left p-4 font-semibold text-sm">Rating</th>
                      <th className="text-left p-4 font-semibold text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-t border-border hover:bg-background-alt">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-background-alt">
                              <Image
                                src={product.image}
                                alt={product.name}
                                width={40}
                                height={40}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-medium line-clamp-1">{product.name}</span>
                          </div>
                        </td>
                        <td className="p-4 text-sm">{product.category}</td>
                        <td className="p-4 text-sm font-medium">${product.price.toFixed(2)}</td>
                        <td className="p-4 text-sm">
                          <span className={product.stock < 10 ? 'text-warning' : ''}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4 text-sm">
                          <span className="flex items-center gap-1">
                            {product.rating}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:text-accent transition-colors">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 hover:text-error transition-colors">
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

      {showAddProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-semibold">Add New Product</h2>
              <button
                onClick={() => setShowAddProduct(false)}
                className="p-1 hover:bg-background-alt"
              >
                &times;
              </button>
            </div>
            <form onSubmit={handleAddProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  className="w-full h-10 px-3 border border-border focus:border-accent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  className="w-full h-24 px-3 py-2 border border-border focus:border-accent resize-none"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Price</label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full h-10 px-3 border border-border focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Stock</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full h-10 px-3 border border-border focus:border-accent"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full h-10 px-3 border border-border focus:border-accent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="url"
                    value={newProduct.image}
                    onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                    className="w-full h-10 px-3 border border-border focus:border-accent"
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full h-12 bg-accent hover:bg-accent-hover text-white transition-colors"
              >
                Add Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
