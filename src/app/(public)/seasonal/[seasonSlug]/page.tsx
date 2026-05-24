'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Sun, Droplet, Thermometer, Wind, Calendar, 
  Sprout, Leaf, CloudRain, 
  Heart, ShoppingCart, Star,
  Filter, ArrowUpDown, Search, X,
  AlertCircle, CheckCircle, Clock,
  Flower2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '@/lib/hooks/useCart';
import { useWishlist } from '@/lib/hooks/useWishlist';

// Season type definition
interface SeasonData {
  id: string;
  name: string;
  nameBn: string;
  icon: any;
  description: string;
  descriptionBn: string;
  months: string[];
  temperature: string;
  rainfall: string;
  humidity: string;
  tips: string[];
  bgColor: string;
  accentColor: string;
  textColor: string;
}

// Crop type definition
interface SeasonalCrop {
  id: string;
  name: string;
  nameBn: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  daysToHarvest: number;
  difficulty: 'easy' | 'medium' | 'hard';
  waterNeeds: 'low' | 'medium' | 'high';
  sunlight: 'full' | 'partial' | 'shade';
  season: string;
  isOrganic: boolean;
  isPopular: boolean;
  description: string;
  benefits: string[];
  tips: string[];
}

// Season data with English slugs
const seasonsData: Record<string, SeasonData> = {
  'summer': {
    id: 'summer',
    name: 'Summer',
    nameBn: 'গ্রীষ্মকাল',
    icon: Sun,
    description: 'Summer is the perfect time for heat-loving vegetables and fruits',
    descriptionBn: 'গ্রীষ্মকাল তাপ-প্রেমী সবজি ও ফলের জন্য উপযুক্ত সময়',
    months: ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়'],
    temperature: '৩০-৪০°C',
    rainfall: 'মাঝারি',
    humidity: 'উচ্চ',
    tips: [
      'সকালে বা সন্ধ্যায় পানি দিন',
      'মালচিং ব্যবহার করুন',
      'নিয়মিত আগাছা পরিষ্কার করুন',
    ],
    bgColor: 'from-orange-500 to-red-500',
    accentColor: 'text-orange-500',
    textColor: 'text-orange-600',
  },
  'monsoon': {
    id: 'monsoon',
    name: 'Monsoon',
    nameBn: 'বর্ষাকাল',
    icon: CloudRain,
    description: 'Monsoon season is ideal for water-loving crops',
    descriptionBn: 'বর্ষাকাল পানি-প্রেমী ফসলের জন্য আদর্শ',
    months: ['শ্রাবণ', 'ভাদ্র', 'আশ্বিন'],
    temperature: '২৫-৩৫°C',
    rainfall: 'উচ্চ',
    humidity: 'অতি উচ্চ',
    tips: [
      'ড্রেনেজ ব্যবস্থা ভালো রাখুন',
      'ছত্রাকনাশক ব্যবহার করুন',
      'উঁচু বেড তৈরি করুন',
    ],
    bgColor: 'from-blue-500 to-cyan-500',
    accentColor: 'text-blue-500',
    textColor: 'text-blue-600',
  },
  'autumn': {
    id: 'autumn',
    name: 'Autumn',
    nameBn: 'শরৎকাল',
    icon: Wind,
    description: 'Autumn offers moderate climate for various vegetables',
    descriptionBn: 'শরৎকাল নাতিশীতোষ্ণ আবহাওয়া প্রদান করে',
    months: ['কার্তিক', 'অগ্রহায়ণ'],
    temperature: '২০-৩০°C',
    rainfall: 'স্বল্প',
    humidity: 'মাঝারি',
    tips: [
      'নিয়মিত বাতাস চলাচল নিশ্চিত করুন',
      'জৈব সার ব্যবহার করুন',
      'ফসল ঘূর্ণন অনুশীলন করুন',
    ],
    bgColor: 'from-yellow-500 to-amber-500',
    accentColor: 'text-yellow-500',
    textColor: 'text-yellow-600',
  },
  'late-autumn': {
    id: 'late-autumn',
    name: 'Late Autumn',
    nameBn: 'হেমন্তকাল',
    icon: Leaf,
    description: 'Late autumn is perfect for leafy vegetables',
    descriptionBn: 'হেমন্তকাল পাতা সবজির জন্য উপযুক্ত',
    months: ['অগ্রহায়ণ', 'পৌষ'],
    temperature: '১৫-২৫°C',
    rainfall: 'স্বল্প',
    humidity: 'নিম্ন',
    tips: [
      'সকালের শিশির উপকারী',
      'পর্যাপ্ত পানি নিশ্চিত করুন',
      'পোকামাকড় নিয়ন্ত্রণ করুন',
    ],
    bgColor: 'from-green-500 to-emerald-500',
    accentColor: 'text-green-500',
    textColor: 'text-green-600',
  },
  'winter': {
    id: 'winter',
    name: 'Winter',
    nameBn: 'শীতকাল',
    icon: Thermometer,
    description: 'Winter is best for a wide variety of vegetables and fruits',
    descriptionBn: 'শীতকাল বিভিন্ন সবজি ও ফলের জন্য সর্বোত্তম',
    months: ['মাঘ', 'ফাল্গুন'],
    temperature: '১০-২০°C',
    rainfall: 'অতি স্বল্প',
    humidity: 'নিম্ন',
    tips: [
      'সকালের রোদে গাছ রাখুন',
      'রাতে ঢেকে দিন',
      'জৈব মালচ ব্যবহার করুন',
    ],
    bgColor: 'from-indigo-500 to-purple-500',
    accentColor: 'text-indigo-500',
    textColor: 'text-indigo-600',
  },
  'spring': {
    id: 'spring',
    name: 'Spring',
    nameBn: 'বসন্তকাল',
    icon: Flower2,
    description: 'Spring is the season of new growth and flowering plants',
    descriptionBn: 'বসন্ত নতুন বৃদ্ধি ও ফুলের ঋতু',
    months: ['চৈত্র'],
    temperature: '২৫-৩৫°C',
    rainfall: 'স্বল্প',
    humidity: 'মাঝারি',
    tips: [
      'নতুন চারা রোপণ করুন',
      'ফুল ফোটানোর জন্য সার দিন',
      'নিয়মিত ছাঁটাই করুন',
    ],
    bgColor: 'from-pink-500 to-rose-500',
    accentColor: 'text-pink-500',
    textColor: 'text-pink-600',
  },
};

// Mock seasonal crops data
const seasonalCrops: SeasonalCrop[] = [
  {
    id: '1',
    name: 'গ্রীষ্মকালীন টমেটো',
    nameBn: 'Summer Tomato',
    image: '/images/tomato.jpg',
    price: 45,
    originalPrice: 60,
    rating: 4.8,
    daysToHarvest: 65,
    difficulty: 'medium',
    waterNeeds: 'high',
    sunlight: 'full',
    season: 'summer',
    isOrganic: true,
    isPopular: true,
    description: 'উচ্চ ফলনশীল গ্রীষ্মকালীন টমেটো বীজ',
    benefits: ['রোগ প্রতিরোধ ক্ষমতা', 'উচ্চ ফলন', 'তাপ সহনশীল'],
    tips: ['নিয়মিত পানি দিন', 'সাপোর্ট দিন', 'নিয়মিত সার দিন'],
  },
  {
    id: '2',
    name: 'গ্রীষ্মকালীন বেগুন',
    nameBn: 'Summer Brinjal',
    image: '/images/brinjal.jpg',
    price: 35,
    rating: 4.6,
    daysToHarvest: 75,
    difficulty: 'easy',
    waterNeeds: 'medium',
    sunlight: 'full',
    season: 'summer',
    isOrganic: true,
    isPopular: true,
    description: 'দীর্ঘস্থায়ী গ্রীষ্মকালীন বেগুন',
    benefits: ['দীর্ঘ ফলন সময়', 'পোকার আক্রমণ কম', 'সুস্বাদু'],
    tips: ['পানির পরিমাণ নিয়ন্ত্রণ করুন', 'নিয়মিত ফল সংগ্রহ করুন'],
  },
  {
    id: '3',
    name: 'গ্রীষ্মকালীন করলা',
    nameBn: 'Summer Bitter Gourd',
    image: '/images/bitter-gourd.jpg',
    price: 40,
    originalPrice: 55,
    rating: 4.5,
    daysToHarvest: 60,
    difficulty: 'easy',
    waterNeeds: 'medium',
    sunlight: 'full',
    season: 'summer',
    isOrganic: false,
    isPopular: false,
    description: 'উচ্চ পুষ্টিগুণ সমৃদ্ধ করলা',
    benefits: ['ডায়াবেটিস নিয়ন্ত্রণে', 'রোগ প্রতিরোধে', 'তাপ সহনশীল'],
    tips: ['পর্যাপ্ত সূর্যের আলো দিন', 'নিয়মিত ছাঁটাই করুন'],
  },
  {
    id: '4',
    name: 'গ্রীষ্মকালীন মরিচ',
    nameBn: 'Summer Chilli',
    image: '/images/chilli.jpg',
    price: 30,
    rating: 4.7,
    daysToHarvest: 70,
    difficulty: 'medium',
    waterNeeds: 'low',
    sunlight: 'full',
    season: 'summer',
    isOrganic: true,
    isPopular: true,
    description: 'অত্যন্ত ঝাল ও সুগন্ধি মরিচ',
    benefits: ['ভিটামিন সি সমৃদ্ধ', 'মসলা হিসেবে ব্যবহার', 'দীর্ঘস্থায়ী'],
    tips: ['সামান্য পানি প্রয়োজন', 'সরাসরি রোদে রাখুন'],
  },
  {
    id: '5',
    name: 'বর্ষাকালীন ধান',
    nameBn: 'Monsoon Rice',
    image: '/images/rice.jpg',
    price: 65,
    originalPrice: 80,
    rating: 4.7,
    daysToHarvest: 120,
    difficulty: 'medium',
    waterNeeds: 'high',
    sunlight: 'full',
    season: 'monsoon',
    isOrganic: true,
    isPopular: true,
    description: 'বর্ষাকালীন উচ্চ ফলনশীল ধান',
    benefits: ['বৃষ্টি নির্ভর', 'উচ্চ ফলন', 'রোগ প্রতিরোধী'],
    tips: ['ড্রেনেজ ভালো রাখুন', 'নিয়মিত আগাছা পরিষ্কার করুন'],
  },
  {
    id: '6',
    name: 'বর্ষাকালীন পাট',
    nameBn: 'Monsoon Jute',
    image: '/images/jute.jpg',
    price: 55,
    rating: 4.5,
    daysToHarvest: 100,
    difficulty: 'easy',
    waterNeeds: 'high',
    sunlight: 'full',
    season: 'monsoon',
    isOrganic: true,
    isPopular: false,
    description: 'উচ্চ মানের বর্ষাকালীন পাট',
    benefits: ['আঁশ সমৃদ্ধ', 'পরিবেশ বান্ধব', 'লাভজনক'],
    tips: ['জমিতে পানি রাখুন', 'নিয়মিত পরিচর্যা করুন'],
  },
];

// Difficulty badge component
const DifficultyBadge = ({ difficulty }: { difficulty: string }) => {
  const config = {
    easy: { label: 'সহজ', color: 'bg-green-100 text-green-700' },
    medium: { label: 'মাঝারি', color: 'bg-yellow-100 text-yellow-700' },
    hard: { label: 'কঠিন', color: 'bg-red-100 text-red-700' },
  };
  const { label, color } = config[difficulty as keyof typeof config] || config.easy;
  return <span className={`px-2 py-1 rounded-full text-xs font-medium ${color}`}>{label}</span>;
};

// Water needs badge
const WaterBadge = ({ needs }: { needs: string }) => {
  const config = {
    low: { label: 'অল্প পানি', icon: Droplet, color: 'text-blue-500' },
    medium: { label: 'মাঝারি পানি', icon: Droplet, color: 'text-blue-600' },
    high: { label: 'প্রচুর পানি', icon: Droplet, color: 'text-blue-700' },
  };
  const { label, icon: Icon, color } = config[needs as keyof typeof config] || config.medium;
  return (
    <div className="flex items-center gap-1 text-xs">
      <Icon className={`h-3 w-3 ${color}`} />
      <span>{label}</span>
    </div>
  );
};

// Sunlight badge
const SunlightBadge = ({ sunlight }: { sunlight: string }) => {
  const config = {
    full: { label: 'পূর্ণ রোদ', icon: Sun, color: 'text-orange-500' },
    partial: { label: 'আংশিক রোদ', icon: Sun, color: 'text-yellow-500' },
    shade: { label: 'ছায়া', icon: Sun, color: 'text-gray-500' },
  };
  const { label, icon: Icon, color } = config[sunlight as keyof typeof config] || config.full;
  return (
    <div className="flex items-center gap-1 text-xs">
      <Icon className={`h-3 w-3 ${color}`} />
      <span>{label}</span>
    </div>
  );
};

export default function SeasonalPage() {
  const params = useParams();
  const router = useRouter();
  // IMPORTANT: Get seasonSlug from params
  const seasonSlug = params.seasonSlug as string;
  
  const [crops, setCrops] = useState<SeasonalCrop[]>([]);
  const [filteredCrops, setFilteredCrops] = useState<SeasonalCrop[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  
  // Get season data based on slug
  const season = seasonsData[seasonSlug];
  
  // Debug logging
  useEffect(() => {
    console.log('Season Slug:', seasonSlug);
    console.log('Season Data:', season);
    console.log('All Seasons:', Object.keys(seasonsData));
  }, [seasonSlug, season]);
  
  useEffect(() => {
    if (seasonSlug && seasonsData[seasonSlug]) {
      setLoading(true);
      setTimeout(() => {
        const seasonCrops = seasonalCrops.filter(crop => crop.season === seasonSlug);
        console.log('Filtered Crops:', seasonCrops);
        setCrops(seasonCrops);
        setFilteredCrops(seasonCrops);
        setLoading(false);
      }, 500);
    } else if (seasonSlug && !seasonsData[seasonSlug]) {
      setLoading(false);
    }
  }, [seasonSlug]);
  
  // Filter and sort crops
  useEffect(() => {
    let result = [...crops];
    
    // Search filter
    if (searchTerm) {
      result = result.filter(crop => 
        crop.name.includes(searchTerm) || 
        crop.nameBn.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Difficulty filter
    if (filterDifficulty !== 'all') {
      result = result.filter(crop => crop.difficulty === filterDifficulty);
    }
    
    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'harvest':
        result.sort((a, b) => a.daysToHarvest - b.daysToHarvest);
        break;
      default:
        result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
    }
    
    setFilteredCrops(result);
  }, [crops, searchTerm, filterDifficulty, sortBy]);
  
  const handleAddToCart = (crop: SeasonalCrop) => {
    addToCart({
      id: crop.id,
      name: crop.name,
      price: crop.price,
      image: crop.image,
    }, 1, true);
  };
  
  const handleToggleWishlist = (crop: SeasonalCrop) => {
    if (isInWishlist(crop.id)) {
      removeFromWishlist(crop.id);
      toast.success(`${crop.name} উইশলিস্ট থেকে সরানো হয়েছে`);
    } else {
      addToWishlist({
        id: crop.id,
        name: crop.name,
        price: crop.price,
        image: crop.image,
      });
      toast.success(`${crop.name} উইশলিস্টে যোগ হয়েছে`);
    }
  };
  
  const formatPrice = (price: number) => `৳${price}`;
  
  // If season not found
  if (!season && !loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">ঋতু পাওয়া যায়নি</h2>
          <p className="text-gray-500 mb-6">"{seasonSlug}" নামে কোন ঋতু নেই</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/seasonal/summer">
              <button className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                গ্রীষ্মকাল
              </button>
            </Link>
            <Link href="/seasonal/monsoon">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                বর্ষাকাল
              </button>
            </Link>
            <Link href="/seasonal/autumn">
              <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                শরৎকাল
              </button>
            </Link>
            <Link href="/seasonal/winter">
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
                শীতকাল
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  if (!season) {
    return null;
  }
  
  const SeasonIcon = season.icon;
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${season.bgColor} text-white`}>
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-2 mb-4">
              <SeasonIcon className="h-12 w-12" />
              <h1 className="text-3xl md:text-5xl font-bold">{season.nameBn}</h1>
            </div>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl">
              {season.descriptionBn}
            </p>
            <div className="flex flex-wrap gap-4 mt-8 justify-center">
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{season.months.join(', ')}</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4" />
                  <span>{season.temperature}</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur rounded-lg px-4 py-2">
                <div className="flex items-center gap-2">
                  <CloudRain className="h-4 w-4" />
                  <span>{season.rainfall}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Season Tips Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className={`text-xl font-bold mb-4 ${season.textColor}`}>
            {season.nameBn} চাষাবাদের বিশেষ টিপস
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {season.tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl">
                <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder={`${season.nameBn} এর উপযোগী ফসল খুঁজুন...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </div>
            </div>
            
            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition"
            >
              <Filter className="h-4 w-4" />
              <span>ফিল্টার</span>
            </button>
            
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="popular">জনপ্রিয়তা</option>
                <option value="price-low">দাম: কম থেকে বেশি</option>
                <option value="price-high">দাম: বেশি থেকে কম</option>
                <option value="rating">রেটিং</option>
                <option value="harvest">ফসল সংগ্রহ সময়</option>
              </select>
            </div>
            
            {/* View Toggle */}
            <div className="flex gap-1 border border-gray-200 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400'}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400'}`}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden mt-4 pt-4 border-t"
              >
                <div className="flex flex-wrap gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">চাষের জটিলতা</label>
                    <div className="flex gap-2">
                      {['all', 'easy', 'medium', 'hard'].map((dif) => (
                        <button
                          key={dif}
                          onClick={() => setFilterDifficulty(dif)}
                          className={`px-3 py-1 rounded-full text-sm transition ${
                            filterDifficulty === dif
                              ? 'bg-emerald-600 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {dif === 'all' ? 'সব' : dif === 'easy' ? 'সহজ' : dif === 'medium' ? 'মাঝারি' : 'কঠিন'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Results Count */}
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            <span className="font-bold">{filteredCrops.length}</span> টি ফসল পাওয়া গেছে
          </p>
          {filteredCrops.length !== crops.length && (
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterDifficulty('all');
              }}
              className="text-sm text-emerald-600 hover:text-emerald-700"
            >
              সব ফিল্টার রিসেট করুন
            </button>
          )}
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
          </div>
        )}
        
        {/* Crops Grid/List */}
        {!loading && (
          <>
            {filteredCrops.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl">
                <Sprout className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">কোন ফসল পাওয়া যায়নি</h3>
                <p className="text-gray-500">অনুগ্রহ করে অন্য ফিল্টার ব্যবহার করে দেখুন</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {filteredCrops.map((crop, idx) => (
                  <motion.div
                    key={crop.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 ${
                      viewMode === 'grid' ? 'overflow-hidden' : 'flex gap-4 p-4'
                    }`}
                  >
                    {/* Image */}
                    <div className={`relative ${viewMode === 'grid' ? 'aspect-square' : 'w-32 h-32 flex-shrink-0'} bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center overflow-hidden`}>
                      <Sprout className="h-16 w-16 text-green-500" />
                      {crop.isPopular && (
                        <span className="absolute top-2 left-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
                          জনপ্রিয়
                        </span>
                      )}
                      {crop.isOrganic && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                          জৈব
                        </span>
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 ${viewMode === 'grid' ? 'p-4' : 'py-2'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <Link href={`/product/${crop.id}`}>
                            <h3 className="font-semibold text-gray-800 hover:text-emerald-600 transition line-clamp-1">
                              {crop.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-500">{crop.nameBn}</p>
                        </div>
                        <button
                          onClick={() => handleToggleWishlist(crop)}
                          className="p-1 hover:bg-gray-100 rounded-full transition"
                        >
                          <Heart className={`h-5 w-5 ${isInWishlist(crop.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < Math.floor(crop.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">{crop.rating}</span>
                      </div>
                      
                      {/* Specs */}
                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="h-3 w-3" />
                          <span>{crop.daysToHarvest} দিনে ফসল</span>
                        </div>
                        <DifficultyBadge difficulty={crop.difficulty} />
                        <WaterBadge needs={crop.waterNeeds} />
                        <SunlightBadge sunlight={crop.sunlight} />
                      </div>
                      
                      {/* Price and Actions */}
                      <div className="flex items-center justify-between mt-3 pt-3 border-t">
                        <div>
                          <span className="text-xl font-bold text-emerald-600">{formatPrice(crop.price)}</span>
                          {crop.originalPrice && (
                            <span className="text-sm text-gray-400 line-through ml-2">{formatPrice(crop.originalPrice)}</span>
                          )}
                        </div>
                        <button
                          onClick={() => handleAddToCart(crop)}
                          className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-sm hover:bg-emerald-700 transition flex items-center gap-1"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          কার্টে যোগ করুন
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Seasonal Calendar */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-6">
          <h2 className={`text-xl font-bold mb-6 ${season.textColor}`}>
            ঋতুভিত্তিক চাষাবাদ ক্যালেন্ডার
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {season.months.map((month, idx) => (
              <div key={idx} className="text-center p-4 bg-gray-50 rounded-xl">
                <Calendar className="h-6 w-6 text-emerald-600 mx-auto mb-2" />
                <p className="font-semibold">{month}</p>
                <p className="text-xs text-gray-500 mt-1">চাষের উপযুক্ত সময়</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}