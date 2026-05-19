// app/expert-advice/page.tsx
// কৃষি বিশেষজ্ঞদের পরামর্শ, টিপস ও ট্রিকস - একটি সুন্দর ও রেসপনসিভ পেজ

'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Calendar,
  Droplets,
  Sprout,
  MapPin,
  Search,
  Menu,
  X,
  ChevronRight,
  Lightbulb,
  Shield,
  Thermometer,
  Wheat,
  Bug,
  FlaskRound,
  Users,
  Award,
  Clock,
  MessageCircle,
  ThumbsUp,
  Share2,
  Bookmark,
  Filter,
  TrendingUp,
  CloudRain,
  Sun,
  Snowflake,
  Tractor,
  Sprout as Seedling,
  GraduationCap,
  Video,
  FileText,
  ExternalLink,
  Star,
  Eye
} from 'lucide-react';

// --- Types ---
interface ExpertTip {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: 'soil' | 'water' | 'pest' | 'climate' | 'fertilizer' | 'technology' | 'general';
  categoryBn: string;
  icon: React.ElementType;
  author: {
    name: string;
    title: string;
    avatar: string;
    rating: number;
  };
  date: string;
  readTime: number;
  likes: number;
  views: number;
  isBookmarked?: boolean;
  tags: string[];
  image?: string;
}

interface Expert {
  id: number;
  name: string;
  title: string;
  specialization: string;
  experience: number;
  avatar: string;
  rating: number;
  totalConsultations: number;
  available: boolean;
}

// --- Mock Data ---
const expertTips: ExpertTip[] = [
  {
    id: 1,
    title: "জৈব পদ্ধতিতে মাটির উর্বরতা বৃদ্ধি",
    summary: "রাসায়নিক সার ছাড়াই মাটির স্বাস্থ্য ভালো রাখার উপায়",
    content: "মাটির উর্বরতা বৃদ্ধির জন্য জৈব পদ্ধতি সবচেয়ে কার্যকর। কম্পোস্ট, ভার্মিকম্পোস্ট, সবুজ সার এবং ফসলের আবর্তন通过这些方法可以显著提高土壤的有机质含量...",
    category: "soil",
    categoryBn: "মাটি ব্যবস্থাপনা",
    icon: Leaf,
    author: {
      name: "ড. মো. রফিকুল ইসলাম",
      title: "মৃত্তিকা বিজ্ঞানী",
      avatar: "/avatars/dr-rafiq.jpg",
      rating: 4.9
    },
    date: "২ দিন আগে",
    readTime: 8,
    likes: 245,
    views: 1250,
    tags: ["জৈব সার", "মাটি", "কম্পোস্ট"],
    image: "/images/soil-health.jpg"
  },
  {
    id: 2,
    title: "ড্রিপ ইরিগেশনের মাধ্যমে পানি সাশ্রয়",
    summary: "ফসলের জন্য সঠিক পরিমাণ পানি ব্যবহারের কৌশল",
    content: "ড্রিপ ইরিগেশন সিস্টেম ব্যবহার করলে ৬০% পর্যন্ত পানি সাশ্রয় হয়। এই পদ্ধতিতে সরাসরি গাছের গোড়ায় পানি পৌঁছায়...",
    category: "water",
    categoryBn: "পানি ব্যবস্থাপনা",
    icon: Droplets,
    author: {
      name: "কৃষিবিদ সেলিম রেজা",
      title: "সেচ বিশেষজ্ঞ",
      avatar: "/avatars/selim.jpg",
      rating: 4.8
    },
    date: "৫ দিন আগে",
    readTime: 6,
    likes: 189,
    views: 890,
    tags: ["সেচ", "পানি সাশ্রয়", "ড্রিপ"],
    image: "/images/drip-irrigation.jpg"
  },
  {
    id: 3,
    title: "ধান চাষের আধুনিক পদ্ধতি",
    summary: "শস্য আবর্তন ও উন্নত প্রযুক্তি ব্যবহার করে ধানের ফলন বৃদ্ধি",
    content: "এসআরআর পদ্ধতি (System of Rice Intensification) ব্যবহার করলে ধানের ফলন ৫০% পর্যন্ত বৃদ্ধি পায়...",
    category: "technology",
    categoryBn: "আধুনিক প্রযুক্তি",
    icon: TrendingUp,
    author: {
      name: "কৃষিবিদ নাসরিন সুলতানা",
      title: "ধান গবেষক",
      avatar: "/avatars/nasrin.jpg",
      rating: 4.7
    },
    date: "১ সপ্তাহ আগে",
    readTime: 10,
    likes: 320,
    views: 2100,
    tags: ["ধান", "এসআরআর", "উন্নত চাষ"],
    image: "/images/rice-farming.jpg"
  },
  {
    id: 4,
    title: "জলবায়ু পরিবর্তনে ফসল সুরক্ষা",
    summary: "প্রতিকূল আবহাওয়ায় ফসল রক্ষার কার্যকর কৌশল",
    content: "জলবায়ু পরিবর্তনের কারণে কৃষি খাত চরম ঝুঁকিতে। তবে কিছু স্মার্ট কৌশল অবলম্বন করে ফসল রক্ষা করা সম্ভব...",
    category: "climate",
    categoryBn: "জলবায়ু অভিযোজন",
    icon: Thermometer,
    author: {
      name: "ড. জাহাঙ্গীর আলম",
      title: "জলবায়ু বিশেষজ্ঞ",
      avatar: "/avatars/jahangir.jpg",
      rating: 4.9
    },
    date: "৩ দিন আগে",
    readTime: 7,
    likes: 178,
    views: 950,
    tags: ["জলবায়ু", "প্রতিকূলতা", "সুরক্ষা"],
    image: "/images/climate-change.jpg"
  },
  {
    id: 5,
    title: "সমন্বিত বালাই ব্যবস্থাপনা (IPM)",
    summary: "রাসায়নিক পেস্টিসাইড কমানোর প্রাকৃতিক উপায়",
    content: "আইপিএম পদ্ধতিতে পোকামাকড় দমনের জন্য জৈবিক, যান্ত্রিক ও সাংস্কৃতিক পদ্ধতি ব্যবহার করা হয়...",
    category: "pest",
    categoryBn: "বালাই ব্যবস্থাপনা",
    icon: Bug,
    author: {
      name: "কৃষিবিদ আবুল কালাম",
      title: "কীটতত্ত্ববিদ",
      avatar: "/avatars/kalam.jpg",
      rating: 4.8
    },
    date: "৪ দিন আগে",
    readTime: 9,
    likes: 210,
    views: 1100,
    tags: ["আইপিএম", "বালাই", "জৈবিক দমন"],
    image: "/images/ipm.jpg"
  },
  {
    id: 6,
    title: "ভার্মিকম্পোস্ট তৈরির সহজ পদ্ধতি",
    summary: "কম খরচে জৈব সার তৈরি করে লাভবান হওয়ার উপায়",
    content: "কেঁচো সার তৈরি খুবই সহজ ও লাভজনক। এটি মাটির উর্বরতা বাড়ায় এবং ফসলের ফলন বৃদ্ধি করে...",
    category: "fertilizer",
    categoryBn: "সার ব্যবস্থাপনা",
    icon: FlaskRound,
    author: {
      name: "কৃষিবিদ ফাতেমা বেগম",
      title: "জৈব কৃষি বিশেষজ্ঞ",
      avatar: "/avatars/fatema.jpg",
      rating: 4.9
    },
    date: "৬ দিন আগে",
    readTime: 5,
    likes: 198,
    views: 980,
    tags: ["ভার্মিকম্পোস্ট", "জৈব সার", "কেঁচো সার"],
    image: "/images/vermicompost.jpg"
  },
  {
    id: 7,
    title: "মৌসুমি সবজি চাষ ক্যালেন্ডার",
    summary: "কখন কোন সবজি চাষ করবেন - একটি নির্দেশিকা",
    content: "মৌসুমি সবজি চাষের সঠিক সময় জানা খুবই জরুরি। এটি ফসলের ফলন ও গুণগত মান নির্ধারণ করে...",
    category: "general",
    categoryBn: "সাধারণ পরামর্শ",
    icon: Calendar,
    author: {
      name: "কৃষিবিদ হাসান মিয়া",
      title: "সবজি বিশেষজ্ঞ",
      avatar: "/avatars/hasan.jpg",
      rating: 4.7
    },
    date: "১ সপ্তাহ আগে",
    readTime: 4,
    likes: 156,
    views: 720,
    tags: ["সবজি", "মৌসুমি", "ক্যালেন্ডার"],
    image: "/images/vegetable-calendar.jpg"
  },
  {
    id: 8,
    title: "ন্যানো প্রযুক্তি ও কৃষি",
    summary: "ফসল উৎপাদনে ন্যানো প্রযুক্তির ব্যবহার ও সম্ভাবনা",
    content: "ন্যানো প্রযুক্তি কৃষি খাতে নতুন দিগন্ত উন্মোচন করেছে। ন্যানো সার ও ন্যানো পেস্টিসাইড ব্যবহার...",
    category: "technology",
    categoryBn: "আধুনিক প্রযুক্তি",
    icon: Tractor,
    author: {
      name: "ড. মাহমুদ হাসান",
      title: "ন্যানো প্রযুক্তি বিশেষজ্ঞ",
      avatar: "/avatars/mahmud.jpg",
      rating: 4.9
    },
    date: "২ সপ্তাহ আগে",
    readTime: 12,
    likes: 267,
    views: 1450,
    tags: ["ন্যানো", "উন্নত প্রযুক্তি", "ন্যানো সার"],
    image: "/images/nanotech.jpg"
  }
];

const featuredExperts: Expert[] = [
  {
    id: 1,
    name: "ড. মো. রফিকুল ইসলাম",
    title: "মৃত্তিকা বিজ্ঞানী",
    specialization: "মাটি ও সার ব্যবস্থাপনা",
    experience: 18,
    avatar: "/avatars/dr-rafiq.jpg",
    rating: 4.9,
    totalConsultations: 1250,
    available: true
  },
  {
    id: 2,
    name: "কৃষিবিদ নাসরিন সুলতানা",
    title: "ধান গবেষক",
    specialization: "ধান ও প্রযুক্তি",
    experience: 12,
    avatar: "/avatars/nasrin.jpg",
    rating: 4.8,
    totalConsultations: 980,
    available: true
  },
  {
    id: 3,
    name: "কৃষিবিদ আবুল কালাম",
    title: "কীটতত্ত্ববিদ",
    specialization: "পোকামাকড় দমন ও আইপিএম",
    experience: 15,
    avatar: "/avatars/kalam.jpg",
    rating: 4.7,
    totalConsultations: 890,
    available: false
  },
  {
    id: 4,
    name: "ড. জাহাঙ্গীর আলম",
    title: "জলবায়ু বিশেষজ্ঞ",
    specialization: "জলবায়ু অভিযোজন",
    experience: 20,
    avatar: "/avatars/jahangir.jpg",
    rating: 4.9,
    totalConsultations: 2100,
    available: true
  }
];

// Category colors
const getCategoryColor = (category: ExpertTip['category']) => {
  switch(category) {
    case 'soil': return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'water': return 'bg-sky-100 text-sky-800 border-sky-200';
    case 'pest': return 'bg-red-100 text-red-800 border-red-200';
    case 'climate': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'fertilizer': return 'bg-teal-100 text-teal-800 border-teal-200';
    case 'technology': return 'bg-purple-100 text-purple-800 border-purple-200';
    default: return 'bg-gray-100 text-gray-700 border-gray-200';
  }
};

const getCategoryIcon = (category: ExpertTip['category']) => {
  switch(category) {
    case 'soil': return Leaf;
    case 'water': return Droplets;
    case 'pest': return Bug;
    case 'climate': return Thermometer;
    case 'fertilizer': return FlaskRound;
    case 'technology': return Tractor;
    default: return Lightbulb;
  }
};

export default function ExpertAdvicePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookmarkedTips, setBookmarkedTips] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'সব', icon: Lightbulb },
    { id: 'soil', name: 'মাটি', icon: Leaf },
    { id: 'water', name: 'পানি', icon: Droplets },
    { id: 'pest', name: 'বালাই', icon: Bug },
    { id: 'climate', name: 'জলবায়ু', icon: Thermometer },
    { id: 'fertilizer', name: 'সার', icon: FlaskRound },
    { id: 'technology', name: 'প্রযুক্তি', icon: Tractor }
  ];

  const filteredTips = expertTips.filter(tip => {
    const matchesCategory = selectedCategory === 'all' || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tip.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tip.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const toggleBookmark = (id: number) => {
    setBookmarkedTips(prev => 
      prev.includes(id) ? prev.filter(tipId => tipId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-lime-50 to-green-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-green-700 to-emerald-500 p-1.5 rounded-xl">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">এগ্রি<span className="text-emerald-700">ভিশন</span></h1>
              <p className="text-[10px] text-gray-500 hidden sm:block">বিশেষজ্ঞ পরামর্শ</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-xs text-gray-500 bg-emerald-100 px-3 py-1 rounded-full">
              <MapPin className="h-3 w-3" />
              <span>বাংলাদেশ</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-emerald-100 text-emerald-700"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-emerald-200 text-sm font-medium mb-3">
              <Award className="h-5 w-5" />
              <span>বিশেষজ্ঞদের পরামর্শ</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              কৃষি বিশেষজ্ঞদের <br />
              <span className="text-emerald-200">সরাসরি পরামর্শ</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl">
              কৃষি বিশেষজ্ঞদের কাছ থেকে জানুন আধুনিক চাষাবাদ পদ্ধতি, 
              ফসলের যত্ন ও রোগবালাই প্রতিকারের কার্যকর টিপস।
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-emerald-700 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition flex items-center gap-2">
                বিশেষজ্ঞদের সাথে কথা বলুন <MessageCircle className="h-4 w-4" />
              </button>
              <button className="border border-white/30 px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition flex items-center gap-2">
                ভিডিও টিউটোরিয়াল <Video className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute bottom-0 right-0 opacity-10">
          <Sprout className="h-64 w-64" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          {/* Search Bar */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="পরামর্শ, টিপস বা ট্যাগ অনুসন্ধান..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-emerald-50 border border-emerald-200'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tips Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Main Tips - Left 2 columns */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTips.map((tip) => {
                const CategoryIcon = getCategoryIcon(tip.category);
                return (
                  <article
                    key={tip.id}
                    className="group bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Image placeholder */}
                    <div className="h-40 bg-gradient-to-r from-emerald-100 to-teal-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <CategoryIcon className="h-16 w-16 text-emerald-300" />
                      </div>
                    </div>
                    
                    <div className="p-5 flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${getCategoryColor(tip.category)}`}>
                          {tip.categoryBn}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleBookmark(tip.id)}
                            className="text-gray-400 hover:text-emerald-600 transition"
                          >
                            <Bookmark className={`h-4 w-4 ${bookmarkedTips.includes(tip.id) ? 'fill-emerald-600 text-emerald-600' : ''}`} />
                          </button>
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {tip.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {tip.summary}
                      </p>
                      
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tip.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                            <span className="text-xs font-bold text-emerald-600">{tip.author.name.charAt(0)}</span>
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-gray-700">{tip.author.name}</p>
                            <p className="text-[10px] text-gray-400">{tip.author.title}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {tip.readTime} মিনিট
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" /> {tip.views}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <button className="mx-5 mb-4 bg-emerald-50 text-emerald-700 text-sm font-medium py-2 rounded-xl flex items-center justify-center gap-2 group-hover:bg-emerald-100 transition">
                      বিস্তারিত পড়ুন <ChevronRight className="h-4 w-4" />
                    </button>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Sidebar - Right column */}
          <div className="space-y-6">
            {/* Featured Experts */}
            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  বিশেষজ্ঞ কৃষিবিদগণ
                </h3>
                <p className="text-emerald-100 text-xs mt-0.5">সরাসরি পরামর্শ নিন</p>
              </div>
              <div className="divide-y divide-emerald-50">
                {featuredExperts.map((expert) => (
                  <div key={expert.id} className="p-4 hover:bg-emerald-50/30 transition">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-emerald-600">{expert.name.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-semibold text-gray-800 text-sm">{expert.name}</h4>
                          <div className="flex items-center gap-0.5">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            <span className="text-xs text-gray-600">{expert.rating}</span>
                          </div>
                        </div>
                        <p className="text-xs text-emerald-600">{expert.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{expert.specialization}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-gray-400">{expert.experience} বছর অভিজ্ঞতা</span>
                          {expert.available ? (
                            <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">অনলাইন</span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">অফলাইন</span>
                          )}
                        </div>
                        <button className="w-full mt-2 text-xs bg-emerald-50 text-emerald-700 py-1.5 rounded-lg hover:bg-emerald-100 transition font-medium">
                          পরামর্শ নিন
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-gray-50 text-center">
                <button className="text-xs text-emerald-600 font-medium flex items-center justify-center gap-1 mx-auto">
                  আরও বিশেষজ্ঞ দেখুন <ChevronRight className="h-3 w-3" />
                </button>
              </div>
            </div>

            {/* Popular Tips */}
            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
              <div className="bg-emerald-50 px-5 py-3 border-b border-emerald-100">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-emerald-600" />
                  জনপ্রিয় পরামর্শ
                </h3>
              </div>
              <div className="divide-y divide-emerald-50">
                {expertTips.slice(0, 4).map((tip) => (
                  <div key={tip.id} className="p-3 hover:bg-emerald-50/30 transition cursor-pointer">
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{tip.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {tip.views}</span>
                      <span className="flex items-center gap-1"><ThumbsUp className="h-3 w-3" /> {tip.likes}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consultation Banner */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white text-center">
              <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-80" />
              <h4 className="font-bold text-lg mb-1">প্রয়োজনে সরাসরি পরামর্শ</h4>
              <p className="text-sm text-white/80 mb-3">বিশেষজ্ঞদের সাথে সরাসরি কথা বলুন</p>
              <button className="bg-white text-orange-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-50 transition">
                বুক করুন
              </button>
            </div>

            {/* Resources */}
            <div className="bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
              <div className="px-5 py-3 bg-emerald-50/50 border-b border-emerald-100">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  দরকারী রিসোর্স
                </h3>
              </div>
              <div className="p-4 space-y-2">
                <a href="#" className="flex items-center justify-between text-sm text-gray-700 hover:text-emerald-600 py-1">
                  <span>📘 কৃষি ক্যালেন্ডার</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="flex items-center justify-between text-sm text-gray-700 hover:text-emerald-600 py-1">
                  <span>📗 ফসলের রোগবালাই হ্যান্ডবুক</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="flex items-center justify-between text-sm text-gray-700 hover:text-emerald-600 py-1">
                  <span>📙 সার প্রয়োগ গাইডলাইন</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a href="#" className="flex items-center justify-between text-sm text-gray-700 hover:text-emerald-600 py-1">
                  <span>🎥 ভিডিও টিউটোরিয়াল</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-emerald-700 to-teal-700 rounded-2xl p-6 text-white text-center">
          <GraduationCap className="h-12 w-12 mx-auto mb-3 opacity-80" />
          <h3 className="text-xl font-bold mb-2">নিয়মিত কৃষি টিপস পান</h3>
          <p className="text-emerald-100 mb-4 max-w-md mx-auto">
            সপ্তাহে ২ বার বিশেষজ্ঞদের টিপস ও পরামর্শ সরাসরি আপনার ইনবক্সে
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল"
              className="flex-1 px-4 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-emerald-700 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition">
              সাবস্ক্রাইব
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/50 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5 text-emerald-500" />
            <span>© 2025 এগ্রিভিশন — বিশেষজ্ঞ কৃষি পরামর্শ প্ল্যাটফর্ম</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-emerald-700">গোপনীয়তা</a>
            <a href="#" className="hover:text-emerald-700">শর্তাবলী</a>
            <a href="#" className="hover:text-emerald-700">যোগাযোগ</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}