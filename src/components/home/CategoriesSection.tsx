// components/home/CategoriesSection.tsx
'use client';

import Link from 'next/link';
import { Sprout, Trees, Tractor, Leaf, Apple, Flower, Wheat, ArrowRight } from 'lucide-react';

const categories = [
  {
    name: 'বীজ',
    nameBn: 'বীজ',
    href: '/shop/seeds',
    icon: Sprout,
    color: 'from-green-500 to-emerald-500',
    count: 150,
    subcategories: ['সবজি বীজ', 'ফলের বীজ', 'ফুলের বীজ']
  },
  {
    name: 'চারা',
    nameBn: 'চারা',
    href: '/shop/plants',
    icon: Trees,
    color: 'from-emerald-500 to-teal-500',
    count: 85,
    subcategories: ['ফলের চারা', 'বনসাই', 'সাজসজ্জা']
  },
  {
    name: 'সরঞ্জাম',
    nameBn: 'সরঞ্জাম',
    href: '/shop/tools',
    icon: Tractor,
    color: 'from-amber-500 to-orange-500',
    count: 45,
    subcategories: ['সেচ সরঞ্জাম', 'কাটিং টুলস', 'সার']
  }
];

const seedCategories = [
  { name: 'সবজি বীজ', href: '/shop/seeds/vegetables', count: 45, icon: Leaf },
  { name: 'ফলের বীজ', href: '/shop/seeds/fruits', count: 28, icon: Apple },
  { name: 'ফুলের বীজ', href: '/shop/seeds/flowers', count: 32, icon: Flower },
  { name: 'শস্য বীজ', href: '/shop/seeds/grains', count: 15, icon: Wheat }
];

export default function CategoriesSection() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              জনপ্রিয় ক্যাটাগরি
            </h2>
            <Link href="/shop/all" className="text-emerald-600 text-sm flex items-center gap-1 hover:gap-2 transition">
              সব দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r p-6 text-white hover:shadow-xl transition-all hover:-translate-y-1"
                  style={{ backgroundImage: `linear-gradient(to right, ${cat.color})` }}
                >
                  <div className="relative z-10">
                    <Icon className="h-12 w-12 mb-3 opacity-90 group-hover:scale-110 transition-transform" />
                    <h3 className="text-2xl font-bold mb-1">{cat.nameBn}</h3>
                    <p className="text-white/80 text-sm mb-3">{cat.count}+ পণ্য</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.subcategories.map((sub) => (
                        <span key={sub} className="text-xs bg-white/20 rounded-full px-2 py-1">
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              );
            })}
          </div>
        </div>
        
        {/* Seed Subcategories */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              বীজের ক্যাটাগরি
            </h2>
            <Link href="/shop/seeds" className="text-emerald-600 text-sm flex items-center gap-1 hover:gap-2 transition">
              সব বীজ দেখুন <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {seedCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  href={cat.href}
                  className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-md transition border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="w-14 h-14 mx-auto bg-emerald-50 dark:bg-emerald-900/20 rounded-full flex items-center justify-center mb-3 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/40 transition">
                    <Icon className="h-7 w-7 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <h3 className="font-medium text-gray-800 dark:text-white">{cat.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{cat.count}টি পণ্য</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}