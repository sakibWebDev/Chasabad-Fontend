// components/home/AppPromotion.tsx
'use client';

import Link from 'next/link';
import { Smartphone, Download, QrCode, Star, Users, ShoppingBag } from 'lucide-react';

export default function AppPromotion() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl overflow-hidden shadow-xl">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Left Content */}
            <div className="p-6 md:p-8 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-1 text-sm mb-4">
                <Smartphone className="h-4 w-4" />
                <span>মোবাইল অ্যাপ</span>
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-3">
                চাষীভাই অ্যাপ ডাউনলোড করুন
              </h2>
              <p className="text-purple-100 mb-6">
                অ্যাপে পাবেন বিশেষ ছাড়, দ্রুত অর্ডার এবং এক্সক্লুসিভ অফার
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-4 w-4" />
                  </div>
                  <span className="text-sm">সহজে অর্ডার করুন</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4" />
                  </div>
                  <span className="text-sm">এক্সক্লুসিভ অফার</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Users className="h-4 w-4" />
                  </div>
                  <span className="text-sm">কমিউনিটি সাপোর্ট</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-black rounded-lg px-4 py-2 hover:opacity-90 transition"
                >
                  <Download className="h-5 w-5" />
                  <div>
                    <p className="text-xs">GET IT ON</p>
                    <p className="font-semibold">Google Play</p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-black rounded-lg px-4 py-2 hover:opacity-90 transition"
                >
                  <Download className="h-5 w-5" />
                  <div>
                    <p className="text-xs">Download on the</p>
                    <p className="font-semibold">App Store</p>
                  </div>
                </Link>
              </div>
            </div>
            
            {/* Right - QR Code & Mockup */}
            <div className="relative p-6 md:p-8 flex items-center justify-center">
              <div className="bg-white rounded-2xl p-4 shadow-lg">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-3">
                    <QrCode className="h-20 w-20 text-gray-600" />
                  </div>
                  <p className="text-sm text-gray-600">স্ক্যান করে ডাউনলোড করুন</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}