'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Sprout, Trees, Tractor, Leaf, Apple, Flower, 
  Wheat, Search, Grid3x3, List, SlidersHorizontal,
  Flame, Carrot, Coffee, Droplet, Sun, X,
  Truck, Star, TrendingUp, Shield, Zap,
  Calendar, Award, Package, Filter, Layers
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { fetchAllCounts } from '@/lib/features/seeds/countSlice';
import { 
  toggleSeason, 
  toggleDifficulty, 
  setPriceRange,
  toggleOrganic,
  toggleExport,
  setSearch,
  setViewMode,
  resetFilters,
  setCategory,
  setLimit
} from '@/lib/features/seeds/filterSlice';
import { fetchSeeds } from '@/lib/features/seeds/seedSlice';
import { fetchAllSeasons } from '@/lib/features/season/seasonSlice';

// ক্যাটাগরি ডেফিনেশন - কাউন্ট পরে আপডেট হবে
const categories = [
  { name: 'সব বীজ', nameEn: 'All Seeds', icon: Sprout, value: '', color: 'from-emerald-500 to-green-500', bgColor: 'bg-emerald-50' },
  { name: 'ধান বীজ', nameEn: 'Rice Seeds', icon: Wheat, value: 'ধান', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50' },
  { name: 'সবজি বীজ', nameEn: 'Vegetable Seeds', icon: Carrot, value: 'সবজি', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50' },
  { name: 'ফলের বীজ', nameEn: 'Fruit Seeds', icon: Apple, value: 'ফল', color: 'from-red-500 to-pink-500', bgColor: 'bg-red-50' },
  { name: 'ফুলের বীজ', nameEn: 'Flower Seeds', icon: Flower, value: 'ফুল', color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50' },
  { name: 'মসলা বীজ', nameEn: 'Spice Seeds', icon: Flame, value: 'মসলা', color: 'from-orange-500 to-red-500', bgColor: 'bg-orange-50' },
  { name: 'তেলবীজ', nameEn: 'Oil Seeds', icon: Coffee, value: 'তেলবীজ', color: 'from-amber-500 to-yellow-500', bgColor: 'bg-amber-50' },
  { name: 'ডাল বীজ', nameEn: 'Pulse Seeds', icon: Sprout, value: 'ডাল', color: 'from-lime-500 to-green-500', bgColor: 'bg-lime-50' },
  { name: 'ঔষধি বীজ', nameEn: 'Medicinal Seeds', icon: Leaf, value: 'ঔষধি', color: 'from-teal-500 to-cyan-500', bgColor: 'bg-teal-50' },
];

const sidebarNav = [
  { name: 'সব পণ্য', nameEn: 'All Products', href: '/shop', icon: Grid3x3 },
  { name: 'বীজ', nameEn: 'Seeds', href: '/shop/seeds', icon: Sprout },
  { name: 'চারা', nameEn: 'Seedlings', href: '/shop/plants', icon: Trees },
  { name: 'সরঞ্জাম', nameEn: 'Tools', href: '/shop/tools', icon: Tractor },
];

const difficulties = [
  { name: 'সহজ', nameEn: 'Easy', value: 'EASY', icon: Sun, color: 'text-green-500', bgColor: 'bg-green-50' },
  { name: 'মধ্যম', nameEn: 'Medium', value: 'MEDIUM', icon: Droplet, color: 'text-yellow-500', bgColor: 'bg-yellow-50' },
  { name: 'কঠিন', nameEn: 'Hard', value: 'HARD', icon: Zap, color: 'text-red-500', bgColor: 'bg-red-50' },
];

const priceRanges = [
  { label: 'সব দাম', min: 0, max: 100000, icon: '💰' },
  { label: '৫০০ টাকার নিচে', min: 0, max: 500, icon: '💵' },
  { label: '৫০০ - ১০০০ টাকা', min: 500, max: 1000, icon: '💵💵' },
  { label: '১০০০ - ২০০০ টাকা', min: 1000, max: 2000, icon: '💰💰' },
  { label: '২০০০ - ৫০০০ টাকা', min: 2000, max: 5000, icon: '💎' },
  { label: '৫০০০ টাকার উপরে', min: 5000, max: 100000, icon: '👑' },
];

const pageSizes = [12, 24, 48, 96];

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
  const { data: counts, loading: countsLoading } = useAppSelector((state) => state.counts);
  const { list: seasons, loading: seasonsLoading } = useAppSelector((state) => state.seasons);
  console.log('Current Filters:', seasons );

  // Fetch seasons on mount
  useEffect(() => {
    dispatch(fetchAllSeasons());
  }, [dispatch]);

  // Fetch counts on mount
  useEffect(() => {
    dispatch(fetchAllCounts());
  }, [dispatch]);

  // Fetch seeds on filter change
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(fetchSeeds({
        category: category || undefined,
        season_id: season_id.length > 0 ? season_id : undefined,
        difficulty: difficulty.length > 0 ? difficulty : undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice === 100000 ? undefined : maxPrice,
        organic: organic || undefined,
        export: exportPotential || undefined,
        search: search || undefined,
        page,
        limit,
      }));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, category, season_id, difficulty, minPrice, maxPrice, organic, exportPotential, search, page, limit]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setSearch(searchInput));
  };

  const handleCategoryClick = (categoryValue: string) => {
    dispatch(setCategory(categoryValue));
  };

  const activeFiltersCount = [
    category ? 1 : 0,
    season_id.length,
    difficulty.length,
    organic ? 1 : 0,
    exportPotential ? 1 : 0,
    minPrice > 0 ? 1 : 0,
    search ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  // Get dynamic counts
  const getCategoryCount = (categoryValue: string) => {
    if (!counts?.categories) return 0;
    if (categoryValue === '') return counts.sidebar?.seeds || 0;
    return counts.categories[categoryValue as keyof typeof counts.categories] || 0;
  };

  const getSidebarCount = (itemName: string) => {
    if (!counts?.sidebar) return 0;
    if (itemName === 'সব পণ্য') return counts.sidebar.allProducts;
    if (itemName === 'বীজ') return counts.sidebar.seeds;
    if (itemName === 'চারা') return counts.sidebar.plants;
    if (itemName === 'সরঞ্জাম') return counts.sidebar.tools;
    return 0;
  };

  const getDifficultyCount = (difficultyValue: string) => {
    if (!counts?.difficulties) return 0;
    return counts.difficulties[difficultyValue as keyof typeof counts.difficulties] || 0;
  };

  const getSeasonCount = (seasonId: string) => {
    if (!counts?.seasons) return 0;
    if (Array.isArray(counts.seasons)) {
      const season = counts.seasons.find((s: any) => s.id === seasonId || s.seasonId === seasonId);
      return season?.count || 0;
    }
    return counts.seasons[seasonId as keyof typeof counts.seasons] || 0;
  };

  // Helper function to get season icon
  const getSeasonIcon = (season: any): string => {
    if (season.icon) return season.icon;
    const iconMap: Record<string, string> = {
      'গ্রীষ্মকাল': '☀️',
      'শীতকাল': '❄️',
      'বর্ষাকাল': '☔',
      'বসন্ত': '🌸',
      'হেমন্ত': '🍂',
    };
    return iconMap[season.title] || '🌾';
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Hero Section */}
        <div className="mb-8 bg-gradient-to-r from-emerald-600 to-green-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3">🌾 চাষী ভাই বীজ ভান্ডার</h1>
            <p className="text-emerald-100 text-sm md:text-base max-w-2xl mb-6">
              উন্নত মানের বীজ, সেরা ফলন - আপনার কৃষির সেরা সঙ্গী।
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Package className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xl font-bold">{counts?.sidebar?.allProducts || 0}</div>
                <div className="text-xs text-emerald-100">মোট পণ্য</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Award className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xl font-bold">৫০০০+</div>
                <div className="text-xs text-emerald-100">সন্তুষ্ট ক্রেতা</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Truck className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xl font-bold">৬৪</div>
                <div className="text-xs text-emerald-100">জেলা সার্ভিস</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Star className="h-5 w-5 mx-auto mb-1" />
                <div className="text-xl font-bold">৪.৯</div>
                <div className="text-xs text-emerald-100">ক্রেতা রেটিং</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 space-y-4">
              
              {/* Search Box */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Search className="h-4 w-4 text-emerald-600" />
                  বীজ খুঁজুন
                </h3>
                <form onSubmit={handleSearchSubmit}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="বীজের নাম বা বৈশিষ্ট্য..."
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </form>
              </div>

              {/* Navigation Categories with Dynamic Counts */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Layers className="h-4 w-4 text-emerald-600" />
                  ক্যাটাগরি
                </h3>
                <div className="space-y-1">
                  {sidebarNav.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    const itemCount = getSidebarCount(item.name);
                    
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                          isActive ? 'bg-emerald-50 text-emerald-600 font-medium' : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          ({countsLoading ? '...' : itemCount})
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* বীজের ধরণ with Dynamic Counts */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Sprout className="h-4 w-4 text-emerald-600" />
                  বীজের ধরণ
                </h3>
                <div className="space-y-1 max-h-96 overflow-y-auto custom-scrollbar">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = category === cat.value;
                    const catCount = getCategoryCount(cat.value);
                    
                    return (
                      <button
                        key={cat.name}
                        onClick={() => handleCategoryClick(cat.value)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-all ${
                          isActive ? `${cat.bgColor} text-emerald-600 font-medium border-l-4 border-emerald-500` : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className="h-3.5 w-3.5" />
                          <span>{cat.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          ({countsLoading ? '...' : catCount})
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* মৌসুম ফিল্টার with Dynamic Counts */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  মৌসুম
                </h3>
                
                  <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                    {seasons.map((season) => {
                      const seasonCount = getSeasonCount(season.id);
                      const isSelected = season_id?.includes(season.id) || false;
                      const icon = getSeasonIcon(season);
                      
                      return (
                        <label 
                          key={season.id} 
                          className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-200 ${
                            isSelected ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'hover:bg-gray-50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                dispatch(toggleSeason(season.id));
                              }}
                              className="rounded border-gray-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                            />
                            <span className="text-sm text-gray-700">
                              <span className="mr-2">{icon}</span>
                              {season.title}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            ({countsLoading ? '...' : seasonCount})
                          </span>
                        </label>
                      );
                    })}
                  </div>
                
              </div>

              {/* চাষের অসুবিধা with Dynamic Counts */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  চাষের অসুবিধা
                </h3>
                <div className="space-y-2">
                  {difficulties.map((diff) => {
                    const diffCount = getDifficultyCount(diff.value);
                    return (
                      <label key={diff.value} className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition ${difficulty.includes(diff.value) ? diff.bgColor : 'hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={difficulty.includes(diff.value)}
                            onChange={() => dispatch(toggleDifficulty(diff.value))}
                            className="rounded border-gray-300 text-emerald-600"
                          />
                          <diff.icon className={`h-4 w-4 ${diff.color}`} />
                          <span className="text-sm text-gray-700">{diff.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">
                          ({countsLoading ? '...' : diffCount})
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* দামের রেঞ্জ */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Droplet className="h-4 w-4 text-emerald-600" />
                  দামের রেঞ্জ
                </h3>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.label} className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition hover:bg-gray-50 ${minPrice === range.min && maxPrice === range.max ? 'bg-emerald-50' : ''}`}>
                      <input
                        type="radio"
                        name="priceRange"
                        checked={minPrice === range.min && maxPrice === range.max}
                        onChange={() => dispatch(setPriceRange({ min: range.min, max: range.max }))}
                        className="rounded border-gray-300 text-emerald-600"
                      />
                      <span className="text-sm text-gray-700">{range.icon} {range.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* বিশেষ ট্যাগ */}
              <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
                <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-emerald-600" />
                  বিশেষ ট্যাগ
                </h3>
                <div className="space-y-2">
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${organic ? 'bg-green-50' : 'hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={organic} onChange={() => dispatch(toggleOrganic())} className="rounded border-gray-300 text-emerald-600" />
                    <span className="text-sm text-gray-700">🌱 অর্গানিক সার্টিফাইড</span>
                  </label>
                  <label className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition ${exportPotential ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <input type="checkbox" checked={exportPotential} onChange={() => dispatch(toggleExport())} className="rounded border-gray-300 text-emerald-600" />
                    <span className="text-sm text-gray-700">🚢 এক্সপোর্ট গ্ৰেড</span>
                  </label>
                </div>
              </div>

              {/* Reset Filter Button */}
              <button onClick={() => dispatch(resetFilters())} className="w-full py-2.5 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:from-gray-200 hover:to-gray-300 transition shadow-sm">
                🗑️ সব ফিল্টার রিসেট
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 border border-gray-100">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
                    <button onClick={() => dispatch(setViewMode('grid'))} className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button onClick={() => dispatch(setViewMode('list'))} className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-500 border-t-transparent"></div>
                      <span className="text-sm text-gray-500">লোড হচ্ছে...</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-emerald-500" />
                      <span className="text-sm text-gray-600">
                        <span className="font-semibold text-emerald-600">{total}</span> টি বীজ পাওয়া গেছে
                      </span>
                      {total > 0 && (
                        <span className="text-xs text-gray-400">
                          (দেখানো হচ্ছে {startItem} - {endItem})
                        </span>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-xs text-gray-500">প্রতি পৃষ্ঠা:</span>
                    <div className="flex gap-1">
                      {pageSizes.map(size => (
                        <button key={size} onClick={() => dispatch(setLimit(size))} className={`px-2.5 py-1 text-xs rounded transition ${limit === size ? 'bg-emerald-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <button onClick={() => setMobileFilterOpen(true)} className="lg:hidden flex items-center gap-2 px-3 py-1.5 border rounded-lg text-sm hover:bg-gray-50 transition">
                    <Filter className="h-4 w-4" />
                    ফিল্টার
                    {activeFiltersCount > 0 && (
                      <span className="bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {!loading && children}
          </main>
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 10px; }
      `}</style>
    </div>
  );
}