// app/admin/orders/processing/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { RefreshCw, Eye, Truck, Search, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Order } from '@/types';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getAllOrders, updateOrderStatus, getOrderStats } from '@/lib/features/order/orderSlice';
import Link from 'next/link';

export default function ProcessingOrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, stats,  loading } = useAppSelector((state) => state.order);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  useEffect(() => {
    // Fetch only processing orders
    dispatch(getAllOrders({ 
      page: currentPage, 
      limit: itemsPerPage, 
      status: 'PROCESSING' 
    }));
    dispatch(getOrderStats());
  }, [dispatch, currentPage, itemsPerPage]);

  // Filter processing orders
  const processingOrders = orders.filter(order => order.status === 'PROCESSING');
  
  // Further filter based on search term
  const filteredOrders = processingOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination for filtered results
  const currentOrders = filteredOrders.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleShipOrder = async (orderId: string) => {
    // First update status to SHIPPED
    const result = await dispatch(updateOrderStatus({ id: orderId, status: 'SHIPPED' }));
    if (updateOrderStatus.fulfilled.match(result)) {
      // Refresh orders after status update
      dispatch(getAllOrders({ 
        page: currentPage, 
        limit: itemsPerPage, 
        status: 'PROCESSING' 
      }));
      toast.success(`Order moved to shipped`);
    }
  };

  const handleUpdateTracking = async (orderId: string) => {
    if (!trackingNumber.trim()) {
      toast.error('Please enter a tracking number');
      return;
    }
    // Here you would dispatch updateTrackingNumber action
    toast.success(`Tracking number ${trackingNumber} added to order`);
    setShowTrackingModal(false);
    setTrackingNumber('');
  };

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order);
    setShowTrackingModal(true);
  };

  const getTotalItems = (order: Order) => {
    return order.items.reduce((total, item) => total + item.quantity, 0);
  };

  const statsData = {
    total: stats?.processingOrders || 0,
    totalValue: processingOrders.reduce((sum, o) => sum + o.total_amount, 0),
    readyToShip: processingOrders.length
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-100 rounded-lg">
            <RefreshCw className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Processing Orders</h1>
            <p className="text-gray-600">Orders being prepared for shipment</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-4 text-white">
          <p className="text-sm opacity-90">Processing Orders</p>
          <p className="text-3xl font-bold">{statsData.total}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Total Value</p>
          <p className="text-2xl font-bold">৳{statsData.totalValue.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-500">Ready to Ship</p>
          <p className="text-2xl font-bold">{statsData.readyToShip}</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by ID or customer name..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{order.orderId}</h3>
                  <p className="text-gray-600 mt-1 font-medium">{order.user?.name || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{order.user?.email || 'N/A'}</p>
                  <p className="text-sm text-gray-500">{order.user?.phone || 'N/A'}</p>
                  
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Total Items:</span> {getTotalItems(order)} item(s)
                    </p>
                  </div>
                  
                  <div className="mt-2">
                    <span className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                      <RefreshCw className="h-3 w-3" />
                      Processing
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">৳{order.total_amount.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Ordered on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Link
                      href={`/admin/orders/${order.id}`}
                      className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors inline-flex items-center gap-1"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Link>
                    <button
                      onClick={() => handleShipOrder(order.id)}
                      className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors inline-flex items-center gap-1"
                    >
                      <Truck className="h-4 w-4" />
                      Ship Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg">
              <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No processing orders found</p>
            </div>
          )}

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
        </div>
      )}

      {/* Tracking Number Modal */}
      {showTrackingModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-bold">Add Tracking Number</h2>
              <button 
                onClick={() => setShowTrackingModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order ID: {selectedOrder.orderId}
                </label>
                <input
                  type="text"
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => handleUpdateTracking(selectedOrder.id)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Tracking Number
                </button>
                <button
                  onClick={() => {
                    handleShipOrder(selectedOrder.id);
                    setShowTrackingModal(false);
                  }}
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Ship Without Tracking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}