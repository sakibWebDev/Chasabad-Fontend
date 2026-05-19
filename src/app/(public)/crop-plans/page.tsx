// app/crop-plans/page.tsx
// একটি সুন্দর সাইডবার লেআউট যেখানে মৌসুম, মাস এবং ফসলের নাম শ্রেণিবদ্ধভাবে সাজানো।
// যেকোনো ফসলে ক্লিক করলে ডানদিকে বিস্তারিত তথ্য দেখাবে।

'use client';

import React, { useState } from 'react';
import {
  Leaf,
  Calendar,
  Droplets,
  Sprout,
  MapPin,
  ChevronRight,
  ChevronDown,
  Timer,
  Droplet,
  Bug,
  FlaskRound,
  Package,
  Menu,
  X,
  Search
} from 'lucide-react';

import { CropData } from './data/crop.types';

// সঠিক পাথ থেকে ইম্পোর্ট - './data/crops.data' থেকে
import { 
  cropsData, 
  groupCropsBySeasonAndMonth, 
} from './data/crops.data';
import { getSeasonIcon } from './data/crop.utils';

export default function CropPlansPage() {
  const [selectedCropId, setSelectedCropId] = useState<number>(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedSeasons, setExpandedSeasons] = useState<{ [key: string]: boolean }>({
    "খরিফ (বর্ষা)": true,
    "রবি (শীতকাল)": true,
    "গ্রীষ্ম/বর্ষা": true
  });
  const [expandedMonths, setExpandedMonths] = useState<{ [key: string]: boolean }>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const selectedCrop = cropsData.find(c => c.id === selectedCropId) || cropsData[0];
  const grouped = groupCropsBySeasonAndMonth();
  
  const toggleSeason = (season: string) => {
    setExpandedSeasons(prev => ({ ...prev, [season]: !prev[season] }));
  };
  
  const toggleMonth = (key: string) => {
    setExpandedMonths(prev => ({ ...prev, [key]: !prev[key] }));
  };
  
  // Filter crops based on search term
  const filterCrops = (crops: CropData[]) => {
    if (!searchTerm) return crops;
    return crops.filter(crop => 
      crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crop.season.toLowerCase().includes(searchTerm.toLowerCase())
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
              <p className="text-[10px] text-gray-500 hidden sm:block">মৌসুমি ফসল পরিকল্পনা</p>
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar - Hierarchical Crop List with Search */}
          <aside className={`lg:w-80 flex-shrink-0 ${mobileMenuOpen ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden sticky top-20">
              <div className="bg-gradient-to-r from-emerald-700 to-green-600 px-4 py-3">
                <h2 className="text-white font-semibold flex items-center gap-2">
                  <Sprout className="h-4 w-4" />
                  সকল ফসলের তালিকা
                </h2>
                <p className="text-emerald-100 text-xs mt-0.5">মৌসুম ও মাস অনুযায়ী সাজানো</p>
              </div>
              
              {/* Search Bar */}
              <div className="p-3 border-b border-emerald-100 bg-emerald-50/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="ফসলের নাম লিখুন..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white"
                  />
                </div>
              </div>
              
              <div className="divide-y divide-emerald-50 max-h-[60vh] overflow-y-auto">
                {Object.entries(grouped).map(([season, months]) => {
                  const SeasonIcon = getSeasonIcon(season);
                  const filteredMonths: { [month: string]: CropData[] } = {};
                  
                  // Filter crops within season
                  Object.entries(months).forEach(([month, crops]) => {
                    const filtered = filterCrops(crops);
                    if (filtered.length > 0) {
                      filteredMonths[month] = filtered;
                    }
                  });
                  
                  if (Object.keys(filteredMonths).length === 0) return null;
                  
                  return (
                    <div key={season}>
                      {/* Season Header */}
                      <button
                        onClick={() => toggleSeason(season)}
                        className="w-full text-left px-4 py-2.5 transition-all flex items-center justify-between hover:bg-emerald-50 bg-gray-50/80"
                      >
                        <div className="flex items-center gap-2">
                          <SeasonIcon className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-gray-700 text-sm">{season}</span>
                          <span className="text-xs text-gray-400">({Object.values(filteredMonths).flat().length})</span>
                        </div>
                        {expandedSeasons[season] ? (
                          <ChevronDown className="h-4 w-4 text-gray-400" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        )}
                      </button>
                      
                      {/* Months */}
                      {expandedSeasons[season] && (
                        <div className="bg-white">
                          {Object.entries(filteredMonths).map(([month, crops]) => {
                            const monthKey = `${season}-${month}`;
                            return (
                              <div key={month}>
                                <button
                                  onClick={() => toggleMonth(monthKey)}
                                  className="w-full text-left pl-8 pr-4 py-2 transition-all flex items-center justify-between hover:bg-emerald-50 border-l-2 border-emerald-100"
                                >
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="font-medium text-gray-600 text-xs">{month} মাস</span>
                                    <span className="text-xs text-gray-400">({crops.length})</span>
                                  </div>
                                  {expandedMonths[monthKey] ? (
                                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
                                  )}
                                </button>
                                
                                {/* Crops under month */}
                                {expandedMonths[monthKey] && (
                                  <div className="pl-12 pr-2 py-1 space-y-1">
                                    {crops.map((crop) => (
                                      <button
                                        key={crop.id}
                                        onClick={() => {
                                          setSelectedCropId(crop.id);
                                          setMobileMenuOpen(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-all flex items-center gap-2 ${
                                          selectedCropId === crop.id 
                                            ? 'bg-emerald-100 ring-1 ring-emerald-300' 
                                            : 'hover:bg-emerald-50'
                                        }`}
                                      >
                                        <crop.icon className={`h-4 w-4 ${selectedCropId === crop.id ? 'text-emerald-700' : 'text-emerald-500'}`} />
                                        <span className={`text-xs ${selectedCropId === crop.id ? 'text-emerald-800 font-medium' : 'text-gray-600'}`}>
                                          {crop.name}
                                        </span>
                                      </button>
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main Content - Detailed Crop Plan */}
          <main className="flex-1">
            <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 overflow-hidden">
              {/* Crop Hero Section with Season Badge */}
              <div className={`bg-gradient-to-r ${getSeasonIcon(selectedCrop.season)} p-5 text-white`}>
                <div className="flex flex-wrap justify-between items-start gap-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                      <selectedCrop.icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">{selectedCrop.name}</h2>
                      <div className="flex flex-wrap gap-3 mt-1 text-sm text-white/90">
                        <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {selectedCrop.season}</span>
                        <span className="flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> {selectedCrop.totalDays} দিন</span>
                        <span className="flex items-center gap-1"><Sprout className="h-3.5 w-3.5" /> বপন: {selectedCrop.sowingWindow}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-white/20 px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                      {selectedCrop.month} মাসে বপন
                    </div>
                    <p className="text-sm text-white/80 mt-2">ফসল তোলা: {selectedCrop.harvestWindow}</p>
                  </div>
                </div>
              </div>

              {/* Basic Info Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-5 bg-emerald-50/40 border-b border-emerald-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">জাত</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedCrop.variety}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">আবহাওয়া</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedCrop.climate}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">মাটির ধরন</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedCrop.soilType}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500">বীজের পরিমাণ</p>
                  <p className="text-sm font-semibold text-gray-800">{selectedCrop.seedRate}</p>
                </div>
              </div>

              <div className="p-5">
                {/* Month-by-Month Timeline */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                    মাসভিত্তিক ফসলের সময়রেখা
                  </h3>
                  <div className="overflow-x-auto">
                    <div className="flex gap-3 pb-3 min-w-max">
                      {selectedCrop.monthlyTimeline?.map((month, idx) => (
                        <div key={idx} className="w-40 flex-shrink-0 bg-emerald-50 rounded-xl p-3 border border-emerald-100">
                          <div className="font-bold text-emerald-700 text-center mb-2">{month.month}</div>
                          <div className="text-xs font-semibold text-gray-700 mb-2">{month.growthStage}</div>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {month.activities?.slice(0, 2).map((activity, i) => (
                              <li key={i} className="flex items-start gap-1">• {activity}</li>
                            ))}
                            {month.activities?.length > 2 && <li className="text-emerald-600 text-[10px]">+{month.activities.length-2}টি</li>}
                          </ul>
                          <div className="mt-2 flex items-center gap-1 text-[10px] text-sky-600">
                            <Droplet className="h-2.5 w-2.5" /> {month.waterRequirement}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Growth Stages */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <Sprout className="h-5 w-5 text-emerald-600" />
                    বৃদ্ধির ধাপ ও যত্ন
                  </h3>
                  <div className="space-y-3">
                    {selectedCrop.growthStages?.slice(0, 4).map((stage, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <div className="flex flex-wrap justify-between items-start gap-2">
                          <span className="font-semibold text-emerald-700 text-sm">{stage.stageName}</span>
                          <span className="text-xs text-gray-400">সপ্তাহ {stage.week}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{stage.description}</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {stage.careTasks?.map((task, i) => (
                            <span key={i} className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-200">🔧 {task}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Harvest Information */}
                <div className="mb-8 bg-amber-50 rounded-xl p-4 border border-amber-200">
                  <h3 className="font-bold text-amber-800 flex items-center gap-2 mb-3">
                    <Package className="h-5 w-5" />
                    ফসল তোলা ও বাজারজাতকরণ
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                    <div><span className="text-gray-500">প্রত্যাশিত ফলন:</span> <strong className="text-amber-800">{selectedCrop.harvestInfo?.expectedYield}</strong></div>
                    <div><span className="text-gray-500">ফসল তোলার পদ্ধতি:</span> {selectedCrop.harvestInfo?.harvestMethod}</div>
                    <div><span className="text-gray-500">সংরক্ষণকাল:</span> {selectedCrop.harvestInfo?.storageDays}</div>
                    <div><span className="text-gray-500">বাজারমূল্য:</span> <strong className="text-green-700">{selectedCrop.harvestInfo?.marketPrice}</strong></div>
                    <div><span className="text-gray-500">বিক্রির সময়:</span> {selectedCrop.harvestInfo?.bestSellingTime}</div>
                  </div>
                </div>

                {/* Additional Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="bg-emerald-50 rounded-xl p-4">
                    <h4 className="font-semibold text-emerald-800 flex items-center gap-2 mb-2">
                      <FlaskRound className="h-4 w-4" /> সার প্রয়োগের সময়সূচি
                    </h4>
                    <div className="space-y-2">
                      {selectedCrop.fertilizerSchedule?.map((item, idx) => (
                        <div key={idx} className="text-sm border-b border-emerald-100 pb-1">
                          <span className="font-medium">{item.stage}:</span> {item.fertilizer} <span className="text-gray-500">({item.quantity})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-sky-50 rounded-xl p-4">
                    <h4 className="font-semibold text-sky-800 flex items-center gap-2 mb-2">
                      <Droplets className="h-4 w-4" /> সেচ সময়সূচি
                    </h4>
                    <div className="space-y-2">
                      {selectedCrop.irrigationSchedule?.map((item, idx) => (
                        <div key={idx} className="text-sm border-b border-sky-100 pb-1">
                          <span className="font-medium">{item.stage}:</span> {item.frequency} ({item.method})
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-red-50 rounded-xl p-4 md:col-span-2">
                    <h4 className="font-semibold text-red-800 flex items-center gap-2 mb-2">
                      <Bug className="h-4 w-4" /> সাধারণ রোগ ও সমাধান
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedCrop.diseaseList?.map((disease, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-2 text-sm">
                          <p className="font-bold text-red-700">{disease.name}</p>
                          <p className="text-xs text-gray-600 mt-1">⚠️ {disease.symptom}</p>
                          <p className="text-xs text-green-700 mt-1">💊 {disease.solution}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center">
                <span>📋 বীজ থেকে ফসল পর্যন্ত সম্পূর্ণ তথ্য</span>
                <span>🌾 {new Date().getFullYear()} মৌসুমের জন্য হালনাগাদ</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}