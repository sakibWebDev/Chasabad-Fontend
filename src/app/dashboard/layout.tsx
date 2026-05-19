// app/dashboard/layout.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter }from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Heart, MapPin, User,
  Settings, LogOut, CreditCard, MessageCircle,
  Menu, X, ChevronRight, Loader2, Bell, 
  Sun, Moon, Gift, Award, 
   HelpCircle, Shield, CheckCircle,
   Clock, Star, Wallet, Truck, Package
} from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { logoutUser, fetchCurrentUser } from '@/lib/features/auth/authSlice';
import toast from 'react-hot-toast';


const menuItems = [
  { name: 'ওভারভিউ', href: '/dashboard', icon: LayoutDashboard, badge: null },
  { name: 'আমার অর্ডার', href: '/dashboard/orders', icon: ShoppingBag, badge: '3' },
  { name: 'উইশলিস্ট', href: '/dashboard/wishlist', icon: Heart, badge: null },
  { name: 'ঠিকানা', href: '/dashboard/addresses', icon: MapPin, badge: null },
  { name: 'প্রোফাইল', href: '/dashboard/profile', icon: User, badge: null },
  { name: 'পেমেন্ট মেথড', href: '/dashboard/payment-methods', icon: CreditCard, badge: null },
  { name: 'সেটিংস', href: '/dashboard/settings', icon: Settings, badge: null },
];

const quickActions = [
  { name: 'অর্ডার ট্র্যাক', icon: Truck, href: '/track-order', color: 'blue' },
  { name: 'সাপোর্ট', icon: HelpCircle, href: '/support', color: 'purple' },
  { name: 'অফার', icon: Gift, href: '/offers', color: 'pink' },
  { name: 'রিওয়ার্ডস', icon: Award, href: '/rewards', color: 'amber' },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  
  const notificationRef = useRef<HTMLDivElement>(null);
  
  const { user, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const cartCount = useAppSelector((state) => state.cart?.items?.length || 0);
  const wishlistCount = useAppSelector((state) => state.wishlist?.items?.length || 0);

  // Notifications data
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'অর্ডার ডেলিভারি হয়েছে', message: 'আপনার অর্ডার #ORD-001 সফলভাবে ডেলিভারি হয়েছে', time: '২ মিনিট আগে', read: false, type: 'success' },
    { id: 2, title: 'উইশলিস্ট আপডেট', message: 'আপনার উইশলিস্টের ৩টি পণ্যের দাম কমেছে', time: '১ ঘন্টা আগে', read: false, type: 'info' },
    { id: 3, title: 'বিশেষ অফার', message: 'বীজ কেনাকাটায় ২০% ছাড়', time: '৩ ঘন্টা আগে', read: true, type: 'offer' },
    { id: 4, title: 'রিভিউ দিন', message: 'আপনার শেষ অর্ডারটি রিভিউ দিন এবং পয়েন্ট অর্জন করুন', time: '৫ ঘন্টা আগে', read: true, type: 'reminder' },
  ]);

  // Stats data
  const stats = [
    { label: 'মোট স্পেন্ডিং', value: '৳ ১২,৪৫০', icon: Wallet, change: '+১২%', color: 'emerald' },
    { label: 'লয়ালটি পয়েন্ট', value: '১,২৫০', icon: Award, change: '+৫০', color: 'amber' },
    { label: 'সফল ডেলিভারি', value: '২৪', icon: Package, change: '+৮', color: 'blue' },
    { label: 'এক্টিভ অফার', value: '৩', icon: Gift, change: 'নতুন', color: 'pink' },
  ];

  // Set greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('সুপ্রভাত');
    else if (hour < 18) setGreeting('শুভ অপরাহ্ন');
    else setGreeting('শুভ সন্ধ্যা');
    
    setCurrentTime(new Date().toLocaleTimeString('bn-BD', {
      hour: '2-digit',
      minute: '2-digit'
    }));
  }, []);

  // Dark mode handler
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard-theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dashboard-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dashboard-theme', 'light');
    }
  }, [darkMode]);

  // Hydration fix
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  // Fetch user info
  useEffect(() => {
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);
  
  // Close notification dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('লগআউট সম্পন্ন হয়েছে');
      router.push('/');
    } catch (error) {
      toast.error('লগআউট ব্যর্থ হয়েছে');
    }
  };

  const markNotificationAsRead = (id: number) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
    toast.success('সব নোটিফিকেশন রিড হয়েছে');
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  if (!isHydrated || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center">
          <div className="relative">
            <Loader2 className="h-16 w-16 animate-spin text-emerald-600 mx-auto mb-4" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 bg-emerald-100 dark:bg-emerald-900/50 rounded-full animate-pulse"></div>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">লোড হচ্ছে...</p>
          <p className="text-xs text-gray-400 mt-1">আপনার ড্যাশবোর্ড প্রস্তুত করা হচ্ছে</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Floating Action Button - Mobile */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-40 p-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <Menu className="h-6 w-6" />
      </button>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          fixed lg:sticky top-0 left-0 z-50 h-screen w-80 bg-white dark:bg-gray-800/95 backdrop-blur-sm
          border-r border-gray-200 dark:border-gray-700
          transform transition-all duration-500 ease-in-out overflow-y-auto
          shadow-2xl lg:shadow-none
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex flex-col h-full">
            {/* Logo Area */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
              <div className="flex items-center justify-between">
                <Link href="/dashboard" className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌾</span>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      চাষীভাই
                    </h1>
                    <p className="text-xs text-gray-500">ড্যাশবোর্ড</p>
                  </div>
                </Link>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            {/* User Profile Card */}
            <div className="p-5 border-b border-gray-200 dark:border-gray-700">
              <div className="relative group">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                      <span className="text-white font-bold text-2xl">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 dark:text-white text-lg line-clamp-1">
                      {user?.name || 'Guest User'}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-0.5">
                      <Shield className="h-3 w-3" />
                      {user?.role || 'Customer'}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-full">
                        <Star className="h-3 w-3 fill-emerald-600" />
                        <span>গোল্ড মেম্বার</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Stats Row */}
              <div className="grid grid-cols-3 gap-3 mt-5 pt-3 border-t border-gray-100 dark:border-gray-700">
                {stats.slice(0, 3).map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="text-center group cursor-pointer">
                      <div className="flex justify-center mb-1">
                        <div className={`p-1.5 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20 group-hover:scale-110 transition`}>
                          <Icon className={`h-4 w-4 text-${stat.color}-600`} />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-gray-800 dark:text-white">{stat.value}</p>
                      <p className="text-[10px] text-gray-500">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="flex-1 py-6 px-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                মেনু
              </p>
              <div className="space-y-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                        ${isActive 
                          ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-lg shadow-emerald-500/20' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                        }
                      `}
                    >
                      <Icon className={`h-5 w-5 transition-transform group-hover:scale-110 ${isActive ? 'text-white' : ''}`} />
                      <span className="flex-1 font-medium text-sm">{item.name}</span>
                      {item.badge && (
                        <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-red-500 text-white'}`}>
                          {item.badge}
                        </span>
                      )}
                      {isActive && <ChevronRight className="h-4 w-4" />}
                    </Link>
                  );
                })}
              </div>
              
              {/* Quick Actions */}
              <div className="mt-8">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                  দ্রুত অ্যাকশন
                </p>
                <div className="grid grid-cols-2 gap-2 px-1">
                  {quickActions.map((action) => {
                    const ActionIcon = action.icon;
                    const colorClasses = {
                      blue: 'from-blue-500 to-blue-600',
                      purple: 'from-purple-500 to-purple-600',
                      pink: 'from-pink-500 to-pink-600',
                      amber: 'from-amber-500 to-amber-600',
                    };
                    return (
                      <Link
                        key={action.name}
                        href={action.href}
                        onClick={() => setSidebarOpen(false)}
                        className="group"
                      >
                        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r ${colorClasses[action.color as keyof typeof colorClasses]} text-white hover:shadow-lg transition-all duration-300 hover:scale-105`}>
                          <ActionIcon className="h-3.5 w-3.5" />
                          <span className="text-xs font-medium">{action.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>
            
            {/* Support Section */}
            <div className="m-4 p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/30">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white text-sm">সাপোর্ট সেন্টার</h4>
                  <p className="text-xs text-gray-500">২৪/৭ সহায়তা</p>
                </div>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
                কোনো সমস্যা হলে আমাদের এক্সপার্ট টিম ২৪/৭ আপনার পাশে আছে।
              </p>
              <Link href="/support">
                <button className="w-full py-2 bg-white dark:bg-gray-800 text-emerald-600 rounded-xl text-sm font-medium hover:bg-emerald-50 dark:hover:bg-emerald-900/30 transition border border-emerald-200 dark:border-emerald-800">
                  যোগাযোগ করুন
                </button>
              </Link>
            </div>
            
            {/* Logout Button */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="group flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
              >
                <LogOut className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                <span className="font-medium">লগআউট</span>
              </button>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          {/* Top Header */}
          <header className="sticky top-0 z-30 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-sm">
            <div className="flex items-center justify-between px-6 py-4">
              {/* Left Side - Greeting */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">👋</span>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                      {greeting},
                    </h2>
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      {user?.name?.split(' ')[0] || 'User'}!
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                    <Clock className="h-3 w-3" />
                    {currentTime}
                  </p>
                </div>
              </div>
              
              {/* Right Side - Actions */}
              <div className="flex items-center gap-3">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition relative group"
                >
                  {darkMode ? (
                    <Sun className="h-5 w-5 text-yellow-500" />
                  ) : (
                    <Moon className="h-5 w-5 text-gray-500" />
                  )}
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    {darkMode ? 'লাইট মোড' : 'ডার্ক মোড'}
                  </span>
                </button>
                
                {/* Notifications */}
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition relative group"
                  >
                    <Bell className="h-5 w-5 text-gray-500" />
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                  
                  {/* Notification Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-3 w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-emerald-600" />
                            <h3 className="font-semibold text-gray-800 dark:text-white">নোটিফিকেশন</h3>
                            {unreadCount > 0 && (
                              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                                {unreadCount} নতুন
                              </span>
                            )}
                          </div>
                          {unreadCount > 0 && (
                            <button
                              onClick={markAllAsRead}
                              className="text-xs text-emerald-600 hover:text-emerald-700"
                            >
                              সব রিড করুন
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="max-h-[400px] overflow-y-auto divide-y divide-gray-100 dark:divide-gray-700">
                        {notifications.length === 0 ? (
                          <div className="p-8 text-center">
                            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                            <p className="text-gray-500">কোনো নোটিফিকেশন নেই</p>
                          </div>
                        ) : (
                          notifications.map((notification) => (
                            <div
                              key={notification.id}
                              onClick={() => markNotificationAsRead(notification.id)}
                              className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition cursor-pointer ${
                                !notification.read ? 'bg-emerald-50/50 dark:bg-emerald-900/10' : ''
                              }`}
                            >
                              <div className="flex items-start gap-3">
                                <div className={`p-2 rounded-xl ${
                                  notification.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' :
                                  notification.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30' :
                                  notification.type === 'offer' ? 'bg-pink-100 dark:bg-pink-900/30' :
                                  'bg-amber-100 dark:bg-amber-900/30'
                                }`}>
                                  {notification.type === 'success' && <CheckCircle className="h-4 w-4 text-green-600" />}
                                  {notification.type === 'info' && <Bell className="h-4 w-4 text-blue-600" />}
                                  {notification.type === 'offer' && <Gift className="h-4 w-4 text-pink-600" />}
                                  {notification.type === 'reminder' && <Clock className="h-4 w-4 text-amber-600" />}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-800 dark:text-white">
                                    {notification.title}
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.message}</p>
                                  <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                                </div>
                                {!notification.read && (
                                  <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2"></div>
                                )}
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                      <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
                        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                          সব নোটিফিকেশন দেখুন
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* User Menu Trigger */}
                <Link href="/dashboard/profile">
                  <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition group">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center shadow-md group-hover:scale-105 transition">
                      <span className="text-white font-semibold">
                        {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-800 dark:text-white">
                        {user?.name?.split(' ')[0] || 'User'}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email?.split('@')[0] || 'user'}</p>
                    </div>
                  </button>
                </Link>
              </div>
            </div>
            
            {/* Quick Stats Banner */}
            <div className="px-6 pb-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  const isPositive = stat.change.startsWith('+');
                  return (
                    <div key={idx} className="bg-white dark:bg-gray-800/50 rounded-xl p-3 shadow-sm hover:shadow-md transition">
                      <div className="flex items-center justify-between mb-2">
                        <div className={`p-2 rounded-lg bg-${stat.color}-50 dark:bg-${stat.color}-900/20`}>
                          <Icon className={`h-4 w-4 text-${stat.color}-600`} />
                        </div>
                        <span className={`text-xs font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change}
                        </span>
                      </div>
                      <p className="text-lg font-bold text-gray-800 dark:text-white">{stat.value}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </header>
          
          {/* Page Content */}
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}