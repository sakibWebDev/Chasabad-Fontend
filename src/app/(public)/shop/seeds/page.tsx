// app/shop/seeds/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Search, Star, ShoppingCart, Grid3x3, List, 
  Sprout, ChevronRight, Heart, Eye, Filter, Truck, Shield, Clock
} from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import toast from 'react-hot-toast';

// বীজের টাইপ
interface SeedProduct {
  id: number;
  name: string;
  nameEn: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  stock: number;
  isOrganic: boolean;
  badge: string;
}

// লোকালি ক্যাটাগরি ডিফাইন করুন
const categories = [
  { name: 'সবজি বীজ', nameEn: 'Vegetables', href: '/shop/seeds/vegetables', icon: Sprout, count: 45, categoryId: 'vegetables' },
  { name: 'ফলের বীজ', nameEn: 'Fruits', href: '/shop/seeds/fruits', icon: Sprout, count: 32, categoryId: 'fruits' },
  { name: 'ফুলের বীজ', nameEn: 'Flowers', href: '/shop/seeds/flowers', icon: Sprout, count: 28, categoryId: 'flowers' },
  { name: 'পাতা জাতীয়', nameEn: 'Herbs', href: '/shop/seeds/herbs', icon: Sprout, count: 25, categoryId: 'herbs' },
  { name: 'শস্য বীজ', nameEn: 'Grains', href: '/shop/seeds/grains', icon: Sprout, count: 18, categoryId: 'grains' },
  { name: 'গাছের বীজ', nameEn: 'Trees', href: '/shop/seeds/trees', icon: Sprout, count: 12, categoryId: 'trees' },
];

// বীজের ডেমো ডাটা
const allSeeds: SeedProduct[] = [
  { id: 1, name: 'জৈব টমেটো বীজ', nameEn: 'Organic Tomato Seeds', category: 'vegetables', price: 45, originalPrice: 60, rating: 4.8, reviews: 234, stock: 150, isOrganic: true, badge: 'বেস্টসেলার' },
  { id: 2, name: 'হাইব্রিড মরিচ বীজ', nameEn: 'Hybrid Chili Seeds', category: 'vegetables', price: 35, originalPrice: 50, rating: 4.7, reviews: 456, stock: 200, isOrganic: false, badge: 'হট সেল' },
  { id: 3, name: 'আম গাছের বীজ', nameEn: 'Mango Seeds', category: 'fruits', price: 250, originalPrice: 300, rating: 4.9, reviews: 98, stock: 45, isOrganic: true, badge: 'প্রিমিয়াম' },
  { id: 4, name: 'সূর্যমুখী বীজ', nameEn: 'Sunflower Seeds', category: 'flowers', price: 80, originalPrice: 100, rating: 4.7, reviews: 156, stock: 200, isOrganic: false, badge: 'সর্বোচ্চ বিক্রিত' },
  { id: 5, name: 'মিষ্টি তুলসী বীজ', nameEn: 'Sweet Basil Seeds', category: 'herbs', price: 90, originalPrice: 120, rating: 4.9, reviews: 189, stock: 85, isOrganic: true, badge: 'ঔষধি গুণ' },
  { id: 6, name: 'গমের বীজ', nameEn: 'Wheat Seeds', category: 'grains', price: 180, originalPrice: 220, rating: 4.6, reviews: 345, stock: 500, isOrganic: false, badge: 'উচ্চ ফলনশীল' },
  { id: 7, name: 'নারিকেল বীজ', nameEn: 'Coconut Seeds', category: 'trees', price: 120, originalPrice: 150, rating: 4.5, reviews: 78, stock: 120, isOrganic: true, badge: 'বামন জাত' },
  { id: 8, name: 'বেগুন বীজ', nameEn: 'Brinjal Seeds', category: 'vegetables', price: 30, originalPrice: 40, rating: 4.5, reviews: 234, stock: 300, isOrganic: true, badge: 'দেশি জাত' },
  { id: 9, name: 'পেঁপে বীজ', nameEn: 'Papaya Seeds', category: 'fruits', price: 65, originalPrice: 80, rating: 4.6, reviews: 145, stock: 180, isOrganic: true, badge: 'দ্রুত ফলন' },
  { id: 10, name: 'ধনিয়া বীজ', nameEn: 'Coriander Seeds', category: 'herbs', price: 40, originalPrice: 55, rating: 4.7, reviews: 267, stock: 250, isOrganic: true, badge: 'সুগন্ধি' },
];

const categoryNames: Record<string, string> = {
  vegetables: 'সবজি বীজ',
  fruits: 'ফলের বীজ',
  flowers: 'ফুলের বীজ',
  herbs: 'পাতা জাতীয়',
  grains: 'শস্য বীজ',
  trees: 'গাছের বীজ',
};

export default function SeedsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [organicOnly, setOrganicOnly] = useState(false);

  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  let filteredSeeds = allSeeds.filter(seed => {
    if (selectedCategory !== 'all' && seed.category !== selectedCategory) return false;
    if (searchTerm && !seed.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !seed.nameEn.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    if (organicOnly && !seed.isOrganic) return false;
    if (seed.price < priceRange[0] || seed.price > priceRange[1]) return false;
    return true;
  });

  // Sort
  filteredSeeds = [...filteredSeeds].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.reviews - a.reviews;
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
      sold: product.reviews,
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
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">হোম</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/shop" className="hover:text-emerald-600">শপ</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-emerald-600 font-medium">বীজ</span>
        </div>

        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Sprout className="h-7 w-7 text-emerald-600" />
            সকল বীজ
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">মানসম্মত বীজ সংগ্রহ করুন সেরা দামে</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="বীজ অনুসন্ধান..."
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

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
            }`}
          >
            সব ({allSeeds.length})
          </button>
          {categories.map((cat) => {
            const count = allSeeds.filter(s => s.category === cat.categoryId).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.categoryId)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat.categoryId
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
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
            <p className="text-gray-400 dark:text-gray-500 mt-1">অনুগ্রহ করে অন্য ক্যাটাগরি বা সার্চ টার্ম ব্যবহার করুন</p>
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredSeeds.map((seed) => (
              <div key={seed.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <Link href={`/shop/seeds/${seed.id}`}>
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
                      onClick={(e) => {
                        e.preventDefault();
                        handleToggleWishlist(seed);
                      }}
                      className="absolute bottom-2 right-2 p-1.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                    >
                      <Heart className={`h-3.5 w-3.5 ${isInWishlist(seed.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-1">{seed.name}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{seed.nameEn}</p>
                    {renderStars(seed.rating)}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">৳{seed.price}</span>
                      <span className="text-sm text-gray-400 line-through">৳{seed.originalPrice}</span>
                    </div>
                    <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">স্টক: {seed.stock}টি</div>
                  </div>
                </Link>
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">{seed.nameEn}</p>
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