export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
  stock: number;
  createdAt: string;
}

export interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'buyer' | 'admin';
  addresses: Address[];
  wishlist: string[];
  createdAt: string;
  password?: string;
}

export interface CartItem {
  productId: string;
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  downloadUrl: string;
  isFree: boolean;
  version: string;
  category: 'AI' | 'Gaming';
  downloadCount: number;
  fileSize?: number;
  fileName?: string;
  createdAt: string;
}
