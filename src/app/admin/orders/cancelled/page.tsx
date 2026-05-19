// app/admin/orders/cancelled/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { XCircle, RefreshCw, AlertTriangle, Search, ChevronLeft, ChevronRight, Package, ThumbsDown } from 'lucide-react';
import { Order } from '@/types';
import toast from 'react-hot-toast';

const CANCELLED_ORDERS: Order[] = [
  {
    id: "5",
    orderId: "ORD-2024-005",
    user: {
      id: "user5",
      name: "Alex Brown",
      email: "alex@example.com",
      phone: "+8801876543211"
    },
    items: [
      { id: "item7", name: "Product 7", quantity: 2, price: 950 },
      { id: "item8", name: "Product 8", quantity: 1, price: 2800 }
    ],
    total_amount: 4700,
    status: "CANCELLED",
    createdAt: "2024-01-09T11:00:00Z",
    updatedAt: "2024-01-11T15:30:00Z",
    shipping_address: "654 Garden Road, Khulna, Bangladesh",
    payment_method: "nagad",
    payment_status: "refunded",
    cancellation_reason: "Customer requested cancellation"
  }
];

export default function CancelledOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setOrders(CANCELLED_ORDERS);
    setLoading(false);
  };

  const stats = {
    total: orders.length,
    totalRefunded: orders.reduce((s, o) => s + o.total_amount, 0),
    byCustomer: orders.filter(o => o.cancellation_reason?.includes('Customer')).length,
    bySystem: orders.filter(o => o.cancellation_reason?.includes('System')).length
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <XCircle className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Cancelled Orders</h1>
            <p className="text-gray-600">Orders that were cancelled</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Cancelled</p>
          <p className="text-3xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Amount Refunded</p>
          <p className="text-2xl font-bold">৳{stats.totalRefunded.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Customer Requested</p>
          <p className="text-2xl font-bold">{stats.byCustomer}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">System Cancelled</p>
          <p className="text-2xl font-bold">{stats.bySystem}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cancelled orders..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{order.orderId}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                      Refunded
                    </span>
                  </div>
                  <p className="text-gray-700"><span className="font-medium">Customer:</span> {order.user?.name}</p>
                  <p className="text-gray-700"><span className="font-medium">Email:</span> {order.user?.email}</p>
                  <p className="text-gray-700"><span className="font-medium">Phone:</span> {order.user?.phone}</p>
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Cancellation Reason:</span>
                      <span>{order.cancellation_reason || 'Not specified'}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-600">৳{order.total_amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">Cancelled on {new Date(order.updatedAt).toLocaleDateString()}</p>
                  <button className="mt-4 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                    <RefreshCw className="h-4 w-4 inline mr-1" />
                    Process Refund
                  </button>
                </div>
              </div>
            </div>
          ))}

          {orders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <ThumbsDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No cancelled orders</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}