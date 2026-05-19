
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER' | 'EXPERT' | 'RESEARCHER';
  status: 'ACTIVE' | 'BLOCKED' | 'DELETED';
  image?: string;
  address?: string;
  city?: string;
  district?: string;
  division?: string;
  postalCode?: string;
  emailVerified?: boolean;
  needPasswordChange?: boolean;
  createdAt: string;
  updatedAt?: string;
}

export interface Seed {
  id: string;
  seedId: string;
  name: string;
  name_en: string;
  scientific_name: string;
  category: string;
  image: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  market_price: number;
  seed_cost: number;
  season: {
    id: string;
    title: string;
  };
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  user?: User;
  total_amount: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  createdAt: string;
  items: OrderItem[];
}

export interface OrderItem {
  id: string;
  seedId: string;
  seed: Seed;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}