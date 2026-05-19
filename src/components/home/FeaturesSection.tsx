// components/home/FeaturesSection.tsx
'use client';

import { Truck, Shield, Clock, Award, Leaf, Headphones } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'সারা দেশে ডেলিভারি',
    description: '২৪-৪৮ ঘন্টার মধ্যে',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'গুণগত মানের নিশ্চয়তা',
    description: '১০০% অরিজিনাল পণ্য',
    color: 'from-emerald-500 to-green-500'
  },
  {
    icon: Leaf,
    title: '১০০% জৈব বীজ',
    description: 'ল্যাব টেস্টেড',
    color: 'from-green-500 to-lime-500'
  },
  {
    icon: Award,
    title: 'সেরা দামের গ্যারান্টি',
    description: 'প্রাইস ম্যাচ গ্যারান্টি',
    color: 'from-amber-500 to-orange-500'
  },
  {
    icon: Clock,
    title: '৭ দিন রিটার্ন পলিসি',
    description: 'নো কোয়েশ্চন রিটার্ন',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Headphones,
    title: '২৪/৭ সাপোর্ট',
    description: 'এক্সপার্ট হেল্পলাইন',
    color: 'from-red-500 to-rose-500'
  }
];

export default function FeaturesSection() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            কেন বেছে নেবেন <span className="text-emerald-600">চাষীভাই</span>?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            আমরা কৃষকদের জন্য সেরা সেবা নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-gray-50 dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}