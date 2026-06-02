// components/Navbar.tsx
'use client';

import { 
  Search, ShoppingCart, Menu, X, User, Shield, Award, Users, 
  LogOut, Heart, Sun, Moon, ChevronDown, Sprout, Trees, Leaf, 
  Tractor, Home, Store, MessageCircle, Phone, Truck, Star,
  Package, Clock, HelpCircle, Info, ChevronRight, Zap
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useState, FormEvent, ChangeEvent, useEffect, useRef, useCallback } from 'react';
import { useAppDispatch } from "@/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/lib/hooks/useAppSelector";
import { fetchCurrentUser , logoutUser, clearError } from "@/lib/features/auth/authSlice";
import Image from 'next/image';
import toast from 'react-hot-toast';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string;
  phone?: string;
  address?: string;
  city?: string;
  status?: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

interface CartState {
  items?: any[];
  totalQuantity?: number;
}

interface WishlistState {
  items?: any[];
  totalItems?: number;
}

interface RootState {
  auth: AuthState;
  cart?: CartState;
  wishlist?: WishlistState;
}

// Role configuration
const ROLE_CONFIG: Record<string, {
  name: string;
  color: string;
  bgLight: string;
  textLight: string;
  bgDark: string;
  textDark: string;
  icon: any;
  badge: string;
  priority: number;
}> = {
  SUPER_ADMIN: {
    name: 'Super Admin',
    color: 'from-purple-600 to-purple-700',
    bgLight: 'bg-purple-50',
    textLight: 'text-purple-700',
    bgDark: 'dark:bg-purple-900/20',
    textDark: 'dark:text-purple-400',
    icon: Shield,
    badge: '👑',
    priority: 1
  },
  ADMIN: {
    name: 'Admin',
    color: 'from-blue-600 to-blue-700',
    bgLight: 'bg-blue-50',
    textLight: 'text-blue-700',
    bgDark: 'dark:bg-blue-900/20',
    textDark: 'dark:text-blue-400',
    icon: Shield,
    badge: '⚡',
    priority: 2
  },
  EXPERT: {
    name: 'Agricultural Expert',
    color: 'from-amber-600 to-amber-700',
    bgLight: 'bg-amber-50',
    textLight: 'text-amber-700',
    bgDark: 'dark:bg-amber-900/20',
    textDark: 'dark:text-amber-400',
    icon: Award,
    badge: '🎓',
    priority: 3
  },
  RESEARCHER: {
    name: 'Researcher',
    color: 'from-indigo-600 to-indigo-700',
    bgLight: 'bg-indigo-50',
    textLight: 'text-indigo-700',
    bgDark: 'dark:bg-indigo-900/20',
    textDark: 'dark:text-indigo-400',
    icon: Users,
    badge: '🔬',
    priority: 4
  },
  FARMER: {
    name: 'Farmer',
    color: 'from-green-600 to-green-700',
    bgLight: 'bg-green-50',
    textLight: 'text-green-700',
    bgDark: 'dark:bg-green-900/20',
    textDark: 'dark:text-green-400',
    icon: Tractor,
    badge: '🚜',
    priority: 5
  },
  default: {
    name: 'User',
    color: 'from-gray-600 to-gray-700',
    bgLight: 'bg-gray-50',
    textLight: 'text-gray-700',
    bgDark: 'dark:bg-gray-700/50',
    textDark: 'dark:text-gray-400',
    icon: User,
    badge: '👤',
    priority: 6
  }
};

const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  // State
  const [search, setSearch] = useState<string>('');
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [showUserMenu, setShowUserMenu] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showCategories, setShowCategories] = useState<boolean>(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSearchSuggestions, setShowSearchSuggestions] = useState<boolean>(false);
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  // Redux state - Corrected selectors
  const { user, loading, isAuthenticated, error } = useAppSelector((state: RootState) => state.auth);
  const cartCount = useAppSelector((state: RootState) => state.cart?.totalQuantity || state.cart?.items?.length || 0);
  const wishlistCount = useAppSelector((state: RootState) => state.wishlist?.totalItems || state.wishlist?.items?.length || 0);

  // Navigation items with icons
  const navigation = [
    { name: 'হোম', href: '/', icon: Home, dropdown: false },
    { name: 'দোকান', href: '/shop', icon: Store, dropdown: true },
    { name: 'বীজ', href: '/shop/seeds', icon: Sprout, dropdown: false },
    { name: 'চারা', href: '/shop/plants', icon: Trees, dropdown: false },
    { name: 'সরঞ্জাম', href: '/shop/tools', icon: Tractor, dropdown: false },
    { name: 'এক্সপার্ট টিপস', href: '/expert-advice', icon: MessageCircle, dropdown: false },
    { name: 'যোগাযোগ', href: '/contact', icon: Phone, dropdown: false },
  ];

  const categories = [
    { name: 'সবজি বীজ', href: '/shop/seeds/vegetables', count: 45, icon: Sprout, color: 'green' },
    { name: 'ফলের বীজ', href: '/shop/seeds/fruits', count: 28, icon: Trees, color: 'orange' },
    { name: 'ফুলের বীজ', href: '/shop/seeds/flowers', count: 32, icon: Sprout, color: 'pink' },
    { name: 'পাতা জাতীয়', href: '/shop/seeds/herbs', count: 19, icon: Leaf, color: 'emerald' },
    { name: 'শস্য বীজ', href: '/shop/seeds/grains', count: 15, icon: Sprout, color: 'amber' },
    { name: 'গাছের বীজ', href: '/shop/seeds/trees', count: 12, icon: Trees, color: 'teal' },
  ];

  const quickLinks = [
    { name: 'ট্র্যাক অর্ডার', href: '/track-order', icon: Truck },
    { name: 'অর্ডার লিস্ট', href: '/orders', icon: Package },
    { name: 'উইশলিস্ট', href: '/wishlist', icon: Heart },
    { name: 'সাপোর্ট', href: '/support', icon: HelpCircle },
    { name: 'অ্যাবাউট', href: '/about', icon: Info },
  ];

  // Popular searches for suggestions
  const popularSearches = [
    'ধান বীজ', 'গম বীজ', 'টমেটো বীজ', 'কাঁচামরিচ বীজ', 
    'বেগুন বীজ', 'পেঁয়াজ বীজ', 'রসুন বীজ', 'নারিকেল চারা'
  ];

  // Hydration fix
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Fetch user on mount - Using correct function name fetchCurrentUser
  useEffect(() => {
    if (isHydrated) {
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, isHydrated]);

  // Show error toast if any
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Scroll handler with throttle
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dark mode handler
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (categoriesRef.current && !categoriesRef.current.contains(event.target as Node)) {
        setShowCategories(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchSuggestions(false);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Search handler with suggestions
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    
    if (value.length > 1) {
      const suggestions = popularSearches.filter(item => 
        item.toLowerCase().includes(value.toLowerCase())
      );
      setSearchSuggestions(suggestions);
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/shop?search=${encodeURIComponent(search)}`);
    setMenuOpen(false);
    setShowSearchSuggestions(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearch(suggestion);
    router.push(`/shop?search=${encodeURIComponent(suggestion)}`);
    setShowSearchSuggestions(false);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      toast.success('সফলভাবে লগআউট হয়েছে');
      router.push("/login");
    } catch (err) {
      toast.error('লগআউট ব্যর্থ হয়েছে');
    }
  };

  // Get role configuration
  const getRoleConfig = (role?: string) => {
    if (!role) return ROLE_CONFIG.default;
    const upperRole = role.toUpperCase();
    return ROLE_CONFIG[upperRole] || ROLE_CONFIG.default;
  };

  const roleConfig = user ? getRoleConfig(user.role) : null;
  const RoleIcon = roleConfig?.icon || User;

  // Get greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'সুপ্রভাত';
    if (hour < 18) return 'শুভ অপরাহ্ন';
    return 'শুভ সন্ধ্যা';
  };

  // Don't render until hydrated
  if (!isHydrated) {
    return (
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-green-600 rounded-xl"></div>
              <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>
            <div className="w-32 h-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white/95 dark:bg-gray-900/95 shadow-lg backdrop-blur-sm' 
        : 'bg-white dark:bg-gray-900 shadow-md'
    }`}>
      
      {/* Top Bar */}
      <div className="hidden sm:block bg-gradient-to-r from-green-700 to-emerald-700 dark:from-green-900 dark:to-emerald-900 text-white text-xs py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1.5">
                <Truck className="h-3.5 w-3.5" />
                <span>১০০০+ টাকায় ফ্রি শিপিং</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-yellow-300" />
                <span>১০০% জৈব বীজ</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-300" />
                <span>৫০,০০০+ সন্তুষ্ট কৃষক</span>
              </span>
            </div>
            <div className="flex items-center gap-5">
              <Link href="/track-order" className="hover:text-green-200 transition flex items-center gap-1">
                <Clock className="h-3 w-3" />
                অর্ডার ট্র্যাক
              </Link>
              <Link href="/help" className="hover:text-green-200 transition flex items-center gap-1">
                <HelpCircle className="h-3 w-3" />
                সাহায্য
              </Link>
              <button 
                onClick={() => setDarkMode(!darkMode)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 lg:py-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group flex-shrink-0">
            <div className="w-9 h-9 lg:w-10 lg:h-10 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Sprout className="h-5 w-5 lg:h-6 lg:w-6 text-white" />
            </div>
            <div className="hidden xs:block">
              <div className="relative flex items-end">
                <span className="text-green-600 dark:text-green-500 font-bold text-lg lg:text-xl">চাষী</span>
                <span className="font-bold text-gray-800 dark:text-white text-lg lg:text-xl">ভাই</span>
                <span className="text-green-600 dark:text-green-500 text-2xl lg:text-3xl ml-0.5">.</span>
                <span className="absolute -top-2 -right-8 lg:-right-10">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[8px] lg:text-[10px] px-1.5 lg:px-2 py-0.5 rounded-full font-bold shadow-md">
                    PLUS
                  </span>
                </span>
              </div>
              <p className="text-[10px] lg:text-xs font-medium text-green-600 dark:text-green-500 mt-0.5">
                কৃষকের বিশ্বস্ত সঙ্গী
              </p>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-xl mx-6" ref={searchRef}>
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                placeholder="বীজ, চারা, সরঞ্জাম সার্চ করুন..."
                value={search}
                onChange={handleSearchChange}
                onFocus={() => search.length > 1 && setShowSearchSuggestions(true)}
                className="w-full pl-12 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-800 dark:text-white text-sm"
                aria-label="Search products"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {/* Search Suggestions */}
              {showSearchSuggestions && searchSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 z-50 overflow-hidden">
                  <div className="p-2">
                    <p className="text-xs text-gray-500 px-3 py-1">সাজেশন:</p>
                    {searchSuggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition flex items-center gap-2"
                      >
                        <Search className="h-3 w-3 text-gray-400" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-2 lg:gap-4">
            
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition hidden sm:block">
              <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center px-1">
                  {wishlistCount > 99 ? '99+' : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition">
              <ShoppingCart className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 text-[10px] font-bold text-white bg-green-600 rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </Link>

            {/* Auth Section */}
            {loading ? (
              <div className="w-24 h-9 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse hidden sm:block"></div>
            ) : isAuthenticated && user ? (
              <div className="relative hidden sm:block" ref={userMenuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition border border-gray-200 dark:border-gray-700"
                  aria-label="User menu"
                >
                  <div className="relative">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={28}
                        height={28}
                        className="w-7 h-7 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center ${roleConfig?.bgLight} ${roleConfig?.textLight} ${roleConfig?.bgDark} ${roleConfig?.textDark}`}>
                        <RoleIcon className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <span className="absolute -bottom-0.5 -right-0.5 text-xs">
                      {roleConfig?.badge}
                    </span>
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-xs font-semibold text-gray-800 dark:text-white">
                      {user.name?.split(' ')[0] || user.name}
                    </p>
                    <p className={`text-[10px] font-medium ${roleConfig?.textLight} ${roleConfig?.textDark}`}>
                      {roleConfig?.name}
                    </p>
                  </div>
                  <ChevronDown className="h-3 w-3 text-gray-400 hidden lg:block" />
                </button>

                {/* User Dropdown Menu */}
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
                    {/* User Header */}
                    <div className={`p-4 ${roleConfig?.bgLight} ${roleConfig?.bgDark} border-b border-gray-100 dark:border-gray-700`}>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          {user.image ? (
                            <Image
                              src={user.image}
                              alt={user.name}
                              width={48}
                              height={48}
                              className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-gray-800"
                            />
                          ) : (
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${roleConfig?.bgLight} ${roleConfig?.textLight}`}>
                              <RoleIcon className="w-6 h-6" />
                            </div>
                          )}
                          <span className="absolute -bottom-1 -right-1 text-lg">
                            {roleConfig?.badge}
                          </span>
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 dark:text-white">{user.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{user.email}</p>
                          <p className={`text-xs font-medium mt-1 inline-block px-2 py-0.5 rounded-full ${roleConfig?.bgLight} ${roleConfig?.textLight}`}>
                            {roleConfig?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-2">
                      <p className="px-4 py-1 text-xs text-gray-400 uppercase tracking-wider">হ্যালো, {getGreeting()}!</p>
                      
                      {(user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
                        <Link
                          href="/admin"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span>Admin Dashboard</span>
                          <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                        </Link>
                      )}
                      {(user.role === 'USER' || user.role === 'USER') && (
                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Shield className="w-4 h-4 text-purple-600" />
                          <span>User Dashboard</span>
                          <ChevronRight className="w-3 h-3 ml-auto text-gray-400" />
                        </Link>
                      )}
                      
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <User className="w-4 h-4 text-blue-600" />
                        <span>My Profile</span>
                      </Link>
                      
                      <Link
                        href="/orders"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package className="w-4 h-4 text-purple-600" />
                        <span>My Orders</span>
                      </Link>
                      
                      <Link
                        href="/wishlist"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Heart className="w-4 h-4 text-pink-600" />
                        <span>Wishlist</span>
                      </Link>
                      
                      <Link
                        href="/support"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <HelpCircle className="w-4 h-4 text-amber-600" />
                        <span>Customer Support</span>
                      </Link>
                      
                      <hr className="my-1 border-gray-100 dark:border-gray-700" />
                      
                      <button
                        onClick={() => {
                          handleLogout();
                          setShowUserMenu(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/login">
                  <button className="px-4 py-1.5 lg:px-5 lg:py-2 text-green-600 border border-green-600 hover:bg-green-50 rounded-full font-medium transition text-sm">
                    লগইন
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="px-4 py-1.5 lg:px-5 lg:py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-full font-medium shadow-md transition text-sm">
                    সাইন আপ
                  </button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMenuOpen(prev => !prev)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              aria-label="Toggle mobile menu"
            >
              {menuOpen ? <X size={22} className="text-gray-700 dark:text-gray-300" /> : <Menu size={22} className="text-gray-700 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-center space-x-1 py-3">
            {/* Categories Dropdown */}
            <div className="relative" ref={categoriesRef}>
              <button
                onClick={() => setShowCategories(!showCategories)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition ${
                  showCategories 
                    ? 'bg-green-600 text-white' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Sprout className="h-4 w-4" />
                <span className="text-sm font-medium">সব ক্যাটেগরি</span>
                <ChevronDown className={`h-3 w-3 transition-transform ${showCategories ? 'rotate-180' : ''}`} />
              </button>
              
              {showCategories && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-lg border dark:border-gray-700 z-50 overflow-hidden">
                  <div className="py-2">
                    {categories.map((cat) => {
                      const CatIcon = cat.icon;
                      const colorMap: Record<string, string> = {
                        green: 'text-green-600',
                        orange: 'text-orange-600',
                        pink: 'text-pink-600',
                        emerald: 'text-emerald-600',
                        amber: 'text-amber-600',
                        teal: 'text-teal-600',
                      };
                      return (
                        <Link
                          key={cat.name}
                          href={cat.href}
                          onClick={() => setShowCategories(false)}
                          className="flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition group"
                        >
                          <div className="flex items-center gap-3">
                            <CatIcon className={`h-4 w-4 ${colorMap[cat.color] || 'text-green-600'} group-hover:scale-110 transition`} />
                            <span>{cat.name}</span>
                          </div>
                          <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded-full">
                            {cat.count}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
            
            {/* Navigation Links */}
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition ${
                    pathname === item.href
                      ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-3">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="relative mb-4">
              <input
                type="text"
                placeholder="সার্চ করুন..."
                value={search}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-800 dark:text-white text-sm"
                aria-label="Search products"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            </form>

            {/* User Info for Mobile */}
            {isAuthenticated && user && (
              <div className={`p-3 rounded-xl ${roleConfig?.bgLight} ${roleConfig?.bgDark} border mb-3`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${roleConfig?.bgLight} ${roleConfig?.textLight}`}>
                        <RoleIcon className="w-5 h-5" />
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 text-sm">
                      {roleConfig?.badge}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-white">{user.name}</p>
                    <p className={`text-xs font-medium ${roleConfig?.textLight} ${roleConfig?.textDark}`}>
                      {roleConfig?.name}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Categories */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">ক্যাটেগরি</p>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => {
                  const CatIcon = cat.icon;
                  return (
                    <Link
                      key={cat.name}
                      href={cat.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 transition"
                    >
                      <CatIcon className="h-4 w-4 text-green-600" />
                      <span>{cat.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                      pathname === item.href
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
            
            {/* Quick Links */}
            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">দ্রুত লিংক</p>
              <div className="space-y-1">
                {quickLinks.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                    >
                      <LinkIcon className="h-4 w-4" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated ? (
              <div className="pt-3 space-y-2">
                <Link href="/login" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-5 py-2.5 border border-green-600 text-green-600 rounded-full font-medium transition">
                    লগইন
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setMenuOpen(false)}>
                  <button className="w-full px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-full font-medium transition">
                    সাইন আপ
                  </button>
                </Link>
              </div>
            ) : (
              <div className="pt-3 space-y-2">
                {(user.role === 'SUPER_ADMIN' || user.role === 'ADMIN') && (
                  <Link
                    href="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full px-5 py-2.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full font-medium transition"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="w-full px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-full font-medium transition"
                >
                  লগআউট
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;