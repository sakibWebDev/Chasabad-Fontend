// app/admin/orders/cancelled/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { XCircle, RefreshCw, Search, ChevronLeft, ChevronRight, ThumbsDown } from 'lucide-react';
import { Order, OrderItem } from '@/types';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getAllOrders,  getOrderStats } from '@/lib/features/order/orderSlice';

export default function CancelledOrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, stats, pagination, loading } = useAppSelector((state) => state.order);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    // Fetch only cancelled orders
    dispatch(getAllOrders({ 
      page: currentPage, 
      limit: itemsPerPage, 
      status: 'CANCELLED' 
    }));
    dispatch(getOrderStats());
  }, [dispatch, currentPage, itemsPerPage]);

  // Filter cancelled orders (in case API returns all orders, though we're filtering by status)
  const cancelledOrders = orders.filter(order => order.status === 'CANCELLED');
  
  // Further filter based on search term
  const filteredOrders = cancelledOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination for filtered results
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleProcessRefund = async (orderId: string) => {
    // Here you would typically call a refund API
    toast.success(`Processing refund for ${orderId}`);
    // After refund, you might want to update the order status or payment status
    // dispatch(updatePaymentStatus({ id: orderId, paymentStatus: 'refunded' }));
  };

  const statsData = {
    total: stats?.cancelledOrders || 0,
    totalRefunded: cancelledOrders.reduce((s, o) => s + o.total_amount, 0),
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Total Cancelled Orders</p>
          <p className="text-3xl font-bold">{statsData.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Amount Refunded</p>
          <p className="text-2xl font-bold">৳{statsData.totalRefunded.toLocaleString()}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cancelled orders by ID or customer name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {loading.list ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {paginatedOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-red-500 hover:shadow-lg transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{order.orderId}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                        CANCELLED
                      </span>
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Customer:</span> {order.user?.name || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Email:</span> {order.user?.email || 'N/A'}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-medium">Phone:</span> {order.user?.phone || 'N/A'}
                    </p>
                    
                    {/* Order Items - Only showing count, no seed names */}
                    <div className="mt-3">
                      <p className="font-medium text-gray-700 mb-2">
                        Items: {order.items.reduce((total, item) => total + item.quantity, 0)} item(s)
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-red-600">
                      ৳{order.total_amount.toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Ordered on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <button 
                      onClick={() => handleProcessRefund(order.orderId)}
                      className="mt-4 px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      <RefreshCw className="h-4 w-4 inline mr-1" />
                      Process Refund
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <ThumbsDown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No cancelled orders found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}