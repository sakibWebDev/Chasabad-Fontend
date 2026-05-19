'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { fetchSeeds } from '@/lib/features/seeds/seedSlice';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { Sprout, ArrowRight, Truck, Shield, Clock, Award, Heart, ShoppingCart, Leaf, Apple, Flower, Wheat, Coffee } from 'lucide-react';

const categories = [
  { name: 'শাকসবজি বীজ', nameBn: 'শাকসবজি বীজ', icon: Leaf, count: 18, value: 'সবজি' },
  { name: 'ফলের বীজ', nameBn: 'ফলের বীজ', icon: Apple, count: 8, value: 'ফল' },
  { name: 'মসলার বীজ', nameBn: 'মসলার বীজ', icon: Coffee, count: 6, value: 'মসলা' },
  { name: 'ফুলের বীজ', nameBn: 'ফুলের বীজ', icon: Flower, count: 5, value: 'ফুল' },
  { name: 'ঔষধি বীজ', nameBn: 'ঔষধি বীজ', icon: Leaf, count: 3, value: 'ঔষধি' },
  { name: 'ধান বীজ', nameBn: 'ধান বীজ', icon: Wheat, count: 12, value: 'ধান' },
];

const featuredCategories = [
  { name: 'বীজ', nameBn: 'বীজ', href: '/shop/seeds', icon: Sprout, color: 'from-green-500 to-emerald-500', count: 63 },
  { name: 'চারা', nameBn: 'চারা', href: '/shop/plants', icon: Sprout, color: 'from-emerald-500 to-teal-500', count: 85 },
  { name: 'সরঞ্জাম', nameBn: 'সরঞ্জাম', href: '/shop/tools', icon: Sprout, color: 'from-amber-500 to-orange-500', count: 45 },
];

const difficultyColor = { EASY: 'bg-green-100 text-green-700', MEDIUM: 'bg-yellow-100 text-yellow-700', HARD: 'bg-red-100 text-red-700' };
const difficultyName = { EASY: 'সহজ', MEDIUM: 'মধ্যম', HARD: 'কঠিন' };

export default function ShopHomePage() {
  const dispatch = useAppDispatch();
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();
  const { items: products, loading } = useAppSelector((state) => state.seeds);
  const { category } = useAppSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchSeeds({ limit: 8 }));
  }, [dispatch]);

  const handleCategoryClick = (categoryValue: string) => {
    dispatch(fetchSeeds({ category: categoryValue, limit: 8 }));
  };

  const handleAddToCart = (product: any) => {
    if (!isInCart(product.id)) {
      addToCart({ id: product.id, name: product.name, price: product.seed_cost, image: product.image });
      toast.success(`${product.name} কার্টে যোগ হয়েছে!`);
    } else {
      toast.error('পণ্যটি ইতিমধ্যে কার্টে আছে');
    }
  };

  const handleToggleWishlist = (product: any) => {
    toggleItem({ id: product.id, name: product.name, price: product.seed_cost, originalPrice: product.market_price, category: product.category, image: product.image });
  };

  const displayProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Hero Banner */}
        <div className="relative bg-gradient-to-r from-green-700 to-emerald-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="relative px-6 py-12 md:py-16 text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm text-white mb-4">
              <Award className="h-4 w-4" />
              <span>বিশ্বাস করুন ১০,০০০+ কৃষকের</span>
            </div>
            <h1 className="text-2xl md:text-4xl font-bold text-white mb-3">কৃষি পণ্যের <span className="text-emerald-200">সেরা ঠিকানা</span></h1>
            <p className="text-emerald-100 max-w-2xl mx-auto mb-6">মানসম্মত বীজ, চারা ও কৃষি সরঞ্জাম - সরাসরি আপনার দোরগোড়ায়</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/shop/seeds" className="bg-white text-emerald-700 px-6 py-2.5 rounded-full font-semibold hover:bg-emerald-50 transition">কেনাকাটা শুরু করুন</Link>
              <Link href="/expert-advice" className="border border-white/30 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-white/10 transition">বিশেষজ্ঞ পরামর্শ</Link>
            </div>
          </div>
        </div>

        {/* Featured Categories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">জনপ্রিয় ক্যাটাগরি</h2>
            <Link href="/shop/all" className="text-emerald-600 text-sm flex items-center gap-1">সব দেখুন <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {featuredCategories.map((cat) => (
              <Link key={cat.name} href={cat.href} className={`group bg-gradient-to-r ${cat.color} rounded-2xl p-6 text-white hover:shadow-xl transition hover:-translate-y-1`}>
                <div className="flex items-center justify-between">
                  <div>
                    <cat.icon className="h-10 w-10 mb-3 opacity-80 group-hover:scale-110 transition" />
                    <h3 className="text-xl font-bold">{cat.nameBn}</h3>
                    <p className="text-white/80 text-sm mt-1">{cat.count}+ পণ্য</p>
                  </div>
                  <ArrowRight className="h-6 w-6 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">জনপ্রিয় পণ্য</h2>
            <Link href="/shop/all" className="text-emerald-600 text-sm flex items-center gap-1">সব দেখুন <ArrowRight className="h-4 w-4" /></Link>
          </div>

          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[1,2,3,4,5,6,7,8].map(i => <div key={i} className="bg-white rounded-xl p-3 animate-pulse"><div className="h-32 bg-gray-200 rounded-lg mb-2"></div><div className="h-4 bg-gray-200 rounded w-3/4"></div></div>)}
            </div>
          )}

          {!loading && displayProducts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {displayProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition hover:-translate-y-1 p-3 border border-gray-100 group">
                  <Link href={`/shop/seeds/${product.seedId}`}>
                    <div className="relative h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg flex items-center justify-center mb-2 overflow-hidden">
                      {product.image ? <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-110 transition" /> : <Sprout className="h-12 w-12 text-green-500 group-hover:scale-110 transition" />}
                      {product.organic_certified && <span className="absolute top-2 left-2 text-[10px] font-medium bg-green-600 text-white px-2 py-0.5 rounded-full">অর্গানিক</span>}
                      {product.export_potential && <span className="absolute top-2 left-2 text-[10px] font-medium bg-blue-600 text-white px-2 py-0.5 rounded-full">এক্সপোর্ট</span>}
                      <span className={`absolute bottom-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full ${difficultyColor[product.difficulty as keyof typeof difficultyColor]}`}>
                        {difficultyName[product.difficulty as keyof typeof difficultyName]}
                      </span>
                      <button onClick={(e) => { e.preventDefault(); handleToggleWishlist(product); }} className="absolute top-2 right-2 p-1 bg-white/80 rounded-full">
                        <Heart className={`h-3.5 w-3.5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
                      </button>
                    </div>
                    <h3 className="font-semibold text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{product.scientific_name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-sm font-bold text-emerald-700">৳{product.seed_cost}</span>
                      {product.market_price > product.seed_cost && <span className="text-xs text-gray-400 line-through">৳{product.market_price}</span>}
                    </div>
                    <button onClick={() => handleAddToCart(product)} disabled={isInCart(product.id)} className={`w-full mt-2 py-1.5 text-xs rounded-lg transition font-medium flex items-center justify-center gap-1 ${isInCart(product.id) ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'}`}>
                      <ShoppingCart className="h-3 w-3" />
                      {isInCart(product.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 bg-white rounded-2xl p-6 shadow-sm border">
          <div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-full"><Truck className="h-6 w-6 text-emerald-600" /></div><div><h4 className="font-semibold">সারা দেশে ডেলিভারি</h4><p className="text-xs text-gray-500">২৪-৪৮ ঘন্টার মধ্যে</p></div></div>
          <div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-full"><Shield className="h-6 w-6 text-emerald-600" /></div><div><h4 className="font-semibold">গুণগত মানের নিশ্চয়তা</h4><p className="text-xs text-gray-500">১০০% অরিজিনাল পণ্য</p></div></div>
          <div className="flex items-center gap-3"><div className="p-2 bg-emerald-50 rounded-full"><Clock className="h-6 w-6 text-emerald-600" /></div><div><h4 className="font-semibold">সাপোর্ট</h4><p className="text-xs text-gray-500">সকাল ৯টা - রাত ৯টা</p></div></div>
        </div>
      </div>
    </div>
  );
}