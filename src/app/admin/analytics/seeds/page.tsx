// app/admin/analytics/seeds/page.tsx
'use client';

import { useState } from 'react';
import {
  Package,
  Leaf,
  Sprout,
  Flower,
  Apple,
  Wheat,
  TrendingUp,
  TrendingDown,
  Star,
  Eye,
  Download,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Target,
  Award,
  Zap,
  Clock,
  DollarSign,
  ShoppingCart,
  Filter,
  Search
} from 'lucide-react';
import Link from 'next/link';

export default function SeedPerformancePage() {
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('revenue');

  const seedData = {
    summary: {
      totalSeeds: 234,
      totalSales: 12456,
      totalRevenue: 324567,
      averageRating: 4.7
    },
    topSeeds: [
      { 
        id: 1, 
        name: 'Organic Tomato Seeds', 
        category: 'Vegetables', 
        sales: 1245, 
        revenue: 37350, 
        growth: 15.2,
        rating: 4.8,
        stock: 345,
        trend: 'up',
        icon: Leaf
      },
      { 
        id: 2, 
        name: 'Sweet Basil', 
        category: 'Herbs', 
        sales: 987, 
        revenue: 14805, 
        growth: 22.5,
        rating: 4.9,
        stock: 234,
        trend: 'up',
        icon: Sprout
      },
      { 
        id: 3, 
        name: 'Sunflower Seeds', 
        category: 'Flowers', 
        sales: 876, 
        revenue: 13140, 
        growth: 8.3,
        rating: 4.7,
        stock: 567,
        trend: 'up',
        icon: Flower
      },
      { 
        id: 4, 
        name: 'Mango Seeds', 
        category: 'Fruits', 
        sales: 654, 
        revenue: 19620, 
        growth: -2.1,
        rating: 4.6,
        stock: 123,
        trend: 'down',
        icon: Apple
      },
      { 
        id: 5, 
        name: 'Wheat Seeds', 
        category: 'Grains', 
        sales: 543, 
        revenue: 8145, 
        growth: 5.8,
        rating: 4.5,
        stock: 890,
        trend: 'up',
        icon: Wheat
      }
    ],
    categoryPerformance: [
      { category: 'Vegetables', sales: 3456, revenue: 103680, growth: 12.3, percentage: 36.5, icon: Leaf, color: 'green' },
      { category: 'Herbs', sales: 2345, revenue: 35175, growth: 18.7, percentage: 24.8, icon: Sprout, color: 'emerald' },
      { category: 'Flowers', sales: 1987, revenue: 29805, growth: 9.4, percentage: 21.0, icon: Flower, color: 'pink' },
      { category: 'Fruits', sales: 1543, revenue: 46290, growth: 5.2, percentage: 16.3, icon: Apple, color: 'orange' },
      { category: 'Grains', sales: 1234, revenue: 18510, growth: 3.8, percentage: 13.0, icon: Wheat, color: 'amber' }
    ],
    seasonalTrends: [
      { season: 'Spring', topSeed: 'Tomato', sales: 3456, growth: 25.3, revenue: 103680 },
      { season: 'Summer', topSeed: 'Basil', sales: 2987, growth: 18.9, revenue: 44805 },
      { season: 'Fall', topSeed: 'Wheat', sales: 2345, growth: 12.4, revenue: 35175 },
      { season: 'Winter', topSeed: 'Lettuce', sales: 1876, growth: 8.7, revenue: 28140 }
    ],
    inventoryStatus: {
      healthy: 187,
      lowStock: 23,
      outOfStock: 8,
      comingSoon: 12
    }
  };

  const metrics = [
    { 
      label: 'Total Seeds', 
      value: seedData.summary.totalSeeds.toLocaleString(),
      change: 12.5,
      icon: Package,
      color: 'blue'
    },
    { 
      label: 'Total Sales', 
      value: seedData.summary.totalSales.toLocaleString(),
      change: 15.3,
      icon: ShoppingCart,
      color: 'green'
    },
    { 
      label: 'Total Revenue', 
      value: `$${(seedData.summary.totalRevenue / 1000).toFixed(0)}K`,
      change: 18.7,
      icon: DollarSign,
      color: 'emerald'
    },
    { 
      label: 'Average Rating', 
      value: seedData.summary.averageRating.toFixed(1),
      change: 0.3,
      suffix: '★',
      icon: Star,
      color: 'yellow'
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
                <span className="text-gray-900 dark:text-white">Seed Performance</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Seed Performance
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track your seed products performance and inventory
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search seeds..." 
                  className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">This Year</span>
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
            const colorClasses = {
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600',
              yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600'
            };
            
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{metric.label}</p>
                    <p className="text-2xl font-bold mt-2">
                      {metric.value}
                      {metric.suffix && <span className="text-lg ml-1">{metric.suffix}</span>}
                    </p>
                    <div className="flex items-center gap-1 mt-2">
                      <span className="text-sm text-green-600 flex items-center gap-0.5">
                        <ArrowUpRight className="h-3 w-3" />
                        {metric.change}%
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

        {/* Category Performance */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <h3 className="font-semibold text-lg mb-6">Category Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {seedData.categoryPerformance.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <div key={i} className={`p-4 rounded-xl bg-gradient-to-br from-${cat.color}-50 to-${cat.color}-100 dark:from-${cat.color}-900/20 dark:to-${cat.color}-800/20`}>
                  <div className="flex items-center justify-between mb-3">
                    <Icon className={`h-6 w-6 text-${cat.color}-600`} />
                    <span className={`text-sm font-semibold text-${cat.color}-600`}>+{cat.growth}%</span>
                  </div>
                  <h4 className="font-bold text-lg">{cat.category}</h4>
                  <p className="text-2xl font-bold mt-2">{cat.sales.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">sales</p>
                  <div className="mt-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Market share</span>
                      <span>{cat.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                      <div 
                        className={`bg-${cat.color}-500 rounded-full h-1.5`}
                        style={{ width: `${cat.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top Seeds Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden mb-8">
          <div className="p-6 border-b dark:border-gray-700">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h3 className="font-semibold text-lg">Top Performing Seeds</h3>
                <p className="text-sm text-gray-500 mt-1">Best selling seeds by revenue and sales</p>
              </div>
              <div className="flex gap-2">
                <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800">
                  <option>All Categories</option>
                  <option>Vegetables</option>
                  <option>Herbs</option>
                  <option>Flowers</option>
                </select>
                <select className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 rounded-lg text-sm bg-white dark:bg-gray-800">
                  <option>Sort by Revenue</option>
                  <option>Sort by Sales</option>
                  <option>Sort by Rating</option>
                </select>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                  <th className="px-6 py-3">Seed Name</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Sales</th>
                  <th className="px-6 py-3">Revenue</th>
                  <th className="px-6 py-3">Growth</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {seedData.topSeeds.map((seed, i) => {
                  const Icon = seed.icon;
                  return (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-50 dark:from-emerald-900/30 dark:to-green-800/30 rounded-xl flex items-center justify-center">
                            <Icon className="h-5 w-5 text-emerald-600" />
                          </div>
                          <span className="font-medium">{seed.name}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg text-xs">
                          {seed.category}
                        </span>
                       </td>
                      <td className="px-6 py-4">{seed.sales.toLocaleString()} </td>
                      <td className="px-6 py-4 font-semibold">${seed.revenue.toLocaleString()} </td>
                      <td className="px-6 py-4">
                        <span className={`text-sm ${seed.growth > 0 ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                          {seed.growth > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {Math.abs(seed.growth)}%
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                          <span>{seed.rating}</span>
                        </div>
                       </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-lg text-xs ${
                          seed.stock > 100 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : seed.stock > 50
                            ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {seed.stock} units
                        </span>
                       </td>
                      <td className="px-6 py-4">
                        <button className="text-blue-600 hover:text-blue-700">
                          <Eye className="h-4 w-4" />
                        </button>
                       </td>
                     </tr>
                  );
                })}
              </tbody>
             </table>
          </div>
        </div>

        {/* Seasonal Trends & Inventory */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Seasonal Trends */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-6">Seasonal Trends</h3>
            <div className="space-y-4">
              {seedData.seasonalTrends.map((season, i) => (
                <div key={i} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-lg">{season.season}</h4>
                      <p className="text-sm text-gray-500">Top: {season.topSeed}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-emerald-600">${(season.revenue / 1000).toFixed(0)}K</span>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <ArrowUpRight className="h-3 w-3" />
                        {season.growth}% growth
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Sales volume</span>
                    <span>{season.sales.toLocaleString()} units</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-full h-2"
                      style={{ width: `${(season.sales / 3500) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inventory Status */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-6">Inventory Overview</h3>
            <div className="space-y-6">
              <div className="relative">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Stock Health</span>
                  <span className="text-sm font-semibold">{seedData.inventoryStatus.healthy} products</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <div 
                    className="bg-green-500 rounded-full h-4 transition-all"
                    style={{ width: `${(seedData.inventoryStatus.healthy / 230) * 100}%` }}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Healthy Stock', value: seedData.inventoryStatus.healthy, color: 'green', icon: Package },
                  { label: 'Low Stock', value: seedData.inventoryStatus.lowStock, color: 'yellow', icon: AlertCircle },
                  { label: 'Out of Stock', value: seedData.inventoryStatus.outOfStock, color: 'red', icon: XCircle },
                  { label: 'Coming Soon', value: seedData.inventoryStatus.comingSoon, color: 'blue', icon: Clock }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className={`p-4 bg-${item.color}-50 dark:bg-${item.color}-900/20 rounded-xl`}>
                      <div className="flex items-center justify-between mb-2">
                        <Icon className={`h-5 w-5 text-${item.color}-600`} />
                        <span className={`text-2xl font-bold text-${item.color}-600`}>{item.value}</span>
                      </div>
                      <p className={`text-sm text-${item.color}-700 dark:text-${item.color}-300`}>{item.label}</p>
                    </div>
                  );
                })}
              </div>

              {/* Performance Insights */}
              <div className="mt-6 pt-6 border-t dark:border-gray-700">
                <h4 className="font-semibold mb-3">Quick Insights</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <span className="text-sm">⭐ Highest Rated</span>
                    <span className="font-medium">Sweet Basil (4.9★)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <span className="text-sm">📈 Fastest Growing</span>
                    <span className="font-medium text-green-600">Herbs (+18.7%)</span>
                  </div>
                  <div className="flex items-center justify-between p-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg">
                    <span className="text-sm">💰 Most Profitable</span>
                    <span className="font-medium">Tomato Seeds ($37,350)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Missing icon components
const AlertCircle = () => null;
const XCircle = () => null;