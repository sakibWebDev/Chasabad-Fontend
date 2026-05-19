// app/tools/page.tsx
// কৃষি সরঞ্জাম ও যন্ত্রপাতির বিস্তারিত তথ্য পেজ

'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Calendar,
  MapPin,
  Menu,
  X,
  Search,
  Filter,
  Star,
  CheckCircle,
  AlertCircle,
  Wrench,
  ShoppingCart,
  Eye,
  ChevronRight,
  Award,
  MessageCircle,
  TrendingUp,
  Truck,
  Shield,
  Clock,
  DollarSign,
  Gauge,
  Droplets,
  Zap,
  Thermometer,
  Scissors,
  Shovel
} from 'lucide-react';

import {
  toolsData,
  toolCategories,
  getToolsByCategory,
  getCategoryById,
  getAvailabilityColor,
  getAvailabilityText,
  Tool
} from './data/tools.data';

export default function ToolsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredTools = getToolsByCategory(selectedCategory).filter(tool =>
    tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tool.nameBn.includes(searchTerm) ||
    tool.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openToolModal = (tool: Tool) => {
    setSelectedTool(tool);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTool(null);
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
              <p className="text-[10px] text-gray-500 hidden sm:block">কৃষি সরঞ্জাম</p>
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
              <Wrench className="h-5 w-5" />
              <span>কৃষি সরঞ্জাম ও যন্ত্রপাতি</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              আধুনিক কৃষি সরঞ্জাম <br />
              <span className="text-emerald-200">এক জায়গায়</span>
            </h1>
            <p className="text-emerald-100 text-lg mb-6 max-w-2xl">
              ট্রাক্টর থেকে শুরু করে সেচ যন্ত্র, ফসল তোলার মেশিন - সর্বশেষ ও সাশ্রয়ী মূল্যের কৃষি সরঞ্জাম সংগ্রহ করুন।
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="bg-white text-emerald-700 px-6 py-2 rounded-full font-semibold hover:bg-emerald-50 transition flex items-center gap-2">
                সরঞ্জাম দেখুন <ChevronRight className="h-4 w-4" />
              </button>
              <button className="border border-white/30 px-6 py-2 rounded-full font-semibold hover:bg-white/10 transition flex items-center gap-2">
                বিশেষ অফার <Award className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 right-0 opacity-10">
          <Wrench className="h-64 w-64" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="সরঞ্জাম, ব্র্যান্ড বা নাম অনুসন্ধান..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {toolCategories.map((cat) => {
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
                  {cat.nameBn}
                  <span className={`ml-1 text-[10px] ${selectedCategory === cat.id ? 'text-white/80' : 'text-gray-400'}`}>
                    ({cat.count})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTools.map((tool) => (
            <div
              key={tool.id}
              className="group bg-white rounded-2xl border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              onClick={() => openToolModal(tool)}
            >
              {/* Icon/Image */}
              <div className="h-32 bg-gradient-to-r from-emerald-100 to-teal-100 relative flex items-center justify-center">
                <tool.icon className="h-16 w-16 text-emerald-500" />
                <div className="absolute top-2 right-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getAvailabilityColor(tool.availability)}`}>
                    {getAvailabilityText(tool.availability)}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800 text-base line-clamp-1">{tool.nameBn}</h3>
                  <div className="flex items-center gap-0.5">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-gray-600">{tool.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-1">{tool.brand}</p>
                <p className="text-xs text-gray-600 line-clamp-2 mb-3">{tool.descriptionBn}</p>
                
                {/* Specifications preview */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {tool.specifications.slice(0, 2).map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-1 text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">
                      <Gauge className="h-2.5 w-2.5 text-gray-500" />
                      <span className="text-gray-600">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">মূল্য</p>
                    <p className="text-sm font-bold text-emerald-700">{tool.priceBn.split(' - ')[0]}</p>
                  </div>
                  <button className="bg-emerald-600 text-white p-1.5 rounded-full hover:bg-emerald-700 transition">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Wrench className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">কোনো সরঞ্জাম পাওয়া যায়নি</h3>
            <p className="text-gray-500">অনুগ্রহ করে অন্য ক্যাটাগরি বা সার্চ টার্ম ব্যবহার করুন</p>
          </div>
        )}

        {/* Featured Brands */}
        <div className="mt-12 bg-white rounded-2xl border border-emerald-100 overflow-hidden shadow-sm">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-5 py-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Award className="h-4 w-4" />
              জনপ্রিয় ব্র্যান্ড
            </h3>
          </div>
          <div className="p-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {['Mahindra', 'John Deere', 'Sonalika', 'New Holland', 'Farmtrac', 'Kubota', 'Eicher', 'Fieldking', 'Netafim', 'Jain Irrigation'].map((brand) => (
              <div key={brand} className="text-center p-2 bg-gray-50 rounded-xl hover:bg-emerald-50 transition cursor-pointer">
                <p className="font-semibold text-gray-700 text-sm">{brand}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Consultation Banner */}
        <div className="mt-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 text-white flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center gap-3 mb-3 sm:mb-0">
            <MessageCircle className="h-8 w-8" />
            <div>
              <h4 className="font-bold">সঠিক সরঞ্জাম নির্বাচনে বিশেষজ্ঞ পরামর্শ নিন</h4>
              <p className="text-sm text-white/80">আমাদের বিশেষজ্ঞরা আপনাকে সাহায্য করবেন</p>
            </div>
          </div>
          <button className="bg-white text-orange-600 px-5 py-2 rounded-full text-sm font-semibold hover:bg-orange-50 transition">
            পরামর্শ করুন
          </button>
        </div>
      </div>

      {/* Tool Details Modal */}
      {showModal && selectedTool && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold text-gray-800">{selectedTool.nameBn}</h2>
              <button onClick={closeModal} className="p-1 rounded-lg hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5">
              {/* Basic Info */}
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="bg-gradient-to-r from-emerald-100 to-teal-100 p-4 rounded-xl flex items-center justify-center w-24 h-24">
                  <selectedTool.icon className="h-12 w-12 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-500">{selectedTool.brand}</p>
                  <p className="text-2xl font-bold text-gray-800">{selectedTool.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${getAvailabilityColor(selectedTool.availability)}`}>
                      {getAvailabilityText(selectedTool.availability)}
                    </span>
                    <div className="flex items-center gap-0.5">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium">{selectedTool.rating}</span>
                      <span className="text-xs text-gray-400">({selectedTool.reviews} রিভিউ)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">মূল্য</p>
                  <p className="text-2xl font-bold text-emerald-700">{selectedTool.priceBn}</p>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2">বিবরণ</h4>
                <p className="text-gray-600 text-sm">{selectedTool.descriptionBn}</p>
              </div>

              {/* Specifications */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Gauge className="h-4 w-4 text-emerald-600" />
                  প্রযুক্তিগত তথ্য
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-gray-50 rounded-xl p-3">
                  {selectedTool.specifications.map((spec, idx) => (
                    <div key={idx} className="flex justify-between border-b border-gray-200 pb-1">
                      <span className="text-xs text-gray-500">{spec.label}</span>
                      <span className="text-xs font-medium text-gray-700">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Uses */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  ব্যবহার ক্ষেত্র
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTool.uses.map((use, idx) => (
                    <span key={idx} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">✓ {use}</span>
                  ))}
                </div>
              </div>

              {/* Maintenance */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-amber-600" />
                  রক্ষণাবেক্ষণ টিপস
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTool.maintenance.map((item, idx) => (
                    <span key={idx} className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-full">🔧 {item}</span>
                  ))}
                </div>
              </div>

              {/* Warranty */}
              <div className="mb-6 p-3 bg-blue-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-800">ওয়ারেন্টি</p>
                    <p className="text-sm text-blue-700">{selectedTool.warranty}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-emerald-600 text-white py-2 rounded-xl font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2">
                  <ShoppingCart className="h-4 w-4" /> এখনই কিনুন
                </button>
                <button className="flex-1 border border-emerald-200 text-emerald-700 py-2 rounded-xl font-semibold hover:bg-emerald-50 transition flex items-center justify-center gap-2">
                  <MessageCircle className="h-4 w-4" /> বিশেষজ্ঞ পরামর্শ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-emerald-100 bg-white/50 mt-12 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <Leaf className="h-3.5 w-3.5 text-emerald-500" />
            <span>© 2025 এগ্রিভিশন — কৃষি সরঞ্জাম প্ল্যাটফর্ম</span>
          </div>
          <div className="flex gap-5">
            <a href="#" className="hover:text-emerald-700">গোপনীয়তা</a>
            <a href="#" className="hover:text-emerald-700">শর্তাবলী</a>
            <a href="#" className="hover:text-emerald-700">যোগাযোগ</a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
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