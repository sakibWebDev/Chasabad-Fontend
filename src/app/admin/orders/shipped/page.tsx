// app/admin/orders/shipped/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Truck, Eye, CheckCircle, Search, ChevronLeft, ChevronRight, Package, MapPin, Calendar } from 'lucide-react';
import { Order } from '@/types';
import toast from 'react-hot-toast';

const SHIPPED_ORDERS: Order[] = [
  {
    id: "3",
    orderId: "ORD-2024-003",
    user: {
      id: "user3",
      name: "Mike Johnson",
      email: "mike@example.com",
      phone: "+8801912345678"
    },
    items: [
      { id: "item4", name: "Product 4", quantity: 1, price: 3500 },
      { id: "item5", name: "Product 5", quantity: 2, price: 1500 }
    ],
    total_amount: 6500,
    status: "SHIPPED",
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-14T10:00:00Z",
    shipping_address: "789 Lake Road, Sylhet, Bangladesh",
    payment_method: "cash_on_delivery",
    payment_status: "pending",
    tracking_number: "TRK789456123",
    estimated_delivery: "2024-01-20T00:00:00Z"
  }
];

export default function ShippedOrdersPage() {
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
    setOrders(SHIPPED_ORDERS);
    setLoading(false);
  };

  const handleDeliverOrder = (orderId: string) => {
    toast.success(`Order ${orderId} marked as delivered`);
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Truck className="h-6 w-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Shipped Orders</h1>
            <p className="text-gray-600">Orders on the way to customers</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">In Transit</p>
          <p className="text-3xl font-bold">{orders.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">৳{orders.reduce((s, o) => s + o.total_amount, 0).toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Average Delivery Time</p>
          <p className="text-2xl font-bold">3-5 days</p>
        </div>
      </div>

      {/* Tracking Info Card */}
      {!loading && orders.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          {orders.map((order) => (
            <div key={order.id} className="space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{order.orderId}</h3>
                  <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {order.shipping_address}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Tracking Number</p>
                  <p className="font-mono font-semibold">{order.tracking_number}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5 text-purple-600" />
                    <span className="text-sm">Shipped on {new Date(order.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="text-sm">Est. Delivery: {new Date(order.estimated_delivery || '').toLocaleDateString()}</span>
                  </div>
                  <button
                    onClick={() => handleDeliverOrder(order.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Mark Delivered
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      )}
    </div>
  );
}