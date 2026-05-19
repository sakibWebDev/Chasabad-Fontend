// app/(public)/about/page.tsx
'use client';

import { Leaf, Users, Award, Truck, Shield, Clock, Heart, Target, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  const stats = [
    { value: '৫০,০০০+', label: 'সন্তুষ্ট কৃষক', icon: Users },
    { value: '৫০০+', label: 'বীজের ভ্যারাইটি', icon: Leaf },
    { value: '৯৮%', label: 'অংকুরোদগম হার', icon: Award },
    { value: '৬৪টি', label: 'জেলায় সেবা', icon: Globe }
  ];

  const team = [
    { name: 'ড. মোঃ রহমান', role: 'প্রধান কৃষি বিশেষজ্ঞ', image: '', expertise: 'সবজি চাষ' },
    { name: 'কৃষিবিদ ফাতেমা বেগম', role: 'সিনিয়র কৃষি কর্মকর্তা', image: '', expertise: 'ফল চাষ' },
    { name: 'মোঃ করিম উদ্দিন', role: 'মাস্টার ট্রেইনার', image: '', expertise: 'জৈব চাষ' },
    { name: 'ড. সুলতানা আহমেদ', role: 'গবেষণা পরিচালক', image: '', expertise: 'বীজ প্রযুক্তি' }
  ];

  const values = [
    { icon: Heart, title: 'কৃষকের প্রতি ভালোবাসা', desc: 'আমরা কৃষকের সাফল্যকে আমাদের সাফল্য মনে করি' },
    { icon: Shield, title: 'গুণগত মানের নিশ্চয়তা', desc: '১০০% জৈব ও মানসম্মত বীজ সরবরাহ' },
    { icon: Target, title: 'টেকসই কৃষি', desc: 'পরিবেশবান্ধব চাষাবাদে উৎসাহিত করা' },
    { icon: Clock, title: '২৪/৭ সহায়তা', desc: 'যেকোনো সময় বিশেষজ্ঞ পরামর্শ' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-emerald-700 text-white py-20">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">আমাদের সম্পর্কে</h1>
          <p className="text-lg text-green-100 max-w-2xl mx-auto">
            চাষীভাই - কৃষকের স্বপ্ন পূরণের অঙ্গীকার
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">আমাদের লক্ষ্য</h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              চাষীভাই একটি উদ্ভাবনী কৃষি প্রযুক্তি প্ল্যাটফর্ম যা বাংলাদেশের কৃষকদের মানসম্মত বীজ, 
              বিশেষজ্ঞ পরামর্শ ও আধুনিক কৃষি সরঞ্জাম সরবরাহ করে।
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              ২০২০ সালে যাত্রা শুরু করে, চাষীভাই ইতিমধ্যে ৫০,০০০ এর বেশি কৃষকের কাছে পৌঁছেছে এবং 
              তাদের উৎপাদনশীলতা বৃদ্ধিতে সহায়তা করছে। আমরা বিশ্বাস করি, সঠিক জ্ঞান ও উপকরণ দিয়ে 
              একজন কৃষক তার উৎপাদন দ্বিগুণ করতে পারেন।
            </p>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <div key={i} className="text-center">
                    <Icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">আমাদের মূল্যবোধ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{value.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-4">আমাদের বিশেষজ্ঞ টিম</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
          কৃষি বিশেষজ্ঞদের একটি দক্ষ টিম সবসময় আপনার পাশে
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition p-6 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white">{member.name}</h3>
              <p className="text-sm text-green-600 dark:text-green-400 mb-2">{member.role}</p>
              <p className="text-xs text-gray-500">{member.expertise}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">আজই যোগ দিন চাষীভাই পরিবারে</h2>
          <p className="text-lg text-green-100 mb-8">
            মানসম্মত বীজ, বিশেষজ্ঞ পরামর্শ ও কৃষি সরঞ্জাম পেতে আজই নিবন্ধন করুন
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/register">
              <button className="px-8 py-3 bg-white text-green-700 rounded-full font-semibold hover:bg-gray-100 transition">
                ফ্রিতে সাইনআপ করুন
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-8 py-3 border-2 border-white rounded-full font-semibold hover:bg-white/10 transition">
                যোগাযোগ করুন
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}