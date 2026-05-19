// app/dashboard/page.tsx
'use client';

import { useAppSelector } from '@/lib/hooks/useAppSelector';  // পাথ ঠিক করা
import Link from 'next/link';
import {
  ShoppingBag, Heart, Package, Truck, Wallet,
  ChevronRight, Award
} from 'lucide-react';

export default function DashboardOverview() {
  const { user } = useAppSelector((state) => state.auth);
  const cartItems = useAppSelector((state) => state.cart?.items || []);
  const wishlistItems = useAppSelector((state) => state.wishlist?.items || []);
  
  const recentOrders = [
    { id: 'ORD-001', date: '১৫ ডিসেম্বর, ২০২৪', total: 730, status: 'ডেলিভারি হয়েছে', items: 3 },
    { id: 'ORD-002', date: '১০ ডিসেম্বর, ২০২৪', total: 450, status: 'প্রসেসিং', items: 2 },
    { id: 'ORD-003', date: '০৫ ডিসেম্বর, ২০২৪', total: 1250, status: 'শিপিং হয়েছে', items: 5 },
  ];
  
  const stats = [
    { label: 'মোট অর্ডার', value: '১২', icon: ShoppingBag, color: 'bg-blue-500' },
    { label: 'উইশলিস্ট', value: wishlistItems.length.toString(), icon: Heart, color: 'bg-pink-500' },
    { label: 'ডেলিভারি সম্পন্ন', value: '৮', icon: Truck, color: 'bg-green-500' },
    { label: 'টাকা সাশ্রয়', value: '৳১,২৫০', icon: Wallet, color: 'bg-purple-500' },
  ];
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
          স্বাগতম, {user?.name?.split(' ')[0] || 'বন্ধু'}!
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          আপনার ড্যাশবোর্ডে সব তথ্য এক জায়গায়
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 ${stat.color} bg-opacity-10 rounded-xl`}>
                  <Icon className={`h-5 w-5 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
                <span className="text-2xl font-bold text-gray-800 dark:text-white">{stat.value}</span>
              </div>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          );
        })}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              সাম্প্রতিক অর্ডার
            </h2>
            <Link href="/dashboard/orders" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
              সব দেখুন <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <p className="font-medium text-gray-800 dark:text-white">{order.id}</p>
                  <p className="text-xs text-gray-500">{order.date}</p>
                </div>
                <div>
                  <p className="font-semibold text-emerald-600">৳{order.total}</p>
                  <p className="text-xs text-gray-500">{order.items}টি পণ্য</p>
                </div>
                <div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === 'ডেলিভারি হয়েছে' 
                      ? 'bg-green-100 text-green-700'
                      : order.status === 'শিপিং হয়েছে'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-emerald-600" />
              কার্ট সামারি
            </h2>
            <p className="text-2xl font-bold text-gray-800">{cartItems.length}টি আইটেম</p>
            <Link href="/cart">
              <button className="mt-3 w-full py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                কার্ট দেখুন
              </button>
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-500" />
              উইশলিস্ট
            </h2>
            <p className="text-2xl font-bold text-gray-800">{wishlistItems.length}টি পণ্য</p>
            <Link href="/dashboard/wishlist">
              <button className="mt-3 w-full py-2 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition">
                উইশলিস্ট দেখুন
              </button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-2">
              <Award className="h-6 w-6" />
              <h3 className="font-semibold">লয়ালটি পয়েন্ট</h3>
            </div>
            <p className="text-3xl font-bold">১,২৫০</p>
            <p className="text-sm opacity-90 mt-1">পরবর্তী পুরস্কার পেতে আরো ২৫০ পয়েন্ট দরকার</p>
            <button className="mt-3 text-sm bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition">
              বিস্তারিত
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}