// app/faq/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ChevronDown, Search, Package, Truck, Shield, 
  CreditCard, RefreshCw, Headphones, FileText, 
  Sprout, Trees, Award, Clock, MessageCircle,
  Mail, Phone, MapPin, HelpCircle
} from 'lucide-react';

// FAQ Categories
const faqCategories = [
  { id: 'all', name: 'সব প্রশ্ন', icon: HelpCircle },
  { id: 'ordering', name: 'অর্ডার সম্পর্কিত', icon: Package },
  { id: 'payment', name: 'পেমেন্ট', icon: CreditCard },
  { id: 'shipping', name: 'ডেলিভারি', icon: Truck },
  { id: 'returns', name: 'রিটার্ন ও রিফান্ড', icon: RefreshCw },
  { id: 'products', name: 'পণ্য সম্পর্কিত', icon: Sprout },
  { id: 'account', name: 'অ্যাকাউন্ট', icon: Shield },
];

// FAQ Data
const faqs = [
  // Ordering Related
  {
    id: 1,
    question: 'কিভাবে অর্ডার করব?',
    answer: 'অর্ডার করতে খুব সহজ। প্রথমে আপনার পছন্দের পণ্যটি সিলেক্ট করুন, তারপর "কার্টে যোগ করুন" বাটনে ক্লিক করুন। এরপরে কার্ট পেজে গিয়ে অর্ডার কনফার্ম করুন। আপনার ঠিকানা ও পেমেন্ট তথ্য দিয়ে অর্ডার সম্পন্ন করুন।',
    category: 'ordering',
    popular: true
  },
  {
    id: 2,
    question: 'অর্ডার করার পর কতক্ষণে কনফার্মেশন পাব?',
    answer: 'অর্ডার করার সাথে সাথেই আপনি ইমেইল এবং এসএমএস এর মাধ্যমে অর্ডার কনফার্মেশন পেয়ে যাবেন। সাধারণত ১-২ মিনিটের মধ্যে কনফার্মেশন চলে আসে।',
    category: 'ordering',
    popular: true
  },
  {
    id: 3,
    question: 'অর্ডার বাতিল করতে চাইলে কী করব?',
    answer: 'অর্ডারটি ডেলিভারি হওয়ার আগ পর্যন্ত আপনি বাতিল করতে পারবেন। আপনার অ্যাকাউন্টের "আমার অর্ডার" সেকশন থেকে অর্ডারটি সিলেক্ট করে "বাতিল করুন" এ ক্লিক করুন। অথবা আমাদের সাপোর্ট টিমকে কল করুন।',
    category: 'ordering',
    popular: false
  },
  {
    id: 4,
    question: 'একাধিক পণ্য একসাথে অর্ডার করতে পারব?',
    answer: 'হ্যাঁ, আপনি চাইলে ইচ্ছেমত একাধিক পণ্য একসাথে অর্ডার করতে পারবেন। শপিং কার্টে সব পণ্য এড করে একসাথে অর্ডার করুন।',
    category: 'ordering',
    popular: false
  },

  // Payment Related
  {
    id: 5,
    question: 'কি কি পেমেন্ট অপশন আছে?',
    answer: 'আমরা বিভিন্ন পেমেন্ট অপশন সাপোর্ট করি: ১) ক্রেডিট/ডেবিট কার্ড (ভিসা, মাস্টারকার্ড), ২) মোবাইল ব্যাংকিং (বিকাশ, রকেট, নগদ), ৩) ব্যাংক ট্রান্সফার, ৪) ক্যাশ অন ডেলিভারি (COD)।',
    category: 'payment',
    popular: true
  },
  {
    id: 6,
    question: 'ক্যাশ অন ডেলিভারি সুবিধা আছে?',
    answer: 'হ্যাঁ, সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা আছে। পণ্য হাতে পাওয়ার পর টাকা দিতে পারবেন। তবে ১০০০ টাকার উপরে অর্ডারেই শুধু এই সুবিধা পাওয়া যায়।',
    category: 'payment',
    popular: true
  },
  {
    id: 7,
    question: 'পেমেন্ট করতে সমস্যা হলে কী করব?',
    answer: 'পেমেন্ট সংক্রান্ত যেকোনো সমস্যায় আমাদের হেল্পলাইন নম্বরে যোগাযোগ করুন: ০৯৬১২-৩৪৫৬৭৮। অথবা support@chashibhai.com এ ইমেইল করুন।',
    category: 'payment',
    popular: false
  },
  {
    id: 8,
    question: 'পেমেন্ট কি নিরাপদ?',
    answer: 'আমরা সর্বাধুনিক SSL এনক্রিপশন ব্যবহার করি। আপনার সকল পেমেন্ট তথ্য সম্পূর্ণ নিরাপদ এবং গোপনীয় রাখা হয়।',
    category: 'payment',
    popular: false
  },

  // Shipping & Delivery
  {
    id: 9,
    question: 'ডেলিভারি কত সময় লাগে?',
    answer: 'ঢাকার মধ্যে ২৪-৪৮ ঘন্টার মধ্যে এবং ঢাকার বাইরে ৩-৫ কর্মদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়। কিছু দূরবর্তী এলাকায় সময় একটু বেশি লাগতে পারে।',
    category: 'shipping',
    popular: true
  },
  {
    id: 10,
    question: 'ডেলিভারি চার্জ কত?',
    answer: '১০০০ টাকার উপরে অর্ডারে ডেলিভারি চার্জ ফ্রি। এর নিচে অর্ডারের জন্য ৬০ টাকা ডেলিভারি চার্জ প্রযোজ্য।',
    category: 'shipping',
    popular: true
  },
  {
    id: 11,
    question: 'আন্তর্জাতিক ডেলিভারি সুবিধা আছে?',
    answer: 'বর্তমানে আমরা শুধু বাংলাদেশের মধ্যে ডেলিভারি দেই। খুব শীঘ্রই আন্তর্জাতিক ডেলিভারি চালু হবে।',
    category: 'shipping',
    popular: false
  },
  {
    id: 12,
    question: 'ডেলিভারি ট্র্যাক কিভাবে করব?',
    answer: 'অর্ডার ডিসপ্যাচ হওয়ার পর আপনাকে একটি ট্র্যাকিং নম্বর দেওয়া হবে। আমাদের ওয়েবসাইটের "ট্র্যাক অর্ডার" পেজে এই নম্বর দিয়ে আপনার অর্ডার ট্র্যাক করতে পারবেন।',
    category: 'shipping',
    popular: true
  },

  // Returns & Refunds
  {
    id: 13,
    question: 'পণ্য ফেরত দেওয়ার নিয়ম কি?',
    answer: 'পণ্য ডেলিভারির ৭ দিনের মধ্যে কোনো সমস্যা হলে আপনি পণ্য ফেরত দিতে পারবেন। পণ্যের প্যাকেট খোলা না থাকলেই কেবল ফেরত নেওয়া হবে।',
    category: 'returns',
    popular: true
  },
  {
    id: 14,
    question: 'ভাঙা বা নষ্ট পণ্য পেলে কী করব?',
    answer: 'ডেলিভারির সময় পণ্য চেক করে নিন। কোনো সমস্যা থাকলে সাথে সাথে আমাদের ডেলিভারি ম্যানকে জানান। অথবা ২৪ ঘন্টার মধ্যে আমাদের সাপোর্ট টিমে যোগাযোগ করুন।',
    category: 'returns',
    popular: true
  },
  {
    id: 15,
    question: 'রিফান্ড পেতে কত দিন লাগে?',
    answer: 'পণ্য ফেরত পাওয়ার পর ৫-৭ কর্মদিবসের মধ্যে আপনার টাকা ফেরত দেওয়া হবে। পেমেন্ট পদ্ধতি অনুযায়ী রিফান্ড প্রসেস করা হয়।',
    category: 'returns',
    popular: false
  },

  // Products Related
  {
    id: 16,
    question: 'বীজের গুণগত মান নিশ্চিত?',
    answer: 'হ্যাঁ, আমরা ১০০% জৈব এবং উচ্চ মানের বীজ সরবরাহ করি। সকল বীজ ল্যাব টেস্টেড এবং জার্মিনেশন রেট ৮৫% এর উপরে।',
    category: 'products',
    popular: true
  },
  {
    id: 17,
    question: 'চারার যত্ন কিভাবে নেব?',
    answer: 'প্রতিটি চারা সাথে ডেলিভারি দেওয়া কেয়ার গাইডলাইন ফলো করুন। নিয়মিত পানি দেওয়া, পর্যাপ্ত রোদ এবং সঠিক সার ব্যবহার করা জরুরি। বিশেষ যত্ন সংক্রান্ত প্রশ্নে আমাদের এক্সপার্টদের সাথে কথা বলতে পারেন।',
    category: 'products',
    popular: true
  },
  {
    id: 18,
    question: 'পণ্য স্টকে না থাকলে কী করব?',
    answer: 'পণ্য স্টকে না থাকলে আপনি "স্টকে এলে জানান" বাটনে ক্লিক করে নোটিফিকেশন সেট করতে পারেন। পণ্য স্টকে এলে আমরা আপনাকে মেইল/এসএমএস জানিয়ে দেব।',
    category: 'products',
    popular: false
  },

  // Account Related
  {
    id: 19,
    question: 'কিভাবে অ্যাকাউন্ট তৈরি করব?',
    answer: 'উপরের দিকে "লগইন/রেজিস্টার" বাটনে ক্লিক করে আপনার নাম, ইমেইল, ফোন নম্বর দিয়ে সহজেই অ্যাকাউন্ট তৈরি করতে পারবেন। সোশ্যাল মিডিয়া অ্যাকাউন্ট দিয়েও লগইন করতে পারবেন।',
    category: 'account',
    popular: true
  },
  {
    id: 20,
    question: 'পাসওয়ার্ড ভুলে গেলে কী করব?',
    answer: 'লগইন পেজে "পাসওয়ার্ড ভুলে গেছেন?" লিংকে ক্লিক করুন। আপনার রেজিস্টার্ড ইমেইলে পাসওয়ার্ড রিসেট লিংক পাঠানো হবে।',
    category: 'account',
    popular: true
  },
  {
    id: 21,
    question: 'প্রোফাইল তথ্য পরিবর্তন কিভাবে করব?',
    answer: 'আপনার অ্যাকাউন্টে লগইন করে "আমার প্রোফাইল" সেকশন থেকে আপনার তথ্য এডিট করতে পারবেন।',
    category: 'account',
    popular: false
  }
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState<number[]>([]);

  // Toggle FAQ
  const toggleFaq = (id: number) => {
    setOpenFaqs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  // Filter FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get popular FAQs
  const popularFaqs = faqs.filter(faq => faq.popular).slice(0, 6);

  // Get category count
  const getCategoryCount = (categoryId: string) => {
    if (categoryId === 'all') return faqs.length;
    return faqs.filter(faq => faq.category === categoryId).length;
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-700 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          <div className="text-center">
            <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-80" />
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              কিভাবে সাহায্য করতে পারি?
            </h1>
            <p className="text-emerald-100 max-w-2xl mx-auto mb-6">
              আপনার সমস্ত প্রশ্নের উত্তর খুঁজুন। আমাদের FAQ সেকশনে সাধারণত জিজ্ঞাসিত প্রশ্নগুলোর উত্তর দেওয়া আছে।
            </p>
            
            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="আপনার প্রশ্ন লিখুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-white text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3 px-2">
                  ক্যাটাগরি
                </h3>
                <div className="space-y-1">
                  {faqCategories.map((category) => {
                    const Icon = category.icon;
                    const isActive = activeCategory === category.id;
                    const count = getCategoryCount(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                          isActive
                            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 font-medium'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="h-4 w-4" />
                          <span>{category.name}</span>
                        </div>
                        <span className="text-xs text-gray-400">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact Support */}
              <div className="bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl p-5">
                <h3 className="font-bold text-gray-800 dark:text-white mb-3">
                  এখনও সাহায্য প্রয়োজন?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  আমাদের সাপোর্ট টিম ২৪/৭ আপনার জন্য প্রস্তুত
                </p>
                <div className="space-y-3">
                  <Link
                    href="/contact"
                    className="flex items-center gap-3 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>লাইভ চ্যাট</span>
                  </Link>
                  <Link
                    href="tel:09612345678"
                    className="flex items-center gap-3 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
                  >
                    <Phone className="h-4 w-4" />
                    <span>০৯৬১২-৩৪৫৬৭৮</span>
                  </Link>
                  <Link
                    href="mailto:support@chashibhai.com"
                    className="flex items-center gap-3 text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 transition"
                  >
                    <Mail className="h-4 w-4" />
                    <span>support@chashibhai.com</span>
                  </Link>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">দ্রুত ডেলিভারি</span>
                    <span className="text-sm font-semibold text-emerald-600">৯৮%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">সন্তুষ্টি হার</span>
                    <span className="text-sm font-semibold text-emerald-600">৯৫%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">সাপোর্ট রেটিং</span>
                    <span className="text-sm font-semibold text-emerald-600">৪.৮/৫</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Results Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {filteredFaqs.length} টি প্রশ্ন পাওয়া গেছে
              </p>
            </div>

            {/* Popular FAQs Section (only on 'all' category and no search) */}
            {activeCategory === 'all' && !searchQuery && (
              <div className="mb-8">
                <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  জনপ্রিয় প্রশ্নসমূহ
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {popularFaqs.map((faq) => (
                    <button
                      key={faq.id}
                      onClick={() => toggleFaq(faq.id)}
                      className="text-left p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition border border-gray-100 dark:border-gray-700"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-800 dark:text-white">
                          {faq.question}
                        </span>
                        <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${
                          openFaqs.includes(faq.id) ? 'rotate-180' : ''
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ List */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition"
                  >
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {faq.question}
                    </span>
                    <ChevronDown className={`h-5 w-5 text-gray-400 transition-transform flex-shrink-0 ${
                      openFaqs.includes(faq.id) ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  {openFaqs.includes(faq.id) && (
                    <div className="px-4 pb-4">
                      <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {filteredFaqs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    কোনো প্রশ্ন খুঁজে পাওয়া যায়নি
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    আপনার প্রশ্নটি আমাদেরকে জানান। আমরা সাহায্য করতে প্রস্তুত।
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block mt-4 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                  >
                    যোগাযোগ করুন
                  </Link>
                </div>
              )}
            </div>

            {/* Still Need Help */}
            <div className="mt-10 p-6 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-xl text-center">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                এখনও আপনার প্রশ্নের উত্তর পাননি?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                আমাদের সাপোর্ট টিমকে জানান। আমরা ২৪/৭ ঘন্টা আপনার জন্য প্রস্তুত।
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
              >
                <MessageCircle className="h-4 w-4" />
                <span>সাপোর্টে যোগাযোগ করুন</span>
              </Link>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}