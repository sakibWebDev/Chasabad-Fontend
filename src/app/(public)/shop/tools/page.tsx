// app/shop/tools/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Star, ShoppingCart, Grid3x3, List, Tractor, Heart, Eye, 
  Filter, ChevronRight, Truck, Shield, Clock, TrendingUp, Award, 
  Wrench, Droplet, Wind 
} from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';        // পাথ ঠিক করুন
import { useWishlist } from '@/lib/hooks/useWishlist'; // পাথ ঠিক করুন
import toast from 'react-hot-toast';

// টুলসের টাইপ
interface Tool {
  id: number;
  name: string;
  nameEn: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  badge: string;
  category: string;
  isNew?: boolean;
  discount?: number;
}

// ক্যাটাগরি ফিল্টার
const toolCategories = [
  { id: 'all', name: 'সব', icon: Tractor },
  { id: 'tractor', name: 'ট্রাক্টর', icon: Tractor },
  { id: 'irrigation', name: 'সেচ সরঞ্জাম', icon: Droplet },
  { id: 'sprayer', name: 'স্প্রেয়ার', icon: Wind },
  { id: 'harvesting', name: 'ফসল কাটার যন্ত্র', icon: TrendingUp },
  { id: 'tillage', name: 'জমি প্রস্তুতির যন্ত্র', icon: Wrench },
];

// টুলস ডাটা
const toolsData: Tool[] = [
  { id: 1, name: 'হ্যান্ড ট্রাক্টর', nameEn: 'Hand Tractor', price: 45000, originalPrice: 55000, rating: 4.7, reviews: 234, stock: 12, badge: 'বেস্টসেলার', category: 'tractor', isNew: false, discount: 18 },
  { id: 2, name: 'ড্রিপ ইরিগেশন কিট', nameEn: 'Drip Irrigation Kit', price: 12000, originalPrice: 15000, rating: 4.8, reviews: 456, stock: 45, badge: 'পানি সাশ্রয়ী', category: 'irrigation', isNew: true, discount: 20 },
  { id: 3, name: 'পাওয়ার স্প্রেয়ার', nameEn: 'Power Sprayer', price: 5500, originalPrice: 6500, rating: 4.6, reviews: 234, stock: 67, badge: 'ব্যাটারি চালিত', category: 'sprayer', isNew: false, discount: 15 },
  { id: 4, name: 'রিপার মেশিন', nameEn: 'Reaper Machine', price: 85000, originalPrice: 100000, rating: 4.7, reviews: 89, stock: 23, badge: 'ফসল কাটার যন্ত্র', category: 'harvesting', isNew: false, discount: 15 },
  { id: 5, name: 'থ্রেসার মেশিন', nameEn: 'Thresher Machine', price: 35000, originalPrice: 45000, rating: 4.5, reviews: 145, stock: 34, badge: 'মাড়াই যন্ত্র', category: 'harvesting', isNew: false, discount: 22 },
  { id: 6, name: 'ন্যাপস্যাক স্প্রেয়ার', nameEn: 'Knapsack Sprayer', price: 1000, originalPrice: 1500, rating: 4.6, reviews: 567, stock: 120, badge: 'হ্যান্ড স্প্রেয়ার', category: 'sprayer', isNew: false, discount: 33 },
  { id: 7, name: 'রোটাভেটর', nameEn: 'Rotavator', price: 45000, originalPrice: 55000, rating: 4.8, reviews: 234, stock: 15, badge: 'জমি প্রস্তুতির যন্ত্র', category: 'tillage', isNew: false, discount: 18 },
  { id: 8, name: 'ডিস্ক প্লো', nameEn: 'Disc Plough', price: 25000, originalPrice: 32000, rating: 4.7, reviews: 189, stock: 28, badge: 'গভীর চাষ', category: 'tillage', isNew: false, discount: 22 },
  { id: 9, name: 'স্প্রিংকলার সিস্টেম', nameEn: 'Sprinkler System', price: 18000, originalPrice: 25000, rating: 4.6, reviews: 112, stock: 20, badge: 'স্বয়ংক্রিয়', category: 'irrigation', isNew: true, discount: 28 },
  { id: 10, name: 'মিনি ট্রাক্টর', nameEn: 'Mini Tractor', price: 120000, originalPrice: 150000, rating: 4.9, reviews: 67, stock: 8, badge: 'নতুন মডেল', category: 'tractor', isNew: true, discount: 20 },
  { id: 11, name: 'মালচিং ফিল্ম', nameEn: 'Mulching Film', price: 2500, originalPrice: 3500, rating: 4.4, reviews: 234, stock: 500, badge: 'আগাছা নিয়ন্ত্রণ', category: 'tillage', isNew: false, discount: 28 },
  { id: 12, name: 'ফগার মেশিন', nameEn: 'Fogger Machine', price: 8500, originalPrice: 12000, rating: 4.5, reviews: 89, stock: 45, badge: 'স্যানিটাইজার', category: 'sprayer', isNew: true, discount: 29 },
];

// ক্যাটাগরি ভিত্তিক টুলস সংখ্যা
const getCategoryCount = (categoryId: string) => {
  if (categoryId === 'all') return toolsData.length;
  return toolsData.filter(tool => tool.category === categoryId).length;
};

export default function ToolsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 150000]);

  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  // ফিল্টার এবং সার্চ
  let filteredTools = toolsData.filter(tool => {
    if (selectedCategory !== 'all' && tool.category !== selectedCategory) return false;
    if (searchTerm && !tool.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !tool.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (tool.price < priceRange[0] || tool.price > priceRange[1]) return false;
    return true;
  });

  // সাজানো
  filteredTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'discount') return (b.discount || 0) - (a.discount || 0);
    return b.id - a.id;
  });

  const handleAddToCart = (tool: Tool) => {
    if (!isInCart(tool.id)) {
      addToCart({
        id: tool.id,
        name: tool.name,
        price: tool.price,
      });
      toast.success(`${tool.name} কার্টে যোগ হয়েছে!`, {
        icon: '🛒',
        duration: 2000,
      });
    } else {
      toast.error('পণ্যটি ইতিমধ্যে কার্টে আছে', {
        duration: 2000,
      });
    }
  };

  const handleToggleWishlist = (tool: Tool) => {
    toggleItem({
      id: tool.id,
      name: tool.name,
      price: tool.price,
      originalPrice: tool.originalPrice,
      rating: tool.rating,
      sold: tool.reviews,
      category: 'tools',
      badge: tool.badge,
      image: null,
    });
  };

  // ✅ সঠিক renderStars ফাংশন - reviews প্যারামিটার সহ
  const renderStars = (rating: number, reviews: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
        <span className="text-xs text-gray-400 ml-1">({reviews})</span>
      </div>
    );
  };

  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString('bn-BD')}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="সরঞ্জাম অনুসন্ধান..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <Filter className="h-4 w-4" />
                ফিল্টার
              </button>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="newest">সর্বশেষ</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
                <option value="rating">রেটিং</option>
                <option value="discount">সর্বোচ্চ ছাড়</option>
              </select>
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button onClick={() => setView('grid')} className={`p-1.5 rounded transition ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}>
                  <Grid3x3 className="h-4 w-4" />
                </button>
                <button onClick={() => setView('list')} className={`p-1.5 rounded transition ${view === 'list' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}>
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">দামের পরিসীমা</label>
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="0"
                      max="150000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                    <span className="text-sm">
                      {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {toolCategories.map((cat) => {
            const Icon = cat.icon;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{cat.name}</span>
                <span className="text-xs">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {filteredTools.length}টি পণ্য পাওয়া গেছে
        </div>

        {/* Products Grid/List */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
            <Tractor className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">কোনো সরঞ্জাম পাওয়া যায়নি</h3>
            <p className="text-gray-400 dark:text-gray-500 mt-1">অনুগ্রহ করে ভিন্ন ক্যাটাগরি বা সার্চ টার্ম ব্যবহার করুন</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="relative h-36 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 flex items-center justify-center">
                  <Tractor className="h-12 w-12 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform" />
                  {tool.badge && (
                    <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-600 text-white">
                      {tool.badge}
                    </span>
                  )}
                  {tool.discount && tool.discount > 0 && (
                    <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-red-500 text-white">
                      {tool.discount}% ছাড়
                    </span>
                  )}
                  {tool.isNew && (
                    <span className="absolute bottom-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-500 text-white">
                      নতুন
                    </span>
                  )}
                  <button
                    onClick={() => handleToggleWishlist(tool)}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                  >
                    <Heart className={`h-3.5 w-3.5 ${isInWishlist(tool.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">{tool.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{tool.nameEn}</p>
                  {/* ✅ সঠিকভাবে renderStars কল করা */}
                  {renderStars(tool.rating, tool.reviews)}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{formatPrice(tool.price)}</span>
                    <span className="text-sm text-gray-400 line-through">{formatPrice(tool.originalPrice)}</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">স্টক: {tool.stock}টি</div>
                </div>
                <div className="px-4 pb-4">
                  <button 
                    onClick={() => handleAddToCart(tool)}
                    disabled={isInCart(tool.id)}
                    className={`w-full py-2 text-sm rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                      isInCart(tool.id)
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isInCart(tool.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTools.map((tool) => (
              <div key={tool.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Tractor className="h-8 w-8 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{tool.name}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{tool.nameEn}</p>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleWishlist(tool)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(tool.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                      </button>
                    </div>
                  </div>
                  {/* ✅ সঠিকভাবে renderStars কল করা */}
                  {renderStars(tool.rating, tool.reviews)}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {tool.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                        {tool.badge}
                      </span>
                    )}
                    {tool.discount && tool.discount > 0 && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400">
                        {tool.discount}% ছাড়
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div>
                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{formatPrice(tool.price)}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(tool.originalPrice)}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-3">স্টক: {tool.stock}</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(tool)}
                      disabled={isInCart(tool.id)}
                      className={`px-4 py-1.5 text-sm rounded-lg transition flex items-center gap-2 ${
                        isInCart(tool.id)
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {isInCart(tool.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-110 transition-transform">
              <Truck className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold dark:text-white">সারা দেশে ডেলিভারি</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">বিনামূল্যে ডেলিভারি</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold dark:text-white">১ বছর ওয়ারেন্টি</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">সকল যন্ত্রপাতিতে</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold dark:text-white">টেকনিক্যাল সাপোর্ট</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">ফোন ও অনলাইন</p>
            </div>
          </div>
        </div>

        {/* Featured Tools Banner */}
        <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h3 className="text-xl font-bold">বিশেষ অফার!</h3>
              <p className="text-white/90 text-sm mt-1">নতুন কৃষি যন্ত্রপাতিতে ২০% পর্যন্ত ছাড়</p>
            </div>
            <Link href="/shop/tools/offer">
              <button className="bg-white text-amber-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition">
                অফার দেখুন
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}