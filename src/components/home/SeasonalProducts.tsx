// components/home/SeasonalProducts.tsx
'use client';

import Link from 'next/link';
import { Calendar, Droplet, Sun, CloudRain, ArrowRight } from 'lucide-react';

const seasonalProducts = [
  {
    season: 'বর্ষাকাল',
    icon: CloudRain,
    color: 'from-blue-500 to-cyan-500',
    products: [
      { name: 'ধান বীজ', price: 180, href: '/shop/seeds/rice' },
      { name: 'পাট বীজ', price: 120, href: '/shop/seeds/jute' },
      { name: 'ভুট্টা বীজ', price: 150, href: '/shop/seeds/corn' }
    ]
  },
  {
    season: 'শীতকাল',
    icon: Sun,
    color: 'from-orange-500 to-amber-500',
    products: [
      { name: 'গম বীজ', price: 160, href: '/shop/seeds/wheat' },
      { name: 'সরিষা বীজ', price: 90, href: '/shop/seeds/mustard' },
      { name: 'টমেটো চারা', price: 35, href: '/shop/plants/tomato' }
    ]
  },
  {
    season: 'গ্রীষ্মকাল',
    icon: Droplet,
    color: 'from-green-500 to-emerald-500',
    products: [
      { name: 'তরমুজ বীজ', price: 80, href: '/shop/seeds/watermelon' },
      { name: 'আম চারা', price: 350, href: '/shop/plants/mango' },
      { name: 'লিচু চারা', price: 280, href: '/shop/plants/litchi' }
    ]
  }
];

export default function SeasonalProducts() {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-gray-900 dark:to-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full px-4 py-1 text-sm text-emerald-700 dark:text-emerald-400 mb-3">
            <Calendar className="h-4 w-4" />
            <span>মৌসুমি পণ্য</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
            মৌসুম অনুযায়ী পণ্য
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            বর্তমান মৌসুমে যেসব পণ্য চাষ করবেন
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {seasonalProducts.map((season) => {
            const Icon = season.icon;
            return (
              <div
                key={season.season}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                <div className={`bg-gradient-to-r ${season.color} p-4 text-white`}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-6 w-6" />
                    <h3 className="text-xl font-bold">{season.season}</h3>
                  </div>
                  <p className="text-sm opacity-90 mt-1">এই মৌসুমে যেসব পণ্য লাগবে</p>
                </div>
                
                <div className="p-4">
                  <div className="space-y-3">
                    {season.products.map((product) => (
                      <Link
                        key={product.name}
                        href={product.href}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition group"
                      >
                        <span className="text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 transition">
                          {product.name}
                        </span>
                        <span className="text-emerald-600 font-semibold">৳{product.price}</span>
                      </Link>
                    ))}
                  </div>
                  
                  <Link
                    href={`/shop/seasonal/${season.season.toLowerCase()}`}
                    className="mt-4 flex items-center justify-center gap-1 text-sm text-emerald-600 hover:text-emerald-700 transition"
                  >
                    সব দেখুন
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}