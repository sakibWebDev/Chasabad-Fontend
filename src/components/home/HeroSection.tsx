// components/home/HeroSection.tsx
'use client';

import Link from 'next/link';
import { Search, Award, ArrowRight, Sprout } from 'lucide-react';
import { useState } from 'react';

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/shop?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="relative bg-gradient-to-r from-green-800 to-emerald-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full -translate-x-36 -translate-y-36" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-48 translate-y-48" />
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-sm text-white mb-6">
              <Award className="h-4 w-4" />
              <span>বিশ্বাস করুন ৫০,০০০+ কৃষকের</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              কৃষি পণ্যের{' '}
              <span className="text-emerald-300">সেরা ঠিকানা</span>
            </h1>
            
            <p className="text-emerald-100 text-base md:text-lg mb-8 max-w-lg mx-auto md:mx-0">
              মানসম্মত বীজ, চারা ও কৃষি সরঞ্জাম - সরাসরি আপনার দোরগোড়ায়
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative max-w-md mx-auto md:mx-0 mb-6">
              <input
                type="text"
                placeholder="বীজ, চারা, সরঞ্জাম সার্চ করুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-24 py-3 rounded-full bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="submit"
                className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-emerald-600 text-white rounded-full text-sm hover:bg-emerald-700 transition"
              >
                সার্চ
              </button>
            </form>
            
            {/* CTA Buttons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Link
                href="/shop"
                className="px-6 py-3 bg-white text-emerald-700 rounded-full font-semibold hover:bg-emerald-50 transition shadow-md hover:shadow-lg flex items-center gap-2"
              >
                কেনাকাটা শুরু করুন
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/expert-advice"
                className="px-6 py-3 border border-white/30 text-white rounded-full font-semibold hover:bg-white/10 transition backdrop-blur-sm"
              >
                এক্সপার্ট পরামর্শ
              </Link>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center md:justify-start gap-6 mt-8 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">১০০%</p>
                  <p className="text-emerald-200 text-xs">জৈব বীজ</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">৫০,০০০+</p>
                  <p className="text-emerald-200 text-xs">সন্তুষ্ট কৃষক</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sprout className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-white font-bold">৫০০+</p>
                  <p className="text-emerald-200 text-xs">পণ্য</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image/Illustration */}
          <div className="hidden md:block relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=500&fit=crop"
                alt="Farmer"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Sprout className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">ডেলিভারি সময়</p>
                    <p className="font-bold text-gray-800">২৪-৪৮ ঘন্টা</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}