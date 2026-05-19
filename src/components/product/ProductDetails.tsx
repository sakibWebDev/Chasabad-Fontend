"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, 
  Heart, 
  Share2, 
  ShoppingCart, 
  Check, 
  Droplet, 
  Sun, 
  Thermometer,
  Calendar,
  MapPin,
  Award,
  Shield,
  Sprout,
  Leaf,
  AlertCircle,
  TrendingUp,
  Download,
  BarChart3,
  Clock,
  Ruler,
  FlaskConical
} from "lucide-react";

interface ProductDetailsProps {
  seed: {
    id: string;
    seedId: string;
    name: string;
    name_en: string;
    scientific_name: string;
    category: string;
    sub_category?: string;
    image: string;
    image_gallery: string[];
    video_url?: string;
    icon: string;
    variety_type?: string;
    origin_country?: string;
    origin_region?: string;
    year_of_introduction?: number;
    germination_time: string;
    germination_days?: number;
    maturity_time: string;
    maturity_days?: number;
    spacing: string;
    depth: string;
    depth_cm?: number;
    sunlight: string;
    watering: string;
    difficulty: string;
    soil_type: string;
    temperature: string;
    temperature_min?: number;
    temperature_max?: number;
    rainfall: string;
    rainfall_min_mm?: number;
    rainfall_max_mm?: number;
    ph_range: string;
    ph_min?: number;
    ph_max?: number;
    altitude_range?: string;
    wind_tolerance?: string;
    yield_per_hectare: string;
    yield_min_kg?: number;
    yield_max_kg?: number;
    harvest_method: string;
    storage: string;
    storage_days?: number;
    benefits: string[];
    benefits_bn: string[];
    precautions: string[];
    precautions_bn: string[];
    special_notes: string;
    special_notes_bn?: string;
    nutritional_value?: any;
    medicinal_uses: string[];
    commercial_uses: string[];
    export_potential?: boolean;
    organic_certified?: boolean;
    market_price?: number;
    seed_cost?: number;
    expected_profit?: number;
    carbon_footprint?: number;
    water_footprint?: number;
    sustainable_practices: string[];
    reviews: Array<{ rating: number; comment: string }>;
    season: {
      title: string;
      seasonCode: string;
    };
    cultivationMethod?: {
      land_preparation: string;
      sowing_time: string;
      seed_quantity: string;
      fertilizer_application: string;
      irrigation: string;
      harvesting: string;
    };
    diseaseManagement?: {
      diseases: any[];
      prevention_methods: string[];
      organic_treatment: string[];
      chemical_treatment: string[];
    };
    pestManagement?: {
      pests: any[];
      prevention_methods: string[];
      organic_pesticides: string[];
      chemical_pesticides: string[];
    };
  };
}

export default function ProductDetails({ seed }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("overview");

  // Difficulty badge color
  const difficultyColors = {
    EASY: "bg-green-100 text-green-700",
    MEDIUM: "bg-yellow-100 text-yellow-700",
    HARD: "bg-red-100 text-red-700",
  };

  // রেটিং ক্যালকুলেশন
  const avgRating = seed.reviews?.length 
    ? seed.reviews.reduce((acc, rev) => acc + rev.rating, 0) / seed.reviews.length 
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ব্রেডক্রাম্ব */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/" className="hover:text-green-600">হোম</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-green-600">পণ্য</Link>
          <span>/</span>
          <Link href={`/category/${seed.category}`} className="hover:text-green-600">
            {seed.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800">{seed.name}</span>
        </div>
      </div>

      {/* প্রোডাক্ট মেইন সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* ইমেজ গ্যালারি */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src={seed.image_gallery[selectedImage] || seed.image}
              alt={seed.name}
              fill
              className="object-cover"
            />
            {seed.organic_certified && (
              <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <Leaf size={14} /> অর্গানিক
              </div>
            )}
            {seed.export_potential && (
              <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                <TrendingUp size={14} /> এক্সপোর্ট গ্ৰেড
              </div>
            )}
          </div>
          
          {/* থাম্বনেইল গ্যালারি */}
          <div className="flex gap-3 overflow-x-auto pb-2">
            {seed.image_gallery.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                  selectedImage === idx ? "border-green-500" : "border-gray-200"
                }`}
              >
                <Image src={img} alt={`${seed.name} ${idx + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* প্রোডাক্ট ইনফো */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {seed.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${difficultyColors[seed.difficulty]}`}>
                {seed.difficulty === "EASY" ? "সহজ" : seed.difficulty === "MEDIUM" ? "মধ্যম" : "কঠিন"}
              </span>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
              {seed.name}
            </h1>
            <p className="text-gray-500 italic">{seed.scientific_name}</p>
          </div>

          {/* রেটিং ও রিভিউ */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={18}
                  className={star <= avgRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">({seed.reviews?.length || 0} রিভিউ)</span>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Heart size={20} className="text-gray-500" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition">
                <Share2 size={20} className="text-gray-500" />
              </button>
            </div>
          </div>

          {/* প্রাইস */}
          <div className="border-t border-b border-gray-100 py-4">
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-green-600">
                ৳{seed.seed_cost?.toLocaleString()}
              </span>
              {seed.market_price && (
                <span className="text-lg text-gray-400 line-through">
                  ৳{seed.market_price.toLocaleString()}
                </span>
              )}
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">
                {seed.expected_profit && `লাভ ${Math.round((seed.expected_profit / seed.seed_cost) * 100)}%`}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">*প্রতি কেজি মূল্য (ভ্যাট সহ)</p>
          </div>

          {/* কুইক ফ্যাক্টস */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm">
              <Sprout size={16} className="text-green-600" />
              <span className="text-gray-600">অঙ্কুরোদগম: {seed.germination_days} দিন</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Calendar size={16} className="text-green-600" />
              <span className="text-gray-600">পরিপক্কতা: {seed.maturity_days} দিন</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Sun size={16} className="text-green-600" />
              <span className="text-gray-600">সূর্যালোক: {seed.sunlight === "FULL_SUN" ? "পূর্ণ রৌদ্র" : "আংশিক ছায়া"}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Droplet size={16} className="text-green-600" />
              <span className="text-gray-600">পানি: {seed.watering === "MODERATE" ? "মাঝারি" : "প্রচুর"}</span>
            </div>
          </div>

          {/* পরিমাণ সিলেক্ট ও অ্যাড টু কার্ট */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-x border-gray-200 py-2 outline-none"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                <ShoppingCart size={20} />
                কার্টে যোগ করুন
              </button>
            </div>
            <button className="w-full border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold py-3 px-6 rounded-lg transition">
              দ্রুত অর্ডার করুন
            </button>
          </div>

          {/* ডেলিভারি ইনফো */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-green-600" />
              <span>সারা বাংলাদেশে ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-green-600" />
              <span>২-৩ কার্যদিবসের মধ্যে ডেলিভারি</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Check size={16} className="text-green-600" />
              <span>৭ দিনের রিটার্ন পলিসি</span>
            </div>
          </div>
        </div>
      </div>

      {/* ট্যাব সেকশন */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex gap-8 overflow-x-auto">
          {[
            { id: "overview", label: "ওভারভিউ", icon: Sprout },
            { id: "cultivation", label: "চাষ পদ্ধতি", icon: Sprout },
            { id: "diseases", label: "রোগ ও পোকা", icon: AlertCircle },
            { id: "benefits", label: "উপকারিতা", icon: Award },
            { id: "reviews", label: "রিভিউ", icon: Star },
            { id: "specs", label: "প্রযুক্তিগত তথ্য", icon: BarChart3 },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-2 font-medium transition flex items-center gap-2 border-b-2 ${
                  activeTab === tab.id
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ট্যাব কনটেন্ট */}
      <div className="py-6">
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">বর্ণনা</h3>
                <p className="text-gray-600 leading-relaxed">{seed.special_notes}</p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">উপকারিতা</h3>
                <ul className="space-y-2">
                  {seed.benefits_bn.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check size={18} className="text-green-600 mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">সতর্কতা</h3>
                <ul className="space-y-2">
                  {seed.precautions_bn.map((precaution, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle size={18} className="text-yellow-600 mt-0.5" />
                      <span className="text-gray-600">{precaution}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-6 space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield size={20} className="text-green-600" />
                সেরা মৌসুম
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">মৌসুম:</span>
                  <span className="font-medium">{seed.season?.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">তাপমাত্রা:</span>
                  <span className="font-medium">{seed.temperature_min}°C - {seed.temperature_max}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">বৃষ্টিপাত:</span>
                  <span className="font-medium">{seed.rainfall_min_mm} - {seed.rainfall_max_mm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">মাটি:</span>
                  <span className="font-medium">{seed.soil_type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">পিএইচ স্তর:</span>
                  <span className="font-medium">{seed.ph_min} - {seed.ph_max}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "cultivation" && seed.cultivationMethod && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FlaskConical size={18} className="text-green-600" />
                  জমি প্রস্তুতি
                </h3>
                <p className="text-gray-600">{seed.cultivationMethod.land_preparation}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Calendar size={18} className="text-green-600" />
                  বপন সময়
                </h3>
                <p className="text-gray-600">{seed.cultivationMethod.sowing_time}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Ruler size={18} className="text-green-600" />
                  বীজের পরিমাণ
                </h3>
                <p className="text-gray-600">{seed.cultivationMethod.seed_quantity}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Sprout size={18} className="text-green-600" />
                  সার প্রয়োগ
                </h3>
                <p className="text-gray-600">{seed.cultivationMethod.fertilizer_application}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Droplet size={18} className="text-green-600" />
                  সেচ পদ্ধতি
                </h3>
                <p className="text-gray-600">{seed.cultivationMethod.irrigation}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-5">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Clock size={18} className="text-green-600" />
                  ফসল সংগ্রহ
                </h3>
                <p className="text-gray-600">{seed.cultivationMethod.harvesting}</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "diseases" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {seed.diseaseManagement && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle size={20} className="text-red-500" />
                  রোগ ব্যবস্থাপনা
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">প্রতিরোধ পদ্ধতি:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {seed.diseaseManagement.prevention_methods?.map((method, idx) => (
                        <li key={idx}>{method}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">জৈব চিকিৎসা:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {seed.diseaseManagement.organic_treatment?.map((treatment, idx) => (
                        <li key={idx}>{treatment}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
            {seed.pestManagement && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <AlertCircle size={20} className="text-orange-500" />
                  পোকা ব্যবস্থাপনা
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">জৈব কীটনাশক:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {seed.pestManagement.organic_pesticides?.map((pesticide, idx) => (
                        <li key={idx}>{pesticide}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">সতর্কতা:</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-600">
                      {seed.pestManagement.prevention_methods?.map((method, idx) => (
                        <li key={idx}>{method}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "benefits" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Leaf size={20} className="text-green-600" />
                পুষ্টিগুণ
              </h3>
              {seed.nutritional_value && (
                <div className="space-y-2">
                  {Object.entries(seed.nutritional_value).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600">{key}:</span>
                      <span className="font-medium">{value}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Award size={20} className="text-blue-600" />
                বাণিজ্যিক ব্যবহার
              </h3>
              <ul className="space-y-2">
                {seed.commercial_uses?.map((use, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check size={16} className="text-green-600 mt-0.5" />
                    <span className="text-gray-600">{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === "specs" && (
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">বীজ আইডি:</span>
                  <span className="font-medium">{seed.seedId}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">ইংরেজি নাম:</span>
                  <span className="font-medium">{seed.name_en}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">বৈজ্ঞানিক নাম:</span>
                  <span className="font-medium italic">{seed.scientific_name}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">উৎপত্তি দেশ:</span>
                  <span className="font-medium">{seed.origin_country}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">প্রবর্তন সাল:</span>
                  <span className="font-medium">{seed.year_of_introduction}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">ফলন (প্রতি হেক্টর):</span>
                  <span className="font-medium">{seed.yield_per_hectare}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">সংরক্ষণ সময়:</span>
                  <span className="font-medium">{seed.storage_days} দিন</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">কার্বন ফুটপ্রিন্ট:</span>
                  <span className="font-medium">{seed.carbon_footprint} kg CO₂</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">জল ফুটপ্রিন্ট:</span>
                  <span className="font-medium">{seed.water_footprint} লিটার</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* সম্পর্কিত প্রোডাক্ট */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-6">সম্পর্কিত পণ্য</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* সম্পর্কিত প্রোডাক্ট কার্ড */}
        </div>
      </div>
    </div>
  );
}