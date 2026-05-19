// app/admin/expert-advice/page.tsx
'use client';

import { useState } from 'react';
import {
  MessageSquare,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  ChevronDown,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  AlertCircle,
  ThumbsUp,
  ThumbsDown,
  User,
  Tag,
  Clock,
  ArrowUpRight,
  Share2,
  Bookmark,
  MoreVertical,
  Star,
  Users,
  TrendingUp,
  Award,
  Zap
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ExpertAdvicePage() {
  const [view, setView] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock Expert Advice Data
  const adviceList = [
    {
      id: 1,
      title: "10 Tips for Organic Tomato Farming",
      excerpt: "Learn the best practices for growing organic tomatoes in Bangladesh climate...",
      category: "Farming Tips",
      author: {
        name: "Dr. Md. Rahman",
        avatar: "/avatars/doctor1.jpg",
        credentials: "PhD in Agriculture",
        expertise: "Vegetable Farming"
      },
      status: "published",
      publishedAt: "2024-01-15",
      readTime: "5 min read",
      likes: 234,
      views: 1234,
      comments: 45,
      tags: ["Organic", "Tomatoes", "Farming Tips"],
      image: "/images/advice/tomato-farming.jpg",
      featured: true,
      popular: true
    },
    {
      id: 2,
      title: "Seasonal Pest Control Guide",
      excerpt: "Natural methods to protect your crops from common pests throughout the seasons...",
      category: "Pest Control",
      author: {
        name: "Prof. Sultana Begum",
        avatar: "/avatars/doctor2.jpg",
        credentials: "Plant Protection Specialist",
        expertise: "Pest Management"
      },
      status: "published",
      publishedAt: "2024-01-10",
      readTime: "8 min read",
      likes: 189,
      views: 987,
      comments: 32,
      tags: ["Pest Control", "Natural Methods", "Seasons"],
      image: "/images/advice/pest-control.jpg",
      featured: false,
      popular: true
    },
    {
      id: 3,
      title: "Soil Health Improvement Techniques",
      excerpt: "Essential methods to enhance soil fertility and maintain long-term soil health...",
      category: "Soil Health",
      author: {
        name: "Dr. Karim Uddin",
        avatar: "/avatars/doctor3.jpg",
        credentials: "Soil Scientist",
        expertise: "Soil Management"
      },
      status: "published",
      publishedAt: "2024-01-05",
      readTime: "6 min read",
      likes: 312,
      views: 1567,
      comments: 67,
      tags: ["Soil Health", "Fertility", "Organic Matter"],
      image: "/images/advice/soil-health.jpg",
      featured: true,
      popular: false
    },
    {
      id: 4,
      title: "Modern Irrigation Techniques",
      excerpt: "Water-saving irrigation methods for sustainable farming in water-scarce areas...",
      category: "Water Management",
      author: {
        name: "Eng. Farida Akhter",
        avatar: "/avatars/doctor4.jpg",
        credentials: "Water Resource Engineer",
        expertise: "Irrigation Systems"
      },
      status: "draft",
      publishedAt: null,
      readTime: "4 min read",
      likes: 0,
      views: 0,
      comments: 0,
      tags: ["Irrigation", "Water Conservation", "Technology"],
      image: "/images/advice/irrigation.jpg",
      featured: false,
      popular: false
    }
  ];

  const categories = [
    { name: "All", value: "all", count: adviceList.length, icon: MessageSquare },
    { name: "Farming Tips", value: "Farming Tips", count: adviceList.filter(a => a.category === "Farming Tips").length, icon: TrendingUp },
    { name: "Pest Control", value: "Pest Control", count: adviceList.filter(a => a.category === "Pest Control").length, icon: AlertCircle },
    { name: "Soil Health", value: "Soil Health", count: adviceList.filter(a => a.category === "Soil Health").length, icon: Award },
    { name: "Water Management", value: "Water Management", count: adviceList.filter(a => a.category === "Water Management").length, icon: Zap }
  ];

  const stats = {
    total: adviceList.length,
    published: adviceList.filter(a => a.status === 'published').length,
    drafts: adviceList.filter(a => a.status === 'draft').length,
    totalViews: adviceList.reduce((acc, a) => acc + a.views, 0),
    totalLikes: adviceList.reduce((acc, a) => acc + a.likes, 0),
    avgEngagement: ((adviceList.reduce((acc, a) => acc + a.likes + a.comments, 0) / adviceList.length) || 0).toFixed(0)
  };

  const filteredAdvice = adviceList.filter(advice => {
    const matchesSearch = searchTerm === '' || 
      advice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      advice.author.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || advice.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || advice.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    if (status === 'published') {
      return (
        <span className="px-2 py-1 rounded-lg text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 flex items-center gap-1">
          <CheckCircle className="h-3 w-3" />
          Published
        </span>
      );
    }
    return (
      <span className="px-2 py-1 rounded-lg text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300 flex items-center gap-1">
        <Clock className="h-3 w-3" />
        Draft
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <Link href="/admin" className="hover:text-pink-600">Dashboard</Link>
                <span>/</span>
                <span className="text-gray-900 dark:text-white">Expert Advice</span>
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                Expert Advice
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage farming tips, expert guidance, and educational content
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last 30 Days</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <Link href="/admin/expert-advice/create">
                <button className="px-4 py-2 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition-all flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span className="text-sm">Add Advice</span>
                </button>
              </Link>
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span className="text-sm">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 mb-8">
          {[
            { label: 'Total Articles', value: stats.total, icon: MessageSquare, color: 'pink', change: '+12%' },
            { label: 'Published', value: stats.published, icon: CheckCircle, color: 'green', change: '+8%' },
            { label: 'Drafts', value: stats.drafts, icon: Clock, color: 'yellow', change: '-2%' },
            { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'blue', change: '+25%' },
            { label: 'Total Likes', value: stats.totalLikes.toLocaleString(), icon: ThumbsUp, color: 'purple', change: '+18%' },
            { label: 'Avg. Engagement', value: stats.avgEngagement, icon: Users, color: 'orange', suffix: '' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            const colorClasses = {
              pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600',
              green: 'bg-green-50 dark:bg-green-900/20 text-green-600',
              yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600',
              blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600',
              purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600',
              orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
            };
            return (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-6 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold mt-2">
                      {stat.value}
                      {stat.suffix && <span className="text-lg ml-1">{stat.suffix}</span>}
                    </p>
                    {stat.change && (
                      <div className="flex items-center gap-1 mt-2">
                        <span className="text-xs text-green-600 flex items-center gap-0.5">
                          <ArrowUpRight className="h-3 w-3" />
                          {stat.change}
                        </span>
                        <span className="text-xs text-gray-500">vs last month</span>
                      </div>
                    )}
                  </div>
                  <div className={`p-3 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category Pills */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => setCategoryFilter(cat.value)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    categoryFilter === cat.value
                      ? 'bg-pink-600 text-white shadow-md'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.name}
                  <span className={`px-1.5 py-0.5 rounded-lg text-xs ${
                    categoryFilter === cat.value
                      ? 'bg-white/20'
                      : 'bg-gray-100 dark:bg-gray-700'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 mb-8">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search advice by title or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700"
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
              
              <select className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-gray-700">
                <option>Sort by Newest</option>
                <option>Sort by Oldest</option>
                <option>Most Views</option>
                <option>Most Likes</option>
              </select>
              
              <button className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                <Filter className="h-4 w-4" />
              </button>
              
              <div className="flex gap-1 bg-gray-100 dark:bg-gray-700 rounded-xl p-1">
                <button 
                  onClick={() => setView('grid')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'grid' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  Grid
                </button>
                <button 
                  onClick={() => setView('table')}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${view === 'table' ? 'bg-white dark:bg-gray-600 shadow-sm' : ''}`}
                >
                  Table
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grid View */}
        {view === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdvice.map((advice) => (
              <div key={advice.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
                {/* Image */}
                <div className="relative h-48 bg-gradient-to-br from-pink-100 to-rose-100 dark:from-pink-900/20 dark:to-rose-900/20 overflow-hidden">
                  <div className="absolute top-3 right-3 flex gap-2">
                    {advice.featured && (
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-lg flex items-center gap-1">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                    {advice.popular && (
                      <span className="px-2 py-1 bg-purple-500 text-white text-xs rounded-lg flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <span className="px-2 py-1 bg-white/90 dark:bg-gray-900/90 rounded-lg text-xs font-medium">
                      {advice.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{advice.author.name}</p>
                        <p className="text-xs text-gray-500">{advice.author.credentials}</p>
                      </div>
                    </div>
                    {getStatusBadge(advice.status)}
                  </div>

                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                    {advice.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {advice.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {advice.readTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {advice.publishedAt || 'Not published'}
                      </span>
                    </div>
                  </div>

                  {/* Engagement Stats */}
                  <div className="flex items-center justify-between pt-4 border-t dark:border-gray-700">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1 text-sm">
                        <Eye className="h-4 w-4 text-gray-400" />
                        {advice.views}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <ThumbsUp className="h-4 w-4 text-gray-400" />
                        {advice.likes}
                      </span>
                      <span className="flex items-center gap-1 text-sm">
                        <MessageSquare className="h-4 w-4 text-gray-400" />
                        {advice.comments}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-blue-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Eye className="h-4 w-4 text-green-600" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {view === 'table' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700/50">
                  <tr className="text-left text-sm text-gray-600 dark:text-gray-400">
                    <th className="px-6 py-3">Title</th>
                    <th className="px-6 py-3">Author</th>
                    <th className="px-6 py-3">Category</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Views</th>
                    <th className="px-6 py-3">Likes</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {filteredAdvice.map((advice) => (
                    <tr key={advice.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium line-clamp-1">{advice.title}</p>
                          <div className="flex gap-1 mt-1">
                            {advice.tags.slice(0, 2).map((tag, i) => (
                              <span key={i} className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4 text-gray-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{advice.author.name}</p>
                            <p className="text-xs text-gray-500">{advice.author.expertise}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 rounded-lg text-xs">
                          {advice.category}
                        </span>
                       </td>
                      <td className="px-6 py-4">{getStatusBadge(advice.status)}</td>
                      <td className="px-6 py-4">{advice.views.toLocaleString()}</td>
                      <td className="px-6 py-4">{advice.likes.toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm">{advice.publishedAt || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Eye className="h-4 w-4 text-blue-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Edit className="h-4 w-4 text-green-600" />
                          </button>
                          <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                       </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}