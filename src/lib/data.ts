import { Product, Category, User, Order } from './types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Enterprise Server Rack 42U',
    description: 'Professional-grade server rack with cable management, lockable doors, and ventilation panels. Industry standard 42U capacity.',
    price: 2499.99,
    category: 'Servers',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
    rating: 4.8,
    review_count: 124,
    stock: 15,
    created_at: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Network Switch 48-Port Gigabit',
    description: 'Managed Gigabit switch with 48 ports, 4 SFP+ uplinks, Layer 3 support, and redundant power supply option.',
    price: 899.00,
    category: 'Networking',
    image_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=400&fit=crop',
    rating: 4.6,
    review_count: 89,
    stock: 42,
    created_at: '2024-02-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Enterprise SSD 2TB NVMe',
    description: 'High-performance NVMe SSD with 7GB/s read speeds, 5-year warranty, and enterprise endurance ratings.',
    price: 449.99,
    category: 'Storage',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
    rating: 4.9,
    review_count: 256,
    stock: 150,
    created_at: '2024-01-20T10:00:00Z'
  },
  {
    id: '4',
    name: 'Workstation Pro X9000',
    description: 'Dual-socket workstation with Intel Xeon processors, NVIDIA Quadro graphics, and ECC memory support.',
    price: 5999.00,
    category: 'Workstations',
    image_url: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?w=400&h=400&fit=crop',
    rating: 4.7,
    review_count: 67,
    stock: 8,
    created_at: '2024-02-10T10:00:00Z'
  },
  {
    id: '5',
    name: 'Fiber Channel Adapter 32Gbps',
    description: 'PCIe 3.0 fiber channel host bus adapter with dual ports, low latency, and enterprise reliability.',
    price: 1299.00,
    category: 'Networking',
    image_url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop',
    rating: 4.5,
    review_count: 43,
    stock: 25,
    created_at: '2024-01-25T10:00:00Z'
  },
  {
    id: '6',
    name: 'Uninterruptible Power Supply 3000VA',
    description: 'Online double-conversion UPS with 3000VA capacity, extended runtime, and network management card.',
    price: 1899.00,
    category: 'Power',
    image_url: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?w=400&h=400&fit=crop',
    rating: 4.4,
    review_count: 98,
    stock: 18,
    created_at: '2024-02-05T10:00:00Z'
  },
  {
    id: '7',
    name: 'Enterprise Router Edge X800',
    description: 'High-performance edge router with 10Gbps throughput, VPN support, and advanced security features.',
    price: 3499.00,
    category: 'Networking',
    image_url: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=400&fit=crop',
    rating: 4.6,
    review_count: 54,
    stock: 12,
    created_at: '2024-02-15T10:00:00Z'
  },
  {
    id: '8',
    name: 'Storage Array 100TB Raw',
    description: 'Complete storage array with 100TB raw capacity, redundant controllers, and enterprise-grade reliability.',
    price: 24999.00,
    category: 'Storage',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
    rating: 4.9,
    review_count: 31,
    stock: 4,
    created_at: '2024-01-10T10:00:00Z'
  },
  {
    id: '9',
    name: 'KVM Switch 16-Port',
    description: '16-port KVM switch with IP remote access, USB hub, and audio support for server management.',
    price: 699.00,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=400&fit=crop',
    rating: 4.3,
    review_count: 112,
    stock: 35,
    created_at: '2024-02-20T10:00:00Z'
  },
  {
    id: '10',
    name: 'Rack Cabinet 12U Wall Mount',
    description: 'Wall-mount rack cabinet with 12U capacity, lockable glass door, and cable entry points.',
    price: 549.00,
    category: 'Servers',
    image_url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=400&fit=crop',
    rating: 4.2,
    review_count: 76,
    stock: 28,
    created_at: '2024-01-30T10:00:00Z'
  },
  {
    id: '11',
    name: 'Memory Module 64GB DDR4 ECC',
    description: '64GB DDR4 ECC registered memory module for enterprise servers, 3200MHz with error correction.',
    price: 329.00,
    category: 'Storage',
    image_url: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop',
    rating: 4.8,
    review_count: 189,
    stock: 200,
    created_at: '2024-02-08T10:00:00Z'
  },
  {
    id: '12',
    name: 'Network Cable Cat6A 10ft (Bulk 50)',
    description: 'Cat6A snagless ethernet cables, 10-foot length, available in bulk pack of 50 cables.',
    price: 249.00,
    category: 'Accessories',
    image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    rating: 4.7,
    review_count: 342,
    stock: 500,
    created_at: '2024-01-05T10:00:00Z'
  }
];

export const mockCategories: Category[] = [
  { id: '1', name: 'Servers', count: 2 },
  { id: '2', name: 'Networking', count: 3 },
  { id: '3', name: 'Storage', count: 3 },
  { id: '4', name: 'Workstations', count: 1 },
  { id: '5', name: 'Power', count: 1 },
  { id: '6', name: 'Accessories', count: 2 },
];

export const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'buyer@example.com',
    name: 'John Buyer',
    role: 'buyer',
    addresses: [],
    wishlist: [],
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    addresses: [],
    wishlist: [],
    createdAt: '2024-01-01T00:00:00Z'
  }
];

export const mockOrders: Order[] = [];
