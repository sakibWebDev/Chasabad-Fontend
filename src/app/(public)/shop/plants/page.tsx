// app/shop/plants/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Star, ShoppingCart, Grid3x3, List, Trees, Heart, Eye } from 'lucide-react';

const plantsData = [
  { id: 1, name: 'আম গাছের চারা (আম্রপালি)', nameEn: 'Mango Plant (Amrapali)', category: 'fruits', price: 350, originalPrice: 450, rating: 4.8, reviews: 234, stock: 45, badge: 'গ্রাফটেড', isOrganic: true },
  { id: 2, name: 'কলা গাছের চারা (জি-৯)', nameEn: 'Banana Plant (G-9)', category: 'fruits', price: 120, originalPrice: 150, rating: 4.7, reviews: 456, stock: 120, badge: 'টিস্যু কালচার', isOrganic: true },
  { id: 3, name: 'পেয়ারা চারা (এল-৪৯)', nameEn: 'Guava Plant (L-49)', category: 'fruits', price: 280, originalPrice: 350, rating: 4.6, reviews: 189, stock: 67, badge: 'বীজহীন', isOrganic: true },
  { id: 4, name: 'লেবু গাছের চারা (কাগজি)', nameEn: 'Lemon Plant (Kagzi)', category: 'fruits', price: 180, originalPrice: 220, rating: 4.5, reviews: 567, stock: 89, badge: 'সারা বছর ফলন', isOrganic: true },
  { id: 5, name: 'ডালিম গাছের চারা', nameEn: 'Pomegranate Plant', category: 'fruits', price: 320, originalPrice: 400, rating: 4.9, reviews: 234, stock: 34, badge: 'প্রিমিয়াম', isOrganic: true },
  { id: 6, name: 'টমেটো চারা (হাইব্রিড)', nameEn: 'Tomato Plant (Hybrid)', category: 'vegetables', price: 30, originalPrice: 40, rating: 4.7, reviews: 678, stock: 450, badge: 'উচ্চ ফলনশীল', isOrganic: false },
  { id: 7, name: 'মরিচ চারা (হাইব্রিড)', nameEn: 'Chili Plant (Hybrid)', category: 'vegetables', price: 25, originalPrice: 35, rating: 4.6, reviews: 456, stock: 380, badge: 'ঝাল বেশি', isOrganic: true },
  { id: 8, name: 'বেগুন চারা (পুরান)', nameEn: 'Brinjal Plant', category: 'vegetables', price: 25, originalPrice: 35, rating: 4.5, reviews: 345, stock: 290, badge: 'দেশি জাত', isOrganic: true },
  { id: 9, name: 'গোলাপ চারা (লাল)', nameEn: 'Rose Plant (Red)', category: 'flowers', price: 180, originalPrice: 220, rating: 4.8, reviews: 567, stock: 95, badge: 'সুগন্ধি', isOrganic: false },
  { id: 10, name: 'গাঁদা ফুলের চারা', nameEn: 'Marigold Plant', category: 'flowers', price: 35, originalPrice: 50, rating: 4.6, reviews: 345, stock: 210, badge: 'সারা বছর ফোটে', isOrganic: true },
];

const categories = [
  { id: 'all', name: 'সব', count: plantsData.length },
  { id: 'fruits', name: 'ফলজ গাছ', count: plantsData.filter(p => p.category === 'fruits').length },
  { id: 'vegetables', name: 'সবজির চারা', count: plantsData.filter(p => p.category === 'vegetables').length },
  { id: 'flowers', name: 'ফুলের চারা', count: plantsData.filter(p => p.category === 'flowers').length },
];

export default function PlantsPage() {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  let filteredPlants = plantsData.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (searchTerm && !p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

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
    <div>
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Trees className="h-7 w-7 text-emerald-600" />
          গাছের চারা
        </h1>
        <p className="text-gray-500 mt-1">উন্নত মানের ফলজ, সবজি ও ফুলের চারা</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-4 mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="চারা অনুসন্ধান..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              selectedCategory === cat.id
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* View Toggle */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setView('grid')} className={`p-1.5 rounded ${view === 'grid' ? 'bg-white shadow-sm' : ''}`}>
            <Grid3x3 className="h-4 w-4" />
          </button>
          <button onClick={() => setView('list')} className={`p-1.5 rounded ${view === 'list' ? 'bg-white shadow-sm' : ''}`}>
            <List className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Products Grid */}
      {filteredPlants.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-2xl">
          <Trees className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-600">কোনো চারা পাওয়া যায়নি</h3>
        </div>
      ) : view === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="relative h-36 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <Trees className="h-12 w-12 text-green-500 group-hover:scale-110 transition-transform" />
                {plant.badge && (
                  <span className="absolute top-2 left-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-600 text-white">
                    {plant.badge}
                  </span>
                )}
                {plant.isOrganic && (
                  <span className="absolute top-2 right-2 text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500 text-white">
                    জৈব
                  </span>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 line-clamp-1">{plant.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{plant.nameEn}</p>
                {renderStars(plant.rating)}
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-lg font-bold text-emerald-700">৳{plant.price}</span>
                  <span className="text-sm text-gray-400 line-through">৳{plant.originalPrice}</span>
                </div>
                <div className="text-xs text-gray-400 mt-1">স্টক: {plant.stock}টি</div>
              </div>
              <div className="px-4 pb-4">
                <button className="w-full py-2 bg-emerald-50 text-emerald-700 text-sm rounded-lg hover:bg-emerald-100 transition font-medium flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  কার্টে যোগ করুন
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredPlants.map((plant) => (
            <div key={plant.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-4 flex gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trees className="h-8 w-8 text-green-500" />
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{plant.name}</h3>
                    <p className="text-xs text-gray-500">{plant.nameEn}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Heart className="h-4 w-4" /></button>
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg"><Eye className="h-4 w-4" /></button>
                  </div>
                </div>
                {renderStars(plant.rating)}
                <div className="flex items-center gap-2 mt-1">
                  {plant.badge && <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700">{plant.badge}</span>}
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div>
                    <span className="text-lg font-bold text-emerald-700">৳{plant.price}</span>
                    <span className="text-sm text-gray-400 line-through ml-2">৳{plant.originalPrice}</span>
                  </div>
                  <button className="px-4 py-1.5 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition">
                    কার্টে যোগ করুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}