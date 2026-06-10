// app/admin/page.tsx
"use client";

import { useState } from "react";
import {
  Users,
  ShoppingBag,
  DollarSign,
  Package,
  TrendingUp,
  Clock,
  Star,
  ArrowUp,
  ArrowDown,
  Download,
  RefreshCw,
  ChevronRight,
  Plus,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

// Mock user for display
const MOCK_USER = {
  name: "Md. Admin Rahman",
  email: "admin@agriguide.com",
  role: "SUPER_ADMIN",
};

// Mock dashboard statistics
const MOCK_DASHBOARD_STATS = {
  totalUsers: 12543,
  totalOrders: 3421,
  totalRevenue: 125430,
  totalSeeds: 234,
  monthlyGrowth: 23.5,
  pendingOrders: 45,
  averageRating: 4.8,
};

// Mock recent orders
const MOCK_RECENT_ORDERS = [
  {
    id: "ord_1a2b3c4d5e",
    totalAmount: 299.99,
    status: "DELIVERED",
    createdAt: "2024-01-15T10:30:00Z",
    user: { name: "John Doe", email: "john@example.com" }
  },
  {
    id: "ord_2b3c4d5e6f",
    totalAmount: 459.50,
    status: "PENDING",
    createdAt: "2024-01-14T14:20:00Z",
    user: { name: "Jane Smith", email: "jane@example.com" }
  },
  {
    id: "ord_3c4d5e6f7g",
    totalAmount: 149.99,
    status: "PROCESSING",
    createdAt: "2024-01-14T09:15:00Z",
    user: { name: "Md. Rahman", email: "rahman@example.com" }
  },
  {
    id: "ord_4d5e6f7g8h",
    totalAmount: 899.00,
    status: "DELIVERED",
    createdAt: "2024-01-13T16:45:00Z",
    user: { name: "Fatema Begum", email: "fatema@example.com" }
  },
  {
    id: "ord_5e6f7g8h9i",
    totalAmount: 349.99,
    status: "SHIPPED",
    createdAt: "2024-01-13T11:00:00Z",
    user: { name: "Kazi Kamal", email: "kazi@example.com" }
  },
];

// Mock recent users
const MOCK_RECENT_USERS = [
  {
    id: "user_1a2b3c4d",
    name: "Rahim Uddin",
    email: "rahim@example.com",
    status: "ACTIVE",
    image: null,
    createdAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "user_2b3c4d5e",
    name: "Karima Khatun",
    email: "karima@example.com",
    status: "ACTIVE",
    image: null,
    createdAt: "2024-01-14T14:20:00Z"
  },
  {
    id: "user_3c4d5e6f",
    name: "Shahidul Islam",
    email: "shahidul@example.com",
    status: "BLOCKED",
    image: null,
    createdAt: "2024-01-13T09:15:00Z"
  },
  {
    id: "user_4d5e6f7g",
    name: "Nasrin Akter",
    email: "nasrin@example.com",
    status: "ACTIVE",
    image: null,
    createdAt: "2024-01-12T16:45:00Z"
  },
  {
    id: "user_5e6f7g8h",
    name: "Hasan Mahmud",
    email: "hasan@example.com",
    status: "ACTIVE",
    image: null,
    createdAt: "2024-01-11T11:00:00Z"
  },
];

export default function AdminDashboardPage() {
  const [loading, setLoading] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [stats] = useState(MOCK_DASHBOARD_STATS);
  const [recentOrders] = useState(MOCK_RECENT_ORDERS);
  const [recentUsers] = useState(MOCK_RECENT_USERS);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Dashboard refreshed successfully!");
    }, 1000);
  };

  const handleExportReport = () => {
    toast.success("Report exported successfully!");
  };

  const statCards = [
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: `+${stats.monthlyGrowth}%`,
      trend: "up" as const,
      icon: DollarSign,
      color: "from-green-500 to-emerald-600",
    },
    {
      title: "Total Users",
      value: stats.totalUsers.toLocaleString(),
      change: "+12.3%",
      trend: "up" as const,
      icon: Users,
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Total Orders",
      value: stats.totalOrders.toLocaleString(),
      change: "+8.7%",
      trend: "up" as const,
      icon: ShoppingBag,
      color: "from-purple-500 to-pink-600",
    },
    {
      title: "Active Seeds",
      value: stats.totalSeeds.toLocaleString(),
      change: "+5.2%",
      trend: "up" as const,
      icon: Package,
      color: "from-orange-500 to-red-600",
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders.toLocaleString(),
      change: "-8.2%",
      trend: "down" as const,
      icon: Clock,
      color: "from-yellow-500 to-orange-600",
    },
    {
      title: "Average Rating",
      value: stats.averageRating.toFixed(1),
      change: "+0.4",
      trend: "up" as const,
      icon: Star,
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-2xl p-6 text-white">
        <div className="flex justify-between items-start flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              Welcome back, {MOCK_USER.name.split(' ')[0]}! 👋
            </h1>
            <p className="text-green-100">
              Here's what's happening with your platform today.
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleExportReport}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-medium cursor-pointer"
            >
              <option value="7">Last 7 Days</option>
              <option value="30">Last 30 Days</option>
              <option value="90">Last 90 Days</option>
              <option value="365">Last Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-3">
              <div className={`bg-gradient-to-br ${stat.color} p-2 rounded-lg shadow-lg`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
              <div
                className={`flex items-center space-x-1 text-xs font-semibold ${
                  stat.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUp className="h-3 w-3" />
                ) : (
                  <ArrowDown className="h-3 w-3" />
                )}
                <span>{stat.change}</span>
              </div>
            </div>
            <h3 className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.title}</h3>
            <p className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/admin/seeds/create"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg hover:from-green-100 hover:to-emerald-100 transition-all duration-200 group"
          >
            <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
              <Plus className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">Add New Seed</p>
              <p className="text-xs text-gray-500">Add seeds to inventory</p>
            </div>
          </Link>

          <Link
            href="/admin/users/create"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
          >
            <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
              <Users className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">Add New User</p>
              <p className="text-xs text-gray-500">Create user account</p>
            </div>
          </Link>

          <Link
            href="/admin/analytics"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
          >
            <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">View Analytics</p>
              <p className="text-xs text-gray-500">Check performance metrics</p>
            </div>
          </Link>

          <Link
            href="/admin/orders/pending"
            className="flex items-center space-x-3 p-4 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg hover:from-orange-100 hover:to-red-100 transition-all duration-200 group"
          >
            <div className="p-2 bg-orange-500 rounded-lg group-hover:scale-110 transition-transform">
              <Clock className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-800 dark:text-white">Pending Orders</p>
              <p className="text-xs text-gray-500">{stats.pendingOrders} orders to process</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recent Orders
            </h3>
            <Link
              href="/admin/orders"
              className="text-sm text-green-600 hover:text-green-700 flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                <div>
                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                    Order #{order.id.slice(-8)}
                  </p>
                  <p className="text-xs text-gray-500">{order.user.name}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    ${order.totalAmount.toLocaleString()}
                  </p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'DELIVERED' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    order.status === 'PENDING' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                    order.status === 'PROCESSING' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
              New Users
            </h3>
            <Link
              href="/admin/users"
              className="text-sm text-green-600 hover:text-green-700 flex items-center"
            >
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold shadow-md">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-gray-400">
                      Joined {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  user.status === 'ACTIVE' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {user.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="flex justify-center">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Stats</span>
        </button>
      </div>
    </div>
  );
}