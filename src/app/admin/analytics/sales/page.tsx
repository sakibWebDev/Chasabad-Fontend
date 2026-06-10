// app/admin/analytics/sales/page.tsx
'use client';

import { useState } from 'react';
import {
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Calendar,
  Download,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Users,
  CreditCard,
  Truck,
  Award,
  Clock,
  Eye,
  BarChart3,
  PieChart,
  LineChart,
  Filter
} from 'lucide-react';
import Link from 'next/link';

export default function SalesReportPage() {
  const [dateRange, setDateRange] = useState('monthly');
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  const salesData = {
    summary: {
      totalRevenue: 28452.89,
      previousRevenue: 25289.34,
      totalOrders: 1247,
      previousOrders: 1152,
      averageOrderValue: 22.83,
      previousAOV: 21.95,
      conversionRate: 3.24,
      previousConversion: 3.12
    },
    dailyData: [
      { date: 'Mon', revenue: 3450, orders: 142, aov: 24.30 },
      { date: 'Tue', revenue: 3890, orders: 158, aov: 24.62 },
      { date: 'Wed', revenue: 4234, orders: 176, aov: 24.06 },
      { date: 'Thu', revenue: 4590, orders: 185, aov: 24.81 },
      { date: 'Fri', revenue: 5123, orders: 198, aov: 25.87 },
      { date: 'Sat', revenue: 6789, orders: 245, aov: 27.71 },
      { date: 'Sun', revenue: 7890, orders: 243, aov: 32.47 }
    ],
    topProducts: [
      { id: 1, name: 'Organic Tomato Seeds', sales: 1245, revenue: 37350, growth: 15.2, trend: 'up' },
      { id: 2, name: 'Sweet Basil Seeds', sales: 987, revenue: 14805, growth: 22.5, trend: 'up' },
      { id: 3, name: 'Sunflower Seeds', sales: 876, revenue: 13140, growth: 8.3, trend: 'up' },
      { id: 4, name: 'Mango Seeds', sales: 654, revenue: 19620, growth: -2.1, trend: 'down' },
      { id: 5, name: 'Wheat Seeds', sales: 543, revenue: 8145, growth: 5.8, trend: 'up' }
    ],
    recentOrders: [
      { id: 'ORD-001', customer: 'John Doe', amount: 156.50, status: 'completed', date: '2024-01-15', items: 3 },
      { id: 'ORD-002', customer: 'Jane Smith', amount: 89.99, status: 'completed', date: '2024-01-15', items: 2 },
      { id: 'ORD-003', customer: 'Mike Johnson', amount: 234.50, status: 'pending', date: '2024-01-14', items: 5 },
      { id: 'ORD-004', customer: 'Sarah Wilson', amount: 45.99, status: 'completed', date: '2024-01-14', items: 1 }
    ]
  };

  const metrics = [
    { 
      label: 'Total Revenue', 
      value: `$${salesData.summary.totalRevenue.toLocaleString()}`,
      change: ((salesData.summary.totalRevenue - salesData.summary.previousRevenue) / salesData.summary.previousRevenue * 100).toFixed(1),
      icon: DollarSign,
      color: 'emerald'
    },
    { 
      label: 'Total Orders', 
      value: salesData.summary.totalOrders.toLocaleString(),
      change: ((salesData.summary.totalOrders - salesData.summary.previousOrders) / salesData.summary.previousOrders * 100).toFixed(1),
      icon: ShoppingCart,
      color: 'blue'
    },
    { 
      label: 'Avg. Order Value', 
      value: `$${salesData.summary.averageOrderValue}`,
      change: ((salesData.summary.averageOrderValue - salesData.summary.previousAOV) / salesData.summary.previousAOV * 100).toFixed(1),
      icon: TrendingUp,
      color: 'purple'
    },
    { 
      label: 'Conversion Rate', 
      value: `${salesData.summary.conversionRate}%`,
      change: ((salesData.summary.conversionRate - salesData.summary.previousConversion) / salesData.summary.previousConversion * 100).toFixed(1),
      icon: BarChart3,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin/analytics" className="hover:text-emerald-600">Analytics</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Sales Report</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Sales Report
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your revenue, orders, and sales performance
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last 30 Days</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            const isPositive = parseFloat(metric.change) > 0;
            const colorClasses = {
              emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
            };
            
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                    <p className="text-2xl font-bold mt-2">{metric.value}</p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center gap-0.5`}>
                        {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(parseFloat(metric.change))}%
                      </span>
                      <span className="text-xs text-gray-500">vs last period</span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[metric.color as keyof typeof colorClasses]} group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg">Revenue Overview</h3>
              <div className="flex gap-2">
                <button 
                  onClick={() => setSelectedMetric('revenue')}
                  className={`px-3 py-1 text-sm rounded-lg transition-all ${selectedMetric === 'revenue' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}
                >
                  Revenue
                </button>
                <button 
                  onClick={() => setSelectedMetric('orders')}
                  className={`px-3 py-1 text-sm rounded-lg transition-all ${selectedMetric === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600'}`}
                >
                  Orders
                </button>
              </div>
            </div>
            <div className="h-80">
              <div className="flex items-end h-full gap-3">
                {salesData.dailyData.map((day, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-2">
                    <div className="relative group w-full">
                      <div 
                        className={`w-full rounded-lg transition-all hover:opacity-80 ${selectedMetric === 'revenue' ? 'bg-gradient-to-t from-blue-500 to-blue-400' : 'bg-gradient-to-t from-emerald-500 to-emerald-400'}`}
                        style={{ 
                          height: selectedMetric === 'revenue' 
                            ? `${(day.revenue / 8000) * 100}%` 
                            : `${(day.orders / 250) * 100}%` 
                        }}
                      />
                      {/* Tooltip */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {selectedMetric === 'revenue' ? `$${day.revenue}` : `${day.orders} orders`}
                      </div>
                    </div>
                    <span className="text-xs text-gray-500">{day.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4">Quick Insights</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Best Day</p>
                <p className="text-xl font-bold">Sunday</p>
                <p className="text-2xl font-bold text-blue-600 mt-1">$7,890</p>
                <p className="text-xs text-green-600 mt-1">↑ 32.5% vs average</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Peak Hour</p>
                <p className="text-xl font-bold">10 AM - 12 PM</p>
                <p className="text-2xl font-bold text-purple-600 mt-1">245 orders</p>
                <p className="text-xs text-green-600 mt-1">↑ 18.3% vs average</p>
              </div>
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl">
                <p className="text-sm text-gray-600 dark:text-gray-400">Top Payment Method</p>
                <p className="text-xl font-bold">Credit Card</p>
                <p className="text-2xl font-bold text-emerald-600 mt-1">54.2%</p>
                <p className="text-xs text-gray-500">Mobile payments: 28.3%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="font-semibold text-lg">Top Performing Products</h3>
            <p className="text-sm text-gray-500 mt-1">Best selling seeds by revenue</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Sales</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Growth</th>
                  <th className="px-6 py-3">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {salesData.topProducts.map((product, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl flex items-center justify-center">
                          <Package className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{product.sales.toLocaleString()}</td>
                    <td className="px-6 py-4 font-semibold">${product.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm ${product.growth > 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                        {product.growth > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(product.growth)}%
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${product.trend === 'up' ? 'bg-green-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(Math.abs(product.growth) * 2, 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="font-semibold text-lg">Recent Orders</h3>
            <p className="text-sm text-gray-500 mt-1">Latest transactions</p>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-700">
            {salesData.recentOrders.map((order, i) => (
              <div key={i} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                      <Truck className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="font-medium">{order.id}</p>
                      <p className="text-sm text-gray-500">{order.customer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-semibold">${order.amount}</p>
                      <p className="text-xs text-gray-500">{order.items} items</p>
                    </div>
                    <div>
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                    <button className="text-blue-600 hover:text-blue-700">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}