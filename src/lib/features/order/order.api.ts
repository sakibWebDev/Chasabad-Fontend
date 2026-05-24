// services/order.api.ts
import axiosInstance from '@/lib/axios';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const orderApi = {
  // Create order
  createOrder: async (data: any) => {
    const response = await axiosInstance.post('/api/v1/orders/create', data);
    return response.data;
  },

  // Get all orders (Admin)
  getAllOrders: async (page: number = 1, limit: number = 20, status?: string) => {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (status) params.append('status', status);
    
    const response = await axiosInstance.get(`/api/v1/orders/admin/all?${params.toString()}`);
    return response.data;
  },

  // Get user orders
  getUserOrders: async () => {
    const response = await axiosInstance.get('/api/v1/orders/my-orders');
    return response.data;
  },

  // Get order by ID
  getOrderById: async (id: string) => {
    const response = await axiosInstance.get(`/api/v1/orders/${id}`);
    return response.data;
  },

  // Get order by orderId (tracking)
  getOrderByOrderId: async (orderId: string) => {
    const response = await axiosInstance.get(`/api/v1/orders/track/${orderId}`);
    return response.data;
  },

  // Update order status (Admin)
  updateOrderStatus: async (id: string, status: string) => {
    const response = await axiosInstance.put(`/api/v1/orders/admin/${id}/status`, { status });
    return response.data;
  },

  // Update payment status (Admin)
  updatePaymentStatus: async (id: string, paymentStatus: string) => {
    const response = await axiosInstance.put(`/orders/admin/${id}/payment`, { paymentStatus });
    return response.data;
  },

  // Update tracking number (Admin)
  updateTrackingNumber: async (id: string, trackingNumber: string) => {
    const response = await axiosInstance.put(`/api/v1/orders/admin/${id}/tracking`, { trackingNumber });
    return response.data;
  },

  // Cancel order
  cancelOrder: async (id: string) => {
    const response = await axiosInstance.post(`/api/v1/orders/${id}/cancel`);
    return response.data;
  },

  // Delete order (Admin)
  deleteOrder: async (id: string) => {
    const response = await axiosInstance.delete(`/api/v1/orders/admin/${id}`);
    return response.data;
  },

  // Get order statistics (Admin)
  getOrderStats: async () => {
    const response = await axiosInstance.get('/api/v1/orders/admin/stats');
    return response.data;
  },

  // Search orders (Admin)
  searchOrders: async (searchTerm: string) => {
    const response = await axiosInstance.get(`/api/v1/orders/admin/search?q=${searchTerm}`);
    return response.data;
  },

  // Get monthly revenue (Admin)
  getMonthlyRevenue: async (year: number, month: number) => {
    const response = await axiosInstance.get(`/api/v1/orders/admin/revenue/monthly?year=${year}&month=${month}`);
    return response.data;
  },
};