// components/home/TrendingProducts.tsx (সঠিক ইম্পোর্ট সহ)
'use client';

import Link from 'next/link';
import { Sprout, Trees, Star, ShoppingCart, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';        // পাথ ঠিক করুন
import { useWishlist } from '@/lib/hooks/useWishlist'; // পাথ ঠিক করুন
import toast from 'react-hot-toast';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  rating: number;
  sold: number;
  category: 'seeds' | 'plants';
  badge: string;
  image: string | null;
}

const products: Product[] = [
  { id: 1, name: 'জৈব টমেটো বীজ', price: 45, originalPrice: 60, rating: 4.8, sold: 234, category: 'seeds', badge: 'বেস্টসেলার', image: null },
  { id: 2, name: 'আম গাছের চারা', price: 350, originalPrice: 450, rating: 4.9, sold: 189, category: 'plants', badge: 'গ্রাফটেড', image: null },
  { id: 3, name: 'হাইব্রিড মরিচ বীজ', price: 35, originalPrice: 50, rating: 4.7, sold: 456, category: 'seeds', badge: 'হট সেল', image: null },
  { id: 4, name: 'কলা গাছের চারা', price: 120, originalPrice: 150, rating: 4.8, sold: 567, category: 'plants', badge: 'টিস্যু কালচার', image: null },
  { id: 5, name: 'ধানের বীজ', price: 180, originalPrice: 220, rating: 4.7, sold: 890, category: 'seeds', badge: 'উচ্চ ফলনশীল', image: null },
  { id: 6, name: 'পেয়ারা চারা', price: 280, originalPrice: 350, rating: 4.6, sold: 234, category: 'plants', badge: 'বীজহীন', image: null },
  { id: 7, name: 'লাল শাক বীজ', price: 25, originalPrice: 35, rating: 4.5, sold: 345, category: 'seeds', badge: 'হট সেল', image: null },
  { id: 8, name: 'মাল্টা চারা', price: 420, originalPrice: 550, rating: 4.8, sold: 123, category: 'plants', badge: 'নতুন', image: null },
];

export default function TrendingProducts() {
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const handleAddToCart = (product: Product) => {
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

  const handleToggleWishlist = (product: Product) => {
    toggleItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      rating: product.rating,
      sold: product.sold,
      category: product.category,
      badge: product.badge,
      image: product.image,
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              জনপ্রিয় পণ্য
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              কৃষকদের সবচেয়ে পছন্দের পণ্য
            </p>
          </div>
          <Link 
            href="/shop/all" 
            className="text-emerald-600 text-sm flex items-center gap-1 hover:gap-2 transition-all"
          >
            সব দেখুন <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="relative h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
                {product.category === 'seeds' ? (
                  <Sprout className="h-16 w-16 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Trees className="h-16 w-16 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform" />
                )}
                
                {product.badge && (
                  <span className="absolute top-3 left-3 text-xs font-medium bg-emerald-600 text-white px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                
                {/* Wishlist Button */}
                <button
                  onClick={() => handleToggleWishlist(product)}
                  className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                  aria-label="Add to wishlist"
                >
                  <Heart 
                    className={`h-4 w-4 transition-colors ${
                      isInWishlist(product.id) 
                        ? 'fill-red-500 text-red-500' 
                        : 'text-gray-500 hover:text-red-500'
                    }`} 
                  />
                </button>
              </div>
              
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1 hover:text-emerald-600 transition">
                    {product.name}
                  </h3>
                </Link>
                
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({product.sold} বিক্রি)</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400">
                    ৳{product.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                  <span className="text-xs text-green-600 bg-green-100 px-1.5 py-0.5 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% ছাড়
                  </span>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isInCart(product.id)}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                    isInCart(product.id)
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
                  } text-white`}
                >
                  <ShoppingCart className="h-4 w-4" />
                  {isInCart(product.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}