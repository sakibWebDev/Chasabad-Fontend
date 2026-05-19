// app/admin/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { ShoppingCart, Eye, Truck, CheckCircle, XCircle, Clock, Filter, Download, Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order } from '@/types';
import toast from 'react-hot-toast';
import Link from 'next/link';

// Mock Data for development
const MOCK_ORDERS: Order[] = [
  {
    id: "1",
    orderId: "ORD-2024-001",
    user: {
      id: "user1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+8801712345678"
    },
    items: [
      { id: "item1", name: "Product 1", quantity: 2, price: 500 },
      { id: "item2", name: "Product 2", quantity: 1, price: 1200 }
    ],
    total_amount: 2200,
    status: "PENDING",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
    shipping_address: "123 Main Street, Dhaka, Bangladesh",
    payment_method: "bkash",
    payment_status: "pending"
  },
  {
    id: "2",
    orderId: "ORD-2024-002",
    user: {
      id: "user2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+8801876543210"
    },
    items: [
      { id: "item3", name: "Product 3", quantity: 3, price: 800 }
    ],
    total_amount: 2400,
    status: "PROCESSING",
    createdAt: "2024-01-14T15:45:00Z",
    updatedAt: "2024-01-14T16:00:00Z",
    shipping_address: "456 Park Avenue, Chittagong, Bangladesh",
    payment_method: "nagad",
    payment_status: "completed"
  },
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
    payment_status: "pending"
  },
  {
    id: "4",
    orderId: "ORD-2024-004",
    user: {
      id: "user4",
      name: "Sarah Wilson",
      email: "sarah@example.com",
      phone: "+8801712345679"
    },
    items: [
      { id: "item6", name: "Product 6", quantity: 1, price: 4200 }
    ],
    total_amount: 4200,
    status: "DELIVERED",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-12T09:00:00Z",
    shipping_address: "321 Hill View, Rajshahi, Bangladesh",
    payment_method: "bkash",
    payment_status: "completed"
  },
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
    payment_status: "refunded"
  },
  {
    id: "6",
    orderId: "ORD-2024-006",
    user: {
      id: "user6",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+8801912345679"
    },
    items: [
      { id: "item9", name: "Product 9", quantity: 1, price: 1800 },
      { id: "item10", name: "Product 10", quantity: 4, price: 300 }
    ],
    total_amount: 3000,
    status: "PENDING",
    createdAt: "2024-01-16T08:45:00Z",
    updatedAt: "2024-01-16T08:45:00Z",
    shipping_address: "987 Lakefront, Barisal, Bangladesh",
    payment_method: "cash_on_delivery",
    payment_status: "pending"
  },
  {
    id: "7",
    orderId: "ORD-2024-007",
    user: {
      id: "user7",
      name: "David Lee",
      email: "david@example.com",
      phone: "+8801712345680"
    },
    items: [
      { id: "item11", name: "Product 11", quantity: 2, price: 2100 }
    ],
    total_amount: 4200,
    status: "PROCESSING",
    createdAt: "2024-01-17T13:20:00Z",
    updatedAt: "2024-01-17T14:30:00Z",
    shipping_address: "555 New Road, Dhaka, Bangladesh",
    payment_method: "bkash",
    payment_status: "completed"
  },
  {
    id: "8",
    orderId: "ORD-2024-008",
    user: {
      id: "user8",
      name: "Lisa Wang",
      email: "lisa@example.com",
      phone: "+8801876543222"
    },
    items: [
      { id: "item12", name: "Product 12", quantity: 1, price: 5500 }
    ],
    total_amount: 5500,
    status: "DELIVERED",
    createdAt: "2024-01-12T09:00:00Z",
    updatedAt: "2024-01-15T16:45:00Z",
    shipping_address: "777 Lake Drive, Chittagong, Bangladesh",
    payment_method: "nagad",
    payment_status: "completed"
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    // Load mock data
    const loadMockData = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setOrders(MOCK_ORDERS);
      setLoading(false);
      toast.success(`${MOCK_ORDERS.length} orders loaded successfully`);
    };
    
    loadMockData();
  }, []);

  const handleUpdateStatus = async (id: string, status: string) => {
    // Update mock data
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === id ? { ...order, status: status as Order['status'] } : order
      )
    );
    toast.success(`Order status updated to ${status}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Clock className="h-4 w-4" />;
      case 'PROCESSING':
        return <Truck className="h-4 w-4" />;
      case 'SHIPPED':
        return <Truck className="h-4 w-4" />;
      case 'DELIVERED':
        return <CheckCircle className="h-4 w-4" />;
      case 'CANCELLED':
        return <XCircle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'refunded':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Filtering and sorting logic
  const filteredOrders = orders
    .filter(order => {
      if (filterStatus !== 'all' && order.status !== filterStatus) return false;
      if (searchTerm && !order.orderId.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !order.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (dateRange.start && new Date(order.createdAt) < new Date(dateRange.start)) return false;
      if (dateRange.end && new Date(order.createdAt) > new Date(dateRange.end)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortOrder === 'desc' 
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else {
        return sortOrder === 'desc'
          ? b.total_amount - a.total_amount
          : a.total_amount - b.total_amount;
      }
    });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'PENDING').length,
    processing: orders.filter(o => o.status === 'PROCESSING').length,
    shipped: orders.filter(o => o.status === 'SHIPPED').length,
    delivered: orders.filter(o => o.status === 'DELIVERED').length,
    cancelled: orders.filter(o => o.status === 'CANCELLED').length,
    revenue: orders.reduce((sum, order) => sum + order.total_amount, 0),
  };

  const exportToCSV = () => {
    const headers = ['Order ID', 'Customer', 'Email', 'Phone', 'Amount', 'Status', 'Date', 'Payment Method', 'Payment Status', 'Shipping Address'];
    const csvData = filteredOrders.map(order => [
      order.orderId,
      order.user?.name || 'N/A',
      order.user?.email || 'N/A',
      order.user?.phone || 'N/A',
      order.total_amount,
      order.status,
      new Date(order.createdAt).toLocaleDateString(),
      order.payment_method,
      order.payment_status,
      order.shipping_address
    ]);
    
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `orders_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Orders exported successfully');
  };

  const resetFilters = () => {
    setFilterStatus('all');
    setSearchTerm('');
    setDateRange({ start: '', end: '' });
    setSortBy('date');
    setSortOrder('desc');
    setCurrentPage(1);
    toast.success('All filters reset');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Order Management</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Manage all customer orders</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{stats.total}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Processing</p>
              <p className="text-2xl font-bold text-blue-600">{stats.processing}</p>
            </div>
            <Truck className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Shipped</p>
              <p className="text-2xl font-bold text-purple-600">{stats.shipped}</p>
            </div>
            <Truck className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Delivered</p>
              <p className="text-2xl font-bold text-green-600">{stats.delivered}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Cancelled</p>
              <p className="text-2xl font-bold text-red-600">{stats.cancelled}</p>
            </div>
            <XCircle className="h-8 w-8 text-red-600" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Revenue</p>
              <p className="text-2xl font-bold text-purple-600">৳{stats.revenue.toLocaleString()}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by order ID, customer name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            {['all', 'PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                  filterStatus === status
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {status === 'all' ? 'All Orders' : status}
              </button>
            ))}
          </div>

          <button
            onClick={exportToCSV}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>

          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Reset
          </button>
        </div>

        {/* Advanced Filters */}
        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t dark:border-gray-700">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
              className="px-2 py-1 border rounded text-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
              className="px-2 py-1 border rounded text-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Date range:</span>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-2 py-1 border rounded text-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <span>to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-2 py-1 border rounded text-sm dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400 ml-auto">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Order ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Customer</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Payment</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {order.orderId}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {order.user?.name || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {order.user?.email || 'N/A'}
                        </div>
                        <div className="text-xs text-gray-400">
                          {order.user?.phone || 'No phone'}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        ৳{order.total_amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getPaymentStatusBadge(order.payment_status)}`}>
                          {order.payment_status}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {order.payment_method}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                      <div className="text-xs text-gray-400">
                        {new Date(order.createdAt).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/orders/${order.id}`}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <Eye className="h-5 w-5" />
                        </Link>
                        <select
                          value={order.status}
                          onChange={(e) => handleUpdateStatus(order.id, e.target.value)}
                          className="text-sm border rounded-lg px-2 py-1 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="PENDING">Pending</option>
                          <option value="PROCESSING">Processing</option>
                          <option value="SHIPPED">Shipped</option>
                          <option value="DELIVERED">Delivered</option>
                          <option value="CANCELLED">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No orders found</p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredOrders.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t dark:border-gray-700">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="px-3 py-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}