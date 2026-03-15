export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  rating: number;
  review_count: number;
  stock: number;
  created_at: string;
  updated_at?: string;
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

export interface SupabaseGame {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string;
  download_url: string;
  is_free: boolean;
  version: string;
  category: 'AI' | 'Gaming';
  download_count: number;
  file_size?: number;
  file_name?: string;
  storage_path?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SupabaseProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string;
  role: 'buyer' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface SupabasePurchase {
  id: string;
  user_id: string;
  game_id: string;
  product_id: string | null;
  amount: number;
  currency: string;
  stripe_payment_id: string;
  stripe_customer_id: string;
  status: 'pending' | 'completed' | 'refunded' | 'failed';
  created_at: string;
}
