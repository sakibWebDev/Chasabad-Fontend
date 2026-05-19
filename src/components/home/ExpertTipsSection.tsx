// components/home/ExpertTipsSection.tsx
'use client';

import Link from 'next/link';
import { User, Calendar, Clock, ArrowRight, Play, MessageCircle } from 'lucide-react';

const tips = [
  {
    id: 1,
    title: 'আম চাষের আধুনিক পদ্ধতি',
    excerpt: 'উন্নত জাতের আম চাষ করে লাভবান হোন। জেনে নিন আধুনিক পদ্ধতি...',
    author: 'ড. মোঃ রফিকুল ইসলাম',
    role: 'কৃষি বিশেষজ্ঞ',
    date: '১৫ জানুয়ারি, ২০২৪',
    readTime: '৫ মিনিট',
    image: null,
    category: 'ফল চাষ'
  },
  {
    id: 2,
    title: 'জৈব সারের ব্যবহার',
    excerpt: 'রাসায়নিক সারের পরিবর্তে জৈব সার ব্যবহারের উপকারিতা...',
    author: 'কৃষিবিদ সাদিয়া রহমান',
    role: 'মৃত্তিকা বিজ্ঞানী',
    date: '১০ জানুয়ারি, ২০২৪',
    readTime: '৪ মিনিট',
    image: null,
    category: 'জৈব চাষ'
  },
  {
    id: 3,
    title: 'মৌসুমি সবজি চাষ',
    excerpt: 'শীতকালীন সবজি চাষের সঠিক সময় ও পদ্ধতি সম্পর্কে জানুন...',
    author: 'মোঃ শাহীন আলম',
    role: 'উদ্যানতত্ত্ববিদ',
    date: '৫ জানুয়ারি, ২০২৪',
    readTime: '৬ মিনিট',
    image: null,
    category: 'সবজি চাষ'
  }
];

const expertVideos = [
  { title: 'ধানের রোগ দমন ব্যবস্থাপনা', duration: '১২:৩০', views: '১.২কে' },
  { title: 'সবুজ মরিচ চাষ পদ্ধতি', duration: '০৮:৪৫', views: '৮৫০' },
  { title: 'ফলের গাছের ড্রিপ ইরিগেশন', duration: '১৫:২০', views: '২.১কে' }
];

export default function ExpertTipsSection() {
  return (
    <div className="bg-white dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
              বিশেষজ্ঞ টিপস
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              কৃষি বিশেষজ্ঞদের কাছ থেকে সরাসরি পরামর্শ
            </p>
          </div>
          <Link href="/expert-advice" className="text-emerald-600 text-sm flex items-center gap-1 hover:gap-2 transition">
            আরও টিপস <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Tips List */}
          <div className="lg:col-span-2 space-y-4">
            {tips.map((tip) => (
              <Link
                key={tip.id}
                href={`/expert-advice/${tip.id}`}
                className="block bg-gray-50 dark:bg-gray-800 rounded-xl p-5 hover:shadow-lg transition"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg flex items-center justify-center">
                    <User className="h-8 w-8 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-full">
                        {tip.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-800 dark:text-white mb-2">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {tip.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {tip.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {tip.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {tip.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          {/* Video Tips & Consultation */}
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-5 text-white">
              <h3 className="font-bold text-lg mb-2">ভিডিও টিউটোরিয়াল</h3>
              <p className="text-sm opacity-90 mb-4">দেখুন এবং শিখুন সহজ পদ্ধতি</p>
              <div className="space-y-3">
                {expertVideos.map((video, idx) => (
                  <div key={idx} className="flex items-center justify-between bg-white/10 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4" />
                      <span className="text-sm">{video.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs">{video.duration}</span>
                      <span className="text-xs">{video.views} ভিউ</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-emerald-600 rounded-xl p-5 text-white text-center">
              <MessageCircle className="h-10 w-10 mx-auto mb-3" />
              <h3 className="font-bold text-lg mb-2">এক্সপার্ট কনসালটেশন</h3>
              <p className="text-sm opacity-90 mb-4">
                কৃষি বিষয়ক যেকোনো সমস্যায় সরাসরি বিশেষজ্ঞের সাথে কথা বলুন
              </p>
              <Link
                href="/consultation"
                className="inline-block bg-white text-emerald-600 px-5 py-2 rounded-lg font-semibold hover:bg-emerald-50 transition"
              >
                অ্যাপয়েন্টমেন্ট বুক করুন
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}