// app/shop/seeds/[category]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { 
  Sprout, ShoppingCart, Star, ChevronRight, Heart, Eye, 
  Filter, Grid3x3, List, Search, Truck, Shield, Clock 
} from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import toast from 'react-hot-toast';

// বীজের টাইপ
interface SeedProduct {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  stock: number;
  isOrganic: boolean;
  badge: string;
}

// ক্যাটাগরি ভিত্তিক তথ্য
const categoryInfo: Record<string, { name: string; nameBn: string; color: string; description: string; icon: string }> = {
  vegetables: { 
    name: 'vegetables', 
    nameBn: 'সবজি বীজ', 
    color: 'from-green-500 to-emerald-500', 
    description: 'উচ্চ মানের সবজির বীজ সংগ্রহ করুন', 
    icon: '🥬' 
  },
  fruits: { 
    name: 'fruits', 
    nameBn: 'ফলের বীজ', 
    color: 'from-red-500 to-orange-500', 
    description: 'বাংলাদেশী ফলের বীজ', 
    icon: '🍎' 
  },
  flowers: { 
    name: 'flowers', 
    nameBn: 'ফুলের বীজ', 
    color: 'from-pink-500 to-rose-500', 
    description: 'সুন্দর ফুলের বীজ', 
    icon: '🌻' 
  },
  herbs: { 
    name: 'herbs', 
    nameBn: 'পাতা জাতীয়', 
    color: 'from-teal-500 to-green-500', 
    description: 'ঔষধি ও মসলা জাতীয় বীজ', 
    icon: '🌿' 
  },
  grains: { 
    name: 'grains', 
    nameBn: 'শস্য বীজ', 
    color: 'from-amber-500 to-yellow-500', 
    description: 'উচ্চ ফলনশীল শস্যের বীজ', 
    icon: '🌾' 
  },
  trees: { 
    name: 'trees', 
    nameBn: 'গাছের বীজ', 
    color: 'from-emerald-600 to-teal-600', 
    description: 'ফলজ ও বনজ গাছের বীজ', 
    icon: '🌳' 
  },
};

// ক্যাটাগরি ভিত্তিক ডাটা
const categorySeeds: Record<string, SeedProduct[]> = {
  vegetables: [
    { id: 1, name: 'জৈব টমেটো বীজ', price: 45, originalPrice: 60, rating: 4.8, stock: 150, isOrganic: true, badge: 'বেস্টসেলার' },
    { id: 2, name: 'হাইব্রিড মরিচ বীজ', price: 35, originalPrice: 50, rating: 4.7, stock: 200, isOrganic: false, badge: 'হট সেল' },
    { id: 3, name: 'বেগুন বীজ', price: 30, originalPrice: 40, rating: 4.5, stock: 300, isOrganic: true, badge: 'দেশি জাত' },
    { id: 4, name: 'ফুলকপি বীজ', price: 40, originalPrice: 55, rating: 4.6, stock: 250, isOrganic: false, badge: 'শীতকালীন' },
    { id: 5, name: 'বাঁধাকপি বীজ', price: 35, originalPrice: 50, rating: 4.5, stock: 220, isOrganic: true, badge: 'উচ্চ ফলন' },
    { id: 6, name: 'লাল শাক বীজ', price: 25, originalPrice: 35, rating: 4.4, stock: 180, isOrganic: true, badge: 'পুষ্টিকর' },
    { id: 7, name: 'পালং শাক বীজ', price: 28, originalPrice: 40, rating: 4.5, stock: 160, isOrganic: false, badge: 'শীতকালীন' },
    { id: 8, name: 'কাঁচা মরিচ বীজ', price: 32, originalPrice: 45, rating: 4.6, stock: 190, isOrganic: true, badge: 'হট সেল' },
  ],
  fruits: [
    { id: 9, name: 'আম গাছের বীজ', price: 250, originalPrice: 300, rating: 4.9, stock: 45, isOrganic: true, badge: 'প্রিমিয়াম' },
    { id: 10, name: 'লিচু বীজ', price: 180, originalPrice: 220, rating: 4.6, stock: 60, isOrganic: false, badge: 'মৌসুমি' },
    { id: 11, name: 'কাঠাল বীজ', price: 150, originalPrice: 200, rating: 4.7, stock: 50, isOrganic: true, badge: 'দেশি' },
    { id: 12, name: 'পেঁপে বীজ', price: 65, originalPrice: 85, rating: 4.6, stock: 120, isOrganic: true, badge: 'দ্রুত ফলন' },
    { id: 13, name: 'জামরুল বীজ', price: 120, originalPrice: 160, rating: 4.5, stock: 35, isOrganic: false, badge: 'বিদেশি' },
  ],
  flowers: [
    { id: 14, name: 'সূর্যমুখী বীজ', price: 80, originalPrice: 100, rating: 4.7, stock: 200, isOrganic: false, badge: 'সর্বোচ্চ বিক্রিত' },
    { id: 15, name: 'গাঁদা ফুলের বীজ', price: 50, originalPrice: 70, rating: 4.6, stock: 150, isOrganic: true, badge: 'সারা বছর ফোটে' },
    { id: 16, name: 'রজনীগন্ধা বীজ', price: 90, originalPrice: 120, rating: 4.8, stock: 80, isOrganic: true, badge: 'সুগন্ধি' },
    { id: 17, name: 'চন্দ্রমল্লিকা বীজ', price: 70, originalPrice: 95, rating: 4.5, stock: 100, isOrganic: false, badge: 'শীতকালীন' },
  ],
  herbs: [
    { id: 18, name: 'মিষ্টি তুলসী বীজ', price: 90, originalPrice: 120, rating: 4.9, stock: 85, isOrganic: true, badge: 'ঔষধি গুণ' },
    { id: 19, name: 'ধনিয়া বীজ', price: 40, originalPrice: 55, rating: 4.7, stock: 180, isOrganic: true, badge: 'সুগন্ধি' },
    { id: 20, name: 'পুদিনা বীজ', price: 35, originalPrice: 50, rating: 4.6, stock: 150, isOrganic: true, badge: 'মসলা' },
    { id: 21, name: 'অ্যালোভেরা বীজ', price: 120, originalPrice: 150, rating: 4.5, stock: 60, isOrganic: false, badge: 'ঔষধি' },
  ],
  grains: [
    { id: 22, name: 'গমের বীজ', price: 180, originalPrice: 220, rating: 4.6, stock: 500, isOrganic: false, badge: 'উচ্চ ফলনশীল' },
    { id: 23, name: 'ধান বীজ', price: 220, originalPrice: 280, rating: 4.8, stock: 400, isOrganic: false, badge: 'ব্রি ধান-২৮' },
    { id: 24, name: 'ভূট্টা বীজ', price: 150, originalPrice: 190, rating: 4.5, stock: 300, isOrganic: true, badge: 'মিষ্টি কর্ন' },
    { id: 25, name: 'যব বীজ', price: 200, originalPrice: 250, rating: 4.4, stock: 120, isOrganic: false, badge: 'পুষ্টিকর' },
  ],
  trees: [
    { id: 26, name: 'নারিকেল বীজ', price: 120, originalPrice: 150, rating: 4.5, stock: 120, isOrganic: true, badge: 'বামন জাত' },
    { id: 27, name: 'সুপারি বীজ', price: 80, originalPrice: 100, rating: 4.4, stock: 90, isOrganic: true, badge: 'দেশি' },
    { id: 28, name: 'তেঁতুল বীজ', price: 60, originalPrice: 80, rating: 4.3, stock: 75, isOrganic: true, badge: 'টক স্বাদ' },
    { id: 29, name: 'আমলকী বীজ', price: 100, originalPrice: 130, rating: 4.6, stock: 55, isOrganic: true, badge: 'ঔষধি গুণ' },
  ],
};

export default function SeedCategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const config = categoryInfo[category];
  const seeds = categorySeeds[category] || [];

  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [organicOnly, setOrganicOnly] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  if (!config) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center py-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8">
            <Sprout className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">ক্যাটাগরি পাওয়া যায়নি</h1>
            <p className="text-gray-500 mb-6">আপনার অনুসন্ধান করা ক্যাটাগরিটি বিদ্যমান নেই</p>
            <Link href="/shop/seeds" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700">
              ← সব বীজ দেখুন
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ফিল্টার এবং সার্চ
  let filteredSeeds = seeds.filter(seed => {
    if (searchTerm && !seed.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (organicOnly && !seed.isOrganic) return false;
    if (seed.price < priceRange[0] || seed.price > priceRange[1]) return false;
    return true;
  });

  // সাজানো
  filteredSeeds = [...filteredSeeds].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.stock - a.stock;
    return b.id - a.id;
  });

  const handleAddToCart = (product: SeedProduct) => {
    if (!isInCart(product.id)) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
      });
      toast.success(`${product.name} কার্টে যোগ হয়েছে!`, {
        icon: '🛒',
        duration: 2000,
      });
    } else {
      toast.error('পণ্যটি ইতিমধ্যে কার্টে আছে', {
        duration: 2000,
      });
    }
  };

  const handleToggleWishlist = (product: SeedProduct) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      sold: product.stock,
      category: 'seeds',
      badge: product.badge,
      image: null,
    });
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3 w-3 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
        ))}
        <span className="text-xs text-gray-500 ml-1">{rating}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-emerald-600">হোম</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-emerald-600">শপ</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop/seeds" className="hover:text-emerald-600">বীজ</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-emerald-600 font-medium">{config.nameBn}</span>
        </div>

        {/* Category Header */}
        <div className={`bg-gradient-to-r ${config.color} rounded-2xl p-6 text-white mb-6 shadow-lg`}>
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <span className="text-3xl">{config.icon}</span>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{config.nameBn}</h1>
              <p className="text-white/90 text-sm mt-1">{config.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {seeds.length}টি পণ্য
                </span>
                <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">
                  {seeds.filter(s => s.isOrganic).length}টি জৈব
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={`${config.nameBn} অনুসন্ধান...`}
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
                <option value="popular">জনপ্রিয়তা</option>
                <option value="rating">রেটিং</option>
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
                      max="500"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="flex-1"
                    />
                    <span className="text-sm">৳{priceRange[0]} - ৳{priceRange[1]}</span>
                  </div>
                </div>
                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={organicOnly}
                      onChange={(e) => setOrganicOnly(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    <span className="text-sm">শুধু জৈব বীজ দেখান</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {filteredSeeds.length}টি পণ্য পাওয়া গেছে
        </div>

        {/* Products Grid/List */}
        {filteredSeeds.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl">
            <Sprout className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300">কোনো বীজ পাওয়া যায়নি</h3>
            <p className="text-gray-400 dark:text-gray-500 mt-1">অনুগ্রহ করে ভিন্ন ফিল্টার ব্যবহার করুন</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSeeds.map((seed) => (
              <div key={seed.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="relative h-36 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                  <Sprout className="h-12 w-12 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />
                  {seed.badge && (
                    <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                      {seed.badge}
                    </span>
                  )}
                  {seed.isOrganic && (
                    <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                      জৈব
                    </span>
                  )}
                  <button
                    onClick={() => handleToggleWishlist(seed)}
                    className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                  >
                    <Heart className={`h-3.5 w-3.5 ${isInWishlist(seed.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">{seed.name}</h3>
                  {renderStars(seed.rating)}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">৳{seed.price}</span>
                    <span className="text-sm text-gray-400 line-through">৳{seed.originalPrice}</span>
                  </div>
                  <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">স্টক: {seed.stock}টি</div>
                </div>
                <div className="px-4 pb-4">
                  <button 
                    onClick={() => handleAddToCart(seed)}
                    disabled={isInCart(seed.id)}
                    className={`w-full py-2 text-sm rounded-lg transition font-medium flex items-center justify-center gap-2 ${
                      isInCart(seed.id)
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isInCart(seed.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSeeds.map((seed) => (
              <div key={seed.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sprout className="h-8 w-8 text-green-500 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap justify-between gap-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">{seed.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleToggleWishlist(seed)}
                        className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
                      >
                        <Heart className={`h-4 w-4 ${isInWishlist(seed.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                      </button>
                    </div>
                  </div>
                  {renderStars(seed.rating)}
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    {seed.badge && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        {seed.badge}
                      </span>
                    )}
                    {seed.isOrganic && (
                      <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                        জৈব
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
                    <div>
                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">৳{seed.price}</span>
                      <span className="text-sm text-gray-400 line-through ml-2">৳{seed.originalPrice}</span>
                      <span className="text-xs text-gray-400 dark:text-gray-500 ml-3">স্টক: {seed.stock}</span>
                    </div>
                    <button 
                      onClick={() => handleAddToCart(seed)}
                      disabled={isInCart(seed.id)}
                      className={`px-4 py-1.5 text-sm rounded-lg transition flex items-center gap-2 ${
                        isInCart(seed.id)
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                          : 'bg-emerald-600 text-white hover:bg-emerald-700'
                      }`}
                    >
                      <ShoppingCart className="h-3.5 w-3.5" />
                      {isInCart(seed.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
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
              <p className="text-xs text-gray-500 dark:text-gray-400">২৪-৪৮ ঘন্টার মধ্যে</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-110 transition-transform">
              <Shield className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold dark:text-white">গুণগত মানের নিশ্চয়তা</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">১০০% অরিজিনাল পণ্য</p>
            </div>
          </div>
          <div className="flex items-center gap-3 group">
            <div className="p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full group-hover:scale-110 transition-transform">
              <Clock className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <h4 className="font-semibold dark:text-white">সাপোর্ট</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">সকাল ৯টা - রাত ৯টা</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}