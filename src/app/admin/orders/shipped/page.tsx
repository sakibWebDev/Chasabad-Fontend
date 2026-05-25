// app/admin/orders/shipped/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Truck, Eye, CheckCircle, Search, ChevronLeft, ChevronRight, Package, MapPin, Calendar } from 'lucide-react';
import { Order } from '@/types';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getAllOrders, updateOrderStatus, getOrderStats } from '@/lib/features/order/orderSlice';
import Link from 'next/link';

export default function ShippedOrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, stats,  loading } = useAppSelector((state) => state.order);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    // Fetch only shipped orders
    dispatch(getAllOrders({ 
      page: currentPage, 
      limit: itemsPerPage, 
      status: 'SHIPPED' 
    }));
    dispatch(getOrderStats());
  }, [dispatch, currentPage, itemsPerPage]);

  // Filter shipped orders
  const shippedOrders = orders.filter(order => order.status === 'SHIPPED');
  
  // Further filter based on search term
  const filteredOrders = shippedOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.tracking_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination for filtered results
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleDeliverOrder = async (orderId: string) => {
    const result = await dispatch(updateOrderStatus({ id: orderId, status: 'DELIVERED' }));
    if (updateOrderStatus.fulfilled.match(result)) {
      // Refresh orders after status update
      dispatch(getAllOrders({ 
        page: currentPage, 
        limit: itemsPerPage, 
        status: 'SHIPPED' 
      }));
      toast.success(`Order marked as delivered`);
    }
  };

  const getTotalItems = (order: Order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  const statsData = {
    total: stats?.shippedOrders || 0,
    totalValue: shippedOrders.reduce((sum, o) => sum + o.total_amount, 0),
    averageDeliveryTime: "3-5 days"
  };

  // Calculate estimated delivery date (7 days from shipped date)
  const getEstimatedDelivery = (shippedDate: string) => {
    const date = new Date(shippedDate);
    date.setDate(date.getDate() + 7);
    return date;
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
          <p className="text-3xl font-bold">{statsData.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">৳{statsData.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Average Delivery Time</p>
          <p className="text-2xl font-bold">{statsData.averageDeliveryTime}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID, customer name, or tracking number..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{order.orderId}</h3>
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                          SHIPPED
                        </span>
                      </div>
                      <p className="text-gray-700 font-medium">{order.user?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{order.user?.email || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{order.user?.phone || 'N/A'}</p>
                      
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Total Items:</span> {getTotalItems(order)} item(s)
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mt-3 text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{order.shipping_address || 'Address not specified'}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">৳{order.total_amount.toLocaleString()}</p>
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">Tracking Number</p>
                        <p className="font-mono font-semibold text-sm">{order.tracking_number || 'Not assigned'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex flex-wrap justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Truck className="h-5 w-5 text-purple-600" />
                          <span className="text-sm">
                            Shipped on {new Date(order.updatedAt || order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5 text-orange-600" />
                          <span className="text-sm">
                            Est. Delivery: {getEstimatedDelivery(order.updatedAt || order.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-1"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </Link>
                        <button
                          onClick={() => handleDeliverOrder(order.id)}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-1"
                        >
                          <CheckCircle className="h-4 w-4" />
                          Mark Delivered
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredOrders.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No shipped orders found</p>
              </div>
            )}
          </div>

          {/* Pagination */}
          {filteredOrders.length > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
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