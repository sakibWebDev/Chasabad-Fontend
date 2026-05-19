'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sprout, Trees, Tractor, Leaf, Apple, Flower, 
  Wheat, Search, Grid3x3, List, SlidersHorizontal,
  Flame, Carrot, Coffee, Droplet, Sun, X
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { 
  toggleSeason, 
  toggleDifficulty, 
  setPriceRange,
  toggleOrganic,
  toggleExport,
  setSearch,
  setViewMode,
  resetFilters,
  setCategory
} from '@/lib/features/seeds/filterSlice';
import { fetchSeeds } from '@/lib/features/seeds/seedSlice';

// Categories
export const categories = [
  { name: 'সব বীজ', href: '/shop/seeds', count: 63, icon: Sprout, value: '' },
  { name: 'ধান বীজ', href: '/shop/seeds/rice', count: 12, icon: Wheat, value: 'ধান' },
  { name: 'সবজি বীজ', href: '/shop/seeds/vegetables', count: 18, icon: Carrot, value: 'সবজি' },
  { name: 'ফলের বীজ', href: '/shop/seeds/fruits', count: 8, icon: Apple, value: 'ফল' },
  { name: 'ফুলের বীজ', href: '/shop/seeds/flowers', count: 5, icon: Flower, value: 'ফুল' },
  { name: 'মসলা বীজ', href: '/shop/seeds/spices', count: 6, icon: Flame, value: 'মসলা' },
  { name: 'তেলবীজ', href: '/shop/seeds/oilseeds', count: 5, icon: Coffee, value: 'তেলবীজ' },
  { name: 'ডাল বীজ', href: '/shop/seeds/pulses', count: 4, icon: Sprout, value: 'ডাল' },
  { name: 'ঔষধি বীজ', href: '/shop/seeds/medicinal', count: 3, icon: Leaf, value: 'ঔষধি' },
];

const sidebarNav = [
  { name: 'সব পণ্য', href: '/shop', icon: Grid3x3 },
  { name: 'বীজ', href: '/shop/seeds', icon: Sprout },
  { name: 'চারা', href: '/shop/plants', icon: Trees },
  { name: 'সরঞ্জাম', href: '/shop/tools', icon: Tractor },
];

const difficulties = [
  { name: 'সহজ', value: 'EASY', count: 35, icon: Sun },
  { name: 'মধ্যম', value: 'MEDIUM', count: 20, icon: Droplet },
  { name: 'কঠিন', value: 'HARD', count: 8, icon: Sprout },
];

const seasons = [
  { id: 'cmp7dzoca000080tn2obx5yxz', name: 'গ্রীষ্মকাল', icon: '☀️', count: 30 },
  { id: 'cmp7e0u4v000380tn5kvhnzb4', name: 'শীতকাল', icon: '❄️', count: 15 },
  { id: 'cmp7e1dy6000580tnm4gli454', name: 'বর্ষাকাল', icon: '☔', count: 18 },
];

interface ShopLayoutProps {
  children: React.ReactNode;
}

export default function ShopLayout({ children }: ShopLayoutProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  
  const { season_id, difficulty, organic, exportPotential, search, minPrice, maxPrice, page, limit, viewMode, category } = useAppSelector((state) => state.filters);
  const { total, loading } = useAppSelector((state) => state.seeds);

  useEffect(() => {
    dispatch(fetchSeeds({
      category: category || undefined,
      minPrice: minPrice || undefined,
      maxPrice: maxPrice === 100000 ? undefined : maxPrice,
      organic: organic || undefined,
      export: exportPotential || undefined,
      search: search || undefined,
      page,
      limit,
    }));
  }, [dispatch, category, minPrice, maxPrice, organic, exportPotential, search, page, limit]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(searchInput));
  };

  const handleCategoryClick = (categoryValue: string) => {
    dispatch(setCategory(categoryValue));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-emerald-600 transition">হোম</Link>
            <span className="text-gray-400">/</span>
            <Link href="/shop" className="text-gray-500 hover:text-emerald-600 transition">দোকান</Link>
            {pathname.includes('/seeds') && (
              <>
                <span className="text-gray-400">/</span>
                <span className="text-emerald-600 font-medium">বীজ</span>
              </>
            )}
          </div>
        </div>

        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">🌾 চাষী ভাই বীজ ভান্ডার</h1>
          <p className="text-emerald-100">উন্নত মানের বীজ, সেরা ফলন - আপনার কৃষির সেরা সঙ্গী</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-24 space-y-5">
              
              {/* Search Box */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="বীজ খুঁজুন..."
                      className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </form>
              </div>

              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Grid3x3 className="h-4 w-4 text-emerald-600" />
                  ক্যাটাগরি
                </h3>
                <div className="space-y-1">
                  {sidebarNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* বীজের ধরণ */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-emerald-600" />
                  বীজের ধরণ
                </h3>
                <div className="space-y-2">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = category === cat.value;
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.value)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">({cat.count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* মৌসুম ফিল্টার */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sun className="h-4 w-4 text-emerald-600" />
                  মৌসুম
                </h3>
                <div className="space-y-2">
                  {seasons.map((season) => (
                    <label key={season.id} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={season_id.includes(season.id)}
                          onChange={() => dispatch(toggleSeason(season.id))}
                          className="rounded border-gray-300 text-emerald-600"
                        />
                        <span className="text-sm text-gray-700">{season.icon} {season.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">({season.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* চাষের অসুবিধা */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sprout className="h-4 w-4 text-emerald-600" />
                  চাষের অসুবিধা
                </h3>
                <div className="space-y-2">
                  {difficulties.map((diff) => (
                    <label key={diff.value} className="flex items-center justify-between px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={difficulty.includes(diff.value)}
                          onChange={() => dispatch(toggleDifficulty(diff.value))}
                          className="rounded border-gray-300 text-emerald-600"
                        />
                        <span className="text-sm text-gray-700">{diff.name}</span>
                      </div>
                      <span className="text-xs text-gray-400">({diff.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* দামের রেঞ্জ */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-emerald-600" />
                  দামের রেঞ্জ
                </h3>
                <div className="space-y-2">
                  {[
                    { label: '৫০০ টাকার নিচে', min: 0, max: 500 },
                    { label: '৫০০ - ১০০০ টাকা', min: 500, max: 1000 },
                    { label: '১০০০ - ২০০০ টাকা', min: 1000, max: 2000 },
                    { label: '২০০০ - ৫০০০ টাকা', min: 2000, max: 5000 },
                    { label: '৫০০০ টাকার উপরে', min: 5000, max: 100000 },
                  ].map((range) => (
                    <label key={range.label} className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="priceRange"
                        checked={minPrice === range.min && maxPrice === range.max}
                        onChange={() => dispatch(setPriceRange({ min: range.min, max: range.max }))}
                        className="rounded border-gray-300 text-emerald-600"
                      />
                      <span className="text-sm text-gray-700">{range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* বিশেষ ট্যাগ */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-emerald-600" />
                  বিশেষ ট্যাগ
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={organic} onChange={() => dispatch(toggleOrganic())} className="rounded border-gray-300 text-emerald-600" />
                    <span className="text-sm text-gray-700">🍃 অর্গানিক সার্টিফাইড</span>
                  </label>
                  <label className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input type="checkbox" checked={exportPotential} onChange={() => dispatch(toggleExport())} className="rounded border-gray-300 text-emerald-600" />
                    <span className="text-sm text-gray-700">🚀 এক্সপোর্ট গ্ৰেড</span>
                  </label>
                </div>
              </div>

              {/* Reset Filter Button */}
              <button onClick={() => dispatch(resetFilters())} className="w-full py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
                ফিল্টার রিসেট
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => dispatch(setViewMode('grid'))} className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => dispatch(setViewMode('list'))} className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  {loading ? (
                    <span className="text-sm text-gray-500 ml-2">লোড হচ্ছে...</span>
                  ) : (
                    <span className="text-sm text-gray-500 ml-2">{total}টি বীজ পাওয়া গেছে</span>
                  )}
                </div>
                <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm">
                  <SlidersHorizontal className="h-4 w-4" />
                  ফিল্টার
                </button>
              </div>
            </div>

            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {[1,2,3,4,5,6].map(i => (
                  <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            )}

            {!loading && <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5' : 'space-y-4'}>{children}</div>}
          </main>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      {mobileFilterOpen && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={() => setMobileFilterOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-xl z-50 p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-4 pb-3 border-b">
              <h3 className="font-bold">ফিল্টার</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 hover:bg-gray-100 rounded-lg">✕</button>
            </div>
            {/* Mobile filters here - same as desktop sidebar */}
            <button onClick={() => { dispatch(resetFilters()); setMobileFilterOpen(false); }} className="w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">
              ফলাফল দেখুন
            </button>
          </div>
        </>
      )}
    </div>
  );
}