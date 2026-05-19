// app/admin/analytics/page.tsx
'use client';

import { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Package,
  DollarSign,
  ShoppingCart,
  Activity,
  Target,
  Calendar,
  Download,
  ChevronDown,
  MoreVertical,
  Eye,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MapPin,
  Smartphone,
  Laptop,
  Tablet,
  Leaf,
  Sprout,
  Flower,
  Apple,
  Wheat,
  TrendingDown,
  UserCheck,
  UserX,
  Award,
  Zap,
  PieChart,
  LineChart,
  AreaChart
} from 'lucide-react';
import Link from 'next/link';

// Mock Data
const analyticsData = {
  overview: {
    metrics: {
      totalRevenue: { value: 28452.89, change: 12.5, prefix: '$' },
      totalOrders: { value: 1247, change: 8.2 },
      totalUsers: { value: 5432, change: 15.3 },
      conversionRate: { value: 3.24, change: -0.8, suffix: '%' }
    },
    chartData: [65, 78, 90, 85, 95, 102, 98, 110, 115, 125, 135, 145]
  },
  sales: {
    revenueData: [12450, 13890, 15234, 14890, 16345, 17890, 16543],
    ordersData: [342, 389, 421, 408, 445, 478, 456],
    topProducts: [
      { name: 'Tomato Seeds', sales: 1245, revenue: 37350, growth: 15 },
      { name: 'Basil Seeds', sales: 987, revenue: 14805, growth: 22 },
      { name: 'Sunflower', sales: 876, revenue: 13140, growth: 8 }
    ]
  },
  users: {
    total: 5432,
    newThisMonth: 845,
    active: 4321,
    growth: [4123, 4456, 4678, 4987, 5234, 5432],
    locations: [
      { city: 'Dhaka', users: 1845, percentage: 34 },
      { city: 'Chittagong', users: 1086, percentage: 20 }
    ]
  },
  seeds: {
    topSelling: [
      { name: 'Organic Tomato Seeds', category: 'Vegetables', sales: 1245, rating: 4.8 },
      { name: 'Sweet Basil', category: 'Herbs', sales: 987, rating: 4.9 },
      { name: 'Sunflower Seeds', category: 'Flowers', sales: 876, rating: 4.7 }
    ],
    categoryPerformance: [
      { category: 'Vegetables', sales: 3456, growth: 12.3 },
      { category: 'Herbs', sales: 2345, growth: 18.7 },
      { category: 'Flowers', sales: 1987, growth: 9.4 }
    ]
  }
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('last30days');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sales', label: 'Sales Report', icon: TrendingUp },
    { id: 'users', label: 'User Analytics', icon: Users },
    { id: 'seeds', label: 'Seed Performance', icon: Package }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your business performance and growth metrics
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
                <span className="text-sm">Export Report</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-1 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 text-sm font-medium transition-all relative ${
                      activeTab === tab.id
                        ? 'text-yellow-600 dark:text-yellow-500'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {tab.label}
                    </div>
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  label: 'Total Revenue', 
                  value: `$${analyticsData.overview.metrics.totalRevenue.value.toLocaleString()}`,
                  change: analyticsData.overview.metrics.totalRevenue.change,
                  icon: DollarSign,
                  color: 'emerald',
                  prefix: '+'
                },
                { 
                  label: 'Total Orders', 
                  value: analyticsData.overview.metrics.totalOrders.value.toLocaleString(),
                  change: analyticsData.overview.metrics.totalOrders.change,
                  icon: ShoppingCart,
                  color: 'blue',
                  prefix: '+'
                },
                { 
                  label: 'Total Users', 
                  value: analyticsData.overview.metrics.totalUsers.value.toLocaleString(),
                  change: analyticsData.overview.metrics.totalUsers.change,
                  icon: Users,
                  color: 'purple',
                  prefix: '+'
                },
                { 
                  label: 'Conversion Rate', 
                  value: `${analyticsData.overview.metrics.conversionRate.value}%`,
                  change: analyticsData.overview.metrics.conversionRate.change,
                  icon: Target,
                  color: 'orange',
                  prefix: '',
                  negative: true
                }
              ].map((metric, idx) => {
                const Icon = metric.icon;
                const isPositive = metric.change > 0;
                const colorClasses = {
                  emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
                  blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
                  purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
                  orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                };
                
                return (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                        <p className="text-2xl font-bold mt-2">{metric.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <span className={`text-sm ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center gap-0.5`}>
                            {isPositive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                            {Math.abs(metric.change)}%
                          </span>
                          <span className="text-xs text-gray-500">vs last period</span>
                        </div>
                      </div>
                      <div className={`p-3 rounded-xl ${colorClasses[metric.color as keyof typeof colorClasses]}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Revenue Overview</h3>
                  <button className="text-sm text-yellow-600 hover:text-yellow-700">View Details</button>
                </div>
                <div className="h-80">
                  <div className="flex items-end h-full gap-2">
                    {analyticsData.overview.chartData.map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-yellow-500 to-yellow-400 rounded-lg transition-all hover:opacity-80"
                          style={{ height: `${(value / 145) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500">{['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Avg. Order Value', value: '$22.83', change: '+4.1%' },
                    { label: 'Bounce Rate', value: '42.3%', change: '-5.2%' },
                    { label: 'Session Duration', value: '4m 32s', change: '+12%' },
                    { label: 'Pages/Session', value: '3.8', change: '+0.4' }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</span>
                      <div className="text-right">
                        <div className="font-semibold">{stat.value}</div>
                        <div className="text-xs text-green-600">{stat.change}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: 'New order #1234', amount: '$156.50', time: '2 minutes ago', status: 'completed' },
                  { action: 'User registered', email: 'john@example.com', time: '15 minutes ago', status: 'success' },
                  { action: 'Product review', product: 'Tomato Seeds', rating: 5, time: '1 hour ago' },
                  { action: 'Stock alert', product: 'Basil Seeds', stock: 'Low', time: '2 hours ago', status: 'warning' }
                ].map((activity, i) => (
                  <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                        <Activity className="h-4 w-4 text-gray-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    {activity.amount && <span className="text-sm font-semibold">{activity.amount}</span>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sales Report Tab */}
        {activeTab === 'sales' && (
          <div className="space-y-6">
            {/* Sales Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Revenue Trend</h3>
                <div className="h-64">
                  <div className="flex items-end h-full gap-3">
                    {analyticsData.sales.revenueData.map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all"
                          style={{ height: `${(value / 18000) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Orders Trend</h3>
                <div className="h-64">
                  <div className="flex items-end h-full gap-3">
                    {analyticsData.sales.ordersData.map((value, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <div 
                          className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-lg transition-all"
                          style={{ height: `${(value / 480) * 100}%` }}
                        />
                        <span className="text-xs text-gray-500">{['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Top Selling Products</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b dark:border-gray-700">
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">Product</th>
                      <th className="pb-3">Sales</th>
                      <th className="pb-3">Revenue</th>
                      <th className="pb-3">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {analyticsData.sales.topProducts.map((product, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-3 font-medium">{product.name}</td>
                        <td className="py-3">{product.sales.toLocaleString()}</td>
                        <td className="py-3">${product.revenue.toLocaleString()}</td>
                        <td className="py-3">
                          <span className="text-green-600 text-sm">+{product.growth}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* User Analytics Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            {/* User Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: 'Total Users', value: analyticsData.users.total.toLocaleString(), icon: Users, color: 'purple' },
                { label: 'New This Month', value: analyticsData.users.newThisMonth.toLocaleString(), icon: UserCheck, color: 'green' },
                { label: 'Active Users', value: analyticsData.users.active.toLocaleString(), icon: Activity, color: 'blue' },
                { label: 'Inactive', value: (analyticsData.users.total - analyticsData.users.active).toLocaleString(), icon: UserX, color: 'red' }
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                        <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* User Growth Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">User Growth</h3>
              <div className="h-80">
                <div className="flex items-end h-full gap-2">
                  {analyticsData.users.growth.map((value, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-gradient-to-t from-purple-500 to-purple-400 rounded-lg transition-all"
                        style={{ height: `${(value / 5500) * 100}%` }}
                      />
                      <span className="text-xs text-gray-500">{['Jan','Feb','Mar','Apr','May','Jun'][i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Location & Device Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Top Locations
                </h3>
                <div className="space-y-3">
                  {analyticsData.users.locations.map((loc, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{loc.city}</span>
                        <span>{loc.users.toLocaleString()} users ({loc.percentage}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 rounded-full h-2 transition-all"
                          style={{ width: `${loc.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Device Breakdown</h3>
                <div className="space-y-4">
                  {[
                    { device: 'Desktop', percentage: 48.5, icon: Laptop },
                    { device: 'Mobile', percentage: 42.3, icon: Smartphone },
                    { device: 'Tablet', percentage: 9.2, icon: Tablet }
                  ].map((device, i) => {
                    const Icon = device.icon;
                    return (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm">{device.device}</span>
                          </div>
                          <span className="text-sm font-semibold">{device.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 rounded-full h-2 transition-all"
                            style={{ width: `${device.percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Seed Performance Tab */}
        {activeTab === 'seeds' && (
          <div className="space-y-6">
            {/* Category Performance */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {analyticsData.seeds.categoryPerformance.map((cat, i) => {
                const icons = { Vegetables: Leaf, Herbs: Sprout, Flowers: Flower };
                const Icon = icons[cat.category as keyof typeof icons] || Package;
                const colors = { Vegetables: 'green', Herbs: 'emerald', Flowers: 'pink' };
                const color = colors[cat.category as keyof typeof colors] || 'gray';
                
                return (
                  <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-${color}-50 dark:bg-${color}-900/20`}>
                        <Icon className={`h-6 w-6 text-${color}-600`} />
                      </div>
                      <span className={`text-sm ${cat.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {cat.growth > 0 ? '+' : ''}{cat.growth}%
                      </span>
                    </div>
                    <h3 className="font-semibold text-lg">{cat.category}</h3>
                    <p className="text-2xl font-bold mt-1">{cat.sales.toLocaleString()} sales</p>
                  </div>
                );
              })}
            </div>

            {/* Top Selling Seeds Table */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
              <h3 className="font-semibold mb-4">Top Performing Seeds</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b dark:border-gray-700">
                    <tr className="text-left text-sm text-gray-500">
                      <th className="pb-3">Seed Name</th>
                      <th className="pb-3">Category</th>
                      <th className="pb-3">Sales</th>
                      <th className="pb-3">Rating</th>
                      <th className="pb-3">Performance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {analyticsData.seeds.topSelling.map((seed, i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                        <td className="py-3 font-medium">{seed.name}</td>
                        <td className="py-3">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                            {seed.category}
                          </span>
                        </td>
                        <td className="py-3">{seed.sales.toLocaleString()}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                            <span>{seed.rating}</span>
                          </div>
                        </td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-emerald-500 rounded-full h-2"
                                style={{ width: `${(seed.sales / 1250) * 100}%` }}
                              />
                            </div>
                            <span className="text-xs text-gray-500">{Math.round((seed.sales / 1250) * 100)}%</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Inventory & Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Inventory Status</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Healthy Stock', value: 187, color: 'green' },
                    { label: 'Low Stock', value: 23, color: 'orange' },
                    { label: 'Out of Stock', value: 8, color: 'red' },
                    { label: 'Coming Soon', value: 12, color: 'blue' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                      <span className="text-sm">{item.label}</span>
                      <span className={`font-semibold text-${item.color}-600`}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <h3 className="font-semibold mb-4">Performance Insights</h3>
                <div className="space-y-4">
                  <div className="p-3 bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 rounded-xl">
                    <p className="text-sm font-medium">Best Selling Category</p>
                    <p className="text-lg font-bold text-yellow-600">Vegetables</p>
                    <p className="text-xs text-gray-500 mt-1">36.5% of total sales</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <p className="text-sm font-medium">Fastest Growing</p>
                    <p className="text-lg font-bold text-emerald-600">Herbs (+18.7%)</p>
                    <p className="text-xs text-gray-500 mt-1">Highest growth rate</p>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <p className="text-sm font-medium">Highest Rated</p>
                    <p className="text-lg font-bold text-purple-600">Sweet Basil (4.9★)</p>
                    <p className="text-xs text-gray-500 mt-1">Based on 234 reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}