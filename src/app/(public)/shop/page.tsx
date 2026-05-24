'use client';

import { useState, useEffect } from 'react';
import { useAppSelector } from '@/lib/hooks/useAppSelector';
import { useAppDispatch } from '@/lib/hooks/useAppDispatch';
import SeedCard from '@/components/product/SeedCard';
import { setPage, setLimit } from '@/lib/features/seeds/filterSlice';
import { fetchSeeds } from '@/lib/features/seeds/seedSlice';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronsLeft, 
  ChevronsRight,
  Sparkles,
  Leaf,
  Grid3x3,
  List,
  Package
} from 'lucide-react';

export default function SeedsPage() {
  const dispatch = useAppDispatch();
  const { items, loading, total, pagination } = useAppSelector((state) => state.seeds);
  const { viewMode, page, limit } = useAppSelector((state) => state.filters);
  const [isChangingPage, setIsChangingPage] = useState(false);

  // Use server-side pagination - no client-side slicing needed
  const actualTotal = total;
  const actualTotalPages = pagination.totalPages || Math.ceil(actualTotal / limit);
  const currentPage = page;
  const startItem = (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, actualTotal);

  console.log('Pagination Info:', {
    totalItems: actualTotal,
    itemsPerPage: limit,
    currentPage,
    totalPages: actualTotalPages,
    startItem,
    endItem,
    itemsCount: items.length,
    loading
  });

  const handlePageChange = (newPage: number) => {
    if (newPage === currentPage || newPage < 1 || newPage > actualTotalPages) return;
    
    setIsChangingPage(true);
    dispatch(setPage(newPage));
    // Don't slice here, let the API fetch new data
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLimitChange = (newLimit: number) => {
    dispatch(setLimit(newLimit));
    // setPage(1) is already handled in setLimit action
  };

  // Get visible page numbers with ellipsis
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= actualTotalPages; i++) {
      if (i === 1 || i === actualTotalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach((i) => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  // Reset isChanging when loading completes
  useEffect(() => {
    if (!loading && isChangingPage) {
      setIsChangingPage(false);
    }
  }, [loading, isChangingPage]);

  if (loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-24">
        <div className="relative">
          <div className="animate-spin rounded-full h-20 w-20 border-4 border-emerald-100 border-t-emerald-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Leaf className="h-8 w-8 text-emerald-600 animate-pulse" />
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-700 font-medium text-lg">বীজ লোড হচ্ছে...</p>
          <p className="text-gray-400 text-sm mt-1">দয়া করে একটু অপেক্ষা করুন</p>
        </div>
      </div>
    );
  }

  if (items.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-24 px-4">
        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full p-8 mb-6">
          <Sparkles className="h-16 w-16 text-gray-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-3">কোন বীজ পাওয়া যায়নি</h3>
        <p className="text-gray-500 text-center max-w-md mb-8 leading-relaxed">
          আপনার অনুসন্ধানের সাথে মিলে এমন কোনো বীজ খুঁজে পাওয়া যায়নি। 
          <br />
          অনুগ্রহ করে অন্য ক্যাটাগরি বা ফিল্টার ব্যবহার করে দেখুন।
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          পুনরায় চেষ্টা করুন
        </button>
      </div>
    );
  }

  const isChanging = loading || isChangingPage;
  const visiblePages = getVisiblePages();

  return (
    <div className="space-y-8">
      {/* Results Summary */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-gray-700 text-sm font-medium">মোট বীজ</h2>
                <span className="bg-emerald-100 text-emerald-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                  {actualTotal}
                </span>
              </div>
              <p className="text-2xl font-bold text-gray-800 mt-1">
                {actualTotal} <span className="text-sm font-normal text-gray-500">টি বীজ পাওয়া গেছে</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">
                দেখানো হচ্ছে {startItem} - {endItem} (মোট {actualTotal} টির মধ্যে)
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <div className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                <Grid3x3 className="h-4 w-4" />
              </div>
              <div className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-emerald-600' : 'text-gray-500'}`}>
                <List className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay for Page Change */}
      {isChanging && items.length > 0 && (
        <div className="fixed inset-0 bg-white/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-4 shadow-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-emerald-500 border-t-transparent"></div>
            <span className="text-sm text-gray-600">লোড হচ্ছে...</span>
          </div>
        </div>
      )}

      {/* Products Grid/List */}
      <div className={`transition-all duration-300 ${isChanging ? 'opacity-50' : 'opacity-100'}`}>
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((seed, index) => (
              <div
                key={seed.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
              >
                <SeedCard seed={seed} viewMode={viewMode} />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-5">
            {items.map((seed, index) => (
              <div
                key={seed.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 30}ms`, animationFillMode: 'backwards' }}
              >
                <SeedCard seed={seed} viewMode={viewMode} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {actualTotalPages > 1 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <div className="flex flex-col items-center gap-6">
            {/* Page Info Badge */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 px-5 py-2 rounded-full">
              <span className="text-sm font-medium text-emerald-700">
                পৃষ্ঠা {currentPage} / {actualTotalPages}
              </span>
            </div>

            {/* Pagination Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1 || isChanging}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronsLeft className="h-4 w-4" />
              </button>

              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1 || isChanging}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <div className="flex gap-2 mx-2">
                {visiblePages.map((pageNum, idx) => (
                  pageNum === '...' ? (
                    <span key={`dots-${idx}`} className="w-10 h-10 flex items-center justify-center text-gray-400">
                      ...
                    </span>
                  ) : (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum as number)}
                      disabled={isChanging}
                      className={`relative w-10 h-10 rounded-xl font-semibold transition-all duration-200 ${
                        pageNum === currentPage
                          ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-emerald-200 scale-105'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-emerald-300'
                      } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {pageNum}
                    </button>
                  )
                ))}
              </div>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === actualTotalPages || isChanging}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronRight className="h-4 w-4" />
              </button>

              <button
                onClick={() => handlePageChange(actualTotalPages)}
                disabled={currentPage === actualTotalPages || isChanging}
                className="p-2.5 rounded-xl border border-gray-200 text-gray-500 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </div>

            {/* Page Size Selector */}
            <div className="flex items-center gap-3 text-sm">
              <span className="text-gray-500">প্রতি পৃষ্ঠায় দেখান:</span>
              <div className="flex gap-2">
                {[12, 24, 48, 96].map((size) => (
                  <button
                    key={size}
                    onClick={() => handleLimitChange(size)}
                    disabled={isChanging}
                    className={`px-3 py-1.5 rounded-lg font-medium transition-all duration-200 ${
                      limit === size
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <span className="text-gray-400 text-xs ml-2">টি করে</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Stats */}
      {actualTotal > 0 && (
        <div className="bg-gray-50 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-emerald-600">{actualTotal}</span> টি বীজের মধ্যে 
            <span className="font-semibold text-emerald-600"> {endItem}</span> টি দেখানো হচ্ছে
          </p>
          <p className="text-xs text-gray-400 mt-1">
            মোট পৃষ্ঠা: {actualTotalPages} | বর্তমান পৃষ্ঠা: {currentPage} | প্রতি পৃষ্ঠায়: {limit}টি করে
          </p>
        </div>
      )}
    </div>
  );
}