// app/admin/analytics/users/page.tsx
'use client';

import { useState } from 'react';
import {
  Users,
  UserCheck,
  UserX,
  UserPlus,
  Activity,
  MapPin,
  Smartphone,
  Laptop,
  Tablet,
  Clock,
  Star,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Target,
  Award,
  Zap,
  Eye
} from 'lucide-react';
import Link from 'next/link';

export default function UserAnalyticsPage() {
  const [timeframe, setTimeframe] = useState('6months');

  const userData = {
    summary: {
      totalUsers: 5432,
      previousTotal: 4712,
      newUsers: 845,
      previousNew: 732,
      activeUsers: 4321,
      previousActive: 3890,
      churnRate: 18.5,
      previousChurn: 19.2
    },
    growthData: [
      { month: 'Jan', total: 4123, new: 345, active: 3567 },
      { month: 'Feb', total: 4456, new: 333, active: 3890 },
      { month: 'Mar', total: 4678, new: 222, active: 4012 },
      { month: 'Apr', total: 4987, new: 309, active: 4234 },
      { month: 'May', total: 5234, new: 247, active: 4456 },
      { month: 'Jun', total: 5432, new: 198, active: 4321 }
    ],
    demographics: {
      ageGroups: [
        { group: '18-24', percentage: 15.5 },
        { group: '25-34', percentage: 35.2 },
        { group: '35-44', percentage: 28.3 },
        { group: '45-54', percentage: 12.8 },
        { group: '55+', percentage: 8.2 }
      ],
      locations: [
        { city: 'Dhaka', users: 1845, percentage: 34.0, growth: 12.5 },
        { city: 'Chittagong', users: 1086, percentage: 20.0, growth: 15.3 },
        { city: 'Rajshahi', users: 760, percentage: 14.0, growth: 8.2 },
        { city: 'Khulna', users: 597, percentage: 11.0, growth: 6.8 },
        { city: 'Sylhet', users: 543, percentage: 10.0, growth: 18.7 },
        { city: 'Barisal', users: 326, percentage: 6.0, growth: 4.5 },
        { city: 'Rangpur', users: 275, percentage: 5.0, growth: 9.3 }
      ],
      devices: [
        { device: 'Desktop', percentage: 48.5, icon: Laptop, change: 2.3 },
        { device: 'Mobile', percentage: 42.3, icon: Smartphone, change: 5.8 },
        { device: 'Tablet', percentage: 9.2, icon: Tablet, change: -1.2 }
      ]
    },
    engagement: {
      avgSessionDuration: '4m 32s',
      pagesPerSession: 3.8,
      returnRate: 54.2,
      retentionRate: 68.5,
      lifetimeValue: 142.50
    },
    topUsers: [
      { name: 'John Doe', email: 'john@example.com', orders: 45, spent: 1250, lastActive: '2024-01-15' },
      { name: 'Jane Smith', email: 'jane@example.com', orders: 38, spent: 980, lastActive: '2024-01-14' },
      { name: 'Mike Johnson', email: 'mike@example.com', orders: 32, spent: 875, lastActive: '2024-01-13' }
    ]
  };

  const metrics = [
    { 
      label: 'Total Users', 
      value: userData.summary.totalUsers.toLocaleString(),
      change: ((userData.summary.totalUsers - userData.summary.previousTotal) / userData.summary.previousTotal * 100).toFixed(1),
      icon: Users,
      color: 'purple'
    },
    { 
      label: 'New Users', 
      value: userData.summary.newUsers.toLocaleString(),
      change: ((userData.summary.newUsers - userData.summary.previousNew) / userData.summary.previousNew * 100).toFixed(1),
      icon: UserPlus,
      color: 'green'
    },
    { 
      label: 'Active Users', 
      value: userData.summary.activeUsers.toLocaleString(),
      change: ((userData.summary.activeUsers - userData.summary.previousActive) / userData.summary.previousActive * 100).toFixed(1),
      icon: UserCheck,
      color: 'blue'
    },
    { 
      label: 'Churn Rate', 
      value: `${userData.summary.churnRate}%`,
      change: ((userData.summary.churnRate - userData.summary.previousChurn) / userData.summary.previousChurn * 100).toFixed(1),
      icon: UserX,
      color: 'red',
      inverse: true
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
                <span className="text-gray-900 dark:text-white">User Analytics</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                User Analytics
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Track user growth, engagement, and behavior
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last 6 Months</span>
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
            const isPositive = metric.inverse ? parseFloat(metric.change) < 0 : parseFloat(metric.change) > 0;
            const colorClasses = {
              purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              red: 'bg-red-50 dark:bg-red-900/20 text-red-600'
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
                        {Math.abs(parseFloat(metric.change))}%
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

        {/* User Growth Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold text-lg">User Growth Trend</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg">Total Users</button>
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 rounded-lg">New Users</button>
            </div>
          </div>
          <div className="h-80">
            <div className="flex items-end h-full gap-4">
              {userData.growthData.map((month, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative group w-full">
                    <div className="flex flex-col gap-1">
                      <div 
                        className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-lg transition-all"
                        style={{ height: `${(month.total / 5500) * 100}%` }}
                      />
                      <div 
                        className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-lg transition-all mt-1"
                        style={{ height: `${(month.new / 350) * 100}%` }}
                      />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Total: {month.total} | New: {month.new}
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{month.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Location & Device Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Locations */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-600" />
                Top Locations
              </h3>
              <button className="text-sm text-purple-600 hover:text-purple-700">View All</button>
            </div>
            <div className="space-y-4">
              {userData.demographics.locations.slice(0, 5).map((loc, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <div>
                      <span className="font-medium">{loc.city}</span>
                      <span className="text-gray-500 ml-2">({loc.users.toLocaleString()} users)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{loc.percentage}%</span>
                      <span className={`text-xs ${loc.growth > 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
                        {loc.growth > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {Math.abs(loc.growth)}%
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full h-2 transition-all"
                      style={{ width: `${loc.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Breakdown */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
              <Smartphone className="h-5 w-5 text-blue-600" />
              Device Breakdown
            </h3>
            <div className="space-y-6">
              {userData.demographics.devices.map((device, i) => {
                const Icon = device.icon;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center">
                          <Icon className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{device.device}</p>
                          <p className="text-xs text-gray-500">{device.change > 0 ? '+' : ''}{device.change}% vs last month</p>
                        </div>
                      </div>
                      <span className="text-2xl font-bold">{device.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full h-3 transition-all"
                        style={{ width: `${device.percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Avg. Session Duration', value: userData.engagement.avgSessionDuration, icon: Clock, color: 'orange' },
            { label: 'Pages per Session', value: userData.engagement.pagesPerSession, icon: BarChart3, color: 'blue' },
            { label: 'Return Rate', value: `${userData.engagement.returnRate}%`, icon: UserCheck, color: 'green' },
            { label: 'Customer Lifetime Value', value: `$${userData.engagement.lifetimeValue}`, icon: Award, color: 'purple' }
          ].map((metric, i) => {
            const Icon = metric.icon;
            return (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-${metric.color}-50 dark:bg-${metric.color}-900/20`}>
                    <Icon className={`h-5 w-5 text-${metric.color}-600`} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{metric.label}</p>
                    <p className="text-xl font-bold mt-1">{metric.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Top Users Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
          <div className="p-6 border-b dark:border-gray-700">
            <h3 className="font-semibold text-lg">Top Customers</h3>
            <p className="text-sm text-gray-500 mt-1">Most valuable users by order value</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Orders</th>
                  <th className="px-6 py-3">Total Spent</th>
                  <th className="px-6 py-3">Last Active</th>
                  <th className="px-6 py-3"></th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {userData.topUsers.map((user, i) => (
                  <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                     </td>
                    <td className="px-6 py-4">{user.orders} </td>
                    <td className="px-6 py-4 font-semibold">${user.spent} </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{user.lastActive} </td>
                    <td className="px-6 py-4">
                      <button className="text-blue-600 hover:text-blue-700">
                        <Eye className="h-4 w-4" />
                      </button>
                     </td>
                   </tr>
                ))}
              </tbody>
             </table>
          </div>
        </div>
      </div>
    </div>
  );
}