// components/home/BrandPartners.tsx
'use client';

import Link from 'next/link';
import { Shield, Award, Building, CheckCircle } from 'lucide-react';

const brands = [
  {
    name: 'ACI Agribusiness',
    logo: null,
    description: 'সার্টিফাইড বীজ ও সার সরবরাহকারী',
    certified: true
  },
  {
    name: 'BRAC Seed',
    logo: null,
    description: 'উচ্চ ফলনশীল বীজ',
    certified: true
  },
  {
    name: 'LafargeHolcim',
    logo: null,
    description: 'পরিবেশবান্ধব সার',
    certified: true
  },
  {
    name: 'Syngenta',
    logo: null,
    description: 'আন্তর্জাতিক মানের কীটনাশক',
    certified: true
  },
  {
    name: 'Mollika Seed',
    logo: null,
    description: 'দেশীয় উন্নত বীজ',
    certified: true
  },
  {
    name: 'Ispahani',
    logo: null,
    description: 'চা ও বাগান সরঞ্জাম',
    certified: false
  }
];

const certifications = [
  'সার্টিফাইড জৈব বীজ',
  'ISO 9001:2021',
  'বাংলাদেশ সরকার কর্তৃক অনুমোদিত',
  'ল্যাব টেস্টেড'
];

export default function BrandPartners() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12 border-t border-gray-100 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            আমাদের <span className="text-emerald-600">বিশ্বস্ত ব্র্যান্ড</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            দেশি ও বিদেশি সেরা ব্র্যান্ডের পণ্য আমরা সরবরাহ করি
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-10">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 text-center hover:shadow-lg transition group"
            >
              <div className="w-16 h-16 mx-auto bg-white dark:bg-gray-700 rounded-full flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-sm">
                <Building className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white">
                {brand.name}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {brand.description}
              </p>
              {brand.certified && (
                <div className="flex justify-center mt-1">
                  <CheckCircle className="h-3 w-3 text-green-500" />
                </div>
              )}
            </div>
          ))}
        </div>
        
        {/* Certifications */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-6">
          <div className="flex flex-wrap justify-center gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{cert}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link
            href="/brands"
            className="text-emerald-600 text-sm flex items-center justify-center gap-1 hover:gap-2 transition"
          >
            সমস্ত ব্র্যান্ড দেখুন
            <Award className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}