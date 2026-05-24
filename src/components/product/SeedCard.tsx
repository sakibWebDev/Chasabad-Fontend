'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Seed } from '@/lib/features/seeds/seedSlice';
import { 
  Leaf, TrendingUp, Clock, Droplet, Sun, Star, 
  ShoppingCart, Heart, Eye, Zap, Award, 
} from 'lucide-react';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';
import toast from 'react-hot-toast';

interface SeedCardProps {
  seed: Seed;
  viewMode?: 'grid' | 'list';
}

export default function SeedCard({ seed, viewMode = 'grid' }: SeedCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { isInWishlist, toggleItem } = useWishlist();

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case 'EASY': return 'bg-green-100 text-green-700 border-green-200';
      case 'MEDIUM': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'HARD': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case 'EASY': return <Sun className="h-3 w-3" />;
      case 'MEDIUM': return <Droplet className="h-3 w-3" />;
      case 'HARD': return <Zap className="h-3 w-3" />;
      default: return null;
    }
  };

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty?.toUpperCase()) {
      case 'EASY': return 'সহজ';
      case 'MEDIUM': return 'মধ্যম';
      case 'HARD': return 'কঠিন';
      default: return difficulty;
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isInCart(seed.id)) {
      addToCart({ 
        id: seed.id, 
        name: seed.name, 
        price: seed.seed_cost, 
        image: seed.image 
      });
      toast.success(`${seed.name} কার্টে যোগ হয়েছে!`, {
        icon: '🛒',
        duration: 2000,
      });
    } else {
      toast.error('পণ্যটি ইতিমধ্যে কার্টে আছে', {
        icon: '⚠️',
        duration: 2000,
      });
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    toggleItem({ 
      id: seed.id, 
      name: seed.name, 
      price: seed.seed_cost, 
      originalPrice: seed.market_price, 
      category: seed.category, 
      image: seed.image 
    });
    
    if (!isInWishlist(seed.id)) {
      toast.success(`${seed.name} উইশলিস্টে যোগ হয়েছে!`, {
        icon: '❤️',
        duration: 2000,
      });
    } else {
      toast.success(`${seed.name} উইশলিস্ট থেকে সরানো হয়েছে`, {
        icon: '💔',
        duration: 2000,
      });
    }
  };

  if (viewMode === 'list') {
    return (
      <Link href={`/product/${seed.id}`} className="block group">
        <div className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
          <div className="flex flex-col sm:flex-row">
            <div className="relative sm:w-56 h-56 bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-pulse">
                    <Leaf className="h-12 w-12 text-emerald-300" />
                  </div>
                </div>
              )}
              {seed.image ? (
                <img
                  src={seed.image}
                  alt={seed.name}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Leaf className="h-16 w-16 text-emerald-400" />
                </div>
              )}
              
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                {seed.organic_certified && (
                  <span className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs px-2.5 py-1 rounded-full shadow-lg">
                    <Leaf className="h-3 w-3" />
                    অর্গানিক
                  </span>
                )}
                {seed.export_potential && (
                  <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full shadow-lg">
                    <TrendingUp className="h-3 w-3" />
                    এক্সপোর্ট
                  </span>
                )}
              </div>
              
              <button
                onClick={handleToggleWishlist}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform"
              >
                <Heart className={`h-4 w-4 transition-colors ${
                  isInWishlist(seed.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
                }`} />
              </button>
            </div>
            
            <div className="flex-1 p-5">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition text-lg">
                    {seed.name}
                  </h3>
                  <p className="text-sm text-gray-500">{seed.name_en}</p>
                  <p className="text-xs text-gray-400 italic mt-1">{seed.scientific_name}</p>
                </div>
                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-emerald-600">৳{seed.seed_cost}</div>
                  {seed.market_price > seed.seed_cost && (
                    <div className="text-xs text-gray-400 line-through">৳{seed.market_price}</div>
                  )}
                  <div className="text-xs text-gray-500">প্রতি কেজি</div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                  🌾 {seed.category}
                </span>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs border ${getDifficultyColor(seed.difficulty)}`}>
                  {getDifficultyIcon(seed.difficulty)}
                  {getDifficultyText(seed.difficulty)}
                </span>
                {seed.maturity_days && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                    <Clock className="h-3 w-3" />
                    {seed.maturity_days} দিন
                  </span>
                )}
              </div>
              
              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {seed.special_notes_bn || seed.special_notes || `${seed.name} - উন্নত মানের বীজ, সঠিক পরিচর্যায় অধিক ফলন নিশ্চিত।`}
              </p>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`h-3.5 w-3.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">(১২৩ জন)</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={isInCart(seed.id)}
                    className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                      isInCart(seed.id)
                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                        : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm hover:shadow'
                    }`}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    {isInCart(seed.id) ? 'যুক্ত হয়েছে' : 'কার্টে যোগ করুন'}
                  </button>
                  <button className="px-3 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:border-emerald-300 hover:text-emerald-600 transition text-sm font-medium flex items-center gap-1">
                    <Eye className="h-3.5 w-3.5" />
                    বিস্তারিত
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Grid View
  return (
    <Link href={`/product/${seed.id}`} className="block group">
      <div 
        className="bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-52 bg-gradient-to-br from-emerald-50 to-green-50 overflow-hidden">
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse">
                <Leaf className="h-12 w-12 text-emerald-300" />
              </div>
            </div>
          )}
          {seed.image ? (
            <img
              src={seed.image}
              alt={seed.name}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Leaf className="h-16 w-16 text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
            </div>
          )}
          
          <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
          
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {seed.organic_certified && (
              <span className="inline-flex items-center gap-1.5 bg-green-600 text-white text-xs px-2.5 py-1 rounded-full shadow-lg">
                <Leaf className="h-3 w-3" />
                অর্গানিক
              </span>
            )}
            {seed.export_potential && (
              <span className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs px-2.5 py-1 rounded-full shadow-lg">
                <TrendingUp className="h-3 w-3" />
                এক্সপোর্ট
              </span>
            )}
          </div>
          
          <div className={`absolute bottom-3 left-3 transition-all duration-300 ${
            isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'
          }`}>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm ${getDifficultyColor(seed.difficulty)}`}>
              {getDifficultyIcon(seed.difficulty)}
              {getDifficultyText(seed.difficulty)}
            </span>
          </div>
          
          <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
            isHovered ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'
          }`}>
            <button
              onClick={handleToggleWishlist}
              className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <Heart className={`h-4 w-4 transition-colors ${
                isInWishlist(seed.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`} />
            </button>
            <button
              onClick={handleAddToCart}
              className="p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
            >
              <ShoppingCart className="h-4 w-4 text-emerald-600" />
            </button>
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 group-hover:text-emerald-600 transition line-clamp-1">
                {seed.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-1">{seed.name_en}</p>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-emerald-600">৳{seed.seed_cost}</div>
              {seed.market_price > seed.seed_cost && (
                <div className="text-xs text-gray-400 line-through">৳{seed.market_price}</div>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {seed.maturity_days && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                <Clock className="h-3 w-3" />
                {seed.maturity_days} দিন
              </span>
            )}
            {seed.yield_min_kg && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-gray-100 text-gray-600">
                <Award className="h-3 w-3" />
                {seed.yield_min_kg}-{seed.yield_max_kg} kg
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1 mt-3 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-3 w-3 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">(৪.৮)</span>
            <div className="flex-1" />
            <span className="text-xs text-emerald-600 font-medium group-hover:underline">
              বিস্তারিত →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}