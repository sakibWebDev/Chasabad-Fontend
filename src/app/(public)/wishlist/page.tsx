// app/wishlist/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useWishlist } from '@/lib/hooks/useWishlist';
import { useCart } from "@/lib/hooks/useCart";
import { Heart, ShoppingCart, Trash2, ArrowRight, Star } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { wishlistItems, totalItems, isEmpty, removeItem, clearAll, isInWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleMoveToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
    });
    toast.success(`${product.name} কার্টে যোগ হয়েছে!`);
  };

  const handleRemoveItem = (id: number, name: string) => {
    removeItem(id);
  };

  if (isEmpty) {
    return (
      <div className="min-h-[60vh] bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-pink-50 dark:bg-pink-900/20 rounded-full mb-6">
            <Heart className="h-12 w-12 text-pink-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
            আপনার উইশলিস্ট খালি
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            আপনার পছন্দের পণ্য সংরক্ষণ করুন এবং পরে কিনুন
          </p>
          <Link
            href="/shop/all"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-700 transition"
          >
            শপিং শুরু করুন
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              আমার উইশলিস্ট
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              আপনার সংরক্ষিত {totalItems} টি পণ্য
            </p>
          </div>
          
          <button
            onClick={() => clearAll()}
            className="flex items-center gap-2 px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
          >
            <Trash2 className="h-4 w-4" />
            <span>সব রিমুভ করুন</span>
          </button>
        </div>

        {/* Wishlist Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              {/* Image Section */}
              <div className="relative h-48 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 flex items-center justify-center">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={120}
                    height={120}
                    className="object-contain group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="text-6xl">
                    {product.category === 'seeds' ? '🌱' : '🌳'}
                  </div>
                )}
                
                {/* Badge */}
                {product.badge && (
                  <span className="absolute top-3 left-3 text-xs font-medium bg-emerald-600 text-white px-2 py-1 rounded-full">
                    {product.badge}
                  </span>
                )}
                
                {/* Wishlist Button */}
                <button
                  onClick={() => handleRemoveItem(product.id, product.name)}
                  className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur rounded-full hover:bg-white transition"
                >
                  <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                </button>
              </div>
              
              {/* Content Section */}
              <div className="p-4">
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-1 line-clamp-1 hover:text-emerald-600 transition">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-gray-600 dark:text-gray-400">{product.rating}</span>
                  </div>
                  <span className="text-xs text-gray-400">({product.sold} বিক্রি)</span>
                </div>
                
                {/* Price */}
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
                
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={isInCart(product.id)}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium transition flex items-center justify-center gap-2 ${
                      isInCart(product.id)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    } text-white`}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isInCart(product.id) ? 'কার্টে আছে' : 'কার্টে যোগ করুন'}
                  </button>
                  
                  <button
                    onClick={() => handleRemoveItem(product.id, product.name)}
                    className="px-3 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Recommendation Section */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white">
              আপনি হয়তো এগুলোও পছন্দ করবেন
            </h2>
            <Link
              href="/shop/all"
              className="text-emerald-600 text-sm flex items-center gap-1 hover:gap-2 transition"
            >
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {/* এখানে রিকমেন্ডেড প্রোডাক্ট দেখানো যেতে পারে */}
            <div className="text-center text-gray-500 py-8">
              শীঘ্রই আরও পণ্য যোগ হচ্ছে...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}