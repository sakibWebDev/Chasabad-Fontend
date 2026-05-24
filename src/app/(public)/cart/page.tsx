// app/(public)/cart/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, CreditCard, Truck, Shield } from 'lucide-react';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { increaseQuantity, decreaseQuantity, removeItem, clearCart } from '@/lib/features/cart/cartSlice';
import toast from 'react-hot-toast';

export default function CartPage() {
  const dispatch = useAppDispatch();
  const { items: cartItems, totalPrice, totalQuantity } = useAppSelector((state) => state.cart);
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null);

  // কুপন প্রয়োগ
  const applyCoupon = () => {
    if (couponCode === 'SAVE10') {
      setAppliedCoupon({ code: 'SAVE10', discount: 10 });
      toast.success('কুপন কোড প্রয়োগ করা হয়েছে!', { icon: '🏷️' });
    } else if (couponCode === 'SAVE20') {
      setAppliedCoupon({ code: 'SAVE20', discount: 20 });
      toast.success('কুপন কোড প্রয়োগ করা হয়েছে!', { icon: '🏷️' });
    } else {
      toast.error('ভুল কুপন কোড!');
    }
    setCouponCode('');
  };

  // কোয়ান্টিটি আপডেট - Fixed: Now accepts number type only
  const handleIncrease = (id: number) => {
    dispatch(increaseQuantity(id));
  };

  const handleDecrease = (id: number) => {
    dispatch(decreaseQuantity(id));
  };

  const handleRemove = (id: number, name: string) => {
    dispatch(removeItem(id));
    toast.success(`${name} কার্ট থেকে সরানো হয়েছে`);
  };

  // গণনা
  const subtotal = totalPrice;
  const shipping = subtotal > 1000 ? 0 : 60;
  const discount = appliedCoupon ? (subtotal * appliedCoupon.discount) / 100 : 0;
  const total = subtotal + shipping - discount;

  // ক্যাটাগরি অনুযায়ী ইমোজি
  const getProductEmoji = (name: string) => {
    if (name.includes('বীজ')) return '🌱';
    if (name.includes('গাছ')) return '🌳';
    if (name.includes('টমেটো')) return '🍅';
    if (name.includes('তুলসী')) return '🌿';
    if (name.includes('আম')) return '🥭';
    if (name.includes('মরিচ')) return '🌶️';
    if (name.includes('কলা')) return '🍌';
    if (name.includes('পেয়ারা')) return '🍐';
    return '🌾';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">আমার কার্ট</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              {totalQuantity > 0 ? `${totalQuantity} টি আইটেম` : 'কার্ট খালি'}
            </p>
          </div>
          {cartItems.length > 0 && (
            <button
              onClick={() => {
                dispatch(clearCart());
                toast.error('কার্ট খালি করা হয়েছে');
              }}
              className="text-red-500 hover:text-red-600 text-sm flex items-center gap-1 transition"
            >
              <Trash2 className="h-4 w-4" />
              কার্ট খালি করুন
            </button>
          )}
        </div>

        {cartItems.length === 0 ? (
          // Empty Cart State
          <div className="text-center py-16 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              আপনার কার্ট খালি
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              পণ্য যোগ করতে এখনই কেনাকাটা শুরু করুন
            </p>
            <Link href="/shop/all">
              <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition shadow-md">
                কেনাকাটা শুরু করুন
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 flex gap-4 hover:shadow-md transition"
                >
                  {/* Product Image/Icon */}
                  <div className="w-24 h-24 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-4xl">{getProductEmoji(item.name)}</span>
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-0.5">
                          স্টকে আছে
                        </p>
                        <p className="text-sm text-green-600 font-semibold mt-1">
                          ৳{item.price}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemove(Number(item.id), item.name)}
                        className="text-red-500 hover:text-red-600 transition p-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecrease(Number(item.id))}
                          className="p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className={`h-4 w-4 ${item.quantity <= 1 ? 'opacity-50' : ''}`} />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleIncrease(Number(item.id))}
                          className="p-1.5 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        ৳{item.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  অর্ডার সামারি
                </h2>
                
                {/* Coupon Section */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    কুপন কোড
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="কুপন কোড লিখুন"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                    />
                    <button
                      onClick={applyCoupon}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition"
                    >
                      <Tag className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                    </button>
                  </div>
                  {appliedCoupon && (
                    <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                      ✅ কুপন প্রয়োগ: {appliedCoupon.discount}% ছাড়
                    </p>
                  )}
                </div>

                {/* Price Calculations */}
                <div className="space-y-3 py-4 border-t border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">উপমোট</span>
                    <span className="font-medium">৳{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">ডেলিভারি চার্জ</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">ফ্রি</span>
                      ) : (
                        `৳${shipping}`
                      )}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>ছাড় ({appliedCoupon?.discount}%)</span>
                      <span>- ৳{Math.round(discount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-lg font-bold pt-3 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-gray-900 dark:text-white">মোট</span>
                    <span className="text-green-600">৳{Math.round(total)}</span>
                  </div>
                </div>

                {/* Free Shipping Info */}
                {subtotal < 1000 && subtotal > 0 && (
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-3 my-4">
                    <p className="text-sm text-green-700 dark:text-green-300 flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      আরও ৳{1000 - subtotal} যোগ করলে ফ্রি ডেলিভারি পাবেন!
                    </p>
                  </div>
                )}

                {/* Checkout Button */}
                <Link href="/checkout">
                  <button className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition flex items-center justify-center gap-2 shadow-md">
                    <CreditCard className="h-5 w-5" />
                    অর্ডার সম্পন্ন করুন
                  </button>
                </Link>

                {/* Continue Shopping */}
                <div className="text-center mt-4">
                  <Link
                    href="/shop/all"
                    className="text-sm text-green-600 hover:text-green-700 flex items-center justify-center gap-1 transition"
                  >
                    <ArrowRight className="h-4 w-4" />
                    কেনাকাটা চালিয়ে যান
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Shield className="h-3 w-3" />
                    নিরাপদ পেমেন্ট
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Truck className="h-3 w-3" />
                    দ্রুত ডেলিভারি
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}