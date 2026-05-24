// types/order.types.ts

export interface OrderItem {
  id: string;
  seedId: string;
  name: string;
  unit_price: number;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: string;
  orderId: string;
  userId: string;
  user?: {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  items: OrderItem[];
  total_amount: number;
  discount: number;
  tax: number;
  shipping_cost: number;
  grand_total: number;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'REFUNDED';
  payment_status: 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';
  payment_method: string;
  shipping_address: string;
  shipping_phone: string;
  tracking_number?: string;
  delivery_date?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderInput {
  items: {
    seedId: string;
    name?: string;
    unit_price: number;
    quantity: number;
    total_price: number;
  }[];
  total_amount: number;
  discount?: number;
  tax?: number;
  shipping_cost?: number;
  grand_total: number;
  payment_method?: string;
  shipping_address: string;
  shipping_phone: string;
  notes?: string;
}

export interface UpdateOrderStatusInput {
  status: Order['status'];
}

export interface UpdatePaymentStatusInput {
  paymentStatus: Order['payment_status'];
}

export interface UpdateTrackingInput {
  trackingNumber: string;
}

export interface OrdersState {
  orders: Order[];
  currentOrder: Order | null;
  stats: {
    totalOrders: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    recentOrders: Order[];
  } | null;
  pagination: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  loading: {
    list: boolean;
    detail: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
    stats: boolean;
  };
  error: {
    list: string | null;
    detail: string | null;
    create: string | null;
    update: string | null;
    delete: string | null;
    stats: string | null;
  };
}