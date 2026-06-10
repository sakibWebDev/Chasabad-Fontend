// app/admin/orders/pending/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { 
  Clock, Eye, Truck, XCircle,  Search, 
  ChevronLeft, ChevronRight, AlertCircle, Package, 
  DollarSign, Printer
} from 'lucide-react';
import { Order } from '@/types';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { getAllOrders, updateOrderStatus, getOrderStats } from '@/lib/features/order/orderSlice';

export default function PendingOrdersPage() {
  const dispatch = useAppDispatch();
  const { orders, stats, pagination, loading } = useAppSelector((state) => state.order);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    // Fetch only pending orders
    dispatch(getAllOrders({ 
      page: currentPage, 
      limit: itemsPerPage, 
      status: 'PENDING' 
    }));
    dispatch(getOrderStats());
  }, [dispatch, currentPage, itemsPerPage]);

  // Filter pending orders
  const pendingOrders = orders.filter(order => order.status === 'PENDING');
  
  // Further filter based on search term
  const filteredOrders = pendingOrders.filter(order => 
    order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination for filtered results
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const handleUpdateStatus = async (id: string, status: Order['status']) => {
    const result = await dispatch(updateOrderStatus({ id, status }));
    if (updateOrderStatus.fulfilled.match(result)) {
      // Refresh orders after status update
      dispatch(getAllOrders({ 
        page: currentPage, 
        limit: itemsPerPage, 
        status: 'PENDING' 
      }));
      toast.success(`Order moved to ${status}`);
    }
  };

  const processOrder = (orderId: string) => {
    toast.success(`Order ${orderId} moved to processing`);
  };

  const statsData = {
    total: stats?.pendingOrders || 0,
    totalAmount: pendingOrders.reduce((sum, o) => sum + o.total_amount, 0),
    cod: pendingOrders.filter(o => o.payment_method === 'cash_on_delivery').length,
    online: pendingOrders.filter(o => o.payment_method !== 'cash_on_delivery').length
  };

  // Helper function to get total items count
const getTotalItems = (order: { items: { quantity: number }[] }) => {
  return order.items.reduce((total, item) => total + item.quantity, 0);
};

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-6 w-6 text-yellow-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pending Orders</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Orders waiting for confirmation</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-linear-to-r from-yellow-500 to-yellow-600 rounded-lg p-4 text-white">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm opacity-90">Total Pending</p>
              <p className="text-3xl font-bold mt-1">{statsData.total}</p>
            </div>
            <Clock className="h-8 w-8 opacity-80" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">৳{statsData.totalAmount.toLocaleString()}</p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">COD Orders</p>
              <p className="text-2xl font-bold text-orange-600">{statsData.cod}</p>
            </div>
            <Package className="h-8 w-8 text-orange-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">Online Payment</p>
              <p className="text-2xl font-bold text-blue-600">{statsData.online}</p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Orders Grid */}
      {loading.list ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
        </div>
      ) : (
        <div className="space-y-4">
          {currentOrders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                      {order.orderId}
                    </h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">
                      {order.payment_method || 'N/A'}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-purple-100 text-purple-800">
                      {order.payment_status || 'pending'}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Customer</p>
                      <p className="font-medium text-gray-800 dark:text-white">{order.user?.name || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{order.user?.email || 'N/A'}</p>
                      <p className="text-sm text-gray-500">{order.user?.phone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray-500">{new Date(order.createdAt).toLocaleTimeString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Items Count</p>
                      <p className="font-medium">{getTotalItems(order)} item(s)</p>
                    </div>
                  </div>

                  <div className="border-t pt-3">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Items Summary:
                    </p>
                    <div className="space-y-1">
                      {order.items.slice(0, 2).map((item, idx) => (
                        <p key={idx} className="text-sm text-gray-600">
                          {item.quantity}x ৳{item.unit_price.toLocaleString()}
                        </p>
                      ))}
                      {order.items.length > 2 && (
                        <p className="text-sm text-gray-500">+{order.items.length - 2} more items</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">৳{order.total_amount.toLocaleString()}</p>
                  {order.notes && (
                    <div className="mt-2 flex items-center gap-1 text-sm text-orange-600">
                      <AlertCircle className="h-4 w-4" />
                      <span>Note attached</span>
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order as any);
                        setShowDetailsModal(true);
                      }}
                      className="px-3 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 text-sm"
                    >
                      <Eye className="h-4 w-4 inline mr-1" />
                      Details
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'PROCESSING')}
                      className="px-3 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 text-sm"
                    >
                      <Truck className="h-4 w-4 inline mr-1" />
                      Process
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'CANCELLED')}
                      className="px-3 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 text-sm"
                    >
                      <XCircle className="h-4 w-4 inline mr-1" />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Empty State */}
          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No pending orders found</p>
            </div>
          )}

          {/* Pagination */}
          {filteredOrders.length > 0 && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-gray-500">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="px-3 py-1">Page {currentPage} of {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border rounded-lg disabled:opacity-50"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Order Details</h2>
                <button onClick={() => setShowDetailsModal(false)} className="text-gray-500 hover:text-gray-700">
                  ✕
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-gray-500">Order ID</label>
                    <p className="font-medium">{selectedOrder.orderId}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Status</label>
                    <p className="font-medium text-yellow-600">{selectedOrder.status}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Customer Name</label>
                    <p>{selectedOrder.user?.name}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Contact</label>
                    <p>{selectedOrder.user?.email} | {selectedOrder.user?.phone}</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Items</label>
                    <p>{getTotalItems(selectedOrder)} items</p>
                  </div>
                  <div>
                    <label className="text-sm text-gray-500">Total Amount</label>
                    <p className="font-bold text-green-600">৳{selectedOrder.total_amount.toLocaleString()}</p>
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-500 mb-2 block">Order Items</label>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left">Item</th>
                          <th className="px-4 py-2 text-center">Quantity</th>
                          <th className="px-4 py-2 text-right">Price</th>
                          <th className="px-4 py-2 text-right">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedOrder.items.map((item, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="px-4 py-2">{item.seed.name}</td>
                            <td className="px-4 py-2 text-center">{item.quantity}</td>
                            <td className="px-4 py-2 text-right">৳{item.unit_price.toLocaleString()}</td>
                            <td className="px-4 py-2 text-right">৳{item.total_price.toLocaleString()}</td>
                          </tr>
                        ))}
                        <tr className="border-t bg-gray-50">
                          <td colSpan={3} className="px-4 py-2 text-right font-semibold">Total:</td>
                          <td className="px-4 py-2 text-right font-bold text-green-600">
                            ৳{selectedOrder.total_amount.toLocaleString()}
                           </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      handleUpdateStatus(selectedOrder.id, 'PROCESSING');
                      setShowDetailsModal(false);
                    }}
                    className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                  >
                    Process Order
                  </button>
                  <button
                    onClick={() => {
                      toast.success('Printing invoice...');
                    }}
                    className="flex-1 px-4 py-2 border rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50"
                  >
                    <Printer className="h-4 w-4" />
                    Print Invoice
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}